"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface CertificateTemplatesProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function CertificateTemplates({ selectedTemplate, onSelectTemplate }: CertificateTemplatesProps) {
  const templates = [
    {
      id: "completion",
      name: "Course Completion",
      description: "Certificate for completing a course or training program",
      image: "https://images.unsplash.com/photo-1471970394675-613138e45da3?w=600&h=300&fit=crop",
    },
    {
      id: "achievement",
      name: "Achievement",
      description: "Certificate recognizing an achievement or accomplishment",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=300&fit=crop",
    },
    {
      id: "appreciation",
      name: "Appreciation",
      description: "Certificate expressing gratitude or appreciation",
      image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=600&h=300&fit=crop",
    },
    {
      id: "participation",
      name: "Participation",
      description: "Certificate acknowledging participation in an event",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=300&fit=crop",
    },
    {
      id: "excellence",
      name: "Excellence",
      description: "Certificate recognizing excellence in a field or subject",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=300&fit=crop",
    },
    {
      id: "graduation",
      name: "Graduation",
      description: "Certificate for graduating from a program or institution",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=300&fit=crop",
    },
  ]

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={`template-${template.id}`} className="sr-only" />
            <Label htmlFor={`template-${template.id}`} className="cursor-pointer">
              <Card
                className={`overflow-hidden transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-muted-foreground/50"
                }`}
              >
                <CardContent className="p-0">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-40 object-cover border-b"
                    crossOrigin="anonymous"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

