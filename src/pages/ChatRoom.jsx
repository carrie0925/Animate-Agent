import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
import StoryTriggerButtons from "../components/StoryTriggerButtons";
import { fetchCharacterReply } from "../utils/chatAPI";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const navigate = useNavigate();

  const characterId = sessionStorage.getItem("character_character_id");
  const characterName = sessionStorage.getItem("character_name");
  const characterIntro = sessionStorage.getItem("character_personality");
  const characterAvatar = sessionStorage.getItem("character_avatar");

  const storyKeywords = JSON.parse(
    sessionStorage.getItem("character_story_trigger_keywords") || "[]"
  );
  const storyResponse = sessionStorage.getItem(
    "character_story_trigger_response"
  );

  useEffect(() => {
    if (!characterId || !characterName) {
      alert("請先回答問題來配對角色！");
      navigate("/");
    }
  }, [characterId, characterName, navigate]);

  const handleUserMessage = async (userInput, customPrompt = null) => {
    const round = step;
    const backstory =
      sessionStorage.getItem("character_backstory")?.split("。") || [];

    let storyInsert = "";
    if ((round === 2 || round === 4) && backstory.length >= round - 2) {
      storyInsert = `（你可以適當分享這段你的經歷作為例子：「${
        backstory[round - 2]
      }。」）`;
    }

    const prompt =
      customPrompt ||
      `使用者說：「${userInput}」請依照 ${characterName} 的風格回應。${storyInsert}`;

    // 顯示給使用者的訊息（user bubble）
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    const apiKey = sessionStorage.getItem("openaiKey");
    if (!apiKey) {
      alert("請先設定 OpenAI API 金鑰！");
      return;
    }

    // 用完整提示語送出至 OpenAI 生成回應（包含風格與參考故事）
    const newMessages = [...messages, { role: "user", content: prompt }];
    const assistantReply = await fetchCharacterReply(newMessages, apiKey);

    // 更新對話框：包含使用者輸入與角色回覆
    const updated = [
      ...messages,
      { role: "user", content: userInput },
      { role: "assistant", content: assistantReply },
    ];
    setMessages(updated);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // 🟣 第五輪之後，自動補上角色總結語
      const finalMessage = {
        role: "assistant",
        content:
          sessionStorage.getItem("character_final_encouragement") ||
          "謝謝你願意分享，記住你一直都不是孤單的，我會一直陪著你。",
      };
      const updatedWithFinal = [...updated, finalMessage];
      setMessages(updatedWithFinal);
      sessionStorage.setItem("chatMessages", JSON.stringify(updatedWithFinal));
      setTimeout(() => navigate("/end"), 8000); // 延遲跳轉，給使用者閱讀時間
    }
  };

  const handleStoryTrigger = (keyword) => {
    const customPrompt = `使用者提到：「${keyword}」。請參考這段角色故事：「${storyResponse}」稍作改寫，並依照 ${characterName} 的語氣風格，給予帶有人物情感的第一句回應。`;
    handleUserMessage(keyword, customPrompt);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* 與其他頁面一致的漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100"></div>

      {/* 浮動裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-20 h-20 bg-pink-200/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-24 left-1/4 w-12 h-12 bg-orange-200/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-16 right-1/3 w-14 h-14 bg-pink-300/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen text-gray-800">
        {/* 角色信息頭部 */}
        <div className="px-6 py-4 bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/50">
          <div className="flex items-center gap-4">
            {/* 角色頭像 */}
            <div className="group relative">
              <div className="relative w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/50 overflow-hidden perspective transform hover:scale-105 transition-all duration-500">
                <img
                  src={characterAvatar || "/default-avatar.png"}
                  alt="角色頭像"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                />
                {/* 在線狀態指示器 */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              {/* 角色光環效果 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-tropical/30 via-periwinkle/30 to-pink-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
            </div>

            {/* 角色信息 */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold bg-gradient-to-r from-tropical to-periwinkle bg-clip-text text-transparent">
                  {characterName}
                </h2>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full border border-green-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-gray-600">在線</span>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-700 leading-relaxed">
                {characterIntro}
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-l-4 border-periwinkle">
                <p className="text-xs text-gray-600 leading-relaxed">
                  💭 請直接輸入你最近的煩惱吧！你將有五次對話機會，
                  {characterName} 會陪你到最後。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 故事觸發按鈕 - 條件顯示 */}
        {messages.length === 0 && (
          <div className="px-4 py-2">
            <StoryTriggerButtons
              keywords={storyKeywords}
              onTrigger={handleStoryTrigger}
            />
          </div>
        )}

        {/* 對話區域 */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <DialogueBox messages={messages} onSend={handleUserMessage} />
        </div>

        {/* 進度條區域 */}
        <div className="px-6 pb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
            {/* 進度指示文字 */}
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-xs text-gray-600">對話進度</span>
              <span className="text-xs text-tropical font-medium">
                {step}/{totalSteps} 輪
              </span>
            </div>

            <ProgressBar step={step} total={totalSteps} />

            {/* 剩餘對話提示 */}
            {step <= totalSteps && (
              <div className="flex items-center justify-center mt-2">
                <span className="text-xs text-gray-500">
                  還有 {totalSteps - step + 1} 次對話機會
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
