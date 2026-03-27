import { z } from 'zod';

export const ProductQuerySchema = z.object({
    shopId: z.coerce.number().int().positive("Shop ID is required"),
    categoryId: z.coerce.number().int().positive().optional(),

    sortBy: z.enum(['name', 'price']).default('name'),
    order: z.enum(['asc', 'desc']).default('asc'),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ProductQueryDto = z.infer<typeof ProductQuerySchema>;

export interface ProductShortDto {
    id: number;
    name: string;
    price: number;
    image: string | null;
    shopId: number;
    category: string;
}