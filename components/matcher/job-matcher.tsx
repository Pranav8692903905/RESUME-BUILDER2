"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, Upload, FileText, Zap, TrendingUp, CheckCircle } from "lucide-react"
import { SkillGapAnalysis } from "./skill-gap-analysis"
import { RecommendationsList } from "./recommendations-list"

interface MatchData {
  overallMatch: number
  skillsMatch: number
  experienceMatch: number
  keywordMatch: number
  recommendations: Array<{
    type: "skill" | "experience" | "keyword" | "certification"
    title: string
    description: string
    priority: "high" | "medium" | "low"
    impact: string
  }>
  missingSkills: string[]
  matchingSkills: string[]
  suggestedProjects: string[]
  certifications: string[]
  jobDetails: {
    title: string
    company: string
    location: string
    requirements: string[]
  }
}

export function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [uploadedResume, setUploadedResume] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchData, setMatchData] = useState<MatchData | null>(null)

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedResume(file)
    }
  }

  const analyzeMatch = async () => {
    if (!jobDescription.trim() || !uploadedResume) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results
    const mockMatchData: MatchData = {
      overallMatch: 72,
      skillsMatch: 68,
      experienceMatch: 78,
      keywordMatch: 70,
      recommendations: [
        {
          type: "skill",
          title: "Learn React Hooks",
          description:
            "The job requires advanced React knowledge including hooks. Consider taking a course on modern React patterns.",
          priority: "high",
          impact: "Increases match score by 15%",
        },
        {
          type: "certification",
          title: "AWS Cloud Practitioner",
          description:
            "This role involves cloud deployment. Getting AWS certified would significantly boost your profile.",
          priority: "medium",
          impact: "Increases match score by 10%",
        },
        {
          type: "experience",
          title: "Add API Development Projects",
          description: "Showcase more REST API development experience to match the job requirements.",
          priority: "high",
          impact: "Increases match score by 12%",
        },
        {
          type: "keyword",
          title: "Include 'Microservices' Keyword",
          description: "The job description mentions microservices architecture. Add this to your skills section.",
          priority: "low",
          impact: "Increases match score by 5%",
        },
      ],
      missingSkills: ["React Hooks", "AWS", "Docker", "Kubernetes", "GraphQL"],
      matchingSkills: ["JavaScript", "Node.js", "MongoDB", "Git", "Agile", "REST APIs"],
      suggestedProjects: [
        "Build a microservices application with Docker",
        "Create a React app with advanced hooks",
        "Deploy an application to AWS",
        "Implement GraphQL API",
      ],
      certifications: ["AWS Cloud Practitioner", "Docker Certified Associate", "React Developer Certification"],
      jobDetails: {
        title: jobTitle || "Full Stack Developer",
        company: company || "Tech Company",
        location: "Remote",
        requirements: [
          "3+ years of JavaScript experience",
          "React and Node.js proficiency",
          "Experience with cloud platforms",
          "Knowledge of containerization",
          "API development experience",
        ],
      },
    }

    setMatchData(mockMatchData)
    setIsAnalyzing(false)
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getMatchVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/1715371733808.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(2,6,23,0.5)',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Job Description Matcher</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!matchData ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Match Your Resume to Job Descriptions</h2>
              <p className="text-muted-foreground text-lg">
                Get personalized recommendations to improve your chances of landing the job
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Resume Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>Upload your current resume for analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {uploadedResume && (
                    <Alert className="mt-4">
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{uploadedResume.name}</strong> uploaded successfully.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Job Description Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>Paste the job description you want to match against</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g., Senior Frontend Developer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g., Google"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the complete job description here..."
                      rows={12}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={analyzeMatch}
                disabled={!jobDescription.trim() || !uploadedResume || isAnalyzing}
                size="lg"
                className="px-8"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Analyze Job Match
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Match Score Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Job Match Analysis</CardTitle>
                    <CardDescription>
                      {matchData.jobDetails.title} at {matchData.jobDetails.company}
                    </CardDescription>
                  </div>
                  <Badge variant={getMatchVariant(matchData.overallMatch)} className="text-2xl px-4 py-2">
                    {matchData.overallMatch}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(matchData.overallMatch)}`}>
                      {matchData.overallMatch}%
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Match</p>
                    <Progress value={matchData.overallMatch} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(matchData.skillsMatch)}`}>
                      {matchData.skillsMatch}%
                    </div>
                    <p className="text-sm text-muted-foreground">Skills Match</p>
                    <Progress value={matchData.skillsMatch} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(matchData.experienceMatch)}`}>
                      {matchData.experienceMatch}%
                    </div>
                    <p className="text-sm text-muted-foreground">Experience Match</p>
                    <Progress value={matchData.experienceMatch} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(matchData.keywordMatch)}`}>
                      {matchData.keywordMatch}%
                    </div>
                    <p className="text-sm text-muted-foreground">Keywords Match</p>
                    <Progress value={matchData.keywordMatch} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="skills">Skills Gap</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="mt-6">
                <RecommendationsList recommendations={matchData.recommendations} />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillGapAnalysis matchingSkills={matchData.matchingSkills} missingSkills={matchData.missingSkills} />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Projects</CardTitle>
                    <CardDescription>Build these projects to strengthen your profile for this role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {matchData.suggestedProjects.map((project, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{project}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              This project will help demonstrate the skills required for this position.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Certifications</CardTitle>
                    <CardDescription>These certifications would strengthen your application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {matchData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
                          <div className="bg-secondary/10 p-2 rounded-full">
                            <CheckCircle className="h-4 w-4 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert}</h4>
                            <p className="text-sm text-muted-foreground">Industry-recognized certification</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setMatchData(null)} variant="outline">
                Analyze Another Job
              </Button>
              <Button>Download Report</Button>
              <Button variant="outline">Update Resume</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
