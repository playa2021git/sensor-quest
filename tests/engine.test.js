import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../src/questions.js';
import {evaluate,summarize,shuffle} from '../src/engine.js';
import {existsSync} from 'node:fs';
test('10 complete questions, five unique choices, one optimal each, assets exist',()=>{
 assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10);
 for(const q of questions){for(const key of ['id','stage','title','scenario','requirements','image','choices','evaluation','explanation','limitations','learningPoint','sourceNotes'])assert.ok(q[key],`${q.id}: ${key}`);
 assert.equal(q.choices.length,5);assert.equal(new Set(q.choices.map(c=>c.id)).size,5);assert.equal(q.choices.filter(c=>c.evaluation==='optimal').length,1);assert.ok(existsSync(q.image));
 for(const c of q.choices){assert.ok(['optimal','possible','unsuitable'].includes(c.evaluation));assert.ok(c.information&&c.explanation&&c.limitations);}}
});
test('three grades, timeout, score ceiling and independent choice IDs',()=>{
 for(const q of questions){for(const c of q.choices){const result=evaluate(q,c.id);assert.equal(result.score,{optimal:2,possible:1,unsuitable:0}[c.evaluation]);}assert.equal(evaluate(q,null).evaluation,'timeout');assert.equal(evaluate(q,null).score,0);}
 assert.equal(summarize(questions.map(q=>evaluate(q,'best'))).score,20);
 assert.equal(summarize(questions.map(q=>evaluate(q,'best'))).rank,'S');
 const mixed=[evaluate(questions[0],'best'),evaluate(questions[0],'c0'),evaluate(questions[0],'c1'),evaluate(questions[0],null)];assert.deepEqual(summarize(mixed),{optimal:1,possible:1,unsuitable:1,timeout:1,score:3,rank:'C'});
});
test('shuffle preserves input and identities while changing order',()=>{const src=questions[0].choices;const before=src.map(c=>c.id);const shuffled=shuffle(src,()=>0);assert.deepEqual(src.map(c=>c.id),before);assert.notDeepEqual(shuffled.map(c=>c.id),before);assert.deepEqual(new Set(shuffled),new Set(src));});
