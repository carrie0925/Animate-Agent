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

  for (const key in character) {
    sessionStorage.setItem(`character_${key}`, character[key]);
  }

  return character;
}
