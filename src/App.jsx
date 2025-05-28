import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryFlow from "./pages/StoryFlow";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";
import { StoryGuard, ChatGuard, FinalGuard } from "./components/RouteGuard";

// 直接從環境變數設定 API key - 用戶無需輸入任何東西
const setApiKey = () => {
  if (typeof window !== "undefined") {
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("🔑 從環境變數設定 API key:", envKey ? "✅ 成功" : "❌ 失敗");

    if (envKey) {
      sessionStorage.setItem("openaiKey", envKey);
      console.log("✅ 用戶可以直接使用，無需任何輸入！");
    } else {
      console.error("❌ 未找到 API key，請檢查 GitHub Secrets 設定");
    }
  }
};

// 立即執行
setApiKey();

function App() {
  useEffect(() => {
    console.log("=== 縫補星球 App 載入 ===");
    console.log(
      "SessionStorage API key:",
      sessionStorage.getItem("openaiKey") ? "✅ 已設定" : "❌ 未設定"
    );

    // 確保 API key 已設定
    if (!sessionStorage.getItem("openaiKey")) {
      setApiKey();
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
