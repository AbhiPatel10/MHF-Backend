import { Router } from "express";
import { container } from "tsyringe";

import { CategoryController } from "../../controllers/admin/category.controller";
import { CategoryValidator } from "../../validations/admin/category.validation";

const router = Router();

const categoryController = container.resolve(CategoryController);
const categoryValidator = container.resolve(CategoryValidator);

router.post("/createCategory", categoryValidator.createCategoryValidator, categoryController.createCategoryController);
router.get("/getCategoryDetails/:id", categoryValidator.paramsCategoryValidator, categoryController.getCategoryByIdController);
router.put("/updateCategory/:id", categoryValidator.updateCategoryValidator, categoryValidator.paramsCategoryValidator, categoryController.updateCategoryController);
router.get("/getAllCategories", categoryValidator.getAllCategoryValidator, categoryController.getAllCategoriesController);
router.delete("/deleteCategory/:id", categoryValidator.paramsCategoryValidator, categoryController.deleteCategoryController);

export default router;
