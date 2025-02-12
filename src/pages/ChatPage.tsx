import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '@/components/chat/ChatContainer'; // Updated import
import { useChatStore } from '@/lib/store';

const ChatPage = () => {
  const navigate = useNavigate();
  const activeChat = useChatStore(state => state.activeChat);

  React.useEffect(() => {
    if (!activeChat) {
      navigate('/');
    }
  }, [activeChat, navigate]);

  if (!activeChat) return null;

  return <ChatContainer />;
};

export default ChatPage;