export async function classifyUser(answers) {
  const [q1, q2, q3] = answers;
  const key = `${q1}-${q2}-${q3}`;

  const rules = {
    "quiet-slow-friendly": "A",
    "quiet-slow-logical": "B",
    "quiet-direct-friendly": "C",
    "quiet-direct-logical": "D",
    "guide-slow-friendly": "E",
    "guide-slow-logical": "F",
    "guide-direct-friendly": "G",
    "guide-direct-logical": "H",
  };

  const characterId = rules[key];

  if (!characterId) return null; // ❗️未找到對應角色，回傳 null

  const res = await fetch("/characters.json");
  const characters = await res.json();
  const character = characters.find((c) => c.character_id === characterId);

  return character || null; // 若找不到該 id 的角色，也回傳 null
}
