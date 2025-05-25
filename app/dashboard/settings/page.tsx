"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Upload, X, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    title: "Senior Frontend Developer",
    email: "john.doe@example.com",
    bio: "Passionate frontend developer with 5+ years of experience building modern web applications using React, TypeScript, and Next.js.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  })

  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>("/placeholder.svg?height=100&width=100")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [publicPortfolio, setPublicPortfolio] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [portfolioTemplate, setPortfolioTemplate] = useState("minimal")
  const [fontSize, setFontSize] = useState(16)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Apply font size to the document
    if (typeof window !== "undefined") {
      const savedFontSize = localStorage.getItem("font-size")
      if (savedFontSize) {
        setFontSize(Number.parseInt(savedFontSize))
        document.documentElement.style.fontSize = `${savedFontSize}px`
      }
    }
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatar(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatar(null)
    setAvatarPreview("/cartoon-black-man-with-sunglasses-jacket-generative-ai_955925-34025.jpg?height=100&width=100")
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulate image upload if an avatar is selected
      if (avatar) {
        simulateUpload()
        // In a real app with Firebase:
        // const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`)
        // const uploadTask = uploadBytesResumable(storageRef, avatar)

        // uploadTask.on('state_changed',
        //   (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     setUploadProgress(progress)
        //   },
        //   (error) => {
        //     setError("Failed to upload avatar")
        //     setLoading(false)
        //   },
        //   async () => {
        //     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        //     // Update user profile in Firestore with the avatar URL
        //     await updateDoc(doc(db, "users", auth.currentUser.uid), {
        //       ...profileData,
        //       avatarUrl: downloadURL,
        //       updatedAt: serverTimestamp()
        //     })
        //     setSuccess("Profile updated successfully")
        //     setLoading(false)
        //   }
        // )
      } else {
        // Update profile without avatar
        // In a real app with Firebase:
        // await updateDoc(doc(db, "users", auth.currentUser.uid), {
        //   ...profileData,
        //   updatedAt: serverTimestamp()
        // })

        // Simulate successful profile update
        setTimeout(() => {
          setSuccess("Profile updated successfully")
          setLoading(false)
        }, 1000)
      }
    } catch (error) {
      setError("Failed to update profile. Please try again.")
      setLoading(false)
    }
  }

  const handleSavePreferences = () => {
    setLoading(true)
    setSuccess("")

    // In a real app, save preferences to Firebase
    // localStorage.setItem('darkMode', darkMode.toString())
    localStorage.setItem("portfolio-template", portfolioTemplate)
    localStorage.setItem("font-size", fontSize.toString())

    // Apply font size to the document
    document.documentElement.style.fontSize = `${fontSize}px`

    // Simulate saving preferences
    setTimeout(() => {
      setSuccess("Preferences saved successfully")
      setLoading(false)
    }, 1000)
  }

  if (!mounted) return null

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col gap-4 md:gap-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information and social links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative h-24 w-24">
                        {avatarPreview && (
                          <img
                            src={avatarPreview || "/cartoon-black-man-with-sunglasses-jacket-generative-ai_955925-34025.jpg"}
                            alt="Avatar"
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
                            <Loader2 className="h-8 w-8 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="sr-only"
                          />
                        </label>
                        {avatarPreview && avatarPreview !== "/cartoon-black-man-with-sunglasses-jacket-generative-ai_955925-34025.jpg?height=100&width=100" && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeAvatar}
                            className="flex items-center gap-2"
                          >
                            <X className="h-4 w-4" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={profileData.title}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={profileData.location} onChange={handleProfileChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={profileData.website}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        type="url"
                        value={profileData.github}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={profileData.linkedin}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        type="url"
                        value={profileData.twitter}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading || isUploading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your portfolio and application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {success && (
                  <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-portfolio">Public Portfolio</Label>
                    <p className="text-sm text-muted-foreground">Make your portfolio visible to the public</p>
                  </div>
                  <Switch id="public-portfolio" checked={publicPortfolio} onCheckedChange={setPublicPortfolio} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark mode for your dashboard</p>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about portfolio views and messages
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={loading}>
                  {loading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Templates</CardTitle>
                <CardDescription>Choose a template for your public portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {success && (
                  <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <RadioGroup
                  value={portfolioTemplate}
                  onValueChange={setPortfolioTemplate}
                  className="grid gap-6 md:grid-cols-3"
                >
                  <div>
                    <div className="relative">
                      <RadioGroupItem value="minimal" id="minimal" className="sr-only" />
                      <Label
                        htmlFor="minimal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-4 rounded-md border p-2 w-full">
                          <img
                            src="/sophisticated-full-landing-page-with-word-quotdesign-studio-portfolio_1269188-6697.jpg?height=100&width=200&text=Minimal"
                            alt="Minimal Template"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">Minimal</h3>
                          <p className="text-sm text-muted-foreground">Clean and simple design</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <RadioGroupItem value="creative" id="creative" className="sr-only" />
                      <Label
                        htmlFor="creative"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-4 rounded-md border p-2 w-full">
                          <img
                            src="/project1.jpg?height=100&width=200&text=Creative"
                            alt="Creative Template"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">Creative</h3>
                          <p className="text-sm text-muted-foreground">Modern and eye-catching</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <RadioGroupItem value="professional" id="professional" className="sr-only" />
                      <Label
                        htmlFor="professional"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-4 rounded-md border p-2 w-full">
                          <img
                            src="/business-blogging-technology-people-concept-businessman-with-internet-blog-page-laptop-computer-screen-working-office_380164-151555.avif?height=100&width=200&text=Professional"
                            alt="Professional Template"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-medium">Professional</h3>
                          <p className="text-sm text-muted-foreground">Corporate and structured</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={loading}>
                  {loading ? "Saving..." : "Save Template"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>Customize your viewing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {success && (
                  <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="font-size" className="mb-2 block">
                      Font Size
                    </Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Small</span>
                        <span className="text-sm">{fontSize}px</span>
                        <span className="text-sm">Large</span>
                      </div>
                      <Slider
                        id="font-size"
                        min={12}
                        max={24}
                        step={1}
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                      <div className="mt-2">
                        <p style={{ fontSize: `${fontSize}px` }} className="border p-2 rounded">
                          This is a preview of the selected font size.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reduced-motion" className="mb-2 block">
                      Reduced Motion
                    </Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground">
                          Reduce animations and motion effects throughout the application
                        </p>
                      </div>
                      <Switch id="reduced-motion" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="high-contrast" className="mb-2 block">
                      High Contrast
                    </Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm text-muted-foreground">
                          Increase contrast between elements for better visibility
                        </p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={loading}>
                  {loading ? "Saving..." : "Save Accessibility Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
