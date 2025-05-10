"use client"

import { useTheme } from "next-themes"
import { Palette, Check } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define color options with proper typing
interface ColorOption {
  name: string
  value: string
  class: string
}

const colorOptions: ColorOption[] = [
  { name: "Slate", value: "slate", class: "bg-slate-500" },
  { name: "Gray", value: "gray", class: "bg-gray-500" },
  { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
  { name: "Red", value: "red", class: "bg-red-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Amber", value: "amber", class: "bg-amber-500" },
  { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
  { name: "Lime", value: "lime", class: "bg-lime-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Emerald", value: "emerald", class: "bg-emerald-500" },
  { name: "Teal", value: "teal", class: "bg-teal-500" },
  { name: "Cyan", value: "cyan", class: "bg-cyan-500" },
  { name: "Sky", value: "sky", class: "bg-sky-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Indigo", value: "indigo", class: "bg-indigo-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Fuchsia", value: "fuchsia", class: "bg-fuchsia-500" },
  { name: "Pink", value: "pink", class: "bg-pink-500" },
  { name: "Rose", value: "rose", class: "bg-rose-500" },
]

export function ColorPalette() {
  const [mounted, setMounted] = useState(false)
  const [currentColor, setCurrentColor] = useState("blue")
  const [error, setError] = useState<string | null>(null)
  const { setTheme } = useTheme()

  // Safe color change handler with type checking and error handling
  const handleColorChange = useCallback((color: string) => {
    try {
      // Validate input
      if (typeof color !== "string" || !color) {
        throw new Error("Invalid color value")
      }

      // Validate color exists in options
      if (!colorOptions.some((option) => option.value === color)) {
        console.warn(`Color "${color}" is not in the predefined options, but will be applied anyway`)
      }

      setCurrentColor(color)

      // Safe localStorage access with type checking
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined" &&
        typeof localStorage.setItem === "function"
      ) {
        localStorage.setItem("color-theme", color)
      }

      // Safe DOM manipulation with type checking
      if (
        typeof document !== "undefined" &&
        document.documentElement &&
        typeof document.documentElement.setAttribute === "function"
      ) {
        document.documentElement.setAttribute("data-color", color)
      }
    } catch (err) {
      console.error("Error changing color:", err)
      setError(err instanceof Error ? err.message : "Failed to change color")
    }
  }, [])

  // Initialize component with error handling
  useEffect(() => {
    let isMounted = true

    const initializeColorPalette = () => {
      try {
        setMounted(true)

        // Safe localStorage access
        if (
          typeof window !== "undefined" &&
          typeof localStorage !== "undefined" &&
          typeof localStorage.getItem === "function"
        ) {
          const savedColor = localStorage.getItem("color-theme") || "blue"

          if (isMounted) {
            setCurrentColor(savedColor)
          }

          // Safe DOM manipulation
          if (
            typeof document !== "undefined" &&
            document.documentElement &&
            typeof document.documentElement.setAttribute === "function"
          ) {
            document.documentElement.setAttribute("data-color", savedColor)
          }
        }
      } catch (err) {
        console.error("Error initializing color palette:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to initialize color settings")
        }
      }
    }

    initializeColorPalette()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) return null

  // Show error state if something went wrong
  if (error) {
    return (
      <Button variant="outline" size="icon" className="relative" title={error} disabled>
        <Palette className="h-[1.2rem] w-[1.2rem] text-destructive" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <div
            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-background`}
            style={{ backgroundColor: `var(--${currentColor}-500, currentColor)` }}
          />
          <span className="sr-only">Choose color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] p-2">
        <div className="grid grid-cols-5 gap-1">
          {colorOptions.map((color) => (
            <DropdownMenuItem
              key={color.value}
              className="flex h-8 w-8 items-center justify-center rounded-md p-0 focus:bg-transparent"
              onClick={() => handleColorChange(color.value)}
              onSelect={(event) => {
                // Prevent closing the dropdown on selection
                event.preventDefault()
              }}
            >
              <div className={`flex h-6 w-6 items-center justify-center rounded-md ${color.class}`} title={color.name}>
                {currentColor === color.value && <Check className="h-4 w-4 text-white" />}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
