import { Order, Prisma } from "@prisma/client";
import { OrderHistoryResponseDto } from "../schemas/order.schema";
type OrderWithInclude = Prisma.OrderGetPayload<{
    include:{coupon:true,items:true}
}>;
export const toOrderHistoryDto = (order: OrderWithInclude): OrderHistoryResponseDto => ({
    id: order.id,
    totalPrice: order.totalPrice,
    shopId: order.shopId,
    createdAt: order.createdAt,
    coupon: order.coupon ? {
        code: order.coupon.code,
        discountPercent: order.coupon.discountPercent
    } : null,
    items: order.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        product: {
            name: item.product.name,
            price: Number(item.product.price),
            image: item.product.image,
            shopId: item.product.shopId,
            category: item.product.category?.name || 'General'
        }
    }))
});