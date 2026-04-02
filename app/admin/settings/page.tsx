import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Settings</h2>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Store Name</label>
              <Input defaultValue="E-commerce Store" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Contact Email</label>
              <Input defaultValue="admin@example.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email for every new order.</p>
              </div>
              <Button variant="outline">Enabled</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Inventory Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when products are low on stock.</p>
              </div>
              <Button variant="outline">Enabled</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
