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
exports.deleteMonthlyBudgetById = exports.updateMonthlyBudgetById = exports.createMonthlyBudget = exports.getAllMonthlyBudgetsByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all monthly budgets by user email
const getAllMonthlyBudgetsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlyBudgets = yield prisma.monthlyBudget.findMany({
            where: { Email: req.params.email }
        });
        res.json(monthlyBudgets);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllMonthlyBudgetsByEmail = getAllMonthlyBudgetsByEmail;
// Create a new monthly budget
const createMonthlyBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMonthlyBudget = yield prisma.monthlyBudget.create({
            data: {
                Email: req.body.Email,
                CategoryName: req.body.CategoryName,
                BudgetAmount: req.body.BudgetAmount,
                SpentAmount: req.body.SpentAmount,
                BudgetMonth: req.body.BudgetMonth
            }
        });
        res.status(201).json(newMonthlyBudget);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createMonthlyBudget = createMonthlyBudget;
// Update a monthly budget by ID
const updateMonthlyBudgetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMonthlyBudget = yield prisma.monthlyBudget.update({
            where: { BudgetID: parseInt(req.params.id) },
            data: {
                CategoryName: req.body.CategoryName,
                BudgetAmount: req.body.BudgetAmount,
                SpentAmount: req.body.SpentAmount,
                BudgetMonth: req.body.BudgetMonth
            }
        });
        res.json(updatedMonthlyBudget);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateMonthlyBudgetById = updateMonthlyBudgetById;
// Delete a monthly budget by ID
const deleteMonthlyBudgetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.monthlyBudget.delete({
            where: { BudgetID: parseInt(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteMonthlyBudgetById = deleteMonthlyBudgetById;
