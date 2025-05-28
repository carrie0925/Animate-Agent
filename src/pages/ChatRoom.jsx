import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
import StoryTriggerButtons from "../components/StoryTriggerButtons";
import { fetchCharacterReply } from "../utils/chatAPI";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false); // 新增：打字狀態
  const [showFinalHint, setShowFinalHint] = useState(false); // 新增：顯示最終提示
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
    // Debug: 檢查 API key 狀態
    console.log("=== API Key Debug ===");
    console.log("Environment API Key:", import.meta.env.VITE_OPENAI_API_KEY);
    console.log("SessionStorage API Key:", sessionStorage.getItem("openaiKey"));
    console.log("Environment Keys:", Object.keys(import.meta.env));

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

    // 檢查並設定 API key
    let apiKey = sessionStorage.getItem("openaiKey");
    console.log("Initial apiKey from sessionStorage:", apiKey);

    if (!apiKey) {
      // 嘗試從環境變數重新取得
      const envKey = import.meta.env.VITE_OPENAI_API_KEY;
      console.log("Trying to get from environment:", envKey);

      if (envKey) {
        sessionStorage.setItem("openaiKey", envKey);
        apiKey = envKey;
        console.log("Successfully set API key from environment");
      } else {
        console.log("No API key found in environment, showing alert");
        alert("請先設定 OpenAI API 金鑰！");
        return;
      }
    }

    console.log("Final apiKey:", apiKey ? "存在" : "不存在");
    console.log("=====================");

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
      // 🟣 第五輪之後，先增加步數，然後顯示打字提示再補上角色總結語
      setStep(step + 1); // 先設為6，避免進度條顯示錯誤
      setIsTyping(true); // 開始顯示打字動畫

      // 延遲3秒後顯示總結語
      setTimeout(() => {
        setIsTyping(false); // 停止打字動畫

        const finalMessage = {
          role: "assistant",
          content:
            sessionStorage.getItem("character_final_encouragement") ||
            "謝謝你願意分享，記住你一直都不是孤單的，我會一直陪著你。",
        };
        const updatedWithFinal = [...updated, finalMessage];
        setMessages(updatedWithFinal);
        sessionStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedWithFinal)
        );

        // 顯示最終提示（閃爍動畫）
        setShowFinalHint(true);

        // 再延遲6秒後跳轉，給使用者閱讀總結語的時間
        setTimeout(() => navigate("/end"), 6000);
      }, 3000);
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
                {/* 在線狀態指示器 - 根據打字狀態變化 */}
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm transition-colors duration-300 ${
                    isTyping
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-green-400 animate-pulse"
                  }`}
                ></div>
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
                {/* 狀態指示器 - 根據打字狀態顯示不同文字 */}
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                    isTyping
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      isTyping ? "bg-yellow-400" : "bg-green-400"
                    }`}
                  ></span>
                  <span className="text-xs text-gray-600">
                    {isTyping ? "正在輸入..." : "在線"}
                  </span>
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
          <DialogueBox
            messages={messages}
            onSend={handleUserMessage}
            isTyping={isTyping} // 傳遞打字狀態給 DialogueBox
            characterName={characterName} // 傳遞角色名稱
          />
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
            {step <= totalSteps && !isTyping && !showFinalHint && (
              <div className="flex items-center justify-center mt-2">
                <span className="text-xs text-gray-500">
                  還有 {totalSteps - step + 1} 次對話機會
                </span>
              </div>
            )}

            {/* 打字狀態提示 - 更顯眼的位置和樣式 */}
            {isTyping && (
              <div className="flex items-center justify-center mt-3 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-sm text-yellow-700 font-medium animate-pulse">
                    {characterName} 正在輸入中...
                  </span>
                </div>
              </div>
            )}

            {/* 最終提示 - 閃爍動畫強調 */}
            {showFinalHint && (
              <div className="flex items-center justify-center mt-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">✨</span>
                  <span className="text-sm text-purple-700 font-medium animate-pulse">
                    {characterName} 還有話想跟你說...
                  </span>
                  <span className="text-2xl animate-bounce delay-300">💫</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
