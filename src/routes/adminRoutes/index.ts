import { Router } from "express";
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import { adminAuthMiddleware } from "../../middlewares/authMiddleware";
import imageRoutes from './imageRoutes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/category", adminAuthMiddleware, categoryRoutes);
router.use('/image', adminAuthMiddleware, imageRoutes);

export default router;
