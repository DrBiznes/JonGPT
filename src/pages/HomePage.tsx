import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Send, Search, Music, Youtube } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/store';
import { responseManager } from '@/lib/responses/responseManager';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const HomePage = () => {
  const [input, setInput] = React.useState('');
  const [kglwMode, setKglwMode] = React.useState(false);
  const navigate = useNavigate();
  const { createChat, addMessage } = useChatStore();

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const chatId = createChat();
    
    // Add user message
    addMessage(chatId, {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: Date.now(),
    });

    // Generate response using new response manager
    const response = await responseManager.getResponse(input);
    
    // Add assistant message
    addMessage(chatId, {
      id: crypto.randomUUID(),
      content: response.content,
      role: 'assistant',
      timestamp: Date.now(),
      type: response.type,
      metadata: response.metadata
    });

    navigate('/chat');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-main rounded-base">
            <img 
              src="/logo.png" 
              alt="JonGPT Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-heading text-[#e6e6e6]">
            {getGreeting()}, ALC lover.
          </h1>
        </div>

        {/* Input Card */}
        <Card className="w-full p-4 mb-8 bg-[#212121] border-border">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant={kglwMode ? "default" : "neutral"}
                size="sm" 
                className={`${kglwMode ? 'bg-main' : 'bg-[#272933]'} text-[#e6e6e6]`}
                onClick={() => setKglwMode(!kglwMode)}
              >
                KGLW Reasoning Model
              </Button>
              <span className="text-sm text-[#e6e6e6]/50 ">•</span>
              <Button 
                variant="neutral" 
                size="icon" 
                className="rounded-full bg-[#272933]"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full min-h-[100px] p-4 pr-14 rounded-base bg-[#272933] border-2 border-border resize-none focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 focus:ring-offset-[#212121] text-[#e6e6e6] placeholder:text-[#e6e6e6]/50"
                placeholder="How can I help you today?"
              />
              <Button 
                variant="neutral" 
                size="icon" 
                className="absolute top-2 right-6 rounded-full bg-[#ff6a6a]"
                onClick={handleSubmit}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <Button
            variant="default"
            className="flex items-center gap-2 justify-start p-4 h-auto bg-[#212121] border-border hover:bg-[#272933] text-[#e6e6e6]"
            onClick={() => handleSuggestionClick("What's your favorite KGLW game to play? Let's start with something fun!")}
          >
            <Search className="w-5 h-5" />
            <div className="text-left">
              <div className="font-heading text-[#e6e6e6]">Games</div>
              <div className="text-sm text-[#e6e6e6]">
                Play games with AI Jon
              </div>
            </div>
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-2 justify-start p-4 h-auto bg-[#212121] border-border hover:bg-[#272933] text-[#e6e6e6]"
            onClick={() => handleSuggestionClick("Can you help me analyze the musical structure and influences in KGLW's albums?")}
          >
            <Music className="w-5 h-5" />
            <div className="text-left">
              <div className="font-heading text-[#e6e6e6]">Music</div>
              <div className="text-sm text-[#e6e6e6]">
                Chat with AI Jon about music
              </div>
            </div>
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-2 justify-start p-4 h-auto bg-[#212121] border-border hover:bg-[#272933] text-[#e6e6e6]"
            onClick={() => handleSuggestionClick("What are your top recommended KGLW live performance videos to watch?")}
          >
            <Youtube className="w-5 h-5" />
            <div className="text-left">
              <div className="font-heading text-[#e6e6e6]">Youtube Links</div>
              <div className="text-sm text-[#e6e6e6]">
                Share your favorite videos
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;