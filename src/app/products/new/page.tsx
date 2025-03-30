"use client"

import DashboardHeader from "../../../components/dashboardHeader";
import DashboardShell from "../../../components/dashboardShell";
import ProductForm from "../../../components/productForm";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function NewProduct() {
    const { isSignedIn } = useAuth();
    if(!isSignedIn){
        return <RedirectToSignIn />;
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="Add Product" text="Add new product to the list" />
            <div className="grid gap-4">
                <ProductForm />
            </div>
        </DashboardShell>
    );
}