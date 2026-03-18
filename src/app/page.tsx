'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ControlsPanel } from '@/components/puzzle/ControlsPanel';
import { PuzzleGrid } from '@/components/puzzle/PuzzleGrid';
import { WordList } from '@/components/puzzle/WordList';
import { AdBanner } from '@/components/layout/AdBanner';
import { generateWordSearchPuzzleAlgorithm, PuzzleData } from '@/utils/puzzleGenerator';
import { exportToPNG } from '@/utils/exportImage';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Download, Eye, EyeOff, LayoutGrid, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [title, setTitle] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = useCallback((newTitle: string, words: string[], size: number) => {
    setError(null);
    
    if (words.length === 0) {
      setError("Please enter at least one word.");
      return;
    }

    const uniqueWords = Array.from(new Set(words));
    if (uniqueWords.length !== words.length) {
      toast({
        title: "Duplicates Removed",
        description: "We removed duplicate words from your list.",
      });
    }

    const tooLongWords = uniqueWords.filter(w => w.length > size);
    if (tooLongWords.length > 0) {
      setError(`The following words are too long for a ${size}x${size} grid: ${tooLongWords.join(', ')}`);
      return;
    }

    setIsGenerating(true);
    // Simulate generation delay for UI feel
    setTimeout(() => {
      try {
        const data = generateWordSearchPuzzleAlgorithm(uniqueWords, size);
        setPuzzle(data);
        setTitle(newTitle || 'Word Search');
        setShowSolution(false);
      } catch (err: any) {
        setError(err.message || "Failed to generate puzzle. Try reducing the number of words.");
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  }, [toast]);

  const handleExport = (type: 'puzzle' | 'solution') => {
    if (!puzzle) return;
    
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${type}`;
    exportToPNG({
      title,
      grid: puzzle.grid,
      words: puzzle.wordPositions.map(p => p.word),
      wordPositions: puzzle.wordPositions,
      showSolution: type === 'solution',
      size: puzzle.size
    }, filename);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <AdBanner position="top" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
              <ControlsPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
              
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                {error && (
                  <Alert variant="destructive" className="mb-6 max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!puzzle && !isGenerating && !error && (
                  <div className="text-center space-y-4 max-w-md">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                      <LayoutGrid className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Forge?</h2>
                      <p className="text-muted-foreground">
                        Enter your words on the left and click Generate to create your custom Word Search puzzle.
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-primary font-medium">Forging your puzzle...</p>
                  </div>
                )}

                {puzzle && !isGenerating && (
                  <div className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-blue-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                      <h2 className="text-3xl font-bold text-primary font-headline text-center sm:text-left">
                        {title}
                      </h2>
                      <div className="flex gap-2">
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

                    <PuzzleGrid 
                      grid={puzzle.grid} 
                      showSolution={showSolution} 
                      wordPositions={puzzle.wordPositions} 
                    />

                    <WordList words={puzzle.wordPositions.map(p => p.word)} />

                    <div className="mt-12 pt-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        onClick={() => handleExport('puzzle')}
                        className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 h-12"
                      >
                        <Download className="w-5 h-5" />
                        Download Puzzle PNG
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => handleExport('solution')}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center gap-2 h-12"
                      >
                        <Printer className="w-5 h-5" />
                        Download Solution PNG
                      </Button>
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
      </main>

      <Footer />
    </div>
  );
}