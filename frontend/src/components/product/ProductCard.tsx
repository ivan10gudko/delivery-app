import { type Product } from "@/types/product.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { state, dispatch } = useCart();

    const handleAddToCart = () => {
        if (state.shopId !== null && state.shopId !== product.shopId) {
            toast.error(
                "Cart already contains items from another shop. Clear your cart if you want to order from this shop instead.",
                {
                    action: {
                        label: "Clear Cart",
                        onClick: () => dispatch({ type: "CLEAR_CART" }),
                    },
                },
            );
            return;
        }

        dispatch({ type: "ADD_ITEM", payload: product });
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all border-zinc-200 pt-0">
            <div className="aspect-4/3 bg-zinc-100 relative overflow-hidden border-b">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-50 text-zinc-400">
                        <span className="text-xs uppercase font-bold tracking-tighter">No Image</span>
                    </div>
                )}
            </div>

            <CardContent className="p-4 grow flex flex-col justify-between">
                <h3 className="font-bold text-sm md:text-base text-zinc-900 line-clamp-2 min-h-10 md:min-h-12">
                    {product.name}
                </h3>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Price</span>
                    <span className="text-lg font-black text-primary leading-tight">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <Button
                    size="sm"
                    onClick={handleAddToCart}
                    className="font-semibold px-4 shadow-sm hover:shadow-md transition-shadow"
                >
                    Add
                </Button>
            </CardFooter>
        </Card>
    );
};
