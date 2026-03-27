import { Router } from 'express';
import productRoutes from './product.routes';
import shopRoutes from './shop.routes';
import orderRoutes from './order.routes';
import couponRoutes from './coupon.routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/shops', shopRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);

export default router;