import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto prose">
        <p className="lead">Last updated: March 25, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to ID & Certificate Maker ("we," "our," or "us"). We respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our website and services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We collect information that you voluntarily provide to us when you use our ID card and certificate generation
          services:
        </p>
        <ul>
          <li>Personal information such as names, email addresses, and phone numbers</li>
          <li>Images uploaded for ID cards and certificates (photos, logos, signatures)</li>
          <li>Content and design preferences for your generated documents</li>
          <li>Verification codes and identifiers associated with your documents</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To generate the ID cards and certificates you request</li>
          <li>To enable the verification of certificates and ID cards</li>
          <li>To improve and optimize our website and services</li>
          <li>To respond to your inquiries and provide customer support</li>
        </ul>

        <h2>4. Data Storage and Security</h2>
        <p>
          We use file-based temporary storage for your uploaded images and generated documents. These files are
          automatically deleted after 10 minutes to protect your privacy. We implement appropriate security measures to
          protect your personal information from unauthorized access or disclosure.
        </p>

        <h2>5. Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and improve user experience.
          You can control cookies through your browser settings.
        </p>

        <h2>6. Third-Party Services</h2>
        <p>
          We do not use external APIs or third-party services that would access your personal information. All
          processing is done locally on our servers.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>The right to access the personal information we hold about you</li>
          <li>The right to request correction or deletion of your personal information</li>
          <li>The right to restrict or object to our processing of your personal information</li>
          <li>The right to data portability</li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

