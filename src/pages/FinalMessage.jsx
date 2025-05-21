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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E3] to-[#FFD8BE] flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-[#FFF9F4] rounded-2xl shadow-lg border border-[#f5e6d5] max-w-xl w-full px-8 py-10 text-center space-y-6">
        {/* 頭像與角色名 */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={characterAvatar}
            alt="角色頭像"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <p className="text-sm text-[#a58a74]">來自</p>
            <h1 className="text-xl font-bold text-[#5a4634]">
              {characterName} 想送給你的話
            </h1>
          </div>
        </div>

        {/* 鼓勵文字 */}
        <p className="text-[#6b4f3f] text-base leading-relaxed whitespace-pre-wrap font-light">
          {summary}
        </p>

        {/* 回到首頁按鈕 */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#FFB088] text-white px-6 py-2 rounded-full hover:bg-[#ffa174] transition font-medium"
        >
          ⬅ 回到首頁
        </button>
      </div>
    </div>
  );
}

export default FinalMessage;
