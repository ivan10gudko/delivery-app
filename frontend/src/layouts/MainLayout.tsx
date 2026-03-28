import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
        <Toaster position="top-center" duration={2000} closeButton/>
        <div className="relative min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
        </>
    );
}
