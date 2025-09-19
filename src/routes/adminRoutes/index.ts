import { Router } from "express";
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
import volunteerRoutes from './volunteerRoutes';
import eventRoutes from './event.routes';
import categoryRoutes from './category.route';

const router = Router();

router.use("/auth", authRoutes);
router.use("/image", imageRoutes);
router.use("/volunteer", volunteerRoutes);
router.use("/event", eventRoutes);
router.use("/category", categoryRoutes);
// router.use('/image', adminAuthMiddleware, imageRoutes);

export default router;
