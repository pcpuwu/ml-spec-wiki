/* ml-widgets harness — hydrates every <div class="ml-widget" data-widget="…"> in place.
 * Instant-nav safe (document$.subscribe). Widget modules (concatenated after this) call
 * MLW.register(name, function (root) { ... }). */
(function () {
  "use strict";
  var MLW = window.MLW = { _reg: {}, register: function (name, fn) { this._reg[name] = fn; } };
  function hydrate() {
    var nodes = document.querySelectorAll(".ml-widget"), i, root, fn;
    for (i = 0; i < nodes.length; i++) {
      root = nodes[i];
      if (root.dataset.mlwReady) continue;
      root.dataset.mlwReady = "1";
      fn = MLW._reg[root.dataset.widget];
      if (!fn) { root.textContent = "Unknown widget: " + root.dataset.widget; continue; }
      try { fn(root); } catch (e) { root.textContent = "Widget failed to load."; }
    }
  }
  MLW.hydrate = hydrate;
  if (typeof document$ !== "undefined" && document$.subscribe) document$.subscribe(hydrate);
  else document.addEventListener("DOMContentLoaded", hydrate);
})();

/* ===== widget: activation-functions.js ===== */
/* activation-functions — plot a chosen activation (sigmoid / tanh / ReLU / leaky ReLU
 * / linear) over a range, optionally with its exact derivative, and scrub a query point
 * to read f(x) and f'(x) off the true curve. The "compose two layers" toggle overlays
 * g(x) = w2·φ(w1·x + b1) + b2 (gold) against the single linear layer L(x) you'd get if φ
 * were the identity (grey dashed): with a LINEAR activation the two collapse onto the same
 * straight line — depth buys nothing — while any nonlinearity bends g away from L. Curves
 * are re-sampled as exact static polylines (no animation), clipped to the plot box.
 * Self-contained; registered on the MLW harness. */
MLW.register("activation-functions", function (root) {
  var VW = 560, VH = 440, PAD = 44;
  var X0 = -5, X1 = 5, Y0 = -2, Y1 = 2;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function clampX(x) { return Math.max(X0, Math.min(X1, x)); }

  var LEAK = 0.1;
  // exact activations
  function act(name, z) {
    if (name === "sigmoid") return 1 / (1 + Math.exp(-z));
    if (name === "tanh") { var e = Math.exp(-2 * z); return (1 - e) / (1 + e); }
    if (name === "relu") return z > 0 ? z : 0;
    if (name === "leaky") return z > 0 ? z : LEAK * z;
    return z; // linear
  }
  // exact derivatives (relu/leaky undefined at 0; report the x>0 branch there)
  function dact(name, z) {
    if (name === "sigmoid") { var s = 1 / (1 + Math.exp(-z)); return s * (1 - s); }
    if (name === "tanh") { var t = act("tanh", z); return 1 - t * t; }
    if (name === "relu") return z > 0 ? 1 : 0;
    if (name === "leaky") return z > 0 ? 1 : LEAK;
    return 1; // linear
  }

  var INFO = {
    sigmoid: { label: "sigmoid", eq: "σ(x) = 1 / (1 + e<sup>−x</sup>)", range: "(0, 1) — saturates" },
    tanh:    { label: "tanh",    eq: "tanh(x) = (e<sup>x</sup> − e<sup>−x</sup>) / (e<sup>x</sup> + e<sup>−x</sup>)", range: "(−1, 1) — saturates, zero-centred" },
    relu:    { label: "ReLU",    eq: "ReLU(x) = max(0, x)", range: "[0, ∞) — flat for x < 0" },
    leaky:   { label: "leaky ReLU", eq: "LReLU(x) = max(0.1·x, x)", range: "(−∞, ∞) — small negative slope" },
    linear:  { label: "linear",  eq: "f(x) = x", range: "(−∞, ∞) — no nonlinearity" }
  };
  var ORDER = ["sigmoid", "tanh", "relu", "leaky", "linear"];

  // fixed weights for the two-layer composition demo
  var W1 = 1.4, B1 = 0.8, W2 = 1.6, B2 = -0.5;
  function comp(name, x) { return W2 * act(name, W1 * x + B1) + B2; }     // g(x)
  function collapse(x) { return W2 * W1 * x + (W2 * B1 + B2); }           // L(x): φ = identity

  var cur = "relu", qx = 1, showDeriv = false, compose = false, dragging = false;
  var CLIP = "actclip-" + Math.floor(Math.random() * 1e9);

  var tabs = "";
  for (var t = 0; t < ORDER.length; t++)
    tabs += '<button class="act-tab" type="button" data-act="' + ORDER[t] + '">' + INFO[ORDER[t]].label + '</button>';

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive plot of a chosen neural-network activation function and its derivative"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq act-eq">—</div>' +
        '<div class="act-tabs mlw-btns">' + tabs + '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>output range</span><span class="act-range">—</span></div>' +
          '<div><span>query x</span><span class="act-qx">1.00</span></div>' +
          '<div><span class="act-flabel">f(x)</span><span class="act-fx">—</span></div>' +
          '<div><span class="act-dflabel">f′(x)</span><span class="act-dfx">—</span></div>' +
        '</div>' +
        '<label class="mlw-tog"><input type="checkbox" class="act-deriv"> show derivative f′(x)</label>' +
        '<label class="mlw-tog"><input type="checkbox" class="act-comp"> compose two layers (show collapse)</label>' +
        '<ul class="act-legend">' +
          '<li><i class="act-sw act-sw--f"></i>activation f</li>' +
          '<li><i class="act-sw act-sw--d"></i>derivative f′</li>' +
          '<li><i class="act-sw act-sw--l"></i>single linear layer L</li>' +
          '<li><i class="act-sw act-sw--q"></i>query point</li>' +
        '</ul>' +
        '<p class="act-note" hidden></p>' +
        '<p class="mlw-tip">Pick an activation, then scrub the plot to read f (and f′) at any x. ' +
        'Turn on “compose two layers”: only a nonlinearity keeps the gold curve off the grey line.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Activations are the nonlinearity that lets a network bend its output. ' +
    'Sigmoid &amp; tanh <b>saturate</b> — f′ shrinks toward 0 at the tails (the vanishing-gradient problem); ' +
    'ReLU is non-saturating and cheap but <b>dead</b> (f′ = 0) for x &lt; 0, which leaky ReLU patches with a ' +
    'small slope. With a <code>linear</code> activation, stacking two layers <b>collapses</b> to one straight ' +
    'line — so without a nonlinearity, extra depth adds nothing.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var derivIn = root.querySelector(".act-deriv");
  var compIn = root.querySelector(".act-comp");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function polyline(fn, cls) {
    var pts = [], N = 260, i, x;
    for (i = 0; i <= N; i++) { x = X0 + (X1 - X0) * i / N; pts.push(px(x).toFixed(2) + "," + py(fn(x)).toFixed(2)); }
    return '<polyline points="' + pts.join(" ") + '" class="' + cls + '" clip-path="url(#' + CLIP + ')"/>';
  }

  function render() {
    var s = [], g, i, info = INFO[cur];

    // clip so ramps/diagonals stay inside the plot box
    s.push('<defs><clipPath id="' + CLIP + '"><rect x="' + PAD + '" y="' + PAD +
           '" width="' + (VW - 2 * PAD) + '" height="' + (VH - 2 * PAD) + '"/></clipPath></defs>');

    // grid
    for (g = X0; g <= X1 + 1e-9; g += 1)
      s.push('<line x1="' + px(g) + '" y1="' + py(Y0) + '" x2="' + px(g) + '" y2="' + py(Y1) + '" class="mlw-grid"/>');
    for (g = Y0; g <= Y1 + 1e-9; g += 1)
      s.push('<line x1="' + px(X0) + '" y1="' + py(g) + '" x2="' + px(X1) + '" y2="' + py(g) + '" class="mlw-grid"/>');

    // axes at x=0 and y=0
    s.push('<line x1="' + px(0) + '" y1="' + py(Y0) + '" x2="' + px(0) + '" y2="' + py(Y1) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(0) + '" x2="' + px(X1) + '" y2="' + py(0) + '" class="mlw-axis"/>');

    // tick labels
    s.push('<text x="' + (px(X1) - 2) + '" y="' + (py(0) + 16) + '" text-anchor="end" class="mlw-tick">x</text>');
    var yt = [-2, -1, 1, 2];
    for (i = 0; i < yt.length; i++)
      s.push('<text x="' + (px(0) - 6) + '" y="' + (py(yt[i]) + 4) + '" text-anchor="end" class="mlw-tick">' + yt[i] + '</text>');

    if (compose) {
      // single linear layer L(x) = the collapse target, then the real 2-layer output g(x)
      s.push(polyline(collapse, "act-collapse"));
      s.push(polyline(function (x) { return comp(cur, x); }, "act-curve"));
    } else {
      if (showDeriv) s.push(polyline(function (x) { return dact(cur, x); }, "act-deriv-curve"));
      s.push(polyline(function (x) { return act(cur, x); }, "act-curve"));
    }

    // query point: read the true value off whichever curve is primary
    var qy = compose ? comp(cur, qx) : act(cur, qx);
    var qyc = Math.max(Y0, Math.min(Y1, qy)); // dot kept in-box; readout shows exact value
    s.push('<line x1="' + px(qx) + '" y1="' + py(Y0) + '" x2="' + px(qx) + '" y2="' + py(Y1) + '" class="act-qline"/>');
    s.push('<circle cx="' + px(qx) + '" cy="' + py(qyc) + '" r="' + (dragging ? 9 : 7) + '" class="act-q"/>');

    svg.innerHTML = s.join("");

    root.querySelector(".act-eq").innerHTML = info.eq;
    set(".act-range", info.range);
    set(".act-qx", qx.toFixed(2));
    set(".act-fx", (compose ? comp(cur, qx) : act(cur, qx)).toFixed(3));
    set(".act-flabel", compose ? "g(x) two-layer" : "f(x)");
    set(".act-dfx", compose ? "—" : dact(cur, qx).toFixed(3));

    // active tab highlight
    var btns = root.querySelectorAll(".act-tab");
    for (i = 0; i < btns.length; i++)
      btns[i].className = "act-tab" + (btns[i].getAttribute("data-act") === cur ? " act-tab--on" : "");

    // contextual note
    var note = root.querySelector(".act-note");
    if (compose) {
      if (cur === "linear") {
        note.innerHTML = "Gold and grey coincide: g(x) = W₂(W₁x + b₁) + b₂ is <b>exactly</b> one linear layer. " +
          "Two stacked linear layers collapse — pick any nonlinearity to break the line.";
      } else {
        note.innerHTML = "The gold two-layer output <b>bends away</b> from the grey single-line collapse: the " +
          "nonlinearity gives depth something a lone linear layer can never fit.";
      }
      note.hidden = false;
    } else {
      note.hidden = true;
    }
    root.querySelector(".act-dflabel").parentNode.style.opacity = compose ? "0.45" : "1";
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function scrub(e) { qx = clampX(xData(local(e).x)); render(); }

  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    scrub(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) scrub(e); });
  function end() { if (dragging) { dragging = false; render(); } }
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);

  var btns = root.querySelectorAll(".act-tab");
  for (var k = 0; k < btns.length; k++)
    btns[k].addEventListener("click", function () { cur = this.getAttribute("data-act"); render(); });

  derivIn.addEventListener("change", function () { showDeriv = derivIn.checked; render(); });
  compIn.addEventListener("change", function () { compose = compIn.checked; render(); });

  render();
});

/* ===== widget: bias-variance.js ===== */
/* bias-variance — the bias/variance tradeoff, computed for real (no faked curves).
 * A fixed synthetic dataset (deterministic seeded RNG) is fitted by real ridge
 * least-squares at every polynomial degree; we plot the resulting training error
 * and cross-validation error.
 *   • "Complexity" view: J_train and J_cv vs degree d. J_train falls monotonically;
 *     J_cv is a U — high on the left (underfit / high bias) and right (overfit /
 *     high variance), lowest at the sweet spot (min J_cv). The two regions are
 *     shaded and the slider drops a marker at your chosen d.
 *   • "Learning curve" view: fix the degree, sweep training-set size m. J_train
 *     rises and J_cv falls as m grows; whether the gap closes tells you if MORE
 *     DATA would help (high variance -> yes; high bias -> no, it plateaus).
 * Every number is a genuine fit — change a control and we recompute the true state
 * and re-draw it as a static polyline (no gratuitous animation). ES5, self-contained,
 * registered on the MLW harness. */
