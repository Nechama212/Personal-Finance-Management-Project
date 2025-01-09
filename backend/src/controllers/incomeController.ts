import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  // Ensure that the time part is set to midnight (00:00:00)
  d.setHours(0, 0, 0, 0); // Set time to midnight to disregard the time part
  return d.toISOString(); // This will return the date in ISO format (e.g., "2024-11-07T00:00:00.000Z")
};

// Get all incomes by user email
const getAllIncomesByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomes = await prisma.income.findMany({
      where: { Email: req.params.email },
    });
    res.json(incomes);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Create a new income
const createIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    // Ensure the date is in ISO-8601 format
    const formattedDate = formatDate(Date);

    const newIncome = await prisma.income.create({
      data: {
        Email,
        Amount,
        Date: formattedDate, // Save date in ISO-8601 format
        CategoryName,
        Description,
      },
    });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Update an income by ID
const updateIncomeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email, Amount, Date, CategoryName, Description } = req.body;

    // Ensure the date is in ISO-8601 format
    const formattedDate = formatDate(Date);

    const updatedIncome = await prisma.income.update({
      where: { IncomeID: parseInt(req.params.id) },
      data: {
        Email,
        Amount,
        Date: formattedDate, // Use formatted date
        CategoryName,
        Description,
      },
    });
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

// Delete an income by ID
const deleteIncomeById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.income.delete({
      where: { IncomeID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export {
  getAllIncomesByEmail,
  createIncome,
  updateIncomeById,
  deleteIncomeById,
};