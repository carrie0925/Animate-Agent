import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyQuestions } from "../data/storyQuestions";
import { classifyByStory } from "../utils/classifyByStory";
import { motion, AnimatePresence } from "framer-motion";
import { loadCharacterInfo } from "../utils/loadCharacterInfo";

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function StoryFlow() {
  const [step, setStep] = useState(-1); // -1: Opening, 0~2: Questions, 3: Result
  const [answers, setAnswers] = useState([]);
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setStep(0), 7500); // 開場動畫停留 3 秒
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (updated.length === 3) {
      const charId = classifyByStory(updated);
      loadCharacterInfo(charId).then((char) => {
        setCharacter(char);
        setStep(3); // 顯示角色
        setTimeout(() => navigate("/chat"), 3500);
      });
    } else {
      setTimeout(() => setStep((prev) => prev + 1), 300);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === -1 && (
          <motion.div
            key="opening"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center text-xl text-gray-700 max-w-lg"
          >
            <div className="bg-white rounded-2xl shadow-md px-6 py-6 max-w-lg text-center space-y-5">
              <p className="text-indigo-900 text-[17px] leading-relaxed font-bold">
                歡迎來到『縫補星球』。
                <br />
                先深深吸一口氣，再慢慢吐出來。
                <br />
                在這裡，你不用逞強，也不必匆忙，
                <br />
                只要靜靜地，把自己交給接下來的故事就好。
              </p>
              <p className="text-sm text-[#7A5C45] font-light leading-snug tracking-wide">
                這裡住著八位小精靈，
                <br />
                他們會用不同的方式陪伴你，走過這段心靈旅程……
              </p>
            </div>
          </motion.div>
        )}

        {step >= 0 && step <= 2 && (
          <motion.div
            key={`q${step}`}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full"
          >
            <h2 className="text-xl font-bold text-indigo-800 mb-4">
              {storyQuestions[step].question}
            </h2>
            <div className="space-y-3">
              {storyQuestions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="block w-full px-4 py-3 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-gray-700 text-left shadow"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && character && (
          <motion.div
            key="result"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center"
          >
            <img
              src={character.avatar}
              alt={character.name}
              className="w-40 h-40 rounded-full shadow-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-indigo-700">
              {character.name} 正在等你……
            </h2>
            <p className="text-gray-600 mt-2">準備進入聊天室中</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StoryFlow;
