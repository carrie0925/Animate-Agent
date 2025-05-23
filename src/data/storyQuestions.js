// src/data/storyQuestions.js
export const storyQuestions = [
  {
    id: "q1",
    question:
      "你在漫長的流星雨中墜落，一身塵土地醒來。面前，是四道發著微光的小徑。這時，一位神祕旅人走向你，低聲問道：\n<span class='font-semibold text-indigo-900'>「你現在最想踏進哪一條路？」</span>",
    options: [
      {
        label: " 🛖 通往湖畔木屋的路，感覺那裡會有篝火與溫暖的擁抱",
        value: "comfort",
      },
      {
        label: " 🏔 那條直達山頂的路，看起來雖然有挑戰性但能眺望遠方",
        value: "action",
      },
      {
        label: " 🍃 森林深處那條青苔小路，或許有人在那等待聆聽",
        value: "listen",
      },
      {
        label: " 🎠 咦，竟然有旋轉木馬？那條通往遊樂場的路看起來好有趣！",
        value: "fun",
      },
    ],
  },
  {
    id: "q2",
    question:
      "經過長路，你來到一條閃著藍銀光芒的月光河。渡船夫說：「你只能渡過這條河一次，會帶你到一個能稍作停留的空間。」\n<span class='font-semibold text-indigo-900'>「你會選擇哪種交通工具？」</span>",
    options: [
      {
        label: " ⛵️ 木槳船，有位熟悉的人靜靜坐在我身邊，傾聽我說話且不打斷",
        value: "empathy",
      },
      {
        label: " 🛶 小舟，船身刻著：『你很勇敢』，有人幫我握著舵",
        value: "encourage",
      },
      {
        label: " 🛥 水上研究艙，有指南和日誌，讓我慢慢分析這趟旅程的起點和終點",
        value: "analyze",
      },
      {
        label: " 🎈 一艘漂浮的夢幻熱氣球，我會以畫或比喻說出這趟旅程的感受",
        value: "metaphor",
      },
    ],
  },
  {
    id: "q3",
    question:
      "渡過河之後，你抵達一座懸浮島，突然有神秘旅人又出現在你面前。他說，每個人都會從這趟星球旅行帶走一個禮物。\n<span class='font-semibold text-indigo-900'>「你希望自己在這趟旅程中，獲得什麼？」</span>",
    options: [
      { label: " 🫂 一份無須解釋的理解與陪伴", value: "care" },
      { label: " 🔥 重新燃起的力量與希望", value: "power" },
      { label: " 🧩 讓心裡那團亂麻，終於慢慢釐清的安定", value: "clarity" },
      {
        label: " 🎇 回憶起自己真正渴望的是什麼，那份純真的初衷",
        value: "dream",
      },
    ],
  },
];
