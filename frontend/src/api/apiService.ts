import type { InfiniteProductsParams, PaginatedResponse, ShopParams } from '@/types/api.types';
import type { Category } from '@/types/category.types';
import type { Coupon } from '@/types/coupon.types';
import type { CreateOrder } from '@/types/order.types';
import type { Product } from '@/types/product.types';
import type { Shop } from '@/types/shop.types';
import { apiClient } from './apiClient';

const DEFAULT_PAGE_LIMIT = 12;

export const apiService = {
    getShops: async (params?: ShopParams) => {
        const { data } = await apiClient.get<Shop[]>('/shops', { params });
        return data;
    },

    getCategories: async () => {
        const { data } = await apiClient.get<Category[]>('/categories');
        return data;
    },

    getCoupons: async () => {
        const { data } = await apiClient.get('/coupons');
        return data;
    },
    
    validateCoupon: async (code: string) => {
        const { data } = await apiClient.get<Coupon>('/coupons/validate', {
            params: { code }
        });
        return data;
    },

    getProductsInfinite: async ({
        pageParam = 1,
        shopId,
        categoryId,
        sortBy = 'name',
        order = 'desc',
        limit = DEFAULT_PAGE_LIMIT
    }: InfiniteProductsParams) => {
        const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', {
            params: {
                page: pageParam,
                shopId,
                categoryId,
                sortBy,
                order,
                limit,
            }
        });
        return data;
    },

    createOrder: async (orderData: CreateOrder) => {
        const { data } = await apiClient.post('/orders', orderData);
        return data;
    },

    getOrderHistory: async (email: string) => {
        const { data } = await apiClient.get('/orders/history', {
            params: { email }
        });
        return data;
    },
};