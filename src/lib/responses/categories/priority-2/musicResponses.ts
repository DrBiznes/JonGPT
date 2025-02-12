import { ResponseCategory, ChatResponse } from '../../types';

// Keywords for KGLW and music-related content
const MUSIC_KEYWORDS = [
  'king gizzard', 'kglw', 'gizzard', 'album', 'song', 'track',
  'nonagon', 'polygondwanaland', 'fishing for fishies', 'gumboot',
  'murder of the universe', 'butterfly 3000', 'infest'
];

// Plain text responses for general music questions
const GENERAL_RESPONSES = [
  "King Gizzard & The Lizard Wizard is one of the most prolific and innovative bands out there!",
  "I love discussing KGLW's music. Their diverse range of styles is incredible.",
  "The way KGLW experiments with different genres and concepts is fascinating.",
];

// Album-specific responses
const ALBUM_RESPONSES = {
  'nonagon infinity': {
    title: 'Nonagon Infinity',
    description: "An infinite loop of high-energy psychedelic rock. The album that never ends!",
    keyTracks: ['Robot Stop', 'Gamma Knife', 'People-Vultures']
  },
  'polygondwanaland': {
    title: 'Polygondwanaland',
    description: "A progressive rock masterpiece exploring themes of polyrhythms and sacred geometry.",
    keyTracks: ['Crumbling Castle', 'The Fourth Colour', 'Horology']
  },
  // Add more albums...
};

const musicCategory: ResponseCategory = {
  priority: 1,
  matcher: (input: string) => {
    const lowercaseInput = input.toLowerCase();
    return MUSIC_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  },
  getResponse: async (input: string): Promise<ChatResponse> => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for specific album mentions
    for (const [albumKey, albumInfo] of Object.entries(ALBUM_RESPONSES)) {
      if (lowercaseInput.includes(albumKey)) {
        // TODO: Fetch LastFM data for the album
        return {
          type: 'markdown',
          content: `# ${albumInfo.title}\n\n${albumInfo.description}\n\n## Key Tracks\n${
            albumInfo.keyTracks.map(track => `- ${track}`).join('\n')
          }\n\n_I'll add LastFM data here once integrated!_`
        };
      }
    }

    // Return a general response for other music-related queries
    return {
      type: 'text',
      content: GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)]
    };
  }
};

export default musicCategory; 