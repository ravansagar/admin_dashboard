import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import ProductForm from "@/components/productForm";

interface editProduct {
    params: {
        productId: string
    }
}

export default function EditProductPage({ params }: editProduct) {
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Product" text="Update product details" />
            <div className="grid gap-8">
                <ProductForm product={{ id: Number(params.productId)}} />
            </div>
        </DashboardShell>
    );
}
