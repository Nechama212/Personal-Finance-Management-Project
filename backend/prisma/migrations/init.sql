CREATE TABLE "User" (
  "Email" TEXT PRIMARY KEY,
  "UserName" TEXT NOT NULL,
  "Password" TEXT NOT NULL,
  "Language" TEXT NOT NULL
);

CREATE TABLE "Category" (
  "CategoryID" SERIAL PRIMARY KEY,
  "CategoryName" TEXT UNIQUE NOT NULL,
  "Email" TEXT NOT NULL DEFAULT 'default@example.com',
  FOREIGN KEY ("Email") REFERENCES "User"("Email")
);

CREATE TABLE "Expense" (
  "ExpenseID" SERIAL PRIMARY KEY,
  "Email" TEXT NOT NULL,
  "Amount" FLOAT NOT NULL,
  "Date" TIMESTAMP NOT NULL,
  "CategoryName" TEXT NOT NULL,
  "Description" TEXT,
  FOREIGN KEY ("Email") REFERENCES "User"("Email"),
  FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")
);

CREATE TABLE "Income" (
  "IncomeID" SERIAL PRIMARY KEY,
  "Email" TEXT NOT NULL,
  "Amount" FLOAT NOT NULL,
  "Date" TIMESTAMP NOT NULL,
  "CategoryName" TEXT NOT NULL,
  "Description" TEXT,
  FOREIGN KEY ("Email") REFERENCES "User"("Email"),
  FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")
);

CREATE TABLE "SavingGoal" (
  "GoalID" SERIAL PRIMARY KEY,
  "Email" TEXT NOT NULL,
  "Amount" FLOAT NOT NULL,
  "SavedAmount" FLOAT NOT NULL,
  "TargetDate" TIMESTAMP NOT NULL,
  "Description" TEXT,
  FOREIGN KEY ("Email") REFERENCES "User"("Email")
);

CREATE TABLE "MonthlyBudget" (
  "BudgetID" SERIAL PRIMARY KEY,
  "Email" TEXT NOT NULL,
  "CategoryName" TEXT NOT NULL,
  "BudgetAmount" FLOAT NOT NULL,
  "SpentAmount" FLOAT NOT NULL,
  "BudgetMonth" TIMESTAMP NOT NULL,
  FOREIGN KEY ("Email") REFERENCES "User"("Email"),
  FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")
);

CREATE TABLE "Analytics" (
  "AnalyticsID" SERIAL PRIMARY KEY,
  "CategoryName" TEXT NOT NULL,
  "Data" TEXT NOT NULL,
  "Date" TIMESTAMP NOT NULL,
  "Email" TEXT NOT NULL,
  FOREIGN KEY ("Email") REFERENCES "User"("Email"),
  FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")
);

