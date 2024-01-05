import CustomErrorHandler from './CustomErrorHandler.js';

const notFound = (req, res) => {
  return res.status(404).json({ message: 'Route Not Found' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Server Error' });
};

export { notFound, errorHandler };
