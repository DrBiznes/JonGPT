import { ResponseCategory, ChatResponse } from '../../types';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const imageCategory: ResponseCategory = {
  priority: 1,
  matcher: (input: string) => {
    // Check for image file extensions or data URLs
    return IMAGE_EXTENSIONS.some(ext => input.toLowerCase().includes(ext)) ||
           input.startsWith('data:image/');
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    // For now, just acknowledge the image
    // TODO: Implement actual image handling
    return {
      type: 'image',
      content: "I see you've shared an image! I'll be able to analyze KGLW-related images soon.",
      metadata: {
        // We'll add image processing later
        images: []
      }
    };
  }
};

export default imageCategory; 