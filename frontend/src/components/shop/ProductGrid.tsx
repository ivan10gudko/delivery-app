import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { PaginatedResponse } from '@/types/api.types';
import type { Product } from '@/types/product.types';
import { useInfiniteProducts } from '@/hooks/useProducts';
import { ProductCard } from '../product/ProductCard';

export const ProductGrid = () => {
    const { ref, inView } = useInView();
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteProducts();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isPending) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-87.5 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load products. Please try again later.</AlertDescription>
            </Alert>
        );
    }

    if (isPending && !data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p className="text-lg italic">Firstly, select a shop </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.pages.map((page:PaginatedResponse<Product>) =>
                    page.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>

            <div ref={ref} className="py-8 flex justify-center">
                {isFetchingNextPage ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                ) : hasNextPage ? (
                    <span className="text-sm text-muted-foreground">Scroll to load more...</span>
                ) : (
                    <span className="text-sm text-muted-foreground font-medium">
                        These are all products in this category
                    </span>
                )}
            </div>
        </div>
    );
};