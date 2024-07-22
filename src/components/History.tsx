import React from 'react';

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">History</h3>
      <ul className="list-disc list-inside">
        {history.map((entry, index) => (
          <li key={index} className="bg-gray-200 p-2 rounded mb-2">{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
