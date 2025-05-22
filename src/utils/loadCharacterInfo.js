// src/utils/loadCharacterInfo.js
import { generateSystemPrompt } from "./generateSystemPrompt.js";

export async function loadCharacterInfo(characterId) {
  const res = await fetch(`${import.meta.env.BASE_URL}characters.json`);
  if (!res.ok) throw new Error("角色資料載入失敗");

  const characters = await res.json();
  const character = characters.find((c) => c.character_id === characterId);

  if (!character) throw new Error("找不到指定角色");

  // 修正圖片路徑
  character.avatar = `${import.meta.env.BASE_URL}${character.avatar.replace(
    /^\.?\//,
    ""
  )}`;

  // 存入 sessionStorage
  sessionStorage.setItem("character_character_id", character.character_id);
  sessionStorage.setItem("character_name", character.name);
  sessionStorage.setItem("character_avatar", character.avatar);
  sessionStorage.setItem("character_personality", character.personality);
  sessionStorage.setItem("character_backstory", character.backstory);

  return character;
}
