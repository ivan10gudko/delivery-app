import { Separator } from '@/components/ui/separator';
import { useFilters } from '@/context/FilterContext';
import type { Shop } from '@/types/shop.types';
import { RatingFilter } from './RatingFilter';
import { ShopSidebarSkeleton } from './ShopSidebarSkeleton';
import { ShopList } from './ShopList';

interface ShopSidebarProps {
    shops: Shop[];
    isLoading: boolean;
}

export const ShopSidebar = ({ shops, isLoading }: ShopSidebarProps) => {
    const { state, dispatch } = useFilters();

    if (isLoading) return <ShopSidebarSkeleton />;

    return (
        <div className="space-y-6 flex flex-col h-full py-2">
            <RatingFilter 
                currentMin={state.min}
                onSelect={(min, max) => dispatch({ type: 'SET_RATING_RANGE', payload: { min, max } })} 
            />

            <Separator />

            <ShopList
                shops={shops}
                activeShopId={state.shopId}
                onShopSelect={(id) => dispatch({ type: 'SET_SHOP', payload: id })} 
            />
        </div>
    );
};