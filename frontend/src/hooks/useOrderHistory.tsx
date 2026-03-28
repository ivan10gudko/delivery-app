// src/features/orders/api/useOrderHistory.ts
import { apiService } from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface SearchParams {
    email?: string;
}

export const useOrderHistory = () => {
    return useMutation({
        mutationKey: ["order-history"],

        mutationFn: async ({ email }: SearchParams) => {
            if (!email) return;
            return await apiService.getOrderHistory(email);
        },

        onSuccess: (data) => {
            if (data.length === 0) {
                toast.info(
                    "No orders found, try searching with different credentials.",
                );
            } else {
                toast.success(`Found ${data.length} orders`);
            }
        },

        onError: (error: unknown) => {
            let message: string;
            if (error instanceof AxiosError) {
                message = error.response?.data?.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else {
                message = "Failed to fetch history";
            }
            toast.error("Error", { description: message });
        },
    });
};
