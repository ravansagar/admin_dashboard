"use client"

import DashboardHeader from "../../../components/dashboardHeader";
import DashboardShell from "../../../components/dashboardShell";
import ProductForm from "../../../components/productForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Product" text="Update product details" />
            <div className="grid gap-8">
                <ProductForm product={{ id: Number(params.productId), name: '', price: 0, description:'', imageUrl: '', categoryId: 0, initialStock: 0, availableStock: 0}} />
            </div>
        </DashboardShell>
    );
}
