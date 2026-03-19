export type WordPosition = {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  direction: string;
};

export type PuzzleData = {
  grid: string[][];
  wordPositions: WordPosition[];
  width: number;
  height: number;
};

export type DirectionOptions = {
  right: boolean;      // →
  left: boolean;       // ←
  down: boolean;       // ↓
  up: boolean;         // ↑
  downRight: boolean;  // ↘
  downLeft: boolean;   // ↙
  upRight: boolean;    // ↗
  upLeft: boolean;     // ↖
};

const DIRECTIONS_MAP = [
  { name: 'right', dr: 0, dc: 1, key: 'right' as keyof DirectionOptions },
  { name: 'left', dr: 0, dc: -1, key: 'left' as keyof DirectionOptions },
  { name: 'down', dr: 1, dc: 0, key: 'down' as keyof DirectionOptions },
  { name: 'up', dr: -1, dc: 0, key: 'up' as keyof DirectionOptions },
  { name: 'downRight', dr: 1, dc: 1, key: 'downRight' as keyof DirectionOptions },
  { name: 'downLeft', dr: 1, dc: -1, key: 'downLeft' as keyof DirectionOptions },
  { name: 'upRight', dr: -1, dc: 1, key: 'upRight' as keyof DirectionOptions },
  { name: 'upLeft', dr: -1, dc: -1, key: 'upLeft' as keyof DirectionOptions },
];

const DEFAULT_DIRECTIONS: DirectionOptions = {
  right: true,
  left: true,
  down: true,
  up: true,
  downRight: true,
  downLeft: true,
  upRight: true,
  upLeft: true,
};

export function generateWordSearchPuzzleAlgorithm(
  words: string[], 
  width: number,
  height: number,
  options: DirectionOptions = DEFAULT_DIRECTIONS
): PuzzleData {
  const grid: string[][] = Array.from({ length: height }, () => Array(width).fill(''));
  const wordPositions: WordPosition[] = [];
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  // Filter allowed directions based on explicit options
  const allowedDirections = DIRECTIONS_MAP.filter(dir => options[dir.key]);

  if (allowedDirections.length === 0) {
    throw new Error("Please select at least one direction.");
  }

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 2000; // Increased attempts for complex directional constraints

    while (!placed && attempts < maxAttempts) {
      attempts++;
      const dir = allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
      const startRow = Math.floor(Math.random() * height);
      const startCol = Math.floor(Math.random() * width);

      const endRow = startRow + dir.dr * (word.length - 1);
      const endCol = startCol + dir.dc * (word.length - 1);

      if (endRow >= 0 && endRow < height && endCol >= 0 && endCol < width) {
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = startRow + dir.dr * i;
          const c = startCol + dir.dc * i;
          if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = startRow + dir.dr * i;
            const c = startCol + dir.dc * i;
            grid[r][c] = word[i];
          }
          wordPositions.push({
            word,
            startRow,
            startCol,
            endRow,
            endCol,
            direction: dir.name,
          });
          placed = true;
        }
      }
    }
    
    if (!placed) {
      throw new Error(`Could not place word: ${word}. Try a larger grid or enabling more directions.`);
    }
  }

  // Fill remaining cells
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { grid, wordPositions, width, height };
}
