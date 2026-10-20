-- Optional development sample records. Inactive with zero stock; not sellable.
insert into public.products (slug,name_ar,name_en,description_ar,description_en,sku,price,currency,stock_quantity,is_active)
values
('demo-laptop','لابتوب تجريبي','Demo laptop','عنصر تجريبي فقط','Sample only','DEMO-LAP-01',18500,'EGP',0,false),
('demo-camera','كاميرا مراقبة تجريبية','Demo security camera','عنصر تجريبي فقط','Sample only','DEMO-CAM-01',1450,'EGP',0,false),
('demo-pos','نظام نقاط بيع تجريبي','Demo POS system','عنصر تجريبي فقط','Sample only','DEMO-POS-01',8900,'EGP',0,false),
('demo-network','معدات شبكات تجريبية','Demo networking equipment','عنصر تجريبي فقط','Sample only','DEMO-NET-01',2350,'EGP',0,false),
('demo-erp','حلول ERP تجريبية','Demo ERP solution','عنصر تجريبي فقط','Sample only','DEMO-ERP-01',500,'EGP',0,false),
('demo-support','دعم فني تجريبي','Demo support service','عنصر تجريبي فقط','Sample only','DEMO-SUP-01',750,'EGP',0,false)
on conflict (slug) do update set price=excluded.price,is_active=false,stock_quantity=0;
