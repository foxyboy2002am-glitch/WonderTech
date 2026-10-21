/* WONDERTECH storefront telemetry. Public anon key only; RLS is enforced in Supabase. */
(()=> {
 'use strict';
 let client=null, sessionId='';
 try {
   const cfg=window.WONDERTECH_SUPABASE_CONFIG;
   if(window.supabase&&cfg?.url&&cfg?.anonKey) client=window.supabase.createClient(cfg.url,cfg.anonKey);
   sessionId=localStorage.getItem('wt-analytics-session')||'';
   if(!/^[a-zA-Z0-9-]{8,100}$/.test(sessionId)) {
     sessionId=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():('wt-'+Date.now()+'-'+Math.random().toString(36).slice(2));
     localStorage.setItem('wt-analytics-session',sessionId);
   }
 } catch(e) { /* Analytics must never interrupt shopping. */ }
 const track=async(eventType,itemCount=0,metadata={})=>{
   if(!client)return null;
   try {
     return await client.from('wt_analytics_events').insert({
       session_id:sessionId,event_type:eventType,page_path:location.pathname,
       item_count:Math.max(0,Math.min(1000,Number(itemCount)||0)),metadata
     });
   } catch(e) { return null; }
 };
 window.WTTrack={
   sessionId,
   pageView:()=>track('page_view',0,{title:document.title}),
   cartUpdate:(items)=>track('cart_update',Object.values(items||{}).reduce((a,n)=>a+(Number(n)||0),0),{}),
   orderSubmitted:async order=>{
     if(!client)return {ok:false,reason:'analytics-unavailable'};
     try {
       const row={
         session_id:sessionId,customer_name:String(order.name||'').slice(0,160),
         customer_phone:String(order.phone||'').slice(0,40),customer_address:String(order.address||'').slice(0,500),
         items:Array.isArray(order.items)?order.items:[],total:Number(order.total)||0,
         notes:String(order.notes||'').slice(0,2000),status:'pending'
       };
       const saved=await client.from('wt_orders').insert(row).select('id').single();
       if(saved.error)return {ok:false,error:saved.error.message};
       await track('order_submitted',row.items.reduce((a,x)=>a+(Number(x.quantity)||0),0),{order_id:saved.data.id,total:row.total});
       return {ok:true,id:saved.data.id};
     } catch(e) { return {ok:false,error:String(e)}; }
   }
 };
 window.WTTrack.pageView();
})();