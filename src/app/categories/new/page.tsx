"use client"

import DashboardHeader from "../../../components/dashboardHeader";
import DashboardShell from "../../../components/dashboardShell";
import { CategoryForm } from "../../../components/categoryForm";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function NewCategory(){
    const { isSignedIn } = useAuth();
    if(!isSignedIn){
        return <RedirectToSignIn />;
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="Create Category" text="Add new product category"/>
            <div className="grid gap-8">
                <CategoryForm />
            </div>
        </DashboardShell>
    );
}