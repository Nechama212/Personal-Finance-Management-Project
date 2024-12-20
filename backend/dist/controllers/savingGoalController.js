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
exports.deleteSavingGoalById = exports.updateSavingGoalById = exports.createSavingGoal = exports.getAllSavingGoalsByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all saving goals by user email
const getAllSavingGoalsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savingGoals = yield prisma.savingGoal.findMany({
            where: { Email: req.params.email }
        });
        res.json(savingGoals);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllSavingGoalsByEmail = getAllSavingGoalsByEmail;
// Create a new saving goal
const createSavingGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSavingGoal = yield prisma.savingGoal.create({
            data: {
                GoalID: req.body.GoalID, // Add GoalID
                Email: req.body.Email,
                Amount: req.body.Amount,
                SavedAmount: req.body.SavedAmount,
                TargetDate: req.body.TargetDate,
                Description: req.body.Description
            }
        });
        res.status(201).json(newSavingGoal);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createSavingGoal = createSavingGoal;
// Update a saving goal by ID
const updateSavingGoalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSavingGoal = yield prisma.savingGoal.update({
            where: { GoalID: parseInt(req.params.id) },
            data: {
                GoalID: req.body.GoalID, // Add GoalID
                Amount: req.body.Amount,
                SavedAmount: req.body.SavedAmount,
                TargetDate: req.body.TargetDate,
                Description: req.body.Description
            }
        });
        res.json(updatedSavingGoal);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateSavingGoalById = updateSavingGoalById;
// Delete a saving goal by ID
const deleteSavingGoalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.savingGoal.delete({
            where: { GoalID: parseInt(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteSavingGoalById = deleteSavingGoalById;
