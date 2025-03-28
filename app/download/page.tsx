"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IDCardPreview } from "@/components/id-card-preview"
import { CertificatePreview } from "@/components/certificate-preview"
import { ArrowLeft, Download, Share2, QrCode } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { AdSpace } from "@/components/ad-space"

export default function DownloadPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const id = searchParams.get("id")

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const previewRef = useRef<HTMLDivElement>(null)
  const [shareUrl, setShareUrl] = useState<string>("")

  useEffect(() => {
    // In a real app, this would fetch from server
    // For now, we'll get from localStorage
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

    // Generate a share URL
    const baseUrl = window.location.origin
    setShareUrl(`${baseUrl}/share?type=${type}&id=${id}`)
  }, [type, id])

  const handleDownloadPNG = async () => {
    if (!previewRef.current) return

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: previewRef.current.scrollHeight,
        windowHeight: previewRef.current.scrollHeight,
        onclone: (document, element) => {
          // Ensure the cloned element has visible overflow
          element.style.overflow = "visible"
          element.style.height = "auto"
        },
      })

      const link = document.createElement("a")
      link.download = `${type}-${id}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating PNG:", error)
    }
  }

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: previewRef.current.scrollHeight,
        windowHeight: previewRef.current.scrollHeight,
        onclone: (document, element) => {
          // Ensure the cloned element has visible overflow
          element.style.overflow = "visible"
          element.style.height = "auto"
        },
      })

      const imgData = canvas.toDataURL("image/png")
      const orientation =
        type === "certificate" && data.orientation === "portrait"
          ? "portrait"
          : type === "certificate"
            ? "landscape"
            : "portrait"

      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
      })

      // Calculate dimensions to fit the PDF
      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${type}-${id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleShare = () => {
    // Copy the share URL to clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Share link copied to clipboard: " + shareUrl)
      })
      .catch((err) => {
        console.error("Could not copy text: ", err)
        alert("Share URL: " + shareUrl)
      })
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
        <p className="mb-6">The requested document could not be found.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Link href={type === "id-card" ? "/id-card-generator" : "/certificate-generator"}>
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">
            Download Your {type === "id-card" ? "ID Card" : "Certificate"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="mb-8 w-full" ref={previewRef}>
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
                {type === "id-card" ? <IDCardPreview cardData={data} /> : <CertificatePreview certificateData={data} />}
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mb-4">
            <p>Your {type === "id-card" ? "ID card" : "certificate"} has been generated successfully.</p>
            <p>You can download it as a PNG or PDF file.</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={handleDownloadPNG} className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download as PNG
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Verification Information</h2>
              <p className="mb-4">
                This {type === "id-card" ? "ID card" : "certificate"} can be verified using the following code:
              </p>

              <div className="flex items-center p-4 bg-muted rounded-md mb-4">
                <QrCode className="h-6 w-6 mr-3 text-primary" />
                <code className="font-mono text-lg">
                  {type === "id-card" ? data.employeeId : data.verificationCode}
                </code>
              </div>

              <p className="text-sm text-muted-foreground">
                To verify this {type === "id-card" ? "ID card" : "certificate"}, visit our verification page and enter
                the code above.
              </p>

              <div className="mt-4">
                <Link href="/verify">
                  <Button variant="outline" className="w-full">
                    Go to Verification Page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Share Your {type === "id-card" ? "ID Card" : "Certificate"}
              </h2>
              <p className="mb-4">
                Share your {type === "id-card" ? "ID card" : "certificate"} with others using this link:
              </p>

              <div className="flex items-center p-4 bg-muted rounded-md mb-4 overflow-x-auto">
                <code className="font-mono text-sm">{shareUrl}</code>
              </div>

              <Button onClick={handleShare} className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Copy Share Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    Download your {type === "id-card" ? "ID card" : "certificate"} and save it for your records.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Share it with relevant parties or on social media.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Print it out for physical use if needed.</span>
                </li>
                {type === "id-card" && (
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Consider laminating your ID card for durability.</span>
                  </li>
                )}
              </ul>

              <div className="mt-6">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AdSpace className="mt-12" />
    </div>
  )
}

