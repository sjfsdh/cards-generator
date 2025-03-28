"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ResponsiveContainerProps {
  children: ReactNode
  maxWidth: number
  maxHeight: number
  className?: string
  type: "card" | "certificate"
}

export function ResponsiveContainer({ children, maxWidth, maxHeight, className = "", type }: ResponsiveContainerProps) {
  const [scale, setScale] = useState(1)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const updateScale = () => {
      const container = document.getElementById("responsive-container-" + type)
      if (container) {
        const containerWidth = container.clientWidth
        setContainerWidth(containerWidth)

        // Calculate the scale based on container width
        const newScale = Math.min(1, containerWidth / maxWidth)
        setScale(newScale)
      }
    }

    // Initial calculation
    updateScale()

    // Update on resize
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [maxWidth, type])

  return (
    <div id={`responsive-container-${type}`} className={`w-full overflow-hidden ${className}`}>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: maxWidth,
          height: type === "card" ? 210 : 400,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}

