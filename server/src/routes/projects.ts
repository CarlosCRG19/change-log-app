/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import * as projectController from '@/controllers/projects';

const router = express.Router();

router.get('/', projectController.getList);

router.post('/', projectController.create);
router.get('/:projectId', projectController.get);
router.put('/:projectId', projectController.update);
router.delete('/:projectId', projectController.remove);

export default router;
