import { prisma } from "../lib/prisma";
import { toShopDto } from "../mappers/shop.mapper";

export const getShops = async (min?: number, max?: number) => {
    const shops = await prisma.shop.findMany({
        where: {
            rating: (min !== undefined || max !== undefined) ? {
                gte: min ?? 0,
                lte: max ?? 5.0
            } : undefined
        },
        orderBy: { rating: 'desc' }
    });

    return shops.map(toShopDto);
};