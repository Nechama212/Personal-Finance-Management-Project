import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import http from 'http';
import path from 'path'; // Import path module to serve static files
import { renderVerificationPage } from './utils/renderPages'; // Import the renderVerificationPage function

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

prisma.$connect()
  .then(() => console.log('Connected to the database'))
  .catch((error: Error) => console.error('Error connecting to the database:', error.message))
  .finally(() => process.on('SIGINT', async () => { await prisma.$disconnect(); process.exit(0); }));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/test-connection', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    console.log('Fetched users from DB:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', (error as Error).message);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/verify-email/success', (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    console.log(`Rendering verification success page for: ${email}`);
    res.send(renderVerificationPage(email as string));
  } else {
    console.log('Error: Email parameter is missing in the verification link');
    res.status(400).json({ error: 'Email parameter is missing' });
  }
});

import { usersRouter } from './routes/users';
import { expensesRouter } from './routes/expenses';
import { incomesRouter } from './routes/incomes';
import { savingGoalsRouter } from './routes/savingGoals';
import { monthlyBudgetsRouter } from './routes/monthlyBudgets';
import { analyticsRouter } from './routes/analytics';
import { categoriesRouter } from './routes/categories';
import { loginRouter } from './routes/login';
import { verifyEmailRouter } from './routes/verifyEmail';

app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/incomes', incomesRouter);
app.use('/api/savingGoals', savingGoalsRouter);
app.use('/api/monthlyBudgets', monthlyBudgetsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api', loginRouter);
app.use('/api/verify-email', verifyEmailRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

const server = http.createServer(app);
server.maxHeadersCount = 1000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Try accessing http://localhost:${port} in your browser`);
});