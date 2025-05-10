"use client"


import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function Home() {
   const { user } = useAuth()
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to My Portfolio
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  I'm a passionate developer creating beautiful and functional web experiences.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href={user ? "/projects" : "/login"}>
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out some of my recent work
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <div className="h-full w-full bg-muted/30"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold">Project {i}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">A brief description of project {i}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          React
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          TypeScript
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Tailwind
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {user?<Button variant="outline" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>:<div></div>}
            </div>
          </div>
        </section>

        {/* Add the testimonials section */}
        <TestimonialsSection />

        {/* Add a blog section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Articles</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Thoughts and insights on web development, design, and technology.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <div className="h-full w-full bg-muted/30"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold">Blog Post {i}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">A brief description of blog post {i}</p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span>May {i + 10}, 2023</span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">Read All Articles</Link>
              </Button>
            </div>
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
