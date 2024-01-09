import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

const checkPermission = (user, resourceId, next) => {
  if (user.role === 'ADMIN') {
    return true;
  }
  if (user.role === 'USER' && user.id === resourceId) {
    return true;
  }

  return next(new CustomErrorHandler('Forbidden', httpStatusCodes.FORBIDDEN));
};

export default checkPermission;
