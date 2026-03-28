import { apiService } from "@/api/apiService";
import { useFilters } from "@/context/FilterContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteProducts = () => {
    const { state } = useFilters();
    const { shopId, categoryId, sortBy, order } = state;

    return useInfiniteQuery({
        queryKey: ["products", { shopId, categoryId, sortBy, order }],

        queryFn: ({ pageParam = 1 }) =>
            apiService.getProductsInfinite({
                pageParam,
                shopId: shopId!,
                categoryId,
                sortBy,
                order,
                limit: 12,
            }),

        getNextPageParam: (lastPage) => {
            const { page, lastPage: totalPages } = lastPage.meta;
            return page < totalPages ? page + 1 : undefined;
        },

        initialPageParam: 1,
        enabled: shopId !== null,
    });
};
