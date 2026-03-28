import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBasketIcon,} from 'lucide-react';
import type { Shop } from '@/types/shop.types';
import { ShopSidebar } from './ShopSidebar';

interface MobileFilterTriggerProps {
    shops: Shop[];
    isLoading: boolean;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const MobileFilterTrigger = ({ shops, isLoading, isOpen, setIsOpen }: MobileFilterTriggerProps) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden w-full flex gap-2">
                    <ShoppingBasketIcon />
                    Shop
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-100 p-6">
                <ShopSidebar shops={shops} isLoading={isLoading} />
            </SheetContent>
        </Sheet>
    );
};