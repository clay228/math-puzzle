import { useState } from 'react';

const useGridState = (size: number) => {
  const [selectedOperation, setSelectedOperation] = useState<number | null>(
    null
  );
  const [answeredOperations, setAnsweredOperations] = useState<boolean[]>(
    new Array(size).fill(false)
  );

  const selectOperation = (index: number) => {
    if (
      !answeredOperations[index] &&
      (selectedOperation === null || selectedOperation === index)
    ) {
      setSelectedOperation(index);
    }
  };

  const markAnswered = (index: number) => {
    const newAnsweredOperations = [...answeredOperations];
    newAnsweredOperations[index] = true;
    setAnsweredOperations(newAnsweredOperations);
    setSelectedOperation(null);
  };

  const resetGridState = (size: number) => {
    setSelectedOperation(null);
    setAnsweredOperations(new Array(size).fill(false));
  };

  return {
    selectedOperation,
    answeredOperations,
    selectOperation,
    markAnswered,
    resetGridState,
  };
};

export default useGridState;
