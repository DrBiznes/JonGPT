import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '@/components/chat/ChatContainer'; // Updated import
import { useChatStore } from '@/lib/store';

const ChatPage = () => {
  const navigate = useNavigate();
  const activeChat = useChatStore(state => state.activeChat);
  const chats = useChatStore(state => state.chats);

  React.useEffect(() => {
    // Redirect to home if there's no active chat or if the active chat doesn't exist
    if (!activeChat || !chats.find(chat => chat.id === activeChat)) {
      navigate('/');
    }
  }, [activeChat, chats, navigate]);

  if (!activeChat || !chats.find(chat => chat.id === activeChat)) return null;

  return <ChatContainer />;
};

export default ChatPage;