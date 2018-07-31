import express from 'express';
import multipart from 'connect-multiparty';
import Image from '../models/Image';
import cloudinary from 'cloudinary';
import fs from 'fs';
const multipartMiddleware = multipart();

const router = express.Router();
router.get('/', (req, res) => {
	Image.find((err, images) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ image });
    }
  })
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
			photo.id = image.signature;
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

export default router;
