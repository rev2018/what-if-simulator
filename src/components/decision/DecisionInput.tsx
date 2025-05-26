import React, { useState } from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import { Split as SplitScreen, BookOpen, CornerDownRight, Hourglass, Sparkles } from 'lucide-react';
import CategorySliders from './CategorySliders';
import SavedDecisions from './SavedDecisions';

const DecisionInput: React.FC = () => {
  const { setDecisionData, decision, isLoading, savedDecisions } = useDecision();
  
  const [formData, setFormData] = useState({
    question: '',
    actualChoice: '',
    alternateChoice: '',
    context: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setDecisionData({
      ...formData,
      categories: decision?.categories || []
    });
  };
  
  if (decision && !isLoading) {
    return <CategorySliders />;
  }
  
  return (
    <div className="max-w-2xl mx-auto transition-all duration-500">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse"></div>
            <Hourglass className="w-16 h-16 text-pink-400 relative z-10" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4">Exploring Parallel Timelines</h2>
          <p className="text-gray-400">Analyzing the ripple effects of your decision...</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-pink-500 bg-opacity-20 rounded-full mb-4 relative group cursor-pointer transition-all duration-300 hover:bg-opacity-30">
              <div className="absolute inset-0 bg-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              <Sparkles className="w-6 h-6 text-pink-400 relative z-10 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              What If? Simulator
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Explore how your life might have unfolded had you made a different choice.
            </p>
          </div>
          
          {savedDecisions.length > 0 && <SavedDecisions />}
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-black bg-opacity-20 p-6 rounded-xl backdrop-blur-sm border border-pink-500 border-opacity-20">
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-1 text-pink-300">
                What decision are you curious about?
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-pink-900 bg-opacity-20 border border-pink-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors placeholder-pink-300 placeholder-opacity-50"
                placeholder="e.g., Should I have moved to a new city?"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="actualChoice" className="block text-sm font-medium mb-1 text-pink-300">
                  What did you actually choose?
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-5 w-5 text-pink-400 opacity-70" />
                  <input
                    type="text"
                    id="actualChoice"
                    name="actualChoice"
                    value={formData.actualChoice}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-pink-900 bg-opacity-20 border border-pink-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors placeholder-pink-300 placeholder-opacity-50"
                    placeholder="e.g., I moved to New York"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="alternateChoice" className="block text-sm font-medium mb-1 text-purple-300">
                  What's the alternate choice?
                </label>
                <div className="relative">
                  <CornerDownRight className="absolute left-3 top-3 h-5 w-5 text-purple-400 opacity-70" />
                  <input
                    type="text"
                    id="alternateChoice"
                    name="alternateChoice"
                    value={formData.alternateChoice}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-purple-900 bg-opacity-20 border border-purple-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors placeholder-purple-300 placeholder-opacity-50"
                    placeholder="e.g., I stayed in my hometown"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="context" className="block text-sm font-medium mb-1 text-pink-300">
                Add some context about your situation (optional)
              </label>
              <textarea
                id="context"
                name="context"
                value={formData.context}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-pink-900 bg-opacity-20 border border-pink-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-colors resize-none placeholder-pink-300 placeholder-opacity-50"
                placeholder="e.g., I was 25, just graduated, and was offered a job in New York..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg relative group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
              <span className="relative z-10">Explore Parallel Timelines</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default DecisionInput;