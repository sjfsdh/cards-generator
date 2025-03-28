import { Award, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CertificateProps {
  recipientName: string
  achievement: string
  issuer: string
  date: string
  signature: string
  signatureTitle: string
  bgColor?: string
  borderColor?: string
  logoUrl?: string
}

export function Certificate({
  recipientName,
  achievement,
  issuer,
  date,
  signature,
  signatureTitle,
  bgColor = "bg-gradient-to-r from-amber-50 to-amber-100",
  borderColor = "border-amber-300",
  logoUrl = "/placeholder.svg?height=80&width=80",
}: CertificateProps) {
  return (
    <Card className={`w-full max-w-2xl ${bgColor} border-4 ${borderColor} relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full border-[12px] border-amber-100 pointer-events-none" />

      <CardContent className="p-10 text-center">
        <div className="flex justify-center mb-6">
          <img src={logoUrl || "/placeholder.svg"} alt="Organization logo" className="h-20 w-20 object-contain" />
        </div>

        <h2 className="text-3xl font-serif mb-2">Certificate of Achievement</h2>
        <p className="text-muted-foreground mb-8">This certifies that</p>

        <h3 className="text-4xl font-bold font-serif text-amber-800 mb-8">{recipientName}</h3>

        <p className="text-lg mb-2">has successfully completed</p>
        <p className="text-2xl font-semibold mb-8">{achievement}</p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <Award className="h-5 w-5 text-amber-600" />
          <p className="text-lg">Presented by {issuer}</p>
          <Award className="h-5 w-5 text-amber-600" />
        </div>

        <div className="flex justify-between items-end mt-12 px-10">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-600" />
            <p className="text-sm">{date}</p>
          </div>

          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 w-48">
              <p className="font-script text-xl mb-2">{signature}</p>
            </div>
            <p className="text-sm">{signatureTitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

