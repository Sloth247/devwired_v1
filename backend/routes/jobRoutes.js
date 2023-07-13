import express from 'express';
const router = express.Router();
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getJobs).post(protect, admin, createJob);

router
  .route('/:id')
  .get(getJob)
  .put(protect, admin, updateJob)
  .delete(protect, admin, deleteJob);

export default router;
