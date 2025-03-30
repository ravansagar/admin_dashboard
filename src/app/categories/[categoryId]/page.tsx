"use client"

import DashboardShell from "../../../components/dashboardShell";
import DashboardHeader from "../../../components/dashboardHeader";
import { CategoryForm } from "../../../components/categoryForm";
import { useParams } from "next/navigation";


export default function EditCategoryPage() {

    const params = useParams();
    const categoryIdNumber = Number(params.categoryId);

    if (isNaN(categoryIdNumber)) {
        return <p className="text-red-500">Invalid Category ID</p>;
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Category" text="Update category details" />
            <div className="grid gap-8">
                <CategoryForm category={{ id: categoryIdNumber, name: "", imageUrl: "" }} />
            </div>
        </DashboardShell>
    );
}