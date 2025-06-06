import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Careers - Luxury Store",
  description: "Join our team and help shape the future of luxury retail.",
}

export default function CareersPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text md:text-4xl">Join Our Team</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Help shape the future of luxury retail. We're always looking for talented individuals to join our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {positions.map((position) => (
            <Card key={position.title} className="hover-card">
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
                <CardDescription>{position.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{position.description}</p>
                <Button className="gradient-gold text-primary-foreground w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Why Join Us?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 p-4 rounded-lg border">
                <Briefcase className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const positions = [
  {
    title: "Senior Frontend Developer",
    location: "Remote / New York",
    description: "Join our engineering team to build exceptional user experiences for our luxury e-commerce platform.",
  },
  {
    title: "UX Designer",
    location: "London",
    description: "Help shape the future of luxury online shopping through innovative design solutions.",
  },
  {
    title: "Product Manager",
    location: "Paris",
    description: "Lead product strategy and development for our growing luxury marketplace.",
  },
  {
    title: "Marketing Specialist",
    location: "Remote",
    description: "Create and execute marketing strategies for luxury brands and products.",
  },
  {
    title: "Customer Success Manager",
    location: "Dubai",
    description: "Ensure exceptional experiences for our VIP customers and partners.",
  },
  {
    title: "Operations Coordinator",
    location: "Singapore",
    description: "Coordinate logistics and operations for our global luxury marketplace.",
  },
]

const benefits = [
  {
    title: "Competitive Salary",
    description: "We offer industry-leading compensation packages.",
  },
  {
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision coverage.",
  },
  {
    title: "Remote Work",
    description: "Flexible work arrangements and remote options.",
  },
  {
    title: "Professional Development",
    description: "Learning stipend and career growth opportunities.",
  },
  {
    title: "Employee Discounts",
    description: "Exclusive discounts on luxury products.",
  },
  {
    title: "Team Events",
    description: "Regular team building and social events.",
  },
]

