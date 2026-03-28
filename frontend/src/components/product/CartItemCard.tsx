import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCart, type CartItem } from "@/context/CartContext";

interface CartItemCardProps{
    item: CartItem
}

const CartItemCard = ({item}:CartItemCardProps) => {
    const { dispatch } = useCart();
    
    return (
        <div
            key={item.id}
            className="flex gap-4 border p-3 rounded-lg bg-background shadow-sm"
        >
            <div className="w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0">
                <img
                    src={item.image ?? "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-base">{item.name}</h4>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        }
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex justify-between items-center">
                    <p className="font-semibold text-primary">${item.price}</p>

                    <div className="flex items-center gap-2 border rounded-md p-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                                dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: {
                                        id: item.id,
                                        quantity: item.quantity - 1,
                                    },
                                })
                            }
                        >
                            <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                                dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: {
                                        id: item.id,
                                        quantity: item.quantity + 1,
                                    },
                                })
                            }
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
