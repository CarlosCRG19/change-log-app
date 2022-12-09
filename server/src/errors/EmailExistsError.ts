import CustomError from './CustomError';

class EmailExistsError extends CustomError {
  constructor(email: string) {
    super(`Email ${email} is already in use.`, 'EMAIL_EXISTS', 400);
  }
}

export default EmailExistsError;
