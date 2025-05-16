// src/pages/IntroPage.jsx
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-gray-800">
      <img
        src="/default-avatar.png"
        alt="歡迎角色"
        className="w-40 h-40 rounded-full shadow-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">歡迎來到縫補計畫</h1>
      <p className="text-sm text-gray-600 mb-4">
        在這裡，你將與一位理解你的角色展開五輪對話
      </p>
      <div className="bg-white shadow p-4 rounded-xl max-w-md text-center mb-6">
        <p>開始前請先回答三個小問題，我們會幫你配對一位最適合的角色。</p>
      </div>
      <button
        onClick={() => navigate("/story")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-lg shadow"
      >
        開始 →
      </button>
    </div>
  );
}

export default IntroPage;
