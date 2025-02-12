import { ResponseCategory, ChatResponse } from '../../types';

const IDENTITY_KEYWORDS = ['who are you', 'what are you', 'your name', 'about you'];

const identityCategory: ResponseCategory = {
  priority: 3,
  matcher: (input: string) => {
    const lowercaseInput = input.toLowerCase();
    return IDENTITY_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    return {
      type: 'markdown',
      content: `
# About Me

I'm JonGPT, a chat assistant created to discuss all things King Gizzard & The Lizard Wizard! 

I love talking about:
- Their extensive discography
- Musical concepts and themes
- Live performances
- Album analysis
- And everything else KGLW!

Feel free to ask me about any album, song, or concept. I'm particularly knowledgeable about their musical evolution and can help you discover new aspects of their work.
      `.trim()
    };
  }
};

export default identityCategory; 