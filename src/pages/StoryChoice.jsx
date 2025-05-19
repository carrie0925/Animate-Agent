import { useState } from "react";
import { storyQuestions } from "../data/storyQuestions";
import { classifyUser } from "../utils/classifyUser";
import { useNavigate } from "react-router-dom";

function StoryChoice() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    const { q1, q2, q3 } = answers;

    if (!q1 || !q2 || !q3) {
      alert("請完成所有題目來配對角色！");
      return;
    }

    try {
      const character = await classifyUser([q1, q2, q3]);

      if (!character) {
        alert("無法找到符合條件的角色，請重新回答問題。");
        return;
      }

      Object.entries(character).forEach(([key, value]) => {
        sessionStorage.setItem(`character_${key}`, value);
      });

      navigate("/chat");
    } catch (error) {
      console.error("配對角色時發生錯誤：", error);
      alert("配對角色時發生錯誤，請稍後再試！");
    }
  };

  return (
    <div className="min-h-screen bg-apricot flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-800">
          開始前，請先回答以下問題
        </h1>
        {storyQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <p className="font-semibold mb-2 text-gray-700">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => handleSelect(q.id, opt.value)}
                  />
                  <span className="text-gray-800">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-tropical text-white py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          配對角色並開始對話 →
        </button>
      </div>
    </div>
  );
}

export default StoryChoice;
