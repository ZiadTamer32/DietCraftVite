import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isTyping } = useChat();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (!isTyping && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-4 left-0 right-0 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 bg-white border-gray-200 border-2 backdrop-blur-lg rounded-2xl p-2 shadow-lg">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Ollama..."
              className="w-full rounded-xl bg-transparent px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none resize-none"
              rows={1}
              disabled={isTyping}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`
              p-2 rounded-full transition-all
              ${
                message.trim() && !isTyping
                  ? "bg-[#3a86ff] hover:bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
