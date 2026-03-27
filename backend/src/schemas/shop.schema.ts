import { z } from 'zod';

export const ShopQuerySchema = z.object({
    min: z.coerce
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),
    max: z.coerce
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),
});

export interface ShopResponseDto {
    id: number;
    name: string;
    rating: number;
    image?: string;
}

export type ShopQueryDto = z.infer<typeof ShopQuerySchema>;