'use strict';

const INTERNAL_SERVER_ERROR = 'Something went wrong';

const BAD_REQUEST = 'Bad request';

class ValidationError extends Error {
  constructor(message = BAD_REQUEST) {
    super(message);
    this.name = 'ValidationError';
    this.type = BAD_REQUEST;
    this.message = message;
    this.statusCode = 400;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

module.exports = {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  ValidationError
}
