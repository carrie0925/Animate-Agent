// src/utils/summaryPrompt.js

export function generateSummaryPrompt(messages, character) {
  const dialogue = messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "使用者" : character.name}：${msg.content}`
    )
    .join("\n");

  return [
    {
      role: "system",
      content: `你現在是動畫角色 ${character.name}，來自 ${character.source}。
        你說話的風格是：${character.tone}。
        你擅長的互動方式是：${character.dialogue_style}。
        請你用繁體中文，針對以下對話，寫出一句你風格獨特的溫暖鼓勵語。
        請不要重述內容，也不要解釋，**只輸出一句鼓勵語**。`,
    },
    {
      role: "user",
      content: `以下是你與使用者的五輪對話內容，請據此給一句專屬的鼓勵語：\n${dialogue}`,
    },
  ];
}
