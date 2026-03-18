import React from 'react';
import { Puzzle, Github } from 'lucide-react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <Puzzle className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">PuzzleForge</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Generator</Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors opacity-50 cursor-not-allowed">Sudoku (Soon)</Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors opacity-50 cursor-not-allowed">Crossword (Soon)</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};