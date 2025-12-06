"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, XCircle, Info, TrendingUp } from "lucide-react"

interface Suggestion {
  type: "critical" | "warning" | "info"
  category: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
}

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[]
}

export function ImprovementSuggestions({ suggestions }: ImprovementSuggestionsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 }
    return impactOrder[b.impact] - impactOrder[a.impact]
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">{suggestions.length} suggestions</span>
        </div>
      </div>

      {sortedSuggestions.map((suggestion, index) => (
        <Card key={index} className="border-l-4 border-l-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {getIcon(suggestion.type)}
                <div>
                  <CardTitle className="text-base">{suggestion.title}</CardTitle>
                  <CardDescription className="text-sm">{suggestion.category}</CardDescription>
                </div>
              </div>
              <Badge className={getImpactColor(suggestion.impact)} variant="secondary">
                {suggestion.impact} impact
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.description}</p>
          </CardContent>
        </Card>
      ))}

      {suggestions.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2">Excellent Work!</h3>
            <p className="text-muted-foreground">Your resume looks great! No major improvements needed at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
