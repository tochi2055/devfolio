"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { jsPDF } from "jspdf"
import { useAuth } from "@/components/auth-provider"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export function ResumeDownload() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const generateResume = async () => {
    setIsLoading(true)
    try {
      // Fetch user profile data from Firestore
      const userDoc = await getDoc(doc(db, "userProfiles", user?.uid || "anonymous"))
      const userData = userDoc.exists() ? userDoc.data() : null

      // Fetch experience data
      const experienceSnapshot = await getDoc(doc(db, "experience", user?.uid || "anonymous"))
      const experienceData = experienceSnapshot.exists() ? experienceSnapshot.data().items || [] : []

      // Create a new PDF document
      const pdf = new jsPDF()

      // Add content to the PDF
      pdf.setFontSize(22)
      pdf.text(userData?.name || "Your Name", 20, 20)

      pdf.setFontSize(12)
      pdf.text(userData?.email || "email@example.com", 20, 30)
      pdf.text(userData?.phone || "123-456-7890", 20, 37)
      pdf.text(userData?.location || "City, Country", 20, 44)

      // Add about section
      pdf.setFontSize(16)
      pdf.text("About", 20, 60)
      pdf.setFontSize(12)
      const aboutText = userData?.about || "Professional summary goes here."
      const aboutLines = pdf.splitTextToSize(aboutText, 170)
      pdf.text(aboutLines, 20, 70)

      // Add experience section
      pdf.setFontSize(16)
      pdf.text("Experience", 20, 100)

      let yPosition = 110
      experienceData.forEach((exp: any) => {
        pdf.setFontSize(14)
        pdf.text(`${exp.title} at ${exp.company}`, 20, yPosition)
        yPosition += 7

        pdf.setFontSize(12)
        pdf.text(`${exp.startDate} - ${exp.endDate || "Present"}`, 20, yPosition)
        yPosition += 7

        const descLines = pdf.splitTextToSize(exp.description, 170)
        pdf.text(descLines, 20, yPosition)
        yPosition += descLines.length * 7 + 10

        // Add a new page if we're running out of space
        if (yPosition > 270) {
          pdf.addPage()
          yPosition = 20
        }
      })

      // Save the PDF
      pdf.save("resume.pdf")

      toast({
        title: "Resume Downloaded",
        description: "Your resume has been generated and downloaded successfully.",
      })
    } catch (error) {
      console.error("Error generating resume:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={generateResume} disabled={isLoading} className="w-full sm:w-auto">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </>
      )}
    </Button>
  )
}
