export interface ChatResponse {
  type: 'text' | 'markdown' | 'lastfm-embed' | 'youtube-embed' | 'image';
  content: string;
  metadata?: {
    images?: string[];
    embeds?: string[];
  };
}

export interface ResponseCategory {
  priority: number;
  matcher: (input: string) => boolean;
  getResponse: (input: string) => Promise<ChatResponse>;
}

export type MarkdownPath = 
  | 'albums/nonagon-infinity'
  | 'albums/polygondwanaland'
  | 'albums/fishing-for-fishies'
  // Add more paths as needed

export interface MarkdownResponse extends ChatResponse {
  type: 'markdown';
  markdownPath?: MarkdownPath;
} 