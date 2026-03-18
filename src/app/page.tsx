'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Wand2, LayoutGrid, Download, Printer, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Wand2 className="w-4 h-4" />
              <span>Free Online Puzzle Maker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Create Word Search <span className="text-primary">Puzzles in Seconds</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate, customize, and export high-quality word search puzzles for your classroom, 
              hobby books, or just for fun. No account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/25">
                <Link href="/generator" className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Start Generating
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold bg-white" asChild>
                <Link href="/generator">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LayoutGrid className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Flexible Grids</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose any size from 8x8 up to 40x40. Perfect for everything from simple kids' puzzles to complex challenges.
                </p>
              </div>

              <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                <div className="bg-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Export to PNG</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Download high-resolution images of both your puzzle and the solution. Perfect for printing or digital use.
                </p>
              </div>

              <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Instant Validation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our algorithm ensures every word fits perfectly. We handle the complex math while you focus on the words.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to create your first puzzle?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
              Join thousands of teachers and puzzle enthusiasts who use PuzzleForge every day.
            </p>
            <Button asChild variant="secondary" size="lg" className="h-14 px-10 text-lg font-bold">
              <Link href="/generator">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
