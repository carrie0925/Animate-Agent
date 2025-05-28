import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import StoryFlow from "./pages/StoryFlow";
import ChatRoom from "./pages/ChatRoom";
import FinalMessage from "./pages/FinalMessage";

function App() {
  useEffect(() => {
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envKey) {
      sessionStorage.setItem("openaiKey", envKey);
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/story" element={<StoryFlow />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/end" element={<FinalMessage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
