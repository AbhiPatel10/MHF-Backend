import { Router } from 'express';
import v1Router from '../routes/v1';
import adminRoutes from '../routes/adminRoutes/index';


const router = Router();

// Mount versioned routes
router.use('/v1', v1Router);
router.use('/admin', adminRoutes);


export default router;