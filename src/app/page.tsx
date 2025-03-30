"use client"

import DashboardShell from "../components/dashboardShell";
import DashboardHeader from "../components/dashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getCategories, getProducts } from "../server/actions";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      console.log(categories);
      const products = await getProducts();
      setCategoriesCount(categories.length);
      setProductsCount(products.length);
    }

    fetchData();
  }, []);

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Welcome to super admin dashboard." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesCount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount}</div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}