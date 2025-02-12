import { ResponseCategory, ChatResponse } from '../../types';
import { loadMarkdownFile } from '../../utils/markdownLoader';
import { lastfm } from '../../services/lastfm';

// Keywords for KGLW and music-related content
const MUSIC_KEYWORDS = [
  'king gizzard', 'kglw', 'gizzard', 'album', 'song', 'track',
  'nonagon', 'polygondwanaland', 'fishing for fishies', 'gumboot',
  'murder of the universe', 'butterfly 3000', 'infest'
];

// Album markdown file mappings
const ALBUM_MARKDOWN_FILES = {
  'nonagon infinity': 'albums/nonagon-infinity',
  'polygondwanaland': 'albums/polygondwanaland',
  // Add more albums...
};

const musicCategory: ResponseCategory = {
  priority: 2,
  matcher: (input: string) => {
    const lowercaseInput = input.toLowerCase();
    return MUSIC_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for specific album mentions
    for (const [albumKey, markdownPath] of Object.entries(ALBUM_MARKDOWN_FILES)) {
      if (lowercaseInput.includes(albumKey)) {
        try {
          // Load markdown content
          const markdownContent = await loadMarkdownFile(markdownPath);
          
          // Try to fetch LastFM data
          const lastFmData = await lastfm.getAlbumInfo(
            'King Gizzard & The Lizard Wizard',
            albumKey
          );

          // If we have LastFM data, append it to the markdown
          if (lastFmData) {
            const lastFmSection = `
## Current Statistics
- Total Plays: ${lastFmData.playcount.toLocaleString()}
- Listeners: ${lastFmData.listeners.toLocaleString()}
- Tags: ${lastFmData.tags.join(', ')}

## Track Listing
${lastFmData.tracks.map(track => `- ${track.name}`).join('\n')}
            `;
            
            return {
              type: 'lastfm-embed',
              content: markdownContent + '\n\n' + lastFmSection
            };
          }

          // Return just the markdown if no LastFM data
          return {
            type: 'markdown',
            content: markdownContent
          };
        } catch (error) {
          console.error('Error loading album response:', error);
        }
      }
    }

    // Return a general response for other music-related queries
    return {
      type: 'text',
      content: "I love talking about KGLW! What aspect of their music would you like to discuss?"
    };
  }
};

export default musicCategory; 