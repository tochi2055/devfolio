"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Check } from "lucide-react"

interface TemplateOption {
  id: string
  name: string
  description: string
  preview: string
}

const templates: TemplateOption[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, simple design with focus on content",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold, colorful design with unique layouts",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Elegant, corporate-friendly design",
    preview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Code-focused design with terminal aesthetics",
    preview: "/placeholder.svg?height=200&width=300",
  },
]

interface TemplateSelectorProps {
  currentTemplate?: string
  onSelect: (templateId: string) => Promise<void>
}

export function TemplateSelector({ currentTemplate = "minimal", onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (selectedTemplate === currentTemplate) {
      toast({
        title: "No changes",
        description: "You're already using this template.",
      })
      return
    }

    setIsLoading(true)
    try {
      await onSelect(selectedTemplate)
      toast({
        title: "Template updated",
        description: "Your portfolio template has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose a Template</h2>
        <p className="text-muted-foreground">Select a template that best represents your style and work.</p>
      </div>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={setSelectedTemplate}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" aria-label={template.name} />
            <Label
              htmlFor={template.id}
              className="flex flex-col gap-2 rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button onClick={handleSubmit} disabled={isLoading || selectedTemplate === currentTemplate}>
        {isLoading ? "Updating..." : "Apply Template"}
      </Button>
    </div>
  )
}
