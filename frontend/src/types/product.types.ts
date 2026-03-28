export interface Product{
    id: number;
    name: string;
    price: number;
    image: string | null;
    shopId: number;
    category: string;
}

export type OrderProduct = Omit<Product,'id'|'shopId'|'category'>