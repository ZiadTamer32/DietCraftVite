import { useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ChatProvider } from "../context/ChatContext";
import { HiChevronRight } from "react-icons/hi";
import Sidebar from "../features/ChatBot/Sidebar";
import ChatArea from "../features/ChatBot/ChatArea";
import MessageInput from "../features/ChatBot/MessageInput";

function AiAssistant() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex flex-col h-screen transition-colors relative">
          <div className="flex flex-1 pt-16 overflow-hidden">
            {isSidebarOpen && (
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}

            {!isSidebarOpen && (
              <button
                className="absolute block  top-[50%] left-5 z-30 bg-blue-50 rounded-full shadow-md transition-all duration-300 ease-in-out"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <HiChevronRight className="text-gray-700" size={18} />
              </button>
            )}

            <main
              className={`flex flex-col flex-1 ${
                isSidebarOpen ? "ml-80" : ""
              } relative`}
            >
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                  onClick={closeSidebar}
                  aria-hidden="true"
                />
              )}

              <ChatArea />
              <MessageInput />
            </main>
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default AiAssistant;
