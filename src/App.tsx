import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import AppLayout from './components/layout/AppLayout';
import DecisionInput from './components/decision/DecisionInput';
import TimelineComparison from './components/timeline/TimelineComparison';
import { DecisionProvider } from './contexts/DecisionContext';

function App() {
  return (
    <ThemeProvider>
      <DecisionProvider>
        <AppLayout>
          <DecisionInput />
          <TimelineComparison />
        </AppLayout>
      </DecisionProvider>
    </ThemeProvider>
  );
}

export default App;