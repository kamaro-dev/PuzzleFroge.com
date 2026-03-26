import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { LayoutGrid, CheckCircle2, Wand2, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Puzzles – Puzzlfo',
  description: 'Explore all the free puzzle generators available on Puzzlfo.',
};

export default function PuzzlesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Explore Puzzle Generators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our collection of professional-grade puzzle generation tools. More puzzles are being added regularly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Word Search Generator */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <LayoutGrid className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available
              </span>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-slate-900">Word Search Generator</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Create custom word search puzzles with your own words. Download high-resolution PNGs or PDFs perfectly sized for printing.
            </p>
            
            <Button asChild className="w-full h-12 text-md shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Link href="/word-search-generator" className="flex items-center justify-center gap-2">
                Create Puzzle
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Sudoku Generator */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 opacity-80 flex flex-col transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <LayoutGrid className="w-8 h-8 text-slate-500" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide">
                Coming Soon
              </span>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-slate-800">Sudoku Generator</h2>
            <p className="text-slate-500 mb-8 flex-grow">
              Generate classic Sudoku puzzles with multiple difficulty levels. Perfect for daily challenges or puzzle books.
            </p>
            
            <Button disabled variant="outline" className="w-full h-12 text-md bg-slate-100 text-slate-400 border-slate-200">
              In Development
            </Button>
          </div>

          {/* Crossword Generator */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 opacity-80 flex flex-col transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-200 to-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Wand2 className="w-8 h-8 text-slate-500" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide">
                Coming Soon
              </span>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-slate-800">Crossword Generator</h2>
            <p className="text-slate-500 mb-8 flex-grow">
              Build your own crosswords automatically from a list of words and clues. Easy to edit and customize.
            </p>
            
            <Button disabled variant="outline" className="w-full h-12 text-md bg-slate-100 text-slate-400 border-slate-200">
              In Development
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
