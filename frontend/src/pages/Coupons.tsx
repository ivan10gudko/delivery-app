import { CouponCard } from '@/components/coupon/CouponCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCoupons } from '@/hooks/useCoupons';
import type { Coupon } from '@/types/coupon.types';

const Coupons = () => {
    const { data: coupons, isLoading, isError } = useCoupons();

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-62.5 rounded-xl" />
                ))}
            </div>
        );
    }

    if (isError) return <div className="text-center py-20 text-destructive">Failed to load coupons.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-black mb-8 uppercase tracking-tight">Available Coupons</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons?.map((coupon:Coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                ))}
            </div>
        </div>
    );
};

export default Coupons;