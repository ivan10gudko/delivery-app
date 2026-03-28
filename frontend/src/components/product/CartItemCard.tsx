import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCart, type CartItem } from "@/context/CartContext";

interface CartItemCardProps {
    item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
    const { dispatch } = useCart();

    const updateQty = (newQty: number) => {
        if (newQty < 1) return;
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: { id: item.id, quantity: newQty },
        });
    };

    return (
        <div className="flex gap-3 sm:gap-4 border p-3 rounded-xl bg-background shadow-sm overflow-hidden min-h-27.5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                <img
                    src={item.image ?? "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="grow flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm sm:text-base leading-tight line-clamp-2 wrap-break-word">
                        {item.name}
                    </h4>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-8 w-8 text-destructive shrink-0 hover:bg-destructive/10"
                        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex justify-between items-center gap-2 mt-2">
                    <p className="font-bold text-primary text-sm sm:text-base whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="flex items-center border rounded-lg p-0.5 bg-muted/30">
                        <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-background"
                            onClick={() => updateQty(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold">
                            {item.quantity}
                        </span>

                        <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-background"
                            onClick={() => updateQty(item.quantity + 1)}
                        >
                            <Plus className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;