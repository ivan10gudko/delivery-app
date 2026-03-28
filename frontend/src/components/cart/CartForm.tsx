import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const CartForm = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Customer Details</h2>
            
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" placeholder="John Doe" className="bg-background" />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" placeholder="john@example.com" />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone:</Label>
                <Input type="tel" id="phone" placeholder="+380..." />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="address">Address:</Label>
                <Input type="text" id="address" placeholder="Main St, 123" />
            </div>
        </div>
    );
};