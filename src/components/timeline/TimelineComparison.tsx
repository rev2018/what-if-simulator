import React from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import TimelineCard from './TimelineCard';
import TimelineSentiment from './TimelineSentiment';

const TimelineComparison: React.FC = () => {
  const { decision, actualTimeline, alternateTimeline, isLoading } = useDecision();
  
  if (!decision || !actualTimeline || !alternateTimeline || isLoading) {
    return null;
  }
  
  return (
    <div className="mt-8 mb-12">
      <TimelineSentiment 
        actualSentiment={actualTimeline.overallSentiment} 
        alternateSentiment={alternateTimeline.overallSentiment}
        actualChoice={decision.actualChoice}
        alternateChoice={decision.alternateChoice}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="inline-block text-lg font-semibold py-1 px-4 rounded-full bg-blue-900 bg-opacity-30 text-blue-300 border border-blue-800">
              Your Path: {decision.actualChoice}
            </h2>
          </div>
          
          {actualTimeline.insights.map(insight => (
            <TimelineCard 
              key={insight.id}
              insight={insight}
              categoryName={decision.categories.find(c => c.id === insight.categoryId)?.name || ''}
              type="actual"
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="inline-block text-lg font-semibold py-1 px-4 rounded-full bg-amber-900 bg-opacity-30 text-amber-300 border border-amber-800">
              Alternative: {decision.alternateChoice}
            </h2>
          </div>
          
          {alternateTimeline.insights.map(insight => (
            <TimelineCard 
              key={insight.id}
              insight={insight}
              categoryName={decision.categories.find(c => c.id === insight.categoryId)?.name || ''}
              type="alternate"
            />
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-lg italic text-gray-400 max-w-2xl mx-auto">
          "The path not taken remains forever parallel to our journey, a shadow of possibility that both haunts and liberates us."
        </p>
      </div>
    </div>
  );
};

export default TimelineComparison;