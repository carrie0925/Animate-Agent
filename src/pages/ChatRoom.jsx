// src/pages/ChatRoom.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
import { fetchCharacterReply } from "../utils/chatAPI";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 5;

  const handleUserMessage = async (userInput) => {
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);

    const apiKey = sessionStorage.getItem("openaiKey");
    if (!apiKey) {
      alert("請先設定 OpenAI API 金鑰！");
      return;
    }

    const assistantReply = await fetchCharacterReply(newMessages, apiKey);
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
      <DialogueBox messages={messages} onSend={handleUserMessage} />
      <ProgressBar step={step} total={totalSteps} />
    </div>
  );
}

export default ChatRoom;
