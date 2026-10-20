/* ===== Edit these with the real details ===== */
const CFG={whatsapp:"201001346655",email:"",hours:"",facebook:"",instagram:"",linkedin:"",
 people:[{ar:"م. أحمد ماهر",en:"Eng. Ahmed Maher",tel:"01001346655"},{ar:"م. حسين جمال",en:"Eng. Hussein Gamal",tel:"01124288688"}],
 address:{ar:"21 شارع الحاج مصطفى، ظاهر الملك، حدائق القبة",en:"21 El-Hagg Mostafa St., Daher El-Malak, Hadayek El-Kobba"},
 stats:[],   /* e.g. {v:150,s:"+",ar:"عميل",en:"Clients"} */
 clients:["Aisha Restaurant & Cafe","الملازي","REMA","Joe Park","مصنع السلام","LOGEXCO","شركة الملاز للتجارة والصناعة","الحياة القابضة","haya.ai","السلطان البن اليمني","Chicken Factor","TAVOLA","U","مطعم وكافيه لاين","Friend Peanut"], /* approved client names */
 tm:[]       /* e.g. {name:"",role:"",ar:"",en:""} */};
/* ============================================ */
const D={
ar:{
nav:{home:"الرئيسية",about:"من نحن",services:"خدماتنا",industries:"حلول القطاعات",projects:"مشاريعنا",why:"لماذا WONDERTECH؟",contact:"تواصل معنا"},
tag:"حلول تكنولوجيا وأمن متكاملة",sw:"حلول ذكية لمستقبل أفضل",partner:"شريكك التقني",cap:["نقاط البيع POS","كاميرات المراقبة","لاب توب وكمبيوتر","الشبكات","البرمجيات","أنظمة ERP"],
h1:"حلول تكنولوجيا متكاملة لأعمال أكثر كفاءة",
lead:"نوفر حلول IT متكاملة للشركات والمصانع والمطاعم والكافيهات، من الشبكات وأنظمة المراقبة إلى نقاط البيع وحلول ERP والدعم الفني.",
quote:"اطلب عرض سعر",explore:"اكتشف خدماتنا",wa:"تحدث معنا عبر واتساب",call:"اتصل بنا",
svcT:"خدماتنا",svcS:"من البنية التحتية حتى الدعم اليومي، نغطي احتياجات شركتك التقنية.",
svc:[
["حلول تكنولوجيا المعلومات","حلول IT متكاملة تناسب احتياجات الشركات والمؤسسات، بداية من البنية التحتية وحتى الدعم الفني."],
["الشبكات والبنية التحتية","تصميم وتنفيذ شبكات الشركات والشبكات الداخلية وStructured Cabling، وتجهيز البنية التحتية التقنية."],
["كاميرات المراقبة وأنظمة الأمن","توريد وتركيب أنظمة CCTV للمصانع والشركات والمحال والمطاعم، مع إعداد أنظمة التسجيل والمراقبة."],
["أنظمة POS","توفير وتركيب أنظمة نقاط البيع وإعداد الأجهزة والبرامج المناسبة للمطاعم والكافيهات والأنشطة التجارية."],
["حلول ERP","توفير وتنفيذ حلول ERP مثل Odoo لإدارة العمليات والموارد والبيانات من خلال نظام متكامل."],
["الدعم الفني والصيانة","دعم فني وصيانة لأنظمة وأجهزة وشبكات الشركات، مع متابعة المشكلات والعمل على استمرارية التشغيل."],
["حلول المطاعم والكافيهات","حلول تقنية متكاملة تشمل POS والشبكات والكاميرات وأنظمة الإدارة."],
["أجهزة الكمبيوتر واللاب توب","توفير جميع أجهزة الكمبيوتر واللاب توب بأفضل الأسعار وأحدث الموديلات."]],
indT:"حلول القطاعات",indS:"نفس الخبرة، مفصّلة على طبيعة كل نشاط.",
ind:[
["المصانع","شبكات، CCTV، دعم فني، أنظمة ERP وبنية تحتية.",["شبكات","CCTV","ERP","دعم فني"]],
["المطاعم والكافيهات","POS وشبكات وكاميرات وحلول إدارة.",["POS","شبكات","CCTV","إدارة"]],
["الشركات والمؤسسات","حلول IT وبنية تحتية ودعم فني مستمر.",["IT","بنية تحتية","دعم فني"]],
["الأنشطة التجارية","نقاط بيع ومراقبة وبنية تحتية تقنية.",["POS","CCTV","بنية تحتية"]]],
whyT:"لماذا WONDERTECH؟",whyS:"نركز على حلول عملية تعمل كل يوم.",
why:[["حلول متكاملة","شبكات ومراقبة ونقاط بيع وERP ودعم فني من جهة واحدة."],["تركيز على التشغيل","هدفنا استمرارية عمل أنظمتك وتقليل توقفها."],["دعم فني متابع","نتابع المشكلات الفنية بعد التسليم ولا نتركها."],["حلول عملية","نختار الحل الذي يناسب نشاطك وميزانيتك."]],
abT:"من نحن",ab:["WONDERTECH شركة متخصصة في تقديم حلول تكنولوجيا المعلومات المتكاملة للشركات والمؤسسات، من خلال توفير حلول الشبكات وأنظمة المراقبة ونقاط البيع وأنظمة ERP والدعم والصيانة الفنية.","تركز الشركة على تقديم حلول عملية ومتكاملة تساعد الشركات على تطوير بنيتها التحتية التقنية، وتحسين كفاءة التشغيل، وتوفير الدعم الفني المستمر."],
prT:"مشاريعنا",prS:"عملاؤنا ومشاريع نفخر بها.",prE:"",
ctT:"تواصل معنا",ctS:"أرسل لنا احتياجك وسنرد عليك.",
fn:"الاسم",fc:"الشركة",fq:"ما الذي تحتاجه؟",send:"أرسل عبر واتساب",
cI:{phone:"الهاتف",email:"البريد الإلكتروني",address:"العنوان",hours:"مواعيد العمل"},
bandT:"اطلب حلًا تقنيًا مناسبًا لشركتك",bandP:"أخبرنا باحتياجك ونقترح عليك الحل الأنسب.",
clT:"عملاؤنا",tmT:"آراء العملاء",faqT:"الأسئلة الشائعة",faqS:"إجابات سريعة عن خدماتنا.",
faq:[["ما الخدمات التي تقدمها WONDERTECH؟","نقدم حلول IT متكاملة تشمل الشبكات والبنية التحتية وكاميرات المراقبة وأنظمة POS وحلول ERP والدعم الفني والصيانة."],["هل تخدمون المطاعم والكافيهات؟","نعم، لدينا حلول متكاملة للمطاعم والكافيهات تشمل POS والشبكات والكاميرات وأنظمة الإدارة."],["هل تقدمون دعمًا فنيًا بعد التركيب؟","نعم، نقدم دعمًا فنيًا وصيانة لأنظمة وأجهزة وشبكات الشركات، مع متابعة المشكلات للحفاظ على استمرارية التشغيل."],["ما القطاعات التي تعملون معها؟","المصانع، المطاعم والكافيهات، الشركات والمؤسسات، والأنشطة التجارية."],["كيف أطلب عرض سعر؟","أرسل لنا احتياجك من صفحة تواصل معنا أو عبر واتساب، وسنعود إليك."]],
lang:"English",menu:"القائمة",copy:"جميع الحقوق محفوظة."},
en:{
nav:{home:"Home",about:"About Us",services:"Our Services",industries:"Industry Solutions",projects:"Projects",why:"Why WONDERTECH",contact:"Contact Us"},
tag:"Integrated Technology & Security Solutions",sw:"Smart Solutions for a Better Future",partner:"Your Technology Partner",cap:["POS","CCTV","Laptops","Networking","Software","ERP Systems"],
h1:"Integrated technology solutions for more efficient business",
lead:"We deliver complete IT solutions for companies, factories, restaurants and cafes: from networks and surveillance to POS, ERP and technical support.",
quote:"Request a quote",explore:"Explore services",wa:"Chat on WhatsApp",call:"Call us",
svcT:"Our Services",svcS:"From infrastructure to daily support, we cover your company's technology needs.",
svc:[
["IT Solutions","Complete IT solutions for companies and institutions, from infrastructure to technical support."],
["Networks & Infrastructure","Design and implementation of corporate networks, local networks and structured cabling, plus technical infrastructure setup."],
["CCTV & Security Systems","Supply and installation of CCTV for factories, companies, shops and restaurants, including recording and monitoring setup."],
["POS Systems","Supply and installation of point-of-sale systems, with hardware and software suited to restaurants, cafes and retail."],
["ERP Solutions","Supply and implementation of ERP such as Odoo to manage operations, resources and data in one integrated system."],
["Technical Support & Maintenance","Support and maintenance for company systems, devices and networks, with follow-up to keep operations running."],
["Restaurant & Cafe Solutions","Integrated technology for restaurants and cafes: POS, networks, cameras and management systems."],
["Computers & Laptops","Supply of all computers and laptops at the best prices and the latest models."]],
indT:"Industry Solutions",indS:"The same expertise, shaped around how each business works.",
ind:[
["Factories","Networks, CCTV, technical support, ERP and infrastructure.",["Networks","CCTV","ERP","Support"]],
["Restaurants & Cafes","POS, networks, cameras and management solutions.",["POS","Networks","CCTV","Management"]],
["Companies & Institutions","IT solutions, infrastructure and ongoing technical support.",["IT","Infrastructure","Support"]],
["Commercial Businesses","Point of sale, surveillance and technical infrastructure.",["POS","CCTV","Infrastructure"]]],
whyT:"Why WONDERTECH",whyS:"We focus on practical solutions that work every day.",
why:[["Integrated solutions","Networks, surveillance, POS, ERP and support from one provider."],["Focus on uptime","Our goal is to keep your systems running and cut downtime."],["Follow-up support","We follow technical issues after delivery."],["Practical solutions","We pick what fits your business and budget."]],
abT:"About Us",ab:["WONDERTECH is a company specialized in integrated IT solutions for companies and institutions, covering networks, surveillance systems, point of sale, ERP, and technical support and maintenance.","We focus on practical, integrated solutions that help businesses improve their technical infrastructure, raise operational efficiency and get continuous technical support."],
prT:"Projects",prS:"Clients and projects we are proud of.",prE:"",
ctT:"Contact Us",ctS:"Tell us what you need and we'll get back to you.",
fn:"Name",fc:"Company",fq:"What do you need?",send:"Send via WhatsApp",
cI:{phone:"Phone",email:"Email",address:"Address",hours:"Working hours"},
bandT:"Request the right technology solution for your company",bandP:"Tell us what you need and we'll suggest the best fit.",
clT:"Our Clients",tmT:"Client Testimonials",faqT:"Frequently Asked Questions",faqS:"Quick answers about our services.",
faq:[["What does WONDERTECH offer?","Integrated IT solutions covering networks and infrastructure, CCTV, POS systems, ERP, and technical support and maintenance."],["Do you serve restaurants and cafes?","Yes. We provide integrated solutions for restaurants and cafes, including POS, networks, cameras and management systems."],["Do you offer support after installation?","Yes. We provide support and maintenance for company systems, devices and networks, and follow up on issues to keep operations running."],["Which sectors do you work with?","Factories, restaurants and cafes, companies and institutions, and commercial businesses."],["How do I request a quote?","Send us your requirements from the Contact page or on WhatsApp and we will get back to you."]],
lang:"العربية",menu:"Menu",copy:"All rights reserved."}};

