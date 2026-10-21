/* WONDERTECH: shows the uploaded client logos + points "المتجر" to the new store page */
(()=>{
const C=[["aisha","Aisha"],["alhayat","Al Hayat"],["almalaz","Al Malaz"],["alsalam","Al Salam"],["chickenfactor","Chicken Factor"],["chillin","Chillin"],["friendpeanut","Friend Peanut"],["hayaai","Hayaai"],["joepark","Joe Park"],["leorugs","Leo Rugs"],["line","Line"],["logexco","Logexco"],["malazi","Malazi"],["palm","Palm"],["rema","Rema"],["sultan","Sultan"],["tavola","Tavola"]];
const html=C.map(([f,n])=>`<div class="client-logo wt-client"><div class="lgbox"><img src="assets/clients/${f}.webp" alt="${n}" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('${n[0]}'))"></div><b>${n}</b></div>`).join("");
const fix=()=>{
 document.querySelectorAll(".cl:not([data-wt])").forEach(e=>{e.dataset.wt=1;e.innerHTML=html});
 document.querySelectorAll("header a").forEach(a=>{
  if(a.dataset.wt||!/المتجر|^\s*(Shop|Store)\s*$/i.test(a.textContent))return;
  a.dataset.wt=1;a.href="store.html";
  a.addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();location.href="store.html"},true);
 });
};
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
fix();
})();