MLW.register("bias-variance", function (root) {
  var VW = 600, VH = 440, PAD = 54;
  var DEG_MIN = 1, DEG_MAX = 14;

  // ---- current axis bounds (set per render) + coordinate mapping ------------------
  var bx0 = 0, bx1 = 1, by0 = 0, by1 = 1;
  function px(x) { return PAD + (x - bx0) / (bx1 - bx0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - by0) / (by1 - by0) * (VH - 2 * PAD); }
  function sclampY(sy) { return Math.max(PAD - 26, Math.min(VH - PAD + 26, sy)); }

  // ---- fixed dataset (deterministic: seeded RNG, generated once) -------------------
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function trueF(x) { return Math.sin(1.7 * Math.PI * x - 0.35); }   // signal we hope to recover
  // noise is scaled to UNIT variance (sum of 3 uniforms has var 0.25 -> *2 gives var 1),
  // so the irreducible error floor is exactly NOISE^2.
  var NOISE = 0.15, BASELINE = NOISE * NOISE;
  var POOL_N = 40;                                     // total available data (learning-curve pool)
  function makeSet(n, rng) {
    var out = [], i, x, g;
    for (i = 0; i < n; i++) {
      x = (i + 0.5) / n + (rng() - 0.5) * (0.6 / n);   // spread across [0,1] with mild jitter
      g = (rng() + rng() + rng() - 1.5) * 2;           // ~gaussian (sum of uniforms), unit variance
      out.push({ x: Math.max(0, Math.min(1, x)), y: trueF(x) + g * NOISE });
    }
    return out;
  }
  var rng = mulberry32(11);
  var TRAIN_C = makeSet(20, rng);                      // complexity view: fixed training set (spans [0,1])
  var POOL = makeSet(POOL_N, rng);                     // learning view: the data pool we can draw from
  var CV = makeSet(300, rng);                          // held-out set, never fitted (large -> stable J_cv)

  // ---- ridge least squares (real normal equations; basis = powers of u=2x-1) -------
  function features(x, deg) {
    var u = 2 * x - 1, phi = [1], p = u, j;
    for (j = 1; j <= deg; j++) { phi.push(p); p *= u; }
    return phi;
  }
  function solve(A, b) {                                // Gaussian elimination, partial pivot
    var n = b.length, i, j, k, M = [];
    for (i = 0; i < n; i++) { M.push(A[i].slice()); M[i].push(b[i]); }
    for (i = 0; i < n; i++) {
      var piv = i;
      for (k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[piv][i])) piv = k;
      if (Math.abs(M[piv][i]) < 1e-13) return null;
      var tmp = M[i]; M[i] = M[piv]; M[piv] = tmp;
      for (k = i + 1; k < n; k++) {
        var f = M[k][i] / M[i][i];
        for (j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      }
    }
    var w = new Array(n);
    for (i = n - 1; i >= 0; i--) {
      var s = M[i][n];
      for (j = i + 1; j < n; j++) s -= M[i][j] * w[j];
      w[i] = s / M[i][i];
    }
    return w;
  }
  function fit(pts, deg) {
    var n = deg + 1, A = [], b = [], i, j, k, lam = 1e-6;   // tiny ridge = numerical stability only
    for (j = 0; j < n; j++) { A.push(new Array(n)); for (k = 0; k < n; k++) A[j][k] = 0; b[j] = 0; }
    for (i = 0; i < pts.length; i++) {
      var phi = features(pts[i].x, deg), y = pts[i].y;
      for (j = 0; j < n; j++) { b[j] += phi[j] * y; for (k = 0; k < n; k++) A[j][k] += phi[j] * phi[k]; }
    }
    for (j = 1; j < n; j++) A[j][j] += lam;
    return solve(A, b);
  }
  function predict(w, x) {
    if (!w) return 0;
    var phi = features(x, w.length - 1), s = 0, j;
    for (j = 0; j < w.length; j++) s += w[j] * phi[j];
    return s;
  }
  function mse(pts, w) {
    var s = 0, i, e; for (i = 0; i < pts.length; i++) { e = predict(w, pts[i].x) - pts[i].y; s += e * e; }
    return pts.length ? s / pts.length : 0;
  }

  // ---- precompute the complexity curve (fixed 20-pt train vs CV, every degree) -----
  var COMPLEXITY = [], sweetD = DEG_MIN, i0;
  for (i0 = DEG_MIN; i0 <= DEG_MAX; i0++) {
    var wi = fit(TRAIN_C, i0);
    COMPLEXITY.push({ d: i0, tr: mse(TRAIN_C, wi), cv: mse(CV, wi) });
  }
  (function () { var best = Infinity, i; for (i = 0; i < COMPLEXITY.length; i++) if (COMPLEXITY[i].cv < best) { best = COMPLEXITY[i].cv; sweetD = COMPLEXITY[i].d; } })();

  // learning curve for a fixed degree: J_train(m) and J_cv(m), AVERAGED over several
  // random size-m subsets of the pool (like sklearn's learning_curve) so a single
  // unlucky draw doesn't make the curve jagged. Deterministic (seeded per m/rep).
  function learningCurve(deg) {
    var arr = [], mMin = Math.max(deg + 2, 4), REPS = 12, m, rep, i, j, sub, w, str, scv;
    for (m = mMin; m <= POOL_N; m++) {
      str = 0; scv = 0;
      for (rep = 0; rep < REPS; rep++) {
        var rr = mulberry32(1000 + deg * 97 + m * 13 + rep * 7), idx = [];
        for (i = 0; i < POOL_N; i++) idx.push(i);
        for (i = POOL_N - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; var t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
        sub = []; for (i = 0; i < m; i++) sub.push(POOL[idx[i]]);
        w = fit(sub, deg); str += mse(sub, w); scv += mse(CV, w);
      }
      arr.push({ m: m, tr: str / REPS, cv: scv / REPS });
    }
    return arr;
  }

  // ---- UI --------------------------------------------------------------------------
  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Training and cross-validation error versus model complexity, computed from real polynomial fits"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-btns mlw-bv-modes">' +
          '<button class="mlw-bv-mode is-active" data-mode="complexity" type="button">Complexity</button>' +
          '<button class="mlw-bv-mode" data-mode="learning" type="button">Learning curve</button>' +
        '</div>' +
        '<div class="mlw-diag"><span class="mlw-diaglabel">—</span></div>' +
        '<div class="mlw-ctrl">' +
          '<label class="mlw-bv-clabel">Model complexity — degree d = <b class="mlw-bv-degv">3</b></label>' +
          '<input type="range" class="mlw-bv-deg" min="' + DEG_MIN + '" max="' + DEG_MAX + '" step="1" value="3">' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>J_train (fitted data)</span><span class="mlw-bv-etr">—</span></div>' +
          '<div><span>J_cv (held-out)</span><span class="mlw-bv-ecv">—</span></div>' +
          '<div><span>Gap (J_cv − J_train)</span><span class="mlw-bv-gap">—</span></div>' +
        '</div>' +
        '<div class="mlw-bv-legend">' +
          '<span><i class="mlw-bv-sw mlw-bv-sw--tr"></i>J_train</span>' +
          '<span><i class="mlw-bv-sw mlw-bv-sw--cv"></i>J_cv</span>' +
          '<span><i class="mlw-bv-sw mlw-bv-sw--base"></i>noise floor</span>' +
        '</div>' +
        '<div class="mlw-btns mlw-bv-jumps">' +
          '<button class="mlw-bv-under" type="button">Underfit</button>' +
          '<button class="mlw-bv-sweet" type="button">Sweet spot</button>' +
          '<button class="mlw-bv-over" type="button">Overfit</button>' +
        '</div>' +
        '<p class="mlw-tip mlw-bv-tip"></p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var degEl = root.querySelector(".mlw-bv-deg");
  var mode = "complexity";

  function set(cls, v) { root.querySelector(cls).textContent = v; }
  function fmt(v) {
    if (!isFinite(v)) return "∞";
    if (v !== 0 && (v >= 100 || v < 0.001)) return v.toExponential(2);
    return v.toFixed(4);
  }
  function localX(e) {
    var r = svg.getBoundingClientRect();
    return (e.clientX - r.left) / r.width * VW;
  }

  // build a static polyline from an array, mapping (xk -> px, yk -> py), clipped to frame
  function poly(arr, xk, yk, cls) {
    var p = [], i;
    for (i = 0; i < arr.length; i++) p.push(px(arr[i][xk]).toFixed(1) + "," + sclampY(py(arr[i][yk])).toFixed(1));
    return '<polyline points="' + p.join(" ") + '" class="' + cls + '"/>';
  }
  function dots(arr, xk, yk, cls) {
    var s = "", i; for (i = 0; i < arr.length; i++)
      s += '<circle cx="' + px(arr[i][xk]).toFixed(1) + '" cy="' + sclampY(py(arr[i][yk])).toFixed(1) + '" r="3.4" class="' + cls + '"/>';
    return s;
  }
  function frame(xticks, xlabels, ylabels) {
    var s = [], i, g;
    for (i = 0; i < xticks.length; i++)
      s.push('<line x1="' + px(xticks[i]) + '" y1="' + py(by0) + '" x2="' + px(xticks[i]) + '" y2="' + py(by1) + '" class="mlw-grid"/>');
    for (i = 0; i < ylabels.length; i++) {
      g = ylabels[i];
      s.push('<line x1="' + px(bx0) + '" y1="' + py(g) + '" x2="' + px(bx1) + '" y2="' + py(g) + '" class="mlw-grid"/>');
      s.push('<text x="' + (PAD - 8) + '" y="' + (py(g) + 4) + '" text-anchor="end" class="mlw-bv-tick">' + g.toFixed(2) + '</text>');
    }
    s.push('<line x1="' + px(bx0) + '" y1="' + py(by0) + '" x2="' + px(bx1) + '" y2="' + py(by0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(bx0) + '" y1="' + py(by0) + '" x2="' + px(bx0) + '" y2="' + py(by1) + '" class="mlw-axis"/>');
    for (i = 0; i < xticks.length; i++)
      s.push('<text x="' + px(xticks[i]) + '" y="' + (VH - PAD + 18) + '" text-anchor="middle" class="mlw-bv-tick">' + xlabels[i] + '</text>');
    return s.join("");
  }
  function legend() {   // in-plot marker for train/cv/baseline lines (top-right)
    var x = VW - PAD - 118, y = PAD + 6, s = [];
    s.push('<rect x="' + x + '" y="' + y + '" width="118" height="52" rx="5" class="mlw-bv-legbox"/>');
    s.push('<line x1="' + (x + 10) + '" y1="' + (y + 14) + '" x2="' + (x + 30) + '" y2="' + (y + 14) + '" class="mlw-bv-train"/>');
    s.push('<text x="' + (x + 36) + '" y="' + (y + 18) + '" class="mlw-bv-legtxt">J_train</text>');
    s.push('<line x1="' + (x + 10) + '" y1="' + (y + 30) + '" x2="' + (x + 30) + '" y2="' + (y + 30) + '" class="mlw-bv-cv"/>');
    s.push('<text x="' + (x + 36) + '" y="' + (y + 34) + '" class="mlw-bv-legtxt">J_cv</text>');
    s.push('<line x1="' + (x + 10) + '" y1="' + (y + 45) + '" x2="' + (x + 30) + '" y2="' + (y + 45) + '" class="mlw-bv-baseline"/>');
    s.push('<text x="' + (x + 36) + '" y="' + (y + 49) + '" class="mlw-bv-legtxt">noise floor</text>');
    return s.join("");
  }

  function diagnose(tr, cv) {           // shared bias/variance decision rule
    var bias = tr > 4 * BASELINE;       // doesn't even fit the training set
    var varc = cv > 2 * tr + 1.5 * BASELINE;  // does much worse held-out than on training
    if (bias && varc) return { label: "High bias AND high variance", cls: "mlw-diag--var" };
    if (bias) return { label: "Underfit — high bias", cls: "mlw-diag--bias" };
    if (varc) return { label: "Overfit — high variance", cls: "mlw-diag--var" };
    return { label: "Good fit — generalizes", cls: "mlw-diag--good" };
  }

  function renderComplexity() {
    var d = +degEl.value, s = [];
    bx0 = DEG_MIN - 0.5; bx1 = DEG_MAX + 0.5; by0 = 0; by1 = 0.5;
    var xt = [], xl = [], k;
    for (k = DEG_MIN; k <= DEG_MAX; k++) { xt.push(k); xl.push(String(k)); }

    // shaded bias / variance regions split at the sweet spot
    var xSweet = px(sweetD);
    s.push('<rect x="' + px(bx0) + '" y="' + py(by1) + '" width="' + (xSweet - px(bx0)) + '" height="' + (py(by0) - py(by1)) + '" class="mlw-bv-region-bias"/>');
    s.push('<rect x="' + xSweet + '" y="' + py(by1) + '" width="' + (px(bx1) - xSweet) + '" height="' + (py(by0) - py(by1)) + '" class="mlw-bv-region-var"/>');
    s.push(frame(xt, xl, [0, 0.1, 0.2, 0.3, 0.4, 0.5]));
    s.push('<text x="' + ((px(bx0) + xSweet) / 2) + '" y="' + (PAD - 6) + '" text-anchor="middle" class="mlw-bv-regionlbl mlw-bv-regionlbl--bias">underfit · high bias</text>');
    s.push('<text x="' + ((xSweet + px(bx1)) / 2) + '" y="' + (PAD - 6) + '" text-anchor="middle" class="mlw-bv-regionlbl mlw-bv-regionlbl--var">overfit · high variance</text>');

    // noise floor (irreducible error) — the best any model can do
    s.push('<line x1="' + px(bx0) + '" y1="' + py(BASELINE) + '" x2="' + px(bx1) + '" y2="' + py(BASELINE) + '" class="mlw-bv-baseline"/>');

    // the two real error curves
    s.push(poly(COMPLEXITY, "d", "tr", "mlw-bv-train"));
    s.push(poly(COMPLEXITY, "d", "cv", "mlw-bv-cv"));
    s.push(dots(COMPLEXITY, "d", "tr", "mlw-bv-tdot"));
    s.push(dots(COMPLEXITY, "d", "cv", "mlw-bv-cdot"));

    // sweet-spot marker (min J_cv)
    var cvSweet = COMPLEXITY[sweetD - DEG_MIN].cv;
    s.push('<line x1="' + xSweet + '" y1="' + py(by0) + '" x2="' + xSweet + '" y2="' + py(by1) + '" class="mlw-bv-sweetline"/>');
    s.push('<circle cx="' + xSweet + '" cy="' + sclampY(py(cvSweet)) + '" r="6" class="mlw-bv-sweetdot"/>');
    s.push('<text x="' + xSweet + '" y="' + (sclampY(py(cvSweet)) - 12) + '" text-anchor="middle" class="mlw-bv-sweettxt">sweet spot d=' + sweetD + '</text>');

    // chosen-degree marker
    var row = COMPLEXITY[d - DEG_MIN];
    s.push('<line x1="' + px(d) + '" y1="' + py(by0) + '" x2="' + px(d) + '" y2="' + py(by1) + '" class="mlw-bv-marker"/>');
    s.push('<circle cx="' + px(d) + '" cy="' + sclampY(py(row.tr)) + '" r="5" class="mlw-bv-pickdot"/>');
    s.push('<circle cx="' + px(d) + '" cy="' + sclampY(py(row.cv)) + '" r="5" class="mlw-bv-pickdot"/>');

    // axis titles
    s.push('<text x="' + (VW / 2) + '" y="' + (VH - 8) + '" text-anchor="middle" class="mlw-bv-axtitle">model complexity  (polynomial degree d) →</text>');
    s.push('<text x="16" y="' + (VH / 2) + '" text-anchor="middle" transform="rotate(-90 16 ' + (VH / 2) + ')" class="mlw-bv-axtitle">error  (MSE)</text>');
    s.push(legend());

    svg.innerHTML = s.join("");
    set(".mlw-bv-etr", fmt(row.tr));
    set(".mlw-bv-ecv", fmt(row.cv));
    set(".mlw-bv-gap", fmt(row.cv - row.tr));
    var dg = diagnose(row.tr, row.cv), badge = root.querySelector(".mlw-diag");
    badge.className = "mlw-diag " + dg.cls;
    root.querySelector(".mlw-diaglabel").textContent = dg.label;

    var tip;
    if (dg.cls === "mlw-diag--bias") tip = "d = " + d + " (left of the valley): the model is too simple — J_train itself is high, it can't even fit the training data. That's <b>high bias</b>; a richer model helps.";
    else if (dg.cls === "mlw-diag--var") tip = "d = " + d + " (right of the valley): J_train keeps falling but J_cv climbs — the model chases noise. That's <b>high variance</b>; simplify or regularize.";
    else tip = "d = " + d + " sits near the bottom of the J_cv U — both errors are low and close, just above the noise floor. This is around the <b>sweet spot</b> (min J_cv at d = " + sweetD + ").";
    root.querySelector(".mlw-bv-tip").innerHTML = tip + " Drag the slider, or switch to the learning-curve view.";
  }

  function renderLearning() {
    var d = +degEl.value, arr = learningCurve(d), s = [], k;
    var mMin = arr.length ? arr[0].m : 4, mMax = POOL_N;
    bx0 = mMin - 0.5; bx1 = mMax + 0.5; by0 = 0; by1 = 0.5;
    var xt = [], xl = [];
    for (k = mMin; k <= mMax; k += (mMax - mMin > 12 ? 3 : 2)) { xt.push(k); xl.push(String(k)); }
    if (xt[xt.length - 1] !== mMax) { xt.push(mMax); xl.push(String(mMax)); }

    s.push(frame(xt, xl, [0, 0.1, 0.2, 0.3, 0.4, 0.5]));
    s.push('<line x1="' + px(bx0) + '" y1="' + py(BASELINE) + '" x2="' + px(bx1) + '" y2="' + py(BASELINE) + '" class="mlw-bv-baseline"/>');
    s.push(poly(arr, "m", "tr", "mlw-bv-train"));
    s.push(poly(arr, "m", "cv", "mlw-bv-cv"));
    s.push(dots(arr, "m", "tr", "mlw-bv-tdot"));
    s.push(dots(arr, "m", "cv", "mlw-bv-cdot"));

    var last = arr[arr.length - 1], first = arr[0];
    // gap-closes annotation between the two end points
    s.push('<line x1="' + px(last.m) + '" y1="' + sclampY(py(last.tr)) + '" x2="' + px(last.m) + '" y2="' + sclampY(py(last.cv)) + '" class="mlw-bv-gapline"/>');
    s.push('<text x="' + (px(last.m) - 6) + '" y="' + ((sclampY(py(last.tr)) + sclampY(py(last.cv))) / 2) + '" text-anchor="end" class="mlw-bv-gaptxt">gap</text>');

    s.push('<text x="' + (VW / 2) + '" y="' + (VH - 8) + '" text-anchor="middle" class="mlw-bv-axtitle">training-set size  m_train →</text>');
    s.push('<text x="16" y="' + (VH / 2) + '" text-anchor="middle" transform="rotate(-90 16 ' + (VH / 2) + ')" class="mlw-bv-axtitle">error  (MSE)</text>');
    s.push(legend());

    svg.innerHTML = s.join("");
    set(".mlw-bv-etr", fmt(last.tr));
    set(".mlw-bv-ecv", fmt(last.cv));
    set(".mlw-bv-gap", fmt(last.cv - last.tr));

    var endGap = last.cv - last.tr, plateauHigh = last.tr > 3 * BASELINE;
    var dg, tip;
    if (plateauHigh && endGap < 1.5 * BASELINE) {
      dg = { label: "High bias — curves plateau", cls: "mlw-diag--bias" };
      tip = "At degree " + d + " both curves flatten <b>above</b> the noise floor with only a small gap. More data won't help — the model is too simple. Fix the bias: raise the degree.";
    } else if (endGap > 1.5 * BASELINE) {
      dg = { label: "High variance — gap open", cls: "mlw-diag--var" };
      tip = "At degree " + d + " J_train sits low but J_cv stays well above it — a wide gap that keeps narrowing as m grows. Here <b>more training data helps</b>: it pulls J_cv down.";
    } else {
      dg = { label: "Good fit — both low", cls: "mlw-diag--good" };
      tip = "At degree " + d + " J_train and J_cv have converged low, near the noise floor. The model both fits and generalizes.";
    }
    var badge = root.querySelector(".mlw-diag");
    badge.className = "mlw-diag " + dg.cls;
    root.querySelector(".mlw-diaglabel").textContent = dg.label;
    root.querySelector(".mlw-bv-tip").innerHTML = tip + " Change the degree slider to see bias vs variance change shape.";
  }

  function render() {
    set(".mlw-bv-degv", degEl.value);
    if (mode === "complexity") renderComplexity(); else renderLearning();
  }

  // ---- interaction -----------------------------------------------------------------
  // click/drag on the plot picks the nearest degree (x-axis) — works in complexity view
  function pickDegree(e) {
    if (mode !== "complexity") return;
    bx0 = DEG_MIN - 0.5; bx1 = DEG_MAX + 0.5;               // ensure mapping matches the view
    var xd = bx0 + (localX(e) - PAD) / (VW - 2 * PAD) * (bx1 - bx0);
    var d = Math.max(DEG_MIN, Math.min(DEG_MAX, Math.round(xd)));
    if (+degEl.value !== d) { degEl.value = d; render(); }
  }
  var dragging = false;
  svg.addEventListener("pointerdown", function (e) { dragging = true; try { svg.setPointerCapture(e.pointerId); } catch (err) {} pickDegree(e); });
  svg.addEventListener("pointermove", function (e) { if (dragging) pickDegree(e); });
  svg.addEventListener("pointerup", function () { dragging = false; });
  svg.addEventListener("pointercancel", function () { dragging = false; });

  degEl.addEventListener("input", render);

  var modeBtns = root.querySelectorAll(".mlw-bv-mode");
  function setMode(m) {
    mode = m;
    for (var i = 0; i < modeBtns.length; i++)
      modeBtns[i].classList.toggle("is-active", modeBtns[i].getAttribute("data-mode") === m);
    render();
  }
  for (var b = 0; b < modeBtns.length; b++)
    (function (btn) { btn.addEventListener("click", function () { setMode(btn.getAttribute("data-mode")); }); })(modeBtns[b]);

  root.querySelector(".mlw-bv-under").addEventListener("click", function () { degEl.value = DEG_MIN; render(); });
  root.querySelector(".mlw-bv-sweet").addEventListener("click", function () { degEl.value = sweetD; render(); });
  root.querySelector(".mlw-bv-over").addEventListener("click", function () { degEl.value = DEG_MAX; render(); });

  degEl.value = sweetD;
  render();
});

/* ===== widget: cost-surface.js ===== */
/* cost-surface — the MSE cost J(w,b) for simple linear regression, shown as two
 * linked panels: LEFT = the fixed training data with the current line f(x)=wx+b and
 * its squared-error bars; RIGHT = an EXACT contour plot of J over (w,b) with a marker
 * at the current parameters and the single least-squares minimum. Because J is quadratic
 * the iso-cost contours are exact concentric ellipses — the convex "bowl" with one bottom.
 * Drag the marker on the contour, or the w / b sliders; everything recomputes to the true
 * values (no animation). Self-contained ES5; registered on the MLW harness. */
MLW.register("cost-surface", function (root) {
  var VW = 520, VH = 420, PADL = 54, PADR = 16, PADB = 46, PADT = 16;
  var UID = "cs" + Math.round(Math.random() * 1e6);

  // ---- fixed training set (7 points, roughly linear) ----
  var DATA = [[1,1.5],[2,2.4],[3,4.2],[4,4.6],[5,6.4],[6,7.1],[7,8.8]]
    .map(function (a) { return { x: a[0], y: a[1] }; });
  var m = DATA.length;

  // ---- exact least-squares fit + the cost Hessian coefficients ----
  var Sx = 0, Sy = 0, Sxx = 0, Sxy = 0, i, p;
  for (i = 0; i < m; i++) { p = DATA[i]; Sx += p.x; Sy += p.y; Sxx += p.x * p.x; Sxy += p.x * p.y; }
  var den = m * Sxx - Sx * Sx;
  var WSTAR = (m * Sxy - Sx * Sy) / den;         // optimal slope
  var BSTAR = (Sy - WSTAR * Sx) / m;             // optimal intercept
  function cost(w, b) {                            // J(w,b) = (1/2m) Σ (w x_i + b - y_i)^2
    var s = 0, k, e;
    for (k = 0; k < m; k++) { e = w * DATA[k].x + b - DATA[k].y; s += e * e; }
    return s / (2 * m);
  }
  var JMIN = cost(WSTAR, BSTAR);

  // Hessian of Σ e^2 is 2·[[Sxx, Sx],[Sx, m]]; write Q(dw,db)=Sxx dw^2+2Sx dw db+m db^2,
  // so J = JMIN + Q/(2m) and the iso-cost set {J=L} is the exact ellipse {Q = 2m(L-JMIN)}.
  var aH = Sxx, bH = Sx, cH = m;
  var TH = 0.5 * Math.atan2(2 * bH, aH - cH);     // principal-axis angle
  var disc = Math.sqrt((aH - cH) * (aH - cH) + 4 * bH * bH);
  var L1 = (aH + cH + disc) / 2;                   // eigenvalue along TH
  var L2 = (aH + cH - disc) / 2;                   // eigenvalue perpendicular

  // ---- (w,b) plotting window, centred on the minimum ----
  var SPANW = 2.2, SPANB = 3.3;
  var WMIN = WSTAR - SPANW, WMAX = WSTAR + SPANW;
  var BMIN = BSTAR - SPANB, BMAX = BSTAR + SPANB;
  var DX0 = 0, DX1 = 8, DY0 = 0, DY1 = 10;         // data window

  // farthest Q inside the window (a corner) → set the outermost contour level
  var KMAX = aH * SPANW * SPANW + 2 * bH * SPANW * SPANB + cH * SPANB * SPANB;
  var NLEV = 7;

  // ---- coordinate maps ----
  function pxD(x) { return PADL + (x - DX0) / (DX1 - DX0) * (VW - PADL - PADR); }
  function pyD(y) { return VH - PADB - (y - DY0) / (DY1 - DY0) * (VH - PADB - PADT); }
  function pxC(w) { return PADL + (w - WMIN) / (WMAX - WMIN) * (VW - PADL - PADR); }
  function pyC(b) { return VH - PADB - (b - BMIN) / (BMAX - BMIN) * (VH - PADB - PADT); }
  function wFromSx(sx) { return WMIN + (sx - PADL) / (VW - PADL - PADR) * (WMAX - WMIN); }
  function bFromSy(sy) { return BMIN + (VH - PADB - sy) / (VH - PADB - PADT) * (BMAX - BMIN); }
  function local(svg, e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function cl(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // ---- state ----
  var w = 2.4, b = -1.5;                            // start off the minimum
  var W0 = w, B0 = b;

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Training data with the current regression line and its squared-error bars">' +
        '<clipPath id="' + UID + 'd"><rect x="' + PADL + '" y="' + PADT + '" width="' +
          (VW - PADL - PADR) + '" height="' + (VH - PADB - PADT) + '"/></clipPath>' +
      '</svg>' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Contour plot of the cost J over slope w and intercept b, with a draggable marker">' +
        '<clipPath id="' + UID + 'c"><rect x="' + PADL + '" y="' + PADT + '" width="' +
          (VW - PADL - PADR) + '" height="' + (VH - PADB - PADT) + '"/></clipPath>' +
      '</svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">f(x) = <b class="mlw-wv">0</b>·x + <b class="mlw-bv">0</b></div>' +
        '<div class="mlw-stats">' +
          '<div><span>Cost J(w, b)</span><span class="mlw-jc">—</span></div>' +
          '<div><span>Minimum cost J</span><span class="mlw-jm">—</span></div>' +
          '<div><span>Above the minimum</span><span class="mlw-gap">—</span></div>' +
        '</div>' +
        '<div class="mlw-slider"><span class="k">w</span>' +
          '<input type="range" class="mlw-w"><span class="v mlw-wval">0</span></div>' +
        '<div class="mlw-slider"><span class="k">b</span>' +
          '<input type="range" class="mlw-b"><span class="v mlw-bval">0</span></div>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-resid" checked> show error bars</label>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-best" type="button">Jump to best fit</button>' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag the pink marker on the right panel — or the w / b sliders — ' +
        'to move the line. The rings are equal-cost contours; the gold ✚ is the single ' +
        'least-squares minimum. Every ring inside the last is a lower cost: one bowl, one bottom.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Left: the fixed data, the line <code>f(x)=wx+b</code>, and the ' +
    'vertical squared-error bars whose mean (÷2m) is the cost. Right: an exact contour map of ' +
    '<code>J(w,b)=(1/2m)Σ(wxᵢ+b−yᵢ)²</code>. Because J is quadratic the contours are true nested ' +
    'ellipses — a convex bowl with exactly one minimum, which gradient descent rolls down to.</p>';

  root.innerHTML = PANEL;
  var svgD = root.querySelectorAll(".mlw-plot")[0];
  var svgC = root.querySelectorAll(".mlw-plot")[1];
  var showResid = root.querySelector(".mlw-resid");
  var slW = root.querySelector(".mlw-w"), slB = root.querySelector(".mlw-b");
  slW.min = WMIN; slW.max = WMAX; slW.step = 0.02;
  slB.min = BMIN; slB.max = BMAX; slB.step = 0.02;

  function set(cls, v) { root.querySelector(cls).textContent = v; }
  function ticks(lo, hi, step) {
    var out = [], t = Math.ceil(lo / step) * step;
    for (; t <= hi + 1e-9; t += step) out.push(Math.round(t * 100) / 100);
    return out;
  }

  function renderData() {
    var s = [], j, t, tk;
    tk = ticks(DX0, DX1, 2);
    for (j = 0; j < tk.length; j++) { t = tk[j];
      s.push('<line x1="' + pxD(t) + '" y1="' + pyD(DY0) + '" x2="' + pxD(t) + '" y2="' + pyD(DY1) + '" class="mlw-grid"/>');
      s.push('<text x="' + pxD(t) + '" y="' + (VH - PADB + 16) + '" text-anchor="middle" class="mlw-axlabel">' + t + '</text>');
    }
    tk = ticks(DY0, DY1, 2);
    for (j = 0; j < tk.length; j++) { t = tk[j];
      s.push('<line x1="' + pxD(DX0) + '" y1="' + pyD(t) + '" x2="' + pxD(DX1) + '" y2="' + pyD(t) + '" class="mlw-grid"/>');
      s.push('<text x="' + (PADL - 8) + '" y="' + (pyD(t) + 4) + '" text-anchor="end" class="mlw-axlabel">' + t + '</text>');
    }
    s.push('<line x1="' + pxD(DX0) + '" y1="' + pyD(DY0) + '" x2="' + pxD(DX1) + '" y2="' + pyD(DY0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + pxD(DX0) + '" y1="' + pyD(DY0) + '" x2="' + pxD(DX0) + '" y2="' + pyD(DY1) + '" class="mlw-axis"/>');
    // error bars (residuals)
    if (showResid.checked) {
      for (j = 0; j < m; j++) { p = DATA[j];
        var yh = w * p.x + b;
        s.push('<line x1="' + pxD(p.x) + '" y1="' + pyD(p.y) + '" x2="' + pxD(p.x) + '" y2="' +
               pyD(cl(yh, DY0 - 2, DY1 + 2)) + '" class="mlw-resid-line" clip-path="url(#' + UID + 'd)"/>');
      }
    }
    // the current line, clipped to the plot box
    s.push('<line x1="' + pxD(DX0) + '" y1="' + pyD(w * DX0 + b) + '" x2="' + pxD(DX1) + '" y2="' +
           pyD(w * DX1 + b) + '" class="mlw-line" clip-path="url(#' + UID + 'd)"/>');
    for (j = 0; j < m; j++) { p = DATA[j];
      s.push('<circle cx="' + pxD(p.x) + '" cy="' + pyD(p.y) + '" r="6" class="mlw-dot"/>');
    }
    s.push('<text x="' + ((PADL + VW - PADR) / 2) + '" y="' + (VH - 6) + '" text-anchor="middle" class="mlw-axtitle">x</text>');
    s.push('<text transform="translate(14 ' + ((PADT + VH - PADB) / 2) + ') rotate(-90)" text-anchor="middle" class="mlw-axtitle">y</text>');
    svgD.innerHTML = svgD.querySelector("clipPath").outerHTML + s.join("");
  }

  function ellipse(K) {                             // exact iso-cost ellipse for level Q=K
    var aX = Math.sqrt(K / L1), aY = Math.sqrt(K / L2), pts = [], t, pp, qq, dw, db;
    var ct = Math.cos(TH), st = Math.sin(TH);
    for (t = 0; t <= 6.2832; t += 6.2832 / 72) {
      pp = aX * Math.cos(t); qq = aY * Math.sin(t);
      dw = pp * ct - qq * st; db = pp * st + qq * ct;
      pts.push(pxC(WSTAR + dw).toFixed(1) + "," + pyC(BSTAR + db).toFixed(1));
    }
    return pts.join(" ");
  }

  function renderContour() {
    var s = [], j, t, tk, K, op;
    tk = ticks(Math.ceil(WMIN), Math.floor(WMAX), 1);
    for (j = 0; j < tk.length; j++) { t = tk[j];
      s.push('<line x1="' + pxC(t) + '" y1="' + pyC(BMIN) + '" x2="' + pxC(t) + '" y2="' + pyC(BMAX) + '" class="mlw-grid"/>');
      s.push('<text x="' + pxC(t) + '" y="' + (VH - PADB + 16) + '" text-anchor="middle" class="mlw-axlabel">' + t + '</text>');
    }
    tk = ticks(Math.ceil(BMIN), Math.floor(BMAX), 1);
    for (j = 0; j < tk.length; j++) { t = tk[j];
      s.push('<line x1="' + pxC(WMIN) + '" y1="' + pyC(t) + '" x2="' + pxC(WMAX) + '" y2="' + pyC(t) + '" class="mlw-grid"/>');
      s.push('<text x="' + (PADL - 8) + '" y="' + (pyC(t) + 4) + '" text-anchor="end" class="mlw-axlabel">' + t + '</text>');
    }
    // nested exact contours; inner rings drawn stronger to suggest the bowl's depth
    for (j = NLEV; j >= 1; j--) {
      K = KMAX * (j / NLEV) * (j / NLEV);
      op = (0.3 + 0.55 * (1 - (j - 1) / (NLEV - 1))).toFixed(2);
      s.push('<polygon points="' + ellipse(K) + '" class="mlw-cost-contour" ' +
             'style="stroke-opacity:' + op + '" clip-path="url(#' + UID + 'c)"/>');
    }
    // frame axes + zero references
    s.push('<line x1="' + pxC(WMIN) + '" y1="' + pyC(BMIN) + '" x2="' + pxC(WMAX) + '" y2="' + pyC(BMIN) + '" class="mlw-axis"/>');
    s.push('<line x1="' + pxC(WMIN) + '" y1="' + pyC(BMIN) + '" x2="' + pxC(WMIN) + '" y2="' + pyC(BMAX) + '" class="mlw-axis"/>');
    // guide lines from the current point to each axis (read off w and b)
    s.push('<line x1="' + pxC(w) + '" y1="' + pyC(b) + '" x2="' + pxC(w) + '" y2="' + pyC(BMIN) + '" class="mlw-cost-cross" clip-path="url(#' + UID + 'c)"/>');
    s.push('<line x1="' + pxC(w) + '" y1="' + pyC(b) + '" x2="' + pxC(WMIN) + '" y2="' + pyC(b) + '" class="mlw-cost-cross" clip-path="url(#' + UID + 'c)"/>');
    // the minimum (gold plus)
    var mx = pxC(WSTAR), my = pyC(BSTAR);
    s.push('<line x1="' + (mx - 7) + '" y1="' + my + '" x2="' + (mx + 7) + '" y2="' + my + '" class="mlw-cost-min"/>');
    s.push('<line x1="' + mx + '" y1="' + (my - 7) + '" x2="' + mx + '" y2="' + (my + 7) + '" class="mlw-cost-min"/>');
    s.push('<text x="' + (mx + 9) + '" y="' + (my - 8) + '" class="mlw-axlabel">min</text>');
    // the current parameters (draggable marker)
    s.push('<circle cx="' + pxC(w) + '" cy="' + pyC(b) + '" r="7" class="mlw-dot mlw-dot--drag"/>');
    // axis titles
    s.push('<text x="' + ((PADL + VW - PADR) / 2) + '" y="' + (VH - 6) + '" text-anchor="middle" class="mlw-axtitle">w  (slope)</text>');
    s.push('<text transform="translate(14 ' + ((PADT + VH - PADB) / 2) + ') rotate(-90)" text-anchor="middle" class="mlw-axtitle">b  (intercept)</text>');
    svgC.innerHTML = svgC.querySelector("clipPath").outerHTML + s.join("");
  }

  function syncControls() {
    slW.value = w; slB.value = b;
    set(".mlw-wval", w.toFixed(2)); set(".mlw-bval", b.toFixed(2));
    set(".mlw-wv", w.toFixed(2)); set(".mlw-bv", b.toFixed(2));
  }

  function render() {
    renderData();
    renderContour();
    var J = cost(w, b);
    set(".mlw-jc", J.toFixed(3));
    set(".mlw-jm", JMIN.toFixed(3));
    set(".mlw-gap", "+" + (J - JMIN).toFixed(3));
    syncControls();
  }

  // ---- interaction: drag the marker on the contour panel ----
  var dragging = false;
  function grab(e) {
    var l = local(svgC, e);
    if (l.x < PADL - 12 || l.x > VW - PADR + 12 || l.y < PADT - 12 || l.y > VH - PADB + 12) return;
    dragging = true;
    move(e);
    try { svgC.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function move(e) {
    if (!dragging) return;
    var l = local(svgC, e);
    w = cl(wFromSx(l.x), WMIN, WMAX);
    b = cl(bFromSy(l.y), BMIN, BMAX);
    render();
  }
  function drop() { dragging = false; }
  svgC.addEventListener("pointerdown", grab);
  svgC.addEventListener("pointermove", move);
  svgC.addEventListener("pointerup", drop);
  svgC.addEventListener("pointercancel", drop);

  slW.addEventListener("input", function () { w = parseFloat(slW.value); render(); });
  slB.addEventListener("input", function () { b = parseFloat(slB.value); render(); });
  showResid.addEventListener("change", render);
  root.querySelector(".mlw-best").addEventListener("click", function () { w = WSTAR; b = BSTAR; render(); });
  root.querySelector(".mlw-reset").addEventListener("click", function () { w = W0; b = B0; render(); });

  render();
});

/* ===== widget: decision-boundary.js ===== */
/* decision-boundary — a linear (logistic-regression) classifier on a FIXED 2-class
 * scatter. The user sets the boundary w1·x1 + w2·x2 + b = 0 with three sliders, or by
 * dragging it (drag the line to slide it, drag the end handle to rotate it). The two
 * half-planes are shaded by prediction, misclassified points get a ring, and the exact
 * accuracy is shown. "Train (logistic)" runs real batch gradient descent on the
 * cross-entropy loss to find the best-fit weights. Self-contained; registered on MLW. */
MLW.register("decision-boundary", function (root) {
  var VW = 560, VH = 440, PAD = 40, X0 = 0, X1 = 10, Y0 = 0, Y1 = 10;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function dataX(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function dataY(sy) { return Y0 + (VH - PAD - sy) / (VH - 2 * PAD) * (Y1 - Y0); }
  function r1(v) { return Math.round(v * 10) / 10; }
  function r05(v) { return Math.round(v * 2) / 2; }

  // Fixed dataset: two clusters (class 0 low-left, class 1 high-right). The default
  // boundary below is deliberately mediocre (one misclassified point) so that pressing
  // "Train" visibly drives the error to zero.
  var DATA = [
    [2, 3, 0], [3, 2, 0], [1.5, 4, 0], [4, 3, 0], [3, 4, 0], [2.5, 2, 0], [4.5, 4, 0], [5, 4, 0],
    [7, 7, 1], [8, 6, 1], [6.5, 8, 1], [7.5, 7.5, 1], [8.5, 7, 1], [6, 7, 1], [7, 8.5, 1], [4.5, 5, 1]
  ].map(function (a) { return { x: a[0], y: a[1], c: a[2] }; });

  var W0 = { w1: 1, w2: 0, b: -5 };             // default: mediocre vertical line x1 = 5 (1 miss)
  var w1, w2, b;                                 // live boundary state (closed over by sc)
  function sc(x, y) { return w1 * x + w2 * y + b; }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Two-class scatter plot with an adjustable linear decision boundary"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">sign( <b class="mlw-vw1">0</b>·x₁ + <b class="mlw-vw2">0</b>·x₂ + <b class="mlw-vb">0</b> )</div>' +
        '<div class="mlw-stats">' +
          '<div><span>Accuracy</span><span class="mlw-acc">—</span></div>' +
          '<div><span>Misclassified</span><span class="mlw-miss">—</span></div>' +
          '<div><span>Points</span><span class="mlw-n">' + DATA.length + '</span></div>' +
        '</div>' +
        '<div class="mlw-db-sliders">' +
          '<label>w₁ <input type="range" class="mlw-sw1" min="-5" max="5" step="0.1"><output class="mlw-ow1"></output></label>' +
          '<label>w₂ <input type="range" class="mlw-sw2" min="-5" max="5" step="0.1"><output class="mlw-ow2"></output></label>' +
          '<label>b <input type="range" class="mlw-sb" min="-40" max="40" step="0.5"><output class="mlw-ob"></output></label>' +
        '</div>' +
        '<div class="mlw-db-legend">' +
          '<span><i class="mlw-sw mlw-sw--c1"></i>class 1 (score &gt; 0)</span>' +
          '<span><i class="mlw-sw mlw-sw--c0"></i>class 0 (score ≤ 0)</span>' +
          '<span><i class="mlw-sw mlw-sw--miss"></i>misclassified</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-train" type="button">Train (logistic)</button>' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">The shading is the classifier’s prediction, split by the exact line ' +
        'w₁x₁ + w₂x₂ + b = 0. Move the sliders, or drag the line to slide it and drag the small end ' +
        'handle to rotate it. <b>Train</b> runs real gradient descent on the logistic loss.</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var sW1 = root.querySelector(".mlw-sw1"), sW2 = root.querySelector(".mlw-sw2"), sB = root.querySelector(".mlw-sb");
  var drag = null, pivot = null, segMid = null, segRot = null;

  function set(cls, v) { root.querySelector(cls).textContent = v; }

  // Sutherland–Hodgman: clip a convex polygon to a half-plane (keepPos: keep score>=0).
  function clipHalf(poly, keepPos) {
    var out = [], n = poly.length, i, a, c, sa, scb, ina, inb, t;
    for (i = 0; i < n; i++) {
      a = poly[i]; c = poly[(i + 1) % n];
      sa = sc(a.x, a.y); scb = sc(c.x, c.y);
      ina = keepPos ? sa >= 0 : sa <= 0;
      inb = keepPos ? scb >= 0 : scb <= 0;
      if (ina) out.push(a);
      if (ina !== inb) {
        t = sa / (sa - scb);
        out.push({ x: a.x + t * (c.x - a.x), y: a.y + t * (c.y - a.y) });
      }
    }
    return out;
  }
  function polyPath(poly) {
    if (poly.length < 3) return "";
    var d = [], i;
    for (i = 0; i < poly.length; i++) d.push((i ? "L" : "M") + px(poly[i].x) + " " + py(poly[i].y));
    return d.join(" ") + " Z";
  }
  // where the boundary line crosses the plot rectangle → the drawable segment endpoints
  function segPoints() {
    if (w1 * w1 + w2 * w2 < 1e-9) return [];
    var edges = [[0, 0, 10, 0], [10, 0, 10, 10], [10, 10, 0, 10], [0, 10, 0, 0]], out = [], i, e, s1, s2, t, p;
    for (i = 0; i < 4; i++) {
      e = edges[i]; s1 = sc(e[0], e[1]); s2 = sc(e[2], e[3]);
      if ((s1 > 0) !== (s2 > 0) && Math.abs(s1 - s2) > 1e-12) {
        t = s1 / (s1 - s2); p = { x: e[0] + t * (e[2] - e[0]), y: e[1] + t * (e[3] - e[1]) };
        if (!out.some(function (q) { return Math.abs(q.x - p.x) < 1e-6 && Math.abs(q.y - p.y) < 1e-6; })) out.push(p);
      }
    }
    return out.slice(0, 2);
  }

  function render() {
    var s = [], g, i, p, rect, poly;
    for (g = 0; g <= 10; g += 2) {                 // grid + axes
      s.push('<line x1="' + px(g) + '" y1="' + py(0) + '" x2="' + px(g) + '" y2="' + py(10) + '" class="mlw-grid"/>');
      s.push('<line x1="' + px(0) + '" y1="' + py(g) + '" x2="' + px(10) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(10) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(0) + '" y2="' + py(10) + '" class="mlw-axis"/>');

    rect = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    poly = clipHalf(rect, true);  if (poly.length >= 3) s.push('<path d="' + polyPath(poly) + '" class="mlw-db-pos"/>');
    poly = clipHalf(rect, false); if (poly.length >= 3) s.push('<path d="' + polyPath(poly) + '" class="mlw-db-neg"/>');

    var seg = segPoints();
    if (seg.length === 2) {
      s.push('<line x1="' + px(seg[0].x) + '" y1="' + py(seg[0].y) + '" x2="' + px(seg[1].x) + '" y2="' + py(seg[1].y) + '" class="mlw-line"/>');
      segMid = { x: (seg[0].x + seg[1].x) / 2, y: (seg[0].y + seg[1].y) / 2 };
      segRot = seg[1];
    } else { segMid = null; segRot = null; }

    var correct = 0, miss = 0;
    for (i = 0; i < DATA.length; i++) {
      p = DATA[i];
      var pred = sc(p.x, p.y) > 0 ? 1 : 0, ok = pred === p.c;
      if (ok) correct++; else miss++;
      s.push('<circle cx="' + px(p.x) + '" cy="' + py(p.y) + '" r="7" class="mlw-dot mlw-dot--c' + p.c +
             (ok ? "" : " mlw-dot--miss") + '"/>');
    }

    if (segMid) {                                  // drag handles: translate (mid) + rotate (end)
      s.push('<circle cx="' + px(segMid.x) + '" cy="' + py(segMid.y) + '" r="8" class="mlw-handle"/>');
      s.push('<circle cx="' + px(segRot.x) + '" cy="' + py(segRot.y) + '" r="6" class="mlw-handle mlw-handle--rot"/>');
    }

    svg.innerHTML = s.join("");
    set(".mlw-acc", (100 * correct / DATA.length).toFixed(1) + "%");
    set(".mlw-miss", miss + " / " + DATA.length);
    set(".mlw-vw1", w1.toFixed(1));
    set(".mlw-vw2", w2.toFixed(1));
    set(".mlw-vb", b.toFixed(1));
    root.querySelector(".mlw-ow1").textContent = w1.toFixed(1);
    root.querySelector(".mlw-ow2").textContent = w2.toFixed(1);
    root.querySelector(".mlw-ob").textContent = b.toFixed(1);
  }
  function syncSliders() { sW1.value = w1; sW2.value = w2; sB.value = b; }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function segDist(l, a, c) {                       // screen point-to-segment distance
    var ax = px(a.x), ay = py(a.y), cx = px(c.x), cy = py(c.y);
    var dx = cx - ax, dy = cy - ay, len2 = dx * dx + dy * dy;
    var t = len2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((l.x - ax) * dx + (l.y - ay) * dy) / len2));
    return Math.hypot(l.x - (ax + t * dx), l.y - (ay + t * dy));
  }

  svg.addEventListener("pointerdown", function (e) {
    if (!segMid) return;
    var l = local(e), seg = segPoints();
    if (Math.hypot(px(segRot.x) - l.x, py(segRot.y) - l.y) < 18) {
      drag = "rot"; pivot = { x: segMid.x, y: segMid.y };
    } else if (Math.hypot(px(segMid.x) - l.x, py(segMid.y) - l.y) < 18 ||
               (seg.length === 2 && segDist(l, seg[0], seg[1]) < 12)) {
      drag = "trans";
    } else return;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var l = local(e), P = { x: dataX(l.x), y: dataY(l.y) };
    if (drag === "trans") {                         // keep normal (w1,w2); slide line through P
      b = r05(-(w1 * P.x + w2 * P.y));
    } else {                                        // rotate: new normal ⟂ (P − pivot), through pivot
      var dx = P.x - pivot.x, dy = P.y - pivot.y, dl = Math.hypot(dx, dy);
      if (dl < 1e-6) return;
      var nx = dy / dl, ny = -dx / dl;              // unit normal ⟂ drag direction
      if (nx * w1 + ny * w2 < 0) { nx = -nx; ny = -ny; }   // keep positive side stable
      var M = Math.sqrt(w1 * w1 + w2 * w2) || 2;    // preserve weight magnitude
      w1 = r1(nx * M); w2 = r1(ny * M);
      b = r05(-(w1 * pivot.x + w2 * pivot.y));
    }
    syncSliders(); render();
  });
  function endDrag() { drag = null; pivot = null; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  function fromSliders() {
    w1 = parseFloat(sW1.value); w2 = parseFloat(sW2.value); b = parseFloat(sB.value); render();
  }
  sW1.addEventListener("input", fromSliders);
  sW2.addEventListener("input", fromSliders);
  sB.addEventListener("input", fromSliders);

  function reset() { w1 = W0.w1; w2 = W0.w2; b = W0.b; syncSliders(); render(); }
  root.querySelector(".mlw-reset").addEventListener("click", reset);

  // real logistic regression via batch gradient descent on cross-entropy loss
  root.querySelector(".mlw-train").addEventListener("click", function () {
    var W1 = 0, W2 = 0, B = 0, lr = 0.3, n = DATA.length, it, k, p, z, h, d, g1, g2, gb;
    for (it = 0; it < 6000; it++) {
      g1 = 0; g2 = 0; gb = 0;
      for (k = 0; k < n; k++) {
        p = DATA[k]; z = W1 * p.x + W2 * p.y + B; h = 1 / (1 + Math.exp(-z)); d = h - p.c;
        g1 += d * p.x; g2 += d * p.y; gb += d;
      }
      W1 -= lr * g1 / n; W2 -= lr * g2 / n; B -= lr * gb / n;
    }
    var nm = Math.sqrt(W1 * W1 + W2 * W2) || 1, s = 2 / nm;   // normalize |w|=2 (boundary is scale-invariant)
    w1 = r1(W1 * s); w2 = r1(W2 * s); b = r05(B * s);
    syncSliders(); render();
  });

  reset();
});

/* ===== widget: decision-tree-entropy.js ===== */
/* decision-tree-entropy — a fixed row of two-class points on one feature axis. Drag the
 * vertical threshold (or use the slider) to split the data into a left set (x ≤ t) and a
 * right set (x > t); the widget computes the EXACT impurity (entropy or Gini) of each child,
 * their example-weighted average, and the information gain = impurity(root) − weighted-avg.
 * The lower panel plots the true information-gain function of the threshold as a static
 * staircase with a dot at every candidate midpoint split; the best split is highlighted.
 * The 1-level tree it implies (each leaf predicts its majority class) is drawn in the side
 * panel, with the points it misclassifies ringed. All math is real; nothing is animated —
 * every control just recomputes and re-renders the true state. Registered on the MLW harness. */
MLW.register("decision-tree-entropy", function (root) {
  var VW = 560, VH = 440, PAD = 40, X0 = 0, X1 = 10;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function dataX(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function clampT(v) { return Math.max(X0, Math.min(X1, v)); }

  // vertical pixel bands (feature axis is 1-D, so y is layout only)
  var PTOP = 48, PBOT = 138, AXY = 158, IGTOP = 202, IGBOT = 396, THTOP = 44;

  // fixed dataset, pre-sorted by feature x; class 0 tends low-x, class 1 high-x, with overlap
  var RAW = [[1.0,0],[1.7,0],[2.4,0],[3.1,0],[3.7,1],[4.2,0],[4.8,1],[5.3,0],[5.9,1],[6.6,1],[7.4,1],[8.2,1],[8.9,1]];
  var DATA = RAW.map(function (a, i) {
    // deterministic vertical jitter so points don't overlap (static, not random)
    var span = PBOT - PTOP - 34, frac = ((i * 5) % 7) / 6;
    return { x: a[0], c: a[1], jy: PTOP + 17 + frac * span };
  });
  DATA.sort(function (p, q) { return p.x - q.x; });
  var n = DATA.length;
  var totalC1 = 0, cum = [0], k;                   // cum[k] = # class-1 among first k sorted points
  for (k = 0; k < n; k++) { if (DATA[k].c === 1) totalC1++; cum.push(totalC1); }
  var p1root = totalC1 / n;

  var metric = "entropy", t = 3.0, T0 = 3.0, dragging = false;

  function imp(p) {
    if (metric === "gini") return 2 * p * (1 - p);           // Gini impurity: 1 − p² − (1−p)²
    if (p <= 0 || p >= 1) return 0;                          // entropy (base-2), 0·log0 = 0
    return -(p * Math.log(p) + (1 - p) * Math.log(1 - p)) / Math.LN2;
  }
  function rootImp() { return imp(p1root); }
  var METRIC_LABEL = { entropy: "H", gini: "Gini" };

  // full split statistics for a continuous threshold t (left = x ≤ t)
  function stats(th) {
    var nL = 0, c1L = 0, i, p;
    for (i = 0; i < n; i++) { p = DATA[i]; if (p.x <= th) { nL++; if (p.c === 1) c1L++; } }
    var nR = n - nL, c1R = totalC1 - c1L;
    var p1L = nL ? c1L / nL : 0, p1R = nR ? c1R / nR : 0;
    var iL = nL ? imp(p1L) : 0, iR = nR ? imp(p1R) : 0;
    var wL = nL / n, wR = nR / n, weighted = wL * iL + wR * iR;
    return { nL: nL, nR: nR, c1L: c1L, c1R: c1R, p1L: p1L, p1R: p1R, iL: iL, iR: iR,
             wL: wL, wR: wR, weighted: weighted, ig: rootImp() - weighted,
             majL: nL && c1L * 2 >= nL ? 1 : 0, majR: nR && c1R * 2 >= nR ? 1 : 0 };
  }
  // information gain when the first k sorted points go left (used for the exact staircase)
  function igCut(kk) {
    var c1L = cum[kk], nL = kk, nR = n - kk, c1R = totalC1 - c1L;
    var iL = nL ? imp(c1L / nL) : 0, iR = nR ? imp(c1R / nR) : 0;
    return rootImp() - (nL / n * iL + nR / n * iR);
  }
  function bestSplit() {                            // scan the n−1 candidate midpoints
    var bi = 1, bg = -1, i, g;
    for (i = 1; i < n; i++) { g = igCut(i); if (g > bg) { bg = g; bi = i; } }
    return { midx: (DATA[bi - 1].x + DATA[bi].x) / 2, ig: bg, cut: bi };
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot mlw-dt-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Two-class points on one feature axis with a draggable split threshold and an information-gain curve"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq"><b class="mlw-dt-mlbl">H</b>(root) = <b class="mlw-dt-root">0</b> ' +
          '<span class="mlw-dt-unit">bits</span></div>' +
        '<div class="mlw-dt-metric">' +
          '<label><input type="radio" name="mlw-dt-m" value="entropy" checked> Entropy</label>' +
          '<label><input type="radio" name="mlw-dt-m" value="gini"> Gini</label>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>Threshold</span><span>x ≤ <span class="mlw-dt-t">—</span></span></div>' +
          '<div><span>Left <span class="mlw-dt-nL">—</span> · impurity</span><span class="mlw-dt-iL">—</span></div>' +
          '<div><span>Right <span class="mlw-dt-nR">—</span> · impurity</span><span class="mlw-dt-iR">—</span></div>' +
          '<div><span>Weighted average</span><span class="mlw-dt-w">—</span></div>' +
          '<div><span><b>Information gain</b></span><span class="mlw-dt-ig">—</span></div>' +
          '<div><span>Best split (x ≤ <span class="mlw-dt-bt">—</span>)</span><span class="mlw-dt-bg">—</span></div>' +
        '</div>' +
        '<label class="mlw-dt-slabel">threshold ' +
          '<input type="range" class="mlw-dt-slider" min="0" max="10" step="0.05"></label>' +
        '<div class="mlw-dt-legend">' +
          '<span><i class="mlw-sw mlw-sw--c0"></i>class 0</span>' +
          '<span><i class="mlw-sw mlw-sw--c1"></i>class 1</span>' +
          '<span><i class="mlw-sw mlw-sw--err"></i>misclassified leaf point</span>' +
        '</div>' +
        '<div class="mlw-dt-tree" aria-label="resulting one-level tree">' +
          '<div class="mlw-dt-node">split: x ≤ <span class="mlw-dt-thr">—</span></div>' +
          '<div class="mlw-dt-leaves">' +
            '<div class="mlw-dt-leaf"><span class="mlw-dt-lp">left</span><br>' +
              '<b class="mlw-dt-lpred">—</b><br><span class="mlw-dt-lcnt">—</span></div>' +
            '<div class="mlw-dt-leaf"><span class="mlw-dt-lp">right</span><br>' +
              '<b class="mlw-dt-rpred">—</b><br><span class="mlw-dt-rcnt">—</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-dt-best" type="button">Jump to best split</button>' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag the pink line (or the slider) to move the split. Each side ' +
        'predicts its <b>majority class</b>; ringed points are the leaf’s mistakes. The lower ' +
        'staircase is the exact information gain for every threshold — dots are the candidate ' +
        'midpoint splits, and the gold dot is the best one.</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-dt-plot");
  var slider = root.querySelector(".mlw-dt-slider");
  var radios = root.querySelectorAll('input[name="mlw-dt-m"]');
  function set(cls, v) { root.querySelector(cls).textContent = v; }
  function classLabel(c) { return "class " + c; }

  function yIG(ig) {
    var scale = rootImp(); if (scale < 1e-9) return IGBOT;
    return IGBOT - Math.max(0, ig) / scale * (IGBOT - IGTOP);
  }
  function unit() { return metric === "gini" ? "" : "bits"; }
  function fmt(v) { return v.toFixed(3); }

  function render() {
    var s = [], i, p, best = bestSplit(), cur = stats(t), tx = px(t);

    // shade the two child regions in the points band, tinted by each side's majority class
    if (cur.nL) s.push('<rect x="' + px(X0) + '" y="' + PTOP + '" width="' + (tx - px(X0)) +
      '" height="' + (PBOT - PTOP) + '" class="mlw-dt-reg mlw-dt-reg--c' + cur.majL + '"/>');
    if (cur.nR) s.push('<rect x="' + tx + '" y="' + PTOP + '" width="' + (px(X1) - tx) +
      '" height="' + (PBOT - PTOP) + '" class="mlw-dt-reg mlw-dt-reg--c' + cur.majR + '"/>');

    // feature axis + ticks
    s.push('<line x1="' + px(X0) + '" y1="' + AXY + '" x2="' + px(X1) + '" y2="' + AXY + '" class="mlw-axis"/>');
    for (i = 0; i <= 10; i += 2) {
      s.push('<line x1="' + px(i) + '" y1="' + AXY + '" x2="' + px(i) + '" y2="' + (AXY + 5) + '" class="mlw-axis"/>');
      s.push('<text x="' + px(i) + '" y="' + (AXY + 18) + '" text-anchor="middle" class="mlw-dt-tick">' + i + '</text>');
    }
    s.push('<text x="' + px(X1) + '" y="' + (AXY + 34) + '" text-anchor="end" class="mlw-dt-tick">feature x  (weight →)</text>');

    // information-gain panel: baseline, "max" gridline, exact staircase over the continuous threshold
    s.push('<line x1="' + px(X0) + '" y1="' + IGBOT + '" x2="' + px(X1) + '" y2="' + IGBOT + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + IGTOP + '" x2="' + px(X1) + '" y2="' + IGTOP + '" class="mlw-grid"/>');
    s.push('<text x="' + px(X0) + '" y="' + (IGTOP - 6) + '" class="mlw-dt-tick">info gain (↑ better) · max = impurity(root)</text>');
    var B = [X0], hgt = [];                          // segment boundaries + per-segment gain
    for (i = 0; i < n; i++) B.push(DATA[i].x); B.push(X1);
    for (i = 0; i <= n; i++) hgt.push(igCut(i));     // cut i = first i points go left
    var d = "M " + px(B[0]) + " " + yIG(hgt[0]);
    for (i = 0; i <= n; i++) {
      d += " L " + px(B[i + 1]) + " " + yIG(hgt[i]);
      if (i < n) d += " L " + px(B[i + 1]) + " " + yIG(hgt[i + 1]);
    }
    s.push('<path d="' + d + '" class="mlw-dt-step"/>');

    // candidate midpoint splits (the thresholds actually tested), best one highlighted
    for (i = 1; i < n; i++) {
      var mx = (DATA[i - 1].x + DATA[i].x) / 2, mg = hgt[i], isBest = i === best.cut;
      s.push('<circle cx="' + px(mx) + '" cy="' + yIG(mg) + '" r="' + (isBest ? 6 : 3.5) +
        '" class="mlw-dt-cand' + (isBest ? " mlw-dt-cand--best" : "") + '"/>');
    }
    s.push('<text x="' + px(best.midx) + '" y="' + (yIG(best.ig) - 11) +
      '" text-anchor="middle" class="mlw-dt-bestlbl">best</text>');
    // current threshold's operating point on the exact gain curve
    s.push('<circle cx="' + tx + '" cy="' + yIG(cur.ig) + '" r="5" class="mlw-dt-cur"/>');

    // best-split guide line (behind) + draggable threshold line (front)
    s.push('<line x1="' + px(best.midx) + '" y1="' + THTOP + '" x2="' + px(best.midx) +
      '" y2="' + IGBOT + '" class="mlw-dt-bestline"/>');
    s.push('<line x1="' + tx + '" y1="' + THTOP + '" x2="' + tx + '" y2="' + IGBOT + '" class="mlw-dt-thresh"/>');
    s.push('<path d="M ' + tx + ' ' + (THTOP - 2) + ' l -6 -8 l 12 0 z" class="mlw-dt-thumb"/>');

    // the points, coloured by class; ring points the 1-level tree gets wrong
    for (i = 0; i < n; i++) {
      p = DATA[i];
      var pred = p.x <= t ? cur.majL : cur.majR, err = p.x <= t ? cur.nL : cur.nR;
      var wrong = err > 0 && pred !== p.c;
      s.push('<circle cx="' + px(p.x) + '" cy="' + p.jy + '" r="7" class="mlw-dt-pt mlw-dt-pt--c' + p.c +
        (wrong ? " mlw-dt-pt--err" : "") + '"/>');
    }

    svg.innerHTML = s.join("");

    // side panel numbers + implied tree
    set(".mlw-dt-mlbl", METRIC_LABEL[metric]);
    set(".mlw-dt-root", fmt(rootImp()));
    root.querySelector(".mlw-dt-unit").textContent = unit();
    set(".mlw-dt-t", t.toFixed(2));
    set(".mlw-dt-nL", "(" + cur.nL + ")");
    set(".mlw-dt-nR", "(" + cur.nR + ")");
    set(".mlw-dt-iL", cur.nL ? fmt(cur.iL) : "—");
    set(".mlw-dt-iR", cur.nR ? fmt(cur.iR) : "—");
    set(".mlw-dt-w", fmt(cur.weighted));
    set(".mlw-dt-ig", fmt(cur.ig));
    set(".mlw-dt-bt", best.midx.toFixed(2));
    set(".mlw-dt-bg", fmt(best.ig));

    set(".mlw-dt-thr", t.toFixed(2));
    root.querySelector(".mlw-dt-lpred").textContent = cur.nL ? classLabel(cur.majL) : "empty";
    root.querySelector(".mlw-dt-lpred").className = "mlw-dt-lpred mlw-dt-pred--c" + cur.majL;
    root.querySelector(".mlw-dt-rpred").textContent = cur.nR ? classLabel(cur.majR) : "empty";
    root.querySelector(".mlw-dt-rpred").className = "mlw-dt-rpred mlw-dt-pred--c" + cur.majR;
    var lc0 = cur.nL - cur.c1L, rc0 = cur.nR - cur.c1R;
    set(".mlw-dt-lcnt", cur.nL ? lc0 + " · " + cur.c1L + "  (c0·c1)" : "0 points");
    set(".mlw-dt-rcnt", cur.nR ? rc0 + " · " + cur.c1R + "  (c0·c1)" : "0 points");
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function setT(v) { t = clampT(v); slider.value = t; render(); }

  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    setT(dataX(local(e).x)); e.preventDefault();
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) setT(dataX(local(e).x)); });
  function endDrag() { dragging = false; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  slider.addEventListener("input", function () { setT(parseFloat(slider.value)); });
  var i2;
  for (i2 = 0; i2 < radios.length; i2++) radios[i2].addEventListener("change", function (e) {
    metric = e.target.value; render();
  });
  root.querySelector(".mlw-dt-best").addEventListener("click", function () { setT(bestSplit().midx); });
  root.querySelector(".mlw-reset").addEventListener("click", function () {
    metric = "entropy"; radios[0].checked = true; setT(T0);
  });

  slider.value = t;
  render();
});

/* ===== widget: derivative-tangent.js ===== */
/* derivative-tangent — drag a point along a smooth 1-D cost curve; the gold line is the
 * TANGENT at that point and its steepness IS the derivative f'(x). The sign of the slope
 * is the uphill direction, so gradient descent steps the opposite way: x ← x − α·f'(x).
 * A slope (rise/run) triangle sits on the tangent to make "slope = Δy/Δx" concrete, and
 * an optional descent path is drawn as a STATIC polyline of discrete GD steps (no
 * animation) — recomputed exactly on every change. Self-contained ES5; MLW harness. */
MLW.register("derivative-tangent", function (root) {
  var VW = 560, VH = 440, PAD = 44;
  var X0 = 0, X1 = 100, Y0 = 0, Y1 = 95;
  var uid = "dt" + Math.random().toString(36).slice(2, 8);

  // Smooth 1-D cost curve with a single in-domain minimum at x = 44 (cubic term = 0 there),
  // and a mild cubic tilt so the two sides have visibly different steepness. Analytic
  // derivative below — no numeric approximation, so the tangent slope is exact.
  function f(x)  { var t = x - 44; return 0.02 * t * t + 0.00008 * t * t * t + 8; }
  function df(x) { var t = x - 44; return 0.04 * t + 0.00024 * t * t; }
  var XMIN = 44, YMIN = f(44);                    // = 8

  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function clampX(x) { return Math.max(X0, Math.min(X1, x)); }

  var A_MAX = 60;                                 // learning rate at slider top

  // Gradient descent on f from x0: x ← x − α·f'(x). Returns the exact discrete step list.
  function descend(x0, alpha) {
    var path = [x0], x = x0, k, g, step, converged = false, diverged = false, MAX = 300;
    for (k = 0; k < MAX; k++) {
      g = df(x); step = alpha * g;
      if (Math.abs(step) < 1e-3) { converged = true; break; }
      x -= step; path.push(x);
      if (!isFinite(x) || Math.abs(x - XMIN) > 400) { diverged = true; break; }
    }
    return { path: path, x: x, steps: path.length - 1, converged: converged, diverged: diverged };
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Draggable point on a cost curve showing its tangent line and derivative"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">slope f&prime;(x) = <b class="dt-slope">—</b></div>' +
        '<div class="dt-dir">—</div>' +
        '<div class="mlw-stats">' +
          '<div><span>x</span><span class="dt-x">—</span></div>' +
          '<div><span>height f(x)</span><span class="dt-fx">—</span></div>' +
          '<div><span>one step&nbsp;&rarr; x&minus;&alpha;f&prime;</span><span class="dt-next">—</span></div>' +
        '</div>' +
        '<label class="dt-lr">Learning rate &alpha; = <b class="dt-a">—</b>' +
          '<input type="range" class="dt-slider" min="0" max="1000" value="200">' +
        '</label>' +
        '<label class="mlw-tog"><input type="checkbox" class="dt-gd"> show gradient-descent path</label>' +
        '<div class="dt-legend">' +
          '<span><i class="dt-key dt-key-curve"></i>cost f(x)</span>' +
          '<span><i class="dt-key dt-key-tan"></i>tangent (slope)</span>' +
          '<span><i class="dt-key dt-key-min"></i>minimum</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="dt-reset" type="button">Reset</button>' +
          '<button class="dt-min" type="button">Go to minimum</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag the dot along the curve. The gold <b>tangent</b> line is the ' +
        'derivative f&prime;(x): steep where the curve bends hard, <b>flat (0) at the bottom</b>. ' +
        'A positive slope means downhill is <b>left</b>, negative means <b>right</b> — so a ' +
        'descent step goes opposite the slope: x&nbsp;&larr;&nbsp;x&nbsp;&minus;&nbsp;&alpha;&middot;f&prime;(x). ' +
        'Toggle the path and slide &alpha; to watch the discrete steps roll to the minimum ' +
        '(too big an &alpha; overshoots).</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var slider = root.querySelector(".dt-slider");
  var gdToggle = root.querySelector(".dt-gd");
  var curX = 18;                                  // start on the steep left flank

  function alpha() { return (+slider.value) / 1000 * A_MAX; }
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  // sample the curve once as an SVG polyline
  function curvePoly() {
    var s = [], x;
    for (x = X0; x <= X1 + 1e-6; x += 0.5) s.push(px(x).toFixed(1) + "," + py(f(x)).toFixed(1));
    return s.join(" ");
  }
  var CURVE = curvePoly();

  function render() {
    var m = df(curX), fx = f(curX), s = [], g, i, a = alpha();

    // clip so overshooting tangents / descent paths stay inside the plot
    s.push('<defs><clipPath id="' + uid + '"><rect x="' + PAD + '" y="' + PAD +
           '" width="' + (VW - 2 * PAD) + '" height="' + (VH - 2 * PAD) + '"/></clipPath></defs>');

    // grid + axes
    for (g = 0; g <= 100; g += 20) {
      s.push('<line x1="' + px(g) + '" y1="' + py(Y0) + '" x2="' + px(g) + '" y2="' + py(Y1) + '" class="mlw-grid"/>');
    }
    for (g = 0; g <= Y1; g += 19) {
      s.push('<line x1="' + px(X0) + '" y1="' + py(g) + '" x2="' + px(X1) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X1) + '" y2="' + py(Y0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X0) + '" y2="' + py(Y1) + '" class="mlw-axis"/>');
    s.push('<text x="' + (VW - PAD) + '" y="' + (VH - PAD + 24) + '" text-anchor="end" class="dt-axlab">x  (parameter)</text>');
    s.push('<text x="' + (PAD - 8) + '" y="' + (PAD - 16) + '" text-anchor="start" class="dt-axlab">f(x)  (cost)</text>');

    // minimum: dashed drop line + star
    s.push('<line x1="' + px(XMIN) + '" y1="' + py(YMIN) + '" x2="' + px(XMIN) + '" y2="' + py(Y0) + '" class="dt-min-line"/>');
    s.push('<text x="' + px(XMIN) + '" y="' + (py(YMIN) - 10) + '" text-anchor="middle" class="dt-star">&#9733;</text>');

    // the cost curve
    s.push('<polyline points="' + CURVE + '" class="dt-curve"/>');

    // gradient-descent path (static polyline of discrete steps ON the curve)
    if (gdToggle.checked) {
      var res = descend(curX, a), pts = [], dots = [], xk;
      s.push('<g clip-path="url(#' + uid + ')">');
      for (i = 0; i < res.path.length; i++) {
        xk = res.path[i];
        pts.push(px(xk).toFixed(1) + "," + py(f(xk)).toFixed(1));
      }
      s.push('<polyline points="' + pts.join(" ") + '" class="dt-gd-path' + (res.diverged ? " dt-gd-path--bad" : "") + '"/>');
      for (i = 0; i < res.path.length; i++) {
        xk = res.path[i];
        dots.push('<circle cx="' + px(xk).toFixed(1) + '" cy="' + py(f(xk)).toFixed(1) + '" r="3.2" class="dt-gd-dot"/>');
      }
      s.push(dots.join(""));
      s.push('</g>');
    }

    // tangent line across the whole plot (clipped)
    var yL = fx + m * (X0 - curX), yR = fx + m * (X1 - curX);
    s.push('<g clip-path="url(#' + uid + ')">');
    s.push('<line x1="' + px(X0) + '" y1="' + py(yL) + '" x2="' + px(X1) + '" y2="' + py(yR) + '" class="dt-tangent"/>');
    s.push('</g>');

    // slope (rise/run) triangle sitting on the tangent — pick a run that stays in-domain
    var run = (curX <= 78) ? 16 : -16;
    var xr = curX + run, rise = m * run;
    s.push('<g clip-path="url(#' + uid + ')">');
    s.push('<line x1="' + px(curX) + '" y1="' + py(fx) + '" x2="' + px(xr) + '" y2="' + py(fx) + '" class="dt-tri-leg"/>');
    s.push('<line x1="' + px(xr) + '" y1="' + py(fx) + '" x2="' + px(xr) + '" y2="' + py(fx + rise) + '" class="dt-tri-leg"/>');
    var runMidX = px(curX + run / 2), riseMidY = py(fx + rise / 2);
    s.push('<text x="' + runMidX + '" y="' + (py(fx) + (run > 0 ? 15 : 15)) + '" text-anchor="middle" class="dt-tri-lab">&Delta;x</text>');
    s.push('<text x="' + (px(xr) + (run > 0 ? 6 : -6)) + '" y="' + riseMidY + '" text-anchor="' + (run > 0 ? "start" : "end") +
           '" class="dt-tri-lab">&Delta;y = slope&middot;&Delta;x</text>');
    s.push('</g>');

    // the draggable point
    s.push('<circle cx="' + px(curX) + '" cy="' + py(fx) + '" r="8" class="dt-point"/>');

    svg.innerHTML = s.join("");

    // readouts
    var flat = Math.abs(m) < 0.03;
    set(".dt-slope", (m >= 0 ? "+" : "") + m.toFixed(2));
    set(".dt-x", curX.toFixed(1));
    set(".dt-fx", fx.toFixed(2));
    var nx = clampX(curX - a * m);
    set(".dt-next", nx.toFixed(1));
    set(".dt-a", a.toFixed(1));
    var dir = flat ? "at the minimum — slope &asymp; 0, gradient descent stops"
            : (m > 0 ? "slope &gt; 0 &rarr; downhill is <b>&larr; left</b> (decrease x)"
                     : "slope &lt; 0 &rarr; downhill is <b>right &rarr;</b> (increase x)");
    var dEl = root.querySelector(".dt-dir");
    dEl.innerHTML = dir;
    dEl.className = "dt-dir" + (flat ? " dt-dir--min" : "");
  }

  // ---- interaction ----
  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  var dragging = false;
  function place(e) { curX = clampX(xData(local(e).x)); render(); }
  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    place(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) place(e); });
  function endDrag() { dragging = false; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  slider.addEventListener("input", render);
  gdToggle.addEventListener("change", render);
  root.querySelector(".dt-reset").addEventListener("click", function () {
    curX = 18; slider.value = 200; gdToggle.checked = false; render();
  });
  root.querySelector(".dt-min").addEventListener("click", function () { curX = XMIN; render(); });

  render();
});

/* ===== widget: feature-scaling.js ===== */
/* feature-scaling — why rescaling features speeds up gradient descent, shown as the
 * EXACT mean-squared-error cost surface J(w1, w2) for a two-feature linear model
 * y = w1·x1 + w2·x2 (no bias, so the parameter space is 2-D and drawable).
 *
 * Feature x1 lives on a large scale, x2 on a small one. Because the cost Hessian is
 * (1/m)·XᵀX, the mismatched feature scales make it wildly ill-conditioned, so the
 * iso-cost contours come out as a long, thin valley (a very elongated ellipse). Flip the
 * "Standardize features" toggle and each column is z-scored (μ=0, σ=1); the Hessian
 * becomes ≈ identity and the contours become near-circular.
 *
 * The gradient-descent path is drawn as a STATIC polyline of discrete steps (no
 * animation) — recomputed exactly on any change. On the elongated bowl the same relative
 * learning rate makes it bounce back and forth across the narrow valley and it does NOT
 * reach the minimum inside the step budget; on the round bowl it drives almost straight
 * to the bottom in a handful of steps. Everything is real least squares / real MSE
 * gradients. Self-contained ES5; registered on the MLW harness. */
MLW.register("feature-scaling", function (root) {
  var VW = 460, VH = 460, PAD = 46;          // square viewBox → isotropic (equal units/pixel) map
  var uid = "fs" + Math.random().toString(36).slice(2, 8);
  var NSTEP = 80;                             // gradient-descent step budget shown

  // ---- fixed toy data: x1 large-scale (~4..34), x2 small-scale (~0.6..4.9), low correlation ----
  var X1 = [22, 6, 16, 31, 11, 26, 19, 8, 34, 14, 28, 4];
  var X2 = [3.1, 4.4, 1.2, 2.6, 4.9, 3.5, 0.6, 2.0, 3.8, 1.5, 4.2, 2.8];
  var m = X1.length, Y = [], i;
  for (i = 0; i < m; i++) Y.push(1.7 * X1[i] + 6 * X2[i] + ((i % 3) - 1) * 2.0);

  function mean(a) { var s = 0, k; for (k = 0; k < a.length; k++) s += a[k]; return s / a.length; }
  function std(a) { var mu = mean(a), v = 0, k; for (k = 0; k < a.length; k++) v += (a[k] - mu) * (a[k] - mu); return Math.sqrt(v / a.length); }
  function range(a) { var lo = a[0], hi = a[0], k; for (k = 1; k < a.length; k++) { if (a[k] < lo) lo = a[k]; if (a[k] > hi) hi = a[k]; } return [lo, hi]; }

  // Build a "problem" from two feature columns: least-squares optimum, the constant MSE
  // Hessian and its eigen-decomposition (for the exact elliptical contours), plus a
  // display window + a default descent start. Everything downstream reads these.
  function build(f1, f2, Rwin, label) {
    var a = 0, b = 0, c = 0, d = 0, e = 0, k, r;
    for (k = 0; k < m; k++) { a += f1[k] * f1[k]; b += f1[k] * f2[k]; c += f2[k] * f2[k]; d += f1[k] * Y[k]; e += f2[k] * Y[k]; }
    var det = a * c - b * b;
    var w1s = (c * d - b * e) / det, w2s = (a * e - b * d) / det;   // closed-form least squares
    var Ha = a / m, Hb = b / m, Hc = c / m;                         // Hessian of J = (1/m)[[a,b],[b,c]]
    var mid = (Ha + Hc) / 2, disc = Math.sqrt(((Ha - Hc) / 2) * ((Ha - Hc) / 2) + Hb * Hb);
    var l1 = mid + disc, l2 = mid - disc;                           // l1 = steep (short) axis, l2 = shallow (long) axis
    var e1 = Math.abs(Hb) > 1e-12 ? [Hb, l1 - Ha] : [1, 0];
    var e1n = Math.hypot(e1[0], e1[1]); e1 = [e1[0] / e1n, e1[1] / e1n];
    var e2 = [-e1[1], e1[0]];
    var start = { w1: w1s + 0.82 * Rwin, w2: w2s + 0.52 * Rwin };   // default: a high-cost corner
    var P = { f1: f1, f2: f2, w1s: w1s, w2s: w2s, l1: l1, l2: l2, e1: e1, e2: e2,
              R: Rwin, label: label, start: start, kappa: l1 / l2 };
    P.cost = function (w1, w2) { var s = 0, j, rr; for (j = 0; j < m; j++) { rr = w1 * f1[j] + w2 * f2[j] - Y[j]; s += rr * rr; } return s / (2 * m); };
    P.grad = function (w1, w2) { var g1 = 0, g2 = 0, j, rr; for (j = 0; j < m; j++) { rr = w1 * f1[j] + w2 * f2[j] - Y[j]; g1 += rr * f1[j]; g2 += rr * f2[j]; } return [g1 / m, g2 / m]; };
    P.cmax = P.cost(start.w1, start.w2);                            // outer contour level (through the corner)
    return P;
  }

  // Raw problem, and the z-score-standardized problem (per-column μ,σ). The two live at very
  // different parameter scales, so each gets its own display window (chosen so the picture
  // frames nicely — the raw valley is deliberately shown isotropically so its elongation is real).
  var mu1 = mean(X1), sd1 = std(X1), mu2 = mean(X2), sd2 = std(X2);
  var Z1 = X1.map(function (v) { return (v - mu1) / sd1; });
  var Z2 = X2.map(function (v) { return (v - mu2) / sd2; });
  var RAW = build(X1, X2, 8.8, "raw");
  var SCALED = build(Z1, Z2, 9.5, "standardized");

  var rr1 = range(X1), rr2 = range(X2);

  // ---- state ----
  var scaled = false;
  var P = RAW;
  var start = { w1: P.start.w1, w2: P.start.w2 };
  var dragging = false;

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot fs-square" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Cost contours in weight space with a gradient-descent path"></svg>' +
      '<div class="mlw-side">' +
        '<label class="mlw-tog fs-toggle"><input type="checkbox" class="fs-scale"> ' +
          'Standardize features (z-score)</label>' +
        '<label class="fs-lr">Learning rate α = <b class="fs-frac">—</b> × max stable' +
          '<input type="range" class="fs-slider" min="5" max="115" value="85">' +
          '<span class="fs-abs">absolute α = —</span>' +
        '</label>' +
        '<div class="mlw-stats">' +
          '<div><span>Contour shape (κ = λmax/λmin)</span><span class="fs-kappa">—</span></div>' +
          '<div><span>Feature spread σ₁ , σ₂</span><span class="fs-sig">—</span></div>' +
          '<div><span>Steps used (budget ' + NSTEP + ')</span><span class="fs-steps">—</span></div>' +
          '<div><span>Reached the minimum?</span><span class="fs-conv">—</span></div>' +
        '</div>' +
        '<div class="fs-legend">' +
          '<span><i class="fs-key fs-key-contour"></i>equal-cost contour</span>' +
          '<span><i class="fs-key fs-key-path"></i>descent step</span>' +
          '<span><i class="fs-key fs-key-min"></i>least-squares min</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="fs-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">Toggle <b>Standardize</b> and watch the long, thin valley snap ' +
        'into a round bowl. Drag on the plot to move the start point; slide α (a fraction of ' +
        'each bowl’s largest stable rate). Unscaled, descent bounces across the narrow valley ' +
        'and runs out of steps before the ★; scaled, it drives almost straight in. Push α past ' +
        '1× to see it overshoot and diverge.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Exact MSE cost <code>J(w₁,w₂)=(1/2m)Σ(w₁x₁+w₂x₂−y)²</code> for a ' +
    'two-feature fit. Mismatched feature scales make the Hessian <code>(1/m)XᵀX</code> ' +
    'ill-conditioned → a stretched ellipse; z-score standardizing each feature makes it ≈ the ' +
    'identity → near-circular contours, so gradient descent takes a direct path.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".fs-square");
  var chk = root.querySelector(".fs-scale");
  var slider = root.querySelector(".fs-slider");

  // ---- coordinate maps (isotropic: window = w* ± R on both axes, square viewBox) ----
  function W1MIN() { return P.w1s - P.R; }
  function W2MIN() { return P.w2s - P.R; }
  function px(w1) { return PAD + (w1 - W1MIN()) / (2 * P.R) * (VW - 2 * PAD); }
  function py(w2) { return VH - PAD - (w2 - W2MIN()) / (2 * P.R) * (VH - 2 * PAD); }
  function w1From(sx) { return W1MIN() + (sx - PAD) / (VW - 2 * PAD) * (2 * P.R); }
  function w2From(sy) { return W2MIN() + (VH - PAD - sy) / (VH - 2 * PAD) * (2 * P.R); }
  function cl(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function local(e) { var r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH }; }
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function frac() { return (+slider.value) / 100; }
  function alpha() { return frac() * 2 / P.l1; }   // stable iff α < 2/λmax → frac < 1

  // one exact iso-cost ellipse ½·ΔᵀHΔ = c, in screen coords
  function ellipse(c) {
    var s1 = Math.sqrt(2 * c / P.l1), s2 = Math.sqrt(2 * c / P.l2), out = [], t, ct, st, dw1, dw2;
    for (t = 0; t <= 96; t++) {
      ct = Math.cos(t / 96 * 2 * Math.PI); st = Math.sin(t / 96 * 2 * Math.PI);
      dw1 = s1 * ct * P.e1[0] + s2 * st * P.e2[0];
      dw2 = s1 * ct * P.e1[1] + s2 * st * P.e2[1];
      out.push(px(P.w1s + dw1).toFixed(1) + "," + py(P.w2s + dw2).toFixed(1));
    }
    return out.join(" ");
  }

  // run real gradient descent; return the exact list of discrete step points
  function descend(w1, w2, a) {
    var path = [[w1, w2]], k, g, gn, conv = false, diverged = false;
    for (k = 0; k < NSTEP; k++) {
      g = P.grad(w1, w2); gn = Math.hypot(g[0], g[1]);
      if (a * gn < 1e-4) { conv = true; break; }
      w1 -= a * g[0]; w2 -= a * g[1];
      path.push([w1, w2]);
      if (!isFinite(w1) || !isFinite(w2) || Math.abs(w1 - P.w1s) > 1e6 || Math.abs(w2 - P.w2s) > 1e6) { diverged = true; break; }
    }
    return { path: path, w1: w1, w2: w2, steps: path.length - 1, conv: conv, diverged: diverged };
  }

  function render() {
    var a = alpha(), res = descend(start.w1, start.w2, a), s = [], k, gx, gy, p;

    s.push('<defs><clipPath id="' + uid + '"><rect x="' + PAD + '" y="' + PAD +
           '" width="' + (VW - 2 * PAD) + '" height="' + (VH - 2 * PAD) + '"/></clipPath></defs>');

    // light grid
    for (k = 0; k <= 4; k++) {
      gx = PAD + k / 4 * (VW - 2 * PAD); gy = PAD + k / 4 * (VH - 2 * PAD);
      s.push('<line x1="' + gx.toFixed(1) + '" y1="' + PAD + '" x2="' + gx.toFixed(1) + '" y2="' + (VH - PAD) + '" class="mlw-grid"/>');
      s.push('<line x1="' + PAD + '" y1="' + gy.toFixed(1) + '" x2="' + (VW - PAD) + '" y2="' + gy.toFixed(1) + '" class="mlw-grid"/>');
    }
    // exact contours (outer → inner), levels spaced so the whole valley is drawn
    s.push('<g clip-path="url(#' + uid + ')">');
    for (k = 7; k >= 1; k--) {
      s.push('<polyline points="' + ellipse(P.cmax * (k / 7) * (k / 7)) + '" class="fs-contour"/>');
    }
    s.push('</g>');

    // axes + window tick labels
    s.push('<line x1="' + PAD + '" y1="' + (VH - PAD) + '" x2="' + (VW - PAD) + '" y2="' + (VH - PAD) + '" class="mlw-axis"/>');
    s.push('<line x1="' + PAD + '" y1="' + PAD + '" x2="' + PAD + '" y2="' + (VH - PAD) + '" class="mlw-axis"/>');
    s.push('<text x="' + (VW - PAD) + '" y="' + (VH - PAD + 24) + '" text-anchor="end" class="fs-axlab">w₁  (weight on x₁)</text>');
    s.push('<text x="' + (PAD - 6) + '" y="' + (PAD - 16) + '" text-anchor="start" class="fs-axlab">w₂ (weight on x₂)</text>');
    s.push('<text x="' + (PAD - 2) + '" y="' + (VH - PAD + 24) + '" text-anchor="middle" class="fs-tick">' + W1MIN().toFixed(1) + '</text>');
    s.push('<text x="' + (VW - PAD) + '" y="' + (VH - PAD + 24) + '" text-anchor="end" class="fs-tick">' + (P.w1s + P.R).toFixed(1) + '</text>');

    // minimum marker (★ crosshair)
    var mx = px(P.w1s), my = py(P.w2s);
    s.push('<line x1="' + (mx - 8) + '" y1="' + my + '" x2="' + (mx + 8) + '" y2="' + my + '" class="fs-cross"/>');
    s.push('<line x1="' + mx + '" y1="' + (my - 8) + '" x2="' + mx + '" y2="' + (my + 8) + '" class="fs-cross"/>');
    s.push('<text x="' + mx + '" y="' + (my - 11) + '" text-anchor="middle" class="fs-star">&#9733;</text>');

    // descent path (clipped), with a dot on each discrete step
    var pts = [], dots = [];
    for (k = 0; k < res.path.length; k++) {
      p = res.path[k];
      pts.push(px(p[0]).toFixed(1) + "," + py(p[1]).toFixed(1));
      if (k > 0 && res.path.length <= NSTEP + 1)
        dots.push('<circle cx="' + px(p[0]).toFixed(1) + '" cy="' + py(p[1]).toFixed(1) + '" r="2.4" class="fs-step"/>');
    }
    s.push('<g clip-path="url(#' + uid + ')">');
    s.push('<polyline points="' + pts.join(" ") + '" class="fs-path' + (res.diverged ? " fs-path--bad" : "") + '"/>');
    s.push(dots.join(""));
    s.push('</g>');

    // start marker (draggable)
    s.push('<circle cx="' + px(start.w1).toFixed(1) + '" cy="' + py(start.w2).toFixed(1) + '" r="7" class="fs-start"/>');

    svg.innerHTML = s.join("");

    // side readouts
    set(".fs-frac", frac().toFixed(2));
    root.querySelector(".fs-abs").textContent = "absolute α = " + a.toPrecision(3);
    set(".fs-kappa", P.kappa < 1.5 ? "≈ round (κ " + P.kappa.toFixed(2) + ")" : "elongated (κ " + P.kappa.toFixed(0) + ")");
    set(".fs-sig", scaled ? "1.00 , 1.00 (equalized)" : sd1.toFixed(1) + " , " + sd2.toFixed(1) + " (mismatched)");
    set(".fs-steps", res.diverged ? res.steps + " (blew up)" : (res.conv ? res.steps : NSTEP + " (ran out)"));
    var reached = res.conv && !res.diverged;
    var convEl = root.querySelector(".fs-conv");
    convEl.textContent = res.diverged ? "diverged ✗" : (reached ? "yes ✓" : "not yet ✗");
    convEl.className = "fs-conv" + (res.diverged ? " fs-bad" : (reached ? " fs-good" : ""));
  }

  // ---- interaction: drag to place the start point ----
  function place(e) {
    var l = local(e);
    start = { w1: cl(w1From(l.x), W1MIN(), P.w1s + P.R), w2: cl(w2From(l.y), W2MIN(), P.w2s + P.R) };
    render();
  }
  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    place(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) place(e); });
  function endDrag() { dragging = false; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  slider.addEventListener("input", render);
  chk.addEventListener("change", function () {
    scaled = chk.checked;
    P = scaled ? SCALED : RAW;
    start = { w1: P.start.w1, w2: P.start.w2 };   // reset to that bowl's default corner
    render();
  });
  root.querySelector(".fs-reset").addEventListener("click", function () {
    start = { w1: P.start.w1, w2: P.start.w2 };
    slider.value = 85;
    render();
  });

  render();
});

/* ===== widget: gaussian-anomaly.js ===== */
/* gaussian-anomaly — fit an axis-aligned 2D Gaussian to a cloud of points, then flag
 * low-probability points as anomalies. The model is the product of two per-feature
 * Gaussians p(x) = g(x1;μ1,σ1²)·g(x2;μ2,σ2²) exactly as in the C3 anomaly-detection
 * lecture; a point is an anomaly iff p(x) < ε. Everything is the TRUE density: the faint
 * ellipses are the 1σ/2σ/3σ contours, the bold ellipse is the exact level set p = ε
 * (its Mahalanobis radius R = √(2·ln(p_max/ε))), and points are re-classified on every
 * change — no animation, just the recomputed correct state.
 * "Fit μ,σ² to data" sets the sliders to the maximum-likelihood estimates
 *   μ_j = mean(x_j),  σ_j² = mean((x_j − μ_j)²).
 * Self-contained; registered on the MLW harness. */
MLW.register("gaussian-anomaly", function (root) {
  var VW = 560, VH = 440, PAD = 40;
  var X0 = 0, X1 = 10, Y0 = 0, Y1 = 10;
  var SX = (VW - 2 * PAD) / (X1 - X0);   // px per data-unit, x
  var SY = (VH - 2 * PAD) / (Y1 - Y0);   // px per data-unit, y
  function px(x) { return PAD + (x - X0) * SX; }
  function py(y) { return VH - PAD - (y - Y0) * SY; }
  function xData(sx) { return X0 + (sx - PAD) / SX; }
  function yData(sy) { return Y0 + (VH - PAD - sy) / SY; }
  function clampX(x) { return Math.max(X0, Math.min(X1, x)); }
  function clampY(y) { return Math.max(Y0, Math.min(Y1, y)); }
  var TAU = 2 * Math.PI;
  var uid = "ga-clip-" + Math.floor(Math.random() * 1e9);

  // 1-D Gaussian pdf and the 2-D product model
  function g1(x, mu, sig) { return Math.exp(-(x - mu) * (x - mu) / (2 * sig * sig)) / (Math.sqrt(TAU) * sig); }
  function pdf(x, y) { return g1(x, mu1, s1) * g1(y, mu2, s2); }
  function fmt(p) { return p < 1e-3 ? p.toExponential(2) : p.toFixed(3); }

  // parameters (start slightly wider than the data so the fit-button move is visible)
  var mu1 = 5, mu2 = 5, s1 = 1.0, s2 = 1.0, eps = 0.02;

  // data cloud: a tight normal cluster + four planted outliers, plus a draggable probe
  var DATA0 = [
    [4.2,5.1],[5.5,4.6],[4.8,5.8],[6.1,5.3],[5.0,5.0],[4.5,4.4],[5.8,6.0],[3.9,4.9],
    [6.3,4.8],[5.2,6.2],[4.6,5.5],[5.9,4.2],[4.1,5.6],[5.4,5.9],[6.0,5.6],[4.9,4.3],
    [5.6,5.1],[4.3,6.0],[5.1,4.7],[6.2,5.9],
    [8.7,2.0],[1.5,8.2],[8.9,8.5],[2.2,2.4]
  ];
  var data = [], probe = { x: 7.6, y: 3.2 };
  function seed() { data = DATA0.map(function (a) { return { x: a[0], y: a[1] }; }); }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="2D Gaussian anomaly detector: scatter with density contours and an epsilon boundary"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">p(x) = g(x₁;μ₁,σ₁²)·g(x₂;μ₂,σ₂²) &nbsp; flag if p(x) &lt; ε</div>' +
        '<div class="mlw-ga-sliders">' +
          '<label>μ₁ (x mean) <span class="mlw-val mlw-ga-mu1v">5.0</span>' +
            '<input type="range" class="mlw-ga-mu1" min="0" max="10" step="0.1" value="5"></label>' +
          '<label>μ₂ (y mean) <span class="mlw-val mlw-ga-mu2v">5.0</span>' +
            '<input type="range" class="mlw-ga-mu2" min="0" max="10" step="0.1" value="5"></label>' +
          '<label>σ₁ (x spread) <span class="mlw-val mlw-ga-s1v">1.00</span>' +
            '<input type="range" class="mlw-ga-s1" min="0.4" max="3" step="0.05" value="1"></label>' +
          '<label>σ₂ (y spread) <span class="mlw-val mlw-ga-s2v">1.00</span>' +
            '<input type="range" class="mlw-ga-s2" min="0.4" max="3" step="0.05" value="1"></label>' +
          '<label>ε (density cutoff) <span class="mlw-val mlw-ga-epsv">0.020</span>' +
            '<input type="range" class="mlw-ga-eps" min="0" max="0.12" step="0.001" value="0.02"></label>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>peak density p_max</span><span class="mlw-ga-pmax">—</span></div>' +
          '<div><span>ε boundary radius R</span><span class="mlw-ga-R">—</span></div>' +
          '<div><span>anomalies flagged</span><span class="mlw-ga-cnt">0</span></div>' +
          '<div><span>probe p(x)</span><span class="mlw-ga-pp">—</span></div>' +
          '<div><span>probe verdict</span><span class="mlw-ga-pv">—</span></div>' +
        '</div>' +
        '<div class="mlw-ga-legend">' +
          '<span><i class="mlw-ga-sw mlw-ga-sw--ok"></i>normal</span>' +
          '<span><i class="mlw-ga-sw mlw-ga-sw--anom"></i>anomaly (p&lt;ε)</span>' +
          '<span><i class="mlw-ga-sw mlw-ga-sw--probe"></i>probe</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-ga-fit" type="button">Fit μ,σ² to data</button>' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag any point (or the pink probe) to move it; drop it into a ' +
        'tail and it flips to an anomaly. The sliders set the model; ε is the density floor. ' +
        'Raise σ and p_max falls — at fixed ε more points get flagged.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">The anomaly model is the product of two 1-D Gaussians. Its level sets ' +
    'are axis-aligned ellipses, so “p(x) &lt; ε” is exactly the region <b>outside</b> the bold ε ellipse. ' +
    '“Fit” sets μ,σ² to their maximum-likelihood estimates — notice the planted outliers still inflate σ.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var mu1In = root.querySelector(".mlw-ga-mu1");
  var mu2In = root.querySelector(".mlw-ga-mu2");
  var s1In = root.querySelector(".mlw-ga-s1");
  var s2In = root.querySelector(".mlw-ga-s2");
  var epsIn = root.querySelector(".mlw-ga-eps");
  var dragging = null;   // {kind:'probe'} | {kind:'data', i:idx} | null
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  // screen-space ellipse for a Mahalanobis radius R about (mu1,mu2)
  function ellipse(R, cls) {
    return '<ellipse cx="' + px(mu1).toFixed(2) + '" cy="' + py(mu2).toFixed(2) +
           '" rx="' + (R * s1 * SX).toFixed(2) + '" ry="' + (R * s2 * SY).toFixed(2) +
           '" class="' + cls + '"/>';
  }

  function render() {
    var pmax = 1 / (TAU * s1 * s2);
    var Rval = (eps > 0 && eps < pmax) ? Math.sqrt(2 * Math.log(pmax / eps)) : null;
    var s = [], g, i, p;

    // clip so contours never spill past the plot frame
    s.push('<defs><clipPath id="' + uid + '"><rect x="' + PAD + '" y="' + PAD +
           '" width="' + (VW - 2 * PAD) + '" height="' + (VH - 2 * PAD) + '"/></clipPath></defs>');

    // grid
    for (g = X0; g <= X1; g += 1)
      s.push('<line x1="' + px(g) + '" y1="' + py(Y0) + '" x2="' + px(g) + '" y2="' + py(Y1) + '" class="mlw-grid"/>');
    for (g = Y0; g <= Y1; g += 1)
      s.push('<line x1="' + px(X0) + '" y1="' + py(g) + '" x2="' + px(X1) + '" y2="' + py(g) + '" class="mlw-grid"/>');

    // clipped density layer: shaded normal region + σ contours + ε boundary
    s.push('<g clip-path="url(#' + uid + ')">');
    if (Rval !== null) s.push(ellipse(Rval, "mlw-ga-region"));   // fill = "normal" zone
    for (i = 1; i <= 3; i++) s.push(ellipse(i, "mlw-ga-contour"));
    if (Rval !== null) s.push(ellipse(Rval, "mlw-ga-bound"));
    s.push('</g>');

    // frame axes
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X1) + '" y2="' + py(Y0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X0) + '" y2="' + py(Y1) + '" class="mlw-axis"/>');
    s.push('<text x="' + (px(X1) - 2) + '" y="' + (py(Y0) + 20) + '" text-anchor="end" class="mlw-ga-tick">x₁</text>');
    s.push('<text x="' + (px(X0) + 4) + '" y="' + (py(Y1) + 4) + '" class="mlw-ga-tick">x₂</text>');

    // mean marker (cross)
    s.push('<line x1="' + (px(mu1) - 8) + '" y1="' + py(mu2) + '" x2="' + (px(mu1) + 8) + '" y2="' + py(mu2) + '" class="mlw-ga-mucross"/>');
    s.push('<line x1="' + px(mu1) + '" y1="' + (py(mu2) - 8) + '" x2="' + px(mu1) + '" y2="' + (py(mu2) + 8) + '" class="mlw-ga-mucross"/>');

    // data points, classified by the true density
    var cnt = 0;
    for (i = 0; i < data.length; i++) {
      p = pdf(data[i].x, data[i].y);
      var anom = p < eps;
      if (anom) cnt++;
      var big = (dragging && dragging.kind === "data" && dragging.i === i);
      s.push('<circle cx="' + px(data[i].x).toFixed(2) + '" cy="' + py(data[i].y).toFixed(2) +
             '" r="' + (big ? 8 : 6) + '" class="mlw-ga-pt' + (anom ? " mlw-ga-pt--anom" : "") + '"/>');
    }

    // probe point (a "new example" you test against the model)
    var pp = pdf(probe.x, probe.y), pAnom = pp < eps;
    var pbig = (dragging && dragging.kind === "probe");
    s.push('<circle cx="' + px(probe.x).toFixed(2) + '" cy="' + py(probe.y).toFixed(2) +
           '" r="' + (pbig ? 10 : 8) + '" class="mlw-ga-probe' + (pAnom ? " mlw-ga-probe--anom" : "") + '"/>');

    svg.innerHTML = s.join("");

    set(".mlw-ga-pmax", fmt(pmax));
    set(".mlw-ga-R", Rval === null ? (eps <= 0 ? "∞ (ε=0, nothing flagged)" : "— (ε ≥ p_max)") : Rval.toFixed(2) + " σ");
    set(".mlw-ga-cnt", cnt + " / " + data.length);
    set(".mlw-ga-pp", fmt(pp));
    set(".mlw-ga-pv", pAnom ? "ANOMALY" : "normal");
    root.querySelector(".mlw-ga-pv").className = "mlw-ga-pv" + (pAnom ? " mlw-ga-pv--anom" : "");
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function hit(sx, sy) {
    if (Math.hypot(px(probe.x) - sx, py(probe.y) - sy) < 16) return { kind: "probe" };
    for (var i = data.length - 1; i >= 0; i--)
      if (Math.hypot(px(data[i].x) - sx, py(data[i].y) - sy) < 13) return { kind: "data", i: i };
    return null;
  }

  svg.addEventListener("pointerdown", function (e) {
    var l = local(e), h = hit(l.x, l.y);
    if (!h) {                                   // empty click -> jump the probe there and grab it
      if (l.x < PAD || l.y > VH - PAD || l.x > VW - PAD || l.y < PAD) return;
      probe = { x: clampX(xData(l.x)), y: clampY(yData(l.y)) };
      h = { kind: "probe" };
    }
    dragging = h;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var l = local(e), x = clampX(xData(l.x)), y = clampY(yData(l.y));
    if (dragging.kind === "probe") probe = { x: x, y: y };
    else data[dragging.i] = { x: x, y: y };
    render();
  });
  function endDrag() { if (dragging) { dragging = null; render(); } }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  function syncSliders() {
    mu1In.value = mu1; mu2In.value = mu2; s1In.value = s1; s2In.value = s2; epsIn.value = eps;
    set(".mlw-ga-mu1v", mu1.toFixed(1));
    set(".mlw-ga-mu2v", mu2.toFixed(1));
    set(".mlw-ga-s1v", s1.toFixed(2));
    set(".mlw-ga-s2v", s2.toFixed(2));
    set(".mlw-ga-epsv", eps.toFixed(3));
  }
  mu1In.addEventListener("input", function () { mu1 = parseFloat(mu1In.value); set(".mlw-ga-mu1v", mu1.toFixed(1)); render(); });
  mu2In.addEventListener("input", function () { mu2 = parseFloat(mu2In.value); set(".mlw-ga-mu2v", mu2.toFixed(1)); render(); });
  s1In.addEventListener("input", function () { s1 = parseFloat(s1In.value); set(".mlw-ga-s1v", s1.toFixed(2)); render(); });
  s2In.addEventListener("input", function () { s2 = parseFloat(s2In.value); set(".mlw-ga-s2v", s2.toFixed(2)); render(); });
  epsIn.addEventListener("input", function () { eps = parseFloat(epsIn.value); set(".mlw-ga-epsv", eps.toFixed(3)); render(); });

  // maximum-likelihood fit over the data cloud (not the probe)
  root.querySelector(".mlw-ga-fit").addEventListener("click", function () {
    var n = data.length, mx = 0, my = 0, i;
    if (!n) return;
    for (i = 0; i < n; i++) { mx += data[i].x; my += data[i].y; }
    mx /= n; my /= n;
    var vx = 0, vy = 0;
    for (i = 0; i < n; i++) { vx += (data[i].x - mx) * (data[i].x - mx); vy += (data[i].y - my) * (data[i].y - my); }
    vx /= n; vy /= n;
    mu1 = Math.max(0, Math.min(10, mx));
    mu2 = Math.max(0, Math.min(10, my));
    s1 = Math.max(0.4, Math.min(3, Math.sqrt(vx)));
    s2 = Math.max(0.4, Math.min(3, Math.sqrt(vy)));
    syncSliders(); render();
  });

  root.querySelector(".mlw-reset").addEventListener("click", function () {
    mu1 = 5; mu2 = 5; s1 = 1.0; s2 = 1.0; eps = 0.02;
    probe = { x: 7.6, y: 3.2 };
    seed(); syncSliders(); render();
  });

  seed(); syncSliders(); render();
});

/* ===== widget: gradient-descent.js ===== */
/* gradient-descent — watch gradient descent walk down the MSE cost contour of a
 * simple linear regression, in (w, b) parameter space. Click (or drag) to place a
 * start point, set the learning-rate slider, and the FULL descent path is redrawn as a
 * static polyline of discrete steps (no animation) — recomputed exactly on any change.
 * Push the rate past the critical value and the path visibly zig-zags OUTWARD and
 * diverges. Self-contained ES5; registered on the MLW harness. */
MLW.register("gradient-descent", function (root) {
  var VW = 560, VH = 440, PAD = 44;
  var uid = "gd" + Math.random().toString(36).slice(2, 8);

  // Fixed toy dataset for y ≈ w·x + b. Chosen so the cost bowl is tilted/elongated
  // (features not centred) — that is what makes the zig-zag + divergence visible.
  var X = [0, 1, 2, 3, 4];
  var Y = [1.5, 2.9, 3.6, 5.4, 6.0];
  var n = X.length;

  function cost(w, b) { var s = 0, i, r; for (i = 0; i < n; i++) { r = w * X[i] + b - Y[i]; s += r * r; } return s / (2 * n); }
  function grad(w, b) {                              // ∂J/∂w , ∂J/∂b  (exact MSE gradient)
    var gw = 0, gb = 0, i, r;
    for (i = 0; i < n; i++) { r = w * X[i] + b - Y[i]; gw += r * X[i]; gb += r; }
    return [gw / n, gb / n];
  }

  // Closed-form optimum (centre of the contours) via ordinary least squares.
  var sx = 0, sy = 0, sxx = 0, sxy = 0, i;
  for (i = 0; i < n; i++) { sx += X[i]; sy += Y[i]; sxx += X[i] * X[i]; sxy += X[i] * Y[i]; }
  var wstar = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  var bstar = (sy - wstar * sx) / n;

  // Hessian of J (constant, since J is quadratic):  H = (1/n)[[Σx², Σx],[Σx, n]].
  var Ha = sxx / n, Hc = sx / n, Hd = 1;             // [[Ha, Hc],[Hc, Hd]]
  var det = Ha * Hd - Hc * Hc;
  // Eigen-decomposition of the 2×2 symmetric Hessian (for drawing the elliptical contours).
  var mid = (Ha + Hd) / 2, disc = Math.sqrt(((Ha - Hd) / 2) * ((Ha - Hd) / 2) + Hc * Hc);
  var lam1 = mid + disc, lam2 = mid - disc;          // lam1 = steep (short) axis, lam2 = shallow (long) axis
  var e1 = Math.abs(Hc) > 1e-9 ? [Hc, lam1 - Ha] : [1, 0];
  var e1n = Math.hypot(e1[0], e1[1]); e1 = [e1[0] / e1n, e1[1] / e1n];
  var e2 = [-e1[1], e1[0]];
  // Gradient descent on a quadratic is stable iff α < 2/λ_max. That's the critical rate.
  var aCrit = 2 / lam1;
  var aMax = 1.35 * aCrit;                           // slider top — comfortably into divergence

  // Frame the view on the outermost contour we draw, so the ellipses fill the plot.
  var cMax = 8;
  var Rw = 1.12 * Math.sqrt(2 * cMax * (Hd / det));  // half-widths from the c=cMax ellipse bbox
  var Rb = 1.12 * Math.sqrt(2 * cMax * (Ha / det));
  var Wmin = wstar - Rw, Wmax = wstar + Rw, Bmin = bstar - Rb, Bmax = bstar + Rb;

  function px(w) { return PAD + (w - Wmin) / (Wmax - Wmin) * (VW - 2 * PAD); }
  function py(b) { return VH - PAD - (b - Bmin) / (Bmax - Bmin) * (VH - 2 * PAD); }
  function wData(sxp) { return Wmin + (sxp - PAD) / (VW - 2 * PAD) * (Wmax - Wmin); }
  function bData(syp) { return Bmin + (VH - PAD - syp) / (VH - 2 * PAD) * (Bmax - Bmin); }

  // Run gradient descent from (w0,b0). Returns the exact list of discrete step points.
  function descend(w0, b0, alpha) {
    var path = [[w0, b0]], w = w0, b = b0, k, g, gn, converged = false, diverged = false, MAX = 400;
    for (k = 0; k < MAX; k++) {
      g = grad(w, b); gn = Math.hypot(g[0], g[1]);
      if (alpha * gn < 1e-4) { converged = true; break; }     // step shrank to ~nothing → at the minimum
      w -= alpha * g[0]; b -= alpha * g[1];
      path.push([w, b]);
      if (!isFinite(w) || !isFinite(b) || Math.abs(w - wstar) > 1e4 || Math.abs(b - bstar) > 1e4) { diverged = true; break; }
    }
    var fg = grad(w, b), fgn = Math.hypot(fg[0], fg[1]);
    return { path: path, w: w, b: b, steps: path.length - 1, converged: converged, diverged: diverged, gnorm: fgn };
  }

  // ---- one closed elliptical contour  ½·Δθᵀ H Δθ = c ----
  function ellipse(c) {
    var s1 = Math.sqrt(2 * c / lam1), s2 = Math.sqrt(2 * c / lam2), out = [], t, ct, st, dw, db;
    for (t = 0; t <= 64; t++) {
      ct = Math.cos(t / 64 * 2 * Math.PI); st = Math.sin(t / 64 * 2 * Math.PI);
      dw = s1 * ct * e1[0] + s2 * st * e2[0];
      db = s1 * ct * e1[1] + s2 * st * e2[1];
      out.push(px(wstar + dw).toFixed(1) + "," + py(bstar + db).toFixed(1));
    }
    return out.join(" ");
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Gradient descent path on a cost contour in weight-bias space"></svg>' +
      '<div class="mlw-side">' +
        '<label class="gd-lr">Learning rate α = <b class="gd-a">—</b>' +
          '<input type="range" class="gd-slider" min="0" max="1000" value="330">' +
          '<span class="gd-crit">diverges above α ≈ ' + aCrit.toFixed(3) + '</span>' +
        '</label>' +
        '<div class="mlw-stats">' +
          '<div><span>Start (w, b)</span><span class="gd-start">—</span></div>' +
          '<div><span>Steps taken</span><span class="gd-steps">—</span></div>' +
          '<div><span>Final cost J</span><span class="gd-cost">—</span></div>' +
          '<div><span>Status</span><span class="gd-status">—</span></div>' +
        '</div>' +
        '<div class="gd-legend">' +
          '<span><i class="gd-key gd-key-contour"></i>cost contour</span>' +
          '<span><i class="gd-key gd-key-path"></i>descent step</span>' +
          '<span><i class="gd-key gd-key-min"></i>minimum</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="gd-reset" type="button">Reset start</button>' +
          '<button class="gd-diverge" type="button">Show divergence</button>' +
        '</div>' +
        '<p class="mlw-tip">Click or drag on the plot to place the start point. Slide α: a ' +
        'small rate inches down in many tiny steps, a good rate homes in fast, and above the ' +
        'critical rate the steps overshoot and spiral <b>outward</b> — divergence. The ★ is the ' +
        'least-squares minimum; contours are levels of the mean-squared-error cost J(w,&nbsp;b).</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var slider = root.querySelector(".gd-slider");
  var start = { w: wstar - 0.78 * Rw, b: bstar + 0.80 * Rb };   // default: upper-left corner
  var dragging = false;

  function alpha() { return (+slider.value) / 1000 * aMax; }
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var a = alpha(), res = descend(start.w, start.b, a), s = [], k, p, gx, gy;

    // clip so a diverging path can't spill outside the plot area
    s.push('<defs><clipPath id="' + uid + '"><rect x="' + PAD + '" y="' + PAD +
           '" width="' + (VW - 2 * PAD) + '" height="' + (VH - 2 * PAD) + '"/></clipPath></defs>');

    // light grid
    for (k = 0; k <= 4; k++) {
      gx = PAD + k / 4 * (VW - 2 * PAD); gy = PAD + k / 4 * (VH - 2 * PAD);
      s.push('<line x1="' + gx.toFixed(1) + '" y1="' + PAD + '" x2="' + gx.toFixed(1) + '" y2="' + (VH - PAD) + '" class="mlw-grid"/>');
      s.push('<line x1="' + PAD + '" y1="' + gy.toFixed(1) + '" x2="' + (VW - PAD) + '" y2="' + gy.toFixed(1) + '" class="mlw-grid"/>');
    }
    // axes + labels
    s.push('<line x1="' + PAD + '" y1="' + (VH - PAD) + '" x2="' + (VW - PAD) + '" y2="' + (VH - PAD) + '" class="mlw-axis"/>');
    s.push('<line x1="' + PAD + '" y1="' + PAD + '" x2="' + PAD + '" y2="' + (VH - PAD) + '" class="mlw-axis"/>');
    s.push('<text x="' + (VW - PAD) + '" y="' + (VH - PAD + 22) + '" text-anchor="end" class="gd-axlab">w  (slope)</text>');
    s.push('<text x="' + (PAD - 8) + '" y="' + (PAD - 14) + '" text-anchor="start" class="gd-axlab">b (intercept)</text>');
    s.push('<text x="' + (PAD - 6) + '" y="' + (VH - PAD + 22) + '" text-anchor="middle" class="gd-tick">' + Wmin.toFixed(1) + '</text>');
    s.push('<text x="' + (VW - PAD) + '" y="' + (VH - PAD + 22) + '" text-anchor="middle" class="gd-tick" dx="-34">' + Wmax.toFixed(1) + '</text>');

    // contours (outer → inner)
    for (k = 6; k >= 1; k--) {
      s.push('<polyline points="' + ellipse(cMax * (k / 6) * (k / 6)) + '" class="gd-contour"/>');
    }

    // minimum marker (★ crosshair)
    var mx = px(wstar), my = py(bstar);
    s.push('<line x1="' + (mx - 8) + '" y1="' + my + '" x2="' + (mx + 8) + '" y2="' + my + '" class="gd-cross"/>');
    s.push('<line x1="' + mx + '" y1="' + (my - 8) + '" x2="' + mx + '" y2="' + (my + 8) + '" class="gd-cross"/>');
    s.push('<text x="' + mx + '" y="' + (my - 11) + '" text-anchor="middle" class="gd-star">&#9733;</text>');

    // descent path (clipped). Truncate once well outside the frame so coords stay sane.
    var pts = [], dots = [], stop = false;
    for (k = 0; k < res.path.length; k++) {
      p = res.path[k];
      pts.push(px(p[0]).toFixed(1) + "," + py(p[1]).toFixed(1));
      if (k > 0 && k < res.path.length - 1 && res.path.length <= 120)
        dots.push('<circle cx="' + px(p[0]).toFixed(1) + '" cy="' + py(p[1]).toFixed(1) + '" r="2.6" class="gd-step"/>');
      if (Math.abs(p[0] - wstar) > 3.5 * Rw || Math.abs(p[1] - bstar) > 3.5 * Rb) { stop = true; break; }
    }
    var pathCls = res.diverged ? "gd-path gd-path--bad" : "gd-path";
    s.push('<g clip-path="url(#' + uid + ')">');
    s.push('<polyline points="' + pts.join(" ") + '" class="' + pathCls + '"/>');
    s.push(dots.join(""));
    s.push('</g>');

    // start marker (draggable)
    s.push('<circle cx="' + px(start.w).toFixed(1) + '" cy="' + py(start.b).toFixed(1) + '" r="7" class="gd-start-dot"/>');

    svg.innerHTML = s.join("");

    set(".gd-a", a.toFixed(3));
    set(".gd-start", "(" + start.w.toFixed(2) + ", " + start.b.toFixed(2) + ")");
    set(".gd-steps", res.diverged ? res.steps + " (blew up)" : res.steps);
    set(".gd-cost", res.diverged ? "→ ∞" : cost(res.w, res.b).toFixed(4));
    var st = res.diverged ? "diverging ✗"
           : (res.converged && res.gnorm < 5e-3) ? "converged ✓"
           : res.converged ? "α≈0 · no real progress"
           : "still descending (slow)";
    set(".gd-status", st);
    root.querySelector(".gd-status").className = "gd-status" + (res.diverged ? " gd-bad" : (res.converged && res.gnorm < 5e-3) ? " gd-good" : "");
  }

  // ---- interaction ----
  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function place(e) {
    var l = local(e);
    var w = Math.max(Wmin, Math.min(Wmax, wData(l.x)));
    var b = Math.max(Bmin, Math.min(Bmax, bData(l.y)));
    start = { w: w, b: b };
    render();
  }
  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    place(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) place(e); });
  function endDrag() { dragging = false; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  slider.addEventListener("input", render);
  root.querySelector(".gd-reset").addEventListener("click", function () {
    start = { w: wstar - 0.78 * Rw, b: bstar + 0.80 * Rb };
    slider.value = 330; render();
  });
  root.querySelector(".gd-diverge").addEventListener("click", function () {
    // jump the rate just above critical and start out at a corner so the blow-up is obvious
    start = { w: wstar - 0.78 * Rw, b: bstar + 0.80 * Rb };
    slider.value = Math.round(1.08 * aCrit / aMax * 1000);
    render();
  });

  render();
});

/* ===== widget: kmeans.js ===== */
/* kmeans — K-means on a fixed 2D scatter, advanced as DISCRETE steps (no animation).
 * "New init" random-restarts the K centroids onto K random training examples (Ng's
 * standard init). "Assign" colors each point by its nearest centroid; "Move" snaps each
 * centroid to the mean of its assigned points. The distortion J = (1/m)·Σ‖xᵢ − μ_{c(i)}‖²
 * is recomputed after EVERY step and plotted — it decreases monotonically until the
 * assignment stops changing (convergence). Centroids are also draggable. The recommended
 * next step is highlighted in the accent color. Self-contained; registered on the MLW harness. */
MLW.register("kmeans", function (root) {
  var VW = 560, VH = 440, PAD = 34, X0 = 0, X1 = 100, Y0 = 0, Y1 = 100;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function yData(sy) { return Y0 + (VH - PAD - sy) / (VH - 2 * PAD) * (Y1 - Y0); }
  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  // fixed scatter: three loose blobs so clustering is meaningful (default K = 3)
  var DATA = [
    [18,28],[26,36],[22,40],[30,30],[15,34],[28,25],[20,45],[33,38],[24,22],[19,39],
    [68,22],[76,30],[70,18],[80,26],[65,32],[74,24],[78,20],[66,15],[82,34],[71,29],
    [46,70],[54,78],[50,82],[44,76],[58,72],[52,66],[48,80],[56,68],[42,72],[53,84]
  ];
  var pts = DATA.map(function (a) { return { x: a[0], y: a[1] }; });
  var M = pts.length, KMAX = 5;

  var K = 3;            // number of clusters
  var cent = [];        // centroid positions [{x,y}]
  var assign = [];      // assign[i] = cluster index of point i, or -1 if unassigned
  var phase = "assign"; // which step comes next: "assign" | "move"
  var converged = false;
  var steps = 0;        // discrete steps taken since last init
  var Jhist = [];       // distortion after each step
  var dragging = -1;    // index of centroid being dragged, or -1

  function dist2(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return dx * dx + dy * dy; }

  // pick K distinct training examples as the initial centroids (Ng's standard init)
  function initCentroids() {
    var idx = [], i, r;
    for (i = 0; i < M; i++) idx.push(i);
    for (i = idx.length - 1; i > 0; i--) { r = Math.floor(Math.random() * (i + 1)); var t = idx[i]; idx[i] = idx[r]; idx[r] = t; }
    cent = [];
    for (i = 0; i < K; i++) cent.push({ x: pts[idx[i]].x, y: pts[idx[i]].y });
    assign = []; for (i = 0; i < M; i++) assign.push(-1);
    phase = "assign"; converged = false; steps = 0; Jhist = [];
  }

  // distortion J = mean squared distance from each ASSIGNED point to its centroid
  function distortion() {
    var s = 0, n = 0, i;
    for (i = 0; i < M; i++) if (assign[i] >= 0) { s += dist2(pts[i], cent[assign[i]]); n++; }
    return n === 0 ? null : s / M;
  }

  // step 1: c(i) := argmin_k ‖xᵢ − μ_k‖². returns true if any assignment changed.
  function stepAssign() {
    var changed = false, i, k, best, bd, d;
    for (i = 0; i < M; i++) {
      best = 0; bd = dist2(pts[i], cent[0]);
      for (k = 1; k < K; k++) { d = dist2(pts[i], cent[k]); if (d < bd) { bd = d; best = k; } }
      if (assign[i] !== best) { assign[i] = best; changed = true; }
    }
    return changed;
  }

  // step 2: μ_k := mean of points assigned to k. Empty cluster stays put (a valid fix).
  function stepMove() {
    var sx = [], sy = [], cnt = [], k, i;
    for (k = 0; k < K; k++) { sx.push(0); sy.push(0); cnt.push(0); }
    for (i = 0; i < M; i++) { k = assign[i]; if (k >= 0) { sx[k] += pts[i].x; sy[k] += pts[i].y; cnt[k]++; } }
    for (k = 0; k < K; k++) if (cnt[k] > 0) { cent[k] = { x: sx[k] / cnt[k], y: sy[k] / cnt[k] }; }
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive K-means clustering on a fixed 2D scatter"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-km-next">Next: <b class="mlw-km-nextlabel">Assign points</b></div>' +
        '<div class="mlw-km-krow"><span>clusters K</span>' +
          '<button class="mlw-km-kdown" type="button" aria-label="fewer clusters">−</button>' +
          '<span class="mlw-km-kval">3</span>' +
          '<button class="mlw-km-kup" type="button" aria-label="more clusters">+</button></div>' +
        '<div class="mlw-stats">' +
          '<div><span>step</span><span class="mlw-km-step">0</span></div>' +
          '<div><span>distortion J</span><span class="mlw-km-j">—</span></div>' +
          '<div><span>status</span><span class="mlw-km-status">fresh init</span></div>' +
        '</div>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-km-links" checked> show distances to centroid</label>' +
        '<div class="mlw-km-jwrap">' +
          '<div class="mlw-km-jhead"><span>distortion per step</span><b class="mlw-km-jnow">—</b></div>' +
          '<svg class="mlw-km-jchart" viewBox="0 0 220 84" role="img" aria-label="Distortion decreasing over steps"></svg>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-km-assign" type="button">Assign</button>' +
          '<button class="mlw-km-move" type="button">Move</button>' +
          '<button class="mlw-km-run" type="button">Run to convergence</button>' +
          '<button class="mlw-km-init" type="button">New init</button>' +
        '</div>' +
        '<p class="mlw-tip">Alternate <b>Assign</b> then <b>Move</b> — watch J fall each step until no point ' +
        'changes color (converged). Drag a centroid cross to reposition it, or hit <b>New init</b> to random-restart. ' +
        'Different inits can land in different local optima — that’s why real K-means restarts many times and keeps the lowest J.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">K-means secretly minimizes the <b>distortion</b> ' +
    'J = (1/m)·Σ‖xᵢ − μ<sub>c(i)</sub>‖² (mean squared distance of each point to its ' +
    'centroid). The assign step lowers J by re-coloring points to their nearest centroid; the move step lowers J by ' +
    'snapping each centroid to its cluster mean. J can only go down, so K-means always converges.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var jsvg = root.querySelector(".mlw-km-jchart");
  var linksIn = root.querySelector(".mlw-km-links");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function cross(cx, cy, k, drag) {
    var r = 9, h = 11, c = "mlw-km-c" + k;
    return '<g class="' + c + '">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + h + '" class="mlw-km-halo"/>' +
      '<line x1="' + (cx - r) + '" y1="' + (cy - r) + '" x2="' + (cx + r) + '" y2="' + (cy + r) +
        '" class="mlw-km-cross' + (drag ? " mlw-km-cross--drag" : "") + '"/>' +
      '<line x1="' + (cx - r) + '" y1="' + (cy + r) + '" x2="' + (cx + r) + '" y2="' + (cy - r) +
        '" class="mlw-km-cross' + (drag ? " mlw-km-cross--drag" : "") + '"/>' +
      '<text x="' + (cx + h + 2) + '" y="' + (cy - h) + '" class="mlw-km-clabel">μ' + (k + 1) + '</text>' +
    '</g>';
  }

  function render() {
    var s = [], g, i, k;
    for (g = 0; g <= 100; g += 20) {
      s.push('<line x1="' + px(g) + '" y1="' + py(0) + '" x2="' + px(g) + '" y2="' + py(100) + '" class="mlw-grid"/>');
      s.push('<line x1="' + px(0) + '" y1="' + py(g) + '" x2="' + px(100) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(100) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(0) + '" y2="' + py(100) + '" class="mlw-axis"/>');

    // assignment segments (these are exactly what distortion sums up)
    if (linksIn.checked) {
      for (i = 0; i < M; i++) { k = assign[i]; if (k >= 0)
        s.push('<line class="mlw-km-c' + k + ' mlw-km-link" x1="' + px(pts[i].x) + '" y1="' + py(pts[i].y) +
               '" x2="' + px(cent[k].x) + '" y2="' + py(cent[k].y) + '"/>');
      }
    }
    // points, colored by current assignment (neutral when unassigned)
    for (i = 0; i < M; i++) { k = assign[i];
      var cc = k >= 0 ? "mlw-km-c" + k : "mlw-km-pt--un";
      s.push('<circle class="mlw-km-pt ' + cc + '" cx="' + px(pts[i].x) + '" cy="' + py(pts[i].y) + '" r="5.5"/>');
    }
    // centroids on top
    for (k = 0; k < K; k++) s.push(cross(px(cent[k].x), py(cent[k].y), k, dragging === k));
    svg.innerHTML = s.join("");

    var J = distortion();
    set(".mlw-km-step", steps);
    set(".mlw-km-kval", K);
    set(".mlw-km-j", J === null ? "—" : J.toFixed(1));
    set(".mlw-km-jnow", J === null ? "—" : J.toFixed(1));
    set(".mlw-km-status", converged ? "converged ✓" : (steps === 0 ? "fresh init" : "running"));

    // next-step guidance + button highlight
    var nextLabel = converged ? "Converged — try New init" : (phase === "assign" ? "Assign points" : "Move centroids");
    set(".mlw-km-nextlabel", nextLabel);
    var aBtn = root.querySelector(".mlw-km-assign"), mBtn = root.querySelector(".mlw-km-move");
    aBtn.className = "mlw-km-assign" + (!converged && phase === "assign" ? " mlw-km-hot" : "");
    mBtn.className = "mlw-km-move" + (!converged && phase === "move" ? " mlw-km-hot" : "");

    renderJ(J);
  }

  // static distortion history chart: J after each discrete step, scaled 0..J[0]
  function renderJ(Jnow) {
    var W = 220, H = 84, pad = 18, s = [], i;
    if (Jhist.length === 0) {
      jsvg.innerHTML = '<text x="' + (W / 2) + '" y="' + (H / 2 + 4) +
        '" text-anchor="middle" class="mlw-km-jempty">hit Assign to compute J</text>';
      return;
    }
    var jmax = Jhist[0]; for (i = 1; i < Jhist.length; i++) if (Jhist[i] > jmax) jmax = Jhist[i];
    if (jmax <= 0) jmax = 1;
    var n = Jhist.length;
    function jx(i) { return pad + (n === 1 ? (W - 2 * pad) / 2 : i / (n - 1) * (W - 2 * pad)); }
    function jy(v) { return (H - pad) - (v / jmax) * (H - 2 * pad); }
    s.push('<line x1="' + pad + '" y1="' + (H - pad) + '" x2="' + (W - pad) + '" y2="' + (H - pad) + '" class="mlw-km-jbase"/>');
    s.push('<text x="' + (pad - 3) + '" y="' + (jy(jmax) + 4) + '" text-anchor="end" class="mlw-km-jtick">' + jmax.toFixed(0) + '</text>');
    s.push('<text x="' + (pad - 3) + '" y="' + (H - pad + 3) + '" text-anchor="end" class="mlw-km-jtick">0</text>');
    if (n > 1) {
      var poly = []; for (i = 0; i < n; i++) poly.push(jx(i).toFixed(1) + "," + jy(Jhist[i]).toFixed(1));
      s.push('<polyline points="' + poly.join(" ") + '" class="mlw-km-jline"/>');
    }
    for (i = 0; i < n; i++) s.push('<circle cx="' + jx(i).toFixed(1) + '" cy="' + jy(Jhist[i]).toFixed(1) + '" r="2.6" class="mlw-km-jdot"/>');
    jsvg.innerHTML = s.join("");
  }

  function doAssign() {
    if (converged) return;
    var changed = stepAssign();
    steps++;
    Jhist.push(distortion());
    if (!changed) converged = true; else phase = "move";
    render();
  }
  function doMove() {
    if (converged) return;
    stepMove();
    steps++;
    Jhist.push(distortion());
    phase = "assign";
    render();
  }
  function runAll() {
    // real K-means to convergence, recording every discrete step; renders final true state only
    var guard = 0;
    while (!converged && guard < 200) {
      if (phase === "assign") doAssignSilent(); else doMoveSilent();
      guard++;
    }
    render();
  }
  // silent variants (no per-step render) used by Run-to-convergence
  function doAssignSilent() { if (converged) return; var ch = stepAssign(); steps++; Jhist.push(distortion()); if (!ch) converged = true; else phase = "move"; }
  function doMoveSilent() { if (converged) return; stepMove(); steps++; Jhist.push(distortion()); phase = "assign"; }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function hitCentroid(sx, sy) {
    for (var k = 0; k < K; k++) if (Math.hypot(px(cent[k].x) - sx, py(cent[k].y) - sy) < 16) return k;
    return -1;
  }

  // drag a centroid to reposition it — invalidates the last assignment, so Assign becomes next
  svg.addEventListener("pointerdown", function (e) {
    var l = local(e), k = hitCentroid(l.x, l.y);
    if (k < 0) return;
    dragging = k;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (dragging < 0) return;
    var l = local(e);
    cent[dragging] = { x: clamp(xData(l.x)), y: clamp(yData(l.y)) };
    render();
  });
  function endDrag() {
    if (dragging < 0) return;
    dragging = -1; phase = "assign"; converged = false;
    render();
  }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  linksIn.addEventListener("change", render);
  root.querySelector(".mlw-km-assign").addEventListener("click", doAssign);
  root.querySelector(".mlw-km-move").addEventListener("click", doMove);
  root.querySelector(".mlw-km-run").addEventListener("click", runAll);
  root.querySelector(".mlw-km-init").addEventListener("click", function () { initCentroids(); render(); });
  root.querySelector(".mlw-km-kup").addEventListener("click", function () {
    if (K < KMAX) { K++; initCentroids(); render(); }
  });
  root.querySelector(".mlw-km-kdown").addEventListener("click", function () {
    if (K > 2) { K--; initCentroids(); render(); }
  });

  initCentroids();
  render();
});

/* ===== widget: matrix-transform.js ===== */
/* matrix-transform — a 2x2 matrix M = [[a,b],[c,d]] as a LINEAR TRANSFORMATION of the plane.
 * The four sliders set M. We draw the ORIGINAL integer grid + basis vectors faint, then the
 * EXACT image of that grid under M (still straight lines, since M is linear), the transformed
 * basis vectors î'=(a,c) and ĵ'=(b,d) — which are literally the COLUMNS of M — and the image
 * M·v of a draggable sample vector v. The shaded parallelogram is the image of the unit square;
 * its signed area is det(M)=ad−bc, so |det| is the area-scale factor and a negative det flips
 * orientation (a reflection). Nothing animates: every control recomputes the true state and
 * re-renders it. Self-contained ES5; registered on the MLW harness. */
MLW.register("matrix-transform", function (root) {
  var VW = 480, VH = 480, PAD = 26, R = 4;                 // math window: [-R,R] x [-R,R], square
  var CX = VW / 2, CY = VH / 2, SCALE = (VW / 2 - PAD) / R;
  var UID = "mt" + Math.round(Math.random() * 1e6);

  function px(x) { return CX + x * SCALE; }
  function py(y) { return CY - y * SCALE; }
  function mx(vx) { return (vx - CX) / SCALE; }            // viewBox -> math
  function my(vy) { return (CY - vy) / SCALE; }
  function cl(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function local(svg, e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }

  // ---- state: the matrix + a sample vector (in original coords) ----
  var a = 1, b = 0, c = 0, d = 1;            // M = [[a,b],[c,d]]
  var vx = 1.5, vy = 1;                       // draggable sample vector v
  function apply(x, y) { return { x: a * x + b * y, y: c * x + d * y }; }
  function det() { return a * d - b * c; }

  var PRESETS = [
    { name: "Identity", m: [1, 0, 0, 1] },
    { name: "Rotate 45°", m: [Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)] },
    { name: "Scale ×1.6", m: [1.6, 0, 0, 1.6] },
    { name: "Shear x", m: [1, 1, 0, 1] },
    { name: "Reflect", m: [1, 0, 0, -1] }
  ];

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot mt-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="A 2D grid and basis vectors transformed by a 2 by 2 matrix">' +
        '<clipPath id="' + UID + '"><rect x="1" y="1" width="' + (VW - 2) + '" height="' + (VH - 2) + '"/></clipPath>' +
      '</svg>' +
      '<div class="mlw-side">' +
        '<div class="mt-eqrow"><span class="mt-eqlab">M =</span>' +
          '<span class="mt-mat">' +
            '<span class="mt-a">1</span><span class="mt-b">0</span>' +
            '<span class="mt-c">0</span><span class="mt-d">1</span>' +
          '</span></div>' +
        '<div class="mlw-stats">' +
          '<div><span>det(M) = ad − bc</span><span class="mt-det">—</span></div>' +
          '<div><span>Area scale |det|</span><span class="mt-area">—</span></div>' +
          '<div><span>Orientation</span><span class="mt-orient">—</span></div>' +
          '<div><span class="mt-clr-i">î → (a, c)</span><span class="mt-ci">—</span></div>' +
          '<div><span class="mt-clr-j">ĵ → (b, d)</span><span class="mt-cj">—</span></div>' +
          '<div><span>M·v</span><span class="mt-mv">—</span></div>' +
        '</div>' +
        '<div class="mt-slider"><span class="k mt-clr-i">a</span><input type="range" class="mt-sa mt-sl-i"><span class="v mt-va">1</span></div>' +
        '<div class="mt-slider"><span class="k mt-clr-j">b</span><input type="range" class="mt-sb mt-sl-j"><span class="v mt-vb">0</span></div>' +
        '<div class="mt-slider"><span class="k mt-clr-i">c</span><input type="range" class="mt-sc mt-sl-i"><span class="v mt-vc">0</span></div>' +
        '<div class="mt-slider"><span class="k mt-clr-j">d</span><input type="range" class="mt-sd mt-sl-j"><span class="v mt-vd">1</span></div>' +
        '<div class="mlw-btns mt-presets"></div>' +
        '<p class="mlw-tip">Move the a, b, c, d sliders — or drag the gold sample vector’s tip — ' +
        'and watch the grid bend. The blue and pink arrows (î′ and ĵ′) are exactly the ' +
        '<b>columns</b> of M: where the two unit axes land. The shaded parallelogram is the unit ' +
        'square’s image; its area is |det|. A negative det means the plane got flipped.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">A 2×2 matrix is a <b>linear map</b> of the plane: every point ' +
    '<code>(x,y)</code> goes to <code>(ax+by, cx+dy)</code>. Straight lines stay straight and the ' +
    'origin stays fixed, so the whole grid just skews into a new grid of parallelograms. Because ' +
    'the map is linear, the image is fully determined by where the two basis vectors go — the ' +
    'columns <code>(a,c)</code> and <code>(b,d)</code> — and <code>det(M)=ad−bc</code> is the ' +
    'signed factor by which every area is scaled.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mt-plot");
  var slA = root.querySelector(".mt-sa"), slB = root.querySelector(".mt-sb");
  var slC = root.querySelector(".mt-sc"), slD = root.querySelector(".mt-sd");
  [slA, slB, slC, slD].forEach(function (s) { s.min = -3; s.max = 3; s.step = 0.1; });

  // preset buttons
  var pb = root.querySelector(".mt-presets"), bs = "";
  PRESETS.forEach(function (p, i) { bs += '<button class="mt-pre" type="button" data-i="' + i + '">' + p.name + '</button>'; });
  pb.innerHTML = bs;

  function set(cls, v) { root.querySelector(cls).textContent = v; }

  // arrow = shaft + filled head, all in math coords; cls styles both (cls + cls-head)
  function arrow(x0, y0, x1, y1, cls) {
    var sx0 = px(x0), sy0 = py(y0), sx1 = px(x1), sy1 = py(y1);
    var dx = sx1 - sx0, dy = sy1 - sy0, len = Math.hypot(dx, dy);
    var out = '<line x1="' + sx0.toFixed(1) + '" y1="' + sy0.toFixed(1) + '" x2="' + sx1.toFixed(1) +
              '" y2="' + sy1.toFixed(1) + '" class="' + cls + '"/>';
    if (len > 4) {
      var ux = dx / len, uy = dy / len, ah = 11, aw = 6.5;
      var bx = sx1 - ux * ah, by = sy1 - uy * ah;
      out += '<polygon points="' + sx1.toFixed(1) + ',' + sy1.toFixed(1) + ' ' +
             (bx - uy * aw).toFixed(1) + ',' + (by + ux * aw).toFixed(1) + ' ' +
             (bx + uy * aw).toFixed(1) + ',' + (by - ux * aw).toFixed(1) + '" class="' + cls + '-head"/>';
    }
    return out;
  }

  function render() {
    var s = [], k, o, p, q;
    var clip = 'clip-path="url(#' + UID + ')"';

    // --- original integer grid (faint) ---
    for (k = -R; k <= R; k++) {
      s.push('<line x1="' + px(k) + '" y1="' + py(-R) + '" x2="' + px(k) + '" y2="' + py(R) + '" class="mlw-grid"/>');
      s.push('<line x1="' + px(-R) + '" y1="' + py(k) + '" x2="' + px(R) + '" y2="' + py(k) + '" class="mlw-grid"/>');
    }

    // --- transformed grid: exact images of the integer lines (straight, clipped) ---
    for (k = -R; k <= R; k++) {
      var A = apply(k, -R), B = apply(k, R);        // image of vertical line x=k
      var C = apply(-R, k), D = apply(R, k);        // image of horizontal line y=k
      var z = (k === 0) ? " mt-tgrid--0" : "";
      s.push('<line x1="' + px(A.x) + '" y1="' + py(A.y) + '" x2="' + px(B.x) + '" y2="' + py(B.y) +
             '" class="mt-tgrid' + z + '" ' + clip + '/>');
      s.push('<line x1="' + px(C.x) + '" y1="' + py(C.y) + '" x2="' + px(D.x) + '" y2="' + py(D.y) +
             '" class="mt-tgrid' + z + '" ' + clip + '/>');
    }

    // --- image of the unit square (parallelogram) = signed-area = det ---
    o = apply(0, 0); var Pi = apply(1, 0), Pij = apply(1, 1), Pj = apply(0, 1);
    s.push('<polygon points="' + px(o.x) + ',' + py(o.y) + ' ' + px(Pi.x) + ',' + py(Pi.y) + ' ' +
           px(Pij.x) + ',' + py(Pij.y) + ' ' + px(Pj.x) + ',' + py(Pj.y) +
           '" class="mt-square' + (det() < 0 ? " mt-square--flip" : "") + '" ' + clip + '/>');

    // --- axes on top of grids ---
    s.push('<line x1="' + px(-R) + '" y1="' + py(0) + '" x2="' + px(R) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(0) + '" y1="' + py(-R) + '" x2="' + px(0) + '" y2="' + py(R) + '" class="mlw-axis"/>');
    for (k = -R; k <= R; k++) {
      if (k === 0) continue;
      s.push('<text x="' + px(k) + '" y="' + (py(0) + 13) + '" text-anchor="middle" class="mt-tick">' + k + '</text>');
      s.push('<text x="' + (px(0) - 6) + '" y="' + (py(k) + 4) + '" text-anchor="end" class="mt-tick">' + k + '</text>');
    }

    // --- original basis vectors (faint dashed reference) ---
    s.push(arrow(0, 0, 1, 0, "mt-o"));
    s.push(arrow(0, 0, 0, 1, "mt-o"));

    // --- transformed basis vectors = columns of M ---
    var i2 = apply(1, 0), j2 = apply(0, 1);
    s.push(arrow(0, 0, i2.x, i2.y, "mt-i"));
    s.push(arrow(0, 0, j2.x, j2.y, "mt-j"));
    s.push('<text x="' + (px(i2.x) + 8) + '" y="' + (py(i2.y) - 6) + '" class="mt-lbl mt-clr-i">î′</text>');
    s.push('<text x="' + (px(j2.x) + 8) + '" y="' + (py(j2.y) - 6) + '" class="mt-lbl mt-clr-j">ĵ′</text>');

    // --- sample vector v (faint) and its image M·v (gold) ---
    var mvp = apply(vx, vy);
    s.push(arrow(0, 0, vx, vy, "mt-v"));
    s.push(arrow(0, 0, mvp.x, mvp.y, "mt-mv"));
    s.push('<circle cx="' + px(vx) + '" cy="' + py(vy) + '" r="7" class="mlw-dot mlw-dot--drag mt-vgrab"/>');
    s.push('<text x="' + (px(vx) + 9) + '" y="' + (py(vy) + 14) + '" class="mt-lbl mt-clr-v">v</text>');
    s.push('<text x="' + (px(mvp.x) + 9) + '" y="' + (py(mvp.y) - 6) + '" class="mt-lbl mt-clr-mv">M·v</text>');

    svg.innerHTML = svg.querySelector("clipPath").outerHTML + s.join("");

    // --- readouts ---
    var dv = det(), mvp2 = apply(vx, vy);
    set(".mt-a", a.toFixed(1)); set(".mt-b", b.toFixed(1));
    set(".mt-c", c.toFixed(1)); set(".mt-d", d.toFixed(1));
    set(".mt-det", dv.toFixed(2));
    set(".mt-area", Math.abs(dv).toFixed(2));
    set(".mt-orient", Math.abs(dv) < 1e-6 ? "collapsed (rank < 2)" : dv < 0 ? "flipped (reflection)" : "preserved");
    set(".mt-ci", "(" + a.toFixed(1) + ", " + c.toFixed(1) + ")");
    set(".mt-cj", "(" + b.toFixed(1) + ", " + d.toFixed(1) + ")");
    set(".mt-mv", "(" + mvp2.x.toFixed(2) + ", " + mvp2.y.toFixed(2) + ")");

    slA.value = a; slB.value = b; slC.value = c; slD.value = d;
    set(".mt-va", a.toFixed(1)); set(".mt-vb", b.toFixed(1));
    set(".mt-vc", c.toFixed(1)); set(".mt-vd", d.toFixed(1));
  }

  // ---- interaction: drag the sample vector's tip ----
  var dragging = false;
  function grab(e) {
    var l = local(svg, e);
    if (Math.hypot(px(vx) - l.x, py(vy) - l.y) > 16) return;
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  }
  function moveTo(e) {
    if (!dragging) return;
    var l = local(svg, e);
    vx = Math.round(cl(mx(l.x), -R, R) * 4) / 4;   // snap to quarter units for clean readouts
    vy = Math.round(cl(my(l.y), -R, R) * 4) / 4;
    render();
  }
  function drop() { dragging = false; }
  svg.addEventListener("pointerdown", grab);
  svg.addEventListener("pointermove", moveTo);
  svg.addEventListener("pointerup", drop);
  svg.addEventListener("pointercancel", drop);

  slA.addEventListener("input", function () { a = parseFloat(slA.value); render(); });
  slB.addEventListener("input", function () { b = parseFloat(slB.value); render(); });
  slC.addEventListener("input", function () { c = parseFloat(slC.value); render(); });
  slD.addEventListener("input", function () { d = parseFloat(slD.value); render(); });

  pb.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.classList.contains("mt-pre")) return;
    var m = PRESETS[+t.getAttribute("data-i")].m;
    a = Math.round(m[0] * 10) / 10; b = Math.round(m[1] * 10) / 10;
    c = Math.round(m[2] * 10) / 10; d = Math.round(m[3] * 10) / 10;
    render();
  });

  render();
});

/* ===== widget: neural-net-forward.js ===== */
/* neural-net-forward — a 2 → 3 → 1 feedforward net, computed as an EXACT forward pass.
 * Drag the two input sliders; click any connection to select it and adjust its weight,
 * or click a hidden/output node to edit its bias. Each node fills by its activation
 * strength and the true σ/tanh/ReLU forward pass propagates left→right to the output.
 * No animation — every control change recomputes and redraws the real state.
 * Self-contained; registered on the MLW harness. */
MLW.register("neural-net-forward", function (root) {
  var VW = 660, VH = 460, R = 30;

  // fixed layer geometry (viewBox coords) — used by both render and hit-testing
  var IN  = [{ x: 110, y: 150, tag: "x₁" }, { x: 110, y: 310, tag: "x₂" }];
  var HID = [{ x: 335, y: 80,  tag: "h₁" }, { x: 335, y: 230, tag: "h₂" }, { x: 335, y: 380, tag: "h₃" }];
  var OUT = { x: 560, y: 230, tag: "ŷ" };

  // parameters (mutated in place). W1[j][i] = input i → hidden j; W2[j] = hidden j → output.
  var W1, b1, W2, b2, x, act, sel;
  function defaults() {
    W1  = [[ 1.5, -1.0], [-1.0, 1.5], [ 1.0, 1.0]];
    b1  = [0.2, -0.3, -0.5];
    W2  = [1.2, 1.2, -1.5];
    b2  = [-0.2];                       // 1-elem array so it is mutable by reference
    x   = [0.7, -0.3];
    act = "sigmoid";
    sel = { type: "w2", j: 0 };         // start with one edge selected
  }
  defaults();

  // activation functions (ES5-safe tanh; avoid relying on Math.tanh)
  function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }
  function tanh(z) { var e = Math.exp(2 * z); return (e - 1) / (e + 1); }
  function relu(z) { return z > 0 ? z : 0; }
  function f(z) { return act === "tanh" ? tanh(z) : act === "relu" ? relu(z) : sigmoid(z); }

  // true forward pass
  function forward() {
    var z1 = [], h = [], j, z2 = b2[0];
    for (j = 0; j < 3; j++) {
      z1[j] = W1[j][0] * x[0] + W1[j][1] * x[1] + b1[j];
      h[j] = f(z1[j]);
    }
    for (j = 0; j < 3; j++) z2 += W2[j] * h[j];
    return { z1: z1, h: h, z2: z2, out: sigmoid(z2) };   // output node is always σ (probability)
  }

  // map an activation value to a 0..1 fill intensity for the heat colouring
  function inten(a) {
    if (act === "tanh") return (a + 1) / 2;              // [-1,1] → [0,1]
    if (act === "relu") return Math.max(0, Math.min(1, a / 3)); // cap display at 3
    return Math.max(0, Math.min(1, a));                  // sigmoid already [0,1]
  }
  function inInten(v) { return Math.max(0, Math.min(1, (v + 1) / 2)); } // inputs in [-1,1]

  // selectable connections (rebuilt each render / hit-test from fixed geometry)
  function edges() {
    var e = [], i, j;
    for (j = 0; j < 3; j++)
      for (i = 0; i < 2; i++)
        e.push({ x1: IN[i].x, y1: IN[i].y, x2: HID[j].x, y2: HID[j].y, type: "w1", i: i, j: j, w: W1[j][i] });
    for (j = 0; j < 3; j++)
      e.push({ x1: HID[j].x, y1: HID[j].y, x2: OUT.x, y2: OUT.y, type: "w2", j: j, w: W2[j] });
    return e;
  }

  // read/write the currently selected parameter
  function selGet() {
    if (sel.type === "w1") return W1[sel.j][sel.i];
    if (sel.type === "w2") return W2[sel.j];
    if (sel.type === "b1") return b1[sel.j];
    return b2[0];
  }
  function selSet(v) {
    if (sel.type === "w1") W1[sel.j][sel.i] = v;
    else if (sel.type === "w2") W2[sel.j] = v;
    else if (sel.type === "b1") b1[sel.j] = v;
    else b2[0] = v;
  }
  function selLabel() {
    if (sel.type === "w1") return "weight " + IN[sel.i].tag + " → " + HID[sel.j].tag;
    if (sel.type === "w2") return "weight " + HID[sel.j].tag + " → output";
    if (sel.type === "b1") return "bias of " + HID[sel.j].tag;
    return "bias of output";
  }
  function isSelEdge(e) {
    return sel.type === e.type &&
      (e.type === "w2" ? sel.j === e.j : (sel.i === e.i && sel.j === e.j));
  }
  function isSelBias(type, j) { return sel.type === type && sel.j === j; }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive 2-3-1 feedforward neural network showing a live forward pass"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">h<sub>j</sub> = f(w·x + b),&nbsp; ŷ = σ(w<sup>(2)</sup>·h + b)</div>' +
        '<div class="mlw-nn-acts">activation f:' +
          '<div class="mlw-btns">' +
            '<button class="mlw-nn-act" data-a="sigmoid" type="button">sigmoid</button>' +
            '<button class="mlw-nn-act" data-a="tanh" type="button">tanh</button>' +
            '<button class="mlw-nn-act" data-a="relu" type="button">ReLU</button>' +
          '</div>' +
        '</div>' +
        '<div class="mlw-sliders">' +
          '<label>input&nbsp;x₁ <span class="mlw-val mlw-x1v">0.70</span>' +
            '<input type="range" class="mlw-x1-in" min="-1" max="1" step="0.02" value="0.7"></label>' +
          '<label>input&nbsp;x₂ <span class="mlw-val mlw-x2v">-0.30</span>' +
            '<input type="range" class="mlw-x2-in" min="-1" max="1" step="0.02" value="-0.3"></label>' +
          '<label class="mlw-nn-wsel"><span class="mlw-wsel-lab">weight h₁ → output</span> ' +
            '<span class="mlw-val mlw-wsel-val">1.20</span>' +
            '<input type="range" class="mlw-wsel-in" min="-3" max="3" step="0.05" value="1.2"></label>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>hidden h₁</span><span class="mlw-h1">—</span></div>' +
          '<div><span>hidden h₂</span><span class="mlw-h2">—</span></div>' +
          '<div><span>hidden h₃</span><span class="mlw-h3">—</span></div>' +
          '<div><span>output z = w·h + b</span><span class="mlw-z2">—</span></div>' +
          '<div><span>output ŷ = σ(z)</span><span class="mlw-out">—</span></div>' +
        '</div>' +
        '<div class="mlw-nn-legend">' +
          '<span><i class="mlw-sw mlw-sw--fill"></i> node fill = activation strength</span>' +
          '<span><i class="mlw-sw mlw-sw--pos"></i> solid edge = +weight &nbsp;·&nbsp; ' +
            '<i class="mlw-sw mlw-sw--neg"></i> dashed = −weight (width = |w|)</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-tip">Move the input sliders and watch every node re-fill. ' +
        'Click a connection to select it (it turns gold), then drag the weight slider; ' +
        'click a hidden or output node to edit its bias instead.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Each hidden unit computes a weighted sum of the inputs plus a bias, ' +
    'then squashes it through the nonlinearity f. The output neuron does the same over the hidden ' +
    'layer and passes it through σ to give a probability ŷ. This is exactly one ' +
    '<em>forward pass</em> — the numbers shown are the real computation, not an approximation.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var x1In = root.querySelector(".mlw-x1-in");
  var x2In = root.querySelector(".mlw-x2-in");
  var wsIn = root.querySelector(".mlw-wsel-in");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function sw(w) { return 1.2 + Math.min(Math.abs(w), 3) / 3 * 6; }   // edge stroke width

  function drawNode(s, n, intensity, valTxt, selRing) {
    s.push('<circle cx="' + n.x + '" cy="' + n.y + '" r="' + R + '" class="mlw-nn-node' +
           (selRing ? " mlw-nn-node--sel" : "") + '"/>');
    s.push('<circle cx="' + n.x + '" cy="' + n.y + '" r="' + R + '" class="mlw-nn-fill" fill-opacity="' +
           intensity.toFixed(3) + '"/>');
    s.push('<text x="' + n.x + '" y="' + (n.y + 5) + '" text-anchor="middle" class="mlw-nn-val">' + valTxt + '</text>');
  }

  function render() {
    var st = forward(), s = [], es = edges(), i, e, j;

    // column headers
    s.push('<text x="110" y="34" text-anchor="middle" class="mlw-nn-head">inputs</text>');
    s.push('<text x="335" y="34" text-anchor="middle" class="mlw-nn-head">hidden layer (f)</text>');
    s.push('<text x="560" y="34" text-anchor="middle" class="mlw-nn-head">output σ</text>');

    // edges (drawn first, behind nodes)
    for (i = 0; i < es.length; i++) {
      e = es[i];
      var selE = isSelEdge(e);
      var cls = "mlw-nn-edge" + (e.w < 0 ? " mlw-nn-edge--neg" : "") + (selE ? " mlw-nn-edge--sel" : "");
      s.push('<line x1="' + e.x1 + '" y1="' + e.y1 + '" x2="' + e.x2 + '" y2="' + e.y2 +
             '" class="' + cls + '" stroke-width="' + sw(e.w).toFixed(2) + '"/>');
    }
    // weight label on the selected edge only (keeps the diagram legible)
    for (i = 0; i < es.length; i++) {
      e = es[i];
      if (!isSelEdge(e)) continue;
      var mx = (e.x1 + e.x2) / 2, my = (e.y1 + e.y2) / 2 - 6;
      s.push('<text x="' + mx.toFixed(1) + '" y="' + my.toFixed(1) +
             '" text-anchor="middle" class="mlw-nn-wlab">w = ' + e.w.toFixed(2) + '</text>');
    }

    // input nodes
    for (i = 0; i < 2; i++) {
      drawNode(s, IN[i], inInten(x[i]), x[i].toFixed(2), false);
      s.push('<text x="' + (IN[i].x - R - 8) + '" y="' + (IN[i].y + 5) + '" text-anchor="end" class="mlw-nn-tag">' + IN[i].tag + '</text>');
    }
    // hidden nodes (fill by activation; ring if its bias is selected)
    for (j = 0; j < 3; j++) {
      drawNode(s, HID[j], inten(st.h[j]), st.h[j].toFixed(2), isSelBias("b1", j));
      s.push('<text x="' + HID[j].x + '" y="' + (HID[j].y - R - 8) + '" text-anchor="middle" class="mlw-nn-tag">' +
             HID[j].tag + ' &nbsp;b=' + b1[j].toFixed(2) + '</text>');
    }
    // output node (always σ ⇒ 0..1 fill)
    drawNode(s, OUT, st.out, st.out.toFixed(2), isSelBias("b2", 0));
    s.push('<text x="' + (OUT.x + R + 8) + '" y="' + (OUT.y + 5) + '" text-anchor="start" class="mlw-nn-tag">' +
           OUT.tag + ' = ' + st.out.toFixed(3) + '</text>');

    svg.innerHTML = s.join("");

    set(".mlw-x1v", x[0].toFixed(2));
    set(".mlw-x2v", x[1].toFixed(2));
    set(".mlw-h1", st.h[0].toFixed(3));
    set(".mlw-h2", st.h[1].toFixed(3));
    set(".mlw-h3", st.h[2].toFixed(3));
    set(".mlw-z2", st.z2.toFixed(3));
    set(".mlw-out", st.out.toFixed(3));

    // keep the weight editor in sync with the current selection
    root.querySelector(".mlw-wsel-lab").textContent = selLabel();
    set(".mlw-wsel-val", selGet().toFixed(2));
    wsIn.value = String(selGet());

    // active activation button
    var btns = root.querySelectorAll(".mlw-nn-act"), k;
    for (k = 0; k < btns.length; k++)
      btns[k].className = "mlw-nn-act" + (btns[k].getAttribute("data-a") === act ? " mlw-nn-act--on" : "");
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function dist2seg(px, py, a, b, c, d) {          // point (px,py) to segment (a,b)-(c,d)
    var vx = c - a, vy = d - b, wx = px - a, wy = py - b;
    var L2 = vx * vx + vy * vy, t = L2 ? (wx * vx + wy * vy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    var dx = px - (a + t * vx), dy = py - (b + t * vy);
    return Math.hypot(dx, dy);
  }

  // click: pick a node (bias) first, else the nearest connection (weight)
  svg.addEventListener("pointerdown", function (ev) {
    var l = local(ev), j, i, es, best = null, bd = 12;
    for (j = 0; j < 3; j++)
      if (Math.hypot(HID[j].x - l.x, HID[j].y - l.y) < R) { sel = { type: "b1", j: j }; render(); return; }
    if (Math.hypot(OUT.x - l.x, OUT.y - l.y) < R) { sel = { type: "b2", j: 0 }; render(); return; }
    es = edges();
    for (i = 0; i < es.length; i++) {
      var d = dist2seg(l.x, l.y, es[i].x1, es[i].y1, es[i].x2, es[i].y2);
      if (d < bd) { bd = d; best = es[i]; }
    }
    if (best) {
      sel = best.type === "w2" ? { type: "w2", j: best.j } : { type: "w1", i: best.i, j: best.j };
      render();
    }
  });

  x1In.addEventListener("input", function () { x[0] = parseFloat(x1In.value); render(); });
  x2In.addEventListener("input", function () { x[1] = parseFloat(x2In.value); render(); });
  wsIn.addEventListener("input", function () { selSet(parseFloat(wsIn.value)); render(); });

  var abtns = root.querySelectorAll(".mlw-nn-act"), a;
  for (a = 0; a < abtns.length; a++)
    abtns[a].addEventListener("click", function () { act = this.getAttribute("data-a"); render(); });

  root.querySelector(".mlw-reset").addEventListener("click", function () {
    defaults();
    x1In.value = "0.7"; x2In.value = "-0.3";
    render();
  });

  render();
});

/* ===== widget: pca.js ===== */
/* pca — rotate a candidate axis through a fixed 2D point cloud and watch how much
 * variance it captures. Every point is projected (perpendicular drop) onto the axis;
 * the variance of those projections is the "spread" the axis explains. The gold axis
 * is what you steer; the dashed line is the TRUE first principal component — the exact
 * variance-maximizing direction from the eigen-decomposition of the covariance matrix.
 * No animation: each slider/pointer change recomputes and redraws the true state.
 * Self-contained ES5; registered on the MLW harness. */
MLW.register("pca", function (root) {
  var VW = 560, VH = 440, PAD = 40, LO = 0, HI = 100;
  function px(x) { return PAD + (x - LO) / (HI - LO) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - LO) / (HI - LO) * (VH - 2 * PAD); }
  function xData(sx) { return LO + (sx - PAD) / (VW - 2 * PAD) * (HI - LO); }
  function yData(sy) { return LO + (VH - PAD - sy) / (VH - 2 * PAD) * (HI - LO); }

  // fixed, elongated cloud — a clear dominant direction so PC1 is unambiguous
  var PTS = [
    [16, 28], [22, 24], [26, 38], [33, 30], [37, 46], [44, 40],
    [48, 55], [54, 48], [58, 63], [63, 54], [67, 70], [72, 62],
    [78, 74], [83, 66], [88, 82], [30, 52], [70, 46]
  ].map(function (a) { return { x: a[0], y: a[1] }; });

  // covariance of the (fixed) cloud + closed-form 2x2 eigen-decomposition
  function stats() {
    var n = PTS.length, mx = 0, my = 0, i, p;
    for (i = 0; i < n; i++) { mx += PTS[i].x; my += PTS[i].y; }
    mx /= n; my /= n;
    var vxx = 0, vyy = 0, vxy = 0, dx, dy;
    for (i = 0; i < n; i++) {
      dx = PTS[i].x - mx; dy = PTS[i].y - my;
      vxx += dx * dx; vyy += dy * dy; vxy += dx * dy;
    }
    vxx /= n; vyy /= n; vxy /= n;                 // population covariance matrix [[vxx,vxy],[vxy,vyy]]
    var tr = vxx + vyy, det = vxx * vyy - vxy * vxy;
    var disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
    var l1 = tr / 2 + disc, l2 = tr / 2 - disc;    // eigenvalues = variance along each PC
    var pc1 = 0.5 * Math.atan2(2 * vxy, vxx - vyy); // angle of the leading eigenvector
    return { mx: mx, my: my, total: tr, l1: l1, l2: l2, pc1: pc1 };
  }
  var S = stats();

  // variance of the projections of the cloud onto the unit axis at angle th
  function varianceAlong(th) {
    var ux = Math.cos(th), uy = Math.sin(th), n = PTS.length, s = 0, i, d;
    for (i = 0; i < n; i++) {
      d = (PTS[i].x - S.mx) * ux + (PTS[i].y - S.my) * uy;
      s += d * d;
    }
    return s / n;
  }

  // clip the infinite axis (through the mean, direction u) to the data box for drawing
  function clip(ux, uy) {
    var cand = [], t, x, y, EPS = 1e-6;
    function add(tt) {
      x = S.mx + tt * ux; y = S.my + tt * uy;
      if (x >= LO - EPS && x <= HI + EPS && y >= LO - EPS && y <= HI + EPS) cand.push({ t: tt, x: x, y: y });
    }
    if (Math.abs(ux) > EPS) { add((LO - S.mx) / ux); add((HI - S.mx) / ux); }
    if (Math.abs(uy) > EPS) { add((LO - S.my) / uy); add((HI - S.my) / uy); }
    if (cand.length < 2) return null;
    var lo = cand[0], hi = cand[0], i;
    for (i = 1; i < cand.length; i++) { if (cand[i].t < lo.t) lo = cand[i]; if (cand[i].t > hi.t) hi = cand[i]; }
    return { a: lo, b: hi };
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="A fixed 2D point cloud with a rotatable projection axis and the true first principal component"></svg>' +
      '<div class="mlw-side">' +
        '<p class="mlw-cap">Each point drops perpendicularly onto the axis. The <b>variance of ' +
        'those projections</b> is how much of the cloud’s spread this direction captures — PCA ' +
        'picks the direction that <b>maximizes</b> it.</p>' +
        '<div class="mlw-stats">' +
          '<div><span>Axis angle</span><span class="mlw-ang">—</span></div>' +
          '<div><span>Variance captured</span><span class="mlw-var">—</span></div>' +
          '<div><span>Total variance</span><span class="mlw-tot">—</span></div>' +
        '</div>' +
        '<div class="mlw-varbar"><div class="mlw-varbar-fill"></div>' +
          '<span class="mlw-varbar-pc" title="fraction captured by the true PC1"></span></div>' +
        '<div class="mlw-varpct"><span class="mlw-pct">—</span> of total variance ' +
          '(PC1 captures <span class="mlw-pcpct">—</span>)</div>' +
        '<div class="mlw-pca-ctrl">' +
          '<label>Rotate axis <b class="mlw-angb">0°</b>' +
            '<input type="range" class="mlw-slider" min="0" max="180" step="1" value="0"></label>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-snap" type="button">Snap to PC1</button>' +
          '<button class="mlw-reset" type="button">Reset</button>' +
        '</div>' +
        '<p class="mlw-legend"><span class="mlw-key mlw-key--axis"></span> your axis &nbsp; ' +
          '<span class="mlw-key mlw-key--pc"></span> true PC1 &nbsp; ' +
          '<span class="mlw-key mlw-key--proj"></span> projection</p>' +
        '<p class="mlw-tip">Drag the slider — or drag inside the plot — to rotate the axis around ' +
        'the mean. The captured-variance bar peaks exactly when your axis lines up with the dashed PC1.</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var slider = root.querySelector(".mlw-slider");
  var theta = 0, dragging = false;
  var pcPct = S.total > 1e-9 ? S.l1 / S.total : 0;   // fraction PC1 captures (fixed)

  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var ux = Math.cos(theta), uy = Math.sin(theta), s = [], i, p, g;
    // grid + axes
    for (g = 0; g <= 100; g += 20) {
      s.push('<line x1="' + px(g) + '" y1="' + py(0) + '" x2="' + px(g) + '" y2="' + py(100) + '" class="mlw-grid"/>');
      s.push('<line x1="' + px(0) + '" y1="' + py(g) + '" x2="' + px(100) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(100) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(0) + '" y2="' + py(100) + '" class="mlw-axis"/>');

    // true PC1 direction (dashed) — drawn under the live axis
    var pcx = Math.cos(S.pc1), pcy = Math.sin(S.pc1), cpc = clip(pcx, pcy);
    if (cpc) s.push('<line x1="' + px(cpc.a.x) + '" y1="' + py(cpc.a.y) + '" x2="' + px(cpc.b.x) +
                    '" y2="' + py(cpc.b.y) + '" class="mlw-pca-pc"/>');

    // projection segments (perpendicular drops) + projected points on the live axis
    for (i = 0; i < PTS.length; i++) {
      p = PTS[i];
      var d = (p.x - S.mx) * ux + (p.y - S.my) * uy;
      var qx = S.mx + d * ux, qy = S.my + d * uy;
      s.push('<line x1="' + px(p.x) + '" y1="' + py(p.y) + '" x2="' + px(qx) + '" y2="' + py(qy) +
             '" class="mlw-pca-proj"/>');
    }
    // live axis (through the mean)
    var cax = clip(ux, uy);
    if (cax) s.push('<line x1="' + px(cax.a.x) + '" y1="' + py(cax.a.y) + '" x2="' + px(cax.b.x) +
                    '" y2="' + py(cax.b.y) + '" class="mlw-pca-axis"/>');
    // projected dots (drawn over the axis)
    for (i = 0; i < PTS.length; i++) {
      p = PTS[i];
      var dd = (p.x - S.mx) * ux + (p.y - S.my) * uy;
      s.push('<circle cx="' + px(S.mx + dd * ux) + '" cy="' + py(S.my + dd * uy) + '" r="3.2" class="mlw-pca-projdot"/>');
    }
    // cloud points
    for (i = 0; i < PTS.length; i++) {
      p = PTS[i];
      s.push('<circle cx="' + px(p.x) + '" cy="' + py(p.y) + '" r="6" class="mlw-dot"/>');
    }
    // mean marker
    s.push('<circle cx="' + px(S.mx) + '" cy="' + py(S.my) + '" r="4" class="mlw-pca-mean"/>');
    svg.innerHTML = s.join("");

    var va = varianceAlong(theta), frac = S.total > 1e-9 ? va / S.total : 0;
    var deg = Math.round(theta * 180 / Math.PI);
    set(".mlw-ang", deg + "°");
    set(".mlw-angb", deg + "°");
    set(".mlw-var", va.toFixed(1));
    set(".mlw-tot", S.total.toFixed(1));
    set(".mlw-pct", (frac * 100).toFixed(1) + "%");
    set(".mlw-pcpct", (pcPct * 100).toFixed(1) + "%");
    root.querySelector(".mlw-varbar-fill").style.width = (frac * 100).toFixed(1) + "%";
    root.querySelector(".mlw-varbar-pc").style.left = (pcPct * 100).toFixed(1) + "%";
    slider.value = String(((deg % 180) + 180) % 180);
  }

  function setTheta(rad) {                          // axis is undirected -> fold into [0, 180)
    var d = rad % Math.PI; if (d < 0) d += Math.PI;
    theta = d;
  }

  // pointer rotation: angle from the mean to the pointer, in data coordinates
  function local(e) {
    var r = svg.getBoundingClientRect();
    var sx = (e.clientX - r.left) / r.width * VW, sy = (e.clientY - r.top) / r.height * VH;
    return { x: xData(sx), y: yData(sy) };
  }
  function aim(e) {
    var l = local(e), dx = l.x - S.mx, dy = l.y - S.my;
    if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) return;
    setTheta(Math.atan2(dy, dx));
    render();
  }
  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    aim(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) aim(e); });
  function end() { dragging = false; }
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);

  slider.addEventListener("input", function () {
    setTheta(parseFloat(slider.value) * Math.PI / 180);
    render();
  });
  root.querySelector(".mlw-snap").addEventListener("click", function () { setTheta(S.pc1); render(); });
  root.querySelector(".mlw-reset").addEventListener("click", function () { setTheta(0); render(); });

  render();
});

/* ===== widget: polynomial-overfit.js ===== */
/* polynomial-overfit — fit a polynomial of chosen degree (1..15) to a FIXED noisy
 * 1-D dataset via real ridge least-squares, and watch underfit -> good -> overfit as
 * the degree climbs. A second slider adds an L2 penalty (lambda) that tames the wiggle.
 * Training error is measured on the dots you see; held-out error on a separate hidden
 * test set — the gap between them is the whole bias/variance story. Self-contained,
 * ES5, registered on the MLW harness. */
MLW.register("polynomial-overfit", function (root) {
  var VW = 580, VH = 440, PAD = 46;
  var X0 = 0, X1 = 1, Y0 = -1.7, Y1 = 1.7;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function sclampY(sy) { return Math.max(-40, Math.min(VH + 40, sy)); }

  // ---- fixed dataset (deterministic: seeded RNG, generated once) ------------------
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function trueF(x) { return Math.sin(1.7 * Math.PI * x - 0.35); }   // the signal we hope to recover
  var NOISE = 0.17;
  function makeSet(n, offset, rng) {
    var out = [], i, x, g;
    for (i = 0; i < n; i++) {
      x = (i + offset) / (n - 1 + 2 * offset);
      g = (rng() + rng() + rng() - 1.5) * 1.15;    // ~gaussian (sum of uniforms)
      out.push({ x: x, y: trueF(x) + g * NOISE });
    }
    return out;
  }
  var rng = mulberry32(7);
  var TRAIN = makeSet(16, 0, rng);                 // 16 points -> degree 15 interpolates exactly
  var TEST = makeSet(8, 0.5, rng);                 // held-out, never fitted

  // ---- ridge least squares (real normal equations, bias term unpenalised) ---------
  // feature basis: powers of u = 2x-1 in [-1,1] (keeps the Vandermonde well-scaled).
  function features(x, deg) {
    var u = 2 * x - 1, phi = [1], p = u, j;
    for (j = 1; j <= deg; j++) { phi.push(p); p *= u; }
    return phi;
  }
  function solve(A, b) {                            // Gaussian elimination, partial pivot
    var n = b.length, i, j, k, M = [];
    for (i = 0; i < n; i++) { M.push(A[i].slice()); M[i].push(b[i]); }
    for (i = 0; i < n; i++) {
      var piv = i;
      for (k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[piv][i])) piv = k;
      if (Math.abs(M[piv][i]) < 1e-12) return null; // singular
      var tmp = M[i]; M[i] = M[piv]; M[piv] = tmp;
      for (k = i + 1; k < n; k++) {
        var f = M[k][i] / M[i][i];
        for (j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      }
    }
    var w = new Array(n);
    for (i = n - 1; i >= 0; i--) {
      var s = M[i][n];
      for (j = i + 1; j < n; j++) s -= M[i][j] * w[j];
      w[i] = s / M[i][i];
    }
    return w;
  }
  function fit(pts, deg, lam) {
    var n = deg + 1, A = [], b = [], i, j, k;
    for (j = 0; j < n; j++) { A.push(new Array(n)); for (k = 0; k < n; k++) A[j][k] = 0; b[j] = 0; }
    for (i = 0; i < pts.length; i++) {
      var phi = features(pts[i].x, deg), y = pts[i].y;
      for (j = 0; j < n; j++) { b[j] += phi[j] * y; for (k = 0; k < n; k++) A[j][k] += phi[j] * phi[k]; }
    }
    for (j = 1; j < n; j++) A[j][j] += lam;         // L2 penalty on w1..wd, not on bias
    return solve(A, b);
  }
  function predict(w, x) {
    if (!w) return 0;
    var phi = features(x, w.length - 1), s = 0, j;
    for (j = 0; j < w.length; j++) s += w[j] * phi[j];
    return s;
  }
  function mse(pts, w) {
    var s = 0, i, e; for (i = 0; i < pts.length; i++) { e = predict(w, pts[i].x) - pts[i].y; s += e * e; }
    return s / pts.length;
  }

  // ---- UI -------------------------------------------------------------------------
  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Polynomial regression fit to a fixed noisy dataset, with degree and regularization sliders"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-diag"><span class="mlw-diaglabel">—</span></div>' +
        '<div class="mlw-ctrl">' +
          '<label>Degree <b class="mlw-degv">3</b></label>' +
          '<input type="range" class="mlw-deg" min="1" max="15" step="1" value="3">' +
        '</div>' +
        '<div class="mlw-ctrl">' +
          '<label>Regularization λ <b class="mlw-lamv">0</b></label>' +
          '<input type="range" class="mlw-lam" min="0" max="100" step="1" value="0">' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>Training error (dots)</span><span class="mlw-etr">—</span></div>' +
          '<div><span>Held-out error (◇)</span><span class="mlw-ete">—</span></div>' +
        '</div>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-showtrue" checked> show true signal</label>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-showtest" checked> show held-out points</label>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-p-under" type="button">Underfit</button>' +
          '<button class="mlw-p-good" type="button">Just right</button>' +
          '<button class="mlw-p-over" type="button">Overfit</button>' +
          '<button class="mlw-p-tame" type="button">Tame it (λ)</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag the <b>Degree</b> slider up: the curve wiggles harder to chase ' +
        'every dot — training error falls toward 0 but held-out error explodes (overfit). Then raise ' +
        '<b>λ</b> to shrink the coefficients and smooth it back out. Hover the plot to read f(x).</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var degEl = root.querySelector(".mlw-deg");
  var lamEl = root.querySelector(".mlw-lam");
  var showTrue = root.querySelector(".mlw-showtrue");
  var showTest = root.querySelector(".mlw-showtest");
  var cursorX = null;

  function lambdaOf(s) { return s <= 0 ? 0 : Math.pow(10, -4 + (s / 100) * 6); }  // 0, then 1e-4 .. 1e2
  function set(cls, v) { root.querySelector(cls).textContent = v; }
  function fmt(v) {
    if (!isFinite(v)) return "∞";
    if (v !== 0 && (v >= 1000 || v < 0.001)) return v.toExponential(2);
    return v.toFixed(4);
  }
  function fmtLam(l) { return l === 0 ? "0" : (l >= 0.1 && l < 1000 ? l.toPrecision(2) : l.toExponential(1)); }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }

  function render() {
    var deg = +degEl.value, lam = lambdaOf(+lamEl.value);
    var w = fit(TRAIN, deg, lam);
    var etr = mse(TRAIN, w), ete = mse(TEST, w);
    var s = [], g, i, p;

    // grid + axes
    for (g = 0; g <= 10; g++) {
      var gx = X0 + (X1 - X0) * g / 10;
      s.push('<line x1="' + px(gx) + '" y1="' + py(Y0) + '" x2="' + px(gx) + '" y2="' + py(Y1) + '" class="mlw-grid"/>');
    }
    for (g = -1; g <= 1; g++) {
      s.push('<line x1="' + px(X0) + '" y1="' + py(g) + '" x2="' + px(X1) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(X0) + '" y1="' + py(0) + '" x2="' + px(X1) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X0) + '" y2="' + py(Y1) + '" class="mlw-axis"/>');

    // true signal (dashed, faint)
    if (showTrue.checked) {
      var tp = [];
      for (i = 0; i <= 160; i++) { var tx = X0 + (X1 - X0) * i / 160; tp.push(px(tx).toFixed(1) + "," + py(trueF(tx)).toFixed(1)); }
      s.push('<polyline points="' + tp.join(" ") + '" class="mlw-true"/>');
    }

    // fitted polynomial curve (static polyline of the true fit, clipped to the frame)
    var cp = [];
    for (i = 0; i <= 240; i++) { var cx = X0 + (X1 - X0) * i / 240; cp.push(px(cx).toFixed(1) + "," + sclampY(py(predict(w, cx))).toFixed(1)); }
    s.push('<polyline points="' + cp.join(" ") + '" class="mlw-curve"/>');

    // held-out points (hollow diamonds)
    if (showTest.checked) {
      for (i = 0; i < TEST.length; i++) { p = TEST[i]; var cx2 = px(p.x), cy2 = py(p.y), r = 6;
        s.push('<polygon points="' + cx2 + ',' + (cy2 - r) + ' ' + (cx2 + r) + ',' + cy2 + ' ' + cx2 + ',' + (cy2 + r) + ' ' + (cx2 - r) + ',' + cy2 + '" class="mlw-testdot"/>');
      }
    }
    // training points (solid dots)
    for (i = 0; i < TRAIN.length; i++) { p = TRAIN[i];
      s.push('<circle cx="' + px(p.x) + '" cy="' + py(p.y) + '" r="6" class="mlw-dot"/>');
    }

    // hover readout
    if (cursorX !== null) {
      var hx = Math.max(X0, Math.min(X1, cursorX)), hy = predict(w, hx);
      s.push('<line x1="' + px(hx) + '" y1="' + py(Y0) + '" x2="' + px(hx) + '" y2="' + py(Y1) + '" class="mlw-cursor"/>');
      s.push('<circle cx="' + px(hx) + '" cy="' + sclampY(py(hy)) + '" r="5" class="mlw-curdot"/>');
      s.push('<text x="' + Math.min(px(hx) + 8, VW - 4) + '" y="' + (PAD + 4) + '" text-anchor="' + (px(hx) > VW - 90 ? "end" : "start") + '" class="mlw-curtxt">f(' + hx.toFixed(2) + ') = ' + hy.toFixed(2) + '</text>');
    }

    svg.innerHTML = s.join("");
    set(".mlw-degv", deg);
    set(".mlw-lamv", fmtLam(lam));
    set(".mlw-etr", fmt(etr));
    set(".mlw-ete", fmt(ete));

    // diagnosis (bias/variance) — irreducible noise floor ~ NOISE^2 ≈ 0.029
    var label, cls;
    if (etr > 0.09) { label = "Underfit — high bias"; cls = "mlw-diag--bias"; }
    else if (ete > 3 * etr + 0.05) { label = "Overfit — high variance"; cls = "mlw-diag--var"; }
    else { label = "Good fit — generalizes"; cls = "mlw-diag--good"; }
    var d = root.querySelector(".mlw-diag");
    d.className = "mlw-diag " + cls;
    root.querySelector(".mlw-diaglabel").textContent = label;
  }

  svg.addEventListener("pointermove", function (e) { cursorX = xData(local(e).x); render(); });
  svg.addEventListener("pointerdown", function (e) { cursorX = xData(local(e).x); render(); });
  svg.addEventListener("pointerleave", function () { cursorX = null; render(); });

  degEl.addEventListener("input", render);
  lamEl.addEventListener("input", render);
  showTrue.addEventListener("change", render);
  showTest.addEventListener("change", render);

  function preset(deg, lamSlider) { degEl.value = deg; lamEl.value = lamSlider; render(); }
  root.querySelector(".mlw-p-under").addEventListener("click", function () { preset(1, 0); });
  root.querySelector(".mlw-p-good").addEventListener("click", function () { preset(3, 0); });
  root.querySelector(".mlw-p-over").addEventListener("click", function () { preset(15, 0); });
  root.querySelector(".mlw-p-tame").addEventListener("click", function () { preset(15, 55); }); // λ ≈ 0.2 -> tames deg-15 back into the good-fit zone

  render();
});

/* ===== widget: precision-recall.js ===== */
/* precision-recall — a binary classifier's scores for positives (gold) and negatives (blue)
 * spread along a 0..1 score line. Drag the decision threshold: everything at or above it is
 * predicted 1. The 2x2 confusion matrix, precision, recall and F1 update live, and the exact
 * precision-recall trade-off curve (every achievable operating point as the threshold sweeps)
 * is drawn as a static polyline with the CURRENT threshold marked. A "class separation" slider
 * pulls the two clusters apart so you can watch the whole PR curve bow toward the top-right.
 * No animation — every control recomputes and redraws the true state. Self-contained; MLW harness. */
MLW.register("precision-recall", function (root) {
  var VW = 560, VH = 480, PAD = 44, W = VW - 2 * PAD;
  var STRIP_TOP = 52, STRIP_BOT = 142;          // dot band on the score line
  var PR_TOP = 208, PR_BOT = 442, PH = PR_BOT - PR_TOP; // PR-curve panel (precision 1..0)
  var NPOS = 16, NNEG = 24, SIGMA = 0.15;
  var P = NPOS, N = NNEG;

  function sx(score) { return PAD + score * W; }            // score 0..1 -> px
  function xToScore(px) { return Math.max(0, Math.min(1, (px - PAD) / W)); }
  function rx(recall) { return PAD + recall * W; }           // recall 0..1 -> px
  function ry(prec) { return PR_BOT - prec * PH; }           // precision 1..0 -> px
  function clamp01(v) { return Math.max(0.02, Math.min(0.98, v)); }

  // deterministic seeded points: each keeps a fixed standard-normal draw z and a fixed vertical
  // jitter, so changing separation only slides dots horizontally (identity/height stay put).
  var RNG, points = [];
  function rnd() { RNG = (RNG * 1103515245 + 12345) & 0x7fffffff; return RNG / 0x7fffffff; }
  function gauss() { var u = Math.max(1e-9, rnd()), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function build() {
    RNG = 20260701; points = []; var i;
    for (i = 0; i < NPOS; i++) points.push({ pos: true, z: gauss(), jit: 0.10 + 0.80 * rnd() });
    for (i = 0; i < NNEG; i++) points.push({ pos: false, z: gauss(), jit: 0.10 + 0.80 * rnd() });
  }

  var sep = 0.6, t = 0.5, dragging = false;

  function score(p) {                                        // mean shifts with separation
    var mean = p.pos ? 0.5 + 0.30 * sep : 0.5 - 0.30 * sep;
    return clamp01(mean + SIGMA * p.z);
  }

  // exact PR operating points: sort by score desc, add one point at a time (lower threshold),
  // recording (recall, precision) after each inclusion. Starts at the (0,1) convention vertex.
  function prCurve(scored) {
    var arr = scored.slice().sort(function (a, b) { return b.s - a.s; });
    var tp = 0, fp = 0, v = [{ r: 0, p: 1 }], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].pos) tp++; else fp++;
      v.push({ r: tp / P, p: (tp + fp) > 0 ? tp / (tp + fp) : 1 });
    }
    return v;
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Classifier scores along a line with a draggable threshold, plus the precision-recall curve"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-cm">' +
          '<div class="mlw-cm-corn"></div>' +
          '<div class="mlw-cm-top">actual 1</div>' +
          '<div class="mlw-cm-top">actual 0</div>' +
          '<div class="mlw-cm-lab">pred 1</div>' +
          '<div class="mlw-cm-cell mlw-cm-tp"><small>TP</small><b class="mlw-tp">0</b></div>' +
          '<div class="mlw-cm-cell mlw-cm-fp"><small>FP</small><b class="mlw-fp">0</b></div>' +
          '<div class="mlw-cm-lab">pred 0</div>' +
          '<div class="mlw-cm-cell mlw-cm-fn"><small>FN</small><b class="mlw-fn">0</b></div>' +
          '<div class="mlw-cm-cell mlw-cm-tn"><small>TN</small><b class="mlw-tn">0</b></div>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>Precision = TP/(TP+FP)</span><span class="mlw-prec">—</span></div>' +
          '<div><span>Recall = TP/(TP+FN)</span><span class="mlw-rec">—</span></div>' +
          '<div><span>F1 = 2PR/(P+R)</span><span class="mlw-f1">—</span></div>' +
          '<div><span>Accuracy</span><span class="mlw-acc">—</span></div>' +
        '</div>' +
        '<div class="mlw-sliders">' +
          '<label>threshold <span class="mlw-val mlw-tv">0.50</span>' +
            '<input type="range" class="mlw-t-in" min="0" max="1" step="0.01" value="0.5"></label>' +
          '<label>class separation <span class="mlw-val mlw-sv">0.60</span>' +
            '<input type="range" class="mlw-s-in" min="0" max="1" step="0.02" value="0.6"></label>' +
        '</div>' +
        '<div class="mlw-pr-legend">' +
          '<span><i class="mlw-sw mlw-sw--pos"></i>positive (y=1)</span>' +
          '<span><i class="mlw-sw mlw-sw--neg"></i>negative (y=0)</span>' +
          '<span><i class="mlw-sw mlw-sw--miss"></i>misclassified</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-reset" type="button">Reset (t = 0.5)</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag the threshold line on the score strip (or the slider). ' +
        'Raise it → fewer positives predicted → precision up, recall down. The gold dot on the ' +
        'curve is where you are now. Pull the clusters apart to bow the whole curve outward.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Everything at or above the threshold is predicted <code>1</code>. ' +
    'The PR curve traces every operating point as the threshold sweeps from high (top-left, ' +
    'recall 0) to low (bottom-right, recall 1); the dashed grey line is the no-skill baseline ' +
    'precision = P/(P+N). You pick a point on this curve to balance false positives vs. false negatives.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var tIn = root.querySelector(".mlw-t-in");
  var sIn = root.querySelector(".mlw-s-in");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var s = [], i, p, sc, scored = [], g;

    // current scores + current-threshold confusion counts
    var tp = 0, fp = 0;
    for (i = 0; i < points.length; i++) {
      p = points[i]; sc = score(p); scored.push({ s: sc, pos: p.pos, jit: p.jit });
      if (sc >= t) { if (p.pos) tp++; else fp++; }
    }
    var fn = P - tp, tn = N - fp;
    var precDef = (tp + fp) > 0, prec = precDef ? tp / (tp + fp) : null;
    var rec = tp / P;
    var f1 = (prec !== null && (prec + rec) > 0) ? 2 * prec * rec / (prec + rec) : null;
    var base = P / (P + N);

    // ---------- score strip ----------
    s.push('<text x="' + PAD + '" y="34" class="mlw-panel-lab">classifier score s(x)  →  predict 1 if s ≥ threshold</text>');
    // shaded "predict 1" region (right of threshold)
    s.push('<rect x="' + sx(t) + '" y="' + (STRIP_TOP - 8) + '" width="' + (sx(1) - sx(t)) +
           '" height="' + ((STRIP_BOT + 8) - (STRIP_TOP - 8)) + '" class="mlw-pr-pos-reg"/>');
    s.push('<text x="' + (sx(1) - 4) + '" y="' + (STRIP_TOP + 4) + '" text-anchor="end" class="mlw-reglabel">predict 1</text>');
    s.push('<text x="' + (sx(0) + 4) + '" y="' + (STRIP_TOP + 4) + '" class="mlw-reglabel">predict 0</text>');
    // score axis + ticks
    s.push('<line x1="' + sx(0) + '" y1="' + (STRIP_BOT + 8) + '" x2="' + sx(1) + '" y2="' + (STRIP_BOT + 8) + '" class="mlw-axis"/>');
    for (g = 0; g <= 1.0001; g += 0.5) {
      s.push('<line x1="' + sx(g) + '" y1="' + (STRIP_BOT + 8) + '" x2="' + sx(g) + '" y2="' + (STRIP_BOT + 13) + '" class="mlw-axis"/>');
      s.push('<text x="' + sx(g) + '" y="' + (STRIP_BOT + 26) + '" text-anchor="middle" class="mlw-tick">' + g.toFixed(1) + '</text>');
    }
    // dots (misclassified get a ring: positive below t = FN, negative at/above t = FP)
    for (i = 0; i < scored.length; i++) {
      var d = scored[i], predPos = d.s >= t, miss = (d.pos && !predPos) || (!d.pos && predPos);
      var cy = STRIP_TOP + d.jit * (STRIP_BOT - STRIP_TOP);
      s.push('<circle cx="' + sx(d.s).toFixed(2) + '" cy="' + cy.toFixed(2) + '" r="6" class="mlw-pr-dot ' +
             (d.pos ? 'mlw-pr-dot--pos' : 'mlw-pr-dot--neg') + (miss ? ' mlw-pr-dot--miss' : '') + '"/>');
    }
    // threshold handle (draggable)
    s.push('<line x1="' + sx(t) + '" y1="' + (STRIP_TOP - 8) + '" x2="' + sx(t) + '" y2="' + (STRIP_BOT + 8) + '" class="mlw-pr-thresh' + (dragging ? ' mlw-pr-thresh--drag' : '') + '"/>');
    s.push('<circle cx="' + sx(t) + '" cy="' + (STRIP_TOP - 8) + '" r="6" class="mlw-pr-thumb"/>');
    s.push('<text x="' + sx(t) + '" y="' + (STRIP_TOP - 16) + '" text-anchor="middle" class="mlw-declabel">t = ' + t.toFixed(2) + '</text>');

    // ---------- precision-recall curve ----------
    s.push('<text x="' + PAD + '" y="' + (PR_TOP - 14) + '" class="mlw-panel-lab">precision–recall trade-off curve</text>');
    // grid
    for (g = 0; g <= 1.0001; g += 0.25) {
      s.push('<line x1="' + rx(g) + '" y1="' + ry(0) + '" x2="' + rx(g) + '" y2="' + ry(1) + '" class="mlw-grid"/>');
      s.push('<line x1="' + rx(0) + '" y1="' + ry(g) + '" x2="' + rx(1) + '" y2="' + ry(g) + '" class="mlw-grid"/>');
    }
    // axes
    s.push('<line x1="' + rx(0) + '" y1="' + ry(0) + '" x2="' + rx(1) + '" y2="' + ry(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + rx(0) + '" y1="' + ry(0) + '" x2="' + rx(0) + '" y2="' + ry(1) + '" class="mlw-axis"/>');
    // ticks
    for (g = 0; g <= 1.0001; g += 0.5) {
      s.push('<text x="' + rx(g) + '" y="' + (ry(0) + 18) + '" text-anchor="middle" class="mlw-tick">' + g.toFixed(1) + '</text>');
      s.push('<text x="' + (rx(0) - 8) + '" y="' + (ry(g) + 4) + '" text-anchor="end" class="mlw-tick">' + g.toFixed(1) + '</text>');
    }
    s.push('<text x="' + rx(0.5) + '" y="' + (ry(0) + 34) + '" text-anchor="middle" class="mlw-axlabel">recall</text>');
    s.push('<text x="' + (rx(0) - 30) + '" y="' + ry(0.5) + '" text-anchor="middle" transform="rotate(-90 ' + (rx(0) - 30) + ' ' + ry(0.5) + ')" class="mlw-axlabel">precision</text>');
    // no-skill baseline
    s.push('<line x1="' + rx(0) + '" y1="' + ry(base) + '" x2="' + rx(1) + '" y2="' + ry(base) + '" class="mlw-pr-base"/>');
    s.push('<text x="' + (rx(1) - 4) + '" y="' + (ry(base) - 5) + '" text-anchor="end" class="mlw-reglabel">chance = ' + base.toFixed(2) + '</text>');
    // the curve
    var curve = prCurve(scored), pts = [];
    for (i = 0; i < curve.length; i++) pts.push(rx(curve[i].r).toFixed(2) + ',' + ry(curve[i].p).toFixed(2));
    s.push('<polyline points="' + pts.join(' ') + '" class="mlw-pr-curve"/>');
    // current operating point (falls exactly on a curve vertex)
    var cr = rec, cp = precDef ? prec : 1;
    s.push('<line x1="' + rx(cr) + '" y1="' + ry(0) + '" x2="' + rx(cr) + '" y2="' + ry(cp) + '" class="mlw-pr-guide"/>');
    s.push('<line x1="' + rx(0) + '" y1="' + ry(cp) + '" x2="' + rx(cr) + '" y2="' + ry(cp) + '" class="mlw-pr-guide"/>');
    s.push('<circle cx="' + rx(cr) + '" cy="' + ry(cp) + '" r="6.5" class="mlw-pr-here"/>');

    svg.innerHTML = s.join("");

    // ---------- side panel ----------
    set(".mlw-tp", tp); set(".mlw-fp", fp); set(".mlw-fn", fn); set(".mlw-tn", tn);
    set(".mlw-prec", precDef ? prec.toFixed(3) : "— (no positives predicted)");
    set(".mlw-rec", rec.toFixed(3));
    set(".mlw-f1", f1 !== null ? f1.toFixed(3) : "—");
    set(".mlw-acc", ((tp + tn) / (P + N)).toFixed(3));
    set(".mlw-tv", t.toFixed(2));
    set(".mlw-sv", sep.toFixed(2));
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function inStrip(l) { return l.y >= STRIP_TOP - 22 && l.y <= STRIP_BOT + 20; }

  svg.addEventListener("pointerdown", function (e) {
    var l = local(e);
    if (!inStrip(l)) return;                       // only the score strip drives the threshold
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    t = xToScore(l.x); tIn.value = String(t); render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    t = xToScore(local(e).x); tIn.value = String(t); render();
  });
  function end() { if (dragging) { dragging = false; render(); } }
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);

  tIn.addEventListener("input", function () { t = parseFloat(tIn.value); render(); });
  sIn.addEventListener("input", function () { sep = parseFloat(sIn.value); render(); });
  root.querySelector(".mlw-reset").addEventListener("click", function () {
    t = 0.5; tIn.value = "0.5"; render();
  });

  build();
  render();
});

