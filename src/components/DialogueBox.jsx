// src/components/DialogueBox.jsx
import { useState } from "react";

function DialogueBox({ messages, onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-indigo-100 text-indigo-900"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="請輸入訊息..."
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          送出
        </button>
      </div>
    </div>
  );
}

export default DialogueBox;
