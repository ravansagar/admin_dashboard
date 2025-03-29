import DashboardHeader from "@/components/dashboardHeader";
import DashboardShell from "@/components/dashboardShell";
import ProductForm from "@/components/productForm";
import { NextResponse } from "next/server";

export default function EditProductPage(req: Request) {
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop() || "0";
    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) {
        return NextResponse.json({ error: 'Invalid categoryId.' }, { status: 400 });
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="Edit Product" text="Update product details" />
            <div className="grid gap-8">
                <ProductForm product={{ id: productIdNumber, name: '', price: 0, description: '', imageUrl: '', categoryId: 0, initialStock: 0, availableStock: 0 }} />
            </div>
        </DashboardShell>
    );
}
