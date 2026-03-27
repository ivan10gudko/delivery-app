import { Request, Response } from 'express';
import { catchAsync } from '../lib/catchAsync';
import * as CouponService from '../services/coupon.service';
import { ValidateCouponSchema } from '../schemas/coupon.schema';
import { ValidationError } from '../lib/errors';

export const getCoupons = catchAsync(async (req: Request, res: Response) => {
    const coupons = await CouponService.getAllCoupons();
    res.json(coupons);
});

export const checkCoupon = catchAsync(async (req: Request, res: Response) => {
    const result = ValidateCouponSchema.safeParse(req.query);
    
    if (!result.success) {
        throw new ValidationError(result.error.message);
    }

    const coupon = await CouponService.validateCoupon(result.data.code);
    res.json(coupon);
});