let L="ar";try{L=localStorage.getItem("wt-lang")||"ar"}catch(e){}
const $=s=>document.querySelector(s),R=["home","about","services","industries","projects","why","contact"];
const wa=t=>"https://wa.me/"+CFG.whatsapp+(t?"?text="+encodeURIComponent(t):"");
const ARCS="assets/logo.png";
const CI=[3,2,7,1,8,4];
const IC=["M3 4h18v12H3zM8 20h8M12 16v4","M12 5h.01M5 19h.01M19 19h.01M12 7v5M12 12l-6 6M12 12l6 6","M3 8l12-3 2 6-12 3zM15 11l5 2M9 17l-1 4","M5 3h14v18H5zM8 7h8M8 12h2M12 12h2M8 16h2M12 16h2","M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z","M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z","M6 3v8M9 3v8M6 7h3M7.5 11v10M17 3c-2 2-2 6 0 8v10","M4 5h16v10H4zM2 19h20","M6.5 18a4 4 0 1 1 .6-7.95A5.5 5.5 0 0 1 17.6 9 4.5 4.5 0 0 1 17.5 18z"];
const svc=t=>`<div class="grid">${t.svc.map((x,i)=>`<div class="box tile"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[i]}"/></svg><h3>${x[0]}</h3><p style="margin:0">${x[1]}</p></div>`).join("")}</div>`;
const ind=t=>`<div class="grid">${t.ind.map(i=>`<div class="box"><h3>${i[0]}</h3><p>${i[1]}</p><div class="chips">${i[2].map(c=>`<span class="chip">${c}</span>`).join("")}</div></div>`).join("")}</div>`;
const why=t=>`<div class="grid">${t.why.map(i=>`<div class="box"><h3>${i[0]}</h3><p style="margin:0">${i[1]}</p></div>`).join("")}</div>`;
const CP=[["M1200 80H1010L960 130H800L760 170H650",650,170,5.5],["M1200 210H1090L1040 260H900",900,260,7],["M1200 340H1020L970 290H840L800 250H720",720,250,6.2],["M1200 470H930L880 420H760L720 380H600",600,380,8],["M1200 560H1100L1050 510H980",980,510,6.8]];
const circ=`<svg class="circ" viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">${CP.map((c,i)=>`<path class="tr" d="${c[0]}"/><path class="pu" pathLength="1000" d="${c[0]}" style="animation-duration:${c[3]}s;animation-delay:-${i*1.3}s"/><circle class="nd" cx="${c[1]}" cy="${c[2]}" r="8" style="animation-delay:-${i*.7}s"/>`).join("")}</svg>`;
const caps=t=>`<div class="cap">${t.cap.map((c,i)=>`<div><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[CI[i]]}"/></svg></i>${c}</div>`).join("")}</div>`;
const bgi=`<svg class="bgi" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${[[3,60,70,76],[2,300,470,80],[1,520,40,64],[7,40,410,90],[8,640,500,72],[4,900,470,70],[0,1090,60,70]].map((b,i)=>`<g class="fl" style="animation-delay:-${i*1.7}s;animation-duration:${8+i}s"><use href="#s${b[0]}" x="${b[1]}" y="${b[2]}" width="${b[3]}" height="${b[3]}"/></g>`).join("")}</svg>`;
const lk=(d,n)=>`<path class="tr" d="${d}"/><path class="pu" pathLength="1000" d="${d}" style="animation-duration:${n}s"/>`;
const scene=`<svg class="scene" viewBox="0 0 560 470" aria-hidden="true">
<ellipse cx="280" cy="430" rx="260" ry="24" fill="#2BC4FF" opacity=".13"/>
${lk("M470 78V150H300V170",3.4)}${lk("M300 262H350",1.8)}
<g class="fl" style="animation-duration:6s"><rect class="gl2" x="14" y="70" width="118" height="58" rx="12"/><path d="M44 82l15 5v11c0 9-7 14-15 17-8-3-15-8-15-17V87z" fill="none" stroke="#8BE6FF" stroke-width="2"/><path d="M36 98l6 6 11-12" fill="none" stroke="#4ADE80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="76" y="88" width="44" height="6" rx="3" fill="#8BE6FF" opacity=".7"/><rect x="76" y="102" width="30" height="6" rx="3" fill="#8BE6FF" opacity=".4"/></g>
<g class="fl" style="animation-duration:8s;animation-delay:-3s"><rect class="gl2" x="30" y="386" width="112" height="52" rx="12"/><path d="M52 420a8 8 0 1 1 1.5-15.8A11 11 0 0 1 75 407a7 7 0 0 1-1 13z" fill="none" stroke="#8BE6FF" stroke-width="2"/><rect x="90" y="402" width="40" height="6" rx="3" fill="#8BE6FF" opacity=".7"/><rect x="90" y="414" width="26" height="6" rx="3" fill="#8BE6FF" opacity=".4"/></g>
<rect x="50" y="170" width="250" height="166" rx="10" fill="url(#sg)" stroke="#2BC4FF" stroke-width="2.5"/>
<path d="M30 336H320L340 358H10Z" fill="#0B2350" stroke="#2BC4FF" stroke-width="2"/>
<circle cx="68" cy="186" r="3" fill="#FF6B6B"/><circle cx="80" cy="186" r="3" fill="#FFD166"/><circle cx="92" cy="186" r="3" fill="#4ADE80"/>
${[30,55,40,70,50].map((h,i)=>`<rect class="bar" x="${72+i*32}" y="${312-h}" width="20" height="${h}" rx="3" fill="#2BC4FF" style="animation-delay:-${i*.6}s"/>`).join("")}
<path class="ln" pathLength="100" d="M82 285L110 255L138 268L166 228L194 244L222 206" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
${[[200,50],[216,38],[232,46]].map((r,i)=>`<rect class="ty" x="240" y="${r[0]}" width="${r[1]}" height="5" rx="2.5" fill="#8BE6FF" style="animation-delay:-${i*.8}s"/>`).join("")}
<g class="rc"><rect x="386" y="190" width="62" height="100" rx="3" fill="#EAF3FF" opacity=".95"/>${[[202,46],[214,34],[226,40],[238,28],[250,46]].map(r=>`<rect x="394" y="${r[0]}" width="${r[1]}" height="4" rx="2" fill="#9FB3D4"/>`).join("")}</g>
<rect x="350" y="250" width="150" height="152" rx="14" fill="#0B2350" stroke="#2BC4FF" stroke-width="2.5"/>
<rect x="364" y="264" width="122" height="72" rx="7" fill="url(#sg)" stroke="#2BC4FF" stroke-opacity=".5"/>
${[274,288,302].map(y=>`<rect x="372" y="${y}" width="${50-(y-274)/2}" height="5" rx="2.5" fill="#8BE6FF" opacity=".6"/><rect x="458" y="${y}" width="20" height="5" rx="2.5" fill="#8BE6FF" opacity=".6"/>`).join("")}
<rect x="372" y="318" width="36" height="6" rx="3" fill="#fff"/><g class="rec" style="animation-duration:2s"><circle cx="467" cy="321" r="8" fill="#4ADE80"/><path d="M462 321l4 4 7-8" fill="none" stroke="#06122A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>
${[0,1,2].map(i=>[0,1].map(j=>`<rect x="${364+i*42}" y="${346+j*24}" width="36" height="16" rx="4" fill="#12305F" stroke="#2BC4FF" stroke-opacity=".45"/>`).join("")).join("")}
<g class="cam"><path d="M470 0V40" stroke="#2BC4FF" stroke-width="6" stroke-linecap="round"/><polygon points="410,60 220,170 380,300" fill="url(#bm)"/><rect x="408" y="38" width="96" height="36" rx="10" fill="#0B2350" stroke="#2BC4FF" stroke-width="2.5"/><circle cx="414" cy="56" r="13" fill="#06122A" stroke="#8BE6FF" stroke-width="2.5"/><circle cx="414" cy="56" r="5" fill="#2BC4FF"/><circle class="rec" cx="490" cy="50" r="4" fill="#FF4D5E"/></g>
<circle class="nd" cx="300" cy="170" r="6"/><circle class="nd" cx="350" cy="262" r="6"/></svg>`;
const lapG=`<rect x="50" y="170" width="250" height="166" rx="10" fill="url(#sg)" stroke="#2BC4FF" stroke-width="2.5"/>
<path d="M30 336H320L340 358H10Z" fill="#0B2350" stroke="#2BC4FF" stroke-width="2"/>
<circle cx="68" cy="186" r="3" fill="#FF6B6B"/><circle cx="80" cy="186" r="3" fill="#FFD166"/><circle cx="92" cy="186" r="3" fill="#4ADE80"/>
${[30,55,40,70,50].map((h,i)=>`<rect class="bar" x="${72+i*32}" y="${312-h}" width="20" height="${h}" rx="3" fill="#2BC4FF" style="animation-delay:-${i*.6}s"/>`).join("")}
<path class="ln" pathLength="100" d="M82 285L110 255L138 268L166 228L194 244L222 206" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
${[[200,50],[216,38],[232,46]].map((r,i)=>`<rect class="ty" x="240" y="${r[0]}" width="${r[1]}" height="5" rx="2.5" fill="#8BE6FF" style="animation-delay:-${i*.8}s"/>`).join("")}
`;
const posG=`<g class="rc"><rect x="386" y="190" width="62" height="100" rx="3" fill="#EAF3FF" opacity=".95"/>${[[202,46],[214,34],[226,40],[238,28],[250,46]].map(r=>`<rect x="394" y="${r[0]}" width="${r[1]}" height="4" rx="2" fill="#9FB3D4"/>`).join("")}</g>
<rect x="350" y="250" width="150" height="152" rx="14" fill="#0B2350" stroke="#2BC4FF" stroke-width="2.5"/>
<rect x="364" y="264" width="122" height="72" rx="7" fill="url(#sg)" stroke="#2BC4FF" stroke-opacity=".5"/>
${[274,288,302].map(y=>`<rect x="372" y="${y}" width="${50-(y-274)/2}" height="5" rx="2.5" fill="#8BE6FF" opacity=".6"/><rect x="458" y="${y}" width="20" height="5" rx="2.5" fill="#8BE6FF" opacity=".6"/>`).join("")}
<rect x="372" y="318" width="36" height="6" rx="3" fill="#fff"/><g class="rec" style="animation-duration:2s"><circle cx="467" cy="321" r="8" fill="#4ADE80"/><path d="M462 321l4 4 7-8" fill="none" stroke="#06122A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>
${[0,1,2].map(i=>[0,1].map(j=>`<rect x="${364+i*42}" y="${346+j*24}" width="36" height="16" rx="4" fill="#12305F" stroke="#2BC4FF" stroke-opacity=".45"/>`).join("")).join("")}
`;
const camG=`<g class="cam"><path d="M470 0V40" stroke="#2BC4FF" stroke-width="6" stroke-linecap="round"/><polygon points="410,60 220,170 380,300" fill="url(#bm)"/><rect x="408" y="38" width="96" height="36" rx="10" fill="#0B2350" stroke="#2BC4FF" stroke-width="2.5"/><circle cx="414" cy="56" r="13" fill="#06122A" stroke="#8BE6FF" stroke-width="2.5"/><circle cx="414" cy="56" r="5" fill="#2BC4FF"/><circle class="rec" cx="490" cy="50" r="4" fill="#FF4D5E"/></g>
`;
const dv=(vb,g,c)=>`<svg class="dv ${c}" viewBox="${vb}" aria-hidden="true">${g}</svg>`;
const DV=[dv("200 0 320 310",camG,"c"),dv("0 160 350 210",lapG,"l"),dv("340 180 170 230",posG,"p")];
let sc=0;
const decor=()=>`<div class="dec">${bgi}${circ}${circ.replace('class="circ"','class="circ l"')}${DV[sc++%3]}</div>`;
const head=(a,b)=>`<div class="pghead">${bgi}${circ}<div class="w"><h1>${a}</h1><p class="sub">${b}</p></div></div>`;
const sec=(c,alt)=>`<section class="s${alt?" alt":""}">${decor()}<div class="w">${c}</div></section>`;
const band=t=>`<div class="w" style="margin-top:64px"><div class="band">${bgi}${circ}<div style="position:relative"><p class="tag">${t.partner}</p><h2>${t.bandT}</h2><p>${t.bandP}</p><div class="btns"><a class="btn" href="#/contact">${t.quote}</a><a class="btn ghost" target="_blank" rel="noopener" href="${wa()}">${t.wa}</a></div></div></div></div>`;
const art=`<svg class="art" viewBox="0 0 420 340" fill="none" aria-hidden="true"><g stroke-linecap="round" stroke-width="12"><path class="dash" stroke="#1B6FD1" stroke-dasharray="700" d="M40 300C20 160 120 60 290 60"/><path class="dash" stroke="#1CA3EC" stroke-dasharray="700" d="M85 305C70 190 150 110 320 112"/><path class="dash" stroke="#7FD0FF" stroke-dasharray="700" d="M135 308C125 230 190 170 340 166"/></g><g stroke="#fff" stroke-width="7" fill="#0B1F3F"><circle cx="298" cy="60" r="16"/><circle cx="328" cy="112" r="16"/><circle cx="348" cy="166" r="16"/></g></svg>`;
const stats=()=>CFG.stats.length?`<div class="stats"><div class="w">${CFG.stats.map(x=>`<div><div class="n"><span class="cnt" data-v="${x.v}">0</span>${x.s||""}</div><span>${x[L]}</span></div>`).join("")}</div></div>`:"";
const clients=t=>CFG.clients.length?sec(`<h2>${t.clT}</h2><p class="sub">${L==="ar"?"نعتز بثقة عملائنا في قطاعات المطاعم والتجارة والصناعة والتكنولوجيا.":"Proud to support clients across hospitality, retail, industry, and technology."}</p><div class="cl">${CFG.clients.map(c=>`<span class="client-logo" title="${c}"><span class="client-logo-mark client-sprite ${c==="Chicken Factor"?"sprite-chicken":c==="Aisha Restaurant & Cafe"?"sprite-aisha":c==="Friend Peanut"?"sprite-friend":c==="مصنع السلام"?"sprite-alsalam":c==="LOGEXCO"?"sprite-logexco":c==="الملازي"?"sprite-malaz":c==="haya.ai"?"sprite-haya":c==="Joe Park"?"sprite-joe":c==="شركة الملاز للتجارة والصناعة"?"sprite-malaki":c==="الحياة القابضة"?"sprite-alhayat":c==="REMA"?"sprite-rema":c==="السلطان البن اليمني"?"sprite-sultan":c==="U"?"sprite-palm":""}" aria-hidden="true">${c==="Chicken Factor"?"CF":c==="Aisha Restaurant & Cafe"?"AR":c==="Joe Park"?"JP":c==="Friend Peanut"?"FP":c==="LOGEXCO"?"LX":c==="REMA"?"RE":c==="TAVOLA"?"TV":c==="haya.ai"?"AI":c==="U"?"P":c==="مصنع السلام"?"السلام":c==="الملازي"?"الملازي":c==="شركة الملاز للتجارة والصناعة"?"الملاز":c==="الحياة القابضة"?"الحياة":c==="السلطان البن اليمني"?"السلطان":c==="مطعم وكافيه لاين"?"LINE":c.slice(0,2).toUpperCase()}</span><b>${c}</b></span>`).join("")}</div><div class="partner-panel"><div><span class="partner-kicker">${L==="ar"?"شريك حلول ERP":"ERP SOLUTIONS PARTNER"}</span><h3>Odoo ERP</h3><p>${L==="ar"?"نساعد الشركات على تطبيق وتخصيص حلول Odoo لإدارة المبيعات والمخزون والحسابات والعمليات.":"Helping businesses implement and tailor Odoo for sales, inventory, accounting, and operations."}</p></div><span class="odoo-wordmark" aria-label="Odoo">odoo<span>●</span></span></div><article class="featured-client"><div class="featured-client-top"><span class="client-feature-mark large">CF</span><div><span class="partner-kicker">${L==="ar"?"عميل مميز":"FEATURED CLIENT"}</span><h3>Chicken Factor</h3></div></div><p>${L==="ar"?"حلول تقنية متكاملة للمصنع تشمل تجهيز البنية التقنية، وكاميرات المراقبة، ونظام ERP لدعم التشغيل والإدارة.":"Integrated technology for the factory, including IT infrastructure, CCTV surveillance, and an ERP system to support operations and management."}</p><div class="featured-tags"><span>IT Infrastructure</span><span>CCTV</span><span>ERP</span></div></article>`,1):"";
const tms=t=>CFG.tm.length?sec(`<h2>${t.tmT}</h2><div class="grid">${CFG.tm.map(m=>`<div class="box tm"><p>${m[L]}</p><b>${m.name}</b><small>${m.role||""}</small></div>`).join("")}</div>`):"";
const faq=t=>sec(`<h2>${t.faqT}</h2><p class="sub">${t.faqS}</p>${t.faq.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}`,1);
const P={
home:t=>`<div class="hero">${bgi}${circ}<div class="w"><div><p class="tag">${t.tag}</p><h1>${t.h1}</h1><p class="l">${t.lead}</p><p class="sw">${t.sw}</p><div class="btns"><a class="btn" href="#/contact">${t.quote}</a><a class="btn ghost" href="#/services">${t.explore}</a></div></div>${scene}${caps(t)}</div></div>`+stats()
+sec(`<h2>${t.svcT}</h2><p class="sub">${t.svcS}</p>${svc(t)}`)+sec(`<h2>${t.indT}</h2><p class="sub">${t.indS}</p>${ind(t)}`,1)+sec(`<h2>${t.whyT}</h2><p class="sub">${t.whyS}</p>${why(t)}`)+clients(t)+tms(t)+faq(t)+band(t),
about:t=>head(t.abT,t.ab[0])+sec(`<p style="max-width:44em;margin:0">${t.ab[1]}</p>`)+stats()+sec(`<h2>${t.whyT}</h2>${why(t)}`,1)+band(t),
services:t=>head(t.svcT,t.svcS)+sec(svc(t))+band(t),
industries:t=>head(t.indT,t.indS)+sec(ind(t))+band(t),
projects:t=>head(t.prT,t.prS)+clients(t)+band(t),
why:t=>head(t.whyT,t.whyS)+sec(why(t))+tms(t)+band(t),
contact:t=>head(t.ctT,t.ctS)+sec(`<div class="cols"><div><label for="n">${t.fn}</label><input id="n"><label for="c">${t.fc}</label><input id="c"><label for="q">${t.fq}</label><textarea id="q" rows="4"></textarea><button class="btn wa" id="go">${t.send}</button></div><div>${CFG.people.map(p=>`<div class="ci"><span>${p[L]}</span><div class="ls"><a dir="ltr" href="tel:${p.tel}"><b>${p.tel}</b></a><a target="_blank" rel="noopener" href="https://wa.me/2${p.tel}">${L==="ar"?"واتساب":"WhatsApp"}</a></div></div>`).join("")}<div class="ci"><span>${t.cI.address}</span><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CFG.address.en)}"><b>${CFG.address[L]}</b></a></div>${["email","hours"].map(k=>CFG[k]?`<div class="ci"><span>${t.cI[k]}</span><b dir="ltr">${CFG[k]}</b></div>`:"").join("")}${["facebook","instagram","linkedin"].map(k=>CFG[k]?`<div class="ci"><span>${k}</span><a href="${CFG[k]}" target="_blank" rel="noopener">${CFG[k]}</a></div>`:"").join("")}</div></div>`)+faq(t)};

