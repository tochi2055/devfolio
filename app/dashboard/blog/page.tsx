"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Plus, MoreVertical, Pencil, Eye, Trash2 } from "lucide-react"

// Mock blog posts
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    publishedAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-20"),
    published: true,
  },
  {
    id: "2",
    title: "Building a Portfolio with Tailwind CSS",
    slug: "building-portfolio-with-tailwind",
    publishedAt: new Date("2023-06-22"),
    updatedAt: new Date("2023-06-25"),
    published: true,
  },
  {
    id: "3",
    title: "Firebase Authentication in Next.js",
    slug: "firebase-authentication-nextjs",
    publishedAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-15"),
    published: true,
  },
  {
    id: "4",
    title: "Draft Post: Advanced React Patterns",
    slug: "advanced-react-patterns",
    updatedAt: new Date("2023-08-05"),
    published: false,
  },
]

export default function BlogDashboardPage() {
  const [posts, setPosts] = useState(mockPosts)

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Blog Posts" text="Manage your blog posts.">
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </DashboardHeader>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.published
                    ? `Published on ${formatDate(post.publishedAt!)}`
                    : `Updated on ${formatDate(post.updatedAt)}`}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/blog/${post.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/blog/${post.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  )
}
