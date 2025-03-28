"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, CheckCircle2, XCircle } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [verificationData, setVerificationData] = useState<any>(null)

  const handleVerify = () => {
    if (!verificationCode.trim()) return

    setVerificationStatus("loading")

    // In a real app, this would check against a database
    // For demo purposes, we'll simulate a verification process
    setTimeout(() => {
      // Check localStorage for any matching certificates or ID cards
      const certificateData = localStorage.getItem("certificateData")
      const cardData = localStorage.getItem("cardData")

      let foundData = null

      if (certificateData) {
        const parsedCertificate = JSON.parse(certificateData)
        if (parsedCertificate.verificationCode === verificationCode) {
          foundData = {
            type: "certificate",
            data: parsedCertificate,
          }
        }
      }

      if (!foundData && cardData) {
        const parsedCard = JSON.parse(cardData)
        if (parsedCard.employeeId === verificationCode) {
          foundData = {
            type: "id-card",
            data: parsedCard,
          }
        }
      }

      if (foundData) {
        setVerificationStatus("success")
        setVerificationData(foundData)
      } else {
        setVerificationStatus("error")
        setVerificationData(null)
      }
    }, 1500)
  }

  const renderVerificationResult = () => {
    if (verificationStatus === "loading") {
      return (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verifying...</p>
        </div>
      )
    }

    if (verificationStatus === "success") {
      return (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
              <CardTitle className="text-green-700">Verification Successful</CardTitle>
            </div>
            <CardDescription>
              This {verificationData.type === "certificate" ? "certificate" : "ID card"} is valid and authentic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>
                  {verificationData.type === "certificate"
                    ? verificationData.data.recipientName
                    : verificationData.data.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  {verificationData.type === "certificate" ? "Certificate Type" : "ID Card Type"}
                </p>
                <p className="capitalize">
                  {verificationData.type === "certificate"
                    ? verificationData.data.certificateType
                    : verificationData.data.cardType}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Issued By</p>
                <p>{verificationData.data.organization}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Issue Date</p>
                <p>
                  {verificationData.type === "certificate"
                    ? new Date(verificationData.data.issueDate).toLocaleDateString()
                    : new Date(verificationData.data.validFrom).toLocaleDateString()}
                </p>
              </div>

              {verificationData.type === "certificate" && verificationData.data.expiryDate && (
                <div>
                  <p className="text-sm font-medium">Expiry Date</p>
                  <p>{new Date(verificationData.data.expiryDate).toLocaleDateString()}</p>
                </div>
              )}

              {verificationData.type === "id-card" && verificationData.data.validUntil && (
                <div>
                  <p className="text-sm font-medium">Valid Until</p>
                  <p>{new Date(verificationData.data.validUntil).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setVerificationStatus("idle")}>
              Verify Another
            </Button>
          </CardFooter>
        </Card>
      )
    }

    if (verificationStatus === "error") {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <XCircle className="h-6 w-6 text-red-600 mr-2" />
              <CardTitle className="text-red-700">Verification Failed</CardTitle>
            </div>
            <CardDescription>We couldn't verify this code. It may be invalid or expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please check the verification code and try again. If you continue to have issues, contact the issuer of
              the certificate or ID card.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setVerificationStatus("idle")}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return null
  }

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
          <h1 className="text-3xl font-bold text-center">Verify Certificate or ID Card</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Certificate & ID Card Verification</CardTitle>
            <CardDescription>
              Enter the verification code to check the authenticity of a certificate or ID card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="verificationCode"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button onClick={handleVerify} disabled={verificationStatus === "loading"}>
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>The verification code can be found on the certificate or ID card.</p>
                <p>For certificates, it's usually a alphanumeric code.</p>
                <p>For ID cards, you can use the ID number printed on the card.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {renderVerificationResult()}

        <AdSpace className="mt-8" />
      </div>
    </div>
  )
}

