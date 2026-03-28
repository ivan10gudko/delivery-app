import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useValidateCoupon } from "@/hooks/useValidateCoupon";

export const CartForm = () => {
    const { dispatch } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [isApplied, setIsApplied] = useState(false);
    const validateMutation = useValidateCoupon();

    const handleApply = () => {
        validateMutation.mutate(couponCode, {
            onSuccess: (data) => {
                dispatch({
                    type: "APPLY_COUPON",
                    payload: data.discountPercent,
                });
                setIsApplied(true);
            },
        });
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-semibold border-b pb-4 mb-6">
                Customer Details
            </h2>
            <div className="space-y-6 grow">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="bg-background"
                    />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="phone">Phone:</Label>
                    <Input type="tel" id="phone" placeholder="+380..." />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="address">Address:</Label>
                    <Input
                        type="text"
                        id="address"
                        placeholder="Main St, 123"
                    />
                </div>

                <div className="grid gap-2 p-4 bg-muted/30 rounded-lg border border-dashed">
                    <Label htmlFor="coupon" className="flex justify-between">
                        Coupon Code{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                            (Optional)
                        </span>
                    </Label>
                    <div className="flex gap-2">
                        <div className="relative grow">
                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="coupon"
                                placeholder="PROMO2026"
                                className="pl-9"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={isApplied}
                            />
                            {isApplied && (
                                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleApply}
                            disabled={
                                !couponCode ||
                                isApplied ||
                                validateMutation.isPending
                            }
                        >
                            {validateMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Apply"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
