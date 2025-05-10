"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { ExperienceCard } from "@/components/experience-card"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

// Mock experience data
const mockExperiences = [
  {
    id: "1",
    company: "Tech Solutions Inc.",
    position: "Senior Frontend Developer",
    startDate: "2021-01",
    endDate: "Present",
    current: true,
    description:
      "Leading the frontend development team in building modern web applications using React and TypeScript.",
    responsibilities: [
      "Architected and implemented the company's design system",
      "Led the migration from Angular to React",
      "Mentored junior developers and conducted code reviews",
      "Collaborated with UX designers to improve user experience",
    ],
  },
  {
    id: "2",
    company: "Digital Innovations",
    position: "Frontend Developer",
    startDate: "2018-06",
    endDate: "2020-12",
    current: false,
    description: "Worked on various client projects developing responsive web applications.",
    responsibilities: [
      "Developed and maintained multiple React applications",
      "Implemented state management using Redux and Context API",
      "Optimized application performance and loading times",
      "Participated in agile development processes",
    ],
  },
  {
    id: "3",
    company: "WebTech Startup",
    position: "Junior Developer",
    startDate: "2016-09",
    endDate: "2018-05",
    current: false,
    description: "Started as an intern and grew into a full-time junior developer role.",
    responsibilities: [
      "Built responsive websites using HTML, CSS, and JavaScript",
      "Assisted in developing WordPress themes and plugins",
      "Participated in UI/UX design discussions",
      "Learned and implemented modern frontend frameworks",
    ],
  },
]

export default function ExperiencePage() {
  const { user } = useAuth()
  const [experiences, setExperiences] = useState(mockExperiences)

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  My professional journey and career highlights.
                </p>
              </div>
              {user && (
                <div className="flex-shrink-0">
                  <Button asChild>
                    <Link href="/dashboard/experience/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-8 space-y-8">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isEditable={!!user}
                  onDelete={() => handleDelete(experience.id)}
                />
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
