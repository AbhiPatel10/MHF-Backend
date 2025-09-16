// import { Router } from "express";
// import { container } from "tsyringe";
// import { ProductValidator } from "../../validations/v1/product.validation";
// import { ProductsController } from "../../controllers/v1/products.controller";

// const router = Router();

// const productsController = container.resolve(ProductsController);
// const productValidator = container.resolve(ProductValidator);

// router.post('/createProduct', productValidator.createProductValidator, productsController.createProductsController);
// router.get('/getAllProducts', productsController.getAllProductsController);
// router.get('/getProductDetails/:productId', productValidator.getProductDetailsValidator, productsController.getProductDetailsController);
// router.put('/updateProduct/:productId', productValidator.paramsProductIdValidator, productValidator.updateProductValidator, productsController.updateProductsController);
// router.delete("/deleteProduct/:productId", productValidator.paramsProductIdValidator, productsController.deleteProductsController);

// export default router;
