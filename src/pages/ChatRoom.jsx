import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
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

  useEffect(() => {
    if (!characterId || !characterName) {
      alert("請先回答問題來配對角色！");
      navigate("/");
    }
  }, [characterId, characterName, navigate]);

  const handleUserMessage = async (userInput) => {
    const round = step;
    const backstory =
      sessionStorage.getItem("character_backstory")?.split("。") || [];

    let storyInsert = "";
    if ((round === 2 || round === 4) && backstory.length >= round - 2) {
      storyInsert = `（你可以適當分享這段你的經歷作為例子：「${
        backstory[round - 2]
      }。」）`;
    }

    const prompt = `使用者說：「${userInput}」請依照 ${characterName} 的風格回應。${storyInsert}`;
    const newMessages = [...messages, { role: "user", content: prompt }];

    setMessages([...messages, { role: "user", content: userInput }]); // 顯示原始內容

    const apiKey = sessionStorage.getItem("openaiKey");
    if (!apiKey) {
      alert("請先設定 OpenAI API 金鑰！");
      return;
    }

    const assistantReply = await fetchCharacterReply(newMessages, apiKey);
    const updated = [
      ...messages,
      { role: "user", content: userInput },
      { role: "assistant", content: assistantReply },
    ];
    setMessages(updated);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      sessionStorage.setItem("chatMessages", JSON.stringify(updated));
      navigate("/end");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-periwinkle to-tropical text-white overflow-hidden">
      {/* 角色頭像與介紹卡片 */}
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

      {/* 對話區與輸入框 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <DialogueBox messages={messages} onSend={handleUserMessage} />
      </div>

      {/* 底部進度條 */}
      <div className="px-6 pb-4">
        <ProgressBar step={step} total={totalSteps} />
      </div>
    </div>
  );
}

export default ChatRoom;
