import React from 'react';
import { Puzzle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img src="/logo.svg" alt="Puzzlfo Logo" className="h-8 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Home</Link>
          
          <Link href="/puzzles" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Puzzles</Link>

          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile menu could go here, for now we keep it simple or hide elements on mobile */}
          <Button asChild variant="default" size="sm" className="hidden md:flex">
            <Link href="/word-search-generator">Create Puzzle</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
