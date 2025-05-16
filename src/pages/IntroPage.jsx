// src/pages/IntroPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCharacter() {
      const res = await fetch("/data/characters.json");
      const data = await res.json();

      // 模擬使用者分類結果：目前選擇辛梅爾
      const selectedId = sessionStorage.getItem("characterId") || "simmel";
      const found = data.find((char) => char.id === selectedId);
      setCharacter(found);
    }

    loadCharacter();
  }, []);

  if (!character) return <div>載入中...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-gray-800">
      <img
        src={character.avatar}
        alt={character.name}
        className="w-40 h-40 rounded-full shadow-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
      <p className="text-sm text-gray-600 mb-4">{character.personality}</p>
      <div className="bg-white shadow p-4 rounded-xl max-w-md text-center mb-6">
        <p>{character.greeting}</p>
      </div>
      <button
        onClick={() => navigate("/story")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-lg shadow"
      >
        開始對話 →
      </button>
    </div>
  );
}

export default IntroPage;
