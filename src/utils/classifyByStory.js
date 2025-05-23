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
      comfort: ["E", "C"],
      action: ["G", "D"],
      listen: ["C", "A"],
      fun: ["D", "B"],
    },
    q2: {
      empathy: ["A", "E"],
      encourage: ["G", "B"],
      analyze: ["B", "F"],
      metaphor: ["D", "H"],
    },
    q3: {
      care: ["H", "E", "F"],
      power: ["H", "A", "G"],
      clarity: ["C", "B", "A"],
      dream: ["C", "D", "F"],
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
