import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowLeft } from "lucide-react"

// Mock blog data - in a real app, you'd fetch this from your database
const mockPost = {
  id: "1",
  title: "Getting Started with Next.js",
  slug: "getting-started-with-nextjs",
  excerpt: "Learn how to build modern web applications with Next.js, React, and Tailwind CSS.",
  content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's a powerful tool for building modern web applications.

## Why Next.js?

Next.js provides several benefits:

- **Server-side rendering**: Improves performance and SEO
- **Static site generation**: Pre-renders pages at build time
- **API routes**: Build API endpoints as part of your Next.js app
- **File-based routing**: Create routes based on your file structure
- **Built-in CSS and Sass support**: Style your application with ease

## Setting Up a Next.js Project

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app my-next-app
\`\`\`

This will set up a new Next.js project with all the necessary configuration.

## Creating Pages

In Next.js, pages are React components exported from files in the \`pages\` directory. Each page is associated with a route based on its filename.

For example, to create a page at \`/about\`, you would create a file at \`pages/about.js\`:

\`\`\`jsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page</p>
    </div>
  )
}
\`\`\`

## Data Fetching

Next.js provides several methods for fetching data:

- \`getStaticProps\`: Fetch data at build time
- \`getStaticPaths\`: Specify dynamic routes to pre-render
- \`getServerSideProps\`: Fetch data on each request

## Conclusion

Next.js is a powerful framework for building React applications. It provides many features out of the box that would otherwise require complex configuration.

Start building with Next.js today and see how it can improve your development workflow!
  `,
  coverImage: "/placeholder.svg?height=600&width=1200",
  publishedAt: new Date("2023-05-15"),
  tags: ["Next.js", "React", "Web Development"],
  readingTime: 5,
  authorId: "1",
  authorName: "John Doe",
  authorAvatar: "/placeholder.svg?height=80&width=80",
  authorBio: "Full-stack developer specializing in React and Next.js",
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch the post based on the slug
  const post = mockPost

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-20">
          <div className="mb-8">
            <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorAvatar || "/placeholder.svg"}
                  alt={post.authorName}
                  className="h-8 w-8 rounded-full"
                />
                <span>{post.authorName}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {post.coverImage && (
            <div className="mb-12 overflow-hidden rounded-lg">
              <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {/* In a real app, you'd use a markdown renderer here */}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
          </div>

          <div className="mt-16 border-t pt-8">
            <div className="flex items-center gap-4">
              <img
                src={post.authorAvatar || "/placeholder.svg"}
                alt={post.authorName}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="font-bold">{post.authorName}</h3>
                <p className="text-sm text-muted-foreground">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </article>
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
