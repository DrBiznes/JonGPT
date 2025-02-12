import { ResponseCategory, ChatResponse } from '../../types';

const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const youtubeCategory: ResponseCategory = {
  priority: 1,
  matcher: (input: string) => YOUTUBE_REGEX.test(input),
  getResponse: async (input: string): Promise<ChatResponse> => {
    const match = input.match(YOUTUBE_REGEX);
    if (!match) {
      return {
        type: 'text',
        content: "I noticed you mentioned YouTube, but I couldn't find a valid link. Could you share the link again?"
      };
    }

    const videoId = match[1];
    return {
      type: 'youtube-embed',
      content: videoId,
      metadata: {
        embeds: [`https://www.youtube.com/embed/${videoId}`]
      }
    };
  }
};

export default youtubeCategory; 