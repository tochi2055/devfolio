"use client"

import { useState } from "react"
import Link from "next/link"
import { projectAPI } from "@/lib/firestore"
import { useOfflineData } from "@/hooks/use-offline-data"
import type { Project } from "@/types/database"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DbResult } from "@/components/db-result"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, ExternalLink, Github, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react"

interface ProjectsListProps {
  userId: string
}

export function ProjectsList({ userId }: ProjectsListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleteResult, setDeleteResult] = useState<any>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Use our custom hook for offline data caching
  const {
    data: projects,
    loading,
    error,
    isOffline,
    refresh,
  } = useOfflineData<Project[]>(
    `user-projects-${userId}`,
    async () => {
      const result = await projectAPI.getUserProjects(userId)

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to fetch projects")
      }

      return result.data || []
    },
    { ttl: 1000 * 60 * 60 }, // 1 hour cache
  )

  // Handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    setDeleteLoading(true)
    setDeleteResult(null)

    try {
      const result = await projectAPI.deleteProject(projectId)
      setDeleteResult(result)

      if (result.success) {
        // Refresh the projects list after successful deletion
        setTimeout(() => {
          refresh()
          setDeleteResult(null)
        }, 1500)
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      setDeleteResult({
        success: false,
        error: { message: error instanceof Error ? error.message : "Failed to delete project" },
      })
    } finally {
      setDeleteLoading(false)
      setConfirmDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading projects...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-4">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to load projects</h3>
            <p className="text-muted-foreground mb-4">{error.message}</p>
            <Button onClick={refresh}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {isOffline && (
        <div className="mb-4 bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-50 px-4 py-2 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p className="text-sm">You&apos;re currently offline. You&apos;re viewing cached data.</p>
        </div>
      )}

      {deleteResult && (
        <DbResult
          result={deleteResult}
          loading={deleteLoading}
          successMessage="Project deleted successfully"
          errorPrefix="Failed to delete project"
          className="mb-4"
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">Start building your portfolio by adding your first project.</p>
            <Link href="/dashboard/projects/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      {project.liveLink && (
                        <DropdownMenuItem asChild>
                          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Live
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {project.githubLink && (
                        <DropdownMenuItem asChild>
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setConfirmDelete(project.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  {project.githubLink && (
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-2">Delete Project</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={deleteLoading}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => confirmDelete && handleDeleteProject(confirmDelete)}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>Delete</>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
