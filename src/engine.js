export const points = { optimal: 2, possible: 1, unsuitable: 0, timeout: 0 };
export function evaluate(question, choiceId) {
  const choice = question.choices.find(c => c.id === choiceId);
  const evaluation = choice?.evaluation ?? 'timeout';
  return { questionId: question.id, choiceId: choice?.id ?? null, evaluation, score: points[evaluation] };
}
export function summarize(answers) {
  const counts = { optimal: 0, possible: 0, unsuitable: 0, timeout: 0 };
  answers.forEach(a => counts[a.evaluation]++);
  const score = answers.reduce((sum, a) => sum + a.score, 0);
  return { ...counts, score, rank: score >= 18 ? 'S' : score >= 15 ? 'A' : score >= 11 ? 'B' : score >= 7 ? 'C' : 'D' };
}
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
