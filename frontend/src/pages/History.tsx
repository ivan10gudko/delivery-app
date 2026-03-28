// src/pages/HistoryPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, } from "@/components/ui/field";
import type { OrderHistory,} from "@/types/order.types";
import { OrderHistoryCard } from "@/components/cart/OrderHistoryCard";
import { useOrderHistory } from "@/hooks/useOrderHistory";

const searchSchema = z.object({
    email: z.string().email("Invalid email").or(z.literal("")),
}).refine(data => data.email, {
    message: "Enter email",
    path: ["email"]
});

const History = () => {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: { email: ""}
    });

    const { data: orders, mutate: searchOrders, isPending } = useOrderHistory();

    const onSubmit = (values: {email:string}) => searchOrders(values);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-black mb-8 uppercase">Order History</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card border p-6 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-end">
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder="your@email.com" {...control.register("email")} />
                    </Field>
                <Button type="submit" size="lg" disabled={isPending}>
                    {isPending ? "Searching..." : "Find Orders"}
                </Button>
            </form>

            <div className="space-y-8">
                {orders?.map((order:OrderHistory) => (
                    <OrderHistoryCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default History;