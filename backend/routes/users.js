import express from 'express';
import User from '../models/user';
import { sendConfirmationEmail } from '../mailer';
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then((userData) => {
      console.log(1)
      sendConfirmationEmail(userData);
      return res.json({ user: userData.toAuthJSON() });
    })
    .catch((err) => res.status(400).json({ err }));
});

export default router;
