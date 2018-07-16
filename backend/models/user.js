import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      lowcase: true,
      index: true,
      unique: true
    },
    passwordHash: { type: String, require: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: '' }
  },
  { timestamps: true }
);
schema.methods.isValidator = function isValidator(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};
schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};
schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};
schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    { email: this.email, confirm: this.confirm },
    process.env.JWTSecret
  );
};
schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign({ _id: this._id }, process.env.JWTSecret, {
    expiresIn: '1h'
  });
};
schema.methods.generateConfirmationURL = function generateConfirmationURL() {
  return `${process.env.HOST}/confirm/${this.confirmationToken}`;
};
schema.methods.generateResetPasswordURL = function generateResetPasswordURL() {
  return `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`;
};
schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT(),
    isConfirmed: this.confirmed
  };
};
schema.plugin(uniqueValidator, { message: 'this email is already used' });
export default mongoose.model('User', schema);
