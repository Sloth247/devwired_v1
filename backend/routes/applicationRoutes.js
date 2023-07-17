import express from 'express';
const router = express.Router();
import {
  addApplication,
  getApplicationById,
  getMyApplications,
  getApplications,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, addApplication)
  .get(protect, admin, getApplications);
router.route('/myapplications').get(protect, getMyApplications);
router
  .route('/:id')
  .get(protect, getApplicationById)
  .put(protect, updateApplicationStatus);

export default router;
