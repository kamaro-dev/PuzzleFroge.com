'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Wand2, LayoutGrid, Download, Printer, CheckCircle2, UserX, Settings2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 bg-white border-b border-slate-200">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Wand2 className="w-4 h-4" />
              <span>Free Online Puzzle Maker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Create Custom <span className="text-primary">Puzzles Online</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Generate word searches, sudoku, crosswords and more in seconds.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/25">
                <Link href="/puzzles">Explore Puzzles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Puzzlfo?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to create the perfect puzzle for your classroom, publication, or personal use.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-800">Easy to use</h3>
                <p className="text-slate-600 text-sm">Intuitive interface to create puzzles in just a few clicks.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Settings2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-800">Custom settings</h3>
                <p className="text-slate-600 text-sm">Control dimensions, difficulty, and contents of your puzzles.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-800">PNG or PDF</h3>
                <p className="text-slate-600 text-sm">Download high-resolution, print-ready files instantly.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <UserX className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-800">No signup required</h3>
                <p className="text-slate-600 text-sm">Start generating puzzles immediately without an account.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tools Section */}
        <section className="py-16 px-4 bg-slate-100 border-y border-slate-200">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider text-center mb-8">Available Tools</h2>
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
                  <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-md">
                    <Link href="/word-search-generator" className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      Create Word Search
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 px-4 bg-white border-b border-slate-200">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Coming Soon</h2>
              <p className="text-lg text-slate-600">We are working hard to bring you more puzzle types.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Sudoku */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 opacity-80 flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutGrid className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Sudoku</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Classic Sudoku puzzles with multiple difficulties.</p>
              </div>
              
              {/* Crosswords */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 opacity-80 flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Wand2 className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Crossword</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Custom crosswords with flexible grid layouts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Paragraph Section */}
        <section className="py-16 px-4 bg-slate-50 text-center">
          <div className="container mx-auto max-w-3xl">
            <p className="text-slate-500 text-sm leading-relaxed">
              Puzzlfo is a free online puzzle generator that helps you create printable puzzles like word searches and more. Perfect for teachers, creators, and puzzle lovers.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
