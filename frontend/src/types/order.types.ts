import type { Coupon } from "./coupon.types";
import type { OrderProduct } from "./product.types";

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
    items: OrderItem[];
}

export interface Customer {
        name: string;
        email: string;
        phone: string;
        address: string;
    };