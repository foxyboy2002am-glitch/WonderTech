/* WonderTech mobile blank-page recovery.
   If a runtime error prevents the main renderer from producing markup, keep the
   public landing page usable and expose the primary navigation. */
(function () {
  "use strict";
  function recover() {
    var app = document.getElementById("app");
    if (!app || app.children.length || app.textContent.trim()) return;
    var lang = document.documentElement.lang === "en" ? "en" : "ar";
    var ar = lang === "ar";
    app.innerHTML =
      '<section class="hero wt-mobile-recovery"><div class="w"><div>' +
      '<p class="tag">' + (ar ? 'حلول تكنولوجيا وأمن متكاملة' : 'Integrated IT & Security Solutions') + '</p>' +
      '<h1>' + (ar ? 'حلول تكنولوجيا متكاملة لأعمال أكثر كفاءة' : 'Integrated Technology Solutions for Better Business') + '</h1>' +
      '<p class="l">' + (ar ? 'شبكات وكاميرات مراقبة ونقاط بيع وحلول ERP ودعم فني للشركات والمصانع والمطاعم.' : 'Networking, CCTV, POS, ERP and technical support for businesses, factories and restaurants.') + '</p>' +
      '<div class="btns"><a class="btn" href="#/contact">' + (ar ? 'اطلب عرض سعر' : 'Request a quote') + '</a>' +
      '<a class="btn ghost" href="#/services">' + (ar ? 'اكتشف خدماتنا' : 'Explore services') + '</a></div>' +
      '<div class="btns" style="margin-top:14px"><a class="btn ghost" href="#/store">' + (ar ? 'افتح المتجر' : 'Open store') + '</a></div>' +
      '</div></div></section>' +
      '<section class="s"><div class="w"><h2>' + (ar ? 'خدماتنا' : 'Our services') + '</h2>' +
      '<div class="grid"><a class="box" href="#/services">' + (ar ? 'الشبكات والبنية التحتية' : 'Networks & infrastructure') + '</a>' +
      '<a class="box" href="#/services">' + (ar ? 'كاميرات المراقبة' : 'CCTV surveillance') + '</a>' +
      '<a class="box" href="#/services">' + (ar ? 'نقاط البيع وERP' : 'POS & ERP') + '</a>' +
      '<a class="box" href="#/contact">' + (ar ? 'الدعم الفني' : 'Technical support') + '</a></div></div></section>';
    console.error("WonderTech recovery mode: the main page renderer returned empty markup.");
    var nav = document.getElementById("nav");
    if (nav && !nav.children.length) {
      nav.innerHTML = '<a href="#/home">' + (ar ? 'الرئيسية' : 'Home') + '</a><a href="#/services">' +
        (ar ? 'خدماتنا' : 'Services') + '</a><a href="#/projects">' + (ar ? 'مشاريعنا' : 'Projects') +
        '</a><a href="#/contact">' + (ar ? 'تواصل معنا' : 'Contact') + '</a>';
    }
    var actions = document.getElementById("shop-actions");
    if (actions && !actions.children.length) {
      actions.innerHTML = '<a class="shop-nav-link wt-store-link" href="#/store">' + (ar ? 'المتجر' : 'Store') +
        '</a><a class="shop-nav-link" href="#/login">' + (ar ? 'دخول' : 'Sign in') +
        '</a><a class="shop-nav-link" href="#/wishlist">' + (ar ? 'المفضلة' : 'Wishlist') +
        '</a><a class="shop-cart-bubble" href="#/cart" aria-label="' + (ar ? 'السلة' : 'Cart') + '">🛒</a>';
    }
    var fab = document.getElementById("fab");
    if (fab && !fab.textContent.trim()) {
      fab.href = "https://wa.me/201001346655";
      fab.textContent = ar ? "تحدث معنا عبر واتساب" : "Chat on WhatsApp";
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", recover, { once: true });
  } else {
    recover();
  }
})();