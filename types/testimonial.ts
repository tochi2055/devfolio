export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl?: string
  rating: 1 | 2 | 3 | 4 | 5
  featured: boolean
  createdAt: Date | number
}
