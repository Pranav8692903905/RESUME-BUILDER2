"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Download, Eye } from "lucide-react"
import { ResumeEditor } from "./resume-editor"
import { ResumePreview } from "./resume-preview"
import { TemplateSelector } from "./template-selector"
import { useResume } from "./resume-context"
import type { Resume } from "./resume-context"

declare global {
  interface Window {
    html2pdf?: any
  }
}

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("edit")
  const { currentResume, setCurrentResume, saveResume } = useResume()

  const handleCreateNew = (template: "modern" | "minimal" | "corporate") => {
    const newResume: Resume = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Untitled Resume",
      template,
      sections: [
        {
          id: "personal",
          type: "personal",
          title: "Personal Information",
          content: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
          },
          order: 0,
        },
        {
          id: "summary",
          type: "summary",
          title: "Professional Summary",
          content: { text: "" },
          order: 1,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setCurrentResume(newResume)
  }

  const handleSave = () => {
    saveResume()
    // Show success message
  }

  const handleDownload = async () => {
    try {
      const element = document.getElementById("resume-download")
      if (!element) {
        alert("Resume element not found")
        return
      }

      // Check if html2pdf is available
      if (!window.html2pdf) {
        // Fallback: Create a simple print-to-PDF
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(element.innerHTML)
          printWindow.document.close()
          setTimeout(() => {
            printWindow.print()
          }, 250)
        }
        return
      }

      const opt = {
        margin: 10,
        filename: `${currentResume?.title || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      }

      window.html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download PDF. Please try again.")
    }
  }

  if (!currentResume) {
    return (
      <div className="min-h-screen bg-background p-6 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
            style={{ backgroundImage: "url('/resume.avif')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-background/80" />
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Choose a Template</h1>
            <p className="text-muted-foreground">Select a professional template to get started</p>
          </div>
          <TemplateSelector onSelect={handleCreateNew} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: "url('/resume.avif')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-background/80" />
      </div>
      
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">{currentResume.title}</h1>
              <Badge variant="secondary" className="capitalize">
                {currentResume.template}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("preview")}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ResumeEditor />
              </div>
              <div className="hidden lg:block">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="scale-50 origin-top-left w-[200%] h-[600px] overflow-hidden">
                      <ResumePreview />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <div id="resume-download" className="mb-4">
                <ResumePreview />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Template</label>
                    <TemplateSelector
                      onSelect={(template) => {
                        if (currentResume) {
                          setCurrentResume({ ...currentResume, template })
                        }
                      }}
                      selectedTemplate={currentResume.template}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium block">Header Color</label>
                    <p className="text-xs text-muted-foreground mb-3">Choose a color for your resume header and section titles</p>
                    <div className="grid grid-cols-8 gap-3">
                      {[
                        { name: "Blue", value: "#3b82f6" },
                        { name: "Indigo", value: "#6366f1" },
                        { name: "Purple", value: "#8b5cf6" },
                        { name: "Pink", value: "#ec4899" },
                        { name: "Red", value: "#ef4444" },
                        { name: "Orange", value: "#f97316" },
                        { name: "Green", value: "#10b981" },
                        { name: "Teal", value: "#14b8a6" },
                        { name: "Cyan", value: "#06b6d4" },
                        { name: "Navy", value: "#1e40af" },
                        { name: "Slate", value: "#475569" },
                        { name: "Black", value: "#000000" },
                      ].map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            if (currentResume) {
                              setCurrentResume({ ...currentResume, headerColor: color.value })
                            }
                          }}
                          className={`w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                            currentResume.headerColor === color.value
                              ? "ring-2 ring-offset-2 ring-primary"
                              : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <input
                        type="color"
                        value={currentResume.headerColor || "#3b82f6"}
                        onChange={(e) => {
                          if (currentResume) {
                            setCurrentResume({ ...currentResume, headerColor: e.target.value })
                          }
                        }}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-medium">Custom Color</p>
                        <p className="text-xs text-muted-foreground">{currentResume.headerColor || "#3b82f6"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
