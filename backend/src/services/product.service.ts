import { prisma } from "../lib/prisma";
import { toProductShortDto } from "../mappers/product.mapper";
import { ProductQueryDto } from "../schemas/product.schema";

export const getProducts = async (query: ProductQueryDto) => {
    const { shopId, categoryId, sortBy, order, page, limit } = query;

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where: {
                shopId,
                categoryId: categoryId || undefined,
            },
            include: { category: true },
            orderBy: sortBy === 'price' ? { price: order } : { name: order },
            skip,
            take: limit,
        }),
        prisma.product.count({
            where: { shopId, categoryId: categoryId || undefined }
        })
    ]);

    return {
        items: products.map(toProductShortDto),
        meta: {
            total: totalCount,
            page,
            lastPage: Math.ceil(totalCount / limit)
        }
    };
};