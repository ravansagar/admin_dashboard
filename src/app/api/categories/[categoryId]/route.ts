import { NextResponse } from 'next/server';
import { updateCategory } from '../../../../server/actions';

export async function PUT(req: Request) {

    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop() || "0";

    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId)) {
        return NextResponse.json({ error: 'Invalid categoryId.' }, { status: 400 });
    }

    const { name, imageUrl } = await req.json();

    if (!name || !imageUrl) {
        return NextResponse.json({ error: 'Name and Image URL are required.' }, { status: 400 });
    }

    try {
        const newCategory = await updateCategory(parsedCategoryId, { name, imageUrl });
        return NextResponse.json(newCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Something went wrong while updating the category. ${error}` }, { status: 500 });
    }
}
