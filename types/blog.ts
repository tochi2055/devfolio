export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  publishedAt: Date | number
  updatedAt: Date | number
  published: boolean
  authorId: string
  tags: string[]
  readingTime?: number
}

export interface BlogAuthor {
  id: string
  name: string
  bio?: string
  avatarUrl?: string
}
