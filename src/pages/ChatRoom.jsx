// src/pages/ChatRoom.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
import { fetchCharacterReply } from "../utils/chatAPI";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 5;

  const characterId = sessionStorage.getItem("characterId");
  const characterName = sessionStorage.getItem("characterName");
  const characterIntro = sessionStorage.getItem("characterIntro");
  const characterAvatar = sessionStorage.getItem("characterAvatar");

  useEffect(() => {
    if (!characterId || !characterName) {
      alert("請先回答問題來配對角色！");
      navigate("/");
    }
  }, [characterId, characterName, navigate]);

  const handleUserMessage = async (userInput) => {
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);

    const assistantReply = await fetchCharacterReply(newMessages);
    const updated = [
      ...newMessages,
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
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* 角色介紹卡 */}
      <div className="flex items-center gap-4 mb-4 bg-white shadow rounded-xl p-4">
        <img
          src={characterAvatar || "/default-avatar.png"}
          alt="角色頭像"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold text-indigo-700">{characterName}</h2>
          <p className="text-sm text-gray-600">{characterIntro}</p>
        </div>
      </div>

      {/* 對話框區塊 */}
      <DialogueBox messages={messages} onSend={handleUserMessage} />

      {/* 進度條 */}
      <ProgressBar step={step} total={totalSteps} />
    </div>
  );
}

export default ChatRoom;
