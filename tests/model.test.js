import {test} from 'node:test';
import assert from 'node:assert/strict';
import {equipment,validate,summary} from '../model.js';
const record=()=>({date:'2026-10-29T10:30',location:'A 區',worker:'王小明',inspector:'陳安全',checks:Object.fromEntries(equipment.map(x=>[x,'合格']))});
test('完整檢查可儲存，並正確計算不合格與不適用',()=>{const r=record();r.checks[equipment[0]]='不合格';r.checks[equipment[1]]='不適用';assert.doesNotThrow(()=>validate(r));assert.deepEqual(summary(r.checks),{pass:6,fail:1,na:1});});
test('未檢查項目與空白人員不能儲存',()=>{const r=record();delete r.checks[equipment[3]];assert.throws(()=>validate(r));r.checks[equipment[3]]='合格';r.worker=' ';assert.throws(()=>validate(r));});
