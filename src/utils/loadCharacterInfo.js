export async function loadCharacterInfo(characterId) {
  const res = await fetch("/characters.json");
  const characters = await res.json();
  const character = characters.find((c) => c.character_id === characterId);

  if (!character) {
    throw new Error("找不到指定角色");
  }

  // 存入 sessionStorage
  for (const key in character) {
    sessionStorage.setItem(`character_${key}`, character[key]);
  }

  return character;
}
