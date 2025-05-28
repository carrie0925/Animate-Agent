import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryFlow from "./pages/StoryFlow";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";
import { StoryGuard, ChatGuard, FinalGuard } from "./components/RouteGuard";

// 在模組載入時就設定 API key
const envKey = import.meta.env.VITE_OPENAI_API_KEY;
if (envKey && typeof window !== "undefined") {
  sessionStorage.setItem("openaiKey", envKey);
}

function App() {
  useEffect(() => {
    // 雙重保險：確保 API key 有設定
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envKey && !sessionStorage.getItem("openaiKey")) {
      sessionStorage.setItem("openaiKey", envKey);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route
          path="/story"
          element={
            <StoryGuard>
              <StoryFlow />
            </StoryGuard>
          }
        />
        <Route
          path="/chat"
          element={
            <ChatGuard>
              <ChatRoom />
            </ChatGuard>
          }
        />
        <Route
          path="/end"
          element={
            <FinalGuard>
              <FinalMessage />
            </FinalGuard>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
