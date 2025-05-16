// src/pages/FinalMessage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacterReply } from "../utils/chatAPI";
import { generateSummaryPrompt } from "../utils/summaryPrompt";

function FinalMessage() {
  const [summary, setSummary] = useState("產生中...");
  const navigate = useNavigate();

  useEffect(() => {
    const messages = JSON.parse(sessionStorage.getItem("chatMessages") || "[]");
    const characterId = sessionStorage.getItem("characterId") || "角色";
    const apiKey = sessionStorage.getItem("openaiKey");

    if (!apiKey) {
      alert("請先設定 OpenAI API 金鑰！");
      return;
    }

    const prompt = generateSummaryPrompt(messages, characterId);

    fetchCharacterReply(prompt, apiKey).then((res) => {
      setSummary(res);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">來自角色的鼓勵語</h1>
      <p className="text-lg bg-indigo-50 border rounded-xl p-6 max-w-xl shadow">
        {summary}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 text-indigo-600 underline"
      >
        回到首頁
      </button>
    </div>
  );
}

export default FinalMessage;
