import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import ProductForm from "@/components/productForm";
import { NextPage } from "next";

interface editProduct {
    params: {
        productId: string
    }
}

const EditProductPage: NextPage<editProduct> = ({ params }) => {      
    
    const productIdNumber = Number((params as { productId: string }).productId);

    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Product" text="Update product details" />
            <div className="grid gap-8">
                <ProductForm product={{ id: productIdNumber, name: '', price: 0, description: '', imageUrl: '', categoryId: 0, initialStock: 0, availableStock: 0 }} />
            </div>
        </DashboardShell>
    );
}
export default EditProductPage;