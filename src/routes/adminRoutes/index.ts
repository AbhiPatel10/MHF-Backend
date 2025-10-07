import { Router } from 'express';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
import volunteerRoutes from './volunteerRoutes';
import galleryRoutes from './galleryRoutes';
import eventRoutes from './event.routes';
import categoryRoutes from './category.route';
import contactRoutes from './contact.routes';
import teamMemberRoutes from './teamMemberRoutes';
import blogRoutes from './blog.routes';
import { adminAuthMiddleware } from '../../middlewares/authMiddleware';


const router = Router();

router.use('/auth', authRoutes);
router.use('/image', adminAuthMiddleware, imageRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/gallery', galleryRoutes);
router.use("/event", eventRoutes);
router.use("/category", categoryRoutes);
router.use("/blog", adminAuthMiddleware, blogRoutes);
router.use("/contact", contactRoutes);
router.use("/team", teamMemberRoutes);

export default router;
