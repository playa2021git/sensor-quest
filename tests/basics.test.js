import test from 'node:test';
import assert from 'node:assert/strict';
import {basicQuestions,basicScore,BASIC_PASS_SCORE} from '../src/basics.js';
import {existsSync} from 'node:fs';
test('basic mode contains ten complete binary questions and sensor illustrations',()=>{
 assert.equal(basicQuestions.length,10);assert.equal(new Set(basicQuestions.map(q=>q.id)).size,10);
 assert.ok(existsSync('assets/basic-sensors.png'));
 for(const q of basicQuestions){assert.equal(typeof q.answer,'boolean');for(const k of ['statement','sensor','explanation','note'])assert.ok(q[k]);assert.ok(q.tile>=0&&q.tile<12);}
 assert.equal(basicQuestions[0].diagram,true);assert.equal(basicQuestions[1].answer,true);
 assert.equal(basicQuestions[6].answer,false);assert.equal(basicQuestions[8].answer,false);
});
test('pass boundary is seven, not six; missing answers do not score',()=>{
 for(const count of [0,6,7,10]){const answers=basicQuestions.map((q,i)=>i<count?q.answer:!q.answer);assert.equal(basicScore(answers),count);assert.equal(basicScore(answers)>=BASIC_PASS_SCORE,count>=7);}
 assert.equal(basicScore([]),0);assert.equal(basicScore(Array(10).fill(null)),0);
});
