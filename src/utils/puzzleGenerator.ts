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
  horizontal: boolean;
  vertical: boolean;
  diagonal: boolean;
  backwards: boolean;
};

const DIRECTIONS = [
  { name: 'horizontal-forward', dr: 0, dc: 1, type: 'horizontal', isBackward: false },
  { name: 'horizontal-backward', dr: 0, dc: -1, type: 'horizontal', isBackward: true },
  { name: 'vertical-forward', dr: 1, dc: 0, type: 'vertical', isBackward: false },
  { name: 'vertical-backward', dr: -1, dc: 0, type: 'vertical', isBackward: true },
  { name: 'diagonal-down-right-forward', dr: 1, dc: 1, type: 'diagonal', isBackward: false },
  { name: 'diagonal-down-right-backward', dr: -1, dc: -1, type: 'diagonal', isBackward: true },
  { name: 'diagonal-up-right-forward', dr: -1, dc: 1, type: 'diagonal', isBackward: false },
  { name: 'diagonal-up-right-backward', dr: 1, dc: -1, type: 'diagonal', isBackward: true },
];

export function generateWordSearchPuzzleAlgorithm(
  words: string[], 
  width: number,
  height: number,
  options: DirectionOptions = { horizontal: true, vertical: true, diagonal: true, backwards: true }
): PuzzleData {
  const grid: string[][] = Array.from({ length: height }, () => Array(width).fill(''));
  const wordPositions: WordPosition[] = [];
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  // Filter allowed directions based on options
  const allowedDirections = DIRECTIONS.filter(dir => {
    const typeMatch = (dir.type === 'horizontal' && options.horizontal) ||
                      (dir.type === 'vertical' && options.vertical) ||
                      (dir.type === 'diagonal' && options.diagonal);
    
    if (!typeMatch) return false;
    if (dir.isBackward && !options.backwards) return false;
    
    return true;
  });

  if (allowedDirections.length === 0) {
    throw new Error("Please select at least one direction.");
  }

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 1000;

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
