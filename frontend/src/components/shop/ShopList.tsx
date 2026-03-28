import { ScrollArea } from '@/components/ui/scroll-area';
import type { Shop } from '@/types/shop.types';
import { ShopButton } from './ShopButton';

interface ShopListProps {
    shops: Shop[];
    activeShopId: number | null;
    onShopSelect: (id: number) => void;
}

export const ShopList = ({ shops, activeShopId, onShopSelect }: ShopListProps) => {
    return (
        <div className="grow flex flex-col overflow-hidden">
            <h2 className="text-xl font-black uppercase tracking-tight px-4 mb-4">
                Shops:
            </h2>
            <ScrollArea className="grow">
                <div className="space-y-2 px-4 pb-6">
                    {shops.length > 0 ? (
                        shops.map((shop) => (
                            <ShopButton
                                key={shop.id}
                                shop={shop}
                                isActive={activeShopId === shop.id}
                                onClick={() => onShopSelect(shop.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-xl mx-2">
                            <p className="text-xs text-muted-foreground italic">
                                No shops found
                            </p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};