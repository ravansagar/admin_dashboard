import { NextResponse } from "next/server";
import { updateProduct } from "@/server/actions";

export async function PUT(request: Request, { params }: { params: { productId: string } }) {

    const { name, price, description, imageUrl, initialStock, availableStock, categoryId } = await request.json();

    const productId = Number(params.productId);

    if (!name || !price || !description || !imageUrl || !initialStock || !availableStock || !categoryId) {
        return NextResponse.json({ error: "Data are missing to update the product." }, { status: 400 });
    }
    try {
        const newProduct = await updateProduct( productId, { name, price, description, imageUrl, initialStock, availableStock, categoryId }); 
        return NextResponse.json(newProduct, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Something went wrong while updating product." }, { status: 500 });
    }
}