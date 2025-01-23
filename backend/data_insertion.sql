-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Analytics";
DROP TABLE IF EXISTS "MonthlyBudget";
DROP TABLE IF EXISTS "SavingGoal";
DROP TABLE IF EXISTS "Income";
DROP TABLE IF EXISTS "Expense";
DROP TABLE IF EXISTS "Category";
DROP TABLE IF EXISTS "User";

-- Create User table
CREATE TABLE "User" (
  "Email" VARCHAR(255) PRIMARY KEY,  
  "UserName" VARCHAR(255) NOT NULL,  
  "Password" VARCHAR(255) NOT NULL,  
  "Language" VARCHAR(50) NOT NULL   
);

-- Insert sample data into User table (only if the user doesn't exist)
INSERT INTO "User" ("Email", "UserName", "Password", "Language") 
SELECT 'example@example.com', 'User One', 'password123', 'Hebrew'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE "Email" = 'example@example.com');

-- Create Category table
CREATE TABLE "Category" (
  "CategoryID" SERIAL PRIMARY KEY,    
  "CategoryName" VARCHAR(255) UNIQUE NOT NULL,  
  "Email" VARCHAR(255) DEFAULT 'example@example.com',  
  CONSTRAINT "FK_Category_User" FOREIGN KEY ("Email") REFERENCES "User"("Email")  
);

-- Insert sample data into Category table (use existing "example@example.com")
INSERT INTO "Category" ("CategoryName", "Email") 
SELECT 'Food', 'example@example.com'
WHERE NOT EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Food');
INSERT INTO "Category" ("CategoryName", "Email") 
SELECT 'Transport', 'example@example.com'
WHERE NOT EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Transport');
INSERT INTO "Category" ("CategoryName", "Email") 
SELECT 'Entertainment', 'example@example.com'
WHERE NOT EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Entertainment');
INSERT INTO "Category" ("CategoryName", "Email") 
SELECT 'Salary', 'example@example.com'
WHERE NOT EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Salary');

-- Create Expense table
CREATE TABLE "Expense" (
  "ExpenseID" SERIAL PRIMARY KEY,  
  "Email" VARCHAR(255) NOT NULL,  
  "Amount" FLOAT NOT NULL,       
  "Date" TIMESTAMP NOT NULL,     
  "CategoryName" VARCHAR(255) NOT NULL,  
  "Description" VARCHAR(255),    
  CONSTRAINT "FK_Expense_User" FOREIGN KEY ("Email") REFERENCES "User"("Email"),  
  CONSTRAINT "FK_Expense_Category" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")  
);

-- Insert sample data into Expense table (use existing "example@example.com")
INSERT INTO "Expense" ("Email", "Amount", "Date", "CategoryName", "Description") 
SELECT 'example@example.com', 150.50, '2025-01-05 14:00:00', 'Food', 'Grocery shopping'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Food');
INSERT INTO "Expense" ("Email", "Amount", "Date", "CategoryName", "Description") 
SELECT 'example@example.com', 60.75, '2025-01-06 10:00:00', 'Transport', 'Bus ticket'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Transport');

-- Create Income table
CREATE TABLE "Income" (
  "IncomeID" SERIAL PRIMARY KEY,  
  "Email" VARCHAR(255) NOT NULL,  
  "Amount" FLOAT NOT NULL,       
  "Date" TIMESTAMP NOT NULL,     
  "CategoryName" VARCHAR(255) NOT NULL,  
  "Description" VARCHAR(255),    
  CONSTRAINT "FK_Income_User" FOREIGN KEY ("Email") REFERENCES "User"("Email"),  
  CONSTRAINT "FK_Income_Category" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")  
);

-- Insert sample data into Income table (use existing "example@example.com")
INSERT INTO "Income" ("Email", "Amount", "Date", "CategoryName", "Description") 
SELECT 'example@example.com', 2000.00, '2025-01-01 09:00:00', 'Salary', 'Monthly salary'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Salary');
INSERT INTO "Income" ("Email", "Amount", "Date", "CategoryName", "Description") 
SELECT 'example@example.com', 1200.00, '2025-01-01 09:00:00', 'Salary', 'Monthly salary'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Salary');

