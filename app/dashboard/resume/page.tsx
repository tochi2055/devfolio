import { ResumeDownload } from "@/components/resume-download"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResumePage() {
  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Resume</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Download Resume</CardTitle>
            <CardDescription>Generate and download your resume as a PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Your resume will be generated based on your profile information, projects, and experience. Make sure your
              profile is up to date before downloading.
            </p>
            <ResumeDownload />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Settings</CardTitle>
            <CardDescription>Customize what appears on your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include profile photo</span>
                <div className="relative h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include contact information</span>
                <div className="relative h-6 w-11 cursor-pointer rounded-full bg-primary transition-colors">
                  <div className="absolute left-6 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include social links</span>
                <div className="relative h-6 w-11 cursor-pointer rounded-full bg-primary transition-colors">
                  <div className="absolute left-6 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include skills section</span>
                <div className="relative h-6 w-11 cursor-pointer rounded-full bg-primary transition-colors">
                  <div className="absolute left-6 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
