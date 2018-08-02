import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import auth from './routes/auth';
import users from './routes/users';
import book from './routes/book';
import image from './routes/image';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import cloudinary from 'cloudinary';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(bodyParser.json());
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});
mongoose.promise = Promise;
mongoose.connect(
	process.env.dbURL,
	{ useMongoClient: true }
);
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/book', book);
app.use('/api/images', image);
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('running on localhost:8080'));
