"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savingGoalsRouter = void 0;
const express_1 = require("express");
const savingGoalController_1 = require("../controllers/savingGoalController"); // Import functions from controller
const router = (0, express_1.Router)();
exports.savingGoalsRouter = router;
router.get('/:email', savingGoalController_1.getAllSavingGoalsByEmail); // Route to get all saving goals by user email
router.post('/', savingGoalController_1.createSavingGoal); // Route to create a new saving goal
router.put('/:id', savingGoalController_1.updateSavingGoalById); // Route to update a saving goal by ID
router.delete('/:id', savingGoalController_1.deleteSavingGoalById); // Route to delete a saving goal by ID
