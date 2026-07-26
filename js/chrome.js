(function () {
  "use strict";

  var C = window.PAB_CONTACT || {
    phoneDisplay: "0924 018 6225",
    telHref: "tel:+639240186225",
    email: "jcsanjuan86@autoboutique.ph",
    mailHref: "mailto:jcsanjuan86@autoboutique.ph",
    facebook: "https://www.facebook.com/primeautoboutiqueph/",
    messenger: "https://m.me/primeautoboutiqueph",
    maps:
      "https://www.google.com/maps/search/?api=1&query=122+Gen.+B.+G.+Molina+St,+Parang,+Marikina,+1809",
    location: "122 Gen. B. G. Molina St., Parang, Marikina City",
  };

  function headerHTML() {
    return (
      '<header class="site-header glass-strong" data-site-header>' +
      '<div class="site-header__inner">' +
      '<a class="brand" href="index.html">' +
      '<img class="brand__logo" src="assets/logo.png" alt="Prime Auto Boutique" width="56" height="56">' +
      '<span class="brand__name sr-only">Prime Auto <span>Boutique</span></span>' +
      "</a>" +
      '<nav class="nav-desktop" aria-label="Primary">' +
      '<a href="inventory.html">Inventory</a>' +
      '<a href="specials.html">Specials</a>' +
      '<a href="finance.html">Finance</a>' +
      '<a href="trade-in.html">Trade-In</a>' +
      '<a href="service.html">Consign</a>' +
      '<a href="about.html">About</a>' +
      "</nav>" +
      '<div class="header-actions">' +
      '<button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle dark mode">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
      "</button>" +
      '<a class="btn btn--primary btn--sm" href="' +
      C.telHref +
      '">Call</a>' +
      '<button type="button" class="icon-btn nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Open menu">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      "</button>" +
      "</div></div></header>" +
      '<div class="nav-sheet" data-nav-sheet>' +
      '<div class="nav-sheet__backdrop" data-nav-backdrop></div>' +
      '<nav class="nav-sheet__panel glass-strong" aria-label="Mobile">' +
      '<a href="index.html">Home</a>' +
      '<a href="inventory.html">Inventory</a>' +
      '<a href="specials.html">Specials</a>' +
      '<a href="finance.html">Finance</a>' +
      '<a href="trade-in.html">Trade-In</a>' +
      '<a href="service.html">Consign</a>' +
      '<a href="about.html">About</a>' +
      '<a href="' +
      C.messenger +
      '" target="_blank" rel="noopener">Message Us</a>' +
      "</nav></div>"
    );
  }

  function footerHTML() {
    return (
      '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
      "<div>" +
      '<a class="footer-brand" href="index.html">' +
      '<img src="assets/logo.png" alt="Prime Auto Boutique" width="48" height="48">' +
      '<strong class="sr-only">Prime Auto Boutique</strong></a>' +
      "<p>Pre-owned cars in Marikina. Low DP · Fast approval. Next ride mo? I-Prime na.</p>" +
      "</div>" +
      '<div class="footer-col"><h4>Shop</h4>' +
      '<a href="inventory.html">Inventory</a>' +
      '<a href="specials.html">Specials</a>' +
      '<a href="finance.html">Finance</a>' +
      '<a href="trade-in.html">Trade-In</a>' +
      "</div>" +
      '<div class="footer-col"><h4>Contact</h4>' +
      '<a href="' +
      C.telHref +
      '">' +
      C.phoneDisplay +
      "</a>" +
      '<a href="' +
      C.mailHref +
      '">' +
      C.email +
      "</a>" +
      '<a href="' +
      C.facebook +
      '" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="' +
      C.maps +
      '" target="_blank" rel="noopener">' +
      (C.location || "Marikina City") +
      "</a>" +
      "</div></div>" +
      '<div class="container footer-bottom">' +
      "<span>&copy; " +
      new Date().getFullYear() +
      " Prime Auto Boutique Ph</span>" +
      '<a href="' +
      C.messenger +
      '" target="_blank" rel="noopener">Message Us</a>' +
      "</div></footer>"
    );
  }

  function stickyHTML() {
    return (
      '<div class="sticky-bar glass-strong" role="navigation" aria-label="Quick actions">' +
      '<a class="btn btn--primary" href="' +
      C.telHref +
      '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"/></svg>' +
      "Call</a>" +
      '<a class="btn btn--secondary" href="' +
      C.messenger +
      '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
      "Message</a>" +
      '<button type="button" class="btn btn--glass" data-inquire-open="">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H5.17L4 17.17V4z"/></svg>' +
      "Inquire</button>" +
      "</div>"
    );
  }

  function modalHTML() {
    return (
      '<div class="modal" data-inquire-modal role="dialog" aria-modal="true" aria-labelledby="inquire-title">' +
      '<div class="modal__backdrop" data-inquire-backdrop></div>' +
      '<div class="modal__panel glass-strong">' +
      '<div class="modal__header">' +
      '<h3 id="inquire-title" data-inquire-title>General Inquiry</h3>' +
      '<button type="button" class="icon-btn" data-inquire-close aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
      "</button></div>" +
      '<form class="form-stack" data-inquire-form>' +
      '<input type="hidden" name="vehicle" data-inquire-vehicle value="General inquiry">' +
      '<div class="field"><label for="inq-name">Name</label>' +
      '<input id="inq-name" name="name" required autocomplete="name"></div>' +
      '<div class="field"><label for="inq-phone">Phone</label>' +
      '<input id="inq-phone" name="phone" type="tel" required autocomplete="tel"></div>' +
      '<div class="field"><label for="inq-msg">Message</label>' +
      '<textarea id="inq-msg" name="message"></textarea></div>' +
      '<button type="submit" class="btn btn--primary btn--block">Send Message</button>' +
      '<a class="btn btn--secondary btn--block" href="' +
      C.messenger +
      '" target="_blank" rel="noopener">Message Us</a>' +
      "</form>" +
      '<div class="form-success">Opening your email app…</div>' +
      "</div></div>"
    );
  }

  function inject() {
    var mount = document.querySelector("[data-chrome]");
    if (!mount) {
      document.body.insertAdjacentHTML("afterbegin", headerHTML());
      document.body.insertAdjacentHTML(
        "beforeend",
        stickyHTML() + modalHTML() + footerHTML()
      );
      return;
    }
    mount.insertAdjacentHTML("beforebegin", headerHTML());
    mount.insertAdjacentHTML("afterend", stickyHTML() + modalHTML() + footerHTML());
  }

  inject();
})();
