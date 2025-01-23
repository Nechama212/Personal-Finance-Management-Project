import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
} from '../controllers/categoryController'; // Import functions from controller

const router = Router();

router.get('/', getAllCategories); // Route to get all categories
router.get('/:id', getCategoryById); // Route to get a category by ID
router.post('/', createCategory); // Route to create a new category
router.put('/:id', updateCategoryById); // Route to update a category by ID
router.delete('/:id', deleteCategoryById); // Route to delete a category by ID


export { router as categoriesRouter };
