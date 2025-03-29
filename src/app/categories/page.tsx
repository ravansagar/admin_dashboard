import React from "react";
import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CategoryList from "@/components/CategoryList";

export default function categoriesPage(){
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
