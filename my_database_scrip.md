CREATE TABLE User (
  UserID INT PRIMARY KEY,
  UserName VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
);

CREATE TABLE Category (
  CategoryID INT PRIMARY KEY,
  Name VARCHAR(255),
  Type VARCHAR(50)
);

CREATE TABLE Expense (
  ExpenseID INT PRIMARY KEY,
  UserID INT,
  Amount DECIMAL(10, 2),
  Date DATE,
  CategoryID INT,
  Description TEXT,
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE Income (
  IncomeID INT PRIMARY KEY,
  UserID INT,
  Amount DECIMAL(10, 2),
  Date DATE,
  CategoryID INT,
  Description TEXT,
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE SavingGoal (
  GoalID INT PRIMARY KEY,
  UserID INT,
  Amount DECIMAL(10, 2),
  SavedAmount DECIMAL(10, 2),
  TargetDate DATE,
  Description TEXT,
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE MonthlyBudget (
  BudgetID INT PRIMARY KEY,
  UserID INT,
  CategoryID INT,
  BudgetAmount DECIMAL(10, 2),
  SpentAmount DECIMAL(10, 2),
  BudgetMonth DATE,
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);
