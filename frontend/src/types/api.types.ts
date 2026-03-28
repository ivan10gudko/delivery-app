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

export interface InfiniteProductsParams {
    pageParam?: number;
    shopId: number;
    categoryId?: number;
    sortBy?: SortBy;
    order?: SortOrder;
    limit?: number;
}