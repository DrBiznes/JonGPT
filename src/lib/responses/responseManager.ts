import { ChatResponse, ResponseCategory } from './types';

export class ResponseManager {
  private categories: ResponseCategory[] = [];

  registerCategory(category: ResponseCategory) {
    this.categories.push(category);
    // Sort by priority (1 highest)
    this.categories.sort((a, b) => a.priority - b.priority);
  }

  async getResponse(input: string): Promise<ChatResponse> {
    // Find first matching category based on priority
    const matchingCategory = this.categories.find(category => 
      category.matcher(input)
    );

    if (!matchingCategory) {
      return {
        type: 'text',
        content: "I'm not sure how to respond to that. Could you rephrase or provide more context?"
      };
    }

    return matchingCategory.getResponse(input);
  }
}

export const responseManager = new ResponseManager(); 