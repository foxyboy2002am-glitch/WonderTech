/* WonderTech – client logo section. Load after app.js. */
(function(){
'use strict';
var CLIENTS=[
['aisha','Aisha Restaurant & Cafe','Aisha Restaurant & Cafe'],
['malazi','ملاذي','Malazi'],
['rema','REMA','REMA'],
['joepark','Joe Park','Joe Park'],
['almalaz','شركة الملاذ للتجارة والصناعة','Al-Malaz Trade & Industry'],
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
function home(){return /^(#\/?(home)?\/?)?$/.test(location.hash)}
function node(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n}
function mount(){
var app=document.getElementById('app');if(!app||!home())return;
if(app.querySelector('.wt-clients'))return;
var en=(document.documentElement.lang||'ar').toLowerCase().indexOf('en')===0;
var sec=node('section','s alt wt-clients');sec.id='clients';var w=node('div','w');
w.appendChild(node('h2','',en?'Our Clients':'عملاؤنا'));
w.appendChild(node('p','sub',en?'Proud to serve restaurants, cafés, factories and companies.':'نفخر بثقة شركائنا من المطاعم والكافيهات والمصانع والشركات.'));
var grid=node('div','wt-grid');
CLIENTS.forEach(function(c){var card=node('div','wt-client');var img=node('img');img.src='assets/clients/'+c[0]+'.webp';img.alt=en?c[2]:c[1];img.width=480;img.height=320;img.loading='lazy';img.decoding='async';img.onerror=function(){card.hidden=true};card.appendChild(img);card.appendChild(node('b','',en?c[2]:c[1]));grid.appendChild(card)});
w.appendChild(grid);sec.appendChild(w);
var old=app.querySelector('#projects');if(old)old.insertAdjacentElement('afterend',sec);else app.appendChild(sec);
}
var pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(function(){pending=false;mount()})}
function init(){var app=document.getElementById('app');if(!app)return;new MutationObserver(schedule).observe(app,{childList:true,subtree:true});window.addEventListener('hashchange',schedule);new MutationObserver(function(){var s=document.querySelector('.wt-clients');if(s)s.remove();schedule()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});mount()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();