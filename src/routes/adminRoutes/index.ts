import { Router } from 'express';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
import volunteerRoutes from './volunteerRoutes';
import galleryRoutes from './galleryRoutes';
import blogRoutes from './blog.routes';
import eventRoutes from './event.routes';
import categoryRoutes from './category.route';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/image', imageRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/gallery', galleryRoutes);
router.use("/event", eventRoutes);
router.use("/category", categoryRoutes);
router.use("/blog", blogRoutes);
router.use("/contact", contactRoutes);


export default router;
