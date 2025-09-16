import { Router } from 'express';
import { container } from 'tsyringe';
import { HelloController } from '../../controllers/v1/hello.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import categoryRoutes from './categoryRoutes';
import authRoutes from './authRoutes';
import businessRoutes from './businessRoutes';
import serviceRoutes from './serviceRoutes';
import productRoutes from './products.routes';
import imageRoutes from './imageRoutes';
import teamRoutes from './teamRoutes';
import reviewsRoutes from './reviewsRoutes';
import userRoutes from './userRoutes';

const router = Router();

const helloController = container.resolve(HelloController);

router.get('/getHello', helloController.getHelloController);
router.use("/category", authMiddleware, categoryRoutes);
router.use("/auth", authRoutes);
router.use('/business', authMiddleware, businessRoutes);
router.use('/service', authMiddleware, serviceRoutes);
router.use('/product', authMiddleware, productRoutes);
router.use('/image', authMiddleware, imageRoutes);
router.use('/team', authMiddleware, teamRoutes);
router.use('/reviews', authMiddleware, reviewsRoutes);
router.use('/user', authMiddleware, userRoutes);

export default router;