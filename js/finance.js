(function () {
  "use strict";

  function peso(n) {
    return "₱" + Math.round(n).toLocaleString("en-PH");
  }

  function calc(price, downPct, months, annualRate) {
    var down = price * (downPct / 100);
    var principal = price - down;
    var r = annualRate / 100 / 12;
    if (r === 0) return { down: down, monthly: principal / months };
    var monthly =
      (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return { down: down, monthly: monthly };
  }

  function update() {
    var price = Number(document.querySelector('[name="price"]')?.value || 600000);
    var downPct = Number(document.querySelector('[name="down"]')?.value || 20);
    var months = Number(document.querySelector('[name="term"]')?.value || 36);
    var rate = Number(document.querySelector('[name="rate"]')?.value || 18);

    var downLabel = document.querySelector("[data-down-label]");
    var termLabel = document.querySelector("[data-term-label]");
    if (downLabel) downLabel.textContent = downPct + "%";
    if (termLabel) termLabel.textContent = months + " mo";

    var result = calc(price, downPct, months, rate);
    var monthlyEl = document.querySelector("[data-monthly]");
    var downEl = document.querySelector("[data-down-amt]");
    if (monthlyEl) monthlyEl.textContent = peso(result.monthly) + "/mo";
    if (downEl) downEl.textContent = "Est. down payment " + peso(result.down);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-finance-calc]")) return;

    var priceParam = new URLSearchParams(location.search).get("price");
    var priceInput = document.querySelector('[name="price"]');
    if (priceParam && priceInput) priceInput.value = priceParam;

    update();
    document
      .querySelector("[data-finance-calc]")
      .addEventListener("input", update);
  });
})();
