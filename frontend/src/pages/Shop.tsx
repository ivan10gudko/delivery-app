import { MobileFilterTrigger } from '@/components/shop/MobileFilterTrigger';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { Toolbar } from '@/components/shop/Toolbar';
import { useFilters } from '@/context/FilterContext';
import { useShops } from '@/hooks/useShops';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const { state, dispatch } = useFilters();
    const { data: shops, isLoading: isShopsLoading,isSuccess } = useShops();
    
    useEffect(() => {
        if (isSuccess && shops && shops.length > 0 && state.shopId === null) {
            dispatch({ type: 'SET_SHOP', payload: shops[0].id });
            dispatch({type:'SET_CATEGORY', payload: undefined})//set all
        }
    }, [isSuccess, shops, state.shopId, dispatch]);

    return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    <aside className="hidden md:block w-full md:w-1/4 sticky top-20 h-[calc(100vh-(--spacing(24)))] overflow-y-auto pr-2">
                        <ShopSidebar 
                            shops={shops || []} 
                            isLoading={isShopsLoading} 
                        />
                    </aside>

                    <main className="flex-1">
                        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
                            <Toolbar />
                            <MobileFilterTrigger
                                shops={shops || []}
                                isLoading={isShopsLoading}
                                isOpen={isMobileFiltersOpen}
                                setIsOpen={setIsMobileFiltersOpen}
                            />
                        </div>

                        <ProductGrid />
                    </main>
                </div>
            </div>
    );
};

export default Shop;