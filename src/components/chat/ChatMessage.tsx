import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownFile } from '@/lib/responses/utils/markdownLoader';
import type { MarkdownPath } from '@/lib/responses/types';

// Add these imports for better markdown rendering
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'markdown' | 'lastfm-embed' | 'youtube-embed' | 'image';
  metadata?: {
    images?: string[];
    embeds?: string[];
    markdownPath?: MarkdownPath;
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
  const [markdownContent, setMarkdownContent] = React.useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    if (type === 'markdown' && metadata?.markdownPath) {
      loadMarkdownFile(metadata.markdownPath)
        .then(setMarkdownContent)
        .catch(console.error);
    }
  }, [type, metadata?.markdownPath]);

  const renderContent = () => {
    switch (type) {
      case 'markdown':
        return (
          <ReactMarkdown
            className="prose prose-invert max-w-none"
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mb-4 text-[#e6e6e6]" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold mt-6 mb-3 text-[#e6e6e6]" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-bold mt-4 mb-2 text-[#e6e6e6]" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 text-[#e6e6e6]" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 mb-4 text-[#e6e6e6]" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 mb-4 text-[#e6e6e6]" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1 text-[#e6e6e6]" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded-md text-[#e6e6e6]" {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-[#e6e6e6]/20 pl-4 italic my-4" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-main hover:underline" {...props} />
              ),
            }}
          >
            {markdownContent || content}
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
            <ReactMarkdown
              className="prose prose-invert max-w-none"
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mb-4 text-[#e6e6e6]" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mt-6 mb-3 text-[#e6e6e6]" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 text-[#e6e6e6]" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 text-[#e6e6e6]" {...props} />
                ),
              }}
            >
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