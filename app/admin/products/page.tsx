"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AddProductForm from "@/components/AddProductForm"
import AdminProductList from "@/components/AdminProductList"

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Products Management</h2>
      </div>
      
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <AddProductForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="xl:col-span-3">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminProductList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
