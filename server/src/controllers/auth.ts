import { Response, Request } from 'express';

import { EmailExistsError } from '@/errors';
import { auth } from '@/lib';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken, userId } = await auth.signup(req.body.email, req.body.password);

    res.status(200).send({ idToken, userId });
  } catch (error) {
    if (error.response?.data?.error?.message === 'EMAIL_EXISTS') {
      res.status(500).json({ error: new EmailExistsError(req.body.email) });
      return;
    }

    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken, userId } = await auth.login(req.body.email, req.body.password);

    res.status(200).send({ idToken, userId });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};
