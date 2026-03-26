'use client';

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ControlsPanel } from '@/components/puzzle/ControlsPanel';
import { PuzzleGrid } from '@/components/puzzle/PuzzleGrid';
import { WordList } from '@/components/puzzle/WordList';
import { AdBanner } from '@/components/layout/AdBanner';
import { generateWordSearchPuzzleAlgorithm, PuzzleData, DirectionOptions } from '@/utils/puzzleGenerator';
import { exportToPNG, exportToPDF } from '@/utils/exportImage';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle, Download, Eye, EyeOff, LayoutGrid, FileText,
  Wand2, Settings2, ArrowDownToLine, UserX, Zap, Compass,
  GraduationCap, BookOpen, Baby, Puzzle, ChevronRight,
  CheckCircle2, Shield, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GeneratorPage() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [title, setTitle] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenerate = useCallback((newTitle: string, words: string[], width: number, height: number, options: DirectionOptions) => {
    setError(null);
    
    if (isNaN(width) || width < 8 || width > 40 || isNaN(height) || height < 8 || height > 40) {
      setError("Please enter a width and height between 8 and 40.");
      return;
    }

    const anyDirectionSelected = Object.values(options).some(val => val === true);
    if (!anyDirectionSelected) {
      setError("Please select at least one word direction.");
      return;
    }

    if (words.length === 0) {
      setError("Please enter at least one word to include in the puzzle.");
      return;
    }

    const uniqueWords = Array.from(new Set(words));
    if (uniqueWords.length !== words.length) {
      toast({ title: "Duplicates Removed", description: "We automatically removed duplicate words from your list." });
    }

    const tooLongWords = uniqueWords.filter(w => w.length > width && w.length > height);
    if (tooLongWords.length > 0) {
      setError(`The following words are too long for a ${width}x${height} grid: ${tooLongWords.join(', ')}`);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      try {
        const data = generateWordSearchPuzzleAlgorithm(uniqueWords, width, height, options);
        setPuzzle(data);
        setTitle(newTitle || 'Word Search');
        setShowSolution(false);
      } catch (err: any) {
        setError(err.message || "Failed to generate puzzle. Try reducing the number of words or increasing the grid size.");
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  }, [toast]);

  const getExportOptions = (type: 'puzzle' | 'solution') => {
    if (!puzzle) return null;
    return {
      title,
      grid: puzzle.grid,
      words: puzzle.wordPositions.map(p => p.word),
      wordPositions: puzzle.wordPositions,
      showSolution: type === 'solution',
      width: puzzle.width,
      height: puzzle.height
    };
  };

  const handleExportPNG = (type: 'puzzle' | 'solution') => {
    const opts = getExportOptions(type);
    if (!opts) return;
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${type}`;
    exportToPNG(opts, filename);
  };

  const handleExportPDF = (type: 'puzzle' | 'solution') => {
    const opts = getExportOptions(type);
    if (!opts) return;
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${type}`;
    exportToPDF(opts, filename);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">

        {/* ── HERO SECTION ── */}
        <section className="bg-white border-b border-slate-200 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Wand2 className="w-4 h-4" />
              <span>100% Free • No Signup Required</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-5">
              Free Word Search Generator
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Create custom printable word search puzzles in seconds. Choose your grid size, difficulty, and download as PDF or PNG.
            </p>
            <Button size="lg" onClick={scrollToGenerator} className="h-14 px-10 text-lg font-bold shadow-lg shadow-primary/25">
              Create Your Puzzle Now
            </Button>
          </div>
        </section>

        {/* ── INTRO TEXT ── */}
        <section className="py-10 px-4 bg-slate-50">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-lg text-slate-600 leading-relaxed">
              Our word search generator helps you quickly create fun and printable puzzles for classrooms, books, or personal use. Customize your puzzle and download it instantly — no account needed, no watermarks, no limits.
            </p>
          </div>
        </section>

        {/* ── TRUST SIGNALS ── */}
        <section className="py-6 px-4 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm font-semibold text-primary">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 100% Free to use</span>
              <span className="flex items-center gap-2"><Shield className="w-5 h-5" /> No signup required</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> Instant download</span>
            </div>
          </div>
        </section>

        {/* ── GENERATOR TOOL ── */}
        <section ref={generatorRef} className="py-12 px-4" id="generator">
          <div className="container mx-auto">
            <AdBanner position="top" />
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8 mt-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
                  <ControlsPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
                  
                  <div className="flex flex-col items-center justify-start min-h-[400px]">
                    {error && (
                      <Alert variant="destructive" className="mb-6 w-full max-w-2xl">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Validation Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {!puzzle && !isGenerating && !error && (
                      <div className="text-center space-y-4 max-w-md mt-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border">
                          <LayoutGrid className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Forge?</h2>
                          <p className="text-muted-foreground">
                            Enter your words, pick a difficulty level, and set your grid size to generate a professional word search puzzle.
                          </p>
                        </div>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="text-center mt-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-primary font-medium">Forging your puzzle...</p>
                      </div>
                    )}

                    {puzzle && !isGenerating && (
                      <div className="w-full bg-white p-4 sm:p-10 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline text-center sm:text-left break-all">
                            {title}
                          </h2>
                          <div className="flex gap-2 shrink-0">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowSolution(!showSolution)}
                              className="flex items-center gap-2"
                            >
                              {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              {showSolution ? 'Hide Solution' : 'Show Solution'}
                            </Button>
                          </div>
                        </div>

                        <div className="overflow-x-auto pb-4 flex justify-center">
                          <PuzzleGrid 
                            grid={puzzle.grid} 
                            showSolution={showSolution} 
                            wordPositions={puzzle.wordPositions} 
                          />
                        </div>

                        <WordList words={puzzle.wordPositions.map(p => p.word)} />

                        <div className="mt-12 pt-8 border-t">
                          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest font-medium">Download Puzzle</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            <Button 
                              onClick={() => handleExportPNG('puzzle')}
                              className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 h-11"
                            >
                              <Download className="w-4 h-4" />
                              PNG — Puzzle
                            </Button>
                            <Button 
                              onClick={() => handleExportPDF('puzzle')}
                              className="bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 h-11"
                            >
                              <FileText className="w-4 h-4" />
                              PDF — Puzzle
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest font-medium">Download Solution</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button 
                              variant="outline"
                              onClick={() => handleExportPNG('solution')}
                              className="flex items-center justify-center gap-2 h-11"
                            >
                              <Download className="w-4 h-4" />
                              PNG — Solution
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleExportPDF('solution')}
                              className="flex items-center justify-center gap-2 h-11"
                            >
                              <FileText className="w-4 h-4" />
                              PDF — Solution
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <AdBanner position="bottom" />
              </div>

              <aside>
                <AdBanner position="sidebar" />
              </aside>
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION ── */}
        <section className="py-20 px-4 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Create Puzzles</h2>
              <p className="text-lg text-slate-600">Powerful features, simple interface.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Settings2 className="w-6 h-6 text-primary" />, title: 'Custom Grid Size', desc: 'Choose any dimension from 8×8 up to 40×40 for the perfect fit.' },
                { icon: <Compass className="w-6 h-6 text-emerald-600" />, title: '8 Word Directions', desc: 'Place words horizontally, vertically, diagonally, and in reverse.' },
                { icon: <Zap className="w-6 h-6 text-amber-600" />, title: 'Difficulty Levels', desc: 'Control difficulty from easy to hard with direction toggles.' },
                { icon: <ArrowDownToLine className="w-6 h-6 text-purple-600" />, title: 'Download PDF or PNG', desc: 'Export high-resolution, print-ready files instantly.' },
                { icon: <UserX className="w-6 h-6 text-rose-600" />, title: 'No Signup Required', desc: 'Start generating puzzles immediately, no account needed.' },
                { icon: <Wand2 className="w-6 h-6 text-sky-600" />, title: 'Fast & Easy', desc: 'Create a puzzle in under 60 seconds, no design skills needed.' },
              ].map((f, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border flex items-center justify-center">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600">Create your puzzle in 3 simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                { step: '1', title: 'Enter Your Words', desc: 'Type or paste the words you want hidden in your puzzle.' },
                { step: '2', title: 'Customize Settings', desc: 'Pick your grid size, directions, and difficulty level.' },
                { step: '3', title: 'Generate & Download', desc: 'Click generate, preview your puzzle, then download as PDF or PNG.' },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-primary/25 mb-5">{s.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" onClick={scrollToGenerator} className="h-12 px-8 font-bold">
                Start Creating Now
              </Button>
            </div>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section className="py-20 px-4 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Who Is This For?</h2>
              <p className="text-lg text-slate-600">Puzzlfo is used by thousands of creators worldwide.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <GraduationCap className="w-7 h-7 text-primary" />, title: 'Teachers', desc: 'Create engaging word search activities for any subject. Keep students entertained while reinforcing vocabulary, spelling, or key terms. Print directly for your classroom.' },
                { icon: <BookOpen className="w-7 h-7 text-emerald-600" />, title: 'KDP / Low-Content Publishers', desc: 'Generate unlimited puzzle pages for your activity books and workbooks. Sell on Amazon KDP or other platforms with professional-quality puzzle downloads.' },
                { icon: <Baby className="w-7 h-7 text-amber-600" />, title: 'Parents', desc: 'Make learning fun at home with custom word searches for kids. Choose simple words, small grids, and easy mode to keep it age-appropriate and educational.' },
                { icon: <Puzzle className="w-7 h-7 text-purple-600" />, title: 'Puzzle Lovers', desc: 'Create personalized puzzles for yourself, friends, or events. Pick any theme, difficulty, and grid size to challenge yourself or share as a unique gift.' },
              ].map((u, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-sm border flex items-center justify-center">{u.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{u.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO CONTENT SECTION ── */}
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto max-w-3xl prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">About Our Word Search Generator</h2>
            <div className="text-slate-600 space-y-5 leading-relaxed text-[15px]">
              <p>
                Looking for a fast, reliable <strong>word search generator</strong> that actually delivers professional results? Puzzlfo lets you create custom word search puzzles in seconds — completely free, with no account required.
              </p>
              <p>
                Whether you need a <strong>printable word search</strong> for a classroom activity, a puzzle book, or just a fun weekend project, our tool has everything you need. Simply enter your list of words, configure your grid size and direction settings, and hit generate. Your puzzle is ready in under a minute.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">Why Use a Word Search Maker Online?</h3>
              <p>
                Traditional puzzle-making software can be expensive, complicated, and limited to desktop platforms. A <strong>puzzle maker online</strong> like Puzzlfo removes all that friction. It works directly in your browser on any device — desktop, tablet, or mobile — and requires zero installation or subscription.
              </p>
              <p>
                Our algorithm supports all 8 word placement directions, meaning words can run left-to-right, right-to-left, top-to-bottom, bottom-to-top, and all four diagonal orientations. This gives you far more variety and challenge than basic horizontal-only generators.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">How to Create a Word Search Puzzle</h3>
              <p>
                To <strong>create a word search puzzle</strong> with Puzzlfo, follow these steps:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Enter the words you want hidden in the puzzle (one per line or comma-separated).</li>
                <li>Choose your grid width and height — anywhere from 8×8 to 40×40.</li>
                <li>Select which directions words should be placed (easy = fewer directions; hard = all 8).</li>
                <li>Click &quot;Generate Puzzle&quot; and see your puzzle appear instantly.</li>
                <li>Download as a high-resolution PNG image or a print-ready PDF file.</li>
              </ol>
              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">Printable Word Search for Any Occasion</h3>
              <p>
                Our <strong>printable word search</strong> exports are designed to look great on paper. The PDF output is formatted for A4 or US Letter paper sizes and includes both the puzzle and the word list in a clean, professional layout. PNG exporting gives you a high-DPI image suitable for digital use or embedding in documents.
              </p>
              <p>
                Teachers use our tool to create themed vocabulary puzzles for their classes. Low-content book publishers rely on it to generate bulk puzzle pages for KDP activity books. Parents love it for quick, custom entertainment for their kids. And puzzle enthusiasts use it to create unique challenges to share with friends and family.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">No Limits, No Fees</h3>
              <p>
                Unlike many other puzzle generators, Puzzlfo does not charge per download, limit the number of puzzles you can create, or force you to create an account. Everything is provided free of charge in your browser.
              </p>
              <p>
                You can generate as many word search puzzles as you need, for any purpose — personal or commercial. Explore our other tools on the <Link href="/puzzles" className="text-primary font-semibold hover:underline">All Puzzles page</Link>, or go back to the <Link href="/" className="text-primary font-semibold hover:underline">Puzzlfo homepage</Link> to learn more.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 px-4 bg-primary text-white text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Puzzle?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">Join thousands of creators. No account needed — start in seconds.</p>
            <Button
              size="lg"
              variant="secondary"
              onClick={scrollToGenerator}
              className="h-14 px-10 text-lg font-bold"
            >
              Create Your Puzzle Now
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
