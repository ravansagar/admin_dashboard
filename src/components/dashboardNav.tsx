"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LayoutDashboard, ShoppingBag, FolderTree, LogOut } from "lucide-react";
import { useAuth } from '@clerk/nextjs';
import { RedirectToSignIn } from '@clerk/clerk-react';

export default function DashboardNav() {
    const pathName = usePathname();
    const { isLoaded, isSignedIn, signOut } = useAuth();

    if(!isLoaded) {
        return <div className="text-center mx-2">Loading...</div>
    }
    if(!isSignedIn){
        return <RedirectToSignIn />
    }
    const handleLogout = async () => {
        try {
            await signOut(); 
            return <RedirectToSignIn />;
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    const routes = [
        {
            href: '/',
            label: 'Dashboard',
            icon: LayoutDashboard,
            active: pathName === '/',
        },
        {
            href: "/categories",
            label: "Categories",
            icon: FolderTree,
            active: pathName === "/categories" || pathName.startsWith("/categories/"),
        },
        {
            href: "/products",
            label: "Products",
            icon: ShoppingBag,
            active: pathName === "/products" || pathName.startsWith("/products/"),
        },
    ]

    return (
        <nav className="hidden w-[240px] flex-col md:flex">
            <div className="py-8">
                <h2 className="px-2 text-lg font-semibold tracking-tight">Admin Dashboard</h2>
                <div className="space-y-1 py-4">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={route.active ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={route.href}>
                                <route.icon className="mr-2 h-4 w-4" />
                                {route.label}
                            </Link>
                        </Button>
                    ))}

                </div>
            </div>
            <div className="mt-auto pb-8">
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </nav>
    );
}