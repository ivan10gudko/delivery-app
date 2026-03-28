import { type Coupon } from '@/types/coupon.types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Ticket } from 'lucide-react';

export const CouponCard = ({ coupon }: { coupon: Coupon }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(coupon.code);
        toast.success(`Code copied! Coupon ${coupon.code} is ready to use.`
        );
    };

    return (
        <Card className="group relative overflow-hidden border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors">
            {/* Декоративні "вирізи" з боків, щоб було схоже на квиток */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-2 border-primary/20 rounded-full" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-2 border-primary/20 rounded-full" />
            
            <CardHeader className="bg-muted/30 pb-4 flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Ticket className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Save money</p>
                    <h3 className="text-2xl font-black text-primary">{coupon.discountPercent}% OFF</h3>
                </div>
            </CardHeader>

            <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2 italic">Use this code at checkout:</p>
                <div className="bg-muted p-3 rounded-md font-mono font-bold text-lg tracking-widest border border-zinc-200">
                    {coupon.code}
                </div>
            </CardContent>

            <CardFooter className="pb-6">
                <Button
                    onClick={handleCopy} 
                    className="w-full gap-2 font-bold uppercase tracking-tighter"
                    variant="default"
                >
                    <Copy className="w-4 h-4" />
                    Copy Code
                </Button>
            </CardFooter>
        </Card>
    );
};