import {tokens,attention,delta} from './model.js';
let order=[0,1,2],selected=0,carried=false,dragged=null;
const baseline=[attention([0,1,2]),attention([0,1,2],true)];
const $=s=>document.querySelector(s);
function color(v){const amount=Math.min(1,Math.abs(v)/3),target=v<0?[52,92,230]:[8,126,134];return `rgb(${target.map((c,i)=>Math.round([245,247,252][i]*(1-amount)+c*amount)).join(',')})`;}
function move(id,target){const from=order.indexOf(id);if(from===target)return;order.splice(from,1);order.splice(target,0,id);selected=id;render();$(`[data-id="${id}"]`).focus({preventScroll:true});}
function render(){
 $('#slots').innerHTML=order.map((id,i)=>`<div class="slot" data-slot="${i}"><span class="seat">SEAT ${i+1}${carried?` · p${id+1}`:''}</span><button draggable="true" data-id="${id}" class="token ${id===selected?'selected':''}" aria-pressed="${id===selected}" aria-label="${tokens[id]}, seat ${i+1}. Select or use arrow keys to move.">${tokens[id]}</button></div>`).join('');
 document.querySelectorAll('.token').forEach(el=>{
 el.onclick=()=>{selected=Number(el.dataset.id);render();$(`[data-id="${selected}"]`).focus({preventScroll:true});};
 el.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const id=Number(el.dataset.id);move(id,Math.max(0,Math.min(2,order.indexOf(id)+(e.key==='ArrowLeft'?-1:1))));}};
 el.ondragstart=e=>{dragged=Number(el.dataset.id);e.dataTransfer.setData('text/plain',String(dragged));e.dataTransfer.effectAllowed='move';el.classList.add('dragging');};
 el.ondragend=()=>{dragged=null;document.querySelectorAll('.over,.dragging').forEach(n=>n.classList.remove('over','dragging'));};
 });
 document.querySelectorAll('.slot').forEach(el=>{el.ondragover=e=>{e.preventDefault();el.classList.add('over');};el.ondragleave=()=>el.classList.remove('over');el.ondrop=e=>{e.preventDefault();if(dragged!==null)move(dragged,Number(el.dataset.slot));dragged=null;};});
 $('#sentence').textContent=order.map(id=>tokens[id]).join(' ');
 $('#left').disabled=order.indexOf(selected)===0;$('#right').disabled=order.indexOf(selected)===2;
 [false,true].forEach((enabled,panel)=>{
 const data=attention(order,enabled,carried),row=data.weights[order.indexOf(selected)],accent=enabled?'#087e86':'#345ce6';
 const svg=`<svg class="network" viewBox="0 0 360 145" role="img" aria-label="Attention from ${tokens[selected]}: ${order.map((id,j)=>`${tokens[id]} ${Math.round(row[j]*100)} percent`).join(', ')}"><text x="180" y="22" text-anchor="middle">${tokens[selected]} looks at</text>${order.map((id,j)=>{const x=55+125*j;return `<path d="M180 35 Q180 75 ${x} 100" fill="none" stroke="${accent}" stroke-width="${1+row[j]*13}" opacity=".5"/><text x="${x}" y="118" text-anchor="middle">${tokens[id]}</text><text class="small" x="${x}" y="136" text-anchor="middle">${(row[j]*100).toFixed(1)}%</text>`;}).join('')}</svg>`;
 // Keep row order tied to identity, not slot, so permutation alone cannot look like a changed output.
 const strips=tokens.map((word,id)=>{const out=data.outputs[order.indexOf(id)],d=delta(out,baseline[panel].outputs[id]);return `<div class="output-row"><span class="word-label">${word}</span><div class="fingerprint" aria-label="Output vector for ${word}">${out.map((v,i)=>`<span tabindex="0" class="cell" style="background:${color(v)}" title="Feature ${i+1}: ${v.toFixed(5)}" aria-label="${word} feature ${i+1}: ${v.toFixed(5)}"></span>`).join('')}</div><span class="difference">Δ ${d<1e-12?'0.000000':d.toFixed(6)}</span></div>`;}).join('');
 $(`${enabled?'#on':'#off'} .visual`).innerHTML=svg+'<p class="output-title">OUTPUTS · ALIGNED BY WORD IDENTITY</p>'+strips;
 });
 $('#on h3').textContent=carried?'Words + carried addresses':'Words + their seats';
 $('#on .panel-description').textContent=carried?'Each word keeps its original position vector.':'A fixed position vector is added before attention.';
 $('#finding').textContent=order.every((id,i)=>id===i)?'This is the original sentence. Swap “dog” and “man” to test your prediction.':carried?'Both panels preserve each word’s output. Carrying the position vector means the complete input vectors were only rearranged.':'Position OFF: each word keeps its output (Δ = 0). Position ON: fixed seat addresses change the computation. Different vectors do not, by themselves, demonstrate understanding.';
}
$('#left').onclick=()=>move(selected,Math.max(0,order.indexOf(selected)-1));
$('#right').onclick=()=>move(selected,Math.min(2,order.indexOf(selected)+1));
$('#carry').onchange=e=>{carried=e.target.checked;render();};
$('#reset').onclick=()=>{order=[0,1,2];selected=0;carried=false;$('#carry').checked=false;render();};
render();
