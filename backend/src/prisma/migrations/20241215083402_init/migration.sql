-- CreateTable
CREATE TABLE "User" (
    "Email" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Language" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Email")
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Email" TEXT NOT NULL DEFAULT 'default@example.com',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "ExpenseID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("ExpenseID")
);

-- CreateTable
CREATE TABLE "Income" (
    "IncomeID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("IncomeID")
);

-- CreateTable
CREATE TABLE "SavingGoal" (
    "GoalID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "SavedAmount" DOUBLE PRECISION NOT NULL,
    "TargetDate" TIMESTAMP(3) NOT NULL,
    "Description" TEXT,

    CONSTRAINT "SavingGoal_pkey" PRIMARY KEY ("GoalID")
);

-- CreateTable
CREATE TABLE "MonthlyBudget" (
    "BudgetID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "BudgetAmount" DOUBLE PRECISION NOT NULL,
    "SpentAmount" DOUBLE PRECISION NOT NULL,
    "BudgetMonth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyBudget_pkey" PRIMARY KEY ("BudgetID")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "AnalyticsID" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Data" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("AnalyticsID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_CategoryName_key" ON "Category"("CategoryName");

-- CreateIndex
CREATE INDEX "Expense_Email_idx" ON "Expense"("Email");

-- CreateIndex
CREATE INDEX "Expense_CategoryName_idx" ON "Expense"("CategoryName");

-- CreateIndex
CREATE INDEX "Income_Email_idx" ON "Income"("Email");

-- CreateIndex
CREATE INDEX "Income_CategoryName_idx" ON "Income"("CategoryName");

-- CreateIndex
CREATE INDEX "SavingGoal_Email_idx" ON "SavingGoal"("Email");

-- CreateIndex
CREATE INDEX "MonthlyBudget_Email_idx" ON "MonthlyBudget"("Email");

-- CreateIndex
CREATE INDEX "MonthlyBudget_CategoryName_idx" ON "MonthlyBudget"("CategoryName");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingGoal" ADD CONSTRAINT "SavingGoal_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudget" ADD CONSTRAINT "MonthlyBudget_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudget" ADD CONSTRAINT "MonthlyBudget_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Expense" DROP CONSTRAINT "Expense_CategoryName_fkey";
ALTER TABLE "Income" DROP CONSTRAINT "Income_CategoryName_fkey";
ALTER TABLE "MonthlyBudget" DROP CONSTRAINT "MonthlyBudget_CategoryName_fkey";
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_CategoryName_fkey";
DROP TABLE "Category" CASCADE;

CREATE TABLE "Category" (
  "CategoryID" SERIAL PRIMARY KEY,
  "CategoryName" TEXT UNIQUE NOT NULL,
  "Email" TEXT NOT NULL DEFAULT 'default@example.com'
);
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE CASCADE;
ALTER TABLE "Income" ADD CONSTRAINT "Income_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE CASCADE;
ALTER TABLE "MonthlyBudget" ADD CONSTRAINT "MonthlyBudget_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE CASCADE;
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_CategoryName_fkey" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName") ON DELETE CASCADE;

