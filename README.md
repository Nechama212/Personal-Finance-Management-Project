# Project Files

## index.ts
The main entry point of the server. This file sets up the server, imports all routes, and starts the server.

## routes/
A directory containing all the route files of the project. Each route file defines the various routes of the API and imports the appropriate functions from the controllers.

### routes/users.ts
A file that defines the routes related to users, such as creating a new user, getting all users, updating user details, and deleting a user.

### routes/expenses.ts
A file that defines the routes related to expenses, such as creating a new expense, getting all expenses, updating an expense, and deleting an expense.

### routes/incomes.ts
A file that defines the routes related to incomes, such as creating a new income, getting all incomes, updating an income, and deleting an income.

### routes/savingGoals.ts
A file that defines the routes related to saving goals, such as creating a new saving goal, getting all saving goals, updating a saving goal, and deleting a saving goal.

### routes/monthlyBudgets.ts
A file that defines the routes related to monthly budgets, such as creating a new monthly budget, getting all monthly budgets, updating a monthly budget, and deleting a monthly budget.

### routes/analytics.ts
A file that defines the routes related to analytics, such as getting all analytics records, getting analytics records by category, creating a new analytics record, and deleting an analytics record.

### routes/categories.ts
A file that defines the routes related to categories, such as creating a new category, getting all categories, updating a category, and deleting a category.

## controllers/
A directory containing all the controller files of the project. Each controller file defines the functions that handle HTTP requests and perform actions on the database.

### controllers/usersController.ts
A file that defines the functions related to users, such as creating a new user, getting all users, updating user details, and deleting a user.

### controllers/expensesController.ts
A file that defines the functions related to expenses, such as creating a new expense, getting all expenses, updating an expense, and deleting an expense.

### controllers/incomesController.ts
A file that defines the functions related to incomes, such as creating a new income, getting all incomes, updating an income, and deleting an income.

### controllers/savingGoalsController.ts
A file that defines the functions related to saving goals, such as creating a new saving goal, getting all saving goals, updating a saving goal, and deleting a saving goal.

### controllers/monthlyBudgetsController.ts
A file that defines the functions related to monthly budgets, such as creating a new monthly budget, getting all monthly budgets, updating a monthly budget, and deleting a monthly budget.

### controllers/analyticsController.ts
A file that defines the functions related to analytics, such as getting all analytics records, getting analytics records by category, creating a new analytics record, and deleting an analytics record.

### controllers/categoriesController.ts
A file that defines the functions related to categories, such as creating a new category, getting all categories, updating a category, and deleting a category.

## prisma/
A directory containing the Prisma configuration files, including schemas and database settings.

### prisma/schema.prisma
A file that defines the database schemas, including tables, fields, and relationships between tables.

## package.json
A file containing information about the project, including dependencies, scripts, and additional settings.

## tsconfig.json
A file containing TypeScript compilation settings, including output directory settings, compilation rules, and more.
