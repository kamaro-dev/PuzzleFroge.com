import { WordPosition } from './puzzleGenerator';
import { jsPDF } from 'jspdf';

type ExportOptions = {
  title: string;
  grid: string[][];
  words: string[];
  wordPositions: WordPosition[];
  showSolution: boolean;
  width: number;
  height: number;
};

// High resolution scale factor for print-quality (300 DPI)
const SCALE = 3;

async function createPuzzleCanvas(options: ExportOptions): Promise<HTMLCanvasElement> {
  const { title, grid, words, wordPositions, showSolution, width, height } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Could not get 2D context");

  // Layout Constants (Scaled up for high-res)
  const cellSize = 50 * SCALE; 
  const pagePadding = 120 * SCALE;
  const titleAreaHeight = 160 * SCALE;
  const wordListHeaderHeight = 80 * SCALE;
  const wordsPerRow = 4;
  const wordRowHeight = 50 * SCALE;
  const wordListHeight = Math.ceil(words.length / wordsPerRow) * wordRowHeight + wordListHeaderHeight + (60 * SCALE);
  
  const gridWidth = width * cellSize;
  const gridHeight = height * cellSize;
  
  // Set Canvas Dimensions
  canvas.width = gridWidth + (pagePadding * 2);
  canvas.height = titleAreaHeight + gridHeight + wordListHeight + pagePadding;

  // 1. Background (Pure White)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Title
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${56 * SCALE}px "Inter", "Helvetica", "Arial", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((title || 'WORD SEARCH').toUpperCase(), canvas.width / 2, pagePadding + (40 * SCALE));

  const gridX = pagePadding;
  const gridY = pagePadding + titleAreaHeight;
  
  // 3. Draw Solution Highlights
  if (showSolution) {
    ctx.strokeStyle = '#E2E8F0'; // Light grey highlight
    ctx.lineWidth = cellSize * 0.8;
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

  // 4. Draw Grid Outline & Lines
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3 * SCALE;
  ctx.strokeRect(gridX, gridY, gridWidth, gridHeight);

  // Inner lines
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1 * SCALE;
  for (let i = 1; i < width; i++) {
    const pos = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(gridX + pos, gridY);
    ctx.lineTo(gridX + pos, gridY + gridHeight);
    ctx.stroke();
  }
  for (let i = 1; i < height; i++) {
    const pos = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(gridX, gridY + pos);
    ctx.lineTo(gridX + gridWidth, gridY + pos);
    ctx.stroke();
  }

  // 5. Draw Grid Letters
  ctx.fillStyle = '#1e293b'; // slightly softer black for letters
  // Extra bold and large letters for readability
  ctx.font = `bold ${Math.floor(cellSize * 0.55)}px "Courier New", Courier, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const x = gridX + c * cellSize + cellSize / 2;
      const y = gridY + r * cellSize + cellSize / 2;
      ctx.fillText(grid[r][c], x, y);
    }
  }

  // 6. Draw Word List Section
  const listStartY = gridY + gridHeight + (80 * SCALE);
  
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${28 * SCALE}px "Inter", "Helvetica", "Arial", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('WORDS TO FIND', canvas.width / 2, listStartY);

  // Word Grid
  ctx.fillStyle = '#334155';
  ctx.font = `bold ${20 * SCALE}px "Inter", "Helvetica", "Arial", sans-serif`;
  ctx.textAlign = 'left';
  const columnWidth = gridWidth / wordsPerRow;
  const wordContentY = listStartY + (60 * SCALE);

  const sortedWords = [...words].sort();
  sortedWords.forEach((word, i) => {
    const col = i % wordsPerRow;
    const row = Math.floor(i / wordsPerRow);
    const x = gridX + (col * columnWidth) + (20 * SCALE);
    const y = wordContentY + (row * wordRowHeight);
    
    // Checkbox style square for words
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(x - (30 * SCALE), y - (12 * SCALE), 18 * SCALE, 18 * SCALE);
    
    ctx.fillText(word.toUpperCase(), x, y);
  });

  return canvas;
}

export async function exportToPNG(options: ExportOptions, filename: string) {
  const canvas = await createPuzzleCanvas(options);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function exportToPDF(options: ExportOptions, filename: string) {
  const canvas = await createPuzzleCanvas(options);
  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // Create PDF: Note that jsPDF uses points or mm. We map to US Letter (8.5 x 11 inches)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasRatio = canvas.width / canvas.height;
  const pdfRatio = pdfWidth / pdfHeight;

  let finalWidth = pdfWidth;
  let finalHeight = finalWidth / canvasRatio;

  // Margin calculation to center on page
  const marginX = (pdfWidth - finalWidth) / 2;
  let marginY = (pdfHeight - finalHeight) / 2;
  
  // If the puzzle is taller than the page, scale it down to fit height instead
  if (finalHeight > pdfHeight - 1) { // 1 inch margin total
    finalHeight = pdfHeight - 1;
    finalWidth = finalHeight * canvasRatio;
    marginY = 0.5;
  }

  pdf.addImage(imgData, 'PNG', marginX, marginY, finalWidth, finalHeight);
  pdf.save(`${filename}.pdf`);
}
