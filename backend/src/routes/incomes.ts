import { Router } from 'express';
import {
  getAllIncomesByEmail,
  createIncome,
  updateIncomeById,
  deleteIncomeById
} from '../controllers/incomeController'; // Import functions from controller

const router = Router();

router.get('/:email', getAllIncomesByEmail); // Route to get all incomes by user email
router.post('/', createIncome); // Route to create a new income
router.put('/:id', updateIncomeById); // Route to update an income by ID
router.delete('/:id', deleteIncomeById); // Route to delete an income by ID

export { router as incomesRouter };
