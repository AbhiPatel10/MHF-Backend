import { Router } from "express";
import { container } from "tsyringe";

import { CategoryController } from "../../controllers/admin/category.controller";
import { CategoryValidator } from "../../validations/admin/category.validation";

const router = Router();

const categoryController = container.resolve(CategoryController);
const categoryValidator = container.resolve(CategoryValidator);

router.get("/getCategoryDetails/:id", categoryValidator.paramsCategoryValidator, categoryController.getCategoryByIdController);
router.get("/getAllCategories", categoryValidator.getAllCategoryValidator, categoryController.getAllActiveCategoriesController);

export default router;
