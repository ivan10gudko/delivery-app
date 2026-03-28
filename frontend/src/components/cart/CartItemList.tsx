import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';

export const CartItemList = () => {
    const { state, dispatch } = useCart();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
            
            <div className="max-h-75 overflow-y-auto pr-2 space-y-4">
                {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 border p-3 rounded-lg bg-background shadow-sm">
                        <div className="w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0">
                            <img src={item.image ?? '/placeholder.svg'} alt={item.name} className="object-cover w-full h-full" />
                        </div>
                        
                        <div className="grow flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-base">{item.name}</h4>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-primary">${item.price}</p>
                                
                                <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button
                                        variant="ghost" size="icon" className="h-7 w-7"
                                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <Button
                                        variant="ghost" size="icon" className="h-7 w-7"
                                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center pt-4">
                <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Total amount:</span>
                    <span className="text-3xl font-bold text-primary">${state.totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="px-12 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
                    SUBMIT ORDER
                </Button>
            </div>
        </div>
    );
};