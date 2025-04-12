import { Metadata, Viewport } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// FAQ questions and answers for reuse in both UI and schema
const faqItems = [
  {
    question: "What are the odds of winning the Daily Million jackpot?",
    answer: "The odds of winning the Daily Million jackpot are 1 in 3,262,623. The overall odds of winning any prize in Daily Million are approximately 1 in 10."
  },
  {
    question: "How long do I have to claim my prize?",
    answer: "You have 90 days from the date of the draw to claim your prize. Make sure to check your tickets regularly and claim any winnings before the deadline."
  },
  {
    question: "Can I play Daily Million online?",
    answer: "Yes, you can play Daily Million online through the official National Lottery website or mobile app. You'll need to create an account and add funds to purchase tickets."
  },
  {
    question: "Are Daily Million prizes taxable?",
    answer: "No, all lottery prizes in Ireland, including those from Daily Million, are tax-free. The full amount of your winnings is yours to keep."
  },
  {
    question: "What is Daily Million Plus?",
    answer: "Daily Million Plus is an additional game that can be played alongside the main Daily Million game for an extra €0.50 per line. It offers a top prize of €500,000 and uses the same numbers you selected for the main game."
  },
  {
    question: "What time are the Daily Million draws?",
    answer: "Daily Million draws take place twice daily at 2:00 PM and 9:00 PM, seven days a week, 365 days a year."
  },
  {
    question: "How do I check if I've won?",
    answer: "You can check your tickets on this website, the official National Lottery website, mobile app, or at any authorized National Lottery retailer. You can also watch the live draws online."
  },
  {
    question: "How is the jackpot paid out?",
    answer: "The jackpot is paid as a lump sum. For large prizes over €15,000, you will need to visit the National Lottery headquarters in Dublin to claim your prize."
  },
  {
    question: "Can I play Daily Million if I'm not in Ireland?",
    answer: "You need to be physically present in Ireland to purchase Daily Million tickets from authorized retailers. If you're using the online service, you must be a resident of Ireland."
  },
  {
    question: "What happens if multiple people win the jackpot?",
    answer: "Unlike some lotteries, Daily Million has fixed prizes. If multiple people match all 6 numbers, each winner receives the full €1,000,000 jackpot (or €500,000 for Daily Million Plus)."
  }
];

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Daily Million - Frequently Asked Questions",
  description: "Find answers to the most commonly asked questions about Daily Million lottery games.",
};

export default function FAQPage() {
  // Create FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="container mx-auto py-12">
      {/* Add JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="flex items-center justify-start mb-6">
        <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <p className="text-center mb-10 text-gray-600 max-w-3xl mx-auto">
        Find answers to common questions about Daily Million draws, prizes, and more. If you don't see your
        question answered here, please contact our customer support.
      </p>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
} 