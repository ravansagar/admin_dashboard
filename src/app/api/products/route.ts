import { NextResponse } from "next/server";
import { createProducts } from "../../../server/actions";

export async function POST(request: Request){
    const { name, price, description, imageUrl, initialStock, availableStock, categoryId } = await request.json();
    console.log({ name, description, imageUrl, initialStock, availableStock, categoryId } );
    if(!name || !description || !imageUrl || initialStock === undefined || availableStock === undefined || !categoryId) {
        return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    try {
        const newProduct = await createProducts({ name, price, description, imageUrl, initialStock, availableStock, categoryId });
        return NextResponse.json(newProduct, {status: 200});
    } catch {
        return NextResponse.json({ error: "Something went wrong while creating the product." }, { status: 500 });
    }
}
