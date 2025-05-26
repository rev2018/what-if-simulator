import React, { useState } from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import { History, ChevronDown, ChevronUp } from 'lucide-react';

const SavedDecisions: React.FC = () => {
  const { savedDecisions, loadSavedDecision } = useDecision();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!savedDecisions.length) return null;
  
  return (
    <div className="mb-6 bg-gray-900 bg-opacity-40 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-gray-800"
      >
        <div className="flex items-center">
          <History className="h-5 w-5 text-purple-400 mr-2" />
          <span className="font-medium">Previous Simulations</span>
          <span className="ml-2 text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">
            {savedDecisions.length}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 py-2 space-y-2 max-h-48 overflow-y-auto">
          {savedDecisions.map((decision, index) => (
            <button
              key={index}
              onClick={() => loadSavedDecision(index)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition-colors text-sm flex items-center"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full mr-2 text-xs">
                {index + 1}
              </span>
              <span className="truncate">{decision.question}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedDecisions;