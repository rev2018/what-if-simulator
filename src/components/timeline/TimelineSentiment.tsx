import React, { useEffect, useRef } from 'react';

interface TimelineSentimentProps {
  actualSentiment: number;
  alternateSentiment: number;
  actualChoice: string;
  alternateChoice: string;
}

const TimelineSentiment: React.FC<TimelineSentimentProps> = ({
  actualSentiment,
  alternateSentiment,
  actualChoice,
  alternateChoice
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Convert sentiment (-10 to 10) to a percentage (0 to 100)
  const normalizeValue = (value: number): number => ((value + 10) / 20) * 100;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Get normalized values
    const actualNormalized = normalizeValue(actualSentiment);
    const alternateNormalized = normalizeValue(alternateSentiment);
    
    // Calculate balance point (weighted average)
    const balancePoint = (actualNormalized + alternateNormalized) / 2;
    
    // Draw balance visualization
    drawBalanceVisualization(ctx, canvas.width, canvas.height, actualNormalized, alternateNormalized, balancePoint);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawBalanceVisualization(ctx, canvas.width, canvas.height, actualNormalized, alternateNormalized, balancePoint);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [actualSentiment, alternateSentiment]);
  
  const drawBalanceVisualization = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    actualValue: number,
    alternateValue: number,
    balancePoint: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set dimensions
    const centerY = height / 2;
    const lineY = centerY;
    const lineThickness = 4;
    const circleRadius = 12;
    
    // Draw background line
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#60A5FA');  // Blue for actual path
    gradient.addColorStop(1, '#F59E0B');  // Amber for alternate path
    
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(width, lineY);
    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
    ctx.stroke();
    
    // Draw balance indicator
    const balanceX = (balancePoint / 100) * width;
    
    // Draw balance circle with glow effect
    ctx.beginPath();
    ctx.arc(balanceX, lineY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#6D28D9';
    ctx.shadowColor = 'rgba(109, 40, 217, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw actual value marker
    const actualX = (actualValue / 100) * width;
    ctx.beginPath();
    ctx.arc(actualX, lineY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#60A5FA';
    ctx.fill();
    
    // Draw alternate value marker
    const alternateX = (alternateValue / 100) * width;
    ctx.beginPath();
    ctx.arc(alternateX, lineY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
  };
  
  // Generate a comparison message based on the sentiment values
  const getComparisonMessage = (): string => {
    const diff = actualSentiment - alternateSentiment;
    
    if (Math.abs(diff) < 2) {
      return "Both paths seem to have similar outcomes.";
    } else if (diff > 0) {
      return diff > 5 
        ? `Your actual choice appears significantly more favorable.` 
        : `Your actual choice seems somewhat better.`;
    } else {
      return Math.abs(diff) > 5
        ? `The path not taken might have been significantly better.`
        : `The alternative path could have been somewhat better.`;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-black bg-opacity-20 rounded-xl backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">Balance of Outcomes</h2>
      
      <div className="h-16 mb-6 relative">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
        
        <div className="absolute top-0 left-0 text-sm text-blue-300">
          {actualChoice}
        </div>
        
        <div className="absolute top-0 right-0 text-sm text-amber-300 text-right">
          {alternateChoice}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-300 italic">{getComparisonMessage()}</p>
      </div>
    </div>
  );
};

export default TimelineSentiment;