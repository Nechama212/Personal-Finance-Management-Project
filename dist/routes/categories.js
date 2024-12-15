"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController"); // Import functions from controller
const router = (0, express_1.Router)();
exports.categoriesRouter = router;
router.get('/', categoryController_1.getAllCategories); // Route to get all categories
router.get('/:id', categoryController_1.getCategoryById); // Route to get a category by ID
router.post('/', categoryController_1.createCategory); // Route to create a new category
router.put('/:id', categoryController_1.updateCategoryById); // Route to update a category by ID
router.delete('/:id', categoryController_1.deleteCategoryById); // Route to delete a category by ID
