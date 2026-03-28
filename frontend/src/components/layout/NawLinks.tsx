import { cn } from "@/lib/utils";
import { History, Store, Ticket } from "lucide-react";
import { NavLink } from "react-router";
import ShopCartIcon from "./ShopCartIcon";

const ShopingIcon = ({ className }: { className: string }) => (
    <ShopCartIcon className={className} containerClassName="mr-2" />
);

const navItems = [
    { name: "Shop", path: "/shop", icon: Store },
    { name: "Shopping Cart", path: "/cart", icon: ShopingIcon },
    { name: "History", path: "/history", icon: History },
    { name: "Coupons", path: "/coupons", icon: Ticket },
];

interface NavLinksProps {
    onClick?: () => void;
    pathname: string;
    className?: string;
}

const NavLinks = ({ onClick, pathname, className }: NavLinksProps) => (
    <>
        {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                        className,
                        isActive ? "text-primary" : "text-muted-foreground",
                    )}
                >
                    <Icon className="size-4" />
                    {item.name}
                </NavLink>
            );
        })}
    </>
);

export default NavLinks;
