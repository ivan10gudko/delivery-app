import type { Coupon } from "./coupon.types";
import type { OrderProduct, Product } from "./product.types";

export interface CreateOrder {
    shopId: number;
    customer: Customer;
    items:Omit<OrderItem,'product'>[];
    totalPrice: number;
    couponCode?: string | undefined;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    product: OrderProduct;
}

export interface OrderHistory {
    id: number;
    totalPrice: number;
    createdAt: Date;
    coupon?: Omit<Coupon,'id'> | null;
    shopId:number;
    items: OrderItem[];
}

export interface Customer {
        name: string;
        email: string;
        phone: string;
        address: string;
    };

export const mapOrderItemToProduct= (item:OrderItem):Product => {
    return {
        id:item.productId,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        shopId: item.product.shopId,
        category: item.product.category,
    }
}