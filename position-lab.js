import {attention,tokens,delta} from './model.js';
let order=[0,1,2],selected=0,dragged=null;
const base=attention([0,1,2],true);
const $=s=>document.querySelector(s);
const pLabel=id=>['p₁','p₂','p₃'][id];
const fmt=d=>d<1e-12?'0.000000':d.toFixed(6);
function move(id,to,side='fixed'){
 const from=order.indexOf(id);if(from===to)return;
 order.splice(from,1);order.splice(to,0,id);selected=id;render();
 $(`#pair-${side} [data-word="${id}"]`).focus({preventScroll:true});
}
function render(){
 $('#pair-panels').innerHTML=[false,true].map(carry=>{
 const side=carry?'carried':'fixed',data=attention(order,true,carry),slot=order.indexOf(selected),position=carry?selected:slot;
 const differences=tokens.map((_,id)=>delta(data.outputs[order.indexOf(id)],base.outputs[id]));
 return `<section id="pair-${side}" class="panel pair-panel"><span class="badge ${carry?'':'teal'}">${carry?'MOVE THE WHOLE PAIR':'MOVE THE WORD ONLY'}</span><h3>${carry?'The address travels':'The address stays'}</h3><p class="panel-description">${carry?'Each word carries its original position vector.':'Position vectors remain attached to their slots.'}</p>
 <div class="pair-slots">${order.map((id,i)=>`<div class="pair-slot" data-target="${i}"><span class="seat">SEAT ${i+1}</span><div class="pair-bundle ${carry?'bound':''}"><button class="pair-word ${selected===id?'selected':''}" data-word="${id}" draggable="true" aria-pressed="${selected===id}" aria-label="${tokens[id]}, seat ${i+1}, ${carry?'carried':'fixed'} position. Use arrow keys to move.">${tokens[id]}${carry?`<span class="position-tag">+ ${pLabel(id)}</span>`:''}</button>${carry?'':`<span class="position-tag fixed-tag">+ ${pLabel(i)}</span>`}</div></div>`).join('')}</div>
 <div class="input-comparison"><span>FOLLOW “${tokens[selected].toUpperCase()}”</span><div><code>e<sub>${tokens[selected]}</sub> + ${pLabel(selected)}</code><span class="input-arrow">→</span><code>e<sub>${tokens[selected]}</sub> + ${pLabel(position)}</code></div><strong>${position===selected?'Same input vector':'Different input vector'}</strong></div>
 <div class="pair-results"><p>Output change from original</p>${tokens.map((word,id)=>`<div class="pair-result"><span>${word}</span><span class="delta-track"><span style="width:${Math.min(100,differences[id]/0.5*100)}%"></span></span><code>Δ ${fmt(differences[id])}</code></div>`).join('')}</div></section>`;
 }).join('');
 document.querySelectorAll('.pair-panel').forEach(panel=>{
 const side=panel.id.replace('pair-','');
 panel.querySelectorAll('.pair-word').forEach(el=>{
 const id=Number(el.dataset.word);
 el.onclick=()=>{selected=id;render();$(`#pair-${side} [data-word="${id}"]`).focus({preventScroll:true});};
 el.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(id,Math.max(0,Math.min(2,order.indexOf(id)+(e.key==='ArrowLeft'?-1:1))),side);}};
 el.ondragstart=e=>{dragged=id;e.dataTransfer.setData('text/plain',String(id));e.dataTransfer.effectAllowed='move';};
 el.ondragend=()=>{dragged=null;document.querySelectorAll('.pair-over').forEach(n=>n.classList.remove('pair-over'));};
 });
 panel.querySelectorAll('.pair-slot').forEach(el=>{
 el.ondragover=e=>{e.preventDefault();el.classList.add('pair-over');};el.ondragleave=()=>el.classList.remove('pair-over');
 el.ondrop=e=>{e.preventDefault();if(dragged!==null)move(dragged,Number(el.dataset.target),side);dragged=null;};
 });
 });
 $('#pair-left').disabled=order.indexOf(selected)===0;$('#pair-right').disabled=order.indexOf(selected)===2;
 $('#pair-finding').textContent=order.every((v,i)=>v===i)?'Start by swapping dog and man. Predict which side will preserve every word’s output.':'Fixed addresses change the inputs and outputs. Carried addresses preserve each word–position pair, so every word keeps its output. Attention reads the supplied vectors; it cannot see the screen’s seat labels.';
}
$('#pair-swap').onclick=()=>{const a=order.indexOf(0),b=order.indexOf(2);[order[a],order[b]]=[order[b],order[a]];selected=0;render();};
$('#pair-reset').onclick=()=>{order=[0,1,2];selected=0;render();};
$('#pair-left').onclick=()=>move(selected,Math.max(0,order.indexOf(selected)-1));
$('#pair-right').onclick=()=>move(selected,Math.min(2,order.indexOf(selected)+1));
render();
