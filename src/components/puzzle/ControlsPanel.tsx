'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Settings2, 
  Wand2, 
  ArrowRightLeft, 
  ArrowRight, 
  ArrowDown, 
  ArrowUpRight, 
  ArrowLeft 
} from 'lucide-react';
import { DirectionOptions } from '@/utils/puzzleGenerator';

interface ControlsPanelProps {
  onGenerate: (title: string, words: string[], width: number, height: number, options: DirectionOptions) => void;
  isGenerating: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [gridWidth, setGridWidth] = useState<number>(15);
  const [gridHeight, setGridHeight] = useState<number>(15);
  
  // Direction Settings
  const [directions, setDirections] = useState<DirectionOptions>({
    horizontal: true,
    vertical: true,
    diagonal: true,
    backwards: true,
  });

  const handleGenerate = () => {
    const words = wordsInput
      .split(/[\n,]/)
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length > 0);
    
    onGenerate(title, words, gridWidth, gridHeight, directions);
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

  const toggleDirection = (key: keyof DirectionOptions) => {
    setDirections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

        <div className="space-y-4 pt-2">
          <Label className="flex items-center gap-2 text-foreground/80">
            <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            Word Directions
          </Label>
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="horizontal" 
                checked={directions.horizontal} 
                onCheckedChange={() => toggleDirection('horizontal')} 
              />
              <label htmlFor="horizontal" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-primary/60" />
                Horizontal
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vertical" 
                checked={directions.vertical} 
                onCheckedChange={() => toggleDirection('vertical')} 
              />
              <label htmlFor="vertical" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1.5">
                <ArrowDown className="w-3.5 h-3.5 text-primary/60" />
                Vertical
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="diagonal" 
                checked={directions.diagonal} 
                onCheckedChange={() => toggleDirection('diagonal')} 
              />
              <label htmlFor="diagonal" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-primary/60" />
                Diagonal
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backwards" 
                checked={directions.backwards} 
                onCheckedChange={() => toggleDirection('backwards')} 
              />
              <label htmlFor="backwards" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-primary/60" />
                Backwards
              </label>
            </div>
          </div>
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
