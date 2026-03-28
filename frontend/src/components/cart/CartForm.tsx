import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useValidateCoupon } from "@/hooks/useValidateCoupon";
import { Controller, type UseFormReturn} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import type { CartFormValues } from "@/schemas/CreateOrderSchema";

interface CartFormProps{
    form:UseFormReturn<CartFormValues>;
}
export const CartForm = ({form}:CartFormProps) => {
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
                form.setValue("couponCode", couponCode)
                setIsApplied(true);
            },
        });
    };

    return (
        <div className="space-y-6 grow">
            <h2 className="text-xl font-bold border-b pb-4">
                Customer Details
            </h2>

            <Controller
                name="customer.name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Name Surname"
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="customer.email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                            {...field}
                            type="email"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="email@example.com"
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="customer.phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="0981234567"
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="customer.address"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Kyiv, Ukraine"
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

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
    );
};
