import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all monthly budgets by user email
const getAllMonthlyBudgetsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const monthlyBudgets = await prisma.monthlyBudget.findMany({
      where: { Email: req.params.email }
    });
    res.json(monthlyBudgets);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Create a new monthly budget
const createMonthlyBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, CategoryName, BudgetAmount, SpentAmount, BudgetMonth } = req.body;

    // Ensure the required fields are present
    if (!Email || !CategoryName || !BudgetAmount || !BudgetMonth) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Create new monthly budget
    const newMonthlyBudget = await prisma.monthlyBudget.create({
      data: {
        Email,
        CategoryName,
        BudgetAmount: parseFloat(BudgetAmount),  // Ensure that BudgetAmount is a float
        SpentAmount: parseFloat(SpentAmount) || 0,  // Default to 0 if SpentAmount is not provided
        BudgetMonth: new Date(BudgetMonth)  // Ensure valid Date format
      }
    });

    res.status(201).json(newMonthlyBudget);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a monthly budget by ID
const updateMonthlyBudgetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CategoryName, BudgetAmount, SpentAmount, BudgetMonth } = req.body;

    // Ensure the required fields are present
    if (!CategoryName || !BudgetAmount || !BudgetMonth) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Update the monthly budget
    const updatedMonthlyBudget = await prisma.monthlyBudget.update({
      where: { BudgetID: parseInt(req.params.id) },
      data: {
        CategoryName,
        BudgetAmount: parseFloat(BudgetAmount),
        SpentAmount: parseFloat(SpentAmount) || 0,
        BudgetMonth: new Date(BudgetMonth)
      }
    });

    res.json(updatedMonthlyBudget);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a monthly budget by ID
const deleteMonthlyBudgetById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.monthlyBudget.delete({
      where: { BudgetID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getAllMonthlyBudgetsByEmail,
  createMonthlyBudget,
  updateMonthlyBudgetById,
  deleteMonthlyBudgetById
};