import React from 'react';
import { Insight } from '../../contexts/DecisionContext';
import { Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';

interface TimelineCardProps {
  insight: Insight;
  categoryName: string;
  type: 'actual' | 'alternate';
}

const TimelineCard: React.FC<TimelineCardProps> = ({ insight, categoryName, type }) => {
  // Determine the card appearance based on type and whether it's positive/negative
  const getCardStyle = () => {
    if (type === 'actual') {
      return insight.isPositive
        ? 'bg-blue-900 bg-opacity-20 border-blue-800 shadow-blue-900/20'
        : 'bg-blue-950 bg-opacity-30 border-blue-900 shadow-blue-950/20';
    } else {
      return insight.isPositive
        ? 'bg-amber-900 bg-opacity-20 border-amber-800 shadow-amber-900/20'
        : 'bg-amber-950 bg-opacity-30 border-amber-900 shadow-amber-950/20';
    }
  };
  
  // Determine the icon and its color
  const getIcon = () => {
    if (insight.isPositive) {
      return type === 'actual' 
        ? <Plus className="h-5 w-5 text-blue-400" />
        : <Plus className="h-5 w-5 text-amber-400" />;
    } else {
      return type === 'actual'
        ? <Minus className="h-5 w-5 text-blue-400" />
        : <Minus className="h-5 w-5 text-amber-400" />;
    }
  };
  
  // Determine the impact indicator
  const getImpactIndicator = () => {
    if (insight.impact >= 7) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    } else if (insight.impact <= 3) {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
    return null;
  };
  
  return (
    <div 
      className={`p-4 rounded-lg border backdrop-blur-sm shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${getCardStyle()}`}
    >
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-black bg-opacity-20 mr-3">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              type === 'actual' ? 'bg-blue-900 bg-opacity-40 text-blue-300' : 'bg-amber-900 bg-opacity-40 text-amber-300'
            }`}>
              {categoryName}
            </span>
            
            <div className="flex items-center space-x-1">
              {getImpactIndicator()}
              <span className="text-xs text-gray-400">
                Impact: {insight.impact}/10
              </span>
            </div>
          </div>
          
          <p className="text-sm md:text-base">{insight.content}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;