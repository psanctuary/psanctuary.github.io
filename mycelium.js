/* Psanctuary's mycelium: the network in "How a decentralized church can work" on the portal's home.

   A small, seeded web of hyphae (the same one on every visit) with four hubs, one for each thread
   card beside it. It answers two ways:
     - the pointer: nodes near it light up, and three fresh hyphae reach from the pointer to the
       nearest nodes, the way the spore field behind the page grows threads to the spores;
     - the cards: hovering or focusing a card lights its hub and the hyphae around it, so keyboard
       and touch visitors see the same thing without a pointer.
   It follows the arrival kit's choices on <html>, like sporefield.js:
     data-motion "still" (or prefers-reduced-motion with no choice yet): nothing flows and nothing
                 follows the pointer; a card still lights its hub, instantly
     data-cursor "off": no pointer effects (the cards still work)
     data-reading "on": the kit's reading mode sets still + cursor off, and the CSS quiets the web
   Decorative only (aria-hidden): every word is in the cards. No dependencies. */
(function () {
  "use strict";
  var svg = document.getElementById("mycelium");
  if (!svg || !svg.createSVGPoint) return;
  var root = document.documentElement;
  var NS = "http://www.w3.org/2000/svg";
  var VW = 720;
  var VH = 300;

  function seeded(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rand = seeded(20261022);

  function prefersLess() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }
  function still() {
    var m = root.getAttribute("data-motion");
    return m ? m === "still" : prefersLess();
  }
  function cursorOn() {
    return root.getAttribute("data-cursor") !== "off" && root.getAttribute("data-reading") !== "on" && !still();
  }

  // ── the web: four hubs (one per card), then nodes scattered with a little breathing room ──────
  var nodes = [
    { x: 118, y: 92, hub: 0 },
    { x: 300, y: 214, hub: 1 },
    { x: 462, y: 78, hub: 2 },
    { x: 620, y: 200, hub: 3 },
  ];
  var tries = 0;
  while (nodes.length < 34 && tries < 4000) {
    tries++;
    var p = { x: 18 + rand() * (VW - 36), y: 18 + rand() * (VH - 36) };
    var ok = true;
    for (var i = 0; i < nodes.length; i++) {
      var dx = nodes[i].x - p.x;
      var dy = nodes[i].y - p.y;
      if (dx * dx + dy * dy < 46 * 46) {
        ok = false;
        break;
      }
    }
    if (ok) nodes.push(p);
  }
  // Each node reaches for its nearest two or three neighbours; no edge twice.
  var edges = [];
  var seen = {};
  nodes.forEach(function (a, ai) {
    var near = nodes
      .map(function (b, bi) {
        return { bi: bi, d: Math.hypot(a.x - b.x, a.y - b.y) };
      })
      .filter(function (o) {
        return o.bi !== ai;
      })
      .sort(function (m, n) {
        return m.d - n.d;
      })
      .slice(0, a.hub !== undefined ? 4 : 2 + (rand() < 0.4 ? 1 : 0));
    near.forEach(function (o) {
      link(ai, o.bi, o.d > 190);
    });
  });
  function link(a, b, skip) {
    var k = Math.min(a, b) + "-" + Math.max(a, b);
    if (seen[k] || skip) return;
    seen[k] = 1;
    edges.push({ a: a, b: b, bend: (rand() - 0.5) * 0.5 });
  }
  // And one web, not islands: a spanning tree (Prim's, shortest hypha first) joins every cluster.
  var inTree = [0];
  var outTree = nodes.map(function (n, i) {
    return i;
  }).slice(1);
  while (outTree.length) {
    var best = null;
    inTree.forEach(function (a) {
      outTree.forEach(function (b) {
        var d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
        if (!best || d < best.d) best = { a: a, b: b, d: d };
      });
    });
    link(best.a, best.b, false);
    inTree.push(best.b);
    outTree.splice(outTree.indexOf(best.b), 1);
  }

  function curve(x1, y1, x2, y2, bend) {
    var mx = (x1 + x2) / 2;
    var my = (y1 + y2) / 2;
    return "M" + x1.toFixed(1) + " " + y1.toFixed(1) + "Q" + (mx - (y2 - y1) * bend).toFixed(1) + " " + (my + (x2 - x1) * bend).toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1);
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  var gH = el("g", { class: "my-hyphae" }, svg);
  var gP = el("g", { class: "my-probe" }, svg);
  var gN = el("g", { class: "my-nodes" }, svg);
  edges.forEach(function (e, i) {
    var A = nodes[e.a];
    var B = nodes[e.b];
    e.el = el("path", { d: curve(A.x, A.y, B.x, B.y, e.bend), pathLength: "1", class: "my-hypha" + (i % 5 === 0 ? " my-flow" : "") }, gH);
    e.el.style.setProperty("--d", ((i * 0.37) % 6).toFixed(2) + "s");
  });
  // Each hub carries its card's short name (data-labels="a|b|c|d"), below it or above it.
  var labels = (svg.getAttribute("data-labels") || "").split("|");
  nodes.forEach(function (n) {
    if (n.hub !== undefined) {
      n.ring = el("circle", { cx: n.x, cy: n.y, r: 11, class: "my-ring" }, gN);
      n.el = el("circle", { cx: n.x, cy: n.y, r: 5, class: "my-node my-hub" }, gN);
      if (labels[n.hub]) {
        n.label = el("text", { x: n.x, y: n.y > VH / 2 ? n.y + 30 : n.y - 20, "text-anchor": "middle", class: "my-label" }, gN);
        n.label.textContent = labels[n.hub];
      }
    } else {
      n.el = el("circle", { cx: n.x, cy: n.y, r: (1.6 + rand() * 1.6).toFixed(1), class: "my-node" }, gN);
    }
  });
  var probes = [0, 1, 2].map(function () {
    return el("path", { class: "my-probe-line" }, gP);
  });

  // ── light: per node 0..1, hyphae take the brighter of their two ends ──────────────────────────
  var lit = nodes.map(function () {
    return 0;
  });
  function paint() {
    nodes.forEach(function (n, i) {
      n.el.style.setProperty("--lit", lit[i].toFixed(2));
      if (n.ring) n.ring.style.setProperty("--lit", lit[i].toFixed(2));
      if (n.label) n.label.style.setProperty("--lit", lit[i].toFixed(2));
    });
    edges.forEach(function (e) {
      e.el.style.setProperty("--lit", Math.max(lit[e.a], lit[e.b]).toFixed(2));
    });
  }

  var hubOn = -1;
  function lightHub(h) {
    hubOn = h;
    var idx = nodes.findIndex(function (n) {
      return n.hub === h;
    });
    lit = nodes.map(function () {
      return 0;
    });
    if (idx < 0) return paint();
    lit[idx] = 1;
    // one step out, then two: the network carries it
    var ring1 = [];
    edges.forEach(function (e) {
      if (e.a === idx) ring1.push(e.b);
      if (e.b === idx) ring1.push(e.a);
    });
    ring1.forEach(function (j) {
      lit[j] = Math.max(lit[j], 0.7);
    });
    edges.forEach(function (e) {
      if (ring1.indexOf(e.a) >= 0 && e.b !== idx) lit[e.b] = Math.max(lit[e.b], 0.35);
      if (ring1.indexOf(e.b) >= 0 && e.a !== idx) lit[e.a] = Math.max(lit[e.a], 0.35);
    });
    svg.classList.add("is-hub");
    paint();
  }
  function clearHub() {
    hubOn = -1;
    svg.classList.remove("is-hub");
    lit = lit.map(function () {
      return 0;
    });
    paint();
  }

  // ── the pointer ───────────────────────────────────────────────────────────────────────────────
  var pt = svg.createSVGPoint();
  var raf = 0;
  var last = null;
  function toSvg(x, y) {
    var m = svg.getScreenCTM();
    if (!m) return null;
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(m.inverse());
  }
  function follow() {
    raf = 0;
    if (!last || hubOn >= 0) return;
    var P = toSvg(last.x, last.y);
    if (!P) return;
    var R = 150;
    var near = [];
    nodes.forEach(function (n, i) {
      var d = Math.hypot(n.x - P.x, n.y - P.y);
      lit[i] = Math.max(0, 1 - d / R);
      near.push({ i: i, d: d });
    });
    near.sort(function (a, b) {
      return a.d - b.d;
    });
    probes.forEach(function (line, k) {
      var o = near[k];
      if (!o || o.d > R * 1.2) {
        line.removeAttribute("d");
        return;
      }
      var n = nodes[o.i];
      line.setAttribute("d", curve(P.x, P.y, n.x, n.y, k % 2 ? 0.16 : -0.16));
      line.style.setProperty("--lit", Math.max(0.2, 1 - o.d / (R * 1.2)).toFixed(2));
    });
    paint();
  }
  function leave() {
    last = null;
    probes.forEach(function (line) {
      line.removeAttribute("d");
    });
    if (hubOn < 0) clearHub();
  }
  var zone = svg.closest(".myc-figure") || svg;
  zone.addEventListener("pointermove", function (e) {
    if (!cursorOn() || e.pointerType === "touch") return leave();
    last = { x: e.clientX, y: e.clientY };
    if (!raf) raf = requestAnimationFrame(follow);
  });
  zone.addEventListener("pointerleave", leave);

  // ── the cards: hover or focus lights a hub (works with every motion choice) ────────────────────
  Array.prototype.forEach.call(document.querySelectorAll("[data-hub]"), function (card) {
    var h = Number(card.getAttribute("data-hub"));
    var on = function () {
      leave();
      lightHub(h);
    };
    card.addEventListener("pointerenter", on);
    card.addEventListener("focusin", on);
    card.addEventListener("pointerleave", function () {
      if (!card.contains(document.activeElement)) clearHub();
    });
    card.addEventListener("focusout", function (e) {
      if (!card.contains(e.relatedTarget)) clearHub();
    });
  });

  // The kit changes these as the visitor chooses; drop any pointer state that's no longer allowed.
  new MutationObserver(function () {
    if (!cursorOn()) leave();
    svg.classList.toggle("is-still", still());
  }).observe(root, { attributes: true, attributeFilter: ["data-motion", "data-cursor", "data-reading"] });
  svg.classList.toggle("is-still", still());
  paint();
})();
