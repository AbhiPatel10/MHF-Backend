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
import volunteerApplicationRoutes from './volunteerApplicationRoutes';
import newsLetterRoutes from './newsletter.routes';
import { adminAuthMiddleware } from '../../middlewares/authMiddleware';


const router = Router();

router.use('/auth', authRoutes);
router.use('/image', adminAuthMiddleware, imageRoutes);
router.use('/volunteer', adminAuthMiddleware, volunteerRoutes);
router.use('/gallery', adminAuthMiddleware, galleryRoutes);
router.use("/event", adminAuthMiddleware, eventRoutes);
router.use("/category", adminAuthMiddleware, categoryRoutes);
router.use("/blog", adminAuthMiddleware, blogRoutes);
router.use("/contact", adminAuthMiddleware, contactRoutes);
router.use("/team", adminAuthMiddleware, teamMemberRoutes);
router.use("/volunteerApplication", adminAuthMiddleware, volunteerApplicationRoutes);
router.use("/newsletter", adminAuthMiddleware, newsLetterRoutes);

export default router;
