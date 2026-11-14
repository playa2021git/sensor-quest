// Optional individual files override the generated sheet. A missing replacement
// falls back to the sheet; if the sheet is missing, the HTML caption remains.
export const sceneSheets = {
  stage1: 'assets/stage1-scenes.png',
  stage2: 'assets/stage2-scenes.png',
  v3stage1: 'assets/scenes-v3-stage1.png',
  v3stage2: 'assets/scenes-v3-stage2.png'
};
export const catSheet = 'assets/cat-manga.png';
export const catPoses = {
  normal: { tile: 0, suggestedFile: 'assets/cat-normal.webp' },
  success: { tile: 1, suggestedFile: 'assets/cat-success.webp' },
  explain: { tile: 2, suggestedFile: 'assets/cat-explain.webp' },
  think: { tile: 3, suggestedFile: 'assets/cat-think.webp' },
  result: { tile: 4, suggestedFile: 'assets/cat-result.webp' }
};

export const sceneReplacements = {}; // e.g. q1: "assets/q01.webp"
export const catReplacements = {}; // e.g. normal: "assets/cat-normal.webp"
