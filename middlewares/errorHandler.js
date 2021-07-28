const errorHandler = (err, req, res, next) => {
  let errorCode;
  let errorMessages = [];

  switch (err.name) {
    case 'SequelizeValidationError':
      errorCode = 400;
      errorMessages = err.errors ? err.errors.map((el) => el.message) : [];
      break;
    case 'SequelizeUniqueConstraintError':
      errorCode = 409;
      errorMessages = err.errors ? err.errors.map((el) => el.message) : [];
      break;
    default:
      errorCode = 500;
      errorMessages.push('Internal server error');
  }

  res.status(errorCode).json({ errorMessages });
};

module.exports = errorHandler;