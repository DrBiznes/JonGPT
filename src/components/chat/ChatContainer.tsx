import React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatContainer = () => {
  const activeChat = useChatStore(state => state.activeChat);
  const chats = useChatStore(state => state.chats);
  const currentChat = chats.find(chat => chat.id === activeChat);
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  if (!currentChat) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen pt-4 pb-[120px]">
      <ScrollArea className="flex-1 px-4">
        <div className="max-w-3xl mx-auto">
          {currentChat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={new Date(message.timestamp)}
            />
          ))}
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;