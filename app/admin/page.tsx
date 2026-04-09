import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

export default function AdminPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦0.00",
      icon: DollarSign,
      description: "+0% from last month",
    },
    {
      title: "Orders",
      value: "0",
      icon: ShoppingCart,
      description: "+0 since last hour",
    },
    {
      title: "Products",
      value: "0",
      icon: Package,
      description: "In stock",
    },
    {
      title: "Active Users",
      value: "0",
      icon: Users,
      description: "+0 since last week",
    },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-serif tracking-tight text-foreground">Overview</h2>
        <p className="text-muted-foreground text-sm font-medium">Real-time performance and store metrics.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-secondary/20 shadow-none hover:bg-secondary/30 transition-colors rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary opacity-70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif tracking-tight text-foreground">{stat.value}</div>
              <p className="text-[10px] font-bold text-primary mt-1 uppercase tracking-wider">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border bg-background shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-secondary/10 border-b border-border py-6">
            <CardTitle className="font-serif text-xl">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-sm font-medium gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingCart size={20} className="opacity-40" />
              </div>
              No recent orders found.
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-border bg-background shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-secondary/10 border-b border-border py-6">
            <CardTitle className="font-serif text-xl">Popular Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-sm font-medium gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Package size={20} className="opacity-40" />
              </div>
              No product data available.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
