import { Router } from 'express';
import { container } from 'tsyringe';

import { HelloController } from '../../controllers/v1/hello.controller';
import contactRoutes from './contact.routes';
import galleryRoutes from './galleryRoutes';
import blogRoutes from './blog.routes';
import categoryRoutes from './category.route';

const router = Router();

const helloController = container.resolve(HelloController);

router.get('/getHello', helloController.getHelloController);
router.use('/contact', contactRoutes);
router.use('/gallery', galleryRoutes);
router.use('/blog', blogRoutes);
router.use('/category', categoryRoutes);

export default router;