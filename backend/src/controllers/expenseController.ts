import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

// Function to format date to ISO format (without time)
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set time to midnight to disregard the time part
  return d.toISOString(); // This will return the date in ISO format (e.g., "2024-11-07T00:00:00.000Z")
};

// Define the shape of the data that will come from Excel
interface ExpenseData {
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

// Function to handle Excel file upload and processing
const uploadExpensesFromExcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file; // Get the uploaded file

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Read the Excel file from the uploaded buffer
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
    const jsonData: ExpenseData[] = XLSX.utils.sheet_to_json(sheet); // Convert the sheet data to JSON format

    const expenses = [];

    for (const expense of jsonData) {
      const { CategoryName, Amount, Date, Description } = expense;

      // Ensure the category exists or create it
      let category = await getOrCreateCategory(CategoryName, req.body.email);

      if (!category) {
        res.status(400).json({ error: `Category "${CategoryName}" does not exist or could not be created` });
        return;
      }

      expenses.push({
        Email: req.body.email,
        Amount,
        Date: formatDate(Date),
        CategoryName: category.CategoryName,
        Description: Description || '',
      });
    }

    // Insert the expenses into the database
    await prisma.expense.createMany({
      data: expenses,
    });

    res.status(200).json({ message: 'Expenses successfully uploaded' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to get all expenses for a user by email
const getAllExpensesByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { Email: req.params.email },
      include: {
        Category: true, // Include category details for each expense
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to get expenses by category
const getExpensesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, category } = req.params;

    const expenses = await prisma.expense.findMany({
      where: {
        Email: email,
        CategoryName: category,
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to get expenses by date
const getExpensesByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, date } = req.params;

    const formattedDate = formatDate(date);

    const expenses = await prisma.expense.findMany({
      where: {
        Email: email,
        Date: formattedDate,
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to create a new expense
const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    const formattedDate = formatDate(Date);

    let category = await getOrCreateCategory(CategoryName, Email);

    const newExpense = await prisma.expense.create({
      data: {
        Email,
        Amount,
        Date: formattedDate,
        CategoryName: category.CategoryName,
        Description,
      },
    });

    const totalExpenses = await prisma.expense.aggregate({
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
      totalExpenses._sum.Amount !== null &&
      totalExpenses._sum.Amount > budget.BudgetAmount
    ) {
      res.status(200).json({ message: 'Budget exceeded', newExpense });
    } else {
      res.status(201).json(newExpense);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to update an expense by ID
const updateExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    const formattedDate = formatDate(Date);

    const updatedExpense = await prisma.expense.update({
      where: { ExpenseID: parseInt(req.params.id) },
      data: {
        Email,
        Amount,
        Date: formattedDate,
        CategoryName,
        Description,
      },
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

// Function to delete an expense by ID
const deleteExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.expense.delete({
      where: { ExpenseID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message }); // Cast error to Error to access message
  }
};

export {
  getAllExpensesByEmail,
  getExpensesByCategory,
  getExpensesByDate,
  createExpense,
  updateExpenseById,
  deleteExpenseById,
  uploadExpensesFromExcel,
};