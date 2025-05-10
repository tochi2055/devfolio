"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Globe, Mail, MapPin, Linkedin, Twitter, ExternalLink, Edit, Trophy, Award, Medal } from "lucide-react"
import { SafeMotionDiv } from "@/components/safe-motion"
import { ErrorBoundary } from "@/components/error-boundary"

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
  joinDate: "January 2023",
  portfolioViews: 142,
  projectCount: 3,
  experienceCount: 2,
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const initializeProfile = async () => {
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 300))

        if (isMounted) {
          setMounted(true)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error initializing profile:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load profile data")
          setLoading(false)
        }
      }
    }

    initializeProfile()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="container p-4 md:p-6 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container p-4 md:p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-destructive mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h2 className="text-xl font-bold">Failed to load profile</h2>
            </div>
            <p className="mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!mounted) return null

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col gap-4 md:gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and manage your profile information</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/settings">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Link href={`/portfolio/${userData.username}`} target="_blank">
              <Button>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Public Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatarUrl || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-muted-foreground">{userData.title}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {userData.github && (
                      <Link href={userData.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                    )}
                    {userData.linkedin && (
                      <Link href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </Link>
                    )}
                    {userData.twitter && (
                      <Link href={userData.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </Button>
                      </Link>
                    )}
                    {userData.website && (
                      <Link href={userData.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Globe className="h-4 w-4" />
                          <span className="sr-only">Website</span>
                        </Button>
                      </Link>
                    )}
                    {userData.email && (
                      <Link href={`mailto:${userData.email}`}>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
                <CardDescription>Your portfolio statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Member Since</span>
                    <span className="font-medium">{userData.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Portfolio Views</span>
                    <span className="font-medium">{userData.portfolioViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Projects</span>
                    <span className="font-medium">{userData.projectCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Work Experience</span>
                    <span className="font-medium">{userData.experienceCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Professional summary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{userData.bio}</p>
              </CardContent>
            </Card>

            <ErrorBoundary>
              <Tabs defaultValue="activity">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest portfolio updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SafeMotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Edit className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Updated project "E-commerce Dashboard"</p>
                            <p className="text-sm text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Edit className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Added new experience at "TechCorp Inc."</p>
                            <p className="text-sm text-muted-foreground">1 week ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Edit className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Updated profile information</p>
                            <p className="text-sm text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                      </SafeMotionDiv>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="skills" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Technologies</CardTitle>
                      <CardDescription>Your technical expertise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SafeMotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="flex flex-wrap gap-2">
                          <Badge>React</Badge>
                          <Badge>TypeScript</Badge>
                          <Badge>Next.js</Badge>
                          <Badge>JavaScript</Badge>
                          <Badge>HTML</Badge>
                          <Badge>CSS</Badge>
                          <Badge>Tailwind CSS</Badge>
                          <Badge>Node.js</Badge>
                          <Badge>Express</Badge>
                          <Badge>MongoDB</Badge>
                          <Badge>Firebase</Badge>
                          <Badge>Git</Badge>
                          <Badge>RESTful APIs</Badge>
                          <Badge>GraphQL</Badge>
                          <Badge>Redux</Badge>
                        </div>
                      </SafeMotionDiv>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="achievements" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>Your professional accomplishments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SafeMotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Trophy className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Best Frontend Developer Award</p>
                            <p className="text-sm text-muted-foreground">TechCorp Inc. - 2022</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">React Certification</p>
                            <p className="text-sm text-muted-foreground">Meta - 2021</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Medal className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Hackathon Winner</p>
                            <p className="text-sm text-muted-foreground">Web Dev Conference - 2020</p>
                          </div>
                        </div>
                      </SafeMotionDiv>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}
