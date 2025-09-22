import { Router } from 'express';
import { container } from 'tsyringe';

import { HelloController } from '../../controllers/v1/hello.controller';
import contactRoutes from './contact.routes';

const router = Router();

const helloController = container.resolve(HelloController);

router.get('/getHello', helloController.getHelloController);
router.use('/contact', contactRoutes);

export default router;