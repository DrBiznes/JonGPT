# Simplified Response Generator Project Plan

## Overview
Refactor the response generator to implement a priority-based response system with LastFM integration and basic keyword matching.

## Core Types
```typescript
interface ResponseCategory {
  priority: number; // 1-5, 1 being highest
  matcher: (input: string) => boolean;
  getResponse: (input: string) => Promise<ChatResponse>;
}

interface ChatResponse {
  type: 'text' | 'markdown' | 'lastfm-embed' | 'youtube-embed' | 'image';
  content: string;
}
```

## Directory Structure
```
src/
  lib/
    responses/
      categories/
        priority-1/
          image-responses.ts       # Image upload responses
          music-responses.ts       # Music/KGLW responses + LastFM integration
          youtube-responses.ts     # YouTube link responses
        priority-2/
          game-responses.ts       # Game system responses (placeholder)
        priority-3/
          identity-responses.ts   # Who/what are you responses
        priority-4/
          general-responses.ts    # Keyword-based general responses
      markdown/                   # Markdown response templates
        images/                  # Image responses
          cool-pics.md
          fan-art.md
        music/                   # Music-related responses
          albums/
            gumboot-soup.md
            fishing-for-fishies.md
          live-shows.md
        general/                 # General response templates
          about-me.md
          favorites.md
      responseManager.ts          # Main response handling logic
      lastfmClient.ts            # LastFM API wrapper
      markdownLoader.ts          # Markdown loading utility
```

## Implementation Phases

### Phase 1: Core Response System (1 week)
1. Basic Response Manager
   - Implement priority handling
   - Create category matching system
   - Set up response selection

2. Response Categories
   - Create category interfaces
   - Set up basic response templates
   - Implement response loading

### Phase 2: Priority Response Implementation (1 week)
1. Image Response System
   - Extract file name and type
   - Create image response templates
   - Set up mock image responses

2. YouTube Link Detection
   ```typescript
   const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
   ```
   - Implement link detection
   - Create response templates

3. Identity Responses
   - Create basic who/what responses
   - Add response variations

### Phase 3: LastFM Integration (1 week)
1. LastFM Integration
   - Create basic API wrapper
   - Add album/track fetching
   - Implement music responses

2. Response Components
   - Create album display component
   - Add track listing component
   - Basic listening statistics

### Phase 4: Keyword System (1 week)
1. Keyword Matching
   - Simple keyword detection
   - Multiple keyword support
   - Response selection

2. General Responses
   - Create text responses
   - Add markdown templates
   - Implement fallbacks

## Markdown System
1. React-Markdown Integration
   ```typescript
   import ReactMarkdown from 'react-markdown';

   interface MarkdownResponse {
     type: 'markdown';
     content: string;
     metadata?: {
       images?: string[];      // Paths to images used in response
       embeds?: string[];      // Any embed URLs
     }
   }

   // Component to render markdown responses
   const MarkdownResponseRenderer: React.FC<{ response: MarkdownResponse }> = ({ response }) => {
     return (
       <ReactMarkdown
         className="markdown-response"
         components={{
           img: ({ node, ...props }) => (
             <img className="markdown-image" loading="lazy" {...props} />
           ),
           a: ({ node, ...props }) => (
             <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />
           )
         }}
       >
         {response.content}
       </ReactMarkdown>
     );
   };
   ```

2. Markdown Structure
   - Use standard markdown syntax
   - Support for images, links, headers, lists
   - Static file paths for embedded media
   - Custom CSS for markdown rendering

3. Example Markdown Template
   ```markdown
   # Gumboot Soup Analysis
   
   ![Album Cover](/images/albums/gumboot-soup.jpg)
   
   Gumboot Soup is one of my favorite albums! Released on December 31, 2017, 
   it represents the fifth and final album of 2017.
   
   ## Notable Tracks
   - Beginner's Luck
   - Greenhouse Heat Death
   - The Great Chain of Being
   
   ## Fun Fact
   This album was recorded throughout 2017 in between the other four albums 
   released that year!
   ```

4. Markdown Loading
   ```typescript
   // Utility function to load markdown
   const loadMarkdownResponse = async (path: string): Promise<MarkdownResponse> => {
     const content = await fetch(`/markdown/${path}.md`).then(r => r.text());
     return {
       type: 'markdown',
       content,
       metadata: extractMetadataFromMarkdown(content)
     };
   };

   // Usage in responses
   const getMusicResponse = async (albumName: string): Promise<ChatResponse> => {
     // Load markdown response for specific album
     const response = await loadMarkdownResponse(`music/albums/${albumName}`);
     
     // Enhance with LastFM data if available
     const lastFmData = await lastfmClient.getAlbumInfo(albumName);
     if (lastFmData) {
       return {
         ...response,
         metadata: {
           ...response.metadata,
           albumData: lastFmData
         }
       };
     }
     
     return response;
   };
   ```

## Priority System
1. Priority 1 (Highest)
   - Image upload responses
   - Music/KGLW mentions
   - YouTube link detection

2. Priority 2
   - Game system responses (placeholder)

3. Priority 3
   - Identity questions (who/what are you)

4. Priority 4 (Lowest)
   - General keyword responses
   - Fallback responses

## Testing Strategy
- Unit test response categories
- Test priority handling
- Verify LastFM integration
- Test keyword matching

## Next Steps
1. Implement ResponseManager and basic types
2. Create first priority response category
3. Add LastFM integration
4. Implement keyword system

Total Timeline: 4 weeks

This plan provides a clear roadmap for implementing the response system with react-markdown for rendering formatted responses, while maintaining a simple and direct approach to priority-based response handling.