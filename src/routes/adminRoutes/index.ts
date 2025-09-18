import { Router } from "express";
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
import volunteerRoutes from './volunteerRoutes';
import { adminAuthMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/image", imageRoutes);
router.use("/volunteer", volunteerRoutes);
// router.use('/image', adminAuthMiddleware, imageRoutes);

export default router;
