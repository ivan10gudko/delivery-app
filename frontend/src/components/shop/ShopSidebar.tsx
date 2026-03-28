import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useFilters } from '@/context/FilterContext';
import type { Shop } from '@/types/shop.types';
import { Skeleton } from '../ui/skeleton';

interface ShopSidebarProps {
    shops: Shop[];
    isLoading: boolean;
}

export const ShopSidebar = ({ shops, isLoading }: ShopSidebarProps) => {
    const { state, dispatch } = useFilters();

    const handleShopSelect = (shopId: number) => {
        dispatch({ type: 'SET_SHOP', payload: shopId });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold px-4">Shops:</h2>
                <Separator />
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold px-4">Shops:</h2>
            <Separator />
            <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                    {shops.map((shop) => (
                        <Button
                            key={shop.id}
                            variant={state.shopId === shop.id ? 'default' : 'ghost'}
                            className="w-full justify-start text-left font-medium text-base h-12"
                            onClick={() => handleShopSelect(shop.id)}
                        >
                            {shop.name}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};