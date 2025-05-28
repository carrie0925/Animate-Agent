import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}characters.json`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setTimeout(() => setIsLoaded(true), 100);
      })
      .catch((err) => console.error("載入角色資料失敗", err));

    sessionStorage.setItem("visited_intro", "true");
  }, []);

  // const gridItems =
  //   characters.length === 8
  //     ? [
  //         ...characters.slice(0, 3),
  //         null,
  //         ...characters.slice(3, 6),
  //         null,
  //         ...characters.slice(6),
  //       ]
  //     : [];

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* 漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100"></div>

      {/* 浮動裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-20 h-20 bg-pink-200/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-24 left-1/4 w-12 h-12 bg-orange-200/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-16 right-1/3 w-14 h-14 bg-pink-300/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <div
          className={`flex flex-col gap-3 w-[95vw] max-w-[900px] h-[90vh] max-h-[700px] transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* 歡迎卡片 - 占據上方空間，減少高度 */}
          <div className="h-[45%]">
            <div
              className="group flex flex-col items-center justify-center py-4 px-6 text-center w-full h-full transform hover:scale-105 transition-all duration-500 animate-fade-in overflow-hidden"
              style={{ animationDelay: "400ms" }}
            >
              {/* 圖標容器 */}
              <div className="relative mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <img
                    src={`${import.meta.env.BASE_URL}plant-icon.png`}
                    alt="icon"
                    className="w-8 h-8"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full opacity-80 group-hover:scale-110 transition-transform duration-300"></div>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 leading-tight">
                歡迎來到縫補計畫
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4 text-sm lg:text-base px-4">
                在這裡，你將與一位理解你的角色展開五輪對話，並在最後收到一段他想對你說的話。
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border-l-4 border-purple-300 w-full max-w-lg">
                <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">
                  💭
                  在開始之前，請先回答三個小問題，幫助我們為你配對最合適的夥伴。
                </p>
              </div>

              <button
                onClick={() => navigate("/story")}
                className="group/btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 z-10 relative"
              >
                <span>✨ 開始心靈之旅</span>
                <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* 角色卡片區域 - 下方兩排各4個 */}
          <div className="h-[55%] flex flex-col gap-2">
            {/* 第一排 4個角色 */}
            <div className="grid grid-cols-4 gap-3 h-1/2">
              {characters.slice(0, 4).map((char, index) => (
                <div
                  key={char.character_id}
                  className="group relative w-full h-full animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full h-full rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl perspective transform hover:scale-105 transition-all duration-500 overflow-hidden border border-white/50">
                    <div className="relative w-full h-full duration-700 flip-card-inner">
                      {/* 正面 - 角色頭像 */}
                      <div className="absolute w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <img
                            src={char.avatar}
                            alt={char.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* 漸層遮罩 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* 角色名稱 */}
                          <div className="absolute bottom-1 left-1 right-1 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-1">
                            <p className="font-bold text-xs drop-shadow-lg truncate text-center bg-black/30 rounded px-1 py-0.5">
                              {char.name.split("–")[1] || char.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 背面 - 角色資訊 */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center text-center p-2 border border-indigo-100">
                        <div className="space-y-1 w-full">
                          <h3 className="font-bold text-indigo-800 text-xs leading-tight px-1">
                            {char.source}
                          </h3>
                          <p className="font-semibold text-purple-700 text-xs px-1 truncate">
                            {char.name.split("–")[1] || char.name}
                          </p>
                          <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-indigo-300 to-transparent mx-auto"></div>
                          <p className="text-xs text-gray-600 leading-tight px-1">
                            {char.personality.slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 角色光環效果 */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 -z-10 blur-sm"></div>
                </div>
              ))}
            </div>

            {/* 第二排 4個角色 */}
            <div className="grid grid-cols-4 gap-3 h-1/2">
              {characters.slice(4, 8).map((char, index) => (
                <div
                  key={char.character_id}
                  className="group relative w-full h-full animate-fade-in"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="relative w-full h-full rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl perspective transform hover:scale-105 transition-all duration-500 overflow-hidden border border-white/50">
                    <div className="relative w-full h-full duration-700 flip-card-inner">
                      {/* 正面 - 角色頭像 */}
                      <div className="absolute w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <img
                            src={char.avatar}
                            alt={char.name}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* 漸層遮罩 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* 角色名稱 */}
                          <div className="absolute bottom-1 left-1 right-1 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-1">
                            <p className="font-bold text-xs drop-shadow-lg truncate text-center bg-black/30 rounded px-1 py-0.5">
                              {char.name.split("–")[1] || char.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 背面 - 角色資訊 */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center text-center p-2 border border-indigo-100">
                        <div className="space-y-1 w-full">
                          <h3 className="font-bold text-indigo-800 text-xs leading-tight px-1">
                            {char.source}
                          </h3>
                          <p className="font-semibold text-purple-700 text-xs px-1 truncate">
                            {char.name.split("–")[1] || char.name}
                          </p>
                          <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-indigo-300 to-transparent mx-auto"></div>
                          <p className="text-xs text-gray-600 leading-tight px-1">
                            {char.personality.slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 角色光環效果 */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 -z-10 blur-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
