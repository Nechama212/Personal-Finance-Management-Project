import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all categories
const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get a specific category by name
const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await prisma.category.findUnique({
      where: { CategoryName: req.params.id }
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Create a new category
const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if category name is unique
    const existingCategory = await prisma.category.findUnique({
      where: { CategoryName: req.body.CategoryName }
    });
    if (existingCategory) {
      res.status(400).json({ error: 'Category with this name already exists' });
      return;
    }

    const newCategory = await prisma.category.create({
      data: {
        CategoryName: req.body.CategoryName,
        Email: req.body.Email // Add Email field
      }
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a category by name
const updateCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CategoryName, Email } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { CategoryName: req.params.id },
      data: {
        CategoryName,
        Email
      }
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a category by name
const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.category.delete({
      where: { CategoryName: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
};