-- Create SavingGoal table
CREATE TABLE "SavingGoal" (
  "GoalID" SERIAL PRIMARY KEY,  
  "Email" VARCHAR(255) NOT NULL,  
  "Amount" FLOAT NOT NULL,       
  "SavedAmount" FLOAT NOT NULL,  
  "TargetDate" TIMESTAMP NOT NULL,  
  "Description" VARCHAR(255),    
  CONSTRAINT "FK_SavingGoal_User" FOREIGN KEY ("Email") REFERENCES "User"("Email")  
);

-- Insert sample data into SavingGoal table (use existing "example@example.com")
INSERT INTO "SavingGoal" ("Email", "Amount", "SavedAmount", "TargetDate", "Description") 
SELECT 'example@example.com', 5000.00, 500.00, '2025-12-31', 'Vacation fund'
WHERE EXISTS (SELECT 1 FROM "User" WHERE "Email" = 'example@example.com');
INSERT INTO "SavingGoal" ("Email", "Amount", "SavedAmount", "TargetDate", "Description") 
SELECT 'example@example.com', 3000.00, 1000.00, '2025-06-30', 'Emergency savings'
WHERE EXISTS (SELECT 1 FROM "User" WHERE "Email" = 'example@example.com');

-- Create MonthlyBudget table
CREATE TABLE "MonthlyBudget" (
  "BudgetID" SERIAL PRIMARY KEY,  
  "Email" VARCHAR(255) NOT NULL,  
  "CategoryName" VARCHAR(255) NOT NULL,  
  "BudgetAmount" FLOAT NOT NULL,       
  "SpentAmount" FLOAT NOT NULL,        
  "BudgetMonth" TIMESTAMP NOT NULL,    
  CONSTRAINT "FK_MonthlyBudget_User" FOREIGN KEY ("Email") REFERENCES "User"("Email"),  
  CONSTRAINT "FK_MonthlyBudget_Category" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")  
);

-- Insert sample data into MonthlyBudget table (use existing "example@example.com")
INSERT INTO "MonthlyBudget" ("Email", "CategoryName", "BudgetAmount", "SpentAmount", "BudgetMonth") 
SELECT 'example@example.com', 'Food', 200.00, 150.50, '2025-01-01'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Food');
INSERT INTO "MonthlyBudget" ("Email", "CategoryName", "BudgetAmount", "SpentAmount", "BudgetMonth") 
SELECT 'example@example.com', 'Transport', 100.00, 60.75, '2025-01-01'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Transport');

-- Create Analytics table
CREATE TABLE "Analytics" (
  "AnalyticsID" SERIAL PRIMARY KEY,  
  "CategoryName" VARCHAR(255) NOT NULL,  
  "Metric" VARCHAR(255) NOT NULL,   
  "Value" FLOAT NOT NULL,           
  "Date" TIMESTAMP NOT NULL,        
  "Email" VARCHAR(255) NOT NULL,    
  CONSTRAINT "FK_Analytics_User" FOREIGN KEY ("Email") REFERENCES "User"("Email"),  
  CONSTRAINT "FK_Analytics_Category" FOREIGN KEY ("CategoryName") REFERENCES "Category"("CategoryName")  
);

-- Insert sample data into Analytics table (use existing "example@example.com")
INSERT INTO "Analytics" ("CategoryName", "Metric", "Value", "Date", "Email") 
SELECT 'Food', 'Average Spending', 150.50, '2025-01-05', 'example@example.com'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Food');
INSERT INTO "Analytics" ("CategoryName", "Metric", "Value", "Date", "Email") 
SELECT 'Transport', 'Average Spending', 60.75, '2025-01-06', 'example@example.com'
WHERE EXISTS (SELECT 1 FROM "Category" WHERE "CategoryName" = 'Transport');