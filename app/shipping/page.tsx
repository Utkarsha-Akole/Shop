import { Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ShippingPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center space-x-4">
          <Truck className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Shipping Information</h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Learn about our shipping options, delivery times, and costs.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {shippingMethods.map((method) => (
            <Card key={method.title}>
              <CardHeader>
                <CardTitle>{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">${method.price}</p>
                <p className="text-sm text-muted-foreground">{method.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">International Shipping Rates</h2>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Delivery Time</TableHead>
                  <TableHead>Starting Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internationalRates.map((rate) => (
                  <TableRow key={rate.region}>
                    <TableCell>{rate.region}</TableCell>
                    <TableCell>{rate.time}</TableCell>
                    <TableCell>${rate.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Shipping Policies</h2>
          {policies.map((policy) => (
            <div key={policy.title}>
              <h3 className="text-lg font-semibold">{policy.title}</h3>
              <p className="mt-2 text-muted-foreground">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const shippingMethods = [
  {
    title: "Standard Shipping",
    description: "Best value for non-urgent deliveries",
    price: "4.99",
    time: "3-5 business days",
  },
  {
    title: "Express Shipping",
    description: "Faster delivery for urgent orders",
    price: "14.99",
    time: "1-2 business days",
  },
  {
    title: "Next Day Delivery",
    description: "Guaranteed next day delivery",
    price: "24.99",
    time: "Next business day",
  },
  {
    title: "Free Shipping",
    description: "On orders over $50",
    price: "0",
    time: "5-7 business days",
  },
]

const internationalRates = [
  {
    region: "Europe",
    time: "7-10 business days",
    price: "19.99",
  },
  {
    region: "Asia",
    time: "8-12 business days",
    price: "24.99",
  },
  {
    region: "Australia",
    time: "10-14 business days",
    price: "29.99",
  },
  {
    region: "South America",
    time: "10-14 business days",
    price: "34.99",
  },
]

const policies = [
  {
    title: "Order Processing",
    description:
      "Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking information once your order ships.",
  },
  {
    title: "Shipping Restrictions",
    description:
      "Some items may have shipping restrictions to certain countries. Any restrictions will be noted on the product page.",
  },
  {
    title: "Lost or Damaged Packages",
    description:
      "We are not responsible for lost or damaged packages once they have been delivered to the carrier. We recommend purchasing shipping insurance for valuable items.",
  },
  {
    title: "Address Changes",
    description:
      "If you need to change your shipping address after placing an order, please contact us immediately. We cannot guarantee address changes once the order has been processed.",
  },
]

