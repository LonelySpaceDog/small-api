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
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
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

module.exports = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDublicatedFieldsDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
