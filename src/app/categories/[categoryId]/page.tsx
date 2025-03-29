import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { CategoryForm } from "@/components/categoryForm";
import { getCategory } from "@/server/actions";

interface CategoryPageProps {
    params: { categoryId: string; }
}

export default async function editCategoryPage({params}: CategoryPageProps){
    const categoryIdNumber = Number(params.categoryId);
    const Category = await getCategory(categoryIdNumber);
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Category" text="Update category details" />
            <div className="grid gap-8">
                <CategoryForm category={Category} />
            </div>
        </DashboardShell>
    );
}