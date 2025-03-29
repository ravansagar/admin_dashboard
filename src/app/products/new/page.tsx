import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import ProductForm from "@/components/productForm";

export default function NewProduct() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Add Product" text="Add new product to the list" />
            <div className="grid gap-4">
                <ProductForm />
            </div>
        </DashboardShell>
    );
}