import { apiService } from '@/api/apiService';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => apiService.getCategories(),
        staleTime: 10 * 60 * 1000,
    });
};