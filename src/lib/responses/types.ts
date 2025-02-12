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