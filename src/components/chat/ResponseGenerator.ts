interface KeywordResponse {
    keywords: string[];
    responses: string[];
    category: string;
  }
  
  const keywordResponses: KeywordResponse[] = [
    {
      category: 'Greetings',
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      responses: [
        "Hello! How can I assist you today?",
        "Hi there! What's on your mind?",
        "Hey! Ready to help you out!",
      ]
    },
    {
      category: 'Programming',
      keywords: ['javascript', 'react', 'code', 'programming', 'function'],
      responses: [
        "Let me help you with that programming challenge.",
        "I'd be happy to assist with your code.",
        "Programming is fun! What are we building?",
      ]
    },
    {
      category: 'Help',
      keywords: ['help', 'assist', 'support', 'guidance'],
      responses: [
        "I'm here to help! What do you need assistance with?",
        "How can I support you today?",
        "I'll do my best to help you out. What's the issue?",
      ]
    },
    // Add more categories as needed
  ];
  
  export const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Find matching categories based on keywords
    const matchingResponses = keywordResponses.filter(category =>
      category.keywords.some(keyword => lowercaseInput.includes(keyword))
    );
  
    if (matchingResponses.length === 0) {
      return "I'm not sure how to respond to that. Could you rephrase or provide more context?";
    }
  
    // Select a random category from matches
    const selectedCategory = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
    
    // Select a random response from the category
    return selectedCategory.responses[Math.floor(Math.random() * selectedCategory.responses.length)];
  };