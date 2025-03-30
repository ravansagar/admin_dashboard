"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { ImageUpload } from "./ImageUpload";
import { getCategories, getProduct } from "../server/actions";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be 2 chars long."
    }),
    price: z.coerce.number().min(1, {
        message: "Product price must be gretter than 0"
    }),
    description: z.string().min(10, {
        message: "Product description must be 10 chars long."
    }),
    imageUrl: z.string().min(1, {
        message: "Please upload an image of product."
    }),
    categoryId: z.coerce.number().min(1, {
        message: "Please select category of product"
    }),
    initialStock: z.coerce.number().min(1, {
        message: "Initial stuck must be at least 1"
    }),
    availableStock: z.coerce.number().min(0, {
        message: "Available stock cannot be negative."
    })
})

interface Category {
    id: number;
    name: string;
    imageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
} 

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: number;
    initialStock: number;
    availableStock: number;
}

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [productData, setProductData] = useState<{ name: string, price: number, description: string, imageUrl: string, categoryId: number, initialStock: number; availableStock: number } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            imageUrl: "",
            categoryId: 0,
            initialStock: 1,
            availableStock: 1,
        },
    });


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories.");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (product?.id) {
            const fetchProduct = async () => {
                try {
                    const fetchedProduct = await getProduct(product.id);
                    if (fetchedProduct) {
                        const data = fetchedProduct;
                        setProductData({
                            name: data.name,
                            price: data.price || 0,
                            description: data.description || "",
                            imageUrl: data.imageUrl || "",
                            initialStock: data.initialStock,
                            availableStock: data.availableStock,
                            categoryId: data.categoryId || 0,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                    setError("Failed to load product data");
                }
            };
            fetchProduct();
        }
    }, [product?.id]);

    useEffect(() => {
        if (productData) {
            const { name, price, description, imageUrl, initialStock, availableStock, categoryId } = productData;
            if (
                form.getValues("name") !== name ||
                form.getValues("price") !== price ||
                form.getValues("description") !== description ||
                form.getValues("imageUrl") !== imageUrl ||
                form.getValues("initialStock") !== initialStock ||
                form.getValues("availableStock") !== availableStock ||
                form.getValues("categoryId") !== categoryId
            ) {
                form.reset({ name, price, description, imageUrl, initialStock, availableStock, categoryId });
            }
        }
    }, [productData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError("");
        const isEditing = !!product?.id;
        const url = isEditing ? `/api/products/${product.id}` : "/api/products";
        const method = isEditing ? "PUT" : "POST";
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            router.push("/products");
            router.refresh();
        } catch (error) {
            console.error("Something went wrong", error);
            setError("Failed to save product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => {
                                    const selectedCategory = categories.find(
                                        (category) => category.id.toString() === field.value?.toString()
                                    );

                                    return (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                value={field.value?.toString() || ""}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={selectedCategory?.name || "Select a category"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} {...field} />
                                        </FormControl>
                                        <FormDescription>Unit price of the product.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter product description" className="min-h-[120px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload value={productData?.imageUrl || field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="initialStock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Initial Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={1} {...field} />
                                        </FormControl>
                                        <FormDescription>The total quantity of this product.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableStock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} {...field} />
                                        </FormControl>
                                        <FormDescription>The current available quantity.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="button" variant="outline" className="mr-2" onClick={() => router.push("/products")}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}