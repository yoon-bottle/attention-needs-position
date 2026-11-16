import {test} from 'node:test';
import assert from 'node:assert/strict';
import {attention,delta} from '../model.js';
const permutations=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
for(const carry of [false,true]) test(`equivariance, position ${carry?'carried':'off'}`,()=>{
 const base=attention([0,1,2],carry,carry);
 for(const order of permutations){const result=attention(order,carry,carry);
 order.forEach((id,i)=>{assert.ok(delta(result.outputs[i],base.outputs[id])<1e-12);
 order.forEach((key,j)=>assert.ok(Math.abs(result.weights[i][j]-base.weights[id][key])<1e-12));});}
});
test('fixed positional encoding changes token-aligned outputs',()=>{
 const base=attention([0,1,2],true), result=attention([2,1,0],true);
 assert.ok(delta(base.outputs[0],result.outputs[2])>0.01);
});
test('all attention rows are probability distributions and outputs are finite',()=>{
 for(const p of permutations)for(const enabled of [true,false])for(const carry of [true,false]){
 const {weights,outputs}=attention(p,enabled,carry);
 weights.forEach(row=>{assert.ok(row.every(v=>v>=0&&v<=1));assert.ok(Math.abs(row.reduce((a,b)=>a+b)-1)<1e-12);});
 assert.ok(outputs.flat().every(Number.isFinite));}
});
