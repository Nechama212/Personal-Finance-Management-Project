import { Router } from 'express';
import {
  getAllSavingGoalsByEmail,
  createSavingGoal,
  updateSavingGoalById,
  deleteSavingGoalById
} from '../controllers/savingGoalController'; // Import functions from controller

const router = Router();

router.get('/:email', getAllSavingGoalsByEmail); // Route to get all saving goals by user email
router.post('/', createSavingGoal); // Route to create a new saving goal
router.put('/:id', updateSavingGoalById); // Route to update a saving goal by ID
router.delete('/:id', deleteSavingGoalById); // Route to delete a saving goal by ID

export { router as savingGoalsRouter };
