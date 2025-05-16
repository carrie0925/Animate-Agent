import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import StoryChoice from "./pages/storyChoice";
import ChatRoom from "./pages/ChatRoom";

function App() {
  useEffect(() => {
    const storedKey = sessionStorage.getItem("openaiKey");
    if (!storedKey) {
      const input = prompt("請輸入 OpenAI API 金鑰（測試用）：");
      if (input) {
        sessionStorage.setItem("openaiKey", input);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/story" element={<StoryChoice />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
