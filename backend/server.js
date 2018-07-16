import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import auth from './routes/auth';
import users from './routes/users';
import book from './routes/book';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.promise = Promise;
mongoose.connect(
  process.env.dbURL,
  { useMongoClient: true }
);

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/book', book);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('running on localhost:8080'));
