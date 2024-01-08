import httpStatusCodes from '../utils/httpStatusCodes.js';

const MongoDBErrors = (err) => {
  let httpStatusCode;
  let message;
  switch (err.code) {
    case 11000: // Duplicate key error
      httpStatusCode = httpStatusCodes.CONFLICT;
      message = 'Duplicate key error';
      break;
    case 121: // Validation error
      httpStatusCode = httpStatusCodes.CONFLICT;
      message = 'Duplicate key error or validation error';
      break;
    case 112: // Write conflict
      httpStatusCode = httpStatusCodes.CONFLICT;
      message = 'Write conflict';
      break;
    case 10334: // Document size exceeded
      httpStatusCode = httpStatusCodes.REQUEST_ENTITY_TOO_LARGE;
      message = 'Document size exceeded';
      break;
    case 17007: // Query planner error
      httpStatusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Query planner error';
      break;
    case 89: // Network timeout
      httpStatusCode = httpStatusCodes.REQUEST_TIMEOUT;
      message = 'Network timeout';
      break;
    case 27: // Index not found
      httpStatusCode = httpStatusCodes.NOT_FOUND;
      message = 'Index not found';
      break;
    case 9001: // Socket exception
      httpStatusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Socket exception';
      break;
    // Add more cases as needed based on MongoDB error codes
    default:
      // Handle other MongoDB errors or set a generic error response
      httpStatusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      break;
  }
  return { ECode: httpStatusCode, EMessage: message };
};

export default MongoDBErrors;
