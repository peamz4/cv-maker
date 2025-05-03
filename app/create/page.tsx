"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  UserRound,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Eye,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { PersonalInfoForm } from "@/components/cv/personal-info-form";
import { EducationForm } from "@/components/cv/education-form";
import { ExperienceForm } from "@/components/cv/experience-form";
import { SkillsForm } from "@/components/cv/skills-form";
import { CVPreview } from "@/components/cv/cv-preview";
import { useToast } from "@/hooks/use-toast";


export default function CreateCV() {
  const [tab, setTab] = useState("personal");
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();

  const exportPDF = async () => {
    const preview = document.getElementById("cv-preview");
    if (!preview) {
      toast({
        title: "Export Failed",
        description: "CV preview not found.",
        variant: "destructive",
      });
      return;
    }

    // Save original styles
    const originalBg = preview.style.background;
    const originalColor = preview.style.color;
    const originalWidth = preview.style.width;
    const originalHeight = preview.style.height;
    const originalPadding = preview.style.padding;
    const originalBoxSizing = preview.style.boxSizing;

    // Set styles to fit A4 exactly and fill the space
    preview.style.background = "#fff";
    preview.style.color = "#000";
    preview.style.width = "794px";
    preview.style.height = "1123px";
    preview.style.padding = "0";
    preview.style.boxSizing = "border-box";
    preview.style.overflow = "hidden"; // Prevent scrollbars

    // Wait for DOM and styles to apply
    await new Promise((resolve) => setTimeout(resolve, 500));

    const html2pdfModule = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default || html2pdfModule;

    html2pdf()
      .from(preview)
      .set({
        margin: 0,
        filename: "cv.pdf",
        html2canvas: { scale: 2, backgroundColor: "#fff", useCORS: true },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .save();

    // Restore original styles
    preview.style.background = originalBg;
    preview.style.color = originalColor;
    preview.style.width = originalWidth;
    preview.style.height = originalHeight;
    preview.style.padding = originalPadding;
    preview.style.boxSizing = originalBoxSizing;
    preview.style.overflow = "";

    toast({
      title: "CV Downloaded",
      description: "Your CV has been successfully exported as PDF.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl">CV Maker</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPreviewOpen(!previewOpen)}
              aria-label="Toggle preview"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button onClick={exportPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className={`${previewOpen ? "hidden lg:block lg:w-1/2" : "w-full"} border-r`}>
          <div className="container mx-auto p-4 max-w-3xl">
            <div className="mb-8">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold mb-2">Create Your CV</h1>
              <p className="text-muted-foreground">
                Fill in the form below to create your professional CV
              </p>
            </div>

            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm onComplete={() => setTab("education")} />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm onComplete={() => setTab("experience")} />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm onComplete={() => setTab("skills")} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm onComplete={() => setPreviewOpen(true)} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`${previewOpen ? "block" : "hidden lg:block"} lg:w-1/2 bg-muted`}>
          <div className="sticky top-0 p-4 bg-background/80 backdrop-blur-sm border-b z-10 flex items-center justify-between">
            <h2 className="font-semibold">Preview</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewOpen(false)}
                className="lg:hidden"
              >
                Back to Form
              </Button>
              <Button size="sm" onClick={exportPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
          <div id="cv-preview" className="p-4">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
}