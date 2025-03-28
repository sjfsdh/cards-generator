import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function CookiePolicyPage() {
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
          <h1 className="text-3xl font-bold text-center">Cookie Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto prose">
        <p className="lead">Last updated: March 25, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          This Cookie Policy explains how ID & Certificate Maker ("we," "our," or "us") uses cookies and similar
          technologies on our website. By using our website, you consent to the use of cookies as described in this
          policy.
        </p>

        <h2>2. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a
          website. They are widely used to make websites work more efficiently and provide information to the website
          owners.
        </p>

        <h2>3. Types of Cookies We Use</h2>
        <p>We use the following types of cookies on our website:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They
            enable basic functions like page navigation and access to secure areas of the website. The website cannot
            function properly without these cookies.
          </li>
          <li>
            <strong>Preference Cookies:</strong> These cookies allow the website to remember choices you make (such as
            your preferred language or the region you are in) and provide enhanced, more personal features.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website
            by collecting and reporting information anonymously. This helps us improve our website.
          </li>
          <li>
            <strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and
            personalization. They may be set by us or by third-party providers whose services we have added to our
            pages.
          </li>
        </ul>

        <h2>4. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the
          website and deliver advertisements on and through the website.
        </p>

        <h2>5. How to Control Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings preferences. However, if you limit the
          ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be
          personalized to you.
        </p>
        <p>
          To find out more about cookies, including how to see what cookies have been set and how to manage and delete
          them, visit{" "}
          <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
            www.allaboutcookies.org
          </a>
          .
        </p>

        <h2>6. Cookie Preferences</h2>
        <p>
          When you first visit our website, you will be presented with a cookie banner that allows you to accept or
          decline non-essential cookies. You can change your cookie preferences at any time by clicking on the "Cookie
          Preferences" link in the footer of our website.
        </p>

        <h2>7. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
          business practices. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us at:</p>
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

