import React from 'react';

interface AnswerListProps {
  solutions: number[];
  checkAnswer: (answer: number) => void;
}

const generateRandomAnswers = (
  solutions: number[],
  count: number = 10
): number[] => {
  const answers = [...solutions];
  while (answers.length < count) {
    const randomAnswer = Math.floor(Math.random() * 50);
    if (!answers.includes(randomAnswer)) {
      answers.push(randomAnswer);
    }
  }
  return answers.sort(() => Math.random() - 0.5);
};

const AnswerList: React.FC<AnswerListProps> = ({ solutions, checkAnswer }) => {
  const randomAnswers = generateRandomAnswers(solutions);

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    answer: number
  ) => {
    event.dataTransfer.setData('text/plain', answer.toString());
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {randomAnswers.map((answer, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-blue-100 focus:outline-none"
          onClick={() => checkAnswer(answer)}
          draggable
          onDragStart={(event) => handleDragStart(event, answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default AnswerList;
