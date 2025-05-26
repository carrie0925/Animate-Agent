# 縫補計畫 (Mending Project)

一個基於 React 和 OpenAI API 的心靈療癒互動應用，讓用戶與八位精心設計的動漫角色進行五輪深度對話，並在最後收到專屬的鼓勵話語。

## ✨ 功能特色

### 🎭 角色系統
- **8位精心設計的動漫角色**，每位都有獨特的個性和背景故事
- 包含《葬送的芙莉蓮》、《排球少年!!》、《鬼滅之刃》等熱門作品角色
- 每個角色都有專屬的對話風格、語氣特色和互動方式

### 🧠 智能配對系統
- **3個心理測驗問題**，根據用戶回答進行角色配對
- 基於用戶的情感需求和個性特質匹配最適合的陪伴角色
- 支援不同類型的情感支持：鼓勵、傾聽、分析、治療等

### 💬 深度對話體驗
- **5輪結構化對話**，逐步深入用戶的內心世界
- 整合 OpenAI GPT API，提供自然流暢的對話體驗
- 角色會在特定輪次分享個人經歷，增加真實感和連結感

### 🎨 精美視覺設計
- **統一的設計語言**，採用 glassmorphism 和漸層效果
- **響應式設計**，支援桌面和移動端
- **流暢的動畫效果**，提升用戶體驗

### 📚 作品推薦功能
- 對話結束後推薦角色所屬的原作品
- 包含作品封面圖和詳細故事背景介紹
- 幫助用戶進一步了解喜愛的角色

## 🛠 技術架構

### 前端技術棧
- **React 18** - 主要框架
- **React Router** - 路由管理
- **Tailwind CSS** - 樣式框架
- **Framer Motion** - 動畫效果
- **Vite** - 構建工具

### 核心功能模組
- **角色配對算法** (`utils/classifyByStory.js`)
- **OpenAI API 整合** (`utils/chatAPI.js`)
- **角色資料載入** (`utils/loadCharacterInfo.js`)
- **總結提示生成** (`utils/summaryPrompt.js`)

### 資料結構
- **角色配置檔** (`characters.json`) - 包含完整的角色設定
- **測驗問題** (`storyQuestions.js`) - 心理測驗題目和選項
- **Session Storage** - 用戶狀態和對話記錄管理

## 📁 專案結構

```
src/
├── components/           # 可重複使用的組件
│   ├── DialogueBox.jsx     # 對話框組件
│   ├── ProgressBar.jsx     # 進度條組件
│   └── StoryTriggerButtons.jsx # 故事觸發按鈕
├── pages/               # 頁面組件
│   ├── IntroPage.jsx       # 歡迎頁面
│   ├── StoryFlow.jsx       # 測驗流程頁面
│   ├── ChatRoom.jsx        # 對話室頁面
│   └── FinalMessage.jsx    # 結果展示頁面
├── data/                # 資料配置
│   └── storyQuestions.js   # 測驗問題配置
├── utils/               # 工具函數
│   ├── classifyByStory.js  # 角色配對邏輯
│   ├── chatAPI.js          # OpenAI API 整合
│   ├── loadCharacterInfo.js # 角色資料載入
│   └── summaryPrompt.js    # 總結提示生成
└── index.css            # 全域樣式和自訂動畫
```

## 🚀 安裝和執行

### 環境要求
- Node.js 16.0.0 或更高版本
- npm 或 yarn 套件管理器

### 安裝步驟

1. **克隆專案**
```bash
git clone <repository-url>
cd mending-project
```

2. **安裝相依套件**
```bash
npm install
# 或
yarn install
```

3. **環境變數設定**
創建 `.env` 檔案並添加你的 OpenAI API 金鑰：
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. **準備資源檔案**
在 `public/assets/` 目錄下添加：
- `plant-icon.png` - 應用圖標
- `covers/` 目錄 - 作品封面圖片
  - `frieren.jpg`
  - `haikyuu.jpg` 
  - `lookback.jpg`
  - `demon-slayer.jpg`
  - `spy-family.jpg`
  - `my-hero.jpg`
  - `attack-titan.jpg`
  - `black-butler.jpg`
  - `default.jpg`

5. **啟動開發伺服器**
```bash
npm run dev
# 或
yarn dev
```

6. **建置生產版本**
```bash
npm run build
# 或
yarn build
```

## 🎯 使用流程

1. **歡迎頁面** - 展示 8 位角色卡片，介紹應用概念
2. **心理測驗** - 回答 3 個問題進行角色配對
3. **角色配對** - 系統分析回答並配對最適合的角色
4. **對話互動** - 進行 5 輪深度對話，角色提供情感支持
5. **專屬訊息** - 收到角色的個人化鼓勵話語
6. **作品推薦** - 了解角色背景故事和原作品資訊

## 🎨 設計特色

### 視覺風格
- **色彩配置**: 使用溫暖的橘粉紫漸層作為主色調
- **玻璃擬態**: 半透明背景配合模糊效果
- **動畫效果**: 平滑的過渡動畫和懸停效果
- **響應式設計**: 適配各種螢幕尺寸

### 互動體驗
- **漸進式導引**: 循序漸進的用戶體驗流程
- **情感共鳴**: 角色會分享個人經歷建立連結
- **個人化內容**: 根據對話內容生成專屬訊息

## 🔧 自訂配置

### 新增角色
在 `public/characters.json` 中添加新角色配置：
```json
{
  "character_id": "I",
  "name": "新角色名稱",
  "avatar": "./assets/new-character.png",
  "personality": "角色個性描述",
  "tone": "說話語氣風格",
  "dialogue_style": "對話互動方式",
  "source": "作品來源",
  "backstory": "角色背景故事"
}
```

### 修改測驗問題
編輯 `src/data/storyQuestions.js` 來自訂心理測驗問題。

### 調整配對邏輯
修改 `src/utils/classifyByStory.js` 來改變角色配對算法。

## 📱 瀏覽器支援

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+


## 📄 授權

此專案僅供學習和展示用途。角色形象版權歸原作品所有者所有。

## 🙏 致謝

感謝所有提供靈感的動漫作品和角色，讓我們能夠創造這個溫暖的心靈療癒空間。

---

**縫補計畫** - 用技術縫補心靈，用陪伴點亮希望 ✨
