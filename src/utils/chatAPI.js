// src/utils/chatAPI.js

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo"; // 正確的 model 名稱

export async function fetchCharacterReply(messages, apiKey) {
  try {
    const trimmed = messages.slice(-10); // 保留最後 10 則對話

    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: trimmed,
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "（抱歉，目前無法回應）";
  } catch (err) {
    console.error("❌ fetchCharacterReply error", err);
    return "（系統錯誤，請稍後再試）";
  }
}
