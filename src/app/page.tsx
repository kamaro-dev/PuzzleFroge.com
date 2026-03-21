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
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Wand2 className="w-4 h-4" />
              <span>Free Online Puzzle Maker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Free Online <span className="text-primary">Puzzle Generator</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create printable puzzles like word searches, Sudoku, crosswords and more. No signup required.
            </p>
          </div>
        </section>

        {/* Available Now Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider text-center mb-8">Available Now</h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10 hover:border-primary/50 transition-colors group">
              <div className="bg-blue-50 w-32 h-32 rounded-3xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <LayoutGrid className="w-16 h-16 text-primary" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Word Search Generator</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Generate, customize, and export high-quality word search puzzles for your classroom, hobby books, or just for fun. Choose grid sizes, word lists, and themes in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/25">
                    <Link href="/generator" className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      Start Generating
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 px-4 mt-8 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Coming Soon</h2>
              <p className="text-lg text-slate-600">We are working hard to bring you more puzzle types.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sudoku */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 opacity-80 flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutGrid className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Sudoku Generator</h3>
                <p className="text-slate-500 leading-relaxed">Create classic Sudoku puzzles of various difficulties with automatic solutions.</p>
              </div>
              
              {/* Crosswords */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 opacity-80 flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutGrid className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Crossword Generator</h3>
                <p className="text-slate-500 leading-relaxed">Build custom crosswords with your own clues, answers, and flexible grid layouts.</p>
              </div>
              
              {/* More puzzle types */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 opacity-80 flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Wand2 className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">More Puzzle Types</h3>
                <p className="text-slate-500 leading-relaxed">Mazes, cryptograms, logic puzzles, word scrambles, and much more.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
