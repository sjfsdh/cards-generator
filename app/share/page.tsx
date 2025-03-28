"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IDCardPreview } from "@/components/id-card-preview"
import { CertificatePreview } from "@/components/certificate-preview"
import { ArrowLeft, Share2 } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function SharePage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const id = searchParams.get("id")

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from server
    // For now, we'll simulate by getting from localStorage
    if (type === "id-card") {
      const storedData = localStorage.getItem("cardData")
      if (storedData) {
        setData(JSON.parse(storedData))
      }
    } else if (type === "certificate") {
      const storedData = localStorage.getItem("certificateData")
      if (storedData) {
        setData(JSON.parse(storedData))
      }
    }
    setLoading(false)
  }, [type, id])

  const handleShare = () => {
    // Share the current URL
    if (navigator.share) {
      navigator
        .share({
          title: `${type === "id-card" ? "ID Card" : "Certificate"} - ${data?.name || data?.recipientName || "Shared Document"} | situp.online`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Could not share:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard")
        })
        .catch((err) => {
          console.error("Could not copy text: ", err)
        })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Document Not Found</h1>
        <p className="mb-6">The requested document could not be found or has expired.</p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-center">Shared {type === "id-card" ? "ID Card" : "Certificate"}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-8 w-full">
              <div className="p-8 flex justify-center items-center" style={{ overflow: "visible", height: "auto" }}>
                <div
                  style={{
                    width: "100%",
                    maxWidth:
                      type === "id-card"
                        ? data.layout === "vertical"
                          ? "280px"
                          : "400px"
                        : data.orientation === "portrait"
                          ? "450px"
                          : "700px",
                    height: "auto",
                  }}
                >
                  {type === "id-card" ? (
                    <IDCardPreview cardData={data} />
                  ) : (
                    <CertificatePreview certificateData={data} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleShare} className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Link href={`/verify?code=${type === "id-card" ? data.employeeId : data.verificationCode}`}>
                <Button variant="outline">Verify</Button>
              </Link>
              <Link href={type === "id-card" ? "/id-card-generator" : "/certificate-generator"}>
                <Button variant="outline">Create Your Own</Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {type === "id-card" ? `ID Card for ${data.name}` : `${data.achievement} for ${data.recipientName}`}
          </h2>
          <p className="text-muted-foreground">
            {type === "id-card"
              ? `Issued by ${data.organization}`
              : `Issued by ${data.organization} on ${new Date(data.issueDate).toLocaleDateString()}`}
          </p>
        </div>

        <AdSpace className="mt-8" />
      </div>
    </div>
  )
}

