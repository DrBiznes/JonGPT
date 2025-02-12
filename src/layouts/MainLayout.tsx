import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/lib/store';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const chats = useChatStore(state => state.chats);
  const { setActiveChat } = useChatStore();

  const handleNewChat = () => {
    setActiveChat(null);
    navigate('/');
  };

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    navigate('/chat');
  };

  return (
    <div className="flex h-screen bg-[#272933]">
      {/* Sidebar */}
      <div className="w-64 border-r-2 border-border p-4 flex flex-col gap-4 bg-[#212121]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-main rounded-base">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading text-[#e6e6e6]">JonGPT</span>
        </div>

        <Button 
          variant="default" 
          className="w-full justify-start"
          onClick={handleNewChat}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>

        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-2 mb-4">
            <div className="text-xs font-heading uppercase mb-2 text-[#e6e6e6]/60">Today</div>
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant="neutral"
                className="w-full justify-start text-left font-normal h-auto py-2"
                onClick={() => handleChatClick(chat.id)}
              >
                {chat.title}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <Button variant="neutral" className="w-full justify-start">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to The Stoning
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;