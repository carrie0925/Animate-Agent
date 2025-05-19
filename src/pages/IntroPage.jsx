// ✅ IntroPage.jsx
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-apricot flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mb-8 animate-fade-in">
        <div className="w-28 h-28 mb-4 rounded-full bg-indigo-100 flex items-center justify-center text-5xl shadow-inner">
          🌟
        </div>
        <h1 className="text-3xl font-bold text-indigo-700 mb-1">
          歡迎來到縫補計畫
        </h1>
        <p className="text-center text-gray-600 text-sm">
          在這裡，你將與一位理解你的動畫角色展開五輪對話，
          <br />
          並在最後收到一句專屬的鼓勵。
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl shadow-inner p-5 w-full max-w-md text-center mb-4">
        <p className="text-gray-700 font-medium leading-relaxed">
          💭 在開始之前，請先回答三個小問題，
          <br />
          幫助我們為你配對最合適的夥伴。
        </p>
      </div>

      <button
        onClick={() => navigate("/story")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition duration-300 animate-bounce-in"
      >
        ✨ 開始 →
      </button>
    </div>
  );
}

export default IntroPage;
