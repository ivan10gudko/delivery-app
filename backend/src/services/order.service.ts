import { prisma } from "../lib/prisma";
import { CreateOrderDto } from "../schemas/order.schema";
import { ValidationError } from "../lib/errors";
import { toOrderHistoryDto } from "../mappers/order.mapper";

export const createOrder = async (dto: CreateOrderDto) => {
    return await prisma.$transaction(async (tx) => {
        let couponId: number | undefined;
        if (dto.couponCode) {
            const coupon = await tx.coupon.findUnique({
                where: { code: dto.couponCode }
            });
            if (!coupon) throw new ValidationError("Invalid coupon code");
            couponId = coupon.id;
        }

        const customer = await tx.customer.upsert({
            where: { email: dto.customer.email },
            update: {
                address: dto.customer.address,
                phone: dto.customer.phone,
                name: dto.customer.name
            },
            create: dto.customer,
        });

        const products = await tx.product.findMany({
            where: { id: { in: dto.items.map(i => i.productId) } }
        });

        if (products.some(p => p.shopId !== dto.shopId)) {
            throw new ValidationError("All items must be from the selected shop");
        }

        const order = await tx.order.create({
            data: {
                totalPrice: dto.totalPrice,
                customerId: customer.id,
                couponId: couponId,
                items: {
                    create: dto.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                items: true,
                customer: true,
                coupon: true
            }
        });

        return order;
    });
};

export const getOrdersByCustomer = async (email: string) => {
    const orders = await prisma.order.findMany({
        where: {
            customer: {
                email: email
            }
        },
        include: {
            items: {
                include: {
                    product: {
                        include: { category: true }
                    }
                }
            },
            coupon: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return orders.map(toOrderHistoryDto);
};