import { ValidationError } from 'express-json-validator-middleware';

import { codes, phrases } from '../status.js';

export function getErrorHandler(log) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    // Check if the error is a validation error
    if (err instanceof ValidationError) {
      return res.status(codes.BAD_REQUEST).json({
        success: false,
        statusCode: codes.BAD_REQUEST,
        message: phrases.BAD_REQUEST,
        detail: 'Data validation error',
        errors: err.validationErrors,
      });
    }

    if (err.isAppError) {
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        detail: err.detail,
      });
    }

    // Generic error
    log.error(err);
    return res.status(codes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: codes.INTERNAL_SERVER_ERROR,
      message: phrases.INTERNAL_SERVER_ERROR,
      detail: '',
    });
  };
}
