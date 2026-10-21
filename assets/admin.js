(()=> {
'use strict';
const $=s=>document.querySelector(s),cfg=window.WONDERTECH_SUPABASE_CONFIG||{};
let db=null,user=null,products=[],orders=[];
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>new Intl.NumberFormat('ar-EG',{style:'currency',currency:'EGP',maximumFractionDigits:2}).format(Number(n)||0);
const date=s=>new Date(s).toLocaleString('ar-EG');
const note=(s,bad=false)=>{const e=$('#notice');e.textContent=s;e.style.borderColor=bad?'#d85c70':'';e.classList.remove('hidden')};
async function boot(){
 if(!window.supabase||!cfg.url||!cfg.anonKey){note('إعداد Supabase غير مكتمل.',true);return}
 db=window.supabase.createClient(cfg.url,cfg.anonKey);
 const {data:{session}}=await db.auth.getSession();user=session?.user;
 if(!user){note('سجّل الدخول أولًا من صفحة تسجيل الدخول في Supabase ثم افتح لوحة الإدارة.',true);return}
 const {data:grant,error}=await db.from('wt_admins').select('user_id').eq('user_id',user.id).maybeSingle();
 if(error||!grant){note('هذا الحساب غير موجود في قائمة wt_admins. أضف UUID الحساب الإداري في Supabase.',true);return}
 $('#welcome').textContent='مرحبًا، '+(user.user_metadata?.full_name||user.email||user.id)+' · '+user.email;
 $('#dashboard').classList.remove('hidden');note('تم التحقق من صلاحيات حساب الإدارة.');await refreshAll();
 db.channel('wt-admin-orders').on('postgres_changes',{event:'INSERT',schema:'public',table:'wt_orders'},()=>{note('🔔 وصل طلب جديد.');refreshAll()}).subscribe();
}
async function refreshAll(){await Promise.all([loadProducts(),loadOrders(),loadMetrics()]);renderStats()}
async function loadProducts(){
 const {data,error}=await db.from('wt_products').select('id,name,slug,sku,price,status,track_inventory,created_at').order('created_at',{ascending:false}).limit(500);
 if(error){note('تعذر تحميل المنتجات: '+error.message,true);return}
 products=data||[];
 $('#products-body').innerHTML=products.length?products.map(p=>'<tr><td>'+safe(p.name)+'<br><small class="muted">'+safe(p.sku||p.slug)+'</small></td><td>'+money(p.price)+'</td><td>'+(p.track_inventory?'مخزون مفعل':'غير متتبع')+'</td><td><span class="pill">'+(p.status==='active'?'نشط':p.status==='draft'?'مسودة':'مؤرشف')+'</span></td><td><button class="btn2" data-edit="'+p.id+'">تعديل</button> <button class="btn2" data-toggle="'+p.id+'">'+(p.status==='active'?'إيقاف':'نشر')+'</button></td></tr>').join(''):'<tr><td colspan="5" class="empty">لا توجد منتجات في قاعدة البيانات الجديدة بعد.</td></tr>';
}
async function loadOrders(){
 const {data,error}=await db.from('wt_orders').select('id,order_number,customer_name,customer_phone,customer_address,total,status,created_at,items,notes,internal_notes,payment_status,payment_method').order('created_at',{ascending:false}).limit(200);
 if(error){note('تعذر تحميل الطلبات: '+error.message,true);return}
 orders=data||[];
 $('#orders-body').innerHTML=orders.length?orders.map(o=>'<tr><td>'+date(o.created_at)+'<br><small>'+safe(o.order_number||('#'+o.id))+'</small></td><td>'+safe(o.customer_name)+'<br><small>'+safe(o.customer_phone)+'</small></td><td>'+money(o.total)+'</td><td><select data-status="'+o.id+'">'+[['pending','قيد المتابعة'],['completed','مكتمل'],['cancelled','ملغي']].map(([v,l])=>'<option value="'+v+'" '+(o.status===v?'selected':'')+'>'+l+'</option>').join('')+'</select></td><td><button class="btn2" data-detail="'+o.id+'">عرض</button></td></tr>').join(''):'<tr><td colspan="5" class="empty">لا توجد طلبات مسجلة بعد في wt_orders.</td></tr>';
}
async function loadMetrics(){
 const since=new Date(Date.now()-30*86400000).toISOString();
 const [v,c,ev]=await Promise.all([
 db.from('wt_analytics_events').select('id',{count:'exact',head:true}).eq('event_type','page_view').gte('created_at',since),
 db.from('wt_analytics_events').select('session_id,item_count,created_at').eq('event_type','cart_update').gte('created_at',new Date(Date.now()-30*60000).toISOString()).order('created_at',{ascending:false}).limit(1000),
 db.from('wt_analytics_events').select('id,event_type,created_at,page_path').order('created_at',{ascending:false}).limit(8)
 ]);
 $('#visits-stat').textContent=v.error?'—':Number(v.count||0).toLocaleString('ar-EG');
 const latest=new Map();(c.data||[]).forEach(x=>{if(!latest.has(x.session_id))latest.set(x.session_id,x.item_count)});
 $('#carts-stat').textContent=c.error?'—':[...latest.values()].filter(n=>n>0).length.toLocaleString('ar-EG');
 $('#notifications-list').innerHTML=ev.error?'<li>تعذر تحميل النشاط: '+safe(ev.error.message)+'</li>':(ev.data||[]).map(x=>'<li><b>'+(x.event_type==='page_view'?'زيارة صفحة':x.event_type==='cart_update'?'تحديث سلة':'طلب جديد')+'</b><br><small>'+date(x.created_at)+' · '+safe(x.page_path||'')+'</small></li>').join('')||'<li>لا يوجد نشاط مسجل بعد.</li>';
}
function renderStats(){
 const completed=orders.filter(o=>o.status==='completed');
 $('#sales').textContent=money(completed.reduce((s,o)=>s+Number(o.total||0),0));
 $('#order-count').textContent=orders.length.toLocaleString('ar-EG');
 $('#product-count').textContent=products.filter(p=>p.status==='active').length.toLocaleString('ar-EG');
 $('#overview-recent').textContent=orders.length?'آخر تحديث: '+date(new Date())+' — الطلبات تعرض حسب أحدث وقت.':'لا توجد طلبات مسجلة بعد.';
}
function clearForm(){$('#product-form').reset();$('#product-id').value='';$('#product-form').classList.add('hidden')}
$('#new-product').onclick=()=>{clearForm();$('#product-form').classList.remove('hidden');$('#name-ar').focus()};
$('#cancel-product').onclick=clearForm;
$('#product-form').onsubmit=async e=>{
 e.preventDefault();const id=$('#product-id').value,ar=$('#name-ar').value.trim(),en=$('#name-en').value.trim();
 const slug=(id?products.find(p=>p.id===id)?.slug:en).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'product-'+Date.now();
 const row={slug,name:ar||en,short_description:$('#desc-ar').value.trim(),description:$('#desc-ar').value.trim(),sku:$('#sku').value.trim()||null,price:Number($('#price').value),currency:'EGP',track_inventory:true,status:$('#active').checked?'active':'draft',updated_at:new Date().toISOString()};
 const q=id?db.from('wt_products').update(row).eq('id',id):db.from('wt_products').insert(row);
 const {error}=await q;if(error){note('لم يتم حفظ المنتج: '+error.message,true);return}
 note('تم حفظ المنتج. أضف الصور والمخزون التفصيلي من صفحات الإدارة القادمة.');clearForm();await refreshAll();
};
$('#products-body').onclick=async e=>{
 const b=e.target.closest('button');if(!b)return;const p=products.find(x=>x.id===(b.dataset.edit||b.dataset.toggle));if(!p)return;
 if(b.dataset.edit){$('#product-id').value=p.id;$('#name-ar').value=p.name;$('#name-en').value=p.slug;$('#sku').value=p.sku||'';$('#price').value=p.price;$('#stock').value=0;$('#image-url').value='';$('#desc-ar').value=p.description||'';$('#desc-en').value='';$('#active').checked=p.status==='active';$('#product-form').classList.remove('hidden');scrollTo({top:0,behavior:'smooth'});return}
 if(b.dataset.toggle){const {error}=await db.from('wt_products').update({status:p.status==='active'?'draft':'active',updated_at:new Date().toISOString()}).eq('id',p.id);if(error)note(error.message,true);else await refreshAll()}
};
$('#orders-body').onchange=async e=>{const id=e.target.dataset.status;if(!id)return;const val=e.target.value;const {error}=await db.from('wt_orders').update({status:val,completed_at:val==='completed'?new Date().toISOString():null,updated_at:new Date().toISOString()}).eq('id',Number(id));if(error)note('تعذر تحديث حالة الطلب: '+error.message,true);else{note('تم تحديث حالة الطلب.');await refreshAll()}};
$('#orders-body').onclick=e=>{const id=e.target.closest('[data-detail]')?.dataset.detail;if(!id)return;const o=orders.find(x=>String(x.id)===String(id));$('#order-detail').textContent=JSON.stringify({order:o.order_number||o.id,date:o.created_at,status:o.status,total:o.total,customer:o.customer_name,phone:o.customer_phone,address:o.customer_address,payment_method:o.payment_method,payment_status:o.payment_status,notes:o.notes,internal_notes:o.internal_notes,items:o.items},null,2);$('#order-detail').classList.remove('hidden')};
$('#refresh-orders').onclick=refreshAll;
document.querySelectorAll('[data-tab]').forEach(a=>a.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===a));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('hidden',v.id!==a.dataset.tab))});
$('#logout').onclick=async()=>{if(db)await db.auth.signOut();location.href='analytics.html'};
boot().catch(e=>note('حدث خطأ: '+e.message,true));
})();