import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '@/errors';
import { auth } from '@/lib';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader: any = req.headers.authorization;

    if (typeof authHeader !== 'string') {
      throw new Error();
    }

    const bearer = authHeader.split(' ');
    const bearerToken = bearer[1];

    const { userId } = await auth.validateToken(bearerToken);

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ error: new UnauthorizedError() });
  }
};

export default authMiddleware;
