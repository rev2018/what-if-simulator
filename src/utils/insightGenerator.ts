import { Decision, Insight } from '../contexts/DecisionContext';
import { v4 as uuidv4 } from '../utils/uuid';

// Sample insights based on common life decisions and their impacts
const insightTemplates = {
  'mental-health': {
    positive: [
      "This choice likely reduced your stress levels over time.",
      "This decision may have improved your overall mental well-being.",
      "You probably experienced greater peace of mind with this choice.",
      "This path likely gave you more emotional stability.",
      "This decision may have helped you feel more in control of your life."
    ],
    negative: [
      "This choice might have introduced new sources of anxiety.",
      "This decision could have increased your stress levels.",
      "You might have experienced more emotional turbulence with this choice.",
      "This path possibly led to more worrying and overthinking.",
      "This decision may have challenged your mental resilience."
    ]
  },
  'relationships': {
    positive: [
      "This choice likely strengthened your bonds with loved ones.",
      "This decision probably helped you form meaningful new connections.",
      "You may have developed deeper trust with important people in your life.",
      "This path possibly expanded your social circle in positive ways.",
      "This decision might have improved your existing relationships."
    ],
    negative: [
      "This choice may have created distance in some key relationships.",
      "This decision possibly led to some social isolation.",
      "You might have missed opportunities to connect with certain people.",
      "This path could have caused tension in your existing relationships.",
      "This decision may have limited your exposure to new social connections."
    ]
  },
  'finances': {
    positive: [
      "This choice probably improved your financial stability.",
      "This decision likely led to better money management habits.",
      "You may have increased your earning potential with this path.",
      "This choice possibly opened up new financial opportunities.",
      "This decision might have protected you from financial setbacks."
    ],
    negative: [
      "This choice might have introduced financial strain.",
      "This decision possibly required unexpected expenses.",
      "You may have faced more financial uncertainty with this path.",
      "This choice likely limited some financial opportunities.",
      "This decision could have reduced your financial flexibility."
    ]
  },
  'career': {
    positive: [
      "This choice probably advanced your professional development.",
      "This decision likely opened new career opportunities.",
      "You may have gained valuable skills and experience on this path.",
      "This choice possibly enhanced your professional reputation.",
      "This decision might have aligned better with your long-term career goals."
    ],
    negative: [
      "This choice might have limited some career advancement opportunities.",
      "This decision possibly delayed certain professional milestones.",
      "You may have missed chances to develop specific professional skills.",
      "This choice likely closed some doors in your career path.",
      "This decision could have positioned you in a less optimal industry."
    ]
  },
  'personal-growth': {
    positive: [
      "This choice probably challenged you to grow in meaningful ways.",
      "This decision likely expanded your perspective on life.",
      "You may have developed new strengths you didn't know you had.",
      "This path possibly pushed you beyond your comfort zone.",
      "This decision might have taught you valuable life lessons."
    ],
    negative: [
      "This choice might have kept you in your comfort zone more often.",
      "This decision possibly limited your exposure to new experiences.",
      "You may have had fewer opportunities for personal reinvention.",
      "This path likely provided less challenge to your worldview.",
      "This decision could have reinforced limiting beliefs about yourself."
    ]
  },
  'self-image': {
    positive: [
      "This choice probably helped you see yourself in a more positive light.",
      "This decision likely reinforced your authentic identity.",
      "You may have developed more confidence through this path.",
      "This choice possibly helped you better align with your values.",
      "This decision might have improved how you perceive your capabilities."
    ],
    negative: [
      "This choice might have challenged your sense of identity.",
      "This decision possibly created some dissonance with your self-image.",
      "You may have experienced moments of doubt about yourself on this path.",
      "This choice likely required compromising some aspects of yourself.",
      "This decision could have led to questioning your personal values."
    ]
  }
};

// Special templates for the hair dyeing example
const hairDyeingTemplates = {
  actualChoice: {
    'mental-health': [
      "Expressing yourself through your pink hair likely gave you a psychological boost.",
      "The bold change may have been refreshing for your mental state."
    ],
    'relationships': [
      "Your pink hair probably attracted a more artistic and unconventional social circle.",
      "Some traditional relationships might have been challenged by your new look."
    ],
    'finances': [
      "Maintaining pink hair likely required ongoing expenses for touch-ups and special products.",
      "You probably invested in new styling products specifically for colored hair."
    ],
    'career': [
      "Your pink hair may have influenced how colleagues or clients perceived your professionalism.",
      "In creative fields, your bold look might have been seen as an asset."
    ],
    'personal-growth': [
      "Taking this step outside convention likely built your courage for other life changes.",
      "You discovered how it feels to visibly stand out from the crowd."
    ],
    'self-image': [
      "Your pink hair became part of how you express your authentic self.",
      "You likely discovered a bolder, more adventurous side of your personality."
    ]
  },
  alternateChoice: {
    'mental-health': [
      "Maintaining your natural hair would have meant less worry about damage or maintenance.",
      "You might have avoided potential stress about how others perceived your unconventional look."
    ],
    'relationships': [
      "Your social circle might have remained more conventional without the statement hair.",
      "You might have blended in more easily in traditional social settings."
    ],
    'finances': [
      "You would have saved money on hair dye, touch-ups, and special hair products.",
      "Your regular hair care routine would have been less expensive."
    ],
    'career': [
      "In conservative work environments, natural hair might have been more professionally neutral.",
      "You might have avoided potential workplace judgment about unconventional appearance."
    ],
    'personal-growth': [
      "You might have found other, less visible ways to express your individuality.",
      "You might have stayed more within social conventions, for better or worse."
    ],
    'self-image': [
      "Your self-expression would have taken different forms without the visual statement of pink hair.",
      "You might have focused on other aspects of your appearance or personality to showcase your identity."
    ]
  }
};

