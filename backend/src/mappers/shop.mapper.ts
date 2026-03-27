import { Shop } from "@prisma/client";
import { ShopResponseDto } from "../schemas/shop.schema";

export const toShopDto = (shop: Shop): ShopResponseDto => ({
    id: shop.id,
    name: shop.name,
    rating: Number(shop.rating),
});