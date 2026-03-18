import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-primary mb-2">PuzzleForge</h3>
            <p className="text-sm text-muted-foreground">
              The fastest way to generate printable word search puzzles for your classroom, book, or hobby.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PuzzleForge. Created with passion for puzzle lovers.
        </div>
      </div>
    </footer>
  );
};