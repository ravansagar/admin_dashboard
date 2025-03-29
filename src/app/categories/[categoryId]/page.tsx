import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { CategoryForm } from "@/components/categoryForm";
import { NextResponse } from "next/server";

const EditCategoryPage = (req: Request) => {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop() || "0";
    const categoryIdNumber = Number(categoryId);
    if (isNaN(categoryIdNumber)) {
        return NextResponse.json({ error: 'Invalid categoryId.' }, { status: 400 });
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Category" text="Update category details" />
            <div className="grid gap-8">
                <CategoryForm category={{ id: categoryIdNumber, name: '', imageUrl: '' }} />
            </div>
        </DashboardShell>
    );
};

export default EditCategoryPage;