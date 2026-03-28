import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Receipt, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
    mapOrderItemToProduct,
    type OrderHistory,
    type OrderItem,
} from "@/types/order.types";
import { useNavigate } from "react-router";

export const OrderHistoryCard = ({ order }: { order: OrderHistory }) => {
    const { dispatch } = useCart();
    const navigate = useNavigate();

    const handleReorder = () => {
        const cartItems = order.items.map((oi: OrderItem) => ({
            ...mapOrderItemToProduct(oi),
            quantity: oi.quantity,
        }));

        dispatch({
            type: "REORDER",
            payload: { items: cartItems, shopId: order.shopId },
        });

        toast.success("Order items added to cart!");
        navigate("/cart");
    };

    return (
        <div className="bg-white border-2 border-zinc-200 rounded-lg shadow-sm relative overflow-hidden font-mono">
            <div className="h-2 bg-primary w-full" />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Receipt className="w-5 h-5" />
                            <span>ORDER #{order.id}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <Button
                        onClick={handleReorder}
                        variant="outline"
                        size="sm"
                        className="gap-2 border-primary text-primary hover:bg-primary/5"
                    >
                        <RefreshCw className="w-4 h-4" /> REORDER
                    </Button>
                </div>

                <div className="space-y-2 mb-6">
                    {order.items.map((item: OrderItem) => (
                        <div
                            key={item.productId}
                            className="flex justify-between text-sm"
                        >
                            <span>
                                {item.quantity}x {item.product.name}
                            </span>
                            <span>
                                $
                                {(item.quantity * item.product.price).toFixed(
                                    2,
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                <Separator className="border-dashed mb-4" />
                {order.coupon ? (
                        
                        <div
                            key={order.coupon.code}
                            className="flex justify-between text-sm  text-primary mb-2"
                        >
                            <span>{order.coupon.code}</span>
                            <span>{order.coupon.discountPercent}%</span>
                        </div>
                        
                    ) : null}
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>TOTAL:</span>
                    <span className="text-primary">
                        ${order.totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="flex justify-between px-2 pb-1">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="w-3 h-3 bg-zinc-100 rounded-full -mb-2.5"
                    />
                ))}
            </div>
        </div>
    );
};
