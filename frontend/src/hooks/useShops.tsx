import { useQuery } from '@tanstack/react-query';
import type { ShopParams } from '@/types/api.types';
import { apiService } from '@/api/apiService';

export const useShops = (params?: ShopParams) => {
    return useQuery({
        queryKey: ['shops', params],
        queryFn: () => apiService.getShops(params),
        staleTime: 5 * 60 * 1000,
    });
};