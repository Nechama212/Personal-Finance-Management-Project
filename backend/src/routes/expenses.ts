import { Router } from 'express';
import multer from 'multer'; // Importing multer for file upload handling
import {
    getAllExpensesByEmail,
    getExpensesByCategory,
    getExpensesByDate,
    createExpense,
    updateExpenseById,
    deleteExpenseById,
    uploadExpensesFromExcel // Importing the new function for uploading expenses from Excel
} from '../controllers/expenseController';

const router = Router();

// Middleware for handling file uploads with multer
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// Routes for expenses
router.get('/:email', getAllExpensesByEmail);
router.get('/:email/category/:category', getExpensesByCategory);
router.get('/:email/date/:date', getExpensesByDate);
router.post('/', createExpense);
router.put('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);

// New route to handle file upload and process expenses from Excel
router.post('/upload-expenses', upload.single('file'), uploadExpensesFromExcel); // Accepting a single file upload under 'file'

export { router as expensesRouter };