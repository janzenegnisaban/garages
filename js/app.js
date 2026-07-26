(function () {
  "use strict";

  var PHONE = "09240186225";
  var PHONE_DISPLAY = "0924 018 6225";
  var EMAIL = "jcsanjuan86@autoboutique.ph";
  var FB = "https://www.facebook.com/primeautoboutiqueph/";
  var MESSENGER = "https://m.me/primeautoboutiqueph";
  var MAPS =
    "https://www.google.com/maps/search/?api=1&query=122+Gen.+B.+G.+Molina+St,+Parang,+Marikina,+1809";
  var MAPS_EMBED =
    "https://maps.google.com/maps?q=M457%2BVW+Marikina,+Metro+Manila&z=17&hl=en&output=embed";

  window.PAB_CONTACT = {
    phone: PHONE,
    phoneDisplay: PHONE_DISPLAY,
    phoneAlt: "0927 808 2758",
    telAltHref: "tel:+639278082758",
    email: EMAIL,
    facebook: FB,
    messenger: MESSENGER,
    instagram: "https://www.instagram.com/autoboutiqueph",
    tiktok: "https://www.tiktok.com/@primeautoboutiqueph",
    maps: MAPS,
    mapsEmbed: MAPS_EMBED,
    location: "122 Gen. B. G. Molina St., Parang, Marikina City 1809",
    plusCode: "M457+VW Marikina",
    telHref: "tel:+63" + PHONE.replace(/^0/, ""),
    mailHref: "mailto:" + EMAIL,
  };
  window.KC_CONTACT = window.PAB_CONTACT;
  window.DP_CONTACT = window.PAB_CONTACT;
  window.LG_CONTACT = window.PAB_CONTACT;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function currentTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function syncThemeButtons() {
    var dark = currentTheme() === "dark";
    qsa("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      btn.innerHTML = dark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  function initTheme() {
    var stored = localStorage.getItem("pab-theme");
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
    syncThemeButtons();
    qsa("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("pab-theme", next);
        syncThemeButtons();
      });
    });
  }

  function initHeader() {
    var header = qs(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-compact", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initNav() {
    var toggle = qs("[data-nav-toggle]");
    var sheet = qs("[data-nav-sheet]");
    if (!toggle || !sheet) return;

    function close() {
      sheet.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function open() {
      sheet.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      if (sheet.classList.contains("is-open")) close();
      else open();
    });

    qs("[data-nav-backdrop]", sheet)?.addEventListener("click", close);
    qsa("a", sheet).forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function markCurrentNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    qsa(".nav-desktop a, .nav-sheet__panel a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var file = href.split("/").pop().split("?")[0];
      if (file === path || (path === "" && file === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function initModal() {
    var modal = qs("[data-inquire-modal]");
    if (!modal) return;

    function open(vehicleLabel) {
      var input = qs("[data-inquire-vehicle]", modal);
      if (input) input.value = vehicleLabel || "General inquiry";
      var title = qs("[data-inquire-title]", modal);
      if (title) {
        title.textContent = vehicleLabel
          ? "Vehicle Inquiry"
          : "General Inquiry";
      }
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      var success = qs(".form-success", modal);
      if (success) success.classList.remove("is-visible");
    }

    qsa("[data-inquire-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(btn.getAttribute("data-inquire-open") || "");
      });
    });

    qs("[data-inquire-close]", modal)?.addEventListener("click", close);
    qs("[data-inquire-backdrop]", modal)?.addEventListener("click", close);

    var form = qs("[data-inquire-form]", modal);
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = qs('[name="name"]', form).value.trim();
        var phone = qs('[name="phone"]', form).value.trim();
        var vehicle = qs('[name="vehicle"]', form).value.trim();
        var message = qs('[name="message"]', form).value.trim();
        var body =
          "Hi Prime Auto Boutique,%0A%0A" +
          "Name: " +
          encodeURIComponent(name) +
          "%0APhone: " +
          encodeURIComponent(phone) +
          "%0AVehicle: " +
          encodeURIComponent(vehicle) +
          "%0A%0A" +
          encodeURIComponent(message || "I'd like to know more.");
        window.location.href =
          "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Website inquiry: " + vehicle) + "&body=" + body;
        var success = qs(".form-success", modal);
        if (success) success.classList.add("is-visible");
      });
    }

    window.PAB_openInquire = open;
    window.KC_openInquire = open;
    window.DP_openInquire = open;
    window.LG_openInquire = open;
  }

  function initLeadForms() {
    qsa("[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var subject = form.getAttribute("data-lead-subject") || "Website lead";
        var fields = qsa("input, select, textarea", form);
        var lines = [];
        fields.forEach(function (f) {
          if (!f.name || f.type === "submit") return;
          lines.push(f.name + ": " + f.value);
        });
        var body = "Hi Prime Auto Boutique,%0A%0A" + encodeURIComponent(lines.join("\n"));
        window.location.href =
          "mailto:" +
          EMAIL +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          body;
        var success = qs(".form-success", form.parentElement) || qs(".form-success", form);
        if (success) success.classList.add("is-visible");
      });
    });
  }

  function initHeroSearch() {
    var form = qs("[data-hero-search]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = qs("input", form).value.trim();
      var url = "inventory.html";
      if (q) url += "?q=" + encodeURIComponent(q);
      location.href = url;
    });
  }

  function renderFeatured() {
    var el = qs("[data-featured-grid]");
    if (!el || !window.PAB) return;
    var list = PAB.getFeatured(6);
    el.innerHTML = list.map(PAB.vehicleCardHTML).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initHeader();
    initNav();
    markCurrentNav();
    initModal();
    initLeadForms();
    initHeroSearch();
    renderFeatured();
  });
})();
