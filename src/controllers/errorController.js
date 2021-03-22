const AppError = require(`${__dirname}/../utils/appError`);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log(err); //Logging full error to console
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR!!!', err);
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicatedFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }
  let error = {
    name: err.name,
    code: err.code,
    status: err.status,
    statusCode: err.StatusCode,
    message: err.message,
  };
  if (error.name === 'CastError') {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) {
    error = handleDublicatedFieldsDB(error);
  }
  if (error.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res);
  } else {
    console.log('bad node_env');
    sendErrorDev(
      new AppError({ statusCode: 500, message: 'Bad NODE_ENV value.' }, res),
    );
  }
};
