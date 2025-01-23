import { Router } from 'express';
import {
  getAllIncomesByEmail,
  getIncomesByCategory,
  getIncomesByDate,
  createIncome,
  updateIncomeById,
  deleteIncomeById
} from '../controllers/incomeController'; // Import the functions from the controller

const router = Router();

router.get('/:email', getAllIncomesByEmail); // Route to get all incomes by user email
router.get('/:email/category/:category', getIncomesByCategory); // Route to get incomes by category
router.get('/:email/date/:date', getIncomesByDate); // Route to get incomes by date
router.post('/', createIncome); // Route to create a new income
router.put('/:id', updateIncomeById); // Route to update an income by ID
router.delete('/:id', deleteIncomeById); // Route to delete an income by ID

export { router as incomesRouter };