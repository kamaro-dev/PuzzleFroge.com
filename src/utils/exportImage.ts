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

  const cellSize = 40;
  const padding = 60;
  const titleHeight = 80;
  const footerHeight = Math.ceil(words.length / 3) * 30 + 40;
  
  const gridWidth = size * cellSize;
  const gridHeight = size * cellSize;
  
  canvas.width = gridWidth + padding * 2;
  canvas.height = gridHeight + titleHeight + footerHeight + padding;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#347DB2';
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title || 'Word Search', canvas.width / 2, padding + 20);

  // Grid background
  const gridX = padding;
  const gridY = padding + titleHeight;
  
  // Highlighting solution
  if (showSolution) {
    ctx.strokeStyle = '#56CEE4';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.4;
    
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

  // Draw Grid Letters
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 20px Inter, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = gridX + c * cellSize + cellSize / 2;
      const y = gridY + r * cellSize + cellSize / 2;
      ctx.fillText(grid[r][c], x, y);
    }
  }

  // Draw Grid Lines (optional for cleaner look)
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= size; i++) {
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

  // Word List
  ctx.fillStyle = '#334155';
  ctx.font = '16px Inter, sans-serif';
  ctx.textAlign = 'left';
  const listY = gridY + gridHeight + 40;
  const colWidth = gridWidth / 3;

  words.forEach((word, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    ctx.fillText(word.toUpperCase(), gridX + col * colWidth, listY + row * 25);
  });

  // Export
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}