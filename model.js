export const tokens = ['dog', 'bites', 'man'];
const D = 8;
const embeddings = tokens.map((_, t) => Array.from({length:D}, (_,d) => Math.sin((t+1)*(d+1)*1.7)*0.8));
const matrix = phase => Array.from({length:D},(_,i)=>Array.from({length:D},(_,j)=>Math.sin((i+1)*(j+2)+phase)/Math.sqrt(D)));
const Wq=matrix(0.2), Wk=matrix(1.3), Wv=matrix(2.4);
const project=(x,w)=>w[0].map((_,j)=>x.reduce((s,v,i)=>s+v*w[i][j],0));
export function attention(order, positional=false, carry=false){
 const x=order.map((id,slot)=>embeddings[id].map((v,d)=>{
  const pos=carry?id:slot, angle=pos/10000**(2*Math.floor(d/2)/D);
  return v+(positional?(d%2?Math.cos(angle):Math.sin(angle)):0);
 }));
 const q=x.map(v=>project(v,Wq)), k=x.map(v=>project(v,Wk)), v=x.map(v=>project(v,Wv));
 const weights=q.map(row=>{
  const scores=k.map(key=>row.reduce((s,a,d)=>s+a*key[d],0)/Math.sqrt(D));
  const ex=scores.map(s=>Math.exp(s-Math.max(...scores))),sum=ex.reduce((a,b)=>a+b,0);
  return ex.map(a=>a/sum);
 });
 return {weights, outputs:weights.map(row=>Array.from({length:D},(_,d)=>row.reduce((s,a,j)=>s+a*v[j][d],0)))};
}
export const delta=(a,b)=>Math.max(...a.map((v,i)=>Math.abs(v-b[i])));
