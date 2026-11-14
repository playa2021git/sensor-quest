import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/questions.js';
import { evaluate, summarize, shuffle } from '../src/engine.js';
import { devices, inputIds, outputIds } from '../src/encyclopedia.js';
import { catSheet } from '../src/assets.js';
import { existsSync } from 'node:fs';
const allowedInputs = ['buttons','touch','light','temperature','microphone','accelerometer','compass','pir','soil','distance','scale','ai-image','ai-sound','ai-pose'];
const allowedOutputs = ['led','speaker','servo','vibrator','pump'];

test('10 questions, four complete choices, declared optimal counts, sources and raster assets', () => {
  assert.equal(questions.length, 10); assert.equal(new Set(questions.map(q => q.id)).size, 10);
  questions.forEach((q, i) => {
    for (const key of ['id','stage','title','scenario','requirements','image','choices','explanation','limitations','learningPoint','sourceNotes','misconception','imageAlt']) assert.ok(q[key], `${q.id}: ${key}`);
    assert.equal(q.stage, i < 5 ? 1 : 2); assert.equal(q.choices.length, 4);
    assert.equal(new Set(q.choices.map(c => c.id)).size, 4);
    assert.equal(q.choices.filter(c => c.evaluation === 'optimal').length, 1);
    assert.equal(q.choices.filter(c => c.evaluation === 'possible').length, [2,0,1,0,0,0,0,1,2,0][i]);
    assert.ok(existsSync(q.image)); assert.ok(q.image.endsWith('.png'));
    for (const c of q.choices) {
      assert.ok(['optimal','possible','unsuitable'].includes(c.evaluation));
      for (const key of ['information','strength','limitations','explanation']) assert.ok(c[key], `${q.id}/${c.id}: ${key}`);
    }
  });
  assert.ok(existsSync(catSheet));
});
test('only the 14 allowed inputs and five outputs; no output used as a sensor', () => {
  assert.deepEqual(inputIds, allowedInputs); assert.deepEqual(outputIds, allowedOutputs);
  assert.equal(new Set(devices.map(d => d.id)).size, 19);
  for (const q of questions) {
    q.choices.forEach(c => { assert.ok(c.devices.length); c.devices.forEach(id => assert.ok(allowedInputs.includes(id), `${q.id}: ${id}`)); });
    q.outputs.forEach(id => assert.ok(allowedOutputs.includes(id)));
  }
});
test('all 40 choices get the correct grade and timeout scores zero', () => {
  for (const q of questions) {
    for (const c of q.choices) assert.equal(evaluate(q, c.id).score, { optimal:2, possible:1, unsuitable:0 }[c.evaluation]);
    assert.equal(evaluate(q, null).evaluation, 'timeout'); assert.equal(evaluate(q, null).score, 0);
  }
  assert.equal(summarize(questions.map(q => evaluate(q, 'best'))).score, 20);
  const mixed = [evaluate(questions[0],'best'), evaluate(questions[0],'c1'), evaluate(questions[0],'c2'), evaluate(questions[0],null)];
  assert.deepEqual(summarize(mixed), { optimal:1, possible:1, unsuitable:1, timeout:1, score:3, rank:'D' });
});
test('rank boundaries match version 2, including 6/7, 10/11, 14/15, 17/18', () => {
  for (const [score, rank] of [[0,'D'],[6,'D'],[7,'C'],[10,'C'],[11,'B'],[14,'B'],[15,'A'],[17,'A'],[18,'S'],[20,'S']]) {
    assert.equal(summarize([{ evaluation:'optimal', score }]).rank, rank);
  }
});
test('shuffle preserves all choices and never mutates the question', () => {
  const src = questions[0].choices, before = src.map(c => c.id), shuffled = shuffle(src, () => 0);
  assert.deepEqual(src.map(c => c.id), before); assert.notDeepEqual(shuffled.map(c => c.id), before); assert.deepEqual(new Set(shuffled), new Set(src));
});

test('touch input is possible due to splashes; button stays optimal', () => {
  assert.equal(evaluate(questions[0], 'c0').score, 1);
  assert.match(questions[0].explanation, /ボタン/);
  assert.match(questions[0].explanation, /タッチ/);
  assert.equal(questions.flatMap(q => q.choices).length, 40);
});
