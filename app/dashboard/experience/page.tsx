import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react"

// Mock data for work experience
const experiences = [
  {
    id: "1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    duration: "2020 - Present",
    description:
      "Led the frontend development team in building and maintaining multiple web applications. Implemented modern frontend practices and improved performance by 40%.",
    responsibilities: [
      "Developed and maintained multiple React applications",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines for frontend projects",
      "Collaborated with UX designers to improve user experience",
    ],
  },
  {
    id: "2",
    company: "WebSolutions LLC",
    position: "Frontend Developer",
    duration: "2018 - 2020",
    description:
      "Worked on various client projects using React, Angular, and Vue.js. Collaborated with backend developers to integrate APIs and implement features.",
    responsibilities: [
      "Built responsive web applications using modern JavaScript frameworks",
      "Implemented state management solutions using Redux and Context API",
      "Optimized application performance and loading times",
      "Participated in agile development processes",
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
            <p className="text-muted-foreground">Manage your professional experience</p>
          </div>
          <Link href="/dashboard/experience/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </Link>
        </div>
        <div className="grid gap-6">
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl">{experience.position}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium">{experience.company}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{experience.duration}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/experience/${experience.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{experience.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {experience.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-sm">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
