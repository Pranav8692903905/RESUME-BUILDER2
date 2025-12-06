"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Check } from "lucide-react"

interface TemplateSelectorProps {
  onSelect: (template: "modern" | "minimal" | "corporate") => void
  selectedTemplate?: "modern" | "minimal" | "corporate"
}

export function TemplateSelector({ onSelect, selectedTemplate }: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern" as const,
      name: "Modern",
      description: "Clean, contemporary design perfect for tech and creative roles",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary/50",
    },
    {
      id: "minimal" as const,
      name: "Minimal",
      description: "Simple, elegant layout that focuses on content and readability",
      color: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary/50",
    },
    {
      id: "corporate" as const,
      name: "Corporate",
      description: "Traditional, professional format ideal for business and finance",
      color: "from-muted/50 to-muted/20",
      iconColor: "text-muted-foreground/50",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`group hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
            selectedTemplate === template.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect(template.id)}
        >
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-3 w-3" />
            </div>
          )}
          <CardHeader>
            <div
              className={`h-48 bg-gradient-to-br ${template.color} rounded-lg mb-4 flex items-center justify-center`}
            >
              <FileText className={`h-16 w-16 ${template.iconColor}`} />
            </div>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={selectedTemplate === template.id ? "default" : "outline"}
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(template.id)
              }}
            >
              {selectedTemplate === template.id ? "Selected" : "Select Template"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
