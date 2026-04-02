import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddProductForm } from "@/components/AddProductForm"

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <AddProductForm />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Product list will be displayed here.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
