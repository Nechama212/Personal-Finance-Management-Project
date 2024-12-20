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
    const newMonthlyBudget = await prisma.monthlyBudget.create({
      data: {
        Email: req.body.Email,
        CategoryName: req.body.CategoryName,
        BudgetAmount: req.body.BudgetAmount,
        SpentAmount: req.body.SpentAmount,
        BudgetMonth: req.body.BudgetMonth
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
    const updatedMonthlyBudget = await prisma.monthlyBudget.update({
      where: { BudgetID: parseInt(req.params.id) },
      data: {
        CategoryName: req.body.CategoryName,
        BudgetAmount: req.body.BudgetAmount,
        SpentAmount: req.body.SpentAmount,
        BudgetMonth: req.body.BudgetMonth
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
