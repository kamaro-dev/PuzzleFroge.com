import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-600 prose-lg">
            <p>
              By using Puzzlfo, you agree to use the tool for lawful purposes only.
            </p>
            <p>
              All generated content is provided as-is. We are not responsible for how users use the generated puzzles or for any potential errors in the content produced by the automated generators.
            </p>
            <p>
              We reserve the right to update or change the service, its features, or these terms at any time without notice. Continued use of the platform after any such changes constitutes your consent to those changes.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
