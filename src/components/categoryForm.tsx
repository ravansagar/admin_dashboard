"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { ImageUpload } from "./ImageUpload";
import { getCategory } from "../server/actions";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Category name must be at least 4 chars long."
    }),
    image: z.string().min(1, {
        message: "Please upload an image of the category"
    })
})

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}


export function CategoryForm({category} : {category?: Category}){
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<{ name: string; imageUrl: string } | null>(null);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
        }
    })

    useEffect(() => {
      if (category?.id) {
        const fetchCategory = async () => {
          try {
            const fetchedCategory = await getCategory(category.id);
            if (fetchedCategory) {
              const data = fetchedCategory; 
              setCategoryData({ name: data.name, imageUrl: data.imageUrl || "" });
              form.reset({ name: data.name, image: data.imageUrl || "" });
            }
          } catch (error) {
            console.error("Error fetching category:", error);
            setError("Failed to load category data");
          }
        };
        fetchCategory();
      }
    }, [category, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        setError("")
        const isEditing = !!category?.id;
        const url = isEditing ? `/api/categories/${category.id}` : "/api/categories";
        const method = isEditing ? "PUT" : "POST";

        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              imageUrl: values.image,
            }),
          })
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Something went wrong")
          }
            router.push("/categories");
            router.refresh();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message)
          } else if (typeof error === "object" && error !== null && "message" in error) {
            setError((error as { message: string }).message)
          } else {
            setError("An unknown error occurred.")
          }
        } finally {
          setLoading(false)
        }
      }

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => {
                                return (<FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>);
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({field}) => {
                               return (<FormItem>
                                    <FormLabel>Category Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload value={categoryData?.imageUrl || field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>);
                            }}
                        />
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="flex justify-end">
                            <Button type="button" variant="outline" className="mr-2" onClick={()=>{
                                router.push("/categories")}}>Cancel</Button>
                            <Button type="submit" disabled={loading}>{loading ? "Saving..." : category?.id ? "Update Category" : "Create Category"}</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

