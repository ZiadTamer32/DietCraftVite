/* eslint-disable react/prop-types */
import { FiPlus, FiX, FiTrash2, FiEdit2 } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";
import { formatChatDate } from "../../utils/helpers";
import { useState, useRef } from "react";

function Sidebar({ isOpen, onOpen, toggleSidebar }) {
  const {
    chats,
    activeChat,
    createNewChat,
    selectChat,
    removeChat,
    updateChatTitle,
  } = useChat();

  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const inputRef = useRef(null);

  const handleChatSelect = (chatId) => {
    selectChat(chatId);
    // Only close sidebar on mobile (when overlay is visible)
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const handleRenameClick = (chat) => {
    setRenamingId(chat.id);
    setRenameValue(chat.title);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleRenameChange = (e) => {
    setRenameValue(e.target.value);
  };

  const handleRenameSubmit = (chat) => {
    const newTitle = renameValue.trim();
    if (newTitle && newTitle !== chat.title) {
      updateChatTitle(chat.id, newTitle);
    }
    setRenamingId(null);
    setRenameValue("");
  };

  const handleRenameKeyDown = (e, chat) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRenameSubmit(chat);
    } else if (e.key === "Escape") {
      setRenamingId(null);
      setRenameValue("");
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          absolute top-0 bottom-0 left-0 w-full lg:w-[20rem] bg-gray-50 backdrop-blur-lg
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
                className="p-2 transition-all rounded-full  text-gray-600 hover:bg-gray-200 border border-transparent"
                aria-label="New chat"
              >
                <FiPlus size={18} />
              </button>
              <button
                onClick={toggleSidebar}
                className="p-2 transition-all rounded-full hover:bg-gray-200"
                aria-label="Close sidebar"
              >
                <FiX size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="mb-4 text-gray-500">No chats yet</p>
            </div>
          ) : (
            <div className="flex-1 space-y-2 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center justify-between p-3 rounded-lg transition-all
                    ${
                      chat.id === activeChat?.id
                        ? " text-gray-900 bg-gray-100 border hover:bg-gray-200 border-transparent"
                        : "hover:bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  <button
                    onClick={() => handleChatSelect(chat.id)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center justify-between">
                      {renamingId === chat.id ? (
                        <input
                          ref={inputRef}
                          value={renameValue}
                          onChange={handleRenameChange}
                          onBlur={() => handleRenameSubmit(chat)}
                          onKeyDown={(e) => handleRenameKeyDown(e, chat)}
                          className="font-medium px-1 py-0.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dietcraft-500 bg-white text-gray-900"
                          style={{ minWidth: "3rem", maxWidth: "8rem" }}
                        />
                      ) : (
                        <span className="font-medium">{chat.title}</span>
                      )}
                      <span className="mr-2 text-xs text-gray-500 whitespace-nowrap">
                        {formatChatDate(chat.timestamp)}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleRenameClick(chat)}
                    className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-all mr-1"
                    aria-label="Rename chat"
                  >
                    <FiEdit2 size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => removeChat(chat.id)}
                    className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                    aria-label="Remove chat"
                  >
                    <FiTrash2 size={16} className="text-gray-600" />
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
          className="absolute left-0 z-20 items-center justify-center hidden w-6 h-10 -translate-y-1/2 bg-white shadow md:flex top-1/2"
          aria-label="Open sidebar"
        >
          <span className="text-gray-700">Back</span>
        </button>
      )}
    </>
  );
}

export default Sidebar;
