"use server"

import { db } from "../lib/db/db";
import { categories } from "../lib/db/schema";
import { products } from "../lib/db/schema";
import { eq } from "drizzle-orm";

interface categoryAdd {
    name: string,
    imageUrl: string
}

interface productAdd {
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    initialStock: number,
    availableStock: number,
    categoryId: number
}

export async function getCategory(id: number){
    try{
        const categoryInfo = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
        return categoryInfo[0] || null;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw new Error("Unable to fetch the category");
    }
}

export async function getProduct(id: number){
    try{
        const productInfo = await db.select().from(products).where(eq(products.id, id)).limit(1);
        return productInfo[0] || null;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Unable to fetch the product");
    }
}

export async function deleteCategory(id: number) {
    try {
        const existingCategory = await db.select().from(categories).where(eq(categories.id, id));
        if (existingCategory.length === 0) {
            throw new Error(`Category with ID ${id} not found`);
        }
        await db.delete(categories).where(eq(categories.id, id)).returning();
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Unable to delete the category");
    }
}

export async function deleteProduct(id: number) {
    try {
        const existingProduct = await db.select().from(products).where(eq(products.id, id));
        if (existingProduct.length === 0) {
            throw new Error(`Product with ID ${id} not found`);
        }
        await db.delete(products).where(eq(products.id, id)).returning();
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Unable to delete the product");
    }
}

export async function getCategories() {
    const categoriesList = await db.select().from(categories);
    return categoriesList;
}

export async function getProducts() {
    const productList = await db.select().from(products);
    return productList;
}

export async function getCategoryProductCounts (categoryId: number) {
    const productList = await db.select().from(products);
    return productList.filter(product => product.categoryId === categoryId).length;
}

export async function createCategory({name, imageUrl} : categoryAdd){
    const newCategory = await db.insert(categories).values({name, imageUrl}).returning();
    return newCategory;
}

export async function updateCategory(categoryId : number, { name, imageUrl} : categoryAdd) {
    try {
        const result = await db.update(categories).set({ name, imageUrl, updatedAt: new Date() }).where(eq(categories.id, categoryId)); 
        return result;
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Update failed');
    }
}

export async function createProducts({name, description, price, imageUrl, initialStock, availableStock, categoryId} : productAdd) {
    const newProduct = await db.insert(products).values({name, description, price, imageUrl, initialStock, availableStock, categoryId}).returning();
    return newProduct;
}

export async function updateProduct(productId : number, { name, price, description, imageUrl, initialStock, availableStock, categoryId} : productAdd) {
    try {
        const result = await db.update(products).set({ name, price, description, imageUrl, initialStock, availableStock, categoryId, updatedAt: new Date() }).where(eq(products.id, productId)); 
        return result;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Update failed');
    }
}