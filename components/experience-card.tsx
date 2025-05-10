"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ExperienceCardProps {
  experience: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    responsibilities: string[]
  }
  isEditable?: boolean
  onDelete?: (id: string) => void
}

export function ExperienceCard({ experience, isEditable = false, onDelete }: ExperienceCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()

  const handleDelete = () => {
    if (onDelete) {
      onDelete(experience.id)
      toast({
        title: "Experience deleted",
        description: "The experience has been successfully deleted.",
      })
    }
    setShowDeleteDialog(false)
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const startDate = formatDate(experience.startDate)
  const endDate = experience.current ? "Present" : formatDate(experience.endDate)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{experience.position}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-medium">{experience.company}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {startDate} - {endDate}
              </span>
            </div>
          </div>
          {isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/experience/${experience.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/experience/${experience.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this experience entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
