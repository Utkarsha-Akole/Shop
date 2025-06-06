import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our products and services.
        </p>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain products.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can calculate shipping costs at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "You can reach our customer service team through our contact page, by email at support@store.com, or by phone at 1-800-123-4567 during business hours.",
  },
  {
    question: "Do you offer price matching?",
    answer:
      "Yes, we offer price matching for identical items sold by major retailers. Contact our customer service team with the competitor's price for verification.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "Warranty coverage varies by product. Most electronics come with a 1-year manufacturer warranty. Extended warranties are available for purchase on select items.",
  },
]

