import { CartForm } from "@/components/cart/CartForm";
import { CartItemList } from "@/components/cart/CartItemList";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrderSchema, type CartFormValues } from "@/schemas/CreateOrderSchema";


const Cart = () => {
    const { state } = useCart();
    const { mutate: createOrder} = useCreateOrder();
    

    const form = useForm<CartFormValues>({
        resolver: zodResolver(CreateOrderSchema),
        defaultValues: {
            shopId: state.shopId || 0,
            customer: { name: "", email: "", phone: "", address: "" },
            couponCode: "",
        },
    });

    const onSubmit = (values: CartFormValues) => {
        if (!state.shopId) return;

        const finalOrder = {
            shopId: state.shopId,
            customer: values.customer,
            couponCode: values.couponCode || undefined,
            items: state.items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
            totalPrice:
                state.totalPrice -
                (state.totalPrice * state.discountPercent) / 100,
        };

        createOrder(finalOrder);
    };

    const { errors } = form.formState;
    console.log("Validation Errors:", errors);

    return (
        <div className="container mx-auto px-4 py-8">
            {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed rounded-xl">
                    <p className="text-xl text-muted-foreground">
                        Your cart is empty
                    </p>
                </div>
            ) : (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="container mx-auto px-4 py-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                            <CartForm form={form} />
                        </div>
                        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                            <CartItemList />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Cart;
