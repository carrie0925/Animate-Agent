import { useEffect, useRef, useState } from "react";

function DialogueBox({ messages, onSend, isTyping, characterName }) {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 追蹤輸入法組字狀態
  const [isSending, setIsSending] = useState(false); // 防止重複送出
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === "" || isSending) return;

    setIsSending(true); // 防止重複送出
    const message = input.trim();
    setInput("");

    try {
      await onSend(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    // 只有在沒有組字狀態且按下Enter時才送出
    if (e.key === "Enter" && !isComposing && !e.shiftKey) {
      e.preventDefault(); // 防止換行
      handleSend();
    }
  };

  // 處理輸入法組字開始
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 處理輸入法組字結束
  const handleCompositionEnd = () => {
    setIsComposing(false);
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

        {/* 打字指示器 */}
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="max-w-[60%] px-4 py-3 rounded-2xl rounded-bl-none bg-gradient-to-r from-tropical/70 to-periwinkle/70 backdrop-blur-sm border border-white/30 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm">
                  {characterName || "角色"} 正在輸入
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}

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
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            disabled={isSending}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || isSending}
          className="px-8 py-3 bg-tropical text-white rounded-xl hover:bg-tropical/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-xl font-bold text-lg"
        >
          {isSending ? "送出中..." : "送出"}
        </button>
      </div>
    </div>
  );
}

export default DialogueBox;
