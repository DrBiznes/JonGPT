import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  keywords?: string[];
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  created: number;
  lastUpdated: number;
}

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  createChat: () => string; // Updated return type
  addMessage: (chatId: string, message: Message) => void;
  deleteChat: (chatId: string) => void;
  setActiveChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChat: null,
      createChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          created: Date.now(),
          lastUpdated: Date.now(),
        };
        
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat.id,
        }));
        
        return newChat.id; // Return the new chat ID
      },
      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, message],
                  lastUpdated: Date.now(),
                  // Update title based on first message if it's still default
                  title: chat.title === 'New Chat' && chat.messages.length === 0 
                    ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                    : chat.title,
                }
              : chat
          ),
        }));
      },
      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          activeChat:
            state.activeChat === chatId
              ? state.chats[0]?.id ?? null
              : state.activeChat,
        }));
      },
      setActiveChat: (chatId) => {
        set({ activeChat: chatId });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);