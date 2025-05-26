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
      setTimeout(() => navigate("/end"), 5000); // 延遲跳轉，給使用者閱讀時間
    }
  };

  const handleStoryTrigger = (keyword) => {
    const customPrompt = `使用者提到：「${keyword}」。請參考這段角色故事：「${storyResponse}」稍作改寫，並依照 ${characterName} 的語氣風格，給予帶有人物情感的第一句回應。`;
    handleUserMessage(keyword, customPrompt);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-periwinkle to-tropical text-white overflow-hidden">
      <div className="px-6 py-4 bg-white/90 shadow z-10">
        <div className="flex items-center gap-4">
          <img
            src={characterAvatar || "/default-avatar.png"}
            alt="角色頭像"
            className="w-16 h-16 rounded-full border object-cover bg-white"
          />
          <div>
            <h2 className="text-lg font-bold text-tropical">{characterName}</h2>
            <p className="text-sm font-medium text-tropical">
              {characterIntro}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              請直接輸入你最近的煩惱吧！你將有五次對話機會，{characterName}{" "}
              會陪你到最後。
            </p>
          </div>
        </div>
      </div>

      {/* trigger buttons 條件顯示 */}
      {messages.length === 0 && (
        <StoryTriggerButtons
          keywords={storyKeywords}
          onTrigger={handleStoryTrigger}
        />
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        <DialogueBox messages={messages} onSend={handleUserMessage} />
      </div>

      <div className="px-6 pb-4">
        <ProgressBar step={step} total={totalSteps} />
      </div>
    </div>
  );
}

export default ChatRoom;
