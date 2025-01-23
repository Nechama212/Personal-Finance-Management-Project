import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to format date to ISO format (without time)
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set time to midnight to disregard the time part
  return d.toISOString(); // This will return the date in ISO format (e.g., "2024-11-07T00:00:00.000Z")
};

// Define the shape of the data that will come from Excel
interface IncomeData {
  CategoryName: string;
  Amount: number;
  Date: string | Date;
  Description: string | undefined;
}

// Function to get or create a category if it doesn't exist
const getOrCreateCategory = async (categoryName: string, email: string) => {
  try {
    let category = await prisma.category.findUnique({
      where: {
        CategoryName: categoryName,
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          CategoryName: categoryName,
          Email: email,
        },
      });
    }

    return category;
  } catch (error) {
    throw new Error(`Error getting or creating category: ${(error as Error).message}`);
  }
};

// Function to get all incomes for a user by email
const getAllIncomesByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomes = await prisma.income.findMany({
      where: { Email: req.params.email },
      include: {
        Category: true, // Include category details for each income
      },
    });
    res.json(incomes);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Function to get incomes by category
const getIncomesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, category } = req.params;

    const incomes = await prisma.income.findMany({
      where: {
        Email: email,
        CategoryName: category,
      },
    });
    res.json(incomes);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Function to get incomes by date
const getIncomesByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, date } = req.params;

    const formattedDate = formatDate(date);

    const incomes = await prisma.income.findMany({
      where: {
        Email: email,
        Date: formattedDate,
      },
    });
    res.json(incomes);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Function to create a new income
const createIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    const formattedDate = formatDate(Date);

    let category = await getOrCreateCategory(CategoryName, Email);

    const newIncome = await prisma.income.create({
      data: {
        Email,
        Amount,
        Date: formattedDate,
        CategoryName: category.CategoryName,
        Description,
      },
    });

    const totalIncomes = await prisma.income.aggregate({
      _sum: {
        Amount: true,
      },
      where: {
        Email,
        CategoryName,
      },
    });

    const budget = await prisma.monthlyBudget.findFirst({
      where: {
        Email,
        CategoryName,
      },
    });

    if (
      budget &&
      totalIncomes._sum.Amount !== null &&
      totalIncomes._sum.Amount > budget.BudgetAmount
    ) {
      res.status(200).json({ message: 'Budget exceeded', newIncome });
    } else {
      res.status(201).json(newIncome);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Function to update an income by ID
const updateIncomeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    const formattedDate = formatDate(Date);

    const updatedIncome = await prisma.income.update({
      where: { IncomeID: parseInt(req.params.id) },
      data: {
        Email,
        Amount,
        Date: formattedDate,
        CategoryName,
        Description,
      },
    });
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Function to delete an income by ID
const deleteIncomeById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.income.delete({
      where: { IncomeID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getAllIncomesByEmail,
  getIncomesByCategory,
  getIncomesByDate,
  createIncome,
  updateIncomeById,
  deleteIncomeById,
};