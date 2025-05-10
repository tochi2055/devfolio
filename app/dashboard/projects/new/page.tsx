"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X, Upload, Loader2 } from "lucide-react"

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate image upload if an image is selected
      if (image) {
        simulateUpload()
        // In a real app with Firebase:
        // const storageRef = ref(storage, `projects/${Date.now()}_${image.name}`)
        // const uploadTask = uploadBytesResumable(storageRef, image)

        // uploadTask.on('state_changed',
        //   (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     setUploadProgress(progress)
        //   },
        //   (error) => {
        //     setError("Failed to upload image")
        //     setLoading(false)
        //   },
        //   async () => {
        //     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        //     // Add project to Firestore with the image URL
        //     await addDoc(collection(db, "projects"), {
        //       ...formData,
        //       techStack: formData.techStack.split(',').map(tech => tech.trim()),
        //       imageUrl: downloadURL,
        //       createdAt: serverTimestamp(),
        //       userId: auth.currentUser.uid
        //     })
        //     router.push('/dashboard/projects')
        //   }
        // )
      } else {
        // Add project without image
        // In a real app with Firebase:
        // await addDoc(collection(db, "projects"), {
        //   ...formData,
        //   techStack: formData.techStack.split(',').map(tech => tech.trim()),
        //   createdAt: serverTimestamp(),
        //   userId: auth.currentUser.uid
        // })

        // Simulate successful project creation
        setTimeout(() => {
          router.push("/dashboard/projects")
        }, 1000)
      }
    } catch (error) {
      setError("Failed to create project. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col gap-4 md:gap-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
          <p className="text-muted-foreground">Create a new project to showcase in your portfolio</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Fill in the details about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Tailwind CSS"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liveLink">Live Demo Link</Label>
                <Input
                  id="liveLink"
                  name="liveLink"
                  type="url"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="https://project.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-48 w-full rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                          <p className="mt-2 text-sm font-medium">Uploading... {uploadProgress.toFixed(0)}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || isUploading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
