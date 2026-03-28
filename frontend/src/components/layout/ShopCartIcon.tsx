import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
interface ShopCartIconProps {
    className?: string;
    containerClassName?: string;
}
const ShopCartIcon = ({ className,containerClassName }: ShopCartIconProps) => {
    const { state } = useCart();
    return (
        <div className={cn("relative",containerClassName)}>
            <ShoppingCart className={cn("size-5", className)} />
            <span className="absolute -top-3 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {state.items.length}
            </span>
        </div>
    );
};

export default ShopCartIcon;
