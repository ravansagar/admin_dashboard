import { NextResponse } from "next/server";
import { updateCategory } from "@/server/actions";

export async function PUT(request: Request, { params }: { params: { categoryId: number } }) {
    const { name, imageUrl } = await request.json();
    const categoryId = params.categoryId;
    if (!name || !imageUrl) {
        return NextResponse.json({ error: "Name and Image URL are required." }, { status: 400 });
    }
    try {
        const newCategory = await updateCategory( categoryId, {name, imageUrl}); 
        return NextResponse.json(newCategory, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Something went wrong while updating the category." }, { status: 500 });
    }
}