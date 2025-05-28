// src/components/RouteGuard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 檢查流程完整性的工具函數
const checkFlowIntegrity = () => {
  const characterId = sessionStorage.getItem("character_character_id");
  const characterName = sessionStorage.getItem("character_name");
  const hasAnswers = sessionStorage.getItem("user_answers"); // 需要在 StoryFlow 中設定

  return {
    hasCompletedTest: !!hasAnswers,
    hasCharacterMatch: !!(characterId && characterName),
  };
};

// StoryFlow 路由守衛 - 確保從首頁進入
export function StoryGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查是否有訪問過首頁的標記
    const hasVisitedIntro = sessionStorage.getItem("visited_intro");
    if (!hasVisitedIntro) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return children;
}

// ChatRoom 路由守衛 - 確保完成測驗和配對
export function ChatGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const { hasCompletedTest, hasCharacterMatch } = checkFlowIntegrity();

    if (!hasCompletedTest) {
      // 沒有完成測驗，回到首頁
      navigate("/", { replace: true });
    } else if (!hasCharacterMatch) {
      // 完成測驗但沒有角色配對，回到測驗頁面
      navigate("/story", { replace: true });
    }
  }, [navigate]);

  return children;
}

// FinalMessage 路由守衛 - 確保完成對話
export function FinalGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const { hasCharacterMatch } = checkFlowIntegrity();
    const chatMessages = sessionStorage.getItem("chatMessages");

    if (!hasCharacterMatch) {
      navigate("/", { replace: true });
    } else if (!chatMessages) {
      // 沒有對話記錄，跳轉到聊天室
      navigate("/chat", { replace: true });
    }
  }, [navigate]);

  return children;
}
