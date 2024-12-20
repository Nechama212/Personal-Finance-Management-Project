"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthlyBudgetsRouter = void 0;
const express_1 = require("express");
const monthlyBudgetController_1 = require("../controllers/monthlyBudgetController"); // Import functions from controller
const router = (0, express_1.Router)();
exports.monthlyBudgetsRouter = router;
router.get('/:email', monthlyBudgetController_1.getAllMonthlyBudgetsByEmail); // Route to get all monthly budgets by user email
router.post('/', monthlyBudgetController_1.createMonthlyBudget); // Route to create a new monthly budget
router.put('/:id', monthlyBudgetController_1.updateMonthlyBudgetById); // Route to update a monthly budget by ID
router.delete('/:id', monthlyBudgetController_1.deleteMonthlyBudgetById); // Route to delete a monthly budget by ID
