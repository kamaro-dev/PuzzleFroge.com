import React from 'react';

interface WordListProps {
  words: string[];
}

export const WordList: React.FC<WordListProps> = ({ words }) => {
  if (words.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Words to Find</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {words.sort().map((word, idx) => (
          <div 
            key={idx} 
            className="text-muted-foreground font-medium uppercase tracking-wide hover:text-primary transition-colors cursor-default"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};