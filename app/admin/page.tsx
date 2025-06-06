import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "245",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "123",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "1,234",
    icon: Users,
  },
  {
    title: "Total Revenue",
    value: "$12,345",
    icon: DollarSign,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-amber-200/20 hover:border-amber-400/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200/20">
        <CardHeader>
          <CardTitle className="gradient-text">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-amber-50/50 dark:bg-amber-900/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">New order #123{i}</p>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium gradient-text">$299.99</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

