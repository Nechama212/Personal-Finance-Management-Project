import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAnalyticsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const analyticsData = await prisma.analytics.findMany();
    res.json(analyticsData);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getAnalyticsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category;
    const analyticsData = await prisma.analytics.findMany({
      where: { CategoryName: category }
    });
    res.json(analyticsData);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getAnalyticsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.params.email;
    const analyticsData = await prisma.analytics.findMany({
      where: { Email: email }
    });
    res.json(analyticsData);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const createAnalytics = async (req: Request, res: Response): Promise<void> => {
  const { CategoryName, Metric, Value, Date, Email } = req.body;

  if (!CategoryName || !Metric || !Value || !Date || !Email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const newAnalytics = await prisma.analytics.create({
      data: {
        CategoryName,
        Metric,
        Value,
        Date: new Date(Date),
        Email,
        User: { connect: { Email: Email } },
        Category: { connect: { CategoryName: CategoryName } }
      }
    });
    
    res.status(201).json(newAnalytics);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getAnalyticsData,
  getAnalyticsByCategory,
  getAnalyticsByEmail,
  createAnalytics
};
