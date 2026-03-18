import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PuzzleForge - Free Word Search Generator',
  description: 'Generate and export printable word search puzzles for free.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-secondary selection:text-secondary-foreground">
        {children}
      </body>
    </html>
  );
}