// src/utils/chatAPI.js

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";

export async function fetchCharacterReply(messages, apiKey) {
  try {
    // 讀取角色資料
    const character = {
      name: sessionStorage.getItem("character_name"),
      tone: sessionStorage.getItem("character_tone"),
      dialogue_style: sessionStorage.getItem("character_dialogue_style"),
      source: sessionStorage.getItem("character_source") || "某部動畫",
    };

    // 建立角色化的 system prompt
    const systemPrompt = {
      role: "system",
      content: `你現在是一位動畫角色「${character.name}」，來自作品《${character.source}》。
你說話的語氣是：「${character.tone}」，互動風格是：「${character.dialogue_style}」。
請用繁體中文自然地與使用者對話，像你自己在說話一樣，不要像 AI 助理。
請避免過於機械的語氣，務必融入角色性格與表達風格。`,
    };

    // 最多保留 10 則訊息對話
    const trimmedMessages = messages.slice(-10);
    const finalMessages = [systemPrompt, ...trimmedMessages];

    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: finalMessages,
        temperature: 0.85,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "（抱歉，目前無法回應）";
  } catch (err) {
    console.error("❌ fetchCharacterReply error", err);
    return "（系統錯誤，請稍後再試）";
  }
}
