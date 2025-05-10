import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { BlogCard } from "@/components/blog-card"

// Mock blog data
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js, React, and Tailwind CSS.",
    coverImage: "/placeholder.svg?height=300&width=600",
    publishedAt: new Date("2023-05-15"),
    tags: ["Next.js", "React", "Web Development"],
    readingTime: 5,
    authorId: "1",
    authorName: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Building a Portfolio with Tailwind CSS",
    slug: "building-portfolio-with-tailwind",
    excerpt: "A step-by-step guide to creating a professional portfolio website using Tailwind CSS.",
    coverImage: "/placeholder.svg?height=300&width=600",
    publishedAt: new Date("2023-06-22"),
    tags: ["Tailwind CSS", "Portfolio", "Design"],
    readingTime: 7,
    authorId: "1",
    authorName: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Firebase Authentication in Next.js",
    slug: "firebase-authentication-nextjs",
    excerpt: "Implement secure user authentication in your Next.js application using Firebase.",
    coverImage: "/placeholder.svg?height=300&width=600",
    publishedAt: new Date("2023-07-10"),
    tags: ["Firebase", "Authentication", "Next.js"],
    readingTime: 8,
    authorId: "1",
    authorName: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Thoughts, stories, and ideas about web development, design, and technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-3">
              {mockPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
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
