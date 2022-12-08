/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import * as projectUpdatesController from '@/controllers/projectUpdates';

const router = express.Router();

router.get('/', projectUpdatesController.getList);
router.post('/', projectUpdatesController.create);
router.delete('/:updateId', projectUpdatesController.remove);

export default router;
