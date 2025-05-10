import { AddVercelAnalytics } from "@/components/add-vercel-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function IntegrationsPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Integrations</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <AddVercelAnalytics />

        <Card>
          <CardHeader>
            <CardTitle>GitHub Integration</CardTitle>
            <CardDescription>Connect your GitHub account to showcase repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Link your GitHub account to automatically import and display your repositories, contributions, and
              activity on your portfolio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Integration</CardTitle>
            <CardDescription>Import your professional experience from LinkedIn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect your LinkedIn profile to automatically import your work experience, education, and skills to your
              portfolio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medium Integration</CardTitle>
            <CardDescription>Display your Medium articles on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect your Medium account to showcase your published articles and establish yourself as a thought leader
              in your field.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
