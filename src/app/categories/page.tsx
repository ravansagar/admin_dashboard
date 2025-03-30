"use client"

import React from "react";
import DashboardHeader from "../../components/dashboardHeader";
import DashboardShell from "../../components/dashboardShell";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CategoryList from "../../components/CategoryList";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function CtegoriesPage(){
    const { isSignedIn } = useAuth();
    if(!isSignedIn){
        return <RedirectToSignIn />;
    }
    return(
        <DashboardShell>
            <DashboardHeader heading="Categories" text="Manage product categories...">
                <Button asChild>
                    <Link href="/categories/new">
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Category
                    </Link>
                </Button>
            </DashboardHeader>
            <CategoryList />
        </DashboardShell>
    );
}
