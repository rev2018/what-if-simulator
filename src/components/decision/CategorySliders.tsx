import React from 'react';
import { useDecision, Category } from '../../contexts/DecisionContext';
import { Save, RefreshCw } from 'lucide-react';

const CategorySliders: React.FC = () => {
  const { 
    decision, 
    updateCategoryImportance, 
    resetDecision,
    saveCurrentDecision
  } = useDecision();
  
  if (!decision) return null;
  
  const handleSliderChange = (categoryId: string, value: number) => {
    updateCategoryImportance(categoryId, value);
  };
  
  return (
    <div className="max-w-md mx-auto mb-8 mt-4 bg-black bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Adjust Importance</h2>
        <div className="flex gap-2">
          <button 
            onClick={saveCurrentDecision}
            className="p-2 rounded-full bg-blue-600 bg-opacity-30 hover:bg-opacity-50 transition-colors"
            aria-label="Save decision"
          >
            <Save className="h-5 w-5 text-blue-400" />
          </button>
          <button 
            onClick={resetDecision}
            className="p-2 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-50 transition-colors"
            aria-label="Reset decision"
          >
            <RefreshCw className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-6">
        Adjust how much each aspect matters to you, and see how it affects the simulation.
      </p>
      
      <div className="space-y-4">
        {decision.categories.map((category: Category) => (
          <CategorySlider 
            key={category.id}
            category={category}
            onChange={handleSliderChange}
          />
        ))}
      </div>
    </div>
  );
};

interface CategorySliderProps {
  category: Category;
  onChange: (categoryId: string, value: number) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ category, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(category.id, parseInt(e.target.value, 10));
  };
  
  // Generate color based on category
  const getCategoryColor = (id: string) => {
    const colors: Record<string, string> = {
      'mental-health': 'text-green-400',
      'relationships': 'text-pink-400',
      'finances': 'text-blue-400',
      'career': 'text-amber-400',
      'personal-growth': 'text-purple-400',
      'self-image': 'text-cyan-400'
    };
    
    return colors[id] || 'text-gray-400';
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={`slider-${category.id}`} className={`text-sm font-medium ${getCategoryColor(category.id)}`}>
          {category.name}
        </label>
        <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
          {category.importance}/10
        </span>
      </div>
      
      <input
        type="range"
        id={`slider-${category.id}`}
        min="1"
        max="10"
        value={category.importance}
        onChange={handleChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
    </div>
  );
};

export default CategorySliders;