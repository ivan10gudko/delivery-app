import * as z from "zod";

export const CreateOrderSchema = z.object({
    shopId: z.number().int().positive(),
    couponCode: z.string().optional(),
    customer: z.object({
        name: z.string().min(2, "Name is too short"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone is too short"),
        address: z.string().min(10, "Address is too short"),
    }),
    // items and totalPrice would be added bafore submit
});


export type CartFormValues = z.infer<typeof CreateOrderSchema>;
