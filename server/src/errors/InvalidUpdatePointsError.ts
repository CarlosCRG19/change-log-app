import CustomError from './CustomError';

class InvalidUpdatePointsError extends CustomError {
  constructor(points: string) {
    super(`${points} is not valid for update points.`, 'INVALID_UPDATE_POINTS', 400);
  }
}

export default InvalidUpdatePointsError;
