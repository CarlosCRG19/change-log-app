import CustomError from './CustomError';

class UnauthorizedError extends CustomError {
  constructor() {
    super('You need to be authenticated to perform this action.', 'UNAUTHORIZED', 401);
  }
}

export default UnauthorizedError;
