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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2600926207060467" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased selection:bg-secondary selection:text-secondary-foreground">
        {children}
      </body>
    </html>
  );
}