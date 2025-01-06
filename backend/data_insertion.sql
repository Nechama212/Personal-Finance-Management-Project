-- מחיקת נתונים קיימים
TRUNCATE TABLE public."User" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."Category" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."Analytics" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."Expense" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."Income" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."MonthlyBudget" RESTART IDENTITY CASCADE;
TRUNCATE TABLE public."SavingGoal" RESTART IDENTITY CASCADE;

-- Users
INSERT INTO public."User" ("Email", "UserName", "Password", "Language") VALUES
('example@example.com', 'exampleuser', 'password123', 'en'),
('testuser1@example.com', 'testuser1', 'password456', 'en'),
('testuser2@example.com', 'testuser2', 'password789', 'en');

-- Categories
INSERT INTO public."Category" ("CategoryID", "CategoryName", "Email") VALUES
(1, 'Groceries', 'example@example.com'),
(2, 'Utilities', 'example@example.com'),
(3, 'Entertainment', 'testuser1@example.com'),
(4, 'Travel', 'testuser2@example.com'),
(5, 'Salary', 'example@example.com'),
(6, 'Freelance', 'testuser1@example.com'), -- הוספת קטגוריית Freelance
(7, 'Business', 'testuser2@example.com'); -- הוספת קטגוריית Business

-- Analytics
INSERT INTO public."Analytics" ("AnalyticsID", "CategoryName", "Metric", "Value", "Date", "Email") VALUES
(1, 'Groceries', 'spending', 200, '2023-01-01', 'example@example.com'),
(2, 'Utilities', 'usage', 300, '2023-01-01', 'example@example.com'),
(3, 'Entertainment', 'spending', 150, '2023-02-01', 'testuser1@example.com'),
(4, 'Travel', 'spending', 400, '2023-03-01', 'testuser2@example.com');

-- Expenses
INSERT INTO public."Expense" ("ExpenseID", "Email", "Amount", "Date", "CategoryName", "Description") VALUES
(1, 'example@example.com', 50.75, '2023-01-02', 'Groceries', 'Bought fruits and vegetables'),
(2, 'example@example.com', 120.00, '2023-01-03', 'Utilities', 'Electricity bill payment'),
(3, 'testuser1@example.com', 75.00, '2023-02-05', 'Entertainment', 'Movie night'),
(4, 'testuser2@example.com', 250.00, '2023-03-10', 'Travel', 'Flight tickets');

-- Income
INSERT INTO public."Income" ("IncomeID", "Email", "Amount", "Date", "CategoryName", "Description") VALUES
(1, 'example@example.com', 2500.00, '2023-01-01', 'Salary', 'Monthly salary'),
(2, 'testuser1@example.com', 3000.00, '2023-02-01', 'Freelance', 'Project payment'),
(3, 'testuser2@example.com', 3500.00, '2023-03-01', 'Business', 'Quarterly revenue');

-- Monthly Budgets
INSERT INTO public."MonthlyBudget" ("BudgetID", "Email", "CategoryName", "BudgetAmount", "SpentAmount", "BudgetMonth") VALUES
(1, 'example@example.com', 'Groceries', 300.00, 50.75, '2023-01-01'),
(2, 'example@example.com', 'Utilities', 150.00, 120.00, '2023-01-01'),
(3, 'testuser1@example.com', 'Entertainment', 200.00, 75.00, '2023-02-01'),
(4, 'testuser2@example.com', 'Travel', 500.00, 250.00, '2023-03-01');

-- Saving Goals
INSERT INTO public."SavingGoal" ("GoalID", "Email", "Amount", "SavedAmount", "TargetDate", "Description") VALUES
(1, 'example@example.com', 10000.00, 2000.00, '2024-12-31', 'Vacation fund'),
(2, 'testuser1@example.com', 5000.00, 1500.00, '2024-06-30', 'New laptop'),
(3, 'testuser2@example.com', 8000.00, 3000.00, '2024-09-30', 'Home renovation');
