"use client"

import type { ReactNode } from "react"

interface PreviewWrapperProps {
  children: ReactNode
  type: "card" | "certificate"
}

export function PreviewWrapper({ children, type }: PreviewWrapperProps) {
  return (
    <div className="preview-container w-full overflow-visible">
      <div
        className="mx-auto flex justify-center items-center p-4"
        style={{
          width: "100%",
          maxWidth: type === "card" ? "400px" : "700px",
          margin: "0 auto",
          height: "auto",
          overflow: "visible",
        }}
      >
        {children}
      </div>
    </div>
  )
}

