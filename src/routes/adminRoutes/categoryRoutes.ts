// import { Router } from "express";
// import { container } from "tsyringe";
// import { CategoryValidator } from "../../validations/admin/category.validation";
// import { CategoryController } from "../../controllers/admin/category.controller";

// const router = Router();
// const categoryController = container.resolve(CategoryController);
// const categoryValidator = container.resolve(CategoryValidator);

// // Category routes
// router.post('/createCategory', categoryValidator.createCategoryValidator, categoryController.createCategoryController);
// router.get('/getAllCategories', categoryValidator.getAllCategoryValidator, categoryController.getAllCategoriesController);
// router.patch('/updateCategory', categoryValidator.updateCategoryValidator, categoryController.updateCategoryController);
// router.get("/:categoryId/getCategoryDetails", categoryValidator.getCategoryValidator, categoryController.getCategoryByIdController);
// router.put('/activeInactiveCategory', categoryValidator.activeInactiveCategoryValidator, categoryController.activeInactiveCategoryController);
// router.delete('/:categoryId/removeCategory', categoryValidator.softDeleteCategoryValidator, categoryController.softDeleteCategoryController);

// // Subcategory Routes
// router.post('/createSubCategory', categoryValidator.createSubCategoryValidator, categoryController.createSubCategoryController);
// router.get("/:subCategoryId/getSubCategory", categoryValidator.getSubCategoryValidator, categoryController.getSubCategoryDetailsController);
// router.get('/:categoryId/getAllSubCategories', categoryValidator.getAllSubCategoryValidator, categoryController.getAllSubCategoriesController);
// router.patch('/updateSubCategory', categoryValidator.updateSubCategoryValidator, categoryController.updateSubCategoryController);
// router.put('/activeInactiveSubCategory', categoryValidator.activeInactiveSubCategoryValidator, categoryController.activeInactiveSubCategoryController);
// router.delete('/:subCategoryId/removeSubCategory', categoryValidator.softDeleteSubCategoryValidator, categoryController.softDeleteSubCategoryController);

// export default router;
