'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { WordPosition } from '@/utils/puzzleGenerator';

interface PuzzleGridProps {
  grid: string[][];
  showSolution: boolean;
  wordPositions: WordPosition[];
}

export const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid, showSolution, wordPositions }) => {
  const size = grid.length;

  // Create a map of row-col to identify highlighted cells for simple UI feedback
  const highlightedCells = new Set<string>();
  if (showSolution) {
    wordPositions.forEach((pos) => {
      const dr = pos.endRow === pos.startRow ? 0 : pos.endRow > pos.startRow ? 1 : -1;
      const dc = pos.endCol === pos.startCol ? 0 : pos.endCol > pos.startCol ? 1 : -1;
      const length = Math.max(Math.abs(pos.endRow - pos.startRow), Math.abs(pos.endCol - pos.startCol)) + 1;

      for (let i = 0; i < length; i++) {
        const r = pos.startRow + i * dr;
        const c = pos.startCol + i * dc;
        highlightedCells.add(`${r}-${c}`);
      }
    });
  }

  return (
    <div 
      className="grid gap-px bg-border border border-border rounded-lg overflow-hidden shadow-sm mx-auto w-fit"
      style={{ 
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        maxWidth: '100%' 
      }}
    >
      {grid.map((row, rIdx) => 
        row.map((cell, cIdx) => {
          const isHighlighted = highlightedCells.has(`${rIdx}-${cIdx}`);
          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className={cn(
                "puzzle-grid-cell bg-white text-sm sm:text-lg md:text-xl",
                "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
                isHighlighted && "highlighted-cell"
              )}
            >
              {cell}
            </div>
          );
        })
      )}
    </div>
  );
};