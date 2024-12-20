"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseById = exports.updateExpenseById = exports.createExpense = exports.getAllExpensesByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all expenses by user email
const getAllExpensesByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield prisma.expense.findMany({
            where: { Email: req.params.email }
        });
        res.json(expenses);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllExpensesByEmail = getAllExpensesByEmail;
// Create a new expense and check for budget exceedance
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Amount, Date, CategoryName, Description } = req.body;
        const newExpense = yield prisma.expense.create({
            data: {
                Email,
                Amount,
                Date,
                CategoryName,
                Description
            }
        });
        // Calculate the total amount of expenses for the given category
        const totalExpenses = yield prisma.expense.aggregate({
            _sum: {
                Amount: true
            },
            where: {
                Email,
                CategoryName
            }
        });
        // Fetch the budget for the given category
        const budget = yield prisma.monthlyBudget.findFirst({
            where: {
                Email,
                CategoryName
            }
        });
        // Check if the total expenses exceed the budget
        if (budget && totalExpenses._sum.Amount !== null && totalExpenses._sum.Amount > budget.BudgetAmount) {
            // Send a response indicating that the budget has been exceeded
            res.status(200).json({ message: 'Budget exceeded', newExpense });
        }
        else {
            // Send a response with the created expense
            res.status(201).json(newExpense);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createExpense = createExpense;
// Update an expense by ID
const updateExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Amount, Date, CategoryName, Description } = req.body;
        const updatedExpense = yield prisma.expense.update({
            where: { ExpenseID: parseInt(req.params.id) },
            data: {
                Email,
                Amount,
                Date,
                CategoryName,
                Description
            }
        });
        res.json(updatedExpense);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateExpenseById = updateExpenseById;
// Delete an expense by ID
const deleteExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.expense.delete({
            where: { ExpenseID: parseInt(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteExpenseById = deleteExpenseById;
