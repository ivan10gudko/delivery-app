import { Router } from 'express';
import productRoutes from './product.routes';
import shopRoutes from './shop.routes';
import orderRoutes from './order.routes';
import couponRoutes from './coupon.routes';
import categoryRoutes from './category.routes';
import { apiKeyMiddleware } from '../middleware/apiKey.middleware';

const router = Router();

router.use(apiKeyMiddleware);

router.use('/products', productRoutes);
router.use('/shops', shopRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);
router.use('/categories', categoryRoutes);

export default router;