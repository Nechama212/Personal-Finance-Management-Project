import { Router } from 'express';
import {
  getAnalyticsData,
  getAnalyticsByCategory,
  getAnalyticsByEmail,
  createAnalytics
} from '../controllers/analyticsController';

const router = Router();

router.get('/', getAnalyticsData); // Route to get all analytics data
router.get('/category/:category', getAnalyticsByCategory); // Route to get analytics data by category
router.get('/:email', getAnalyticsByEmail); // Route to get analytics data by email
router.post('/', createAnalytics); // Route to create a new analytics record

export { router as analyticsRouter };
