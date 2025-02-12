import { ResponseCategory, ChatResponse } from '../../types';

const GAME_KEYWORDS = ['play', 'game', 'quiz', 'trivia', 'guess'];

const gameCategory: ResponseCategory = {
  priority: 2,
  matcher: (input: string) => {
    const lowercaseInput = input.toLowerCase();
    return GAME_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    return {
      type: 'text',
      content: "I'd love to play a KGLW-themed game! I'm still learning the rules though. Check back soon for some fun music trivia!"
    };
  }
};

export default gameCategory; 