(function () {
  "use strict";

  function getId() {
    return new URLSearchParams(location.search).get("id");
  }

  function render() {
    var root = document.querySelector("[data-vdp]");
    if (!root || !window.KC) return;

    var id = getId();
    var v = KC.getVehicle(id);
    if (!v) {
      root.innerHTML =
        '<div class="empty-state container"><h1>Vehicle not found</h1><p>This unit may no longer be available.</p>' +
        '<p style="margin-top:16px"><a class="btn btn--primary" href="inventory.html">View Inventory</a></p></div>';
      return;
    }

    document.title = KC.vehicleTitle(v) + " | Prime Auto Boutique";

    var thumbs = v.images
      .map(function (src, i) {
        return (
          '<button type="button" data-thumb="' +
          i +
          '" class="' +
          (i === 0 ? "is-active" : "") +
          '"><img src="' +
          src +
          '" alt="" loading="lazy"></button>'
        );
      })
      .join("");

    var features = v.features
      .map(function (f) {
        return "<li>" + f + "</li>";
      })
      .join("");

    var label = KC.vehicleTitle(v) + " " + (v.trim || "");

    root.innerHTML =
      '<div class="container vdp">' +
      '<div class="vdp-gallery">' +
      '<div class="vdp-gallery__main"><img data-main-img src="' +
      v.images[0] +
      '" alt="' +
      label +
      '"></div>' +
      '<div class="vdp-gallery__thumbs">' +
      thumbs +
      "</div></div>" +
      '<aside class="vdp-panel glass-strong">' +
      (v.badge
        ? '<span class="eyebrow">' + v.badge + "</span>"
        : '<span class="eyebrow">Pre-owned</span>') +
      "<h1>" +
      label +
      "</h1>" +
      '<div class="vdp-panel__price">' +
      KC.formatPrice(v.price) +
      "</div>" +
      "<dl class=\"vdp-specs\">" +
      "<div><dt>Mileage</dt><dd>" +
      KC.formatMileage(v.mileage) +
      "</dd></div>" +
      "<div><dt>Transmission</dt><dd>" +
      v.transmission +
      "</dd></div>" +
      "<div><dt>Fuel</dt><dd>" +
      v.fuel +
      "</dd></div>" +
      "<div><dt>Body</dt><dd>" +
      v.body +
      "</dd></div>" +
      "<div><dt>Color</dt><dd>" +
      v.color +
      "</dd></div>" +
      "<div><dt>Stock</dt><dd>" +
      v.id.toUpperCase() +
      "</dd></div>" +
      "</dl>" +
      '<div class="vdp-actions">' +
      '<a class="btn btn--primary btn--block" href="' +
      (window.KC_CONTACT?.telHref || "tel:+639240186225") +
      '">Call Now</a>' +
      '<button type="button" class="btn btn--secondary btn--block" data-inquire-open="' +
      label.replace(/"/g, "") +
      '">Send Inquiry</button>' +
      '<a class="btn btn--glass btn--block" href="' +
      (window.KC_CONTACT?.messenger || "https://m.me/primeautoboutiqueph") +
      '" target="_blank" rel="noopener">Message Us</a>' +
      '<a class="btn btn--ghost btn--block" href="trade-in.html">Get Trade-In Value</a>' +
      '<a class="btn btn--ghost btn--block" href="finance.html?price=' +
      v.price +
      '">Calculate Payment</a>' +
      "</div></aside>" +
      '<div class="vdp-features" style="grid-column:1/-1">' +
      "<h2>Highlights</h2>" +
      "<ul>" +
      features +
      "</ul></div></div>";

    root.querySelectorAll("[data-thumb]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = Number(btn.getAttribute("data-thumb"));
        var main = root.querySelector("[data-main-img]");
        if (main) main.src = v.images[i];
        root.querySelectorAll("[data-thumb]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });

    // Re-bind inquire buttons after dynamic render
    root.querySelectorAll("[data-inquire-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.KC_openInquire) {
          KC_openInquire(btn.getAttribute("data-inquire-open") || "");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
