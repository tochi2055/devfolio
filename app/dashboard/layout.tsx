"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { ColorPalette } from "@/components/color-palette"
import { LogoutConfirmation } from "@/components/logout-confirmation"
import { Button } from "@/components/ui/button"
import { Code, LayoutDashboard, FolderKanban, Briefcase, Settings, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // This would check if the user is authenticated in a real app
  useEffect(() => {
    setIsMounted(true)
    // In a real app with Firebase:
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (!user) router.push('/login')
    // })
    // return () => unsubscribe()
  }, [router])

  if (!isMounted) {
    return null // Prevents hydration errors
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2 py-4 font-bold">
                    <Code className="h-5 w-5" />
                    <span>Devfolio</span>
                  </div>
                  <nav className="flex-1 space-y-2 py-4">
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/projects">
                      <Button variant="ghost" className="w-full justify-start">
                        <FolderKanban className="mr-2 h-5 w-5" />
                        Projects
                      </Button>
                    </Link>
                    <Link href="/dashboard/experience">
                      <Button variant="ghost" className="w-full justify-start">
                        <Briefcase className="mr-2 h-5 w-5" />
                        Experience
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-5 w-5" />
                        Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-5 w-5" />
                        Settings
                      </Button>
                    </Link>
                  </nav>
                  <div className="border-t py-4">
                    <LogoutConfirmation
                      variant="ghost"
                      size="default"
                      className="w-full justify-start"
                      showIcon={true}
                      buttonText="Logout"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <Code className="h-5 w-5" />
              <span>Devfolio</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ColorPalette />
            <ModeToggle />
            <LogoutConfirmation variant="ghost" size="icon" className="hidden md:flex" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background lg:block">
          {/* <div className="flex h-full flex-col">
            <nav className="flex-1 space-y-2 p-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/projects">
                <Button variant="ghost" className="w-full justify-start">
                  <FolderKanban className="mr-2 h-5 w-5" />
                  Projects
                </Button>
              </Link>
              <Link href="/dashboard/experience">
                <Button variant="ghost" className="w-full justify-start">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experience
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </Link>
            </nav>
            <div className="border-t p-4">
              <LogoutConfirmation
                variant="ghost"
                size="default"
                className="w-full justify-start"
                showIcon={true}
                buttonText="Logout"
              />
            </div>
          </div> */}
          <DashboardNav />
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
