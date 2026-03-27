import MainLayout from "@/layouts/MainLayout";
import Cart from "@/pages/Cart";
import Coupons from "@/pages/Coupons";
import History from "@/pages/History";
import Shop from "@/pages/Shop";
import { createBrowserRouter, Navigate } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/shop" replace /> },
            {path:"shop", element: <Shop />},
            {path:"cart", element: <Cart />},
            {path:"history", element: <History />},
            {path:"coupons", element: <Coupons />}
        ],
    },
]);

export default router;
