function errorHandler(err, req, res, next) {
  let statusCode = 500
  let message = ["Internal server errors"]

  switch (err.name) {
    case 'SequelizeValidationError':
      statusCode = 400
      message = err.errors.map(el => el.message)
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400
      message = err.errors.map(el => `${el.value} is already exist`)
      break;
    /* istanbul ignore next */
    case "SequelizeDatabaseError":
      if (err.parent.code === '23502') {
        statusCode = 400
        message = err.errors[0].message
      }
      break;
    case 'JsonWebTokenError':
      statusCode = 401
      message = [`UnAuthenticated - You are not logged in`]
      break;
  }

  /* istanbul ignore next */
  switch (err.msg) {
    case 'Invalid Certificate':
      statusCode = 400
      message = [`${err.msg}`]
      break;
    case 'Invalid email or password':
      statusCode = 400
      message = [`${err.msg}`]
      break;
    case 'UnAuthorized - Access is denied':
      statusCode = 403
      message = [`${err.msg}`]
      break;
    case 'Order not found':
      statusCode = 404
      message = [`${err.msg}`]
      break;
    case 'Location not found':
      statusCode = 404
      message = [`${err.msg}`]
      break;
  }
  /* istanbul ignore next */
  if (err.apiResponse) {
    /* istanbul ignore next */
    statusCode = err.statusCode;
    /* istanbul ignore next */
    message = err.apiResponse.error_messages;
  }

  res.status(statusCode).json({ status: statusCode, message })
}


module.exports = errorHandler
