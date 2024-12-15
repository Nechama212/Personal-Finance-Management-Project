import { Router } from 'express';
import { getAllExpensesByEmail, createExpense, updateExpenseById, deleteExpenseById } from '../controllers/expenseController';

const router = Router();

router.get('/:email', getAllExpensesByEmail);
router.post('/', createExpense);
router.put('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);

export { router as expensesRouter };