/* ===== widget: regression.js ===== */
/* regression — drag points, watch the least-squares line refit live.
 * "Drop an outlier" adds one extreme point + a dashed ghost line (the fit WITHOUT it),
 * so the leverage effect is visible. Self-contained; registered on the MLW harness. */
MLW.register("regression", function (root) {
  var VW = 560, VH = 440, PAD = 40, X0 = 0, X1 = 100, Y0 = 0, Y1 = 100;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function yData(sy) { return Y0 + (VH - PAD - sy) / (VH - 2 * PAD) * (Y1 - Y0); }
  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  // ordinary least squares: slope, intercept, sum-of-squared-errors, R^2
  function ols(pts) {
    var n = pts.length; if (n < 2) return null;
    var sx = 0, sy = 0, sxx = 0, sxy = 0, i, p;
    for (i = 0; i < n; i++) { p = pts[i]; sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y; }
    var den = n * sxx - sx * sx; if (Math.abs(den) < 1e-9) return null;
    var m = (n * sxy - sx * sy) / den, b = (sy - m * sx) / n;
    var sse = 0, sst = 0, ybar = sy / n, e;
    for (i = 0; i < n; i++) { p = pts[i]; e = p.y - (m * p.x + b); sse += e * e; sst += (p.y - ybar) * (p.y - ybar); }
    return { m: m, b: b, sse: sse, r2: sst < 1e-9 ? 1 : 1 - sse / sst, n: n };
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive scatter plot with a live best-fit line"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">y = <b class="mlw-m">0</b>·x + <b class="mlw-b">0</b></div>' +
        '<div class="mlw-stats">' +
          '<div><span>Squared error</span><span class="mlw-sse">—</span></div>' +
          '<div><span>R² (1 = perfect)</span><span class="mlw-r2">—</span></div>' +
          '<div><span>Points</span><span class="mlw-n">0</span></div>' +
        '</div>' +
        '<p class="mlw-ghost-note" hidden>The dashed grey line is the best fit <b>without</b> ' +
        'the outlier — the gap between it and the gold line is how far one point drags the whole fit.</p>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-resid" checked> show error bars</label>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-reset" type="button">Reset</button>' +
          '<button class="mlw-outlier" type="button">Drop an outlier</button>' +
          '<button class="mlw-clear" type="button">Clear</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag a dot, or click empty space to add one. Right-click a dot to ' +
        'delete. Drag a point far to one side and watch the line swing — that’s leverage.</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var showResid = root.querySelector(".mlw-resid");
  var pts = [], dragging = null;

  function seed() {
    pts = [[12,22],[24,30],[33,28],[45,48],[52,45],[63,62],[71,58],[82,78],[90,72]]
      .map(function (a) { return { x: a[0], y: a[1] }; });
  }
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var f = ols(pts), s = [], g, i, p;
    for (g = 0; g <= 100; g += 20) {
      s.push('<line x1="' + px(g) + '" y1="' + py(0) + '" x2="' + px(g) + '" y2="' + py(100) + '" class="mlw-grid"/>');
      s.push('<line x1="' + px(0) + '" y1="' + py(g) + '" x2="' + px(100) + '" y2="' + py(g) + '" class="mlw-grid"/>');
    }
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(100) + '" y2="' + py(0) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(0) + '" y2="' + py(100) + '" class="mlw-axis"/>');
    if (f && showResid.checked) {
      for (i = 0; i < pts.length; i++) { p = pts[i];
        var yh = f.m * p.x + f.b;
        s.push('<line x1="' + px(p.x) + '" y1="' + py(p.y) + '" x2="' + px(p.x) + '" y2="' + py(yh) + '" class="mlw-resid-line"/>');
      }
    }
    var hasOut = false;
    for (i = 0; i < pts.length; i++) { if (pts[i].outlier) { hasOut = true; break; } }
    if (hasOut) {                                  // ghost = fit with the outlier removed
      var clean = [];
      for (i = 0; i < pts.length; i++) { if (!pts[i].outlier) clean.push(pts[i]); }
      var fg = ols(clean);
      if (fg) s.push('<line x1="' + px(X0) + '" y1="' + py(fg.m * X0 + fg.b) +
                     '" x2="' + px(X1) + '" y2="' + py(fg.m * X1 + fg.b) + '" class="mlw-ghost"/>');
    }
    if (f) {
      var yL = f.m * X0 + f.b, yR = f.m * X1 + f.b;
      s.push('<line x1="' + px(X0) + '" y1="' + py(yL) + '" x2="' + px(X1) + '" y2="' + py(yR) + '" class="mlw-line"/>');
    }
    for (i = 0; i < pts.length; i++) { p = pts[i];
      var out = !!p.outlier, big = out || dragging === i;
      s.push('<circle cx="' + px(p.x) + '" cy="' + py(p.y) + '" r="' + (big ? 9 : 7) +
             '" class="mlw-dot' + (dragging === i ? " mlw-dot--drag" : "") + (out ? " mlw-dot--out" : "") + '"/>');
      if (out) s.push('<text x="' + px(p.x) + '" y="' + (py(p.y) - 14) +
                      '" text-anchor="middle" class="mlw-outlabel">outlier</text>');
    }
    svg.innerHTML = s.join("");
    set(".mlw-n", pts.length);
    set(".mlw-m", f ? f.m.toFixed(2) : "—");
    set(".mlw-b", f ? f.b.toFixed(1) : "—");
    set(".mlw-sse", f ? f.sse.toFixed(0) : "—");
    set(".mlw-r2", f ? f.r2.toFixed(3) : "—");
    root.querySelector(".mlw-ghost-note").hidden = !hasOut;
    root.querySelector(".mlw-outlier").textContent = hasOut ? "Remove the outlier" : "Drop an outlier";
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function hit(sx, sy) {
    for (var i = pts.length - 1; i >= 0; i--)
      if (Math.hypot(px(pts[i].x) - sx, py(pts[i].y) - sy) < 14) return i;
    return -1;
  }

  svg.addEventListener("pointerdown", function (e) {
    var l = local(e), i = hit(l.x, l.y);
    if (i < 0) {                                   // empty space -> add a point and grab it
      if (l.x < PAD || l.y > VH - PAD || l.x > VW - PAD || l.y < PAD) return;
      pts.push({ x: clamp(xData(l.x)), y: clamp(yData(l.y)) });
      i = pts.length - 1;
    }
    dragging = i;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (dragging === null) return;
    var l = local(e);
    pts[dragging] = { x: clamp(xData(l.x)), y: clamp(yData(l.y)) };
    render();
  });
  function endDrag() { if (dragging !== null) { dragging = null; render(); } }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  svg.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    var l = local(e), i = hit(l.x, l.y);
    if (i >= 0) { pts.splice(i, 1); render(); }
  });

  showResid.addEventListener("change", render);
  root.querySelector(".mlw-reset").addEventListener("click", function () { seed(); render(); });
  root.querySelector(".mlw-clear").addEventListener("click", function () { pts = []; render(); });
  root.querySelector(".mlw-outlier").addEventListener("click", function () {
    var idx = -1, i;                               // toggle a single, distinct outlier point
    for (i = 0; i < pts.length; i++) { if (pts[i].outlier) { idx = i; break; } }
    if (idx >= 0) pts.splice(idx, 1);
    else pts.push({ x: 90, y: 12, outlier: true }); // far-right + low -> high leverage
    render();
  });

  seed(); render();
});

