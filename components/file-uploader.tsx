"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

interface FileUploaderProps {
  accept?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  preview?: string
  placeholder?: string
  onClear?: () => void
}

export function FileUploader({
  accept = "image/*",
  onChange,
  preview,
  placeholder = "Upload File",
  onClear,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      if (onClear) {
        onClear()
      } else {
        onChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  return (
    <div>
      <input type="file" ref={fileInputRef} accept={accept} onChange={onChange} className="hidden" />

      {preview ? (
        <Card
          className="relative overflow-hidden h-32 flex items-center justify-center cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            onClick={handleClear}
            aria-label="Clear image"
          >
            <X className="h-3 w-3" />
          </Button>
          {hovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white text-sm">Click to change</p>
            </div>
          )}
        </Card>
      ) : (
        <Button
          variant="outline"
          onClick={handleClick}
          className="w-full h-32 flex flex-col items-center justify-center border-dashed"
        >
          <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        </Button>
      )}
    </div>
  )
}

