import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all expenses by user email
const getAllExpensesByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { Email: req.params.email }
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Create a new expense and check for budget exceedance
const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;
    const newExpense = await prisma.expense.create({
      data: {
        Email,
        Amount,
        Date,
        CategoryName,
        Description
      }
    });

    // Calculate the total amount of expenses for the given category
    const totalExpenses = await prisma.expense.aggregate({
      _sum: {
        Amount: true
      },
      where: {
        Email,
        CategoryName
      }
    });

    // Fetch the budget for the given category
    const budget = await prisma.monthlyBudget.findFirst({
      where: {
        Email,
        CategoryName
      }
    });

    // Check if the total expenses exceed the budget
    if (budget && totalExpenses._sum.Amount !== null && totalExpenses._sum.Amount > budget.BudgetAmount) {
      // Send a response indicating that the budget has been exceeded
      res.status(200).json({ message: 'Budget exceeded', newExpense });
    } else {
      // Send a response with the created expense
      res.status(201).json(newExpense);
    }
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Update an expense by ID
const updateExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;
    const updatedExpense = await prisma.expense.update({
      where: { ExpenseID: parseInt(req.params.id) },
      data: {
        Email,
        Amount,
        Date,
        CategoryName,
        Description
      }
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Delete an expense by ID
const deleteExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.expense.delete({
      where: { ExpenseID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export {
  getAllExpensesByEmail,
  createExpense,
  updateExpenseById,
  deleteExpenseById
};
