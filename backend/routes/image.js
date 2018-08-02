import express from 'express';
import multipart from 'connect-multiparty';
import Image from '../models/Image';
import cloudinary from 'cloudinary';
import fs from 'fs';
const multipartMiddleware = multipart();

const router = express.Router();
router.get('/', (req, res) => {
	Image.find((err, image) => {
		if (err) {
			console.log(err);
		} else {
			res.json({ image });
		}
	});
});
router.post('/', multipartMiddleware, (req, res, next) => {
	let imageFile = req.files.image.path;
	let photo = new Image(req.body);
	cloudinary.v2.uploader
		.upload(imageFile, {
			tags: 'travelbook',
			folder: 'travelbook/',
			public_id: req.files.image.originalFilename
		})
		.then(function(image) {
			photo.url = image.url;
			photo.id = image.public_id;
			return photo.save();
		})
		.then(function() {
			let filePath = req.files.image.path;
			fs.unlinkSync(filePath);
		})
		.finally(function() {
			res.json(photo);
		});
});
router.put('/:id', function(req, res) {
	let imageFile = req.files.image.path;
	const { title, description } = req.body;
	if (imageFile) {
		console.log('test');
	} else {
		Image.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { title: title, description: description } },
			{ new: true },
			function(err, game) {
				if (err) {
					console.log(err);
					res.status(500).json({
						error: {
							global: 'some thing is wrong'
						}
					});
				} else {
					res.json({ game });
				}
			}
		);
	}
});
router.delete('/:id', function(req, res) {
	Image.findOneAndDelete({ _id: req.params.id }, function(err, r) {
		if (err) {
			console.log(err);
			res.status(500).json({
				error: {
					global: 'some thing is wrong'
				}
			});
		} else {
			cloudinary.v2.uploader.destroy(
				r.id,
				{ invalidate: true },
				function(error, result) {
					console.log(result, error);
				}
			);
			res.json({});
		}
	});
});
export default router;
