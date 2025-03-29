import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import { CategoryForm } from "@/components/categoryForm";

export default function NewCategory(){
    return (
        <DashboardShell>
            <DashboardHeader heading="Create Category" text="Add new product category"/>
            <div className="grid gap-8">
                <CategoryForm />
            </div>
        </DashboardShell>
    );
}