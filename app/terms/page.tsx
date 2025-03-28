import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-center">Terms of Service</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto prose">
        <p className="lead">Last updated: March 25, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the ID & Certificate Maker website and services, you agree to be bound by these Terms of
          Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ID & Certificate Maker provides an online platform for creating, customizing, and downloading ID cards and
          certificates. Our service allows users to generate professional documents without requiring registration or
          login.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>When using our services, you agree to:</p>
        <ul>
          <li>Provide accurate information when creating ID cards and certificates</li>
          <li>Not use our services for fraudulent purposes or to impersonate others</li>
          <li>Not create ID cards or certificates that violate any laws or regulations</li>
          <li>Not attempt to manipulate or bypass any security features of our website</li>
          <li>
            Not use our services to create documents that infringe on copyrights, trademarks, or other intellectual
            property rights
          </li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, features, and functionality of our website, including but not limited to text, graphics, logos,
          icons, images, audio clips, digital downloads, and software, are owned by ID & Certificate Maker and are
          protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          You retain ownership of the content you create using our services, including ID cards and certificates.
          However, you grant us a non-exclusive, royalty-free license to use, store, and process your content solely for
          the purpose of providing our services to you.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          Our services are provided "as is" and "as available" without any warranties of any kind, either express or
          implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, ID & Certificate Maker shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of
          profits, data, or use, arising out of or in connection with your use of our services.
        </p>

        <h2>7. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless ID & Certificate Maker and its officers, directors, employees, and
          agents from any claims, damages, liabilities, costs, or expenses arising from your use of our services or your
          violation of these Terms of Service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the United States,
          without regard to its conflict of law provisions.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms of Service at any time. If we make material changes, we
          will notify you by posting the new terms on our website and updating the "Last updated" date.
        </p>

        <h2>10. Termination</h2>
        <p>
          We may terminate or suspend your access to our services immediately, without prior notice or liability, for
          any reason, including but not limited to a breach of these Terms of Service.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p>
          Email: support@situp.online
          <br />
          Contact Page: <Link href="/contact">Contact Us</Link>
        </p>
      </div>
      <AdSpace className="max-w-3xl" />
    </div>
  )
}

