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
exports.deleteCategoryById = exports.updateCategoryById = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllCategories = getAllCategories;
// Get a specific category by name
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma.category.findUnique({
            where: { CategoryName: req.params.id }
        });
        res.json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getCategoryById = getCategoryById;
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if category name is unique
        const existingCategory = yield prisma.category.findUnique({
            where: { CategoryName: req.body.CategoryName }
        });
        if (existingCategory) {
            res.status(400).json({ error: 'Category with this name already exists' });
            return;
        }
        const newCategory = yield prisma.category.create({
            data: {
                CategoryName: req.body.CategoryName
            }
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
// Update a category by name
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if category name is unique if updating the name
        if (req.body.CategoryName) {
            const existingCategory = yield prisma.category.findUnique({
                where: { CategoryName: req.body.CategoryName }
            });
            if (existingCategory && existingCategory.CategoryName !== req.params.id) {
                res.status(400).json({ error: 'Category with this name already exists' });
                return;
            }
        }
        const updatedCategory = yield prisma.category.update({
            where: { CategoryName: req.params.id },
            data: {
                CategoryName: req.body.CategoryName
            }
        });
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateCategoryById = updateCategoryById;
// Delete a category by name
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.category.delete({
            where: { CategoryName: req.params.id }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteCategoryById = deleteCategoryById;
