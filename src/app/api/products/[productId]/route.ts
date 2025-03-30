import { NextResponse } from "next/server";
import { updateProduct } from "../../../../server/actions";

export async function PUT(req: Request) {
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop() || "0";

    const parsedProductId = parseInt(productId, 10);
    if (isNaN(parsedProductId)) {
        return NextResponse.json({ error: 'Invalid categoryId.' }, { status: 400 });
    }
    const { name, price, description, imageUrl, initialStock, availableStock, categoryId } = await req.json();

    if (!name || !price || !description || !imageUrl || !initialStock || !availableStock || !categoryId) {
        return NextResponse.json({ error: "Data are missing to update the product." }, { status: 400 });
    }
    try {
        const newProduct = await updateProduct( parsedProductId, { name, price, description, imageUrl, initialStock, availableStock, categoryId }); 
        return NextResponse.json(newProduct, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Something went wrong while updating product." }, { status: 500 });
    }
}