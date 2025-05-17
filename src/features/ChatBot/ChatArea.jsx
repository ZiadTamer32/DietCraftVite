import { useRef, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import StartChatPrompt from "./StartChatPrompt";

function ChatArea() {
  const { activeChat, isTyping } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages, isTyping]);

  if (!activeChat) {
    return <StartChatPrompt />;
  }

  return (
    <div className="flex-1 px-4 py-4 md:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {activeChat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              How can I help you today?
            </h2>
            <p className="max-w-md text-center text-gray-600">
              Ask me anything about coding, concepts, or creative ideas.
              I&apos;m here to assist!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeChat.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatArea;
