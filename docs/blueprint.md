# **App Name**: PuzzleForge

## Core Features:

- Puzzle Creation Form: Allows users to input the puzzle title, a list of words, and select the grid size (10x10, 12x12, 15x15, 20x20) through a clear UI, initiating the puzzle generation process.
- Word Search Generation Tool: An intelligent algorithm that generates a square word search grid. This tool places words randomly, supporting horizontal, vertical, diagonal, and reversed directions, handles letter overlap when characters match, retries placement on conflicts, and fills remaining cells with random letters.
- Interactive Puzzle Display: Presents the generated word search grid with square, readable cells in a centered, responsive layout, along with the user's word list displayed below in columns.
- Solution Visibility Toggle: Provides a 'Show Solution' button that toggles the visibility of the puzzle solution, highlighting the placed words on the grid when active and hiding them otherwise.
- High-Resolution Image Export: Enables users to download the generated puzzle and its corresponding solution as separate high-resolution PNG images, suitable for printing (e.g., via html2canvas).
- Dynamic Error Messaging: Implements real-time error handling and displays user-friendly messages for invalid inputs such as words too long for the grid, duplicate words, or empty word lists.
- Monetization Ad Placements: Integrates designated placeholder areas for advertisement banners, including a top banner above the puzzle, a sidebar ad on desktop, and a bottom banner below the puzzle, for future monetization.

## Style Guidelines:

- Primary color: A sophisticated and calm blue (#347DB2) that reflects clarity and professionalism for interactive elements and key text.
- Background color: A very light, almost white, desaturated blue (#E9F0F4) for the main canvas, ensuring a clean and modern aesthetic that's easy on the eyes.
- Accent color: A vibrant, clear cyan (#56CEE4) to highlight call-to-action buttons, active states, and significant alerts, providing excellent contrast and a fresh feel.
- All text uses 'Inter', a grotesque-style sans-serif font chosen for its modern, clean, and highly readable characteristics across various sizes, ensuring clarity for both puzzle grids and interface elements.
- Employ a set of minimalistic, line-art style icons that complement the clean SaaS design, maintaining a unified visual language without clutter.
- The layout features a centralized puzzle area for focus, complemented by responsive design to ensure optimal viewing and interaction across both mobile and desktop devices. Dedicated areas are reserved for top, sidebar, and bottom advertisements.
- Subtle and purposeful animations for UI feedback, such as slight fades during solution toggling or spin indicators during puzzle generation, enhancing user experience without distraction.