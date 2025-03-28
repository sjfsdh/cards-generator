"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    onChange(inputValue)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setInputValue(newColor)
    onChange(newColor)
  }

  const presetColors = [
    "#000000",
    "#ffffff",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ]

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10 h-10 p-0 border-2" style={{ backgroundColor: color }} />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="color-input">Color</Label>
              <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: inputValue }} />
            </div>
            <Input
              id="color-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <Input type="color" value={inputValue} onChange={handleColorChange} className="w-full h-10" />
            <div className="grid grid-cols-5 gap-2 mt-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-8 h-8 rounded-md border"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => {
                    setInputValue(presetColor)
                    onChange(presetColor)
                  }}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} className="w-28" />
    </div>
  )
}

