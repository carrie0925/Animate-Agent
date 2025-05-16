export function classifyUser(answers) {
  // 使用簡化範例，後續你可用更精細 mapping 規則
  const key = answers.join("-");

  const rules = {
    "quiet-slow-warm": "simmel",
    "guide-direct-logical": "mentor",
    "fun-light-friendly": "clown",
    // 其餘組合...
  };

  return rules[key] || "simmel"; // 預設為辛梅爾
}
