/* WONDERTECH fixes: point store links to the store page. */
(()=>{
 document.querySelectorAll('header a').forEach(a=>{
  if(a.dataset.wtStoreLink||!/المتجر|^\s*(Shop|Store)\s*$/i.test(a.textContent))return;
  a.dataset.wtStoreLink='1';a.href='store.html';
  a.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();location.href='store.html'},true);
 });
 const observer=new MutationObserver(()=>{
  document.querySelectorAll('header a').forEach(a=>{
   if(a.dataset.wtStoreLink||!/المتجر|^\s*(Shop|Store)\s*$/i.test(a.textContent))return;
   a.dataset.wtStoreLink='1';a.href='store.html';
   a.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();location.href='store.html'},true);
  });
 });
 observer.observe(document.body,{childList:true,subtree:true});
})();