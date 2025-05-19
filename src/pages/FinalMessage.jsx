import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacterReply } from "../utils/chatAPI";
import { generateSummaryPrompt } from "../utils/summaryPrompt";

function FinalMessage() {
  const [summary, setSummary] = useState("產生中...");
  const navigate = useNavigate();

  const characterName = sessionStorage.getItem("character_name") || "這位角色";
  const characterAvatar =
    sessionStorage.getItem("character_avatar") || "/default-avatar.png";
  const characterId = sessionStorage.getItem("character_id") || "角色";

  useEffect(() => {
    const messages = JSON.parse(sessionStorage.getItem("chatMessages") || "[]");
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
    <div className="min-h-screen bg-tropical text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 border border-white/30 rounded-3xl shadow-xl p-8 max-w-xl w-full text-center space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <img
            src={characterAvatar}
            alt="角色頭像"
            className="w-24 h-24 rounded-full border-2 border-white object-cover"
          />
          <h1 className="text-2xl font-bold">{characterName} 想送給你的話</h1>
        </div>

        <p className="text-lg leading-relaxed whitespace-pre-wrap">{summary}</p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-block border border-white px-6 py-2 rounded-full text-white hover:bg-white hover:text-tropical transition"
        >
          回到首頁
        </button>
      </div>
    </div>
  );
}

export default FinalMessage;
