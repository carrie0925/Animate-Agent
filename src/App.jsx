import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryChoice from "./pages/StoryChoice";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";

function App() {
  useEffect(() => {
    const storedKey = sessionStorage.getItem("openaiKey");

    if (!storedKey) {
      const envKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (envKey?.startsWith("sk-")) {
        sessionStorage.setItem("openaiKey", envKey);
      } else {
        const input = prompt("請輸入 OpenAI API 金鑰（測試用）：");
        if (input?.startsWith("sk-")) {
          sessionStorage.setItem("openaiKey", input);
        } else {
          alert("⚠️ 未輸入有效的 OpenAI Key，可能無法正常對話");
        }
      }
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/story" element={<StoryChoice />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/end" element={<FinalMessage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
