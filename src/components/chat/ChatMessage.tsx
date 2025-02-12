import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, role, timestamp }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="prose prose-invert">{content}</div>
        </div>
      </div>
    </div>
  );
};