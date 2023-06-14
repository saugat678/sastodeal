import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

import { categoryController, createCategoryController, deleteCategoryController, updateCategoryController } from '../controllers/CategoryController.js';

const router = express.Router()


///create category
router.post("/create-category",
 requireSignIn , isAdmin ,createCategoryController);

//  updatecategory
router.put('/update-category/:id',
requireSignIn,isAdmin ,updateCategoryController);

// getall category
router.get('/get-category',categoryController);
// delet category
router.delete('/delete-category/:id',
requireSignIn,isAdmin,deleteCategoryController);


export default router;