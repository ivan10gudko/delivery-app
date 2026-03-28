import { apiService } from '@/api/apiService';
import { useQuery } from '@tanstack/react-query';

export const useCoupons = () => {
    return useQuery({
        queryKey: ['coupons'],
        queryFn: apiService.getCoupons,
    });
};

