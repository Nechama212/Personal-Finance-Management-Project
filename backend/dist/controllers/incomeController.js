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
exports.deleteIncomeById = exports.updateIncomeById = exports.createIncome = exports.getAllIncomesByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all incomes by user email
const getAllIncomesByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomes = yield prisma.income.findMany({
            where: { Email: req.params.email }
        });
        res.json(incomes);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllIncomesByEmail = getAllIncomesByEmail;
// Create a new income
const createIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Amount, Date, CategoryName, Description } = req.body;
        const newIncome = yield prisma.income.create({
            data: {
                Email,
                Amount,
                Date, // Ensure Date is correctly constructed
                CategoryName,
                Description
            }
        });
        res.status(201).json(newIncome);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createIncome = createIncome;
// Update an income by ID
const updateIncomeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Amount, Date, CategoryName, Description } = req.body;
        const updatedIncome = yield prisma.income.update({
            where: { IncomeID: parseInt(req.params.id) },
            data: {
                Email,
                Amount,
                Date, // Ensure Date is correctly constructed
                CategoryName,
                Description
            }
        });
        res.json(updatedIncome);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateIncomeById = updateIncomeById;
// Delete an income by ID
const deleteIncomeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.income.delete({
            where: { IncomeID: parseInt(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteIncomeById = deleteIncomeById;
