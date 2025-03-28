import { cn } from "@/lib/utils"

interface AdSpaceProps {
  className?: string
  width?: string
  height?: string
  label?: boolean
}

export function AdSpace({ className, width = "w-full", height = "h-[250px]", label = true }: AdSpaceProps) {
  return (
    <div
      className={cn(
        "my-8 mx-auto border-2 border-dashed border-muted flex items-center justify-center",
        width,
        height,
        className,
      )}
    >
      {label && <p className="text-muted-foreground text-sm">Advertisement Space</p>}
    </div>
  )
}

