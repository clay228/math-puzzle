# Math Puzzle Game

This is a Math Puzzle Game built with React, TypeScript, Vite, and Tailwind CSS. The game involves answering arithmetic operations to reveal an image behind. Answers can be dragged to the question fields or answered by clicking on a number underneath the field of operation.

## Installation

To run the project locally, follow these steps:

- Install: `yarn install | npm install`
- Start the project: `yarn dev | npm run dev`

## Features

| Feature                                                                                                  | Description                                                    |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Drag-and-drop functionality for answers                                                                  | Allows users to drag and drop answers to the question fields   |
| Multiple levels with increasing difficulty                                                               | Provides different levels of difficulty for players            |
| Arithmetic operations including addition, subtraction, multiplication, division, square, and square root | Offers a variety of arithmetic operations for players to solve |
| Game state management with React hooks                                                                   | Utilizes React hooks for managing the game state               |
| Tailwind CSS for styling                                                                                 | Uses Tailwind CSS for styling the game                         |

## Project Structure

```
math-puzzle-game/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnswerList.tsx
│   │   ├── History.tsx
│   │   ├── Level.tsx
│   │   ├── PuzzleGrid.tsx
│   │   └── App.tsx
│   ├── hooks/
│   │   └── useGridState.ts
│   ├── utils/
│   │   └── file.ts
│   ├── styles/
│   │   └── index.css
│   ├── index.tsx
│   └── main.tsx
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

**Level.tsx**
Manages the game state, including the current level, history, and popup messages. It generates new games and checks answers.

**PuzzleGrid.tsx**
Displays the grid of arithmetic operations. It supports drag-and-drop functionality for answers.

**AnswerList.tsx**
Displays a list of possible answers. It supports dragging answers to the PuzzleGrid.

**History.tsx**
Displays the history of answered operations.

**useGridState.ts**
A custom hook that manages the state of selected and answered operations.

**file.ts**
A utility function to save the game history to a file. It does not implementation yet, we will integrate in the future when having API.

## How It Works

**Initialization**: The `App.tsx` component initializes the game and renders the `Level` component.

**Level Management**: The `Level.tsx` component manages the current level, generates new games, and checks answers. It uses the `useGridState` hook to manage the state of selected and answered operations.

**Grid and Answers**: The `PuzzleGrid.tsx` component displays the arithmetic operations in a grid and supports drag-and-drop functionality.

The `AnswerList.tsx` component displays a list of possible answers and supports dragging answers to the grid.

**History**: The `History.tsx` component displays the history of answered operations.

**State Management**: The `useGridState.ts` custom hook manages the state of selected and answered operations.

**Drag-and-Drop**: The drag-and-drop functionality is implemented using the HTML5 Drag and Drop API. The `AnswerList.tsx` component makes the answers draggable, and the `PuzzleGrid.tsx` component handles the drop events and checks the answers. 
