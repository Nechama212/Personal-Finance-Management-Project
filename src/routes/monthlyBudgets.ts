import { Router } from 'express';
import {
  getAllMonthlyBudgetsByEmail,
  createMonthlyBudget,
  updateMonthlyBudgetById,
  deleteMonthlyBudgetById
} from '../controllers/monthlyBudgetController'; // Import functions from controller

const router = Router();

router.get('/:email', getAllMonthlyBudgetsByEmail); // Route to get all monthly budgets by user email
router.post('/', createMonthlyBudget); // Route to create a new monthly budget
router.put('/:id', updateMonthlyBudgetById); // Route to update a monthly budget by ID
router.delete('/:id', deleteMonthlyBudgetById); // Route to delete a monthly budget by ID

export { router as monthlyBudgetsRouter };
