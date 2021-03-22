const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, 'your name is too short'],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Incorrect email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  userChangedAt: {
    type: Date,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.userChangedAt = new Date();
});

userSchema.methods.checkPassword = async function (
  providedPassword,
  actualPassword,
) {
  return await bcrypt.compare(providedPassword, actualPassword);
};

userSchema.methods.isChangedAfterLogin = function (JWTTimestamp) {
  const changeTimestamp = parseInt(this.userChangedAt.getTime() / 1000, 10);
  return JWTTimestamp < changeTimestamp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