/* ===== widget: rl-gridworld.js ===== */
/* rl-gridworld — the Mars-rover MDP from C3W3: 6 states on a line, terminal rewards at
 * the two ends, actions {left,right}. Drag an end cell to set its reward; slide the
 * discount γ, the per-step reward, and ε. The EXACT optimal state values V*(s) and
 * action values Q*(s,a) are recomputed by value iteration (repeated Bellman updates)
 * on every change — no animation, the true converged state is redrawn each time. Arrows
 * show the greedy policy π(s)=argmaxₐQ*(s,a); the highlighted track is the greedy run
 * from the start state S4. ε feeds a separate policy-evaluation pass so the "exploration
 * cost" (return of an ε-greedy policy vs optimal) is exact too. Self-contained ES5;
 * registered on the MLW harness. */
MLW.register("rl-gridworld", function (root) {
  var N = 6, VW = 560, VH = 440, PAD = 30;
  var cellW = (VW - 2 * PAD) / N, gap = 8;
  var rowY = 62, rowH = 178, trackY = 312;

  function cx(i) { return PAD + (i + 0.5) * cellW; }
  function rectX(i) { return PAD + i * cellW + gap / 2; }
  var rectW = cellW - gap;
  function isTerm(i) { return i === 0 || i === N - 1; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function fmt(v) { if (!isFinite(v)) return "—"; var r = Math.round(v); return Math.abs(v - r) < 0.05 ? "" + r : v.toFixed(1); }

  // ---- the MDP ----
  function rewards(RL, RR, step) {
    var R = [], i; for (i = 0; i < N; i++) R[i] = step; R[0] = RL; R[N - 1] = RR; return R;
  }
  // Value iteration: Bellman optimality updates to convergence → exact V*, Q*, greedy π.
  // Deterministic transitions: action left → s-1, right → s+1; terminals absorb (V=R).
  function valueIter(R, gamma) {
    var V = [], i, it; for (i = 0; i < N; i++) V[i] = isTerm(i) ? R[i] : 0;
    var sweeps = 0;
    for (it = 0; it < 5000; it++) {
      var maxd = 0;
      for (i = 0; i < N; i++) {
        if (isTerm(i)) continue;
        var nv = R[i] + gamma * Math.max(V[i - 1], V[i + 1]);
        maxd = Math.max(maxd, Math.abs(nv - V[i])); V[i] = nv;
      }
      sweeps++;
      if (maxd < 1e-9) break;
    }
    var Q = [], pol = [];
    for (i = 0; i < N; i++) {
      if (isTerm(i)) { Q[i] = null; pol[i] = null; continue; }
      var ql = R[i] + gamma * V[i - 1], qr = R[i] + gamma * V[i + 1];
      Q[i] = [ql, qr]; pol[i] = qr > ql ? 1 : 0;   // 0 = left, 1 = right (ties → left)
    }
    return { V: V, Q: Q, pol: pol, sweeps: sweeps };
  }
  // Exact value of FOLLOWING an ε-greedy policy (greedy action w.p. 1-ε+ε/2, other w.p. ε/2).
  // Policy evaluation by iteration; at ε=0 this equals V*, so the gap = the cost of exploring.
  function evalEps(R, gamma, pol, eps) {
    var V = [], i, it; for (i = 0; i < N; i++) V[i] = isTerm(i) ? R[i] : 0;
    var pg = 1 - eps + eps / 2, po = eps / 2;
    for (it = 0; it < 5000; it++) {
      var maxd = 0;
      for (i = 0; i < N; i++) {
        if (isTerm(i)) continue;
        var g = pol[i], vg = V[g === 1 ? i + 1 : i - 1], vo = V[g === 1 ? i - 1 : i + 1];
        var nv = R[i] + gamma * (pg * vg + po * vo);
        maxd = Math.max(maxd, Math.abs(nv - V[i])); V[i] = nv;
      }
      if (maxd < 1e-9) break;
    }
    return V;
  }
  // Greedy trajectory from the start state (S4 = index 3) until a terminal.
  function traj(pol) {
    var path = [3], s = 3, guard = 0;
    while (!isTerm(s) && guard++ < 50) { s = pol[s] === 1 ? s + 1 : s - 1; path.push(s); }
    return path;
  }

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot rlg-svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Mars-rover value iteration: state values, action values and greedy policy"></svg>' +
      '<div class="mlw-side">' +
        '<div class="rlg-ctl"><label>&#947; (discount) = <b class="rlg-g">0.50</b>' +
          '<input type="range" class="rlg-gs" min="0" max="99" value="50"></label>' +
          '<span class="rlg-sub">patience &mdash; 0: only reward now, &rarr;1: far-sighted</span></div>' +
        '<div class="rlg-ctl"><label>step reward R(mid) = <b class="rlg-c">0</b>' +
          '<input type="range" class="rlg-cs" min="-20" max="0" value="0"></label>' +
          '<span class="rlg-sub">reward paid in every non-terminal state</span></div>' +
        '<div class="rlg-ctl"><label>&#949; (exploration) = <b class="rlg-e">0.00</b>' +
          '<input type="range" class="rlg-es" min="0" max="100" value="0"></label>' +
          '<span class="rlg-sub">chance of a random action instead of greedy</span></div>' +
        '<div class="mlw-stats">' +
          '<div><span>Left / right reward</span><span class="rlg-rew">—</span></div>' +
          '<div><span>Optimal return from S4</span><span class="rlg-vopt">—</span></div>' +
          '<div><span>&#949;-greedy return from S4</span><span class="rlg-veps">—</span></div>' +
          '<div><span>Cost of exploring</span><span class="rlg-gap">—</span></div>' +
          '<div><span>Value-iteration sweeps</span><span class="rlg-sweeps">—</span></div>' +
        '</div>' +
        '<div class="rlg-legend">' +
          '<span><i class="rlg-key rlg-key-v"></i>V*(s) state value</span>' +
          '<span><i class="rlg-key rlg-key-pol"></i>greedy policy / run</span>' +
          '<span><i class="rlg-key rlg-key-q"></i>Q*(s,a) action value</span>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="rlg-reset" type="button">Ng’s example</button>' +
          '<button class="rlg-flip" type="button">Flip richer end</button>' +
        '</div>' +
        '<p class="mlw-tip">Each cell shows the exact optimal value <b>V*(s)=max<sub>a</sub>Q*(s,a)</b> ' +
        'and both action values from the Bellman equation <b>Q(s,a)=R(s)+&#947;&#183;maxV(s&#8242;)</b> ' +
        '(the greedy one is highlighted). <b>Drag an end cell up/down</b> to change its terminal reward; ' +
        'slide &#947;, the step reward, and &#949;. Everything recomputes by value iteration &mdash; ' +
        'the arrows are the greedy policy, the track is the run from the start S4. &#949; changes only the ' +
        '<i>return while exploring</i> (the panel), not the optimal values.</p>' +
      '</div>' +
    '</div>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".rlg-svg");
  var gs = root.querySelector(".rlg-gs"), cs = root.querySelector(".rlg-cs"), es = root.querySelector(".rlg-es");
  var RL = 100, RR = 40, dragging = null;
  function set(cls, v) { root.querySelector(cls).textContent = v; }
  function gamma() { return (+gs.value) / 100; }
  function step() { return +cs.value; }
  function eps() { return (+es.value) / 100; }

  function esc(s) { return s; }

  function render() {
    var g = gamma(), st = step(), ep = eps();
    var R = rewards(RL, RR, st), opt = valueIter(R, g), veps = evalEps(R, g, opt.pol, ep), tj = traj(opt.pol);
    var s = [], i, cxi, gtxt;

    // ---- state cells ----
    for (i = 0; i < N; i++) {
      var rx = rectX(i), term = isTerm(i);
      s.push('<rect x="' + rx.toFixed(1) + '" y="' + rowY + '" width="' + rectW.toFixed(1) +
             '" height="' + rowH + '" rx="9" class="rlg-cell' + (term ? " rlg-cell--term" : "") + '"/>');
      // state label
      s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 20) + '" text-anchor="middle" class="rlg-slab">S' + (i + 1) + '</text>');

      if (term) {
        // reward as a draggable liquid level (0..100)
        var base = rowY + rowH - 8, span = rowH - 34, fillH = clamp(R[i], 0, 100) / 100 * span;
        s.push('<rect x="' + (rx + 6).toFixed(1) + '" y="' + (base - fillH).toFixed(1) + '" width="' + (rectW - 12).toFixed(1) +
               '" height="' + fillH.toFixed(1) + '" rx="5" class="rlg-fill"/>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + rowH * 0.5) + '" text-anchor="middle" class="rlg-rew-num">' + fmt(R[i]) + '</text>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + rowH * 0.5 + 18) + '" text-anchor="middle" class="rlg-sub-svg">terminal reward</text>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + rowH - 12) + '" text-anchor="middle" class="rlg-drag">drag ⇅</text>');
      } else {
        // R(s) reminder + greedy arrow + V + both Q values
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 36) + '" text-anchor="middle" class="rlg-sub-svg">R(s) = ' + fmt(st) + '</text>');
        gtxt = opt.pol[i] === 1 ? "→" : "←";
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 66) + '" text-anchor="middle" class="rlg-parrow">' + gtxt + '</text>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 108) + '" text-anchor="middle" class="rlg-v">' + fmt(opt.V[i]) + '</text>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 124) + '" text-anchor="middle" class="rlg-sub-svg">V*(s)</text>');
        var ql = opt.Q[i][0], qr = opt.Q[i][1], best = opt.pol[i];
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 148) + '" text-anchor="middle" class="rlg-q' + (best === 0 ? " rlg-q--best" : "") + '">← ' + fmt(ql) + '</text>');
        s.push('<text x="' + cx(i).toFixed(1) + '" y="' + (rowY + 166) + '" text-anchor="middle" class="rlg-q' + (best === 1 ? " rlg-q--best" : "") + '">→ ' + fmt(qr) + '</text>');
      }
    }

    // ---- greedy run track from the start state ----
    s.push('<text x="' + PAD + '" y="' + (trackY - 20) + '" class="rlg-tracklab">greedy run from start (S4)</text>');
    s.push('<line x1="' + cx(0).toFixed(1) + '" y1="' + trackY + '" x2="' + cx(N - 1).toFixed(1) + '" y2="' + trackY + '" class="rlg-trackbase"/>');
    // path segments (static, discrete hops)
    for (i = 0; i < tj.length - 1; i++) {
      var a = tj[i], b = tj[i + 1], dir = b > a ? 1 : -1;
      var x1 = cx(a) + dir * 13, x2 = cx(b) - dir * 13;
      s.push('<line x1="' + x1.toFixed(1) + '" y1="' + trackY + '" x2="' + x2.toFixed(1) + '" y2="' + trackY + '" class="rlg-trackpath"/>');
      s.push('<polygon points="' + x2.toFixed(1) + ',' + trackY + ' ' + (x2 - dir * 8).toFixed(1) + ',' + (trackY - 4.5) +
             ' ' + (x2 - dir * 8).toFixed(1) + ',' + (trackY + 4.5) + '" class="rlg-trackhead"/>');
    }
    for (i = 0; i < N; i++) {
      cxi = cx(i);
      s.push('<circle cx="' + cxi.toFixed(1) + '" cy="' + trackY + '" r="5" class="rlg-tdot' + (isTerm(i) ? " rlg-tdot--term" : "") + '"/>');
      s.push('<text x="' + cxi.toFixed(1) + '" y="' + (trackY + 20) + '" text-anchor="middle" class="rlg-tsub">S' + (i + 1) + '</text>');
    }
    s.push('<circle cx="' + cx(3).toFixed(1) + '" cy="' + trackY + '" r="9" class="rlg-tstart"/>');
    s.push('<text x="' + cx(3).toFixed(1) + '" y="' + (trackY - 12) + '" text-anchor="middle" class="rlg-tsub">start</text>');

    svg.innerHTML = s.join(esc(""));

    // ---- side panel ----
    set(".rlg-g", g.toFixed(2));
    set(".rlg-c", fmt(st));
    set(".rlg-e", ep.toFixed(2));
    set(".rlg-rew", fmt(RL) + " / " + fmt(RR));
    var vo = opt.V[3], ve = veps[3];
    set(".rlg-vopt", fmt(vo));
    set(".rlg-veps", fmt(ve));
    set(".rlg-gap", ep === 0 ? "0 (greedy)" : fmt(vo - ve));
    set(".rlg-sweeps", opt.sweeps);
    root.querySelector(".rlg-gap").className = "rlg-gap" + (vo - ve > 0.05 ? " rlg-warnval" : "");
  }

  // ---- drag an end cell to set its reward ----
  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function rewardFromY(y) {
    var frac = (rowY + rowH - 8 - y) / (rowH - 34);
    return clamp(Math.round(frac * 100 / 5) * 5, 0, 100);   // snap to steps of 5
  }
  function hitEnd(l) {
    if (l.y < rowY || l.y > rowY + rowH) return null;
    var i = Math.floor((l.x - PAD) / cellW);
    if (i <= 0) return "L";
    if (i >= N - 1) return "R";
    return null;
  }
  svg.addEventListener("pointerdown", function (e) {
    var l = local(e), h = hitEnd(l);
    if (!h) return;
    dragging = h;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    if (h === "L") RL = rewardFromY(l.y); else RR = rewardFromY(l.y);
    render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var l = local(e);
    if (dragging === "L") RL = rewardFromY(l.y); else RR = rewardFromY(l.y);
    render();
  });
  function endDrag() { dragging = null; }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  gs.addEventListener("input", render);
  cs.addEventListener("input", render);
  es.addEventListener("input", render);
  root.querySelector(".rlg-reset").addEventListener("click", function () {
    RL = 100; RR = 40; gs.value = 50; cs.value = 0; es.value = 0; render();
  });
  root.querySelector(".rlg-flip").addEventListener("click", function () {
    var t = RL; RL = RR; RR = t; render();
  });

  render();
});

