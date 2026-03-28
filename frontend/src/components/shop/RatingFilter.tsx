import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const RATING_RANGES = [
    { label: "All", min: null, max: null },
    { label: "4.0 - 5.0", min: 4.0, max: 5.0 },
    { label: "3.0 - 4.0", min: 3.0, max: 4.0 },
    { label: "2.0 - 3.0", min: 2.0, max: 3.0 },
];

export const RatingFilter = ({ currentMin, onSelect }: {
    currentMin: number | null,
    onSelect: (min: number | null, max: number | null) => void
}) => (
    <div className="space-y-4 px-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Rating Filter
        </h3>
        <div className="flex flex-wrap gap-2">
            {RATING_RANGES.map((range) => {
                const isActive = currentMin === range.min;
                return (
                    <button
                        key={range.label}
                        onClick={() => onSelect(range.min, range.max)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-all flex items-center gap-1",
                            isActive 
                                ? "bg-primary text-primary-foreground border-primary shadow-md" 
                                : "bg-background text-muted-foreground hover:border-primary/50 border-border"
                        )}
                    >
                        <Star className={cn("w-3 h-3", isActive && "fill-current")} />
                        {range.label}
                    </button>
                );
            })}
        </div>
    </div>
);