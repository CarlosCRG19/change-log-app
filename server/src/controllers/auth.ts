import { Response, Request } from 'express';

import { EmailExistsError } from '@/errors';
import { auth } from '@/lib';
import { Users } from '@/models';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    const { idToken, userId } = await auth.signup(email, password);

    const user = Users.create({ id: userId, email, username });

    await user.save();

    const { id, ...responseUser } = user;

    res.status(200).send({ idToken, user: { ...responseUser } });
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

    const user = await Users.findOne({
      where: { id: userId },
      select: { id: false, email: true, username: true, joinedDate: true },
    });

    res.status(200).send({ idToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await Users.findOne({
      where: { id: req.userId },
      select: { id: false, email: true, username: true, joinedDate: true },
    });

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};
