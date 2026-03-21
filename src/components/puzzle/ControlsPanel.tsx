'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings2, Wand2, Gauge } from 'lucide-react';
import { DirectionOptions } from '@/utils/puzzleGenerator';
import { cn } from '@/lib/utils';

interface ControlsPanelProps {
  onGenerate: (title: string, words: string[], width: number, height: number, options: DirectionOptions) => void;
  isGenerating: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [gridWidth, setGridWidth] = useState<number>(15);
  const [gridHeight, setGridHeight] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const getDirectionsForDifficulty = (diff: string): DirectionOptions => {
    switch (diff) {
      case 'easy':
        // Horizontal and vertical only
        return { right: true, left: true, down: true, up: true, downRight: false, downLeft: false, upRight: false, upLeft: false };
      case 'medium':
        // Add some diagonals
        return { right: true, left: true, down: true, up: true, downRight: true, upRight: true, downLeft: false, upLeft: false };
      case 'hard':
        // All 8 directions
        return { right: true, left: true, down: true, up: true, downRight: true, downLeft: true, upRight: true, upLeft: true };
      default:
        return { right: true, left: true, down: true, up: true, downRight: false, downLeft: false, upRight: false, upLeft: false };
    }
  };

  const handleGenerate = () => {
    const words = wordsInput
      .split(/[\n,]/)
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length > 0);
    
    onGenerate(title, words, gridWidth, gridHeight, getDirectionsForDifficulty(difficulty));
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setGridWidth(value);
    } else if (e.target.value === '') {
      setGridWidth(0);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setGridHeight(value);
    } else if (e.target.value === '') {
      setGridHeight(0);
    }
  };

  return (
    <Card className="h-fit shadow-md border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary text-xl">
          <Settings2 className="w-5 h-5" />
          Puzzle Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground/80">Puzzle Title</Label>
          <Input 
            id="title" 
            placeholder="e.g. Nature Walk" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-slate-300 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="words" className="text-foreground/80">Words (one per line or comma separated)</Label>
          <Textarea 
            id="words" 
            placeholder="TREES, RIVER, MOUNTAIN, FOREST..." 
            className="min-h-[150px] border-slate-300 focus:ring-primary/20"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
          />
        </div>

        <div className="space-y-3 pt-2">
          <Label className="flex items-center gap-2 text-foreground/80">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            Difficulty Level
          </Label>
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={cn(
                  "py-2 px-3 text-sm font-semibold rounded-lg capitalize transition-all duration-200",
                  difficulty === level 
                    ? "bg-white text-primary shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground px-1">
            {difficulty === 'easy' && "Horizontal and vertical words only. Best for kids."}
            {difficulty === 'medium' && "Includes some diagonal words. Standard difficulty."}
            {difficulty === 'hard' && "Words can go in all 8 directions, including backwards. Expert level!"}
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-foreground/80">Grid Dimensions (8-40)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="grid-width" className="text-[10px] text-muted-foreground uppercase tracking-wider">Width (Cols)</Label>
              <Input 
                id="grid-width" 
                type="number" 
                min={8} 
                max={40} 
                value={gridWidth || ''}
                onChange={handleWidthChange}
                className="border-slate-300 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="grid-height" className="text-[10px] text-muted-foreground uppercase tracking-wider">Height (Rows)</Label>
              <Input 
                id="grid-height" 
                type="number" 
                min={8} 
                max={40} 
                value={gridHeight || ''}
                onChange={handleHeightChange}
                className="border-slate-300 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="bg-slate-100 px-3 py-2 rounded-md border border-slate-200 text-center font-mono text-muted-foreground">
            {gridWidth || '?'} × {gridHeight || '?'}
          </div>
        </div>

        <Button 
          className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all active:scale-[0.98]"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
              Generating...
            </span>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Puzzle
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
