import express from 'express';
import User from '../models/user';
import { sendResetPasswordEmail } from '../mailer';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then((user) => {
    if (user && user.isValidator(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: 'Invalid credentials' } });
    }
  });
});

router.post('/confirm', (req, res) => {
  const { token } = req.body;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: '', confirmed: true },
    { new: true }
  ).then(
    (user) =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

router.post('/reset_password_request', (req, res) => {
  const { email } = req.body.email;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res
        .status(400)
        .json({ errors: { global: 'there is no user with such email' } });
    }
  });
});

router.post('/validate_token', (req, res) => {
  jwt.verify(req.body.token, process.env.JWTSecret, (err) => {
    if (err) {
      res.status(400).json({});
    } else {
      res.json({});
    }
  });
});
router.post('/reset_password', (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWTSecret, (err, decode) => {
    if (err) {
      res.status(401).json({ errors: { global: 'invalid token' } });
    } else {
      User.findOne({ _id: decode._id }).then((user) => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res
            .status(404)
            .json({ errors: { global: 'Invalid token or something goes wrong' } });
        }
      });
    }
  });
});
export default router;
