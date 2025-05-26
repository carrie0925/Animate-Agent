import { useEffect, useRef, useState } from "react";

function DialogueBox({ messages, onSend }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 訊息顯示區 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[60%] px-4 py-3 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-lg transition-all duration-300 hover:shadow-xl
                ${
                  msg.role === "user"
                    ? "bg-white/95 backdrop-blur-sm text-gray-800 rounded-br-none border border-white/50"
                    : "bg-gradient-to-r from-tropical/90 to-periwinkle/90 backdrop-blur-sm text-white rounded-bl-none border border-white/30"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 輸入欄區 */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 relative">
          <input
            className="w-full rounded-xl px-4 py-3 text-gray-800 bg-white/90 backdrop-blur-sm placeholder-gray-500 border border-white/50 focus:outline-none focus:ring-2 focus:ring-tropical/50 focus:border-tropical transition-all duration-200 shadow-lg"
            placeholder="請輸入訊息..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-8 py-3 bg-tropical text-white rounded-xl hover:bg-tropical/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-xl font-bold text-lg"
        >
          送出
        </button>
      </div>
    </div>
  );
}

export default DialogueBox;
