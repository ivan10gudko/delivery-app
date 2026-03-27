import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.post('/', OrderController.postOrder);
router.get('/history',OrderController.getHistory)

export default router;