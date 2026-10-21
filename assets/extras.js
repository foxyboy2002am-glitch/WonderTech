/* WONDERTECH: enhance the existing client section; do not create a duplicate section. */
(()=>{
'use strict';
const CLIENTS=[
 ['aisha','Aisha Restaurant & Cafe','Aisha Restaurant & Cafe'],
 ['malazi','ملاذي','Malazi'],
 ['rema','REMA','REMA'],
 ['joepark','Joe Park','Joe Park'],
 ['almalaz','شركة الملاز للتجارة والصناعة','Al-Malaz Trade & Industry'],
 ['alsalam','مصنع السلام','Alsalam Factory'],
 ['alhayat','الحياة القابضة','Alhayat Capital'],
 ['logexco','LOGEXCO','LOGEXCO'],
 ['sultan','سلطان البن اليمني','Sultan of Yemeni Coffee'],
 ['hayaai','haya.ai','haya.ai'],
 ['chillin',"Chillin' Cafe & Restaurant","Chillin' Cafe & Restaurant"],
 ['leorugs','Leo Rugs','Leo Rugs'],
 ['line','مطعم وكافيه لاين','Line Restaurant & Cafe'],
 ['palm','Palm','Palm'],
 ['tavola','لا تافولا','La Tavola'],
 ['chickenfactor','Chicken Factor','Chicken Factor'],
 ['friendpeanut','Friend Peanut','Friend Peanut']
];
function fillExistingClientGrid(){
 const grids=document.querySelectorAll('#app .cl');
 if(!grids.length)return;
 const en=(document.documentElement.lang||'ar').toLowerCase().startsWith('en');
 grids.forEach(grid=>{
  if(grid.dataset.wtLogos==='1')return;
  grid.dataset.wtLogos='1';
  grid.innerHTML='';
  CLIENTS.forEach(([file,ar,enName])=>{
   const card=document.createElement('div');card.className='client-logo wt-client';
   const box=document.createElement('div');box.className='lgbox';
   const img=document.createElement('img');img.src='assets/clients/'+file+'.webp';img.alt=en?enName:ar;img.loading='lazy';img.decoding='async';
   img.onerror=()=>{box.textContent=(en?enName:ar).slice(0,2);};
   box.appendChild(img);card.appendChild(box);
   const label=document.createElement('b');label.textContent=en?enName:ar;card.appendChild(label);
   grid.appendChild(card);
  });
 });
}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;fillExistingClientGrid()})}
function init(){
 const app=document.getElementById('app');if(!app)return;
 new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 fillExistingClientGrid();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();