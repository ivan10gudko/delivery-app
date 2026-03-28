/* eslint-disable react-refresh/only-export-components */
import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from "react";
import { type Product } from "@/types/product.types";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
    shopId: number | null;
    discountPercent: number;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: number } // id
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "APPLY_COUPON"; payload: number }
    | { type: "CLEAR_CART" };

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
    totalPrice: 0,
    shopId: null,
    discountPercent: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    let newItems;
    switch (action.type) {
        case "ADD_ITEM": {
            const newItem = action.payload;

            if (state.shopId !== null && state.shopId !== newItem.shopId) {
                return state;
            }

            const existingItem = state.items.find(
                (item) => item.id === newItem.id,
            );
            const newItems = existingItem
                ? state.items.map((item) =>
                      item.id === newItem.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item,
                  )
                : [...state.items, { ...newItem, quantity: 1 }];

            return {
                ...state,
                items: newItems,
                shopId: newItem.shopId,
            };
        }
        case "REMOVE_ITEM": {
            newItems = state.items.filter((item) => item.id !== action.payload);
            return { ...state, items: newItems };
        }
        case "UPDATE_QUANTITY": {
            newItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: Math.max(1, action.payload.quantity),
                      }
                    : item,
            );
            return { ...state, items: newItems };
        }

        case "APPLY_COUPON": {
            return { ...state, discountPercent: action.payload };
        }
        case "CLEAR_CART": {
            return {
                ...state,
                items: [],
                totalPrice: 0,
                shopId: null,
                discountPercent: 0,
            };
        }

        default:
            return state;
    }
}

const CartContext = createContext<
    | {
          state: CartState;
          dispatch: React.Dispatch<CartAction>;
      }
    | undefined
>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.items));
    }, [state.items]);

    return (
        <CartContext.Provider
            value={{ state: { ...state, totalPrice }, dispatch }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
