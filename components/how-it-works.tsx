import { CheckCircle2, MousePointer2, Download, Palette } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <MousePointer2 className="h-12 w-12 text-primary" />,
      title: "Choose Template",
      description: "Select from our range of professional ID card or certificate templates.",
    },
    {
      icon: <Palette className="h-12 w-12 text-primary" />,
      title: "Customize Design",
      description: "Add your details, upload photos, customize colors, fonts, and layout.",
    },
    {
      icon: <CheckCircle2 className="h-12 w-12 text-primary" />,
      title: "Preview & Finalize",
      description: "Review your design with our live preview and make any final adjustments.",
    },
    {
      icon: <Download className="h-12 w-12 text-primary" />,
      title: "Download & Share",
      description: "Download your creation as PNG or PDF and share it with recipients.",
    },
  ]

  return (
    <div className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Creating professional ID cards and certificates is quick and easy with our simple 4-step process.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-background p-4 rounded-full mb-4 shadow-md">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

