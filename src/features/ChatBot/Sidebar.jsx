/* eslint-disable react/prop-types */
import { FiPlus, FiX, FiTrash2 } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";
import { formatChatDate } from "../../utils/helpers";

function Sidebar({ isOpen, onOpen, toggleSidebar }) {
  const { chats, activeChat, createNewChat, selectChat, removeChat } =
    useChat();

  const handleChatSelect = (chatId) => {
    selectChat(chatId);
    toggleSidebar();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          absolute top-0 bottom-0 left-0 w-full md:w-[22rem] bg-gray-50 backdrop-blur-lg
          transition-all duration-300 ease-in-out z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-4 ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Chats</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={createNewChat}
                className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all"
                aria-label="New chat"
              >
                <FiPlus size={18} />
              </button>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 transition-all"
                aria-label="Close sidebar"
              >
                <FiX size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500 mb-4">No chats yet</p>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center justify-between p-3 rounded-lg transition-all
                    ${
                      chat.id === activeChat?.id
                        ? "bg-blue-50 text-blue-800"
                        : "hover:bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  <button
                    onClick={() => handleChatSelect(chat.id)}
                    className="flex-1 text-left"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium truncate">{chat.title}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatChatDate(chat.timestamp)}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => removeChat(chat.id)}
                    className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                    aria-label="Remove chat"
                  >
                    <FiTrash2 size={16} className="text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Toggle button for md+ when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="hidden md:flex items-center justify-center w-6 h-10 absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-r-lg shadow z-20"
          aria-label="Open sidebar"
        >
          <span className="text-gray-700">Back</span>
        </button>
      )}
    </>
  );
}

export default Sidebar;
