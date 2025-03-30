import { NextResponse } from "next/server";
import { createCategory } from "../../../server/actions";

export async function POST(request: Request) {
    const { name, imageUrl } = await request.json();

    if (!name || !imageUrl) {
        return NextResponse.json({ error: "Name and Image URL are required." }, { status: 400 });
    }

    try {
        const newCategory = await createCategory({name, imageUrl}); 
        return NextResponse.json(newCategory, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Something went wrong while creating the category." }, { status: 500 });
    }
}