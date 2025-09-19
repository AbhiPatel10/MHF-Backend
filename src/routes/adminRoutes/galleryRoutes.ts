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

export default router;
