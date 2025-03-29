import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { CategoryForm } from "@/components/categoryForm";

interface editCategory {
  params: { categoryId: string }; 
}

const EditCategoryPage = ({ params }: editCategory) => {
  const categoryIdNumber = Number(params.categoryId);

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