/* ===== widget: sigmoid.js ===== */
/* sigmoid — the logistic function σ(w·x + b) squashes any input into (0,1).
 * Drag the w (steepness) and b (shift) sliders; the true curve is re-sampled and
 * redrawn as an exact polyline (no animation). The dashed 0.5 line is the decision
 * threshold and the vertical marker is the decision point x* = -b/w, where z = 0.
 * Scrub anywhere on the plot to move the query point and read σ off the curve.
 * Self-contained; registered on the MLW harness. */
MLW.register("sigmoid", function (root) {
  var VW = 560, VH = 440, PAD = 44;
  var X0 = -10, X1 = 10, Y0 = 0, Y1 = 1;
  function px(x) { return PAD + (x - X0) / (X1 - X0) * (VW - 2 * PAD); }
  function py(y) { return VH - PAD - (y - Y0) / (Y1 - Y0) * (VH - 2 * PAD); }
  function xData(sx) { return X0 + (sx - PAD) / (VW - 2 * PAD) * (X1 - X0); }
  function clampX(x) { return Math.max(X0, Math.min(X1, x)); }
  function sig(z) { return 1 / (1 + Math.exp(-z)); }

  var w = 1, b = 0, qx = 0, showReg = true, dragging = false;

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive logistic sigmoid curve with adjustable weight and bias"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">σ(z) = 1 / (1 + e<sup>−z</sup>),&nbsp; z = <b class="mlw-w">1</b>·x + <b class="mlw-b">0</b></div>' +
        '<div class="mlw-sliders">' +
          '<label>weight&nbsp;w <span class="mlw-val mlw-wv">1.00</span>' +
            '<input type="range" class="mlw-w-in" min="-3" max="3" step="0.05" value="1"></label>' +
          '<label>bias&nbsp;b <span class="mlw-val mlw-bv">0.00</span>' +
            '<input type="range" class="mlw-b-in" min="-8" max="8" step="0.1" value="0"></label>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>decision point x* = −b/w</span><span class="mlw-xstar">0.00</span></div>' +
          '<div><span>query x</span><span class="mlw-qx">0.00</span></div>' +
          '<div><span>σ(z) at query</span><span class="mlw-qs">0.500</span></div>' +
          '<div><span>predict (σ ≥ 0.5 → 1)</span><span class="mlw-pred">1</span></div>' +
        '</div>' +
        '<label class="mlw-tog"><input type="checkbox" class="mlw-reg" checked> shade decision regions</label>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-reset" type="button">Reset (w=1, b=0)</button>' +
        '</div>' +
        '<p class="mlw-tip">w steepens the curve (flip its sign to mirror it); b slides it left/right. ' +
        'The output is always squeezed into (0,1). Scrub the plot to move the pink query point.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">The logistic sigmoid turns a linear score z = w·x + b into a probability. ' +
    'It crosses <code>0.5</code> exactly where z = 0, i.e. at x* = −b/w — that vertical line is the ' +
    'decision boundary a logistic classifier would use.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var wIn = root.querySelector(".mlw-w-in");
  var bIn = root.querySelector(".mlw-b-in");
  var regIn = root.querySelector(".mlw-reg");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var s = [], g, i, x, xstar = (w === 0) ? null : -b / w;

    // grid
    for (g = X0; g <= X1; g += 5)
      s.push('<line x1="' + px(g) + '" y1="' + py(Y0) + '" x2="' + px(g) + '" y2="' + py(Y1) + '" class="mlw-grid"/>');
    for (g = 0; g <= 1.0001; g += 0.25)
      s.push('<line x1="' + px(X0) + '" y1="' + py(g) + '" x2="' + px(X1) + '" y2="' + py(g) + '" class="mlw-grid"/>');

    // decision-region shading (predict 1 where z > 0)
    if (showReg && w !== 0 && xstar > X0 && xstar < X1) {
      var lo = (w > 0) ? xstar : X0, hi = (w > 0) ? X1 : xstar;
      s.push('<rect x="' + px(lo) + '" y="' + py(Y1) + '" width="' + (px(hi) - px(lo)) +
             '" height="' + (py(Y0) - py(Y1)) + '" class="mlw-sig-region"/>');
      s.push('<text x="' + (px(w > 0 ? hi : lo) + (w > 0 ? -6 : 6)) + '" y="' + (py(Y1) + 16) +
             '" text-anchor="' + (w > 0 ? "end" : "start") + '" class="mlw-reglabel">predict 1</text>');
    }

    // axes: y-axis at x=0, x-axis at y=0
    s.push('<line x1="' + px(0) + '" y1="' + py(Y0) + '" x2="' + px(0) + '" y2="' + py(Y1) + '" class="mlw-axis"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(Y0) + '" x2="' + px(X1) + '" y2="' + py(Y0) + '" class="mlw-axis"/>');

    // tick labels
    s.push('<text x="' + (px(X1) - 2) + '" y="' + (py(Y0) + 18) + '" text-anchor="end" class="mlw-tick">x</text>');
    var yt = [0, 0.5, 1], lbl;
    for (i = 0; i < yt.length; i++) {
      lbl = yt[i].toFixed(1);
      s.push('<text x="' + (px(X0) - 8) + '" y="' + (py(yt[i]) + 4) + '" text-anchor="end" class="mlw-tick">' + lbl + '</text>');
    }

    // 0.5 decision threshold
    s.push('<line x1="' + px(X0) + '" y1="' + py(0.5) + '" x2="' + px(X1) + '" y2="' + py(0.5) + '" class="mlw-sig-thresh"/>');

    // exact sigmoid curve as a dense static polyline
    var pts = [], N = 200;
    for (i = 0; i <= N; i++) {
      x = X0 + (X1 - X0) * i / N;
      pts.push(px(x).toFixed(2) + "," + py(sig(w * x + b)).toFixed(2));
    }
    s.push('<polyline points="' + pts.join(" ") + '" class="mlw-sig-curve"/>');

    // decision point x* (vertical line + dot on the curve at σ=0.5)
    if (xstar !== null && xstar >= X0 && xstar <= X1) {
      s.push('<line x1="' + px(xstar) + '" y1="' + py(Y0) + '" x2="' + px(xstar) + '" y2="' + py(Y1) + '" class="mlw-sig-dec"/>');
      s.push('<circle cx="' + px(xstar) + '" cy="' + py(0.5) + '" r="5" class="mlw-sig-dec-dot"/>');
      s.push('<text x="' + (px(xstar) + 6) + '" y="' + (py(Y1) + 14) + '" class="mlw-declabel">x* = ' + xstar.toFixed(2) + '</text>');
    }

    // query point: read σ off the curve at qx
    var qy = sig(w * qx + b);
    s.push('<line x1="' + px(qx) + '" y1="' + py(Y0) + '" x2="' + px(qx) + '" y2="' + py(qy) + '" class="mlw-sig-drop"/>');
    s.push('<line x1="' + px(X0) + '" y1="' + py(qy) + '" x2="' + px(qx) + '" y2="' + py(qy) + '" class="mlw-sig-drop"/>');
    s.push('<circle cx="' + px(qx) + '" cy="' + py(qy) + '" r="7" class="mlw-sig-q' + (dragging ? " mlw-sig-q--drag" : "") + '"/>');

    svg.innerHTML = s.join("");

    set(".mlw-w", w.toFixed(2));
    set(".mlw-b", b.toFixed(2));
    set(".mlw-wv", w.toFixed(2));
    set(".mlw-bv", b.toFixed(2));
    set(".mlw-xstar", xstar === null ? "— (w = 0, no boundary)" : xstar.toFixed(2));
    set(".mlw-qx", qx.toFixed(2));
    set(".mlw-qs", qy.toFixed(3));
    set(".mlw-pred", qy >= 0.5 ? "1" : "0");
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  function scrub(e) { qx = clampX(xData(local(e).x)); render(); }

  svg.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    scrub(e);
  });
  svg.addEventListener("pointermove", function (e) { if (dragging) scrub(e); });
  function end() { if (dragging) { dragging = false; render(); } }
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);

  wIn.addEventListener("input", function () { w = parseFloat(wIn.value); render(); });
  bIn.addEventListener("input", function () { b = parseFloat(bIn.value); render(); });
  regIn.addEventListener("change", function () { showReg = regIn.checked; render(); });
  root.querySelector(".mlw-reset").addEventListener("click", function () {
    w = 1; b = 0; qx = 0; wIn.value = "1"; bIn.value = "0"; render();
  });

  render();
});

