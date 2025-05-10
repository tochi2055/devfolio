"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { DbResult } from "@/components/db-result"
import { projectAPI } from "@/lib/firestore"
import type { Project } from "@/types/database"

interface ProjectFormProps {
  userId: string
  project?: Project
  isEditMode?: boolean
}

export function ProjectForm({ userId, project, isEditMode = false }: ProjectFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    techStack: project?.techStack?.join(", ") || "",
    githubLink: project?.githubLink || "",
    liveLink: project?.liveLink || "",
    featured: project?.featured || false,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      // Parse tech stack string into array
      const techStackArray = formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "")

      const projectData = {
        userId,
        title: formData.title,
        description: formData.description,
        techStack: techStackArray,
        githubLink: formData.githubLink || undefined,
        liveLink: formData.liveLink || undefined,
        featured: formData.featured,
        order: project?.order || 0,
      }

      let result
      if (isEditMode && project?.id) {
        // Update existing project
        result = await projectAPI.updateProject(project.id, projectData)
      } else {
        // Create new project
        result = await projectAPI.createProject(projectData)
      }

      setResult(result)

      if (result.success) {
        // Navigate after successful operation (with delay)
        setTimeout(() => {
          router.push("/dashboard/projects")
        }, 1500)
      }
    } catch (error) {
      console.error("Error saving project:", error)
      setResult({
        success: false,
        error: { message: error instanceof Error ? error.message : "Failed to save project" },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Project" : "Add New Project"}</CardTitle>
          <CardDescription>
            {isEditMode ? "Update the details of your project" : "Create a new project to showcase in your portfolio"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <DbResult
              result={result}
              loading={loading}
              onRetry={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              successMessage={isEditMode ? "Project updated successfully" : "Project created successfully"}
              errorPrefix={isEditMode ? "Failed to update project" : "Failed to create project"}
            />
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
            <Input
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, TypeScript, Tailwind CSS"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Link</Label>
            <Input
              id="githubLink"
              name="githubLink"
              type="url"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveLink">Live Demo Link</Label>
            <Input
              id="liveLink"
              name="liveLink"
              type="url"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://project.example.com"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="featured">Feature this project on your portfolio</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Project" : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
