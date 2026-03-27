import { Request, Response } from 'express';
import { catchAsync } from '../lib/catchAsync';
import * as CategoryService from '../services/category.service';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
});