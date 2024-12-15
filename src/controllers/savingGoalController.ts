import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all saving goals by user email
const getAllSavingGoalsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const savingGoals = await prisma.savingGoal.findMany({
      where: { Email: req.params.email }
    });
    res.json(savingGoals);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Create a new saving goal
const createSavingGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSavingGoal = await prisma.savingGoal.create({
      data: {
        GoalID: req.body.GoalID, // Add GoalID
        Email: req.body.Email,
        Amount: req.body.Amount,
        SavedAmount: req.body.SavedAmount,
        TargetDate: req.body.TargetDate,
        Description: req.body.Description
      }
    });
    res.status(201).json(newSavingGoal);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a saving goal by ID
const updateSavingGoalById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSavingGoal = await prisma.savingGoal.update({
      where: { GoalID: parseInt(req.params.id) },
      data: {
        GoalID: req.body.GoalID, // Add GoalID
        Amount: req.body.Amount,
        SavedAmount: req.body.SavedAmount,
        TargetDate: req.body.TargetDate,
        Description: req.body.Description
      }
    });
    res.json(updatedSavingGoal);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a saving goal by ID
const deleteSavingGoalById = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.savingGoal.delete({
      where: { GoalID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getAllSavingGoalsByEmail,
  createSavingGoal,
  updateSavingGoalById,
  deleteSavingGoalById
};
