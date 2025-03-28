import { QrCode, Mail, Phone, Globe } from "lucide-react"
import { Card as CardUI, CardContent } from "@/components/ui/card"

interface CardProps {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  logoUrl?: string
  bgColor?: string
  textColor?: string
}

export function Card({
  name,
  title,
  company,
  email,
  phone,
  website,
  logoUrl = "/placeholder.svg?height=40&width=40",
  bgColor = "bg-gradient-to-r from-blue-500 to-purple-600",
  textColor = "text-white",
}: CardProps) {
  return (
    <CardUI className={`w-full max-w-md ${bgColor} ${textColor} overflow-hidden`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-sm opacity-90 mt-1">{title}</p>
            <p className="text-sm opacity-90">{company}</p>
          </div>
          {logoUrl && (
            <div className="rounded-md overflow-hidden bg-white/20 p-2">
              <img src={logoUrl || "/placeholder.svg"} alt="Company logo" className="h-10 w-10 object-contain" />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 opacity-80" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 opacity-80" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 opacity-80" />
            <span className="text-sm">{website}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="bg-white/20 p-2 rounded-md">
            <QrCode className="h-16 w-16" />
          </div>
        </div>
      </CardContent>
    </CardUI>
  )
}

