import DashboardShell from "@/components/dashboardShell";
import DashboardHeader from "@/components/dashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getProducts } from "@/server/actions";

export default async function Dashboard() {

  const categoriesCount = (await getCategories()).length;
  const productsCount = (await getProducts()).length;

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