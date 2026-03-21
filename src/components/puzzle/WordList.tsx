import React from 'react';

interface WordListProps {
  words: string[];
}

export const WordList: React.FC<WordListProps> = ({ words }) => {
  if (words.length === 0) return null;
  const sorted = [...words].sort();

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center mb-6">Words to Find</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
        {sorted.map((word, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-slate-300 shrink-0" />
            <span className="text-slate-700 font-semibold uppercase tracking-wide text-sm">{word}</span>
          </div>
        ))}
      </div>
    </div>
  );
};