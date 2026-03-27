import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    ShoppingCart,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NawLinks";


export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur ssupports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-end px-4">

                <nav className="hidden md:flex items-center gap-6">
                    <NavLinks pathname={location.pathname} />
                </nav>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="relative md:hidden"
                        asChild
                    >
                        <Link to="/cart">
                            <ShoppingCart className="size-5" />
                        </Link>
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-64 sm:w-75 py-20 px-8"
                        >
                            <nav className="flex flex-col gap-8">
                                <NavLinks
                                    onClick={() => setIsOpen(false)}
                                    pathname={location.pathname}
                                    className="text-lg font-semibold"
                                    />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
