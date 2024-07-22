import React from 'react';

interface PuzzleGridProps {
  operations: string[];
  selectedOperation: number | null;
  selectOperation: (index: number) => void;
  answeredOperations: boolean[];
  checkAnswer: (index: number, answer: number) => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  operations,
  selectedOperation,
  selectOperation,
  answeredOperations,
  checkAnswer
}) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const answer = parseInt(event.dataTransfer.getData('text/plain'), 10);
    if (!answeredOperations[index]) {
      checkAnswer(index, answer);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${Math.sqrt(operations.length)}, 1fr)` }}>
      {operations.map((operation, index) => (
        <div
          key={index}
          className={`p-4 border rounded text-center
            ${answeredOperations[index] ? 'bg-green border-green-200 cursor-not-allowed' : ''}
            ${(!answeredOperations[index] && (selectedOperation === null || selectedOperation === index))
              ? 'bg-white hover:bg-gray-100 cursor-pointer'
              : 'bg-gray-200 cursor-not-allowed'}`}
          onClick={() => !answeredOperations[index] && selectOperation(index)}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={handleDragOver}
        >
          {operation} = ?
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