export const generateTimelineInsights = (decision: Decision) => {
  const actualInsights: Insight[] = [];
  const alternateInsights: Insight[] = [];
  
  // Check if this is the hair dyeing example
  const isHairDyeingExample = 
    decision.actualChoice.toLowerCase().includes('dye') && 
    decision.actualChoice.toLowerCase().includes('hair') &&
    decision.actualChoice.toLowerCase().includes('pink');
  
  // For each category, generate insights based on importance
  decision.categories.forEach(category => {
    // Generate 1-3 insights per category based on importance
    const insightsCount = Math.max(1, Math.floor(category.importance / 4) + 1);
    
    for (let i = 0; i < insightsCount; i++) {
      // For actual choice timeline
      if (isHairDyeingExample && hairDyeingTemplates.actualChoice[category.id]) {
        // Use hair dyeing specific templates
        const templates = hairDyeingTemplates.actualChoice[category.id];
        const content = templates[i % templates.length];
        
        actualInsights.push({
          id: uuidv4(),
          categoryId: category.id,
          content,
          isPositive: Math.random() > 0.3, // 70% chance of positive
          impact: Math.floor(Math.random() * 5) + 3 // Impact between 3-7
        });
      } else {
        // Use general templates
        const isPositive = Math.random() > 0.4; // 60% chance of positive for actual choice
        const templates = insightTemplates[category.id][isPositive ? 'positive' : 'negative'];
        const content = templates[Math.floor(Math.random() * templates.length)];
        
        actualInsights.push({
          id: uuidv4(),
          categoryId: category.id,
          content,
          isPositive,
          impact: Math.floor(Math.random() * 5) + (isPositive ? 4 : 3) // Higher impact for positive insights
        });
      }
      
      // For alternate choice timeline
      if (isHairDyeingExample && hairDyeingTemplates.alternateChoice[category.id]) {
        // Use hair dyeing specific templates
        const templates = hairDyeingTemplates.alternateChoice[category.id];
        const content = templates[i % templates.length];
        
        alternateInsights.push({
          id: uuidv4(),
          categoryId: category.id,
          content,
          isPositive: Math.random() > 0.4, // 60% chance of positive
          impact: Math.floor(Math.random() * 5) + 3 // Impact between 3-7
        });
      } else {
        // Use general templates, but slightly different probability for alternate path
        const isPositive = Math.random() > 0.45; // 55% chance of positive for alternate
        const templates = insightTemplates[category.id][isPositive ? 'positive' : 'negative'];
        const content = templates[Math.floor(Math.random() * templates.length)];
        
        alternateInsights.push({
          id: uuidv4(),
          categoryId: category.id,
          content,
          isPositive,
          impact: Math.floor(Math.random() * 5) + (isPositive ? 3 : 3) // Balanced impact
        });
      }
    }
  });
  
  // Add some specific insights based on the decision context
  if (decision.context) {
    // Parse context for keywords and add relevant insights
    addContextualInsights(decision, actualInsights, alternateInsights);
  }
  
  return { actualInsights, alternateInsights };
};

const addContextualInsights = (
  decision: Decision, 
  actualInsights: Insight[], 
  alternateInsights: Insight[]
) => {
  const context = decision.context.toLowerCase();
  const keywords = {
    age: ['young', 'old', 'teenager', 'twenties', 'thirties', 'forties', 'age'],
    location: ['city', 'town', 'country', 'move', 'relocate', 'abroad'],
    job: ['job', 'career', 'work', 'profession', 'company', 'business'],
    education: ['school', 'college', 'university', 'degree', 'study', 'education'],
    relationship: ['dating', 'marriage', 'partner', 'boyfriend', 'girlfriend', 'spouse', 'divorce']
  };
  
  // Check for age-related context
  if (keywords.age.some(word => context.includes(word))) {
    actualInsights.push({
      id: uuidv4(),
      categoryId: 'personal-growth',
      content: `This choice was particularly significant given your age at the time.`,
      isPositive: true,
      impact: 7
    });
  }
  
  // Check for location-related context
  if (keywords.location.some(word => context.includes(word))) {
    alternateInsights.push({
      id: uuidv4(),
      categoryId: 'relationships',
      content: `Your social connections would have developed very differently in another location.`,
      isPositive: Math.random() > 0.5,
      impact: 8
    });
  }
  
  // Check for job-related context
  if (keywords.job.some(word => context.includes(word))) {
    actualInsights.push({
      id: uuidv4(),
      categoryId: 'career',
      content: `This career choice has shaped your professional identity in significant ways.`,
      isPositive: true,
      impact: 9
    });
  }
  
  // Check for education-related context
  if (keywords.education.some(word => context.includes(word))) {
    alternateInsights.push({
      id: uuidv4(),
      categoryId: 'personal-growth',
      content: `A different educational path would have exposed you to entirely different ideas and perspectives.`,
      isPositive: true,
      impact: 7
    });
  }
  
  // Check for relationship-related context
  if (keywords.relationship.some(word => context.includes(word))) {
    actualInsights.push({
      id: uuidv4(),
      categoryId: 'relationships',
      content: `This relationship decision has fundamentally shaped your interpersonal connections.`,
      isPositive: Math.random() > 0.4,
      impact: 9
    });
  }
};