import React from 'react';
import { Puzzle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <Puzzle className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Puzzlfo</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Home</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2">
              Puzzles <ChevronDown className="w-4 h-4 opacity-50 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden flex flex-col">
              <Link href="/generator" className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors border-b border-slate-100">
                Word Search
              </Link>
              <div className="px-4 py-3 text-sm font-medium text-slate-400 bg-slate-50/50 cursor-not-allowed border-b border-slate-100 flex justify-between items-center">
                Sudoku <span className="text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">SOON</span>
              </div>
              <div className="px-4 py-3 text-sm font-medium text-slate-400 bg-slate-50/50 cursor-not-allowed flex justify-between items-center">
                Crossword <span className="text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">SOON</span>
              </div>
            </div>
          </div>

          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile menu could go here, for now we keep it simple or hide elements on mobile */}
          <Button asChild variant="default" size="sm" className="hidden md:flex">
            <Link href="/generator">Create Puzzle</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
