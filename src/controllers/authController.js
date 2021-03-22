const { promisify } = require('util');
const User = require(`${__dirname}/../models/userModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const jwt = require('jsonwebtoken');
const AppError = require(`${__dirname}/../utils/appError`);

const signToken = (id) => {
  let token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Missing password or email!', 400));
  }

  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //If there is authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //If not
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  //Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Is user still exist
  const currentUser = await User.findById(decoded.id).select('+userChangedAt');
  if (!currentUser) {
    return next(new AppError('This user no longer exist', 401));
  }
  //check if users fields has been changed after login
  if (currentUser.isChangedAfterLogin(decoded.iat)) {
    return next(new AppError("somthing in user's fields was changed!", 401));
  }

  req.user = currentUser;
  next();
});
