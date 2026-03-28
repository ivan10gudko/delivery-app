import { z } from 'zod';

export const CreateOrderSchema = z.object({
    shopId: z.number().int().positive(),
    couponCode: z.string().optional(),
    customer: z.object({
        name: z.string().min(2, "Name is too short"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone is too short"),
        address: z.string().min(10, "Address is too short"),
    }),
    items: z.array(z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().min(1),
    })).min(1, "Cart cannot be empty"),
    totalPrice: z.number().positive(),
});

export const OrderHistoryQuerySchema = z.object({
    email: z.string().email("Invalid email format")
});


export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;

export interface OrderItemResponseDto {
    productId: number;
    quantity: number;
    product: {
        name: string;
        price: number;
        image: string | null;
    };
}

export interface OrderHistoryResponseDto {
    id: number;
    totalPrice: number;
    createdAt: Date;
    shopId:number;
    coupon?: {
        code: string;
        discountPercent: number;
    } | null;
    items: OrderItemResponseDto[];
}