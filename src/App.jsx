import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryFlow from "./pages/StoryFlow";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";
import { StoryGuard, ChatGuard, FinalGuard } from "./components/RouteGuard";

// 強制在模組載入時設定 API key
const setApiKey = () => {
  if (typeof window !== "undefined") {
    // 清除可能的舊快取
    sessionStorage.removeItem("openaiKey");

    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("App.jsx - Environment API Key:", envKey ? "存在" : "不存在");
    console.log("App.jsx - All env keys:", Object.keys(import.meta.env));

    if (envKey) {
      sessionStorage.setItem("openaiKey", envKey);
      console.log("App.jsx - API key set successfully");
    } else {
      console.error("App.jsx - No API key found in environment!");
    }
  }
};

// 立即執行
setApiKey();

function App() {
  useEffect(() => {
    // 雙重保險：組件掛載時再次檢查
    setApiKey();

    // 每秒檢查一次，確保 API key 存在（調試用）
    const interval = setInterval(() => {
      const key = sessionStorage.getItem("openaiKey");
      if (!key) {
        console.log("App.jsx - API key missing, attempting to reset");
        setApiKey();
      }
    }, 1000);

    // 10秒後停止檢查
    setTimeout(() => clearInterval(interval), 10000);

    return () => clearInterval(interval);
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
