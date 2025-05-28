# 🌟 縫補星球 (Mending Planet)

> 用技術縫補心靈，用陪伴點亮希望 ✨

一個基於 React 和 OpenAI API 的心靈療癒互動應用，讓用戶與八位精心設計的動漫角色進行深度對話，在溫暖的陪伴中找到內心的平靜與力量。

## 🎮 立即體驗

**👉 [點擊這裡開始你的心靈之旅](https://carrie0925.github.io/Animate-Agent/)**

_無需註冊，無需下載，直接在瀏覽器中開始你的專屬療癒體驗_

---

## ✨ 核心特色

### 🎭 八位專屬心靈夥伴

- **精心設計的動漫角色**，來自《葬送的芙莉蓮》、《排球少年!!》、《鬼滅之刃》等熱門作品
- **獨特的個性和背景故事**，每位角色都有專屬的對話風格和陪伴方式
- **多元化情感支持**：溫柔傾聽、積極鼓勵、理性分析、深度共鳴

### 🧠 智能心理配對

- **3 道心理測驗**，深入了解你的情感需求和個性特質
- **AI 智能配對算法**，為你找到最適合的陪伴角色
- **個人化體驗**，每次配對都是獨一無二的心靈相遇

### 💬 五輪深度對話

- **結構化對話流程**，循序漸進深入內心世界
- **GPT 驅動的自然對話**，流暢真實的互動體驗
- **角色故事分享**，在特定時刻獲得角色的親身經歷和感悟
- **跨平台輸入優化**，完美支援 Mac 和 Windows 的中文輸入

### 🎨 沉浸式視覺體驗

- **溫暖漸層設計**，舒緩的橘粉紫色調營造治癒氛圍
- **玻璃擬態效果**，現代簡約的視覺語言
- **流暢動畫交互**，每個細節都經過精心打磨
- **響應式適配**，在任何設備上都有完美體驗

### 📚 作品世界探索

- **角色原作推薦**，深入了解角色背景故事
- **精美作品介紹**，發現更多療癒內容
- **延伸閱讀建議**，讓溫暖延續在日常生活中

---

## 🛠 技術架構

### 前端技術棧

- **React 18** - 現代化前端框架
- **React Router** - 流暢的頁面路由
- **Tailwind CSS** - 原子化 CSS 框架
- **Framer Motion** - 高品質動畫效果
- **Vite** - 極速構建工具

### 核心功能模組

```
🧠 智能配對系統      ← classifyByStory.js
🤖 AI對話引擎        ← chatAPI.js
👥 角色管理系統      ← loadCharacterInfo.js
📝 個人化訊息生成    ← summaryPrompt.js
```

### 資料與狀態管理

- **角色配置檔** - 完整的人物設定和對話模板
- **心理測驗系統** - 科學的配對問題設計
- **Session Storage** - 無縫的用戶體驗狀態管理

---

## 📁 專案結構

```
src/
├── 🧩 components/              # 可重用組件
│   ├── DialogueBox.jsx           # 智能對話框
│   ├── ProgressBar.jsx           # 美化進度條
│   └── StoryTriggerButtons.jsx   # 故事觸發器
├── 📄 pages/                   # 核心頁面
│   ├── IntroPage.jsx             # 溫暖歡迎頁
│   ├── StoryFlow.jsx             # 心理測驗流程
│   ├── ChatRoom.jsx              # 對話互動空間
│   └── FinalMessage.jsx          # 專屬訊息展示
├── 📊 data/                    # 配置資料
│   └── storyQuestions.js         # 心理測驗題庫
├── 🔧 utils/                   # 工具函數
│   ├── classifyByStory.js        # 智能配對算法
│   ├── chatAPI.js                # OpenAI API集成
│   ├── loadCharacterInfo.js      # 角色資料載入
│   └── summaryPrompt.js          # 訊息生成邏輯
└── 🎨 styles/                  # 視覺樣式
    └── index.css                 # 全局樣式定義
```

---

## 🚀 快速開始

### 環境準備

- **Node.js** 16.0.0+
- **npm** 或 **yarn**
- **OpenAI API Key**

### 安裝步驟

1. **📥 克隆專案**

```bash
git clone https://github.com/carrie0925/Animate-Agent.git
cd Animate-Agent
```

2. **📦 安裝依賴**

```bash
npm install
# 或使用 yarn
yarn install
```

3. **🔑 配置 API 金鑰**

```bash
# 創建 .env 檔案
echo "VITE_OPENAI_API_KEY=your_openai_api_key_here" > .env
```

4. **🖼️ 準備資源檔案**
   確保 `public/assets/` 目錄包含所需圖片：

```
public/assets/
├── 🌱 plant-icon.png          # 應用圖標
└── 📚 covers/                 # 作品封面
    ├── frieren.jpg
    ├── haikyuu.jpg
    ├── lookback.jpg
    ├── demon-slayer.jpg
    ├── spy-family.jpg
    ├── my-hero.jpg
    ├── attack-titan.jpg
    ├── black-butler.jpg
    └── default.jpg
```

5. **🚀 啟動開發**

```bash
npm run dev
# 或
yarn dev
```

6. **📦 生產構建**

```bash
npm run build
# 或
yarn build
```

---

## 🎯 用戶旅程

```
🏠 溫暖歡迎
    ↓
🧠 心理測驗 (3題)
    ↓
🎭 智能配對
    ↓
💬 深度對話 (5輪)
    ↓
✨ 專屬鼓勵
    ↓
📚 作品探索
```

### 詳細流程

1. **🌟 溫暖歡迎** - 認識八位心靈夥伴，感受治癒氛圍
2. **🧠 心理探索** - 回答三道精心設計的問題
3. **🎭 完美配對** - AI 分析為你找到最適合的陪伴者
4. **💬 深度連結** - 五輪對話，角色分享真實經歷
5. **✨ 專屬溫暖** - 收到為你量身打造的鼓勵話語
6. **📚 延伸探索** - 發現角色背後的精彩故事世界

---

## 🎨 設計哲學

### 🌅 視覺治癒

- **溫暖色調** - 橘粉紫漸層，如日落般溫柔
- **玻璃質感** - 輕盈透明，不給心靈造成負擔
- **流動動畫** - 自然過渡，如呼吸般舒緩
- **留白美學** - 給心靈足夠的休息空間

### 💝 情感設計

- **漸進式信任** - 循序漸進建立安全感
- **真實共鳴** - 角色分享增加連結感
- **個人化關懷** - 每個人都是獨特的存在
- **希望傳遞** - 在黑暗中點亮微小光芒

---

## 🔧 自定義指南

### 新增角色夥伴

在 `public/characters.json` 添加新角色：

```json
{
  "character_id": "新角色ID",
  "name": "角色名稱",
  "avatar": "頭像圖片路徑",
  "personality": "個性描述",
  "tone": "說話語氣",
  "dialogue_style": "對話風格",
  "example_openings": ["開場白範例"],
  "sample_questions": ["提問範例"],
  "final_encouragement": "鼓勵話語核心",
  "source": "來源作品",
  "backstory": "背景故事",
  "story_trigger_keywords": ["故事觸發關鍵字"],
  "story_trigger_response": "故事回應內容",
  "story_summary": "作品簡介"
}
```

### 自定義心理測驗

修改 `src/data/storyQuestions.js`：

```javascript
export const storyQuestions = [
  {
    question: "你的問題內容",
    options: [
      { label: "選項A", value: "A" },
      { label: "選項B", value: "B" },
    ],
  },
];
```

### 調整配對算法

編輯 `src/utils/classifyByStory.js` 來自定義角色配對邏輯。

---

## 🌐 瀏覽器兼容性

| 瀏覽器     | 版本支援 | 狀態        |
| ---------- | -------- | ----------- |
| 🌐 Chrome  | 88+      | ✅ 完全支援 |
| 🦊 Firefox | 85+      | ✅ 完全支援 |
| 🧭 Safari  | 14+      | ✅ 完全支援 |
| 🔷 Edge    | 88+      | ✅ 完全支援 |

---

## 🤝 參與貢獻

我們歡迎任何形式的貢獻！

### 貢獻方式

- 🐛 **問題回報** - 發現 bug？請告訴我們
- 💡 **功能建議** - 有好想法？我們很樂意聽取
- 🎨 **設計優化** - 讓界面更加溫暖美好
- 📝 **文檔完善** - 幫助更多人了解項目

### 提交流程

1. Fork 本專案
2. 創建 feature 分支
3. 提交你的改動
4. 推送到分支
5. 創建 Pull Request

---

## 📜 版權聲明

### 專案授權

本專案採用 MIT 授權條款，允許自由使用和修改。

### 角色版權

所有動漫角色形象和相關內容版權歸原作品所有者所有。本專案僅供學習交流使用，不用於商業用途。

### 第三方資源

- OpenAI API - 提供 AI 對話能力
- 各動漫作品 - 角色靈感來源
- 開源社區 - 技術支持和靈感

---

## 💌 特別致謝

### 創作靈感

感謝所有溫暖動漫作品的創作者們，是你們筆下的角色給了我們溫暖和力量。

### 技術支持

感謝開源社區的無私奉獻，讓我們能夠站在巨人的肩膀上創造美好。

### 用戶反饋

感謝每一位試用者的寶貴意見，你們的回饋讓這個項目變得更加完善。

---

## 📞 聯繫我們

- 🌟 **項目主頁**: [GitHub Repository](https://github.com/carrie0925/Animate-Agent)
- 🎮 **在線體驗**: [縫補星球](https://carrie0925.github.io/Animate-Agent/)
- 📧 **意見回饋**: 歡迎通過 GitHub Issues 與我們交流

---

<div align="center">

## 🌟 縫補星球 🌟

**在這裡，每個破碎的心靈都能找到溫暖的陪伴**

**每個孤獨的靈魂都能感受到真誠的理解**

**讓我們一起，用技術的力量縫補世界上的每一道裂痕** ✨

---

_「縫補不是為了掩蓋傷痕，而是為了讓破碎的地方變得更加堅強和美麗」_

**[🚀 立即開始你的心靈之旅](https://carrie0925.github.io/Animate-Agent/)**

</div>
