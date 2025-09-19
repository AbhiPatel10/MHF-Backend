import { Router } from 'express';
import { container } from 'tsyringe';
import { GalleryController } from '../../controllers/admin/gallery.controller';
import { GalleryValidator } from '../../validations/admin/gallery.validation';

const router = Router();

const galleryController = container.resolve(GalleryController);
const galleryValidator = container.resolve(GalleryValidator);

router.post('/addImageToGallery', galleryValidator.updateGalleryValidator, galleryController.addImageToGalleryController);
router.get('/getGalleryImages', galleryController.getGalleryImagesController);
router.delete('/deleteImageFromGallery/:id', galleryController.removeImageToGalleryController);

router.patch(
  '/updateGallery/:id',
  galleryValidator.updateGalleryValidator,
  galleryController.updateGalleryController
);

export default router;
