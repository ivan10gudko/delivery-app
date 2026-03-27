import { OrderHistoryResponseDto } from "../schemas/order.schema";

export const toOrderHistoryDto = (order: any): OrderHistoryResponseDto => ({
    id: order.id,
    totalPrice: order.totalPrice,
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
            image: item.product.image
        }
    }))
});