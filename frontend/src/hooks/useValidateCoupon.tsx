import { apiService } from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useValidateCoupon = () => {
    return useMutation({
        mutationFn: (code: string) => apiService.validateCoupon(code),
        onError: () => {
            toast.error("Invalid coupon code, Please check the code and try again.");
        },
        onSuccess: (data) => {
            toast.success(`Coupon applied! You got a ${data.discountPercent}% discount.`);
        }
    });
};