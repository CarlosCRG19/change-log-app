import CustomError from './CustomError';

class NoEntityFoundError extends CustomError {
  constructor(entityName: string) {
    super(`${entityName} not found.`, 'NO_ENTITY_FOUND', 404);
  }
}

export default NoEntityFoundError;
