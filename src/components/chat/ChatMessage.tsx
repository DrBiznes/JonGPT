import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'markdown' | 'lastfm-embed' | 'youtube-embed' | 'image';
  metadata?: {
    images?: string[];
    embeds?: string[];
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  content, 
  role, 
  timestamp,
  type = 'text',
  metadata 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (type) {
      case 'markdown':
        return (
          <ReactMarkdown className="prose prose-invert">
            {content}
          </ReactMarkdown>
        );
      
      case 'youtube-embed':
        return metadata?.embeds?.[0] ? (
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={metadata.embeds[0]}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : content;
      
      case 'lastfm-embed':
        return (
          <div className="bg-[#1a1a1a] p-4 rounded-base">
            {/* We'll enhance this with LastFM styling later */}
            <ReactMarkdown className="prose prose-invert">
              {content}
            </ReactMarkdown>
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-2">
            {metadata?.images?.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Shared image ${index + 1}`}
                className="max-w-full rounded-base"
              />
            ))}
            <p>{content}</p>
          </div>
        );
      
      default:
        return <div className="prose prose-invert">{content}</div>;
    }
  };

  return (
    <div className={`message message-${role} relative`}>
      <div className="message-actions">
        <Button
          variant="neutral"
          size="sm"
          className="h-8 px-2"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <div className="flex gap-2 items-start">
        <div className="w-8 h-8 rounded-base bg-main flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm text-[#e6e6e6]/60 mb-1">
            {role === 'assistant' ? 'JonGPT' : 'You'} • {timestamp.toLocaleTimeString()}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};