/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { SortBy, SortOrder } from '@/types/api.types';

interface FilterState {
    shopId: number | null;
    categoryId: number | undefined;
    sortBy: SortBy;
    order: SortOrder;
}

type FilterAction =
    | { type: 'SET_SHOP'; payload: number }
    | { type: 'SET_CATEGORY'; payload: number | undefined }
    | { type: 'SET_SORT'; payload: { sortBy: SortBy; order: SortOrder } }
    | { type: 'RESET' };

const initialState: FilterState = {
    shopId: null,
    categoryId: undefined,
    sortBy: 'name',
    order: 'asc',
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case 'SET_SHOP':
            return { ...state, shopId: action.payload, categoryId: undefined };
        case 'SET_CATEGORY':
            return { ...state, categoryId: action.payload };
        case 'SET_SORT':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const FilterContext = createContext<{
    state: FilterState;
    dispatch: React.Dispatch<FilterAction>;
} | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilters must be used within FilterProvider');
    return context;
};