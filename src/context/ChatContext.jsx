/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { generateId } from "../utils/helpers";
import axios from "axios";
import useUser from "../features/auth/useUser";

const ChatContext = createContext();

const createEmptyChat = () => ({
  id: generateId(),
  title: "New Chat",
  messages: [],
  timestamp: new Date(),
});

function ChatProvider({ children }) {
  const { user } = useUser();
  const email = user?.email || "";
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load chats from localStorage when email changes
  useEffect(() => {
    if (email) {
      const stored = localStorage.getItem(`chats_${email}`);
      let loadedChats = stored ? JSON.parse(stored) : [];
      // Convert timestamps to Date objects
      loadedChats = loadedChats.map((chat) => ({
        ...chat,
        timestamp: new Date(chat.timestamp),
        messages: chat.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
      setChats(loadedChats);
      setActiveChat(null);
    } else {
      setChats([]);
      setActiveChat(null);
    }
  }, [email]);

  // Save chats to localStorage when chats or email changes
  useEffect(() => {
    if (email) {
      localStorage.setItem(`chats_${email}`, JSON.stringify(chats));
    }
  }, [chats, email]);

  const createNewChat = () => {
    const newChat = createEmptyChat();
    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChat(newChat);
    return newChat;
  };

  const selectChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setActiveChat(chat);
    }
  };

  const removeChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    if (activeChat?.id === chatId) {
      setActiveChat(null);
    }
  };

  const updateChatTitle = (chatId, content) => {
    const title =
      content.length > 30 ? `${content.substring(0, 30)}...` : content;

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === chatId ? { ...chat, title } : chat))
    );
  };

  const sendMessage = (content) => {
    if (!content.trim()) return;

    let currentChat = activeChat;
    if (!currentChat) {
      currentChat = createNewChat();
    }

    const userMessage = {
      id: generateId(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      timestamp: new Date(),
    };

    if (currentChat.messages.length === 0) {
      updateChatTitle(currentChat.id, content);
    }

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
    );
    setActiveChat(updatedChat);

    setIsTyping(true);

    // Send first two messages if available, otherwise just the current message

    axios
      .post("http://127.0.0.1:344/chat", {
        message: content,
        messages: updatedChat.messages,
      })
      .then((response) => {
        const botResponse = {
          id: generateId(),
          content: response.data.response,
          role: "assistant",
          timestamp: new Date(),
        };

        const updatedChatWithResponse = {
          ...updatedChat,
          messages: [...updatedChat.messages, botResponse],
          timestamp: new Date(),
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id ? updatedChatWithResponse : chat
          )
        );
        setActiveChat(updatedChatWithResponse);
        setIsTyping(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setIsTyping(false);
      });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        createNewChat,
        selectChat,
        removeChat,
        sendMessage,
        isTyping,
        updateChatTitle,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export { ChatProvider, useChat };
