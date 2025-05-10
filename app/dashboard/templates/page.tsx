"use client"

import { useState } from "react"
import { TemplateSelector } from "@/components/template-selector"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function TemplatesPage() {
  const [currentTemplate, setCurrentTemplate] = useState("minimal")

  const handleTemplateSelect = async (templateId: string) => {
    // In a real app, this would save to your database
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCurrentTemplate(templateId)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Portfolio Templates" text="Choose and customize your portfolio template." />
      <div className="grid gap-8">
        <TemplateSelector currentTemplate={currentTemplate} onSelect={handleTemplateSelect} />
      </div>
    </DashboardShell>
  )
}
