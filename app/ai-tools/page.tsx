"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AIToolsHub } from "@/components/ai-tools/ai-tools-hub"
import { useAuth } from "@/components/auth/auth-context"

export default function AIToolsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto mb-4 shadow-lg"></div>
          <p className="text-muted-foreground font-medium">Loading AI Tools...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <AIToolsHub />
}
