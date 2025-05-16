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
    <div className="min-h-screen p-4 pb-10">
      <h2 className="text-xl font-semibold mb-4">
        {characterName} 正在與你對話中
      </h2>
      <DialogueBox messages={messages} onSend={handleUserMessage} />
      <ProgressBar step={step} total={totalSteps} />
    </div>
  );
}

export default ChatRoom;
