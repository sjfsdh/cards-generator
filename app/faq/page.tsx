import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AdSpace } from "@/components/ad-space"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-8">
          Find answers to the most common questions about our ID card and certificate generator.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Do I need to create an account to use this service?</AccordionTrigger>
            <AccordionContent>
              No, our service is designed to be used without registration. You can create, customize, and download ID
              cards and certificates without creating an account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What file formats can I download my creations in?</AccordionTrigger>
            <AccordionContent>
              You can download your ID cards and certificates as PNG images or PDF files. Both formats are
              high-resolution and suitable for printing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How long are my files stored on your servers?</AccordionTrigger>
            <AccordionContent>
              For privacy and security reasons, all files are automatically deleted after 10 minutes. We recommend
              downloading your creations immediately after generating them.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I use my own logo and signature?</AccordionTrigger>
            <AccordionContent>
              Yes, you can upload your own logo, signature, and photos to personalize your ID cards and certificates. We
              support common image formats like PNG, JPG, and SVG.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How does the verification system work?</AccordionTrigger>
            <AccordionContent>
              Each certificate and ID card is generated with a unique verification code. Anyone can verify the
              authenticity of your document by entering this code on our verification page.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Can I create multiple ID cards or certificates at once?</AccordionTrigger>
            <AccordionContent>
              Currently, our free service allows you to create one document at a time. For bulk generation, please
              contact us for custom solutions tailored to your organization's needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>What types of ID cards and certificates can I create?</AccordionTrigger>
            <AccordionContent>
              You can create various types of ID cards (employee, student, visitor, corporate, event, security) and
              certificates (completion, achievement, appreciation, participation, excellence, graduation).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Is this service completely free?</AccordionTrigger>
            <AccordionContent>
              Yes, the basic service is completely free to use. We may introduce premium features in the future, but the
              core functionality will always remain free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>Can I edit my document after creating it?</AccordionTrigger>
            <AccordionContent>
              Yes, you can edit your document as much as you want before downloading it. However, once you leave the
              page or after 10 minutes of inactivity, your data will be cleared for privacy reasons.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>What if I need help or have a specific request?</AccordionTrigger>
            <AccordionContent>
              If you need assistance or have specific requirements, please visit our{" "}
              <Link href="/contact" className="text-primary underline">
                Contact Page
              </Link>{" "}
              to get in touch with our support team.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <AdSpace className="max-w-3xl mt-8" />
      </div>
    </div>
  )
}

