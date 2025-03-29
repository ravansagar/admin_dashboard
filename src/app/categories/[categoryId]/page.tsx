import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { CategoryForm } from "@/components/categoryForm";

interface CategoryPageProps {
    params: {
        categoryId: number
    }
}

export default function editCategoryPage({params}: CategoryPageProps){
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Category" text="Update category details" />
            <div className="grid gap-8">
                <CategoryForm category={{ id: Number(params.categoryId) }} />
            </div>
        </DashboardShell>
    );
}