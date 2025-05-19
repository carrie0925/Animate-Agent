// src/pages/IntroPage.jsx
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-white flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="bg-red-500 text-white p-4 rounded-xl shadow">
        ❤️ 現在真的該是紅色背景了！
      </div>

      {/* 角色頭像區塊 */}
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          歡迎來到縫補計畫
        </h1>
        <p className="text-center text-gray-600 text-sm">
          在這裡，你將與一位理解你的動畫角色展開五輪對話，並在最後收到一句專屬的鼓勵。
        </p>
      </div>

      {/* 開始說明卡片 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl shadow-inner p-4 w-full max-w-md text-center mb-4">
        <p className="text-gray-700 font-medium">
          開始前，請先回答三個小問題，幫助我們配對最適合你的角色。
        </p>
      </div>

      {/* 開始按鈕 */}
      <button
        onClick={() => navigate("/story")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition duration-300"
      >
        開始 →
      </button>
    </div>
  );
}

export default IntroPage;
