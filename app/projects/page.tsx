"use client"

import { useState, useMemo } from "react"
import { MainNav } from "@/components/main-nav"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilters } from "@/components/project-filters"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

// Mock project data
const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/username/task-app",
    liveUrl: "https://task-app-demo.com",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with dark mode support.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio-demo.com",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/username/weather-app",
    liveUrl: "https://weather-app-demo.com",
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "5",
    title: "Blog Platform",
    description: "A full-featured blog platform with markdown support, comments, and user authentication.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Auth.js"],
    githubUrl: "https://github.com/username/blog-platform",
    liveUrl: "https://blog-platform-demo.com",
    createdAt: new Date("2023-05-18"),
  },
  {
    id: "6",
    title: "Real-time Chat Application",
    description: "A real-time chat application with private messaging, group chats, and file sharing.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    githubUrl: "https://github.com/username/chat-app",
    liveUrl: "https://chat-app-demo.com",
    createdAt: new Date("2023-06-22"),
  },
]

export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState(mockProjects)
  const [filters, setFilters] = useState({
    search: "",
    tag: "",
    sortBy: "newest" as "newest" | "oldest" | "az" | "za",
  })

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  // Filter and sort projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Search filter
        if (
          filters.search &&
          !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !project.description.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false
        }

        // Tag filter
        if (filters.tag && !project.tags.includes(filters.tag)) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort by selected option
        switch (filters.sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          case "az":
            return a.title.localeCompare(b.title)
          case "za":
            return b.title.localeCompare(a.title)
          default:
            return 0
        }
      })
  }, [projects, filters])

  const handleDelete = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleFilterChange = (newFilters: {
    search: string
    tag: string
    sortBy: "newest" | "oldest" | "az" | "za"
  }) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A collection of my recent work and personal projects.
                </p>
              </div>
              {user && (
                <div className="flex-shrink-0">
                  <Button asChild>
                    <Link href="/dashboard/projects/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8">
              <ProjectFilters tags={allTags} onFilterChange={handleFilterChange} />
            </div>

            {filteredProjects.length === 0 ? (
              <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
                <p className="text-lg text-muted-foreground">No projects found matching your filters.</p>
                <Button variant="outline" onClick={() => handleFilterChange({ search: "", tag: "", sortBy: "newest" })}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isEditable={!!user}
                    onDelete={() => handleDelete(project.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © 2023 Portfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
