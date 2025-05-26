import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storyQuestions } from "../data/storyQuestions";
import { classifyByStory } from "../utils/classifyByStory";
import { motion, AnimatePresence } from "framer-motion";
import { loadCharacterInfo } from "../utils/loadCharacterInfo";

const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const scaleVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

function StoryFlow() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const timer = setTimeout(() => setStep(0), 6500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (updated.length === 3) {
      setIsLoading(true);
      const charId = classifyByStory(updated);
      loadCharacterInfo(charId).then((char) => {
        setCharacter(char);
        sessionStorage.setItem(
          "character_story_trigger_keywords",
          JSON.stringify(char.story_trigger_keywords)
        );
        sessionStorage.setItem(
          "character_story_trigger_response",
          char.story_trigger_response
        );
        setIsLoading(false);
        setStep(3);
        setTimeout(() => navigate("/chat"), 3500);
      });
    } else {
      setTimeout(() => setStep((prev) => prev + 1), 300);
    }
  };

  return (
    <div className="story-background">
      {/* 背景漸層 */}
      <div className="story-gradient-bg"></div>

      {/* 浮動裝飾元素 */}
      <div className="story-float-decorations">
        <div className="absolute top-16 left-8 w-20 h-20 bg-pink-200/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-24 left-1/4 w-12 h-12 bg-orange-200/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-16 right-1/3 w-14 h-14 bg-pink-300/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="story-container">
        <div
          className={`story-main-wrapper ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <AnimatePresence mode="wait">
            {/* 開場頁面 */}
            {step === -1 && (
              <motion.div
                key="opening"
                variants={fadeVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full flex items-center justify-center"
              >
                <div className="story-opening-card group">
                  {/* 圖標容器 */}
                  <div className="story-icon-container">
                    <div className="story-icon group-hover:rotate-12">
                      <img
                        src={`${import.meta.env.BASE_URL}plant-icon.png`}
                        alt="icon"
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="story-icon-dot group-hover:scale-110"></div>
                  </div>

                  <h2 className="story-title">歡迎來到『縫補星球』</h2>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">
                      先深深吸一口氣，再慢慢吐出來。
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base px-4">
                      在這裡，你不用逞強，也不必匆忙，
                      <br />
                      只要靜靜地，把自己交給接下來的故事就好。
                    </p>
                  </div>

                  <div className="story-intro-box">
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      ✨ 這裡住著八位小精靈，
                      <br />
                      他們會用不同的方式陪伴你，走過這段心靈旅程……
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 問題頁面 */}
            {step >= 0 && step <= 2 && (
              <motion.div
                key={`q${step}`}
                variants={scaleVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full flex items-center justify-center"
              >
                <div className="story-question-card">
                  {/* 進度條 */}
                  <div className="story-progress-bar">
                    <div
                      className="story-progress-fill"
                      style={{ width: `${((step + 1) / 3) * 100}%` }}
                    ></div>
                  </div>

                  {/* 問題頭部 */}
                  <div className="story-question-header">
                    <div className="story-question-number ">
                      <div className="story-number-badge align-middle">
                        <img
                          src={`${import.meta.env.BASE_URL}plant-icon.png`}
                          alt="icon"
                          className="w-8 h-8"
                        />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          問題 {step + 1}
                        </span>
                        <div className="story-number-divider"></div>
                      </div>
                    </div>

                    <div
                      className="story-question-text"
                      dangerouslySetInnerHTML={{
                        __html: storyQuestions[step].question.replace(
                          /\n/g,
                          "<br/>"
                        ),
                      }}
                    />
                  </div>

                  {/* 選項按鈕 */}
                  <div className="space-y-4">
                    {storyQuestions[step].options.map((opt, index) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="story-option-button group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="story-option-content">
                          <div className="story-option-dot group-hover:scale-110">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <span className="story-option-text">{opt.label}</span>
                        </div>

                        {/* 懸停光環效果 */}
                        <div className="story-option-glow group-hover:opacity-100"></div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 結果頁面 */}
            {step === 3 && (
              <motion.div
                key="result"
                variants={scaleVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="story-loading-card">
                    <div className="story-loading-spinner">
                      <div className="story-spinner-primary"></div>
                      <div className="story-spinner-secondary"></div>
                    </div>
                    <p className="text-gray-600 text-lg">
                      正在為你尋找最適合的夥伴...
                    </p>
                    <div className="story-loading-dots">
                      <div className="w-2 h-2 bg-tropical rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-periwinkle rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                ) : character ? (
                  <div className="story-result-card">
                    {/* 成功裝飾條 */}
                    <div className="story-success-bar"></div>

                    <div className="space-y-6">
                      {/* 角色頭像 */}
                      <div className="story-character-avatar group">
                        <div className="story-avatar-container">
                          <img
                            src={character.avatar}
                            alt={character.name}
                            className="story-avatar-image group-hover:scale-110"
                          />
                          {/* 漸層遮罩 */}
                          <div className="story-avatar-overlay group-hover:opacity-100"></div>
                        </div>

                        {/* 角色光環效果 */}
                        <div className="story-avatar-glow group-hover:opacity-100"></div>
                      </div>

                      {/* 角色信息 */}
                      <div className="space-y-4">
                        <h2 className="story-character-name">
                          {character.name} 正在等你……
                        </h2>

                        <div className="story-enter-hint">
                          <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                            🌟 準備進入聊天室，開始你的心靈之旅
                          </p>
                        </div>
                      </div>

                      {/* 進入提示 */}
                      <div className="story-enter-dots">
                        <div className="w-2 h-2 bg-tropical rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-periwinkle rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default StoryFlow;
