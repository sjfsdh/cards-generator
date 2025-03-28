import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Professional ID Cards & Certificates</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Design, customize, and download high-quality ID cards and certificates in minutes - no registration
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/id-card-generator">
                <Button size="lg" className="w-full sm:w-auto">
                  Create ID Card
                </Button>
              </Link>
              <Link href="/certificate-generator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Certificate
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                alt="ID Card and Certificate Examples"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-green-600 flex items-center">
                  <span className="mr-1">✓</span> No registration required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

