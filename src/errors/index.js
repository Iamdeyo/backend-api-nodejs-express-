import response from '../utils/response.js';
import CustomErrorHandler from './CustomErrorHandler.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import MongoDBErrors from './mongoDBErrors.js';

const notFound = (req, res) => {
  return response(res, httpStatusCodes.NOT_FOUND, false, 'Route Not Found');
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let httpStatusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let stackTrace;

  if (err instanceof CustomErrorHandler) {
    httpStatusCode = err.statusCode;
    message = err.message;
  }

  if (err.name === 'MongoServerError') {
    // MongoDB-specific error handling
    const { ECode, EMessage } = MongoDBErrors(err);
    httpStatusCode = ECode;
    message = EMessage;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (typeof err === 'string' || err instanceof Error) {
      message = err.message || err;
    }
    stackTrace = err.stack;
    // eslint-disable-next-line no-console
    // console.error(err);
  }

  return response(res, httpStatusCode, false, 'Failure', null, {
    message,
    stackTrace,
  });
};

export { notFound, errorHandler };
