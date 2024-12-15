"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const router = (0, express_1.Router)();
exports.analyticsRouter = router;
router.get('/', analyticsController_1.getAnalyticsData); // Route to get all analytics data
router.get('/:category', analyticsController_1.getAnalyticsByCategory); // Route to get analytics data by category
