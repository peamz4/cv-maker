"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCVStore } from "@/lib/cv-store";

export default function TemplatesPage() {
  const { setTemplate } = useCVStore();

  const handleSelectTemplate = (template: string) => {
    setTemplate(template);
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
            <Link href="/create">
              <Button>Create CV</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-4">CV Templates</h1>
            <p className="text-muted-foreground">
              Choose from our professionally designed templates to create your perfect CV
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Modern Template */}
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                  <div className="w-full h-8 bg-primary mb-2 rounded"/>
                  <div className="flex-1 flex">
                    <div className="w-1/3 bg-secondary/50 mr-2 rounded"/>
                    <div className="flex-1 flex flex-col">
                      <div className="h-24 bg-secondary/50 mb-2 rounded"/>
                      <div className="flex-1 bg-secondary/50 rounded"/>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Modern</h3>
                    <p className="text-sm text-muted-foreground">Clean and professional</p>
                  </div>
                  <Link href="/create" onClick={() => handleSelectTemplate("modern")}>
                    <Button className="gap-1">
                      Use Template <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Classic Template */}
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                  <div className="w-full h-10 bg-background mb-2 rounded">
                    <div className="w-1/2 h-4 bg-primary mt-1 ml-1 rounded" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="h-20 bg-secondary/50 mb-2 rounded"/>
                    <div className="h-20 bg-secondary/50 mb-2 rounded"/>
                    <div className="flex-1 bg-secondary/50 rounded"/>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Classic</h3>
                    <p className="text-sm text-muted-foreground">Traditional and structured</p>
                  </div>
                  <Link href="/create" onClick={() => handleSelectTemplate("classic")}>
                    <Button className="gap-1">
                      Use Template <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Minimal Template */}
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                  <div className="w-full h-6 mb-2 rounded">
                    <div className="w-1/3 h-4 bg-primary rounded"/>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-secondary/50 w-5/6 rounded"/>
                    <div className="h-4 bg-secondary/50 w-4/6 rounded"/>
                    <div className="h-20 mt-2 bg-secondary/50 rounded"/>
                    <div className="h-20 bg-secondary/50 rounded"/>
                    <div className="h-4 bg-secondary/50 w-5/6 rounded"/>
                    <div className="h-4 bg-secondary/50 w-4/6 rounded"/>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Minimal</h3>
                    <p className="text-sm text-muted-foreground">Simple and elegant</p>
                  </div>
                  <Link href="/create" onClick={() => handleSelectTemplate("minimal")}>
                    <Button className="gap-1">
                      Use Template <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CV Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}