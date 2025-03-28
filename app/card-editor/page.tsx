"use client"

import { useState } from "react"
import { Card } from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CardEditor() {
  const [cardData, setCardData] = useState({
    name: "John Doe",
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "www.johndoe.dev",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    textColor: "text-white",
  })

  const handleChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const colorOptions = [
    { label: "Blue to Purple", value: "bg-gradient-to-r from-blue-500 to-purple-600" },
    { label: "Green to Teal", value: "bg-gradient-to-r from-green-500 to-teal-600" },
    { label: "Red to Orange", value: "bg-gradient-to-r from-red-500 to-orange-600" },
    { label: "Gray to Slate", value: "bg-gradient-to-r from-gray-700 to-slate-800" },
    { label: "Amber to Yellow", value: "bg-gradient-to-r from-amber-500 to-yellow-600" },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Editor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={cardData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={cardData.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={cardData.company} onChange={(e) => handleChange("company", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={cardData.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={cardData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={cardData.website} onChange={(e) => handleChange("website", e.target.value)} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="bgColor">Background Style</Label>
            <Select value={cardData.bgColor} onValueChange={(value) => handleChange("bgColor", value)}>
              <SelectTrigger id="bgColor">
                <SelectValue placeholder="Select background style" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="textColor">Text Color</Label>
            <Select value={cardData.textColor} onValueChange={(value) => handleChange("textColor", value)}>
              <SelectTrigger id="textColor">
                <SelectValue placeholder="Select text color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-white">White</SelectItem>
                <SelectItem value="text-black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Download Card</Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          <Card
            name={cardData.name}
            title={cardData.title}
            company={cardData.company}
            email={cardData.email}
            phone={cardData.phone}
            website={cardData.website}
            bgColor={cardData.bgColor}
            textColor={cardData.textColor}
          />
        </div>
      </div>
    </div>
  )
}

