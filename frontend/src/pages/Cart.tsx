import { CartForm } from "@/components/cart/CartForm";
import { CartItemList } from "@/components/cart/CartItemList";
import { useCart } from "@/context/CartContext";

const Cart = () => {
    const { state } = useCart();

    return (
        <div className="container mx-auto px-4 py-8">
            {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed rounded-xl">
                    <p className="text-xl text-muted-foreground">Your cart is empty</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                        <CartForm />
                    </div>
                    <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                        <CartItemList />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;