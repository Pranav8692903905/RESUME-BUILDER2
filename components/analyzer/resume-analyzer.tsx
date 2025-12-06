"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  const [isLoading, setIsLoading] = useState(false) // Declare setIsLoading variable

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
    setIsLoading(true) // Set isLoading to true before analysis

    // Simulate AI analysis with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results - in real app, this would call AI service
    const mockAnalysis: AnalysisData = {
      overallScore: 78,
      atsCompatibility: 85,
      keywordMatch: 72,
      formatting: 90,
      content: 65,
      suggestions: [
        {
          type: "critical",
          category: "Keywords",
          title: "Missing Industry Keywords",
          description:
            "Your resume lacks important keywords like 'React', 'TypeScript', and 'API development' that are commonly found in job descriptions.",
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
        missing: ["React", "TypeScript", "AWS", "Docker", "CI/CD"],
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
    setIsLoading(false) // Set isLoading to false after analysis
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Analyze Your Resume</h2>
              <p className="text-muted-foreground text-lg">
                Get instant feedback on your resume's ATS compatibility and improvement suggestions
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload your resume in PDF, DOC, or DOCX format for comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {uploadedFile && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{uploadedFile.name}</strong> uploaded successfully. Ready for analysis.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={analyzeResume}
                  disabled={!uploadedFile || isAnalyzing || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing || isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Overall Resume Score
                  <Badge variant={getScoreVariant(analysisData.overallScore)} className="text-lg px-3 py-1">
                    {analysisData.overallScore}/100
                  </Badge>
                </CardTitle>
                <CardDescription>Your resume has been analyzed across multiple criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(analysisData.atsCompatibility)}`}>
                      {analysisData.atsCompatibility}%
                    </div>
                    <p className="text-sm text-muted-foreground">ATS Compatible</p>
                    <Progress value={analysisData.atsCompatibility} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(analysisData.keywordMatch)}`}>
                      {analysisData.keywordMatch}%
                    </div>
                    <p className="text-sm text-muted-foreground">Keyword Match</p>
                    <Progress value={analysisData.keywordMatch} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(analysisData.formatting)}`}>
                      {analysisData.formatting}%
                    </div>
                    <p className="text-sm text-muted-foreground">Formatting</p>
                    <Progress value={analysisData.formatting} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(analysisData.content)}`}>
                      {analysisData.content}%
                    </div>
                    <p className="text-sm text-muted-foreground">Content Quality</p>
                    <Progress value={analysisData.content} className="mt-2" />
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Found Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.found.map((keyword) => (
                          <Badge key={keyword} variant="default" className="bg-green-100 text-green-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-600">
                        <XCircle className="h-5 w-5 mr-2" />
                        Missing Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.missing.map((keyword) => (
                          <Badge key={keyword} variant="destructive" className="bg-red-100 text-red-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Recommended
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.recommended.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-blue-100 text-blue-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="mt-6">
                <div className="space-y-4">
                  {analysisData.sections.map((section) => (
                    <Card key={section.name}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{section.name}</CardTitle>
                          <Badge variant={getScoreVariant(section.score)}>{section.score}/100</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Progress value={section.score} className="mb-4" />
                        {section.issues.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Issues to address:</p>
                            <ul className="space-y-1">
                              {section.issues.map((issue, index) => (
                                <li key={index} className="text-sm flex items-center">
                                  <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
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
      </div>
    </div>
  )
}
