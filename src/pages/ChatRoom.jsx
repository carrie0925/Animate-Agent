// src/pages/ChatRoom.jsx
import { useState } from "react";
import DialogueBox from "../components/DialogueBox";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 5;

  const handleUserMessage = (userInput) => {
    const newMessages = [...messages, { role: "user", content: userInput }];

    // ⛳️ 模擬角色回應
    const fakeReply = {
      role: "assistant",
      content: `（模擬回應）我理解你的感受，謝謝你願意說出來。`,
    };

    setMessages([...newMessages, fakeReply]);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // 🧠 對話結束，前往總結頁
      sessionStorage.setItem(
        "chatMessages",
        JSON.stringify([...newMessages, fakeReply])
      );
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
