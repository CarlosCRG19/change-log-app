/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import * as authController from '@/controllers/auth';

const router = express.Router();

router.get('/me', authController.me);

export default router;
