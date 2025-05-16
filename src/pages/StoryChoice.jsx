// src/pages/StoryChoice.jsx
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

  const handleSubmit = () => {
    if (Object.keys(answers).length < 3) {
      alert("請完成所有題目！");
      return;
    }

    // 假設 classifyUser 回傳格式為 { characterId: "simmel", characterName: "辛梅爾" }
    const { characterId, characterName } = classifyUser([
      answers.q1,
      answers.q2,
      answers.q3,
    ]);

    sessionStorage.setItem("characterId", characterId);
    sessionStorage.setItem("characterName", characterName);
    navigate("/chat");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        開始前，請先回答以下問題
      </h1>
      {storyQuestions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-2">{q.question}</p>
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
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded-full mt-4 w-full"
      >
        配對角色並開始對話 →
      </button>
    </div>
  );
}

export default StoryChoice;
