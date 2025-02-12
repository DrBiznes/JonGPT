import { ResponseCategory, ChatResponse } from '../../types';

const keywordResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    responses: [
      "Hello! How can I assist you today?",
      "Hi there! What's on your mind?",
      "Hey! Ready to help you out!",
    ]
  },
  {
    keywords: ['javascript', 'react', 'code', 'programming', 'function'],
    responses: [
      "Let me help you with that programming challenge.",
      "I'd be happy to assist with your code.",
      "Programming is fun! What are we building?",
    ]
  },
  // ... keep existing categories ...
];

const generalCategory: ResponseCategory = {
  priority: 4,
  matcher: (input: string) => {
    const lowercaseInput = input.toLowerCase();
    return keywordResponses.some(category =>
      category.keywords.some(keyword => lowercaseInput.includes(keyword))
    );
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    const lowercaseInput = input.toLowerCase();
    const matchingResponses = keywordResponses.filter(category =>
      category.keywords.some(keyword => lowercaseInput.includes(keyword))
    );

    if (matchingResponses.length === 0) {
      return {
        type: 'text',
        content: "I'm not sure how to respond to that. Could you rephrase or provide more context?"
      };
    }

    const selectedCategory = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
    const response = selectedCategory.responses[Math.floor(Math.random() * selectedCategory.responses.length)];

    return {
      type: 'text',
      content: response
    };
  }
};

export default generalCategory; 