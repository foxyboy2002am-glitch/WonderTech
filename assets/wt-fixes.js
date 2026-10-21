/* WONDERTECH: keep store navigation fix separate from client markup.
   Client logos are handled by assets/extras.js only. */
(()=> {
 'use strict';
 const fixStoreLinks = () => {
   document.querySelectorAll("header a").forEach(a => {
     if (a.dataset.wtStoreLink || !/المتجر|^\s*(Shop|Store)\s*$/i.test(a.textContent)) return;
     a.dataset.wtStoreLink = "1";
     a.href = "store.html";
     a.addEventListener("click", e => {
       e.preventDefault();
       e.stopImmediatePropagation();
       location.href = "store.html";
     }, true);
   });
 };
 if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", fixStoreLinks, {once:true});
 } else {
   fixStoreLinks();
 }
 new MutationObserver(fixStoreLinks).observe(document.documentElement, {childList:true, subtree:true});
})();