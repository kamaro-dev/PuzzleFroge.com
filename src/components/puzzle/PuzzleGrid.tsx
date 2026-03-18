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

  // Improved sizing logic for better readability
  const getCellSizeClass = () => {
    if (size <= 10) return "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-xl sm:text-2xl md:text-3xl";
    if (size <= 15) return "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-lg sm:text-xl md:text-2xl";
    if (size <= 20) return "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-base sm:text-lg md:text-xl";
    if (size <= 30) return "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-xs sm:text-sm md:text-base";
    return "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[10px] sm:text-xs md:text-sm";
  };

  return (
    <div 
      className="grid gap-[2px] bg-slate-300 p-[2px] rounded-lg shadow-inner mx-auto w-fit overflow-hidden"
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
                "puzzle-grid-cell bg-white font-mono leading-none",
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
