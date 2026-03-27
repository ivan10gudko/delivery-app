import { prisma } from "../lib/prisma";

export const getAllCategories = async () => {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
};