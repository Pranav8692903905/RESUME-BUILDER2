"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BarChart3, CheckCircle, AlertTriangle, XCircle, Upload, FileText, Zap, TrendingUp } from "lucide-react"
import { ScoreBreakdown } from "./score-breakdown"
import { ImprovementSuggestions } from "./improvement-suggestions"

interface AnalysisData {
  overallScore: number
  atsCompatibility: number
  keywordMatch: number
  formatting: number
  content: number
  suggestions: Array<{
    type: "critical" | "warning" | "info"
    category: string
    title: string
    description: string
    impact: "high" | "medium" | "low"
  }>
  keywords: {
    found: string[]
    missing: string[]
    recommended: string[]
  }
  sections: {
    name: string
    score: number
    issues: string[]
  }[]
}

export function ResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setAnalysisData(null)
    }
  }

  const analyzeResume = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setIsLoading(true)

    // Simulate AI analysis with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results - include job match if description provided
    let keywordMatch = 72
    if (jobDescription && jobDescription.trim().length > 0) {
      keywordMatch = 82 // Higher match when comparing against job description
    }

    const mockAnalysis: AnalysisData = {
      overallScore: jobDescription ? 81 : 78,
      atsCompatibility: 85,
      keywordMatch: keywordMatch,
      formatting: 90,
      content: jobDescription ? 75 : 65,
      suggestions: [
        {
          type: "critical",
          category: "Keywords",
          title: jobDescription ? "Add Missing Job-Specific Keywords" : "Missing Industry Keywords",
          description: jobDescription
            ? "Your resume is missing some keywords from the job description like 'Kubernetes', 'Microservices'. Consider adding these."
            : "Your resume lacks important keywords like 'React', 'TypeScript', and 'API development' that are commonly found in job descriptions.",
          impact: "high",
        },
        {
          type: "warning",
          category: "Content",
          title: "Quantify Achievements",
          description:
            "Add specific numbers and metrics to your accomplishments (e.g., 'Increased sales by 25%' instead of 'Improved sales').",
          impact: "medium",
        },
        {
          type: "info",
          category: "Formatting",
          title: "Consistent Date Format",
          description: "Use a consistent date format throughout your resume (MM/YYYY recommended).",
          impact: "low",
        },
      ],
      keywords: {
        found: ["JavaScript", "Node.js", "MongoDB", "Git", "Agile"],
        missing: jobDescription ? ["Kubernetes", "Microservices", "Docker"] : ["React", "TypeScript", "AWS", "Docker", "CI/CD"],
        recommended: ["Next.js", "GraphQL", "Kubernetes", "Microservices"],
      },
      sections: [
        { name: "Contact Information", score: 95, issues: [] },
        { name: "Professional Summary", score: 70, issues: ["Too generic", "Lacks specific achievements"] },
        { name: "Work Experience", score: 80, issues: ["Missing quantified results"] },
        { name: "Skills", score: 60, issues: ["Missing trending technologies"] },
        { name: "Education", score: 90, issues: [] },
      ],
    }

    setAnalysisData(mockAnalysis)
    setIsAnalyzing(false)
    setIsLoading(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage: "url('/any.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(2,6,23,0.6)',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Resume Analyzer</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!analysisData ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Analyze Your Resume
              </h2>
              <p className="text-muted-foreground text-lg">
                Upload your resume and optionally add a job description to get targeted feedback
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Resume Upload - Impressive Design */}
              <Card className="border-0 bg-gradient-to-br from-blue-500/10 via-slate-800/80 to-blue-600/10 backdrop-blur-md shadow-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-300">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_50%)]" />
                
                <CardHeader className="relative z-10">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                      <Upload className="h-8 w-8 text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Upload Your Resume</CardTitle>
                    <CardDescription className="text-gray-300 mt-2">
                      Upload in PDF, DOC, or DOCX format
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
                  <div className="relative border-2 border-dashed border-blue-500/40 rounded-2xl p-12 text-center group hover:border-blue-500/60 transition-all duration-300 bg-blue-500/5">
                    <div className="space-y-4">
                      <div className="h-20 w-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                        <FileText className="h-10 w-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-white">Click to upload or drag & drop</p>
                        <p className="text-xs text-gray-400">PDF, DOC, DOCX • Up to 10MB</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {uploadedFile && (
                    <Alert className="bg-green-500/10 border-green-500/30">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-green-500/20 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-green-400" />
                        </div>
                        <AlertDescription className="text-green-300">
                          <strong>{uploadedFile.name}</strong> ready for analysis
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Right: Job Description - Impressive Design */}
              <Card className="border-0 bg-gradient-to-br from-purple-500/10 via-slate-800/80 to-purple-600/10 backdrop-blur-md shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.2),transparent_50%)]" />
                
                <CardHeader className="relative z-10">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                      <FileText className="h-8 w-8 text-purple-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Job Description</CardTitle>
                    <CardDescription className="text-gray-300 mt-2">
                      Optional but helps with matching
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  <div>
                    <Label htmlFor="jobDescription" className="text-white text-sm font-medium mb-3 block">
                      Paste Job Description Here
                    </Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description for better resume matching..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={12}
                      className="resize-none bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 rounded-xl focus:border-purple-500/60 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>
                  {jobDescription && (
                    <Alert className="bg-purple-500/10 border-purple-500/30">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-purple-400" />
                        </div>
                        <AlertDescription className="text-purple-300">
                          Job description added for better matching
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={analyzeResume}
                disabled={!uploadedFile || isAnalyzing || isLoading}
                className="relative px-12 py-6 text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50"
              >
                {isAnalyzing || isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Analyzing Your Resume...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5 inline" />
                    Analyze Resume Now
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overall Score - Impressive Design */}
            <Card className="border-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)]" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Resume Score Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      Your resume has been analyzed across multiple criteria
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent animate-pulse`}>
                      {analysisData.overallScore}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Overall Score</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* ATS Score */}
                  <div className="group bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className={`text-2xl font-bold text-blue-400`}>
                        {analysisData.atsCompatibility}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-300">ATS Compatible</p>
                    <Progress value={analysisData.atsCompatibility} className="mt-3 h-2" />
                  </div>

                  {/* Keyword Match */}
                  <div className="group bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className={`text-2xl font-bold text-purple-400`}>
                        {analysisData.keywordMatch}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Keyword Match</p>
                    <Progress value={analysisData.keywordMatch} className="mt-3 h-2" />
                  </div>

                  {/* Formatting */}
                  <div className="group bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className={`text-2xl font-bold text-emerald-400`}>
                        {analysisData.formatting}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Formatting</p>
                    <Progress value={analysisData.formatting} className="mt-3 h-2" />
                  </div>

                  {/* Content Quality */}
                  <div className="group bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/20 rounded-xl p-6 hover:border-pink-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-pink-400" />
                      </div>
                      <span className={`text-2xl font-bold text-pink-400`}>
                        {analysisData.content}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Content Quality</p>
                    <Progress value={analysisData.content} className="mt-3 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="suggestions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              </TabsList>

              <TabsContent value="suggestions" className="mt-6">
                <ImprovementSuggestions suggestions={analysisData.suggestions} />
              </TabsContent>

              <TabsContent value="keywords" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Found Keywords */}
                  <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-md shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-emerald-400">
                        <div className="h-8 w-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        Found Keywords
                      </CardTitle>
                      <CardDescription className="text-gray-400">Keywords detected in your resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.found.map((keyword) => (
                          <Badge key={keyword} className="bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/40 transition-all">
                            ✓ {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card className="border-0 bg-gradient-to-br from-red-500/10 to-rose-600/10 backdrop-blur-md shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-400">
                        <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-2">
                          <XCircle className="h-5 w-5" />
                        </div>
                        Missing Keywords
                      </CardTitle>
                      <CardDescription className="text-gray-400">Add these to improve match</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.missing.map((keyword) => (
                          <Badge key={keyword} className="bg-red-500/30 text-red-300 border border-red-500/50 hover:bg-red-500/40 transition-all">
                            ✗ {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended Keywords */}
                  <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-md shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-400">
                        <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-2">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        Recommended
                      </CardTitle>
                      <CardDescription className="text-gray-400">Trending skills to add</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.recommended.map((keyword) => (
                          <Badge key={keyword} className="bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40 transition-all">
                            ★ {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="mt-6">
                <div className="space-y-4">
                  {analysisData.sections.map((section) => {
                    const colors = {
                      "Contact Information": "from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400",
                      "Professional Summary": "from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400",
                      "Work Experience": "from-pink-500/10 to-pink-600/10 border-pink-500/20 text-pink-400",
                      "Skills": "from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 text-emerald-400",
                      "Education": "from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 text-cyan-400",
                    }
                    const colorClass = colors[section.name as keyof typeof colors] || "from-slate-500/10 to-slate-600/10 border-slate-500/20 text-slate-400"
                    
                    return (
                      <Card key={section.name} className={`border bg-gradient-to-br ${colorClass} backdrop-blur-md hover:shadow-xl transition-all duration-300`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-white">{section.name}</CardTitle>
                            <div className="text-right">
                              <Badge className="text-lg px-3 py-1 font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-slate-900">
                                {section.score}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={section.score} className="mb-4 h-2" />
                          {section.issues.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-300">Areas to improve:</p>
                              <ul className="space-y-2">
                                {section.issues.map((issue, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-yellow-100">{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {section.issues.length === 0 && (
                            <div className="text-sm flex items-center gap-2 text-emerald-300 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                              <CheckCircle className="h-4 w-4" />
                              <span>This section looks great!</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="mt-6">
                <ScoreBreakdown data={analysisData} />
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setAnalysisData(null)} variant="outline">
                Analyze Another Resume
              </Button>
              <Button>Download Report</Button>
              <Button variant="outline">Improve with Builder</Button>
            </div>
          </div>
        )}

        {/* Privacy & Information Footer */}
        <footer className="mt-16 border-t border-slate-700/50 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  About Resume Analyzer
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Our AI-powered analyzer evaluates your resume against industry standards and ATS requirements. 
                  Get detailed insights on formatting, keywords, content quality, and actionable suggestions to improve your resume.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  Your Privacy & Data Security
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Your resume is never stored on our servers. Analysis happens in real-time and all data is processed securely. 
                  We don't share, sell, or use your information for any purpose other than providing analysis results.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  What We Analyze
                </h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    ATS compatibility & formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Keyword optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Content quality & impact
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Section completeness
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-800/50 text-center">
              <p className="text-xs text-gray-500">
                © 2025 Resume Analyzer. All rights reserved. • Secure analysis - no data stored or shared.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
