"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { ColorPalette } from "@/components/color-palette"
import { Code, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import { SafeMotionDiv } from "@/components/safe-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample user data for the demo
const userData = {
  name: "Alex Johnson",
  username: "alexjohnson",
  title: "Full Stack Developer",
  bio: "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building scalable web applications and exploring new technologies.",
  location: "Seattle, WA",
  website: "https://alexjohnson.dev",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  twitter: "https://twitter.com/alexjohnson",
  email: "alex.johnson@example.com",
  avatarUrl: "/placeholder.svg?height=200&width=200&text=AJ",
}

// Sample projects for the demo
const projects = [
  {
    id: "1",
    title: "AI-Powered Task Manager",
    description: "A task management application that uses AI to prioritize and categorize tasks automatically.",
    techStack: ["React", "TypeScript", "OpenAI API", "Firebase"],
    githubLink: "https://github.com/alexjohnson/ai-task-manager",
    liveLink: "https://ai-task-manager.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Task+Manager",
  },
  {
    id: "2",
    title: "Real-time Collaboration Tool",
    description: "A collaborative workspace for teams with real-time document editing and chat functionality.",
    techStack: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    githubLink: "https://github.com/alexjohnson/collab-tool",
    liveLink: "https://collab-tool.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Collab+Tool",
  },
  {
    id: "3",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe API"],
    githubLink: "https://github.com/alexjohnson/ecommerce-platform",
    liveLink: "https://ecommerce-platform.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300&text=E-commerce",
  },
]

export default function DemoPage() {
  const [template, setTemplate] = useState("minimal")
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Safe template change handler with type checking and error handling
  const handleTemplateChange = useCallback((value: string) => {
    try {
      if (typeof value !== "string") {
        throw new Error("Invalid template value")
      }

      setTemplate(value)

      // Safe localStorage access with type checking
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined" &&
        typeof localStorage.setItem === "function"
      ) {
        localStorage.setItem("portfolio-template", value)
      }
    } catch (err) {
      console.error("Error changing template:", err)
      setError(err instanceof Error ? err.message : "Failed to change template")
    }
  }, [])

  // Initialize component with error handling
  useEffect(() => {
    let isMounted = true

    const initializeComponent = async () => {
      try {
        setLoading(true)

        // Safe localStorage access
        if (
          typeof window !== "undefined" &&
          typeof localStorage !== "undefined" &&
          typeof localStorage.getItem === "function"
        ) {
          const savedTemplate = localStorage.getItem("portfolio-template")

          if (savedTemplate && isMounted) {
            setTemplate(savedTemplate)
          }
        }

        // Simulate any async initialization that might be needed
        await new Promise((resolve) => setTimeout(resolve, 300))

        if (isMounted) {
          setMounted(true)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error initializing demo page:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to initialize page")
          setLoading(false)
        }
      }
    }

    initializeComponent()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg">Loading preview...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="text-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <div className="mt-4">
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main content - only render when mounted to avoid hydration issues
  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <ArrowLeft className="h-5 w-5" />
              <Code className="h-5 w-5" />
              <span>Devfolio</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ColorPalette />
            <ModeToggle />
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-8 md:py-12">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Choose Your Portfolio Template
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Preview how your portfolio will look with different templates. Customize colors, layout, and more.
            </p>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="minimal" onValueChange={handleTemplateChange} value={template} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="minimal">Minimal</TabsTrigger>
                  <TabsTrigger value="creative">Creative</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="minimal" className="mt-0">
                <SafeMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className={`min-h-[600px] bg-background portfolio-minimal`}>
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="container flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                          <span>{userData.name}</span>
                        </div>
                        <nav className="flex items-center gap-4">
                          <span className="text-sm font-medium">About</span>
                          <span className="text-sm font-medium">Projects</span>
                          <span className="text-sm font-medium">Experience</span>
                          <Button size="sm">Contact Me</Button>
                        </nav>
                      </div>
                    </header>

                    <div className="container py-8">
                      <section className="hero-section">
                        <div className="grid gap-8 md:grid-cols-[200px_1fr] items-start">
                          <div className="flex flex-col items-center gap-4">
                            <img
                              src={userData.avatarUrl || "/placeholder.svg"}
                              alt={userData.name}
                              className="rounded-full w-32 h-32 object-cover border-4 border-background shadow-lg"
                            />
                            <div className="flex flex-col items-center text-center">
                              <h1 className="text-2xl font-bold">{userData.name}</h1>
                              <p className="text-lg text-muted-foreground">{userData.title}</p>
                            </div>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-base leading-relaxed">{userData.bio}</p>
                          </div>
                        </div>
                      </section>

                      <section className="py-8">
                        <h2 className="text-2xl font-bold mb-6">Projects</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {projects.slice(0, 1).map((project) => (
                            <Card key={project.id} className="project-card">
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <CardContent className="p-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{project.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {project.description}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </SafeMotionDiv>
              </TabsContent>

              <TabsContent value="creative" className="mt-0">
                <SafeMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className={`min-h-[600px] bg-background portfolio-creative`}>
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="container flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                          <span>{userData.name}</span>
                        </div>
                        <nav className="flex items-center gap-4">
                          <span className="text-sm font-medium">About</span>
                          <span className="text-sm font-medium">Projects</span>
                          <span className="text-sm font-medium">Experience</span>
                          <Button size="sm">Contact Me</Button>
                        </nav>
                      </div>
                    </header>

                    <div className="container py-8">
                      <section className="hero-section">
                        <div className="grid gap-8 md:grid-cols-[200px_1fr] items-center">
                          <div className="flex flex-col items-center gap-4 z-10">
                            <img
                              src={userData.avatarUrl || "/placeholder.svg"}
                              alt={userData.name}
                              className="rounded-full w-32 h-32 object-cover border-4 border-background shadow-lg"
                            />
                            <div className="flex flex-col items-center text-center">
                              <h1 className="text-2xl font-bold">{userData.name}</h1>
                              <p className="text-lg text-muted-foreground">{userData.title}</p>
                            </div>
                          </div>
                          <div className="z-10">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-base leading-relaxed">{userData.bio}</p>
                          </div>
                        </div>
                      </section>

                      <section className="py-8">
                        <h2 className="text-2xl font-bold mb-6">Projects</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {projects.slice(0, 1).map((project) => (
                            <Card key={project.id} className="project-card">
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <CardContent className="p-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{project.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {project.description}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </SafeMotionDiv>
              </TabsContent>

              <TabsContent value="professional" className="mt-0">
                <SafeMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className={`min-h-[600px] bg-background portfolio-professional`}>
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="container flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                          <span>{userData.name}</span>
                        </div>
                        <nav className="flex items-center gap-4">
                          <span className="text-sm font-medium">About</span>
                          <span className="text-sm font-medium">Projects</span>
                          <span className="text-sm font-medium">Experience</span>
                          <Button size="sm">Contact Me</Button>
                        </nav>
                      </div>
                    </header>

                    <div className="container py-8">
                      <section className="hero-section">
                        <div className="grid gap-8 md:grid-cols-[200px_1fr] items-start">
                          <div className="flex flex-col items-center gap-4">
                            <img
                              src={userData.avatarUrl || "/placeholder.svg"}
                              alt={userData.name}
                              className="rounded-full w-32 h-32 object-cover border-4 border-background shadow-lg"
                            />
                            <div className="flex flex-col items-center text-center">
                              <h1 className="text-2xl font-bold">{userData.name}</h1>
                              <p className="text-lg text-muted-foreground">{userData.title}</p>
                            </div>
                          </div>
                          <div>
                            <h2 className="section-title">About Me</h2>
                            <p className="text-base leading-relaxed">{userData.bio}</p>
                          </div>
                        </div>
                      </section>

                      <section className="py-8">
                        <h2 className="section-title">Projects</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {projects.slice(0, 1).map((project) => (
                            <Card key={project.id} className="project-card">
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <CardContent className="p-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{project.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {project.description}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </SafeMotionDiv>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to create your own portfolio?</h2>
            <p className="text-muted-foreground mb-6">
              Sign up for free and start building your professional developer portfolio today.
            </p>
            <Link href="/signup">
              <Button size="lg" className="animate-pulse">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Code className="h-5 w-5" />
            <span>Devfolio</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Devfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
