import { Prisma } from "@prisma/client";
import { ProductShortDto } from "../schemas/product.schema";

type ProductWithCategory = Prisma.ProductGetPayload<{
    include: { category: true }
}>;

export const toProductShortDto = (product: ProductWithCategory): ProductShortDto => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image: product.image || "https://via.placeholder.com/150?text=No+Image",
    shopId: product.shopId,
    category: product.category?.name || 'General'
});