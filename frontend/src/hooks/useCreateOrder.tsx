import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { apiService } from '@/api/apiService';
import { useCart } from '@/context/CartContext';

export const useCreateOrder = () => {
    const { dispatch } = useCart();

    return useMutation({
        mutationFn: apiService.createOrder,
        onSuccess: () => {
            toast.success("Order created successfully! You can check your order status in the history tab."
            );
            dispatch({ type: 'CLEAR_CART' });
        },
        onError: (error: unknown) => {
            let message: string;
            if(error instanceof AxiosError){
                message = error.response?.data?.message
            }else if(error instanceof Error){
                message = error.message
            }else{
                message = "Something went wrong";
            }

            toast.error(`Failed to create order. ${message}`);
        }
    });
};