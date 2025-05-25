import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string
    coverImage?: string
    publishedAt: Date
    tags: string[]
    readingTime?: number
    authorId: string
    authorName: string
    authorAvatar?: string
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.coverImage || "/placeholder.svg?height=300&width=600"}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary">{post.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min read
                  </span>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
