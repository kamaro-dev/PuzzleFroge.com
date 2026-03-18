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

  // Create a map of row-col to identify highlighted cells
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

  // Calculate dynamic cell size for large grids to maintain visibility
  // If size is very large, we scale down the minimum size
  const getCellSizeClass = () => {
    if (size > 30) return "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[8px] sm:text-xs";
    if (size > 20) return "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-xs sm:text-base";
    return "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sm sm:text-lg md:text-xl";
  };

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
                "puzzle-grid-cell bg-white",
                getCellSizeClass(),
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
