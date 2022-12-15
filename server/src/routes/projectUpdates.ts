/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import * as projectUpdatesController from '@/controllers/projectUpdates';

const router = express.Router();

router.get('/:projectId/updates', projectUpdatesController.getList);
router.post('/:projectId/updates', projectUpdatesController.create);
router.delete('/:projectId/updates/:updateId', projectUpdatesController.remove);

export default router;
