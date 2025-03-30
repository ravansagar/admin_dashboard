"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogCancel, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteCategory, getCategories, getCategoryProductCounts } from "../server/actions";

interface Category {
    id: number;
    name: string;
    imageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} 
  

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [productCounts, setProductCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
                const counts: {[key: string]: number} = {};
                for(const category of fetchedCategories) {
                    const count = await getCategoryProductCounts(category.id);
                    counts[category.id] = count;
                }
                setProductCounts(counts);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    async function handleDelete(id: number) {
        await deleteCategory(id);
        window.location.reload();
    }

    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative">
                        <Image src={category.imageUrl || ''} alt={category.name} fill className="object-cover h-1 w-4" />
                    </div>
                    <CardHeader>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>Total Products: {productCounts[category.id] || 0}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/products/${category.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action is not reversable. Are you sure you want delete this category.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(category.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

}