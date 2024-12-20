"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalytics = exports.getAnalyticsByCategory = exports.getAnalyticsData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnalyticsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const analyticsData = yield prisma.analytics.findMany();
        res.json(analyticsData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAnalyticsData = getAnalyticsData;
const getAnalyticsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const analyticsData = yield prisma.analytics.findMany({
            where: { CategoryName: category }
        });
        res.json(analyticsData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAnalyticsByCategory = getAnalyticsByCategory;
const createAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CategoryName, Data, Date, Email } = req.body;
    try {
        const newAnalytics = yield prisma.analytics.create({
            data: {
                CategoryName,
                Data,
                Date,
                Email
            }
        });
        res.status(201).json(newAnalytics);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAnalytics = createAnalytics;