const SHOP_COPY={
 ar:{
  titles:{store:"المتجر التجريبي",checkout:"إتمام طلب تجريبي",login:"تسجيل الدخول",register:"إنشاء حساب",account:"حسابي",cart:"سلة التسوق",wishlist:"المفضلة","reset-password":"استعادة كلمة المرور"},
  shop:"المتجر",signIn:"دخول",account:"حسابي",cart:"السلة",wishlist:"المفضلة",
  eyebrow:"تجهيز للمتجر الإلكتروني",storeTitle:"متجر WonderTech — جاهز للتطوير",storeLead:"هذه معاينة للكتالوج وتجربة التصفح فقط. المنتجات المعروضة نماذج وليست مخزونًا أو أسعار بيع فعلية.",
  demo:"معاينة تجريبية",priceOnRequest:"السعر عند الطلب",addCart:"أضف للسلة",addWish:"أضف للمفضلة",removeWish:"إزالة من المفضلة",viewCart:"عرض السلة",emptyCart:"سلتك فارغة حاليًا.",emptyWish:"لم تضف منتجات للمفضلة بعد.",qty:"الكمية",remove:"حذف",checkout:"الدفع الإلكتروني غير مفعّل بعد",continueShop:"متابعة التصفح",cartNote:"السلة الحالية على هذا الجهاز لأغراض المعاينة. ربطها بحسابك سيتم بعد إعداد Supabase.",
  loginTitle:"أهلًا بعودتك",loginLead:"سجّل الدخول لإدارة حسابك عندما يتم إعداد خدمة المصادقة.",email:"البريد الإلكتروني",password:"كلمة المرور",newPassword:"كلمة المرور الجديدة",confirmPassword:"تأكيد كلمة المرور",fullName:"الاسم بالكامل",signInAction:"تسجيل الدخول",createAccount:"إنشاء حساب",forgot:"نسيت كلمة المرور؟",noAccount:"ليس لديك حساب؟",hasAccount:"لديك حساب بالفعل؟",sendReset:"إرسال رابط الاستعادة",savePassword:"حفظ كلمة المرور الجديدة",accountTitle:"حسابي",signedOut:"أنت غير مسجّل الدخول.",signOut:"تسجيل الخروج",authSetup:"تسجيل الدخول غير مفعّل بعد. أكمل إعداد Supabase في ملف assets/supabase-config.js ثم فعّل سياسات قاعدة البيانات.",authError:"تعذّر إكمال الطلب. راجع الإعدادات وحاول مرة أخرى.",signupSent:"إذا كان إعداد Supabase صحيحًا، راجع بريدك لتأكيد الحساب.",resetSent:"إذا كان البريد مسجلًا، ستصلك رسالة استعادة.",passwordUpdated:"تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن.",loginSuccess:"تم تسجيل الدخول.",setupTitle:"قبل تفعيل الحسابات",setupBody:"أضف رابط مشروع Supabase ومفتاح anon/public في ملف الإعدادات. لا تستخدم service_role key في المتصفح.",catalogTitle:"المنتجات",demoLabel:"نموذج تجريبي",productLaptop:"لابتوب — نموذج تجريبي",productCamera:"كاميرا مراقبة — نموذج تجريبي",productPos:"نظام نقاط بيع — نموذج تجريبي",productNetwork:"معدات شبكات — نموذج تجريبي",productErp:"حلول برمجية وERP — نموذج تجريبي",productSupport:"خدمات دعم فني — نموذج تجريبي",productDesc:"سيتم استبدال بيانات المثال بمنتجاتك وأسعارك وصورك الفعلية من لوحة الإدارة عند تفعيل المتجر.",accountLead:"بيانات حسابك وحالة تسجيل الدخول.",emailConfirm:"قد يطلب منك تأكيد البريد الإلكتروني قبل تسجيل الدخول."
 },
 en:{
  titles:{store:"Store Preview",checkout:"Demo checkout",login:"Sign in",register:"Create account",account:"My account",cart:"Shopping cart",wishlist:"Wishlist","reset-password":"Reset password"},
  shop:"Store",signIn:"Sign in",account:"Account",cart:"Cart",wishlist:"Wishlist",
  eyebrow:"E-commerce preparation",storeTitle:"WonderTech Store — Ready to Build",storeLead:"This is a catalog and browsing preview only. Items are samples, not actual stock or sale prices.",
  demo:"Demo preview",priceOnRequest:"Price on request",addCart:"Add to cart",addWish:"Add to wishlist",removeWish:"Remove from wishlist",viewCart:"View cart",emptyCart:"Your cart is empty.",emptyWish:"Your wishlist is empty.",qty:"Quantity",remove:"Remove",checkout:"Online checkout is not enabled yet",continueShop:"Continue browsing",cartNote:"The current cart is stored on this device for preview purposes. Account syncing will follow Supabase setup.",
  loginTitle:"Welcome back",loginLead:"Sign in to manage your account once authentication is configured.",email:"Email address",password:"Password",newPassword:"New password",confirmPassword:"Confirm password",fullName:"Full name",signInAction:"Sign in",createAccount:"Create account",forgot:"Forgot password?",noAccount:"Don't have an account?",hasAccount:"Already have an account?",sendReset:"Send reset link",savePassword:"Save new password",accountTitle:"My account",signedOut:"You are not signed in.",signOut:"Sign out",authSetup:"Sign-in is not enabled yet. Complete Supabase setup in assets/supabase-config.js and enable database policies.",authError:"The request could not be completed. Check the setup and try again.",signupSent:"If Supabase is configured correctly, check your email to confirm your account.",resetSent:"If the email is registered, a reset message will be sent.",passwordUpdated:"Password updated. You can sign in now.",loginSuccess:"You are signed in.",setupTitle:"Before enabling accounts",setupBody:"Add your Supabase project URL and anon/public key to the config file. Never use the service_role key in the browser.",catalogTitle:"Products",demoLabel:"Demo item",productLaptop:"Laptop — demo item",productCamera:"Security camera — demo item",productPos:"POS system — demo item",productNetwork:"Networking equipment — demo item",productErp:"Software & ERP — demo item",productSupport:"Technical support — demo item",productDesc:"Example data will be replaced by your real products, prices, and images when the store admin is enabled.",accountLead:"Your account details and sign-in status.",emailConfirm:"You may need to confirm your email before signing in."
 }
};
const SHOP_PRODUCTS=[
 {id:"demo-laptop",key:"productLaptop",icon:"laptop",price:18500},
 {id:"demo-camera",key:"productCamera",icon:"camera",price:1450},
 {id:"demo-pos",key:"productPos",icon:"monitor",price:8900},
 {id:"demo-network",key:"productNetwork",icon:"network",price:2350},
 {id:"demo-erp",key:"productErp",icon:"layers",price:500},
 {id:"demo-support",key:"productSupport",icon:"headphones",price:750}
];
function money(v){return new Intl.NumberFormat(L==="ar"?"ar-EG":"en-EG",{style:"currency",currency:"EGP",maximumFractionDigits:0}).format(v)}
function cartTotal(){return cartItems().reduce((s,x)=>s+(SHOP_PRODUCTS.find(p=>p.id===x.id)?.price||0)*x.qty,0)}
let supabaseClient=null,authUser=null,authMessage="";
function initSupabase(){
 const c=window.WONDERTECH_SUPABASE_CONFIG||{};
 if(!window.supabase||!c.url||!c.anonKey||c.url.includes("YOUR-PROJECT")||c.anonKey.includes("YOUR_SUPABASE"))return null;
 try{return window.supabase.createClient(c.url,c.anonKey)}catch(e){console.error("Supabase client setup failed",e);return null}
}
supabaseClient=initSupabase();
if(supabaseClient){
 supabaseClient.auth.getSession().then(({data})=>{authUser=data.session?.user||null;render();}).catch(()=>{});
 supabaseClient.auth.onAuthStateChange((_event,session)=>{authUser=session?.user||null;});
}
function shopMsg(){return SHOP_COPY[L];}
function safeText(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function readList(key){try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?v:[]}catch(e){return[]}}
function saveList(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(e){return false}}
function cartItems(){return readList("wt-cart").filter(x=>SHOP_PRODUCTS.some(p=>p.id===x.id)&&Number.isInteger(x.qty)&&x.qty>0)}
function wishItems(){return readList("wt-wishlist").filter(id=>SHOP_PRODUCTS.some(p=>p.id===id))}
function productCard(p){
 const t=shopMsg(),inWish=wishItems().includes(p.id),cart=cartItems().some(x=>x.id===p.id);
 return '<article class="box shop-product"><div class="shop-product-art" aria-hidden="true"><span>'+({laptop:"▣",camera:"◉",monitor:"▤",network:"⌘",layers:"◇",headphones:"◖"}[p.icon]||"◇")+'</span></div><span class="shop-demo">'+t.demo+'</span><h3>'+t[p.key]+'</h3><p>'+t.productDesc+'</p><div class="shop-product-bottom"><b>'+money(p.price)+'</b><small class="demo-price">'+(L==="ar"?"سعر تجريبي":"Demo price")+'</small><div class="shop-card-actions"><button class="btn shop-small" data-add-cart="'+p.id+'">'+(cart?t.viewCart:t.addCart)+'</button><button class="icon-action" aria-label="'+(inWish?t.removeWish:t.addWish)+'" title="'+(inWish?t.removeWish:t.addWish)+'" data-toggle-wish="'+p.id+'">'+(inWish?"♥":"♡")+'</button></div></div></article>';
}
function shopPage(){
 const t=shopMsg();
 return '<section class="page-head"><div class="w"><p class="tag">'+t.eyebrow+'</p><h1>'+t.storeTitle+'</h1><p class="sub">'+t.storeLead+'</p><span class="shop-demo">'+t.demo+'</span></div></section><section class="s"><div class="w"><h2>'+t.catalogTitle+'</h2><div class="grid shop-grid">'+SHOP_PRODUCTS.map(productCard).join("")+'</div></div></section>';
}
function loginPage(register=false,reset=false){
 const t=shopMsg(),resetNewPassword=reset&&new URLSearchParams(location.search).get("auth")==="reset";
 const title=reset?(resetNewPassword?t.titles["reset-password"]:t.titles["reset-password"]):(register?t.titles.register:t.loginTitle);
 let fields="";
 if(register)fields='<label for="auth-name">'+t.fullName+'</label><input id="auth-name" name="name" autocomplete="name" required>';
 if(reset&&!resetNewPassword)fields+='<label for="auth-email">'+t.email+'</label><input id="auth-email" name="email" type="email" autocomplete="email" required>';
 if(!reset)fields+='<label for="auth-email">'+t.email+'</label><input id="auth-email" name="email" type="email" autocomplete="email" required>';
 if(!reset)fields+='<label for="auth-password">'+t.password+'</label><input id="auth-password" name="password" type="password" autocomplete="'+(register?"new-password":"current-password")+'" minlength="8" required>';
 if(resetNewPassword)fields+='<label for="auth-password">'+t.newPassword+'</label><input id="auth-password" name="password" type="password" autocomplete="new-password" minlength="8" required><label for="auth-confirm">'+t.confirmPassword+'</label><input id="auth-confirm" name="confirm" type="password" autocomplete="new-password" minlength="8" required>';
 if(register)fields+='<label for="auth-confirm">'+t.confirmPassword+'</label><input id="auth-confirm" name="confirm" type="password" autocomplete="new-password" minlength="8" required>';
 return '<section class="page-head"><div class="w"><p class="tag">'+t.eyebrow+'</p><h1>'+title+'</h1><p class="sub">'+t.loginLead+'</p></div></section><section class="s"><div class="w"><div class="box auth-card">'+(!supabaseClient?'<div class="auth-notice">'+t.authSetup+'</div>':'')+'<form id="auth-form">'+fields+'<p id="auth-message" class="form-message" role="status" aria-live="polite">'+safeText(authMessage)+'</p><button class="btn" type="submit">'+(reset?(resetNewPassword?t.savePassword:t.sendReset):(register?t.createAccount:t.signInAction))+'</button></form><div class="auth-links">'+(reset?'<a href="#/login">'+t.signInAction+'</a>':(register?'<a href="#/login">'+t.hasAccount+'</a>':'<a href="#/reset-password">'+t.forgot+'</a><a href="#/register">'+t.noAccount+'</a>'))+'</div></div></div></section>';
}
function accountPage(){
 const t=shopMsg();
 if(!authUser)return '<section class="page-head"><div class="w"><h1>'+t.accountTitle+'</h1><p class="sub">'+t.signedOut+'</p><a class="btn" href="#/login">'+t.signInAction+'</a></div></section>';
 const accountName=authUser.user_metadata?.full_name||authUser.user_metadata?.name||authUser.email?.split("@")[0]||t.accountTitle;
 return '<section class="page-head"><div class="w"><h1>'+t.accountTitle+'</h1><p class="sub">'+t.accountLead+'</p></div></section><section class="s"><div class="w"><div class="box auth-card"><p><b>'+(L==="ar"?"الاسم":"Name")+':</b> '+safeText(accountName)+'</p><p><b>'+t.email+':</b> '+safeText(authUser.email)+'</p><p class="form-message">'+safeText(authMessage)+'</p><button class="btn" id="sign-out">'+t.signOut+'</button></div></div></section>';
}
function cartPage(){
 const t=shopMsg(),items=cartItems();
 if(!items.length)return '<section class="page-head"><div class="w"><h1>'+t.cart+'</h1><p class="sub">'+t.emptyCart+'</p><a class="btn" href="#/store">'+t.continueShop+'</a></div></section>';
 return '<section class="page-head"><div class="w"><h1>'+t.cart+'</h1><p class="sub">'+t.cartNote+'</p></div></section><section class="s"><div class="w"><div class="grid">'+items.map(item=>{const p=SHOP_PRODUCTS.find(p=>p.id===item.id);return '<article class="box cart-row"><div><h3>'+t[p.key]+'</h3><p>'+money(p.price)+" × "+item.qty+'</p><label>'+t.qty+' <input class="cart-qty" type="number" min="1" max="99" value="'+item.qty+'" data-cart-qty="'+item.id+'"></label></div><button class="btn ghost" data-remove-cart="'+item.id+'">'+t.remove+'</button></article>'}).join("")+'</div><div class="cart-total"><span>'+(L==="ar"?"الإجمالي التجريبي":"Demo total")+'</span><strong>'+money(cartTotal())+'</strong></div><p class="checkout-note">'+t.checkout+'</p><a class="btn" href="#/checkout">'+(L==="ar"?"تجربة إتمام الطلب":"Try demo checkout")+'</a><p><a href="#/store">'+t.continueShop+'</a></p></div></section>';
}
function checkoutPage(){
 const t=shopMsg(),items=cartItems();
 if(!items.length)return '<section class="page-head"><div class="w"><h1>'+(L==="ar"?"إتمام الطلب":"Checkout")+'</h1><p class="sub">'+t.emptyCart+'</p><a class="btn" href="#/store">'+t.continueShop+'</a></div></section>';
 return '<section class="page-head"><div class="w"><h1>'+(L==="ar"?"إتمام طلب تجريبي":"Demo checkout")+'</h1><p class="sub">'+(L==="ar"?"تجربة فقط — لن يتم تحصيل أموال أو إنشاء طلب حقيقي.":"Demo only — no money will be charged and no real order will be created.")+'</p></div></section><section class="s"><div class="w"><div class="box auth-card"><div class="cart-total"><span>'+(L==="ar"?"الإجمالي":"Total")+'</span><strong>'+money(cartTotal())+'</strong></div><form id="demo-checkout-form"><label for="demo-name">'+(L==="ar"?"الاسم بالكامل":"Full name")+'</label><input id="demo-name" autocomplete="name" required maxlength="100"><label for="demo-phone">'+(L==="ar"?"رقم الهاتف":"Phone number")+'</label><input id="demo-phone" autocomplete="tel" required maxlength="30"><label for="demo-address">'+(L==="ar"?"عنوان التوصيل":"Delivery address")+'</label><textarea id="demo-address" required maxlength="300"></textarea><p class="auth-notice">'+(L==="ar"?"لا تدخل بيانات بطاقة الدفع؛ الدفع الحقيقي غير مفعّل.":"Do not enter card details; real payment is not enabled.")+'</p><p id="demo-checkout-message" class="form-message" role="status" aria-live="polite"></p><button class="btn" type="submit">'+(L==="ar"?"تأكيد الطلب التجريبي":"Place demo order")+'</button></form></div></div></section>';
}
function wishlistPage(){
 const t=shopMsg(),ids=wishItems(),products=SHOP_PRODUCTS.filter(p=>ids.includes(p.id));
 return '<section class="page-head"><div class="w"><h1>'+t.wishlist+'</h1><p class="sub">'+(products.length?t.demo:t.emptyWish)+'</p></div></section><section class="s"><div class="w"><div class="grid shop-grid">'+products.map(productCard).join("")+'</div><a class="btn" href="#/store">'+t.continueShop+'</a></div></section>';
}
function attachShopHandlers(){
 document.querySelectorAll("[data-add-cart]").forEach(b=>b.onclick=()=>{const id=b.dataset.addCart;const current=cartItems();if(current.some(x=>x.id===id)){location.hash="#/cart";return}current.push({id,qty:1});saveList("wt-cart",current);authMessage="";render();});
 document.querySelectorAll("[data-toggle-wish]").forEach(b=>b.onclick=()=>{const id=b.dataset.toggleWish,items=wishItems();saveList("wt-wishlist",items.includes(id)?items.filter(x=>x!==id):[...items,id]);render();});
 document.querySelectorAll("[data-remove-cart]").forEach(b=>b.onclick=()=>{saveList("wt-cart",cartItems().filter(x=>x.id!==b.dataset.removeCart));render();});
 document.querySelectorAll("[data-cart-qty]").forEach(i=>i.onchange=()=>{const q=Math.max(1,Math.min(99,parseInt(i.value,10)||1));saveList("wt-cart",cartItems().map(x=>x.id===i.dataset.cartQty?{...x,qty:q}:x));render();});
 const demoForm=$("#demo-checkout-form");if(demoForm)demoForm.onsubmit=e=>{e.preventDefault();const orders=readList("wt-demo-orders");orders.push({name:$("#demo-name").value.trim(),phone:$("#demo-phone").value.trim(),address:$("#demo-address").value.trim(),items:cartItems(),total:cartTotal(),demo:true,createdAt:new Date().toISOString()});saveList("wt-demo-orders",orders);saveList("wt-cart",[]);$("#demo-checkout-message").textContent=L==="ar"?"تم حفظ تجربة الطلب على هذا الجهاز فقط؛ لم يتم الدفع أو إنشاء طلب حقيقي.":"Demo checkout saved on this device only; no payment or real order was created.";demoForm.querySelector("button").disabled=true;};
 const out=$("#sign-out");if(out)out.onclick=async()=>{if(!supabaseClient){authMessage=shopMsg().authSetup;render();return}const {error}=await supabaseClient.auth.signOut();authMessage=error?shopMsg().authError:"";authUser=null;render();};
 const form=$("#auth-form");if(form)form.onsubmit=async e=>{
  e.preventDefault();const t=shopMsg(),msg=$("#auth-message");const email=$("#auth-email")?.value.trim()||"";
  if(!supabaseClient){msg.textContent=t.authSetup;return}
  const password=$("#auth-password")?.value||"";
  try{
   let result;
   if(location.hash==="#/register"){
    const name=$("#auth-name")?.value.trim()||"",confirm=$("#auth-confirm")?.value||"";
    if(password!==confirm){msg.textContent=L==="ar"?"كلمتا المرور غير متطابقتين.":"Passwords do not match.";return}
    result=await supabaseClient.auth.signUp({email,password,options:{data:{full_name:name}}});
    if(!result.error){authUser=result.data.session?.user||null;msg.textContent=t.signupSent;}
   }else if(location.hash==="#/reset-password"){
    if(new URLSearchParams(location.search).get("auth")==="reset"){
     const confirm=$("#auth-confirm")?.value||"";
     if(password!==confirm){msg.textContent=L==="ar"?"كلمتا المرور غير متطابقتين.":"Passwords do not match.";return}
     result=await supabaseClient.auth.updateUser({password});
     if(!result.error)msg.textContent=t.passwordUpdated;
    }else{
     result=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname+"?auth=reset#/reset-password"});
     if(!result.error)msg.textContent=t.resetSent;
    }
   }else{
    result=await supabaseClient.auth.signInWithPassword({email,password});
    if(!result.error){authUser=result.data.user;msg.textContent=t.loginSuccess;setTimeout(()=>{location.hash="#/account";},300);}
   }
   if(result.error)msg.textContent=t.authError;
  }catch(err){msg.textContent=t.authError;}
 };
}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,v=+el.dataset.v;let st=null;const f=ts=>{st=st||ts;const p=Math.min((ts-st)/1200,1);el.textContent=Math.round(v*p);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f);io.unobserve(el)}));
function render(){
 const t=D[L],r=(location.hash.replace("#/","")||"home"),p=(R.includes(r)||["store","checkout","login","register","account","cart","wishlist","reset-password"].includes(r))?r:"home";
 document.documentElement.lang=L;document.documentElement.dir=L==="ar"?"rtl":"ltr";
 $("#nav").innerHTML=R.map(k=>`<a href="#/${k}" class="${k===p?"on":""}">${t.nav[k]}</a>`).join("");
 $("#lg").textContent=t.lang;$("#mb").textContent=t.menu;
 sc=0;$("#app").innerHTML=(p==="store"?shopPage():p==="checkout"?checkoutPage():p==="login"?loginPage():p==="register"?loginPage(true):p==="reset-password"?loginPage(false,true):p==="account"?accountPage():p==="cart"?cartPage():p==="wishlist"?wishlistPage():P[p](t));
 document.querySelectorAll(".cnt").forEach(e=>{if(matchMedia("(prefers-reduced-motion:reduce)").matches)e.textContent=e.dataset.v;else io.observe(e)});
 $("#fab").href=wa();$("#fab").target="_blank";$("#fab").textContent=t.wa;
 document.querySelectorAll(".lg").forEach(e=>e.src=ARCS);
 $("#fl").innerHTML=`<a class="logo" href="#/home"><img class="lg" src="${ARCS}" alt=""><b dir="ltr">WONDER<i>TECH</i></b></a><p class="sw">${t.sw}</p><p>© 2026 WONDERTECH. ${t.copy}</p>`;
 $("#fm").innerHTML=CFG.people.map(p=>`<p style="margin:0 0 10px">${p[L]}<br><a dir="ltr" href="tel:${p.tel}">${p.tel}</a></p>`).join("")+`<p>${CFG.address[L]}</p>`;
 $("#fr").innerHTML=R.map(k=>`<a href="#/${k}">${t.nav[k]}</a>`).join("");
 document.title="WONDERTECH | "+(shopMsg().titles[p]||t.nav[p]||"");
 const shopText=shopMsg(),cartCount=cartItems().reduce((n,x)=>n+x.qty,0),displayName=authUser?(authUser.user_metadata?.full_name||authUser.user_metadata?.name||authUser.email?.split("@")[0]||shopText.account):shopText.signIn;
 $("#shop-actions").innerHTML=`<a href="#/store" class="shop-nav-link">${shopText.shop}</a><a href="#/${authUser?"account":"login"}" class="shop-nav-link">${safeText(displayName)}</a><a href="#/wishlist" class="shop-nav-link">${shopText.wishlist}</a><a href="#/cart" class="shop-cart-bubble" aria-label="${shopText.cart}, ${cartCount}" title="${shopText.cart}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg><span id="cart-count" class="cart-count-badge">${cartCount}</span></a>`;
 attachShopHandlers();
 const g=$("#go");if(g)g.onclick=()=>{const m=`${t.fn}: ${$("#n").value}\n${t.fc}: ${$("#c").value}\n${$("#q").value}`;window.open(wa(m),"_blank","noopener,noreferrer")};
 $("#nav").classList.remove("open");$("#mb").setAttribute("aria-expanded","false");
}
window.addEventListener("hashchange",()=>{render();scrollTo(0,0)});
$("#lg").onclick=()=>{L=L==="ar"?"en":"ar";try{localStorage.setItem("wt-lang",L)}catch(e){}render()};
$("#mb").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#mb").setAttribute("aria-expanded",String(o))};
$("#nav").addEventListener("click",e=>{if(e.target.closest("a")){$("#nav").classList.remove("open");$("#mb").setAttribute("aria-expanded","false")}});
$("#syms").innerHTML=IC.map((p,i)=>`<symbol id="s${i}" viewBox="0 0 24 24"><path d="${p}"/></symbol>`).join("");
render();
