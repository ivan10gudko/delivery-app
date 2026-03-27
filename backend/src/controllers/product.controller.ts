import { Request, Response } from 'express';
import { catchAsync } from '../lib/catchAsync';
import { ProductQuerySchema } from '../schemas/product.schema';
import * as ProductService from '../services/product.service';
import { ValidationError } from '../lib/errors';

export const getProducts = catchAsync(async (req: Request, res: Response) => {
    console.log("Request received!");
    const result = ProductQuerySchema.safeParse(req.query);

    if (!result.success) {
        throw new ValidationError(result.error.message);
    }
    
    const data = await ProductService.getProducts(result.data);
    res.json(data);
});