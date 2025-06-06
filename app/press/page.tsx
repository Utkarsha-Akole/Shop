import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Press - Luxury Store",
  description: "Latest news, press releases, and media resources about our luxury store.",
}

export default function PressPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text md:text-4xl">Press & Media</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find the latest news, press releases, and media resources about our company.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Press Releases</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pressReleases.map((release) => (
              <Card key={release.title} className="hover-card">
                <CardHeader>
                  <CardTitle>{release.title}</CardTitle>
                  <CardDescription>{release.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{release.excerpt}</p>
                  <Button variant="outline">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Media Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediaResources.map((resource) => (
              <Card key={resource.title} className="hover-card">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{resource.description}</p>
                  <Button className="gradient-gold text-primary-foreground w-full">Download</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Media Contact</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">Press Inquiries</h3>
                  <p className="text-muted-foreground">press@luxurystore.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Media Relations</h3>
                  <p className="text-muted-foreground">media@luxurystore.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

const pressReleases = [
  {
    title: "Luxury Store Announces Global Expansion",
    date: "January 15, 2024",
    excerpt: "Leading luxury e-commerce platform announces plans to expand operations to 20 new markets in 2024.",
  },
  {
    title: "Partnership with Leading Fashion Houses",
    date: "January 10, 2024",
    excerpt: "New exclusive partnerships with world-renowned fashion houses to offer limited edition collections.",
  },
  {
    title: "Launch of Sustainable Luxury Initiative",
    date: "January 5, 2024",
    excerpt: "Introducing our commitment to sustainable luxury with new environmental initiatives.",
  },
  {
    title: "Record-Breaking Holiday Season",
    date: "December 28, 2023",
    excerpt: "Luxury Store celebrates most successful holiday season with unprecedented sales growth.",
  },
]

const mediaResources = [
  {
    title: "Press Kit",
    description:
      "Download our comprehensive press kit including company information, high-resolution logos, and brand guidelines.",
  },
  {
    title: "Image Library",
    description: "Access our collection of high-resolution product images and lifestyle photography.",
  },
  {
    title: "Brand Assets",
    description: "Official logos, color palettes, and typography guidelines for media use.",
  },
  {
    title: "Fact Sheet",
    description: "Key statistics, milestones, and information about our company.",
  },
  {
    title: "Executive Bios",
    description: "Profiles and high-resolution headshots of our executive team.",
  },
  {
    title: "Case Studies",
    description: "In-depth analysis of our success stories and industry impact.",
  },
]

