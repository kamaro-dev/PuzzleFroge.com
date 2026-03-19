'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings2, Wand2, ArrowRightLeft } from 'lucide-react';
import { DirectionOptions } from '@/utils/puzzleGenerator';

interface ControlsPanelProps {
  onGenerate: (title: string, words: string[], size: number, options: DirectionOptions) => void;
  isGenerating: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [gridSize, setGridSize] = useState<number>(15);
  
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
    
    onGenerate(title, words, gridSize, directions);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setGridSize(value);
    } else if (e.target.value === '') {
      setGridSize(0);
    }
  };

  const toggleDirection = (key: keyof DirectionOptions) => {
    setDirections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Settings2 className="w-5 h-5" />
          Puzzle Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Puzzle Title</Label>
          <Input 
            id="title" 
            placeholder="e.g. Nature Walk" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="words">Words (one per line or comma separated)</Label>
          <Textarea 
            id="words" 
            placeholder="TREES, RIVER, MOUNTAIN, FOREST..." 
            className="min-h-[150px]"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
          />
        </div>

        <div className="space-y-4 pt-2">
          <Label className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            Word Directions
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="horizontal" 
                checked={directions.horizontal} 
                onCheckedChange={() => toggleDirection('horizontal')} 
              />
              <label htmlFor="horizontal" className="text-sm font-medium leading-none cursor-pointer">
                Horizontal
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vertical" 
                checked={directions.vertical} 
                onCheckedChange={() => toggleDirection('vertical')} 
              />
              <label htmlFor="vertical" className="text-sm font-medium leading-none cursor-pointer">
                Vertical
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="diagonal" 
                checked={directions.diagonal} 
                onCheckedChange={() => toggleDirection('diagonal')} 
              />
              <label htmlFor="diagonal" className="text-sm font-medium leading-none cursor-pointer">
                Diagonal
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backwards" 
                checked={directions.backwards} 
                onCheckedChange={() => toggleDirection('backwards')} 
              />
              <label htmlFor="backwards" className="text-sm font-medium leading-none cursor-pointer">
                Backwards
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grid-size">Grid Size (8-40)</Label>
          <div className="flex items-center gap-3">
            <Input 
              id="grid-size" 
              type="number" 
              min={8} 
              max={40} 
              value={gridSize || ''}
              onChange={handleSizeChange}
              className="w-full"
            />
            <span className="text-muted-foreground whitespace-nowrap">x {gridSize || '?'}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Standard size is 15. Min: 8, Max: 40.</p>
        </div>

        <Button 
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : (
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
