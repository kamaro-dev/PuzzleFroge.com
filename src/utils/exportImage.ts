import { WordPosition } from './puzzleGenerator';

type ExportOptions = {
  title: string;
  grid: string[][];
  words: string[];
  wordPositions: WordPosition[];
  showSolution: boolean;
  size: number;
};

export async function exportToPNG(options: ExportOptions, filename: string) {
  const { title, grid, words, wordPositions, showSolution, size } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Layout Constants for a "Printable Worksheet" look
  const cellSize = 35; 
  const pagePadding = 100; // Large margins for printing
  const titleAreaHeight = 150;
  const wordListHeaderHeight = 60;
  const wordsPerRow = 4;
  const wordRowHeight = 35;
  const wordListHeight = Math.ceil(words.length / wordsPerRow) * wordRowHeight + wordListHeaderHeight + 40;
  
  const gridWidth = size * cellSize;
  const gridHeight = size * cellSize;
  
  // Set Canvas Dimensions
  canvas.width = gridWidth + pagePadding * 2;
  canvas.height = titleAreaHeight + gridHeight + wordListHeight + pagePadding;

  // 1. Background (Pure White)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Title
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 48px "Inter", "Helvetica", "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((title || 'WORD SEARCH').toUpperCase(), canvas.width / 2, pagePadding + 50);

  const gridX = pagePadding;
  const gridY = pagePadding + titleAreaHeight;
  
  // 3. Draw Solution Highlights (Under the letters)
  if (showSolution) {
    ctx.strokeStyle = '#E2E8F0'; // Light grey highlight for clean printing
    ctx.lineWidth = cellSize * 0.75;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.8;
    
    wordPositions.forEach(pos => {
      const sx = gridX + pos.startCol * cellSize + cellSize / 2;
      const sy = gridY + pos.startRow * cellSize + cellSize / 2;
      const ex = gridX + pos.endCol * cellSize + cellSize / 2;
      const ey = gridY + pos.endRow * cellSize + cellSize / 2;
      
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    });
    ctx.globalAlpha = 1.0;
  }

  // 4. Draw Grid Outline & Grid Lines
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(gridX, gridY, gridWidth, gridHeight);

  // Subtle inner grid lines
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  for (let i = 1; i < size; i++) {
    const pos = i * cellSize;
    // vertical
    ctx.beginPath();
    ctx.moveTo(gridX + pos, gridY);
    ctx.lineTo(gridX + pos, gridY + gridHeight);
    ctx.stroke();
    // horizontal
    ctx.beginPath();
    ctx.moveTo(gridX, gridY + pos);
    ctx.lineTo(gridX + gridWidth, gridY + pos);
    ctx.stroke();
  }

  // 5. Draw Grid Letters
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${Math.floor(cellSize * 0.6)}px "Courier New", Courier, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = gridX + c * cellSize + cellSize / 2;
      const y = gridY + r * cellSize + cellSize / 2;
      ctx.fillText(grid[r][c], x, y);
    }
  }

  // 6. Draw Word List Section
  const listStartY = gridY + gridHeight + 60;
  
  // Header: WORDS TO FIND
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px "Inter", "Helvetica", "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('WORDS TO FIND', canvas.width / 2, listStartY);

  // Word Grid
  ctx.font = '18px "Inter", "Helvetica", "Arial", sans-serif';
  ctx.textAlign = 'left';
  const columnWidth = gridWidth / wordsPerRow;
  const wordContentY = listStartY + 45;

  const sortedWords = [...words].sort();
  sortedWords.forEach((word, i) => {
    const col = i % wordsPerRow;
    const row = Math.floor(i / wordsPerRow);
    const x = gridX + (col * columnWidth);
    const y = wordContentY + (row * wordRowHeight);
    
    // Draw bullet point
    ctx.fillStyle = '#64748B'; // Muted bullet color
    ctx.fillText('•', x, y);
    
    // Draw word
    ctx.fillStyle = '#000000';
    ctx.fillText(word.toUpperCase(), x + 15, y);
  });

  // Final Export
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}
