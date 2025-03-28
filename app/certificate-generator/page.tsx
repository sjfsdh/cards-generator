"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CertificatePreview } from "@/components/certificate-preview"
import { CertificateTemplates } from "@/components/certificate-templates"
import { ColorPicker } from "@/components/color-picker"
import { FileUploader } from "@/components/file-uploader"
import { generateUniqueId } from "@/lib/utils"
import { ArrowLeft, Save } from "lucide-react"
import { AdSpace } from "@/components/ad-space"

export default function CertificateGenerator() {
  const router = useRouter()

  // Add these constants at the top of the component, after the useState declarations
  const sampleImages = {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png",
    signature:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Specimen_Signature.svg/320px-Specimen_Signature.svg.png",
  }

  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState("completion")
  const [orientation, setOrientation] = useState("landscape")

  // Update the initial state to include sample images
  const [logoPreview, setLogoPreview] = useState(sampleImages.logo)
  const [signaturePreview, setSignaturePreview] = useState(sampleImages.signature)

  // Update the initial certData state to include these images and sample data
  const [certData, setCertData] = useState({
    id: generateUniqueId(),
    certificateType: "completion",
    recipientName: "Jane Smith",
    achievement: "Certificate of Completion",
    courseTitle: "Web Development Masterclass",
    issuerName: "Dr. Robert Johnson",
    issuerTitle: "Program Director",
    organization: "Tech Academy",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split("T")[0],
    description:
      "This is to certify that the above named person has successfully completed the course with distinction.",
    logo: sampleImages.logo,
    signature: sampleImages.signature,
    verificationCode: generateUniqueId().substring(0, 8).toUpperCase(),
    primaryColor: "#4f46e5",
    secondaryColor: "#f9fafb",
    accentColor: "#fbbf24",
    textColor: "#1f2937",
    backgroundColor: "#ffffff",
    orientation: "landscape",
    additionalFields: {},
  })

  // Update certData when orientation changes
  useEffect(() => {
    setCertData((prev) => ({
      ...prev,
      orientation,
    }))
  }, [orientation])

  const handleInputChange = (field: string, value: string) => {
    setCertData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
        setCertData((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearLogo = () => {
    setLogoPreview("")
    setCertData((prev) => ({ ...prev, logo: "" }))
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string)
        setCertData((prev) => ({ ...prev, signature: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearSignature = () => {
    setSignaturePreview("")
    setCertData((prev) => ({ ...prev, signature: "" }))
  }

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template)
    setCertData((prev) => ({ ...prev, certificateType: template }))
  }

  const handleColorChange = (colorType: string, color: string) => {
    setCertData((prev) => ({ ...prev, [colorType]: color }))
  }

  const handleOrientationChange = (value: string) => {
    setOrientation(value)
    setCertData((prev) => ({ ...prev, orientation: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to server
    // For now, we'll simulate by navigating to download page
    localStorage.setItem("certificateData", JSON.stringify(certData))
    router.push(`/download?type=certificate&id=${certData.id}`)
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
          <h1 className="text-3xl font-bold text-center">Certificate Generator</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <CertificateTemplates selectedTemplate={selectedTemplate} onSelectTemplate={handleTemplateSelect} />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={certData.recipientName}
                      onChange={(e) => handleInputChange("recipientName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="achievement">Achievement/Title</Label>
                    <Input
                      id="achievement"
                      value={certData.achievement}
                      onChange={(e) => handleInputChange("achievement", e.target.value)}
                      placeholder="Certificate of Completion"
                    />
                  </div>

                  <div>
                    <Label htmlFor="courseTitle">Course/Program Title</Label>
                    <Input
                      id="courseTitle"
                      value={certData.courseTitle}
                      onChange={(e) => handleInputChange("courseTitle", e.target.value)}
                      placeholder="Web Development Masterclass"
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={certData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Tech Academy"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description/Message</Label>
                    <Textarea
                      id="description"
                      value={certData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="This is to certify that the above named person has successfully completed the course with distinction."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="issuerName">Issuer Name</Label>
                    <Input
                      id="issuerName"
                      value={certData.issuerName}
                      onChange={(e) => handleInputChange("issuerName", e.target.value)}
                      placeholder="Dr. Jane Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="issuerTitle">Issuer Title</Label>
                    <Input
                      id="issuerTitle"
                      value={certData.issuerTitle}
                      onChange={(e) => handleInputChange("issuerTitle", e.target.value)}
                      placeholder="Program Director"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={certData.issueDate}
                        onChange={(e) => handleInputChange("issueDate", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={certData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      value={certData.verificationCode}
                      onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This code can be used to verify the certificate's authenticity
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Organization Logo</Label>
                    <FileUploader
                      accept="image/*"
                      onChange={handleLogoUpload}
                      preview={logoPreview}
                      placeholder="Upload Logo"
                      onClear={handleClearLogo}
                    />
                  </div>

                  <div>
                    <Label>Signature</Label>
                    <FileUploader
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      preview={signaturePreview}
                      placeholder="Upload Signature"
                      onClear={handleClearSignature}
                    />
                  </div>

                  <div>
                    <Label htmlFor="certificateOrientation">Certificate Orientation</Label>
                    <Select value={orientation} onValueChange={handleOrientationChange}>
                      <SelectTrigger id="certificateOrientation">
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landscape">Landscape</SelectItem>
                        <SelectItem value="portrait">Portrait</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Primary Color</Label>
                    <ColorPicker
                      color={certData.primaryColor}
                      onChange={(color) => handleColorChange("primaryColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Secondary Color</Label>
                    <ColorPicker
                      color={certData.secondaryColor}
                      onChange={(color) => handleColorChange("secondaryColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Accent Color</Label>
                    <ColorPicker
                      color={certData.accentColor}
                      onChange={(color) => handleColorChange("accentColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Text Color</Label>
                    <ColorPicker
                      color={certData.textColor}
                      onChange={(color) => handleColorChange("textColor", color)}
                    />
                  </div>

                  <div>
                    <Label>Background Color</Label>
                    <ColorPicker
                      color={certData.backgroundColor}
                      onChange={(color) => handleColorChange("backgroundColor", color)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <AdSpace className="mt-8" />

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Save & Download
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Live Preview</h2>
          <div
            className="border-2 border-dashed border-muted p-6 rounded-lg flex justify-center items-center"
            style={{
              minHeight: certData.orientation === "portrait" ? "650px" : "450px",
              height: "auto",
              overflow: "visible",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: certData.orientation === "portrait" ? "450px" : "700px",
                height: "auto",
              }}
            >
              <CertificatePreview certificateData={certData} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            This is a preview of how your certificate will look. Continue customizing to see changes in real-time.
          </p>
          <AdSpace className="mt-8" />
        </div>
      </div>
    </div>
  )
}

