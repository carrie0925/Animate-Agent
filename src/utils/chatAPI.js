// src/utils/chatAPI.js

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";

// 系統提示（讓 GPT 輸出繁體字）
const systemPrompt = {
  role: "system",
  content: "請用繁體中文回答接下來的所有問題。",
};

export async function fetchCharacterReply(messages) {
  try {
    const trimmed = messages.slice(-10); // 最多取 10 則
    const finalMessages = [systemPrompt, ...trimmed];

    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: finalMessages,
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
