import { Router } from 'express';
import { container } from 'tsyringe';
import { GalleryController } from '../../controllers/v1/gallery.controller';

const router = Router();

const galleryController = container.resolve(GalleryController);

router.get('/getGalleryImages', galleryController.getGalleryImagesController);

export default router;
