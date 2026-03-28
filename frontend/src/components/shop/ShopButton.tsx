import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Shop } from '@/types/shop.types';

interface ShopButtonProps {
    shop: Shop;
    isActive: boolean;
    onClick: () => void;
}

export const ShopButton = ({ shop, isActive, onClick }: ShopButtonProps) => (
    <Button
        variant={isActive ? 'default' : 'outline'}
        className={cn(
            "w-full justify-between text-left font-bold h-14 rounded-xl transition-all",
            isActive && "shadow-lg scale-[1.02] border-primary"
        )}
        onClick={onClick}
    >
        <span className="truncate">{shop.name}</span>
        <div className={cn(
            "flex items-center text-xs px-2 py-1 rounded-lg",
            isActive 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted text-amber-500"
        )}>
            <Star className="w-3 h-3 fill-current mr-1" />
            {shop.rating.toFixed(1)}
        </div>
    </Button>
);