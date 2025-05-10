"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface LogoutConfirmationProps {
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
  buttonText?: string
}

export function LogoutConfirmation({
  variant = "ghost",
  size = "icon",
  className = "",
  showIcon = true,
  buttonText,
}: LogoutConfirmationProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    // In a real app: await signOut(auth)
    await signOut(auth)
    router.push("/login")
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)} className={className}>
        {showIcon && <LogOut className="h-5 w-5" />}
        {buttonText && <span>{buttonText}</span>}
        {!buttonText && !showIcon && "Logout"}
        {!buttonText && <span className="sr-only">Logout</span>}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page. Any unsaved changes may be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
