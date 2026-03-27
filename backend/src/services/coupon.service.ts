import { prisma } from "../lib/prisma";
import { ValidationError } from "../lib/errors";

export const getAllCoupons = async () => {
    return await prisma.coupon.findMany();
};

export const validateCoupon = async (code: string) => {
    const coupon = await prisma.coupon.findUnique({
        where: { code }
    });

    if (!coupon) {
        throw new ValidationError("Invalid or expired coupon code");
    }

    return coupon;
};