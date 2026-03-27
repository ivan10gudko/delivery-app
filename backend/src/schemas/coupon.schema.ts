import { z } from 'zod';

export const ValidateCouponSchema = z.object({
    code: z.string().min(3, "Coupon code is too short"),
});

export type ValidateCouponDto = z.infer<typeof ValidateCouponSchema>;

export interface CouponResponseDto {
    id: number;
    code: string;
    discountPercent: number;
}