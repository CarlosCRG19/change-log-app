/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import * as authController from '@/controllers/auth';

const router = express.Router();

router.get('/me', authController.me);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
