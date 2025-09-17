import { Router } from "express";
import authRoutes from './authRoutes';
import volunteerRoutes from './volunteerRoutes';
import { adminAuthMiddleware } from "../../middlewares/authMiddleware";
import imageRoutes from './imageRoutes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/volunteer", volunteerRoutes);
// router.use('/image', adminAuthMiddleware, imageRoutes);

export default router;
