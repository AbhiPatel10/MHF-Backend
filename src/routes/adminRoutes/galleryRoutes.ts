import { Router } from 'express';
import { GalleryController } from '../../controllers/admin/gallery.controller';
import { GalleryValidator } from '../../validations/admin/gallery.validation';
import { container } from 'tsyringe';

const router = Router();

const galleryController = container.resolve(GalleryController);
const galleryValidator = container.resolve(GalleryValidator);

router.post(
  '/addImageToGallery',
  galleryValidator.updateGalleryValidator,
  galleryController.addImageToGalleryController
);

router.get('/getGalleryImages', galleryController.getGalleryImagesController);

router.delete(
  '/deleteImageFromGallery/:id',
  galleryController.removeImageToGalleryController
);

export default router;
