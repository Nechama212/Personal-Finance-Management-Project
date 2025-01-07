import { Router } from 'express';
import {
    getAllExpensesByEmail,
    getExpensesByCategory,
    getExpensesByDate,
    createExpense,
    updateExpenseById,
    deleteExpenseById
} from '../controllers/expenseController';

const router = Router();

router.get('/:email', getAllExpensesByEmail);
router.get('/:email/category/:category', getExpensesByCategory);
router.get('/:email/date/:date', getExpensesByDate);
router.post('/', createExpense);
router.put('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);

export { router as expensesRouter };