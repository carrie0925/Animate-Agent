import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryFlow from "./pages/StoryFlow";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";
import { StoryGuard, ChatGuard, FinalGuard } from "./components/RouteGuard";

// 安全的 API key 設定方式
const setApiKey = () => {
  if (typeof window !== "undefined") {
    // 檢查是否已經有 API key
    const existingKey = sessionStorage.getItem("openaiKey");
    if (existingKey) {
      console.log("App.jsx - API key already exists");
      return;
    }

    // 嘗試從環境變數獲取（僅在開發環境）
    if (import.meta.env.DEV) {
      const envKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (envKey) {
        sessionStorage.setItem("openaiKey", envKey);
        console.log("App.jsx - API key set from environment (dev mode)");
        return;
      }
    }

    // 生產環境：提示用戶手動設定
    console.log("App.jsx - Production mode: API key needs to be set manually");

    // 可以顯示一個友善的提示，讓用戶知道需要設定 API key
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.8); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <div style="
          background: white; 
          padding: 2rem; 
          border-radius: 1rem; 
          max-width: 500px;
          text-align: center;
        ">
          <h2 style="margin-top: 0; color: #333;">🔑 需要設定 API Key</h2>
          <p style="color: #666; line-height: 1.6;">
            為了保護安全，請輸入您的 OpenAI API Key：
          </p>
          <input 
            type="password" 
            id="apiKeyInput" 
            placeholder="sk-..." 
            style="
              width: 100%; 
              padding: 0.75rem; 
              border: 2px solid #e5e5e5; 
              border-radius: 0.5rem;
              margin: 1rem 0;
              font-size: 1rem;
            "
          />
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="setApiKeyFromInput()" style="
              background: #4F46E5; 
              color: white; 
              border: none; 
              padding: 0.75rem 1.5rem; 
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
            ">確定</button>
          </div>
          <p style="font-size: 0.875rem; color: #999; margin-top: 1rem;">
            ⚠️ API Key 僅存儲在您的瀏覽器中，不會發送到其他地方
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 設定 API key 的函數
    window.setApiKeyFromInput = () => {
      const input = document.getElementById("apiKeyInput");
      const key = input.value.trim();

      if (key && key.startsWith("sk-")) {
        sessionStorage.setItem("openaiKey", key);
        document.body.removeChild(modal);
        console.log("App.jsx - API key set successfully by user");
        // 重新載入頁面以確保所有組件都能取到 API key
        window.location.reload();
      } else {
        alert("請輸入有效的 OpenAI API Key (以 sk- 開頭)");
      }
    };
  }
};

// 立即執行
setApiKey();

function App() {
  useEffect(() => {
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
