"use client"

import { useState } from "react"
import { Certificate } from "@/components/certificate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CertificateEditor() {
  const [certData, setCertData] = useState({
    recipientName: "Jane Smith",
    achievement: "Outstanding Performance",
    issuer: "Global Tech Academy",
    date: "March 25, 2025",
    signature: "Dr. Robert Johnson",
    signatureTitle: "Program Director",
    bgColor: "bg-gradient-to-r from-amber-50 to-amber-100",
    borderColor: "border-amber-300",
  })

  const handleChange = (field: string, value: string) => {
    setCertData((prev) => ({ ...prev, [field]: value }))
  }

  const styleOptions = [
    { label: "Gold", bg: "bg-gradient-to-r from-amber-50 to-amber-100", border: "border-amber-300" },
    { label: "Blue", bg: "bg-gradient-to-r from-blue-50 to-blue-100", border: "border-blue-300" },
    { label: "Green", bg: "bg-gradient-to-r from-green-50 to-green-100", border: "border-green-300" },
    { label: "Purple", bg: "bg-gradient-to-r from-purple-50 to-purple-100", border: "border-purple-300" },
    { label: "Red", bg: "bg-gradient-to-r from-red-50 to-red-100", border: "border-red-300" },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Certificate Editor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={certData.recipientName}
              onChange={(e) => handleChange("recipientName", e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="achievement">Achievement</Label>
            <Input
              id="achievement"
              value={certData.achievement}
              onChange={(e) => handleChange("achievement", e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="issuer">Issuer</Label>
            <Input id="issuer" value={certData.issuer} onChange={(e) => handleChange("issuer", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input id="date" value={certData.date} onChange={(e) => handleChange("date", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="signature">Signature</Label>
            <Input
              id="signature"
              value={certData.signature}
              onChange={(e) => handleChange("signature", e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="signatureTitle">Signature Title</Label>
            <Input
              id="signatureTitle"
              value={certData.signatureTitle}
              onChange={(e) => handleChange("signatureTitle", e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="style">Certificate Style</Label>
            <Select
              value={certData.bgColor}
              onValueChange={(value) => {
                const selectedStyle = styleOptions.find((option) => option.bg === value)
                if (selectedStyle) {
                  handleChange("bgColor", selectedStyle.bg)
                  handleChange("borderColor", selectedStyle.border)
                }
              }}
            >
              <SelectTrigger id="style">
                <SelectValue placeholder="Select certificate style" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((option) => (
                  <SelectItem key={option.bg} value={option.bg}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Download Certificate</Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          <Certificate
            recipientName={certData.recipientName}
            achievement={certData.achievement}
            issuer={certData.issuer}
            date={certData.date}
            signature={certData.signature}
            signatureTitle={certData.signatureTitle}
            bgColor={certData.bgColor}
            borderColor={certData.borderColor}
          />
        </div>
      </div>
    </div>
  )
}

