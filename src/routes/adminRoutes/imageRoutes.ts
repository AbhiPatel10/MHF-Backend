import { Router } from "express";
import { container } from "tsyringe";
import multer from 'multer';
import { ImageController } from "../../controllers/admin/image.controller";
import { ImageValidator } from "../../validations/admin/image.validation";

const router = Router();

const imageController = container.resolve(ImageController);
const imageValidator = container.resolve(ImageValidator);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadImage', upload.single('image'), imageController.uploadImageController);
router.delete('/deleteImage/:adminImageId', imageValidator.imageDeleteValidator, imageController.deleteImageController);

export default router;
