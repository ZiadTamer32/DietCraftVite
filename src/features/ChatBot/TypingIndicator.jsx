function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fadeIn mb-4">
      <div className="bg-[#e9ecef] rounded-lg p-3 max-w-[300px]">
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">Ollama is typing</span>
          <div className="flex items-end h-5">
            <div className="typing-dot bg-gray-600"></div>
            <div
              className="typing-dot bg-gray-600"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="typing-dot bg-gray-600"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
