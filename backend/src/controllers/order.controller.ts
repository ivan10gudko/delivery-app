import { Request, Response } from 'express';
import { catchAsync } from '../lib/catchAsync';
import { CreateOrderSchema, OrderHistoryQuerySchema } from '../schemas/order.schema';
import * as OrderService from '../services/order.service';
import { ValidationError } from '../lib/errors';

export const postOrder = catchAsync(async (req: Request, res: Response) => {
    const result = CreateOrderSchema.safeParse(req.body);

    if (!result.success) {
        throw new ValidationError(result.error.message);
    }

    const order = await OrderService.createOrder(result.data);

    res.status(201).json(order);
});

export const getHistory = catchAsync(async (req: Request, res: Response) => {
    const result = OrderHistoryQuerySchema.safeParse(req.query);

    if (!result.success) {
        throw new ValidationError(result.error.message);
    }

    const orders = await OrderService.getOrdersByCustomer(result.data.email);
    res.json(orders);
});