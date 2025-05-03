import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Download, PenLine } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl">CV Maker by Peam</span>
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
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Create Your Professional CV in Minutes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Design, customize, and download your professional CV with our easy-to-use builder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create">
                <Button size="lg" className="gap-2">
                  Create Your CV <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="gap-2">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fill Your Details</h3>
                <p className="text-muted-foreground">
                  Enter your information through our easy-to-use form interface.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Templates</h3>
                <p className="text-muted-foreground">
                  Select from our professionally designed CV templates.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
                <p className="text-muted-foreground">
                  Export your ready-to-use CV as a professional PDF file.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your CV?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building your professional CV today and take the next step in your career.
            </p>
            <Link href="/create">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pirawish Pathumngern. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}