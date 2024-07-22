import React from 'react';
import Level from './Level';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Math Puzzle Game</h1>
      <Level />
    </div>
  );
};

export default App;
