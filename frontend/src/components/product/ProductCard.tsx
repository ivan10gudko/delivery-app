import { type Product } from '@/types/product.types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const handleAddToCart = () => {
        console.log('Added:', product.name);
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all border-zinc-200">
            <div className="aspect-4/3 bg-zinc-50 relative border-b flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="text-zinc-300 relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 border-[0.5px] border-zinc-200 rotate-30 translate-y-1/2 scale-150" />
                        <div className="absolute inset-0 border-[0.5px] border-zinc-200 -rotate-30 -translate-y-1/2 scale-150" />
                        <span className="text-xs uppercase font-bold z-10 bg-white px-2">No Image</span>
                    </div>
                )}
            </div>
            
            <CardContent className="p-4 grow">
                <h3 className="font-medium text-base text-zinc-900">{product.name}</h3>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-lg font-bold">
                    ${product.price}
                </span>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddToCart}
                    className="rounded-lg border-zinc-300 hover:bg-zinc-100"
                >
                    add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};