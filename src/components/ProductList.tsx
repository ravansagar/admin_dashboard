"use client"

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { getProducts, deleteProduct } from "../server/actions";

interface Product {
    id: number;
    name: string;
    price: number | null;
    description: string | null;
    imageUrl: string | null;
    categoryId: number | null;
    initialStock: number;
    availableStock: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    },[])

    async function handleDeleteProduct (id: number) {
        await deleteProduct(id);
        window.location.reload();
    }
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead className="hidden md:table-cell pl-16">Description</TableHead>
                        <TableHead className="text-center">Avaliable Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="font-medium">{product.price}</TableCell>
                            <TableCell>
                                <div className="h-16 w-16 relative rounded-md overflow-hidden">
                                    <Image src={product.imageUrl || ''} alt={product.name} fill className="object-cover"/>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell max-w-[200px] pl-16 truncate">{product.description}</TableCell>
                            <TableCell className="text-center">{product.availableStock}/{product.initialStock}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/products/${product.id}`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>This action is not reversable. Are you sure you want delete this product</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={()=> handleDeleteProduct(product.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
}