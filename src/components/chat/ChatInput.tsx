import React from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/store';
import { responseManager } from '@/lib/responses/responseManager';

export const ChatInput: React.FC = () => {
  const [input, setInput] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const addMessage = useChatStore(state => state.addMessage);
  const activeChat = useChatStore(state => state.activeChat);

  const handleSubmit = async () => {
    if (!input.trim() || !activeChat) return;

    // Add user message
    addMessage(activeChat, {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: Date.now(),
    });

    // Generate response using new response manager
    const response = await responseManager.getResponse(input);
    
    // Add assistant message
    addMessage(activeChat, {
      id: crypto.randomUUID(),
      content: response.content,
      role: 'assistant',
      timestamp: Date.now(),
    });

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message JonGPT..."
            className="w-full min-h-[60px] max-h-[200px] p-4 pr-24 rounded-base bg-[#212121] border-2 border-border resize-none focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 focus:ring-offset-[#272933] text-[#e6e6e6] placeholder:text-[#e6e6e6]/50"
            rows={1}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <Button variant="neutral" size="icon" className="rounded-full">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button size="icon" className="rounded-full" onClick={handleSubmit}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};