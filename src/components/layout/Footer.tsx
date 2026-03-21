import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Puzzlfo</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            The free online platform to create printable puzzles such as word searches, Sudoku, and more.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
        
        <div className="w-full max-w-lg border-t border-slate-100 pt-8 text-xs text-slate-400">
          © 2026 Puzzlfo
        </div>
      </div>
    </footer>
  );
};