import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Test connection route
app.get('/test-connection', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', (error as Error).message);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Importing routes
import { usersRouter } from './routes/users';
import { expensesRouter } from './routes/expenses';
import { incomesRouter } from './routes/incomes';
import { savingGoalsRouter } from './routes/savingGoals';
import { monthlyBudgetsRouter } from './routes/monthlyBudgets';
import { analyticsRouter } from './routes/analytics';
import { categoriesRouter } from './routes/categories';  // Import the categories router

// Using routes
app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/incomes', incomesRouter);
app.use('/api/savingGoals', savingGoalsRouter);
app.use('/api/monthlyBudgets', monthlyBudgetsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/categories', categoriesRouter);  // Use the categories router

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Try accessing http://localhost:${port} in your browser`);
});
