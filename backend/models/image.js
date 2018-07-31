import mongoose from 'mongoose';

let ImageSchema = new mongoose.Schema({
	title: String,
	description: String,
	url: String,
	id: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

export default mongoose.model('Image', ImageSchema);
