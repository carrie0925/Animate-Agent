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
    <div className="flex flex-col h-[calc(100vh-180px)] overflow-hidden">
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
              className={`max-w-[60%] px-4 py-3 rounded-2xl whitespace-pre-wrap leading-relaxed shadow
                ${
                  msg.role === "user"
                    ? "bg-white text-gray-900 rounded-br-none"
                    : "bg-white/20 text-white rounded-bl-none"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 輸入欄區 */}
      <div className="flex items-center gap-2 p-4 bg-transparent">
        <input
          className="flex-1 rounded-full px-4 py-2 text-gray-900 bg-white placeholder-gray-400 focus:outline-none"
          placeholder="請輸入訊息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          送出
        </button>
      </div>
    </div>
  );
}

export default DialogueBox;