/* ===== widget: softmax.js ===== */
/* softmax — drag K raw logits (left bar group) and watch the softmax probabilities
 * (right bar group) recompute exactly. a_j = e^{z_j/T} / Σ_k e^{z_k/T}; the a_j always
 * sum to 1, so raising one logit STEALS probability mass from the others. The temperature
 * T flattens (T↑ → uniform) or sharpens (T↓ → winner-take-all) the distribution. Every
 * control re-renders the true computed state — no animation. Self-contained; MLW harness. */
MLW.register("softmax", function (root) {
  var VW = 560, VH = 440;
  var TOP = 66, BOT = 372;                 // vertical plot band (shared by both groups)
  var LX0 = 46, RX0 = 300, GW = 214;       // left / right group left-edge + group width
  var SLOT = GW / 4, BARW = 34;            // 4 classes per group
  var ZMIN = -8, ZMAX = 8;                 // draggable logit range
  var LABELS = ["A", "B", "C", "D"];

  function zY(z) { return BOT - (z - ZMIN) / (ZMAX - ZMIN) * (BOT - TOP); }
  function zData(sy) { return ZMIN + (BOT - sy) / (BOT - TOP) * (ZMAX - ZMIN); }
  function pY(p) { return BOT - p * (BOT - TOP); }
  function cxL(j) { return LX0 + (j + 0.5) * SLOT; }
  function cxR(j) { return RX0 + (j + 0.5) * SLOT; }
  function clampZ(z) { return Math.max(ZMIN, Math.min(ZMAX, z)); }

  // numerically-stable softmax with temperature
  function softmax(zs, T) {
    var i, m = -Infinity, e = [], sum = 0;
    for (i = 0; i < zs.length; i++) if (zs[i] > m) m = zs[i];
    for (i = 0; i < zs.length; i++) { e[i] = Math.exp((zs[i] - m) / T); sum += e[i]; }
    var a = [];
    for (i = 0; i < zs.length; i++) a[i] = e[i] / sum;
    return a;
  }
  function argmax(a) { var i, k = 0; for (i = 1; i < a.length; i++) if (a[i] > a[k]) k = i; return k; }

  var z = [1.5, 0.8, 0.2, -0.5], T = 1, dragging = null;

  var PANEL =
    '<div class="mlw-stage">' +
      '<svg class="mlw-plot" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" ' +
        'aria-label="Interactive softmax: drag four logit bars and read off the probability bars"></svg>' +
      '<div class="mlw-side">' +
        '<div class="mlw-eq">a<sub>j</sub> = e<sup>z<sub>j</sub>/T</sup> / Σ<sub>k</sub> e<sup>z<sub>k</sub>/T</sup></div>' +
        '<div class="mlw-sliders">' +
          '<label>temperature&nbsp;T <span class="mlw-val mlw-tv">1.00</span>' +
            '<input type="range" class="mlw-t-in" min="0.25" max="4" step="0.05" value="1"></label>' +
        '</div>' +
        '<div class="mlw-stats">' +
          '<div><span>predicted class (argmax)</span><span class="mlw-arg">A</span></div>' +
          '<div><span>its probability</span><span class="mlw-max">—</span></div>' +
          '<div><span>Σ a<sub>j</sub> (always 1)</span><span class="mlw-sum">1.000</span></div>' +
        '</div>' +
        '<div class="mlw-btns">' +
          '<button class="mlw-reset" type="button">Reset</button>' +
          '<button class="mlw-flat" type="button">Flatten (z=0)</button>' +
        '</div>' +
        '<p class="mlw-tip">Drag any left-hand bar up/down to change its raw logit z. ' +
        'The right-hand probabilities recompute exactly and re-normalise to 1 — push one up ' +
        'and it <b>steals</b> from the rest. Lower T sharpens toward the winner; higher T ' +
        'flattens toward uniform.</p>' +
      '</div>' +
    '</div>' +
    '<p class="mlw-caption">Softmax turns K unbounded scores (logits) into a probability ' +
    'distribution over K classes. Only the <em>differences</em> between logits matter, and ' +
    'because the outputs must sum to 1, the classes compete for a fixed budget of probability.</p>';

  root.innerHTML = PANEL;
  var svg = root.querySelector(".mlw-plot");
  var tIn = root.querySelector(".mlw-t-in");
  function set(cls, v) { root.querySelector(cls).textContent = v; }

  function render() {
    var s = [], i, a = softmax(z, T), am = argmax(a), sum = 0;
    for (i = 0; i < a.length; i++) sum += a[i];

    // group titles
    s.push('<text x="' + (LX0 + GW / 2) + '" y="' + (TOP - 30) + '" text-anchor="middle" class="mlw-sm-title">logits  z (drag)</text>');
    s.push('<text x="' + (RX0 + GW / 2) + '" y="' + (TOP - 30) + '" text-anchor="middle" class="mlw-sm-title">softmax  P  (Σ = 1)</text>');

    // ---- left group: logit gridlines + zero axis + tick labels ----
    var zt = [-8, -4, 0, 4, 8];
    for (i = 0; i < zt.length; i++) {
      s.push('<line x1="' + LX0 + '" y1="' + zY(zt[i]) + '" x2="' + (LX0 + GW) + '" y2="' + zY(zt[i]) +
             '" class="' + (zt[i] === 0 ? "mlw-axis" : "mlw-grid") + '"/>');
      s.push('<text x="' + (LX0 - 7) + '" y="' + (zY(zt[i]) + 4) + '" text-anchor="end" class="mlw-tick">' + zt[i] + '</text>');
    }
    // ---- right group: probability gridlines + baseline + tick labels ----
    var pt = [0, 0.25, 0.5, 0.75, 1];
    for (i = 0; i < pt.length; i++) {
      s.push('<line x1="' + RX0 + '" y1="' + pY(pt[i]) + '" x2="' + (RX0 + GW) + '" y2="' + pY(pt[i]) +
             '" class="' + (pt[i] === 0 ? "mlw-axis" : "mlw-grid") + '"/>');
      if (i % 2 === 0)
        s.push('<text x="' + (RX0 + GW + 7) + '" y="' + (pY(pt[i]) + 4) + '" text-anchor="start" class="mlw-tick">' + pt[i].toFixed(1) + '</text>');
    }

    // ---- logit bars (draggable) ----
    for (i = 0; i < z.length; i++) {
      var top = Math.min(zY(0), zY(z[i])), h = Math.abs(zY(z[i]) - zY(0));
      s.push('<rect x="' + (cxL(i) - BARW / 2) + '" y="' + top + '" width="' + BARW + '" height="' + Math.max(h, 0.5) +
             '" rx="3" class="mlw-sm-logit' + (dragging === i ? " mlw-sm-logit--sel" : "") + '"/>');
      // grab handle line at the bar's top edge for affordance
      s.push('<line x1="' + (cxL(i) - BARW / 2) + '" y1="' + zY(z[i]) + '" x2="' + (cxL(i) + BARW / 2) + '" y2="' + zY(z[i]) + '" class="mlw-sm-handle"/>');
      var above = z[i] >= 0;
      s.push('<text x="' + cxL(i) + '" y="' + (above ? zY(z[i]) - 7 : zY(z[i]) + 15) + '" text-anchor="middle" class="mlw-sm-vlab">' + z[i].toFixed(1) + '</text>');
      s.push('<text x="' + cxL(i) + '" y="' + (BOT + 22) + '" text-anchor="middle" class="mlw-sm-clab">' + LABELS[i] + '</text>');
    }

    // ---- probability bars (computed, static) ----
    for (i = 0; i < a.length; i++) {
      var ph = BOT - pY(a[i]);
      s.push('<rect x="' + (cxR(i) - BARW / 2) + '" y="' + pY(a[i]) + '" width="' + BARW + '" height="' + Math.max(ph, 0.5) +
             '" rx="3" class="mlw-sm-prob' + (i === am ? " mlw-sm-prob--max" : "") + '"/>');
      s.push('<text x="' + cxR(i) + '" y="' + (pY(a[i]) - 7) + '" text-anchor="middle" class="mlw-sm-vlab">' + (a[i] * 100).toFixed(0) + '%</text>');
      s.push('<text x="' + cxR(i) + '" y="' + (BOT + 22) + '" text-anchor="middle" class="mlw-sm-clab' + (i === am ? " mlw-sm-clab--max" : "") + '">' + LABELS[i] + '</text>');
    }
    // predicted-class marker under the argmax probability bar
    s.push('<text x="' + cxR(am) + '" y="' + (BOT + 38) + '" text-anchor="middle" class="mlw-sm-predict">predict</text>');

    svg.innerHTML = s.join("");

    set(".mlw-tv", T.toFixed(2));
    set(".mlw-arg", LABELS[am]);
    set(".mlw-max", a[am].toFixed(3));
    set(".mlw-sum", sum.toFixed(3));
  }

  function local(e) {
    var r = svg.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * VW, y: (e.clientY - r.top) / r.height * VH };
  }
  // which draggable logit bar (if any) does this x fall under?
  function pick(sx) {
    if (sx < LX0 || sx > LX0 + GW) return -1;
    var j = Math.floor((sx - LX0) / SLOT);
    return (j < 0 || j > 3) ? -1 : j;
  }

  svg.addEventListener("pointerdown", function (e) {
    var l = local(e), j = pick(l.x);
    if (j < 0) return;
    dragging = j;
    z[j] = clampZ(zData(l.y));
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
    render();
  });
  svg.addEventListener("pointermove", function (e) {
    if (dragging === null) return;
    z[dragging] = clampZ(zData(local(e).y));
    render();
  });
  function endDrag() { if (dragging !== null) { dragging = null; render(); } }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  tIn.addEventListener("input", function () { T = parseFloat(tIn.value); render(); });
  root.querySelector(".mlw-reset").addEventListener("click", function () {
    z = [1.5, 0.8, 0.2, -0.5]; T = 1; tIn.value = "1"; render();
  });
  root.querySelector(".mlw-flat").addEventListener("click", function () {
    z = [0, 0, 0, 0]; render();     // equal logits -> exactly uniform 25% each
  });

  render();
});
