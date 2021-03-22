const User = require(`${__dirname}/../models/userModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.getAllUsers = catchAsync(async (req, res, _next) => {
  const users = await User.find();
  console.log(req.query);
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'not yet empliment',
  });
});

exports.createUser = catchAsync(async (req, res, _next) => {
  res.status(500).json({
    status: 'fail',
    message: 'not yet empliment',
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'not yet empliment',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'not yet empliment',
  });
});
