"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Mock testimonials data
const mockTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Working with this developer was an absolute pleasure. They delivered a stunning portfolio website that exceeded our expectations. Their attention to detail and ability to translate our vision into reality was impressive.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "StartupX",
    content:
      "I hired this developer to create a custom web application for our startup. They were professional, responsive, and delivered the project on time and within budget. The code quality was excellent, and they provided great documentation.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
    featured: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "CreativeAgency",
    content:
      "Our company website needed a complete overhaul, and this developer delivered beyond our expectations. They were able to create a modern, responsive design that perfectly represents our brand. Highly recommended!",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 4,
    featured: true,
  },
  {
    id: "4",
    name: "David Kim",
    role: "Founder",
    company: "DevStudio",
    content:
      "As a fellow developer, I can attest to the exceptional quality of work. Their code is clean, well-organized, and follows best practices. They're a true professional who takes pride in their craft.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
    featured: false,
  },
  {
    id: "5",
    name: "Jessica Lee",
    role: "UI/UX Designer",
    company: "DesignHub",
    content:
      "I collaborated with this developer on a complex project, and they were able to flawlessly implement my designs. Their attention to detail and commitment to pixel-perfect implementation made them a joy to work with.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
    featured: false,
  },
]

interface TestimonialsSectionProps {
  showAll?: boolean
}

export function TestimonialsSection({ showAll = false }: TestimonialsSectionProps) {
  const [viewAll, setViewAll] = useState(showAll)

  const displayedTestimonials = viewAll ? mockTestimonials : mockTestimonials.filter((t) => t.featured).slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What People Say</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {displayedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatarUrl || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {!viewAll && mockTestimonials.length > 3 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" onClick={() => setViewAll(true)}>
              View All Testimonials
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
