export interface PaginatedResponse<T> {
    items: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
    };
}

export interface ShopParams {
    min?: number;
    max?: number;
}

export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name'|'price';

export interface ProductFilter{
    shopId: number;
    categoryId?: number;
    sortBy?: SortBy;
    order?: SortOrder;
}

export interface InfiniteProductsParams extends ProductFilter{
    pageParam?: number;
    limit?: number;
}