"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink, Mail, MapPin, Globe, Linkedin, Twitter } from "lucide-react"

// This would be fetched from Firebase in a real app
const userData = {
  name: "John Doe",
  username: "johndoe",
  title: "Senior Frontend Developer",
  bio: "Passionate frontend developer with 5+ years of experience building modern web applications using React, TypeScript, and Next.js.",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",
  email: "john.doe@example.com",
  avatarUrl: "/placeholder.svg?height=200&width=200",
}

// This would be fetched from Firebase in a real app
const projects = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "A comprehensive dashboard for e-commerce analytics and management.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    githubLink: "https://github.com/username/ecommerce-dashboard",
    liveLink: "https://ecommerce-dashboard.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Weather App",
    description: "A weather application that provides real-time weather information.",
    techStack: ["Next.js", "OpenWeather API", "CSS Modules"],
    githubLink: "https://github.com/username/weather-app",
    liveLink: "https://weather-app.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Task Manager",
    description: "A task management application with real-time updates and collaboration features.",
    techStack: ["React", "Firebase", "Material UI"],
    githubLink: "https://github.com/username/task-manager",
    liveLink: "https://task-manager.example.com",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

// This would be fetched from Firebase in a real app
const experiences = [
  {
    id: "1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    duration: "2020 - Present",
    description:
      "Led the frontend development team in building and maintaining multiple web applications. Implemented modern frontend practices and improved performance by 40%.",
    responsibilities: [
      "Developed and maintained multiple React applications",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines for frontend projects",
      "Collaborated with UX designers to improve user experience",
    ],
  },
  {
    id: "2",
    company: "WebSolutions LLC",
    position: "Frontend Developer",
    duration: "2018 - 2020",
    description:
      "Worked on various client projects using React, Angular, and Vue.js. Collaborated with backend developers to integrate APIs and implement features.",
    responsibilities: [
      "Built responsive web applications using modern JavaScript frameworks",
      "Implemented state management solutions using Redux and Context API",
      "Optimized application performance and loading times",
      "Participated in agile development processes",
    ],
  },
]

export default function PortfolioPage({ params }: { params: { username: string } }) {
  const [template, setTemplate] = useState("minimal")

  useEffect(() => {
    // Get the template from localStorage
    const savedTemplate = localStorage.getItem("portfolio-template") || "minimal"
    setTemplate(savedTemplate)
  }, [])

  return (
    <div className={`min-h-screen bg-background portfolio-${template}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span>{userData.name}</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="#about" className="text-sm font-medium">
              About
            </Link>
            <Link href="#projects" className="text-sm font-medium">
              Projects
            </Link>
            <Link href="#experience" className="text-sm font-medium">
              Experience
            </Link>
            <Link href={`mailto:${userData.email}`}>
              <Button>Contact Me</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <section id="about" className="hero-section">
          <div className="grid gap-8 md:grid-cols-[300px_1fr] items-start">
            <div className="flex flex-col items-center gap-4">
              <img
                src={userData.avatarUrl || "/placeholder.svg"}
                alt={userData.name}
                className="rounded-full w-48 h-48 object-cover border-4 border-background shadow-lg"
              />
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-xl text-muted-foreground">{userData.title}</p>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {userData.github && (
                  <Link href={userData.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                )}
                {userData.linkedin && (
                  <Link href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                )}
                {userData.twitter && (
                  <Link href={userData.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                )}
                {userData.website && (
                  <Link href={userData.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </Button>
                  </Link>
                )}
                {userData.email && (
                  <Link href={`mailto:${userData.email}`}>
                    <Button variant="outline" size="icon">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${template === "professional" ? "section-title" : ""}`}>
                About Me
              </h2>
              <p className="text-lg leading-relaxed">{userData.bio}</p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-12">
          <h2 className={`text-3xl font-bold mb-8 ${template === "professional" ? "section-title" : ""}`}>Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
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
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
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
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="py-12">
          <h2 className={`text-3xl font-bold mb-8 ${template === "professional" ? "section-title" : ""}`}>
            Work Experience
          </h2>
          <div className="grid gap-6">
            {experiences.map((experience) => (
              <Card key={experience.id} className="experience-card">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{experience.position}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium">{experience.company}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{experience.duration}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {experience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-sm">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {userData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link href="#projects" className="text-sm text-muted-foreground hover:underline">
              Projects
            </Link>
            <Link href="#experience" className="text-sm text-muted-foreground hover:underline">
              Experience
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
