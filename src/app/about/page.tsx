import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">About Puzzlfo</h1>
          
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-600 prose-lg">
            <p>
              Puzzlfo is a free online platform to create printable puzzles such as word searches, Sudoku, and more.
            </p>
            <p>
              It is designed for creators, teachers, and puzzle lovers who want an easy, fast, and high-quality tool to generate puzzles for their classrooms, hobby books, or personal enjoyment.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
