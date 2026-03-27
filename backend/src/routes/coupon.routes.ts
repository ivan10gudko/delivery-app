import { Router } from 'express';
import * as CouponController from '../controllers/coupon.controller';

const router = Router();

router.get('/', CouponController.getCoupons);
router.get('/coupons/validate', CouponController.checkCoupon);

export default router;