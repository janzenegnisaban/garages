(function () {
  "use strict";

  function params() {
    return new URLSearchParams(location.search);
  }

  function unique(arr) {
    return arr.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });
  }

  function populateFilters(list) {
    var makes = unique(
      list
        .map(function (v) {
          return v.make;
        })
        .sort()
    );
    var bodies = unique(
      list
        .map(function (v) {
          return v.body;
        })
        .sort()
    );
    var years = unique(
      list
        .map(function (v) {
          return v.year;
        })
        .sort(function (a, b) {
          return b - a;
        })
    );

    var makeSel = document.querySelector('[name="make"]');
    var bodySel = document.querySelector('[name="body"]');
    var yearSel = document.querySelector('[name="year"]');

    if (makeSel) {
      makes.forEach(function (m) {
        var o = document.createElement("option");
        o.value = m;
        o.textContent = m;
        makeSel.appendChild(o);
      });
    }
    if (bodySel) {
      bodies.forEach(function (m) {
        var o = document.createElement("option");
        o.value = m;
        o.textContent = m;
        bodySel.appendChild(o);
      });
    }
    if (yearSel) {
      years.forEach(function (y) {
        var o = document.createElement("option");
        o.value = String(y);
        o.textContent = String(y);
        yearSel.appendChild(o);
      });
    }
  }

  function filterList(list) {
    var p = params();
    var q = (document.querySelector('[name="q"]')?.value || p.get("q") || "")
      .trim()
      .toLowerCase();
    var make = document.querySelector('[name="make"]')?.value || "";
    var body = document.querySelector('[name="body"]')?.value || "";
    var year = document.querySelector('[name="year"]')?.value || "";
    var price = document.querySelector('[name="price"]')?.value || "";
    var sort = document.querySelector('[name="sort"]')?.value || "newest";

    var out = list.filter(function (v) {
      if (make && v.make !== make) return false;
      if (body && v.body !== body) return false;
      if (year && String(v.year) !== year) return false;
      if (price === "under600" && v.price >= 600000) return false;
      if (price === "600to800" && (v.price < 600000 || v.price > 800000))
        return false;
      if (price === "over800" && v.price <= 800000) return false;
      if (q) {
        var hay = (
          v.year +
          " " +
          v.make +
          " " +
          v.model +
          " " +
          (v.trim || "") +
          " " +
          v.body
        ).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    out.sort(function (a, b) {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "mileage") return a.mileage - b.mileage;
      return b.year - a.year || a.price - b.price;
    });

    return out;
  }

  function render() {
    var grid = document.querySelector("[data-srp-grid]");
    var count = document.querySelector("[data-srp-count]");
    if (!grid || !window.KC_INVENTORY) return;

    var list = filterList(window.KC_INVENTORY);
    if (count) {
      count.textContent =
        list.length + " vehicle" + (list.length === 1 ? "" : "s");
    }
    if (!list.length) {
      grid.innerHTML =
        '<div class="empty-state">No vehicles match your filters. <a href="inventory.html">Clear filters</a> or <a href="' +
        (window.KC_CONTACT?.messenger || "https://m.me/primeautoboutiqueph") +
        '" target="_blank" rel="noopener">message us</a> for more units.</div>';
      return;
    }
    grid.innerHTML = list.map(KC.vehicleCardHTML).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-srp-grid]")) return;
    populateFilters(window.KC_INVENTORY || []);

    var qParam = params().get("q");
    var qInput = document.querySelector('[name="q"]');
    if (qParam && qInput) qInput.value = qParam;

    render();

    var form = document.querySelector("[data-srp-filters]");
    if (form) {
      form.addEventListener("input", render);
      form.addEventListener("change", render);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        render();
      });
    }
  });
})();
