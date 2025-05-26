import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacterReply } from "../utils/chatAPI";
import { generateSummaryPrompt } from "../utils/summaryPrompt";

function FinalMessage() {
  const [summary, setSummary] = useState("產生中...");
  const [character, setCharacter] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const characterName = sessionStorage.getItem("character_name") || "這位角色";
  const characterAvatar =
    sessionStorage.getItem("character_avatar") || "/default-avatar.png";
  const characterId = sessionStorage.getItem("character_character_id") || "A";

  // 封面圖映射
  const getCoverImage = (source) => {
    const coverMap = {
      "《葬送的芙莉蓮》": "./assets/covers/frieren.png",
      "《排球少年!!》": "./assets/covers/haikyuu.png",
      "《驀然回首》": "./assets/covers/lookback.png",
      "《鬼滅之刃》": "./assets/covers/demon-slayer.png",
      "《SPY×FAMILY 間諜家家酒》": "./assets/covers/spy-family.png",
      "《我的英雄學院》": "./assets/covers/my-hero.png",
      "《進擊的巨人》": "./assets/covers/attack-titan.png",
      "《黑執事》": "./assets/covers/black-butler.png",
    };
    return coverMap[source] || "./assets/covers/default.png";
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);

    fetch(`${import.meta.env.BASE_URL}characters.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundCharacter = data.find(
          (char) => char.character_id === characterId
        );
        setCharacter(foundCharacter);
      })
      .catch((err) => console.error("載入角色資料失敗", err));

    const messages = JSON.parse(sessionStorage.getItem("chatMessages") || "[]");
    const apiKey = sessionStorage.getItem("openaiKey");

    if (!apiKey) {
      alert("請先設定 OpenAI API 金鑰！");
      return;
    }

    if (messages.length > 0) {
      const prompt = generateSummaryPrompt(messages, { name: characterName });
      fetchCharacterReply(prompt, apiKey).then((res) => {
        setSummary(res);
      });
    }
  }, [characterId, characterName]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100"></div>

      {/* 浮動裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-20 h-20 bg-pink-200/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-24 left-1/4 w-12 h-12 bg-orange-200/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-16 right-1/3 w-14 h-14 bg-pink-300/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 h-screen p-4">
        <div
          className={`h-full max-w-4xl mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* 兩行布局：第一行合併，第二行推薦作品 */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {/* 第一行：合併的角色信息和話語區塊 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 text-center group hover:shadow-2xl transition-all duration-500 animate-fade-in">
              <div className="h-full flex flex-col justify-center space-y-3">
                {/* 角色頭像和基本信息 */}
                <div className="space-y-2">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="relative w-full h-full rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/50 overflow-hidden perspective transform group-hover:scale-105 transition-all duration-500">
                      <img
                        src={characterAvatar}
                        alt="角色頭像"
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-tropical/30 via-periwinkle/30 to-pink-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm animate-pulse-slow"></div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-light">來自</p>
                    <h1 className="text-base font-bold bg-gradient-to-r from-tropical to-periwinkle bg-clip-text text-transparent leading-tight">
                      {characterName}
                    </h1>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-tropical to-periwinkle mx-auto"></div>
                  </div>
                </div>

                {/* 角色的話語 - 整合標題到容器內 */}
                <div className="bg-gradient-to-r from-tropical/10 to-periwinkle/10 rounded-xl p-4 border border-tropical/20">
                  {/* 想送給你的話標題 - 移到容器內 */}
                  <p className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-2 mb-3">
                    <span>✨</span>
                    想送給你的話
                  </p>

                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium italic">
                    「
                    {summary === "產生中..."
                      ? "正在為你準備專屬的話語..."
                      : summary}
                    」
                  </p>
                </div>
              </div>
            </div>

            {/* 第二行：推薦作品 */}
            {character && (
              <div
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 group hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 h-full">
                  <div className="flex gap-4 items-center h-full">
                    {/* 封面圖 */}
                    <div className="w-24 h-32 flex-shrink-0">
                      <img
                        src={getCoverImage(character.source)}
                        alt={`${character.source} 封面`}
                        className="w-full h-full object-cover rounded-lg border border-white shadow-lg"
                        onError={(e) => {
                          e.target.src = "./assets/covers/default.png";
                        }}
                      />
                    </div>

                    {/* 作品內容 */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-tropical mb-3">
                        {character.source}
                      </h4>

                      {/* 故事背景 */}
                      <div className="bg-white/80 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">
                          📖 故事描述
                        </h5>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {character.story_summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右下角小圖標按鈕 - 獨立於網格外 */}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-tropical to-periwinkle text-white rounded-full hover:from-tropical/90 hover:to-periwinkle/90 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl flex items-center justify-center group animate-fade-in z-20"
        style={{ animationDelay: "400ms" }}
        title="回到首頁"
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
          🏠
        </span>
      </button>
    </div>
  );
}

export default FinalMessage;
