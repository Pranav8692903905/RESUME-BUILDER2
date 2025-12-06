"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, TrendingUp } from "lucide-react"

interface SkillGapAnalysisProps {
  matchingSkills: string[]
  missingSkills: string[]
}

export function SkillGapAnalysis({ matchingSkills, missingSkills }: SkillGapAnalysisProps) {
  const totalSkills = matchingSkills.length + missingSkills.length
  const matchPercentage = Math.round((matchingSkills.length / totalSkills) * 100)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">{matchPercentage}%</div>
        <p className="text-muted-foreground">Skills Match Rate</p>
        <p className="text-sm text-muted-foreground mt-1">
          {matchingSkills.length} of {totalSkills} required skills found
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              Matching Skills ({matchingSkills.length})
            </CardTitle>
            <CardDescription>Skills you already have that match the job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {matchingSkills.map((skill) => (
                <Badge key={skill} variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
            {matchingSkills.length === 0 && <p className="text-sm text-muted-foreground">No matching skills found.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <XCircle className="h-5 w-5 mr-2" />
              Missing Skills ({missingSkills.length})
            </CardTitle>
            <CardDescription>Skills mentioned in the job description that you should consider adding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <Badge key={skill} variant="destructive" className="bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
            {missingSkills.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-green-600 font-medium">All required skills found!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {missingSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Skill Development Priority
            </CardTitle>
            <CardDescription>Focus on these skills to improve your job match score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {missingSkills.slice(0, 3).map((skill, index) => (
                <div key={skill} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{skill}</span>
                  </div>
                  <Badge variant="secondary">High Priority</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
