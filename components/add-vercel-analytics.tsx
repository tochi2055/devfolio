"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function AddVercelAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddAnalytics = async () => {
    setIsLoading(true)
    try {
      // This would typically be an API call to set up Vercel Analytics
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Analytics Added",
        description: "Vercel Analytics has been successfully integrated with your portfolio.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add Vercel Analytics. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Vercel Analytics</CardTitle>
        <CardDescription>Track visitor engagement and performance metrics for your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Vercel Analytics provides insights into how visitors interact with your portfolio, including page views,
          unique visitors, and performance metrics. This helps you understand what content resonates with your audience
          and identify areas for improvement.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddAnalytics} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Vercel Analytics"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
