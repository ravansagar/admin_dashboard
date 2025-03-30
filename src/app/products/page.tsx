"use client"

import DashboardShell from "../../components/dashboardShell";
import DashboardHeader from "../../components/dashboardHeader";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductList from "../../components/ProductList";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function ProductsPage() {
    const { isSignedIn } = useAuth();
    if(!isSignedIn){
        return <RedirectToSignIn />;
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="Products" text="Manage products">
            <Button asChild>
                <Link href="/products/new">
                 <Plus className="mr-2 h-4 w-4" />
                 Add Product
                </Link>
            </Button>
            </DashboardHeader>
            <ProductList />
        </DashboardShell>
    );
}