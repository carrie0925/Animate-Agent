// src/utils/summaryPrompt.js

export function generateSummaryPrompt(messages, character) {
  const dialogue = messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "使用者" : character.name}：${msg.content}`
    )
    .join("\n");

  const story = character.backstory?.split("。")?.[0] || "";

  return [
    {
      role: "system",
      content: `你現在是動畫角色 ${character.name}，來自《${character.source}》，
你說話風格是：${character.tone}，
互動方式是：${character.dialogue_style}。
你可以適當引用你的故事中一句話作為鼓勵素材（例如：「${story}...」）。
請用繁體中文，針對對話內容，寫出一句具有你風格的溫暖鼓勵語。
**不要重述內容，也不要解釋，只輸出一句鼓勵語。**`,
    },
    {
      role: "user",
      content: `以下是你與使用者的五輪對話內容，請據此給一句專屬的鼓勵語：\n${dialogue}`,
    },
  ];
}
