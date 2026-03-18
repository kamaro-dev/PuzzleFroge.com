'use server';
/**
 * @fileOverview A Genkit flow for generating a word search puzzle grid based on user input.
 *
 * - generateWordSearchPuzzle - A function that handles the word search puzzle generation process.
 * - GenerateWordSearchPuzzleInput - The input type for the generateWordSearchPuzzle function.
 * - GenerateWordSearchPuzzleOutput - The return type for the generateWordSearchPuzzle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateWordSearchPuzzleAlgorithm } from '@/utils/puzzleGenerator';

// Define the schema for a single word's position within the grid.
const WordPositionSchema = z.object({
  word: z.string().describe('The word placed in the grid.'),
  startRow: z.number().describe('The starting row of the word (0-indexed).'),
  startCol: z.number().describe('The starting column of the word (0-indexed).'),
  endRow: z.number().describe('The ending row of the word (0-indexed).'),
  endCol: z.number().describe('The ending column of the word (0-indexed).'),
  direction: z.string().describe('The direction of the word placement (e.g., "horizontal-forward", "vertical-backward", "diagonal-up-right").'),
});
export type WordPosition = z.infer<typeof WordPositionSchema>;

/**
 * Defines the input schema for generating a word search puzzle.
 */
const GenerateWordSearchPuzzleInputSchema = z.object({
  title: z.string().optional().describe('An optional title for the word search puzzle.'),
  words: z.array(z.string().min(1)).min(1).describe('A list of words to be included in the puzzle. Each word must be at least one character long.'),
  gridSize: z.number().min(8).max(40).describe('The desired size of the square puzzle grid. Must be between 8 and 40.'),
});
export type GenerateWordSearchPuzzleInput = z.infer<typeof GenerateWordSearchPuzzleInputSchema>;

/**
 * Defines the output schema for a generated word search puzzle.
 */
const GenerateWordSearchPuzzleOutputSchema = z.object({
  grid: z.array(z.array(z.string().length(1))).describe('The generated word search grid as a 2D array of single uppercase characters.'),
  wordPositions: z.array(WordPositionSchema).describe('An array of objects detailing the position and direction of each placed word within the grid.'),
});
export type GenerateWordSearchPuzzleOutput = z.infer<typeof GenerateWordSearchPuzzleOutputSchema>;

/**
 * A wrapper function to call the Genkit flow for word search puzzle generation.
 * @param input The input containing puzzle words and grid size.
 * @returns A promise that resolves to the generated puzzle grid and word positions.
 */
export async function generateWordSearchPuzzle(input: GenerateWordSearchPuzzleInput): Promise<GenerateWordSearchPuzzleOutput> {
  return generateWordSearchPuzzleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wordSearchPuzzleGenerationPrompt',
  input: { schema: GenerateWordSearchPuzzleInputSchema },
  output: { schema: GenerateWordSearchPuzzleOutputSchema },
  prompt: `You are tasked with generating a word search puzzle. Based on the provided words and grid size, 
    you should conceptualize how the grid would be formed. However, the actual algorithmic placement
    and grid filling will be performed by a highly optimized local utility.
    
    Words to include: {{{words}}}
    Grid size: {{{gridSize}}}x{{{gridSize}}}
    
    Your response will describe the desired characteristics of the puzzle, but the structured output
    will be populated by the local algorithm's result.`,
});

/**
 * The Genkit flow for generating a word search puzzle.
 */
const generateWordSearchPuzzleFlow = ai.defineFlow(
  {
    name: 'generateWordSearchPuzzleFlow',
    inputSchema: GenerateWordSearchPuzzleInputSchema,
    outputSchema: GenerateWordSearchPuzzleOutputSchema,
  },
  async (input) => {
    await prompt(input);

    const { grid, wordPositions } = generateWordSearchPuzzleAlgorithm(
      input.words.map(w => w.toUpperCase()),
      input.gridSize
    );

    return {
      grid,
      wordPositions,
    };
  }
);
