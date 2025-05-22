// src/utils/chatAPI.js

import { generateSystemPrompt } from "./generateSystemPrompt";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o"; // 最新模型

export async function fetchCharacterReply(messages, apiKey) {
  try {
    // 讀取角色資料
    const character = {
      name: sessionStorage.getItem("character_name"),
      tone: sessionStorage.getItem("character_tone"),
      dialogue_style: sessionStorage.getItem("character_dialogue_style"),
      personality: sessionStorage.getItem("character_personality"),
      example_openings: JSON.parse(
        sessionStorage.getItem("character_example_openings") || "[]"
      ),
      sample_questions: JSON.parse(
        sessionStorage.getItem("character_sample_questions") || "[]"
      ),
      final_encouragement: sessionStorage.getItem(
        "character_final_encouragement"
      ),
      backstory: sessionStorage.getItem("character_backstory"),
      story_trigger_keywords: JSON.parse(
        sessionStorage.getItem("character_story_trigger_keywords") || "[]"
      ),
      story_trigger_response: sessionStorage.getItem(
        "character_story_trigger_response"
      ),
      source: sessionStorage.getItem("character_source") || "某部動畫",
    };

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const triggers = character.story_trigger_keywords || [];

    // ✅ 若最後訊息符合 trigger，強制回應設定的故事
    const matchedTrigger = triggers.find((keyword) =>
      lastUserMessage.includes(keyword)
    );
    if (matchedTrigger && character.story_trigger_response) {
      return character.story_trigger_response;
    }

    // ⬇️ 正常系統 prompt 對話流程
    const systemPrompt = {
      role: "system",
      content: generateSystemPrompt(character),
    };

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
