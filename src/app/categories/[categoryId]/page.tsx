import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { CategoryForm } from "@/components/categoryForm";
import { NextPage } from "next";

interface CategoryPageProps {
  params: { categoryId: string };
}

const EditCategoryPage: NextPage<CategoryPageProps> = ({ params }) => {    
    const categoryIdNumber = Number(params.categoryId);
    return (
    <DashboardShell>
      <DashboardHeader heading="Edit Category" text="Update category details" />
      <div className="grid gap-8">
        <CategoryForm category={{ id: categoryIdNumber, name: '', imageUrl: '' }} />
      </div>
    </DashboardShell>
  );
}

export default EditCategoryPage;