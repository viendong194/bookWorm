import nodemailer from 'nodemailer';
const from = 'Bookworm <info@bookworm.com';
export const sendConfirmationEmail = (user) => {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject:"Welcome to Bookworm",
    text:`Welcome to Bookworm, please confirm your email
          ${user.generateConfirmationURL()}`
  }
  transport.sendMail(email);
}
export const sendResetPasswordEmail = (user) => {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject:"Reset Password",
    text:`To reset password, please access this link
          ${user.generateResetPasswordURL()}`
  }
  transport.sendMail(email);
}

function setup(){
  return  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_POST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}