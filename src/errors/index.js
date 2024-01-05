import CustomErrorHandler from './CustomErrorHandler.js';

const notFound = (req, res) => {
  return res.status(404).json({ message: 'Route Not Found' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let httpStatusCode = 500;
  let message = 'Internal Server Error';
  let stackTrace;

  if (err instanceof CustomErrorHandler) {
    httpStatusCode = err.statusCode;
    message = err.message;

    // Hide the detailed error message in production for security reasons
  }

  if (process.env.NODE_ENV !== 'production') {
    if (typeof err === 'string' || err instanceof Error) {
      message = err.message || err;
    }
    stackTrace = err.stack;
    // eslint-disable-next-line no-console
    // console.error(err);
  }

  return res.status(httpStatusCode).json({
    error: {
      message,
      stackTrace,
    },
  });
};

export { notFound, errorHandler };
