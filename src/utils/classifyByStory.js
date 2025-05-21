// src/utils/classifyByStory.js
export function classifyByStory(answers) {
  const scoreMap = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
  };

  const mapping = {
    q1: {
      comfort: ["D", "G"],
      action: ["A", "B"],
      listen: ["H", "C"],
      fun: ["E", "F"],
    },
    q2: {
      empathy: ["D"],
      encourage: ["A", "B"],
      analyze: ["H", "G"],
      metaphor: ["E", "C"],
    },
    q3: {
      care: ["D", "E"],
      power: ["A", "B", "F"],
      clarity: ["H", "G"],
      dream: ["C"],
    },
  };

  ["q1", "q2", "q3"].forEach((qid, i) => {
    const val = answers[i];
    const matchList = mapping[qid][val];
    matchList.forEach((id) => scoreMap[id]++);
  });

  // 找出最高分角色 ID
  const bestMatch = Object.entries(scoreMap).sort((a, b) => b[1] - a[1])[0][0];
  return bestMatch;
}
