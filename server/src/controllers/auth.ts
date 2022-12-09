import { Response, Request } from 'express';

import { auth } from '@/lib';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await auth.signup(req.body.email, req.body.password);

    res.status(200).send({ ...response });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};
