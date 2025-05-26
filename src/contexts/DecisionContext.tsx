import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateTimelineInsights } from '../utils/insightGenerator';

export interface Category {
  id: string;
  name: string;
  importance: number;
}

export interface Decision {
  question: string;
  actualChoice: string;
  alternateChoice: string;
  context: string;
  categories: Category[];
}

export interface Insight {
  id: string;
  categoryId: string;
  content: string;
  isPositive: boolean;
  impact: number;
}

export interface Timeline {
  insights: Insight[];
  overallSentiment: number;
}

interface DecisionContextType {
  decision: Decision | null;
  actualTimeline: Timeline | null;
  alternateTimeline: Timeline | null;
  isLoading: boolean;
  setDecisionData: (data: Decision) => void;
  updateCategoryImportance: (categoryId: string, importance: number) => void;
  resetDecision: () => void;
  savedDecisions: Decision[];
  saveCurrentDecision: () => void;
  loadSavedDecision: (index: number) => void;
}

const defaultCategories: Category[] = [
  { id: 'mental-health', name: 'Mental Health', importance: 5 },
  { id: 'relationships', name: 'Relationships', importance: 5 },
  { id: 'finances', name: 'Finances', importance: 3 },
  { id: 'career', name: 'Career', importance: 4 },
  { id: 'personal-growth', name: 'Personal Growth', importance: 5 },
  { id: 'self-image', name: 'Self-image', importance: 4 }
];

const DecisionContext = createContext<DecisionContextType | undefined>(undefined);

export const useDecision = () => {
  const context = useContext(DecisionContext);
  if (context === undefined) {
    throw new Error('useDecision must be used within a DecisionProvider');
  }
  return context;
};

export const DecisionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [actualTimeline, setActualTimeline] = useState<Timeline | null>(null);
  const [alternateTimeline, setAlternateTimeline] = useState<Timeline | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedDecisions, setSavedDecisions] = useState<Decision[]>([]);

  const setDecisionData = (data: Decision) => {
    setIsLoading(true);
    
    // Ensure categories are included
    const fullData = {
      ...data,
      categories: data.categories?.length ? data.categories : defaultCategories
    };
    
    setDecision(fullData);
    
    // Generate timelines based on the decision
    const { actualInsights, alternateInsights } = generateTimelineInsights(fullData);
    
    // Calculate overall sentiment for each timeline
    const actualSentiment = calculateOverallSentiment(actualInsights);
    const alternateSentiment = calculateOverallSentiment(alternateInsights);
    
    setActualTimeline({ insights: actualInsights, overallSentiment: actualSentiment });
    setAlternateTimeline({ insights: alternateInsights, overallSentiment: alternateSentiment });
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const calculateOverallSentiment = (insights: Insight[]): number => {
    if (!insights.length) return 0;
    
    const totalImpact = insights.reduce((sum, insight) => {
      return sum + (insight.isPositive ? insight.impact : -insight.impact);
    }, 0);
    
    // Normalize to a range between -10 and 10
    return Math.max(-10, Math.min(10, totalImpact / insights.length * 5));
  };

  const updateCategoryImportance = (categoryId: string, importance: number) => {
    if (!decision) return;
    
    const updatedCategories = decision.categories.map(category => 
      category.id === categoryId ? { ...category, importance } : category
    );
    
    const updatedDecision = { ...decision, categories: updatedCategories };
    setDecision(updatedDecision);
    
    // Regenerate insights with updated importance values
    const { actualInsights, alternateInsights } = generateTimelineInsights(updatedDecision);
    
    setActualTimeline({ 
      insights: actualInsights, 
      overallSentiment: calculateOverallSentiment(actualInsights) 
    });
    
    setAlternateTimeline({ 
      insights: alternateInsights, 
      overallSentiment: calculateOverallSentiment(alternateInsights)
    });
  };

  const resetDecision = () => {
    setDecision(null);
    setActualTimeline(null);
    setAlternateTimeline(null);
  };

  const saveCurrentDecision = () => {
    if (decision) {
      setSavedDecisions([...savedDecisions, decision]);
    }
  };

  const loadSavedDecision = (index: number) => {
    const savedDecision = savedDecisions[index];
    if (savedDecision) {
      setDecisionData(savedDecision);
    }
  };

  return (
    <DecisionContext.Provider value={{
      decision,
      actualTimeline,
      alternateTimeline,
      isLoading,
      setDecisionData,
      updateCategoryImportance,
      resetDecision,
      savedDecisions,
      saveCurrentDecision,
      loadSavedDecision
    }}>
      {children}
    </DecisionContext.Provider>
  );
};