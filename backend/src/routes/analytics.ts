import { Router } from 'express';
import {
  getAnalyticsData,
  getAnalyticsByCategory,
  createAnalytics
} from '../controllers/analyticsController';

const router = Router();

router.get('/', getAnalyticsData); // Route to get all analytics data
router.get('/:category', getAnalyticsByCategory); // Route to get analytics data by category
router.post('/', createAnalytics); // Route to create a new analytics record

export { router as analyticsRouter };
