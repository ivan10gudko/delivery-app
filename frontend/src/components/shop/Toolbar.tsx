import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/context/FilterContext";
import { useCategories } from "@/hooks/useCategories";
import type { SortBy, SortOrder } from "@/types/api.types";
import type { Category } from "@/types/category.types";

export const Toolbar = () => {
    const { state, dispatch } = useFilters();
    const { data: categories, isLoading: isCategoriesLoading } =
        useCategories();
    
        const currentCategoryValue = state.categoryId === undefined ? "all" : String(state.categoryId);

    const handleCategoryChange = (value: string) => {
        const categoryId = value === "all" ? undefined : Number(value);
        dispatch({ type: "SET_CATEGORY", payload: categoryId });
    };

    const handleSortChange = (value: string) => {
        const [sortBy, order] = value.split("_") as [SortBy, SortOrder];
        dispatch({ type: "SET_SORT", payload: { sortBy, order } });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select
                disabled={isCategoriesLoading || !state.shopId}
                onValueChange={handleCategoryChange}
                value={currentCategoryValue}
            >
                <SelectTrigger className="w-full sm:w-55">
                    <SelectValue placeholder="Виберіть категорію" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories?.map((cat: Category) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                disabled={!state.shopId}
                onValueChange={handleSortChange}
                defaultValue={`${state.sortBy}_${state.order}`}
            >
                <SelectTrigger className="w-full sm:w-55">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price_asc">
                        Price (from lower)
                    </SelectItem>
                    <SelectItem value="price_desc">
                        Price (from higher)
                    </SelectItem>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
