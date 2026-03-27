import { Request, Response } from 'express';
import { catchAsync } from '../lib/catchAsync';
import { ShopQuerySchema } from '../schemas/shop.schema'; // Імпортуємо схему
import * as ShopService from '../services/shop.service';
import { ValidationError } from '../lib/errors';

export const getAllShops = catchAsync(async (req: Request, res: Response) => {
    const result = ShopQuerySchema.safeParse(req.query);

    if (!result.success) {
        throw new ValidationError(result.error.message);
    }

    const { min, max } = result.data;

    const shops = await ShopService.getShops(min, max);

    res.json(shops);
});