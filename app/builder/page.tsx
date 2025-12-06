"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ResumeBuilder } from "@/components/resume/resume-builder"
import { ResumeProvider } from "@/components/resume/resume-context"
import { useAuth } from "@/components/auth/auth-context"

export default function BuilderPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent/20 border-t-accent mx-auto mb-4 shadow-lg"></div>
          <p className="text-muted-foreground font-medium">Loading Resume Builder...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}
