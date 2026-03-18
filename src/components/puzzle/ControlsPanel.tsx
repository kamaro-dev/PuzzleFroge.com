'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings2, Wand2 } from 'lucide-react';

interface ControlsPanelProps {
  onGenerate: (title: string, words: string[], size: number) => void;
  isGenerating: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [gridSize, setGridSize] = useState('12');

  const handleGenerate = () => {
    // Process words: split by newline or comma, trim, filter empty
    const words = wordsInput
      .split(/[\n,]/)
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length > 0);
    
    onGenerate(title, words, parseInt(gridSize));
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

        <div className="space-y-2">
          <Label htmlFor="grid-size">Grid Size</Label>
          <Select value={gridSize} onValueChange={setGridSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Small (10x10)</SelectItem>
              <SelectItem value="12">Standard (12x12)</SelectItem>
              <SelectItem value="15">Large (15x15)</SelectItem>
              <SelectItem value="20">Expert (20x20)</SelectItem>
            </SelectContent>
          </Select>
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