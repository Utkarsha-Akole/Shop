import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're dedicated to providing the best shopping experience for our customers. Our journey began with a simple
            idea: to create a store that offers high-quality products at reasonable prices.
          </p>
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To provide exceptional products and service that enhance our customers' lives while maintaining the
                highest standards of quality and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">
                To be the leading e-commerce destination known for quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
          <Button className="mt-8">Learn More</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About Us 1"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About Us 2"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About Us 3"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About Us 4"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Our Values</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const values = [
  {
    title: "Quality",
    description: "We never compromise on the quality of our products and services.",
  },
  {
    title: "Innovation",
    description: "We constantly strive to bring new and improved solutions to our customers.",
  },
  {
    title: "Integrity",
    description: "We conduct our business with the highest standards of ethics and transparency.",
  },
  {
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do.",
  },
]

