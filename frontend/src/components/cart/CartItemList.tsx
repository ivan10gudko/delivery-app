import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import CartItemCard from "../product/CartItemCard";

export const CartItemList = () => {
    const { state } = useCart();

    const discountAmount = (state.totalPrice * state.discountPercent) / 100;
    const finalPrice = state.totalPrice - discountAmount;

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-semibold border-b pb-4 mb-4">
                Order Summary
            </h2>

            <div className="grow overflow-y-auto pr-2 space-y-4 mb-6">
                {state.items.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                ))}
            </div>

            <div className="mt-auto pt-4 border-t space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
                </div>

                {state.discountPercent > 0 && (
                    <div className="flex justify-between text-sm font-medium text-primary">
                        <span>Discount ({state.discountPercent}%):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-wider">
                            Total:
                        </span>
                        <span className="text-4xl font-black text-primary leading-none">
                            ${finalPrice.toFixed(2)}
                        </span>
                    </div>
                    <Button
                        size="lg"
                        className="px-10 rounded-full font-bold shadow-lg bg-primary hover:scale-105 transition-transform"
                    >
                        SUBMIT ORDER
                    </Button>
                </div>
            </div>
        </div>
    );
};
