"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { FileText } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleAuthSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="h-10 w-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center shadow-xl">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ResuMate
          </span>
        </div>

        {/* Auth Form */}
        {isSignUp ? (
          <SignUpForm onToggleMode={() => setIsSignUp(false)} onSuccess={handleAuthSuccess} />
        ) : (
          <SignInForm onToggleMode={() => setIsSignUp(true)} onSuccess={handleAuthSuccess} />
        )}
      </div>
    </div>
  )
}
