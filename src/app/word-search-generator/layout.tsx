import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Search Generator – Puzzlfo',
};

export default function WordSearchGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
