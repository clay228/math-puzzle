import React, { useState, useEffect } from 'react';
import PuzzleGrid from './PuzzleGrid';
import AnswerList from './AnswerList';
import History from './History';
import { saveHistoryToFile } from '../utils/file';
import useGridState from '../hooks/useGridState';

const generateRandomNumber = (max: number) =>
  Math.floor(Math.random() * max) + 1;

const generateOperations = (level: number) => {
  const operations = [];
  const solutions = [];
  const size = level <= 3 ? 16 : level <= 7 ? 36 : 64;
  const ops =
    level <= 3
      ? ['+', '-']
      : level <= 7
      ? ['+', '-', '*', '%']
      : ['+', '-', '*', '%', 'square', 'sqrt'];

  for (let i = 0; i < size; i++) {
    const opIndex = Math.floor(Math.random() * ops.length);
    let a, b, operation, solution;
    switch (ops[opIndex]) {
      case '+':
        a = generateRandomNumber(20);
        b = generateRandomNumber(20);
        operation = `${a} + ${b}`;
        solution = a + b;
        break;
      case '-':
        a = generateRandomNumber(20);
        b = generateRandomNumber(20);
        operation = `${a} - ${b}`;
        solution = a - b;
        break;
      case '*':
        a = generateRandomNumber(20);
        b = generateRandomNumber(20);
        operation = `${a} * ${b}`;
        solution = a * b;
        break;
      case '%':
        a = generateRandomNumber(20);
        b = generateRandomNumber(1);
        operation = `${a} % ${b}`;
        solution = a % b;
        break;
      case 'square':
        a = generateRandomNumber(20);
        operation = `${a}^2`;
        solution = a * a;
        break;
      case 'sqrt':
        a = generateRandomNumber(400);
        operation = `√${a}`;
        solution = parseFloat(Math.sqrt(a).toFixed(2));
        break;
      default:
        break;
    }
    operations.push(operation);
    solutions.push(solution);
  }
  return { operations, solutions };
};

const Level: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const size = currentLevel <= 3 ? 16 : currentLevel <= 7 ? 36 : 64;
  const {
    selectedOperation,
    answeredOperations,
    selectOperation,
    markAnswered,
    resetGridState,
  } = useGridState(size);

  const [operations, setOperations] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<number[]>([]);

  const generateNewGame = (level: number) => {
    const { operations, solutions } = generateOperations(level + 1);
    setOperations(operations as string[]);
    setSolutions(solutions as number[]);
    resetGridState(size);
  };

  useEffect(() => {
    generateNewGame(currentLevel);
  }, [currentLevel]);

  const advanceLevel = () => {
    if (currentLevel < 9) {
      setCurrentLevel(currentLevel + 1);
      setHistory([]);
      setShowPopup(null);
    } else {
      setShowPopup('Congratulations! You completed all levels.');
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setHistory([]);
    setShowPopup(null);
    generateNewGame(0);
  };

  const checkAnswer = (index: number, answer: number) => {
    const operation = operations[index];
    const isCorrect = answer === solutions[index];
    const newHistory = [
      ...history,
      `${operation} = ${answer} (${isCorrect ? 'correct' : 'incorrect'})`,
    ];

    setHistory(newHistory);
    saveHistoryToFile(newHistory);

    if (isCorrect) {
      markAnswered(index);
      if (answeredOperations.every((ans, idx) => ans || idx === index)) {
        advanceLevel();
      }
    } else {
      setShowPopup('Wrong answer! Try again.');
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Level {currentLevel + 1}</h2>
      <PuzzleGrid
        operations={operations}
        selectedOperation={selectedOperation}
        selectOperation={selectOperation}
        answeredOperations={answeredOperations}
        checkAnswer={checkAnswer}
      />
      <AnswerList
        solutions={solutions}
        checkAnswer={(answer) =>
          selectedOperation !== null && checkAnswer(selectedOperation, answer)
        }
      />
      {/* <History history={history} /> */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">{showPopup}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700 focus:outline-none"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level;
