"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomesRouter = void 0;
const express_1 = require("express");
const incomeController_1 = require("../controllers/incomeController"); // Import functions from controller
const router = (0, express_1.Router)();
exports.incomesRouter = router;
router.get('/:email', incomeController_1.getAllIncomesByEmail); // Route to get all incomes by user email
router.post('/', incomeController_1.createIncome); // Route to create a new income
router.put('/:id', incomeController_1.updateIncomeById); // Route to update an income by ID
router.delete('/:id', incomeController_1.deleteIncomeById); // Route to delete an income by ID
