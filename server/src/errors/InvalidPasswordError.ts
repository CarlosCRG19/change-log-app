import CustomError from './CustomError';

class InvalidPasswordError extends CustomError {
  constructor() {
    super('Invalid password for user.', 'INVALID_PASSWORD', 401);
  }
}

export default InvalidPasswordError;
