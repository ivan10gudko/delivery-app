// src/features/shops/ui/ShopSidebarSkeleton.tsx
import { Skeleton } from '../ui/skeleton';
import { Separator } from '@/components/ui/separator';

export const ShopSidebarSkeleton = () => (
    <div className="space-y-6">
        <div className="space-y-4 px-4">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-7 w-16 rounded-full" />)}
            </div>
        </div>
        <Separator />
        <div className="space-y-2 px-4">
            <Skeleton className="h-6 w-20 mb-4" />
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
        </div>
    </div>
);