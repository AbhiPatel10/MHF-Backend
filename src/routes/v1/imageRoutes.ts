// import { Router } from "express";
// import { container } from "tsyringe";
// import multer from 'multer';
// import { ImageController } from "../../controllers/v1/image.controller";
// import { ImageValidator } from "../../validations/v1/image.validation";

// const router = Router();

// const imageController = container.resolve(ImageController);
// const imageValidator = container.resolve(ImageValidator);

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/uploadImage', upload.single('image'), imageController.uploadImageController);
// router.delete('/deleteImage/:imageId', imageValidator.imageDeleteValidator, imageController.deleteImageController);

// export default router;
