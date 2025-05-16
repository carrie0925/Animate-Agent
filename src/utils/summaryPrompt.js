// src/utils/summaryPrompt.js

export function generateSummaryPrompt(messages, characterName = "角色") {
  const dialogue = messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "使用者" : characterName}：${msg.content}`
    )
    .join("\n");

  return [
    {
      role: "system",
      content: `你是一位溫柔且具啟發性的動畫角色，請使用繁體中文回答接下來的問題，擅長用一句鼓勵話語總結與使用者的對話。`,
    },
    {
      role: "user",
      content: `以下是我與角色的對話，請根據內容寫一句充滿溫度的鼓勵語（不要總結，只給一句話）：\n${dialogue}`,
    },
  ];
}
