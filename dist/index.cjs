function A() {
  return (
    (A =
      Object.assign ||
      function (A) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (A[r] = t[r]);
        }
        return A;
      }),
    A.apply(this, arguments)
  );
}
const e = Math.min,
  t = Math.max,
  r = Math.round,
  n = (A) => ({ x: A, y: A }),
  o = { left: "right", right: "left", bottom: "top", top: "bottom" },
  B = { start: "end", end: "start" };
function s(A, r, n) {
  return t(A, e(r, n));
}
function i(A, e) {
  return "function" == typeof A ? A(e) : A;
}
function a(A) {
  return A.split("-")[0];
}
function c(A) {
  return A.split("-")[1];
}
function l(A) {
  return "x" === A ? "y" : "x";
}
function u(A) {
  return "y" === A ? "height" : "width";
}
const g = /*#__PURE__*/ new Set(["top", "bottom"]);
function w(A) {
  return g.has(a(A)) ? "y" : "x";
}
function Q(A) {
  return l(w(A));
}
function d(A) {
  return A.replace(/start|end/g, (A) => B[A]);
}
const C = ["left", "right"],
  U = ["right", "left"],
  F = ["top", "bottom"],
  h = ["bottom", "top"];
function f(A) {
  return A.replace(/left|right|bottom|top/g, (A) => o[A]);
}
function p(A) {
  const { x: e, y: t, width: r, height: n } = A;
  return {
    width: r,
    height: n,
    top: t,
    left: e,
    right: e + r,
    bottom: t + n,
    x: e,
    y: t,
  };
}
function H(A, e, t) {
  let { reference: r, floating: n } = A;
  const o = w(e),
    B = Q(e),
    s = u(B),
    i = a(e),
    l = "y" === o,
    g = r.x + r.width / 2 - n.width / 2,
    d = r.y + r.height / 2 - n.height / 2,
    C = r[s] / 2 - n[s] / 2;
  let U;
  switch (i) {
    case "top":
      U = { x: g, y: r.y - n.height };
      break;
    case "bottom":
      U = { x: g, y: r.y + r.height };
      break;
    case "right":
      U = { x: r.x + r.width, y: d };
      break;
    case "left":
      U = { x: r.x - n.width, y: d };
      break;
    default:
      U = { x: r.x, y: r.y };
  }
  switch (c(e)) {
    case "start":
      U[B] -= C * (t && l ? -1 : 1);
      break;
    case "end":
      U[B] += C * (t && l ? -1 : 1);
  }
  return U;
}
async function y(A, e) {
  var t;
  void 0 === e && (e = {});
  const { x: r, y: n, platform: o, rects: B, elements: s, strategy: a } = A,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: l = "viewport",
      elementContext: u = "floating",
      altBoundary: g = !1,
      padding: w = 0,
    } = i(e, A),
    Q = (function (A) {
      return "number" != typeof A
        ? (function (A) {
            return { top: 0, right: 0, bottom: 0, left: 0, ...A };
          })(A)
        : { top: A, right: A, bottom: A, left: A };
    })(w),
    d = s[g ? ("floating" === u ? "reference" : "floating") : u],
    C = p(
      await o.getClippingRect({
        element:
          null == (t = await (null == o.isElement ? void 0 : o.isElement(d))) ||
          t
            ? d
            : d.contextElement ||
              (await (null == o.getDocumentElement
                ? void 0
                : o.getDocumentElement(s.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: a,
      }),
    ),
    U =
      "floating" === u
        ? { x: r, y: n, width: B.floating.width, height: B.floating.height }
        : B.reference,
    F = await (null == o.getOffsetParent
      ? void 0
      : o.getOffsetParent(s.floating)),
    h = ((await (null == o.isElement ? void 0 : o.isElement(F))) &&
      (await (null == o.getScale ? void 0 : o.getScale(F)))) || { x: 1, y: 1 },
    f = p(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: U,
            offsetParent: F,
            strategy: a,
          })
        : U,
    );
  return {
    top: (C.top - f.top + Q.top) / h.y,
    bottom: (f.bottom - C.bottom + Q.bottom) / h.y,
    left: (C.left - f.left + Q.left) / h.x,
    right: (f.right - C.right + Q.right) / h.x,
  };
}
function E() {
  return "undefined" != typeof window;
}
function m(A) {
  return v(A) ? (A.nodeName || "").toLowerCase() : "#document";
}
function I(A) {
  var e;
  return (
    (null == A || null == (e = A.ownerDocument) ? void 0 : e.defaultView) ||
    window
  );
}
function b(A) {
  var e;
  return null == (e = (v(A) ? A.ownerDocument : A.document) || window.document)
    ? void 0
    : e.documentElement;
}
function v(A) {
  return !!E() && (A instanceof Node || A instanceof I(A).Node);
}
function K(A) {
  return !!E() && (A instanceof Element || A instanceof I(A).Element);
}
function L(A) {
  return !!E() && (A instanceof HTMLElement || A instanceof I(A).HTMLElement);
}
function D(A) {
  return (
    !(!E() || "undefined" == typeof ShadowRoot) &&
    (A instanceof ShadowRoot || A instanceof I(A).ShadowRoot)
  );
}
const x = /*#__PURE__*/ new Set(["inline", "contents"]);
function S(A) {
  const { overflow: e, overflowX: t, overflowY: r, display: n } = Y(A);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + t) && !x.has(n);
}
const T = /*#__PURE__*/ new Set(["table", "td", "th"]);
function M(A) {
  return T.has(m(A));
}
const O = [":popover-open", ":modal"];
function k(A) {
  return O.some((e) => {
    try {
      return A.matches(e);
    } catch (A) {
      return !1;
    }
  });
}
const G = ["transform", "translate", "scale", "rotate", "perspective"],
  V = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  R = ["paint", "layout", "strict", "content"];
function N(A) {
  const e = P(),
    t = K(A) ? Y(A) : A;
  return (
    G.some((A) => !!t[A] && "none" !== t[A]) ||
    (!!t.containerType && "normal" !== t.containerType) ||
    (!e && !!t.backdropFilter && "none" !== t.backdropFilter) ||
    (!e && !!t.filter && "none" !== t.filter) ||
    V.some((A) => (t.willChange || "").includes(A)) ||
    R.some((A) => (t.contain || "").includes(A))
  );
}
function P() {
  return (
    !("undefined" == typeof CSS || !CSS.supports) &&
    CSS.supports("-webkit-backdrop-filter", "none")
  );
}
const X = /*#__PURE__*/ new Set(["html", "body", "#document"]);
function J(A) {
  return X.has(m(A));
}
function Y(A) {
  return I(A).getComputedStyle(A);
}
function W(A) {
  return K(A)
    ? { scrollLeft: A.scrollLeft, scrollTop: A.scrollTop }
    : { scrollLeft: A.scrollX, scrollTop: A.scrollY };
}
function _(A) {
  if ("html" === m(A)) return A;
  const e = A.assignedSlot || A.parentNode || (D(A) && A.host) || b(A);
  return D(e) ? e.host : e;
}
function Z(A) {
  const e = _(A);
  return J(e)
    ? A.ownerDocument
      ? A.ownerDocument.body
      : A.body
    : L(e) && S(e)
      ? e
      : Z(e);
}
function j(A, e, t) {
  var r;
  (void 0 === e && (e = []), void 0 === t && (t = !0));
  const n = Z(A),
    o = n === (null == (r = A.ownerDocument) ? void 0 : r.body),
    B = I(n);
  if (o) {
    const A = q(B);
    return e.concat(
      B,
      B.visualViewport || [],
      S(n) ? n : [],
      A && t ? j(A) : [],
    );
  }
  return e.concat(n, j(n, [], t));
}
function q(A) {
  return A.parent && Object.getPrototypeOf(A.parent) ? A.frameElement : null;
}
function z(A) {
  const e = Y(A);
  let t = parseFloat(e.width) || 0,
    n = parseFloat(e.height) || 0;
  const o = L(A),
    B = o ? A.offsetWidth : t,
    s = o ? A.offsetHeight : n,
    i = r(t) !== B || r(n) !== s;
  return (i && ((t = B), (n = s)), { width: t, height: n, $: i });
}
function $(A) {
  return K(A) ? A : A.contextElement;
}
function AA(A) {
  const e = $(A);
  if (!L(e)) return n(1);
  const t = e.getBoundingClientRect(),
    { width: o, height: B, $: s } = z(e);
  let i = (s ? r(t.width) : t.width) / o,
    a = (s ? r(t.height) : t.height) / B;
  return (
    (i && Number.isFinite(i)) || (i = 1),
    (a && Number.isFinite(a)) || (a = 1),
    { x: i, y: a }
  );
}
const eA = /*#__PURE__*/ n(0);
function tA(A) {
  const e = I(A);
  return P() && e.visualViewport
    ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
    : eA;
}
function rA(A, e, t, r) {
  (void 0 === e && (e = !1), void 0 === t && (t = !1));
  const o = A.getBoundingClientRect(),
    B = $(A);
  let s = n(1);
  e && (r ? K(r) && (s = AA(r)) : (s = AA(A)));
  const i = (function (A, e, t) {
    return (void 0 === e && (e = !1), !(!t || (e && t !== I(A))) && e);
  })(B, t, r)
    ? tA(B)
    : n(0);
  let a = (o.left + i.x) / s.x,
    c = (o.top + i.y) / s.y,
    l = o.width / s.x,
    u = o.height / s.y;
  if (B) {
    const A = I(B),
      e = r && K(r) ? I(r) : r;
    let t = A,
      n = q(t);
    for (; n && r && e !== t; ) {
      const A = AA(n),
        e = n.getBoundingClientRect(),
        r = Y(n),
        o = e.left + (n.clientLeft + parseFloat(r.paddingLeft)) * A.x,
        B = e.top + (n.clientTop + parseFloat(r.paddingTop)) * A.y;
      ((a *= A.x),
        (c *= A.y),
        (l *= A.x),
        (u *= A.y),
        (a += o),
        (c += B),
        (t = I(n)),
        (n = q(t)));
    }
  }
  return p({ width: l, height: u, x: a, y: c });
}
function nA(A, e) {
  const t = W(A).scrollLeft;
  return e ? e.left + t : rA(b(A)).left + t;
}
function oA(A, e) {
  const t = A.getBoundingClientRect();
  return { x: t.left + e.scrollLeft - nA(A, t), y: t.top + e.scrollTop };
}
const BA = /*#__PURE__*/ new Set(["absolute", "fixed"]);
function sA(A, e, r) {
  let o;
  if ("viewport" === e)
    o = (function (A, e) {
      const t = I(A),
        r = b(A),
        n = t.visualViewport;
      let o = r.clientWidth,
        B = r.clientHeight,
        s = 0,
        i = 0;
      if (n) {
        ((o = n.width), (B = n.height));
        const A = P();
        (!A || (A && "fixed" === e)) && ((s = n.offsetLeft), (i = n.offsetTop));
      }
      const a = nA(r);
      if (a <= 0) {
        const A = r.ownerDocument,
          e = A.body,
          t = getComputedStyle(e),
          n =
            ("CSS1Compat" === A.compatMode &&
              parseFloat(t.marginLeft) + parseFloat(t.marginRight)) ||
            0,
          B = Math.abs(r.clientWidth - e.clientWidth - n);
        B <= 25 && (o -= B);
      } else a <= 25 && (o += a);
      return { width: o, height: B, x: s, y: i };
    })(A, r);
  else if ("document" === e)
    o = (function (A) {
      const e = b(A),
        r = W(A),
        n = A.ownerDocument.body,
        o = t(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
        B = t(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
      let s = -r.scrollLeft + nA(A);
      const i = -r.scrollTop;
      return (
        "rtl" === Y(n).direction && (s += t(e.clientWidth, n.clientWidth) - o),
        { width: o, height: B, x: s, y: i }
      );
    })(b(A));
  else if (K(e))
    o = (function (A, e) {
      const t = rA(A, !0, "fixed" === e),
        r = t.top + A.clientTop,
        o = t.left + A.clientLeft,
        B = L(A) ? AA(A) : n(1);
      return {
        width: A.clientWidth * B.x,
        height: A.clientHeight * B.y,
        x: o * B.x,
        y: r * B.y,
      };
    })(e, r);
  else {
    const t = tA(A);
    o = { x: e.x - t.x, y: e.y - t.y, width: e.width, height: e.height };
  }
  return p(o);
}
function iA(A, e) {
  const t = _(A);
  return !(t === e || !K(t) || J(t)) && ("fixed" === Y(t).position || iA(t, e));
}
function aA(A, e, t) {
  const r = L(e),
    o = b(e),
    B = "fixed" === t,
    s = rA(A, !0, B, e);
  let i = { scrollLeft: 0, scrollTop: 0 };
  const a = n(0);
  function c() {
    a.x = nA(o);
  }
  if (r || (!r && !B))
    if ((("body" !== m(e) || S(o)) && (i = W(e)), r)) {
      const A = rA(e, !0, B, e);
      ((a.x = A.x + e.clientLeft), (a.y = A.y + e.clientTop));
    } else o && c();
  B && !r && o && c();
  const l = !o || r || B ? n(0) : oA(o, i);
  return {
    x: s.left + i.scrollLeft - a.x - l.x,
    y: s.top + i.scrollTop - a.y - l.y,
    width: s.width,
    height: s.height,
  };
}
function cA(A) {
  return "static" === Y(A).position;
}
function lA(A, e) {
  if (!L(A) || "fixed" === Y(A).position) return null;
  if (e) return e(A);
  let t = A.offsetParent;
  return (b(A) === t && (t = t.ownerDocument.body), t);
}
function uA(A, e) {
  const t = I(A);
  if (k(A)) return t;
  if (!L(A)) {
    let e = _(A);
    for (; e && !J(e); ) {
      if (K(e) && !cA(e)) return e;
      e = _(e);
    }
    return t;
  }
  let r = lA(A, e);
  for (; r && M(r) && cA(r); ) r = lA(r, e);
  return r && J(r) && cA(r) && !N(r)
    ? t
    : r ||
        (function (A) {
          let e = _(A);
          for (; L(e) && !J(e); ) {
            if (N(e)) return e;
            if (k(e)) return null;
            e = _(e);
          }
          return null;
        })(A) ||
        t;
}
const gA = {
    convertOffsetParentRelativeRectToViewportRelativeRect: function (A) {
      let { elements: e, rect: t, offsetParent: r, strategy: o } = A;
      const B = "fixed" === o,
        s = b(r),
        i = !!e && k(e.floating);
      if (r === s || (i && B)) return t;
      let a = { scrollLeft: 0, scrollTop: 0 },
        c = n(1);
      const l = n(0),
        u = L(r);
      if (
        (u || (!u && !B)) &&
        (("body" !== m(r) || S(s)) && (a = W(r)), L(r))
      ) {
        const A = rA(r);
        ((c = AA(r)), (l.x = A.x + r.clientLeft), (l.y = A.y + r.clientTop));
      }
      const g = !s || u || B ? n(0) : oA(s, a);
      return {
        width: t.width * c.x,
        height: t.height * c.y,
        x: t.x * c.x - a.scrollLeft * c.x + l.x + g.x,
        y: t.y * c.y - a.scrollTop * c.y + l.y + g.y,
      };
    },
    getDocumentElement: b,
    getClippingRect: function (A) {
      let { element: r, boundary: n, rootBoundary: o, strategy: B } = A;
      const s =
          "clippingAncestors" === n
            ? k(r)
              ? []
              : (function (A, e) {
                  const t = e.get(A);
                  if (t) return t;
                  let r = j(A, [], !1).filter((A) => K(A) && "body" !== m(A)),
                    n = null;
                  const o = "fixed" === Y(A).position;
                  let B = o ? _(A) : A;
                  for (; K(B) && !J(B); ) {
                    const e = Y(B),
                      t = N(B);
                    (t || "fixed" !== e.position || (n = null),
                      (
                        o
                          ? !t && !n
                          : (!t &&
                              "static" === e.position &&
                              n &&
                              BA.has(n.position)) ||
                            (S(B) && !t && iA(A, B))
                      )
                        ? (r = r.filter((A) => A !== B))
                        : (n = e),
                      (B = _(B)));
                  }
                  return (e.set(A, r), r);
                })(r, this._c)
            : [].concat(n),
        i = [...s, o],
        a = i.reduce(
          (A, n) => {
            const o = sA(r, n, B);
            return (
              (A.top = t(o.top, A.top)),
              (A.right = e(o.right, A.right)),
              (A.bottom = e(o.bottom, A.bottom)),
              (A.left = t(o.left, A.left)),
              A
            );
          },
          sA(r, i[0], B),
        );
      return {
        width: a.right - a.left,
        height: a.bottom - a.top,
        x: a.left,
        y: a.top,
      };
    },
    getOffsetParent: uA,
    getElementRects: async function (A) {
      const e = this.getOffsetParent || uA,
        t = this.getDimensions,
        r = await t(A.floating);
      return {
        reference: aA(A.reference, await e(A.floating), A.strategy),
        floating: { x: 0, y: 0, width: r.width, height: r.height },
      };
    },
    getClientRects: function (A) {
      return Array.from(A.getClientRects());
    },
    getDimensions: function (A) {
      const { width: e, height: t } = z(A);
      return { width: e, height: t };
    },
    getScale: AA,
    isElement: K,
    isRTL: function (A) {
      return "rtl" === Y(A).direction;
    },
  },
  wA = function (A) {
    return (
      void 0 === A && (A = {}),
      {
        name: "flip",
        options: A,
        async fn(e) {
          var t, r;
          const {
              placement: n,
              middlewareData: o,
              rects: B,
              initialPlacement: s,
              platform: l,
              elements: g,
            } = e,
            {
              mainAxis: p = !0,
              crossAxis: H = !0,
              fallbackPlacements: E,
              fallbackStrategy: m = "bestFit",
              fallbackAxisSideDirection: I = "none",
              flipAlignment: b = !0,
              ...v
            } = i(A, e);
          if (null != (t = o.arrow) && t.alignmentOffset) return {};
          const K = a(n),
            L = w(s),
            D = a(s) === s,
            x = await (null == l.isRTL ? void 0 : l.isRTL(g.floating)),
            S =
              E ||
              (D || !b
                ? [f(s)]
                : (function (A) {
                    const e = f(A);
                    return [d(A), e, d(e)];
                  })(s)),
            T = "none" !== I;
          !E &&
            T &&
            S.push(
              ...(function (A, e, t, r) {
                const n = c(A);
                let o = (function (A, e, t) {
                  switch (A) {
                    case "top":
                    case "bottom":
                      return t ? (e ? U : C) : e ? C : U;
                    case "left":
                    case "right":
                      return e ? F : h;
                    default:
                      return [];
                  }
                })(a(A), "start" === t, r);
                return (
                  n &&
                    ((o = o.map((A) => A + "-" + n)),
                    e && (o = o.concat(o.map(d)))),
                  o
                );
              })(s, b, I, x),
            );
          const M = [s, ...S],
            O = await y(e, v),
            k = [];
          let G = (null == (r = o.flip) ? void 0 : r.overflows) || [];
          if ((p && k.push(O[K]), H)) {
            const A = (function (A, e, t) {
              void 0 === t && (t = !1);
              const r = c(A),
                n = Q(A),
                o = u(n);
              let B =
                "x" === n
                  ? r === (t ? "end" : "start")
                    ? "right"
                    : "left"
                  : "start" === r
                    ? "bottom"
                    : "top";
              return (e.reference[o] > e.floating[o] && (B = f(B)), [B, f(B)]);
            })(n, B, x);
            k.push(O[A[0]], O[A[1]]);
          }
          if (
            ((G = [...G, { placement: n, overflows: k }]),
            !k.every((A) => A <= 0))
          ) {
            var V, R;
            const A = ((null == (V = o.flip) ? void 0 : V.index) || 0) + 1,
              e = M[A];
            if (
              e &&
              ("alignment" !== H ||
                L === w(e) ||
                G.every((A) => w(A.placement) !== L || A.overflows[0] > 0))
            )
              return {
                data: { index: A, overflows: G },
                reset: { placement: e },
              };
            let t =
              null ==
              (R = G.filter((A) => A.overflows[0] <= 0).sort(
                (A, e) => A.overflows[1] - e.overflows[1],
              )[0])
                ? void 0
                : R.placement;
            if (!t)
              switch (m) {
                case "bestFit": {
                  var N;
                  const A =
                    null ==
                    (N = G.filter((A) => {
                      if (T) {
                        const e = w(A.placement);
                        return e === L || "y" === e;
                      }
                      return !0;
                    })
                      .map((A) => [
                        A.placement,
                        A.overflows
                          .filter((A) => A > 0)
                          .reduce((A, e) => A + e, 0),
                      ])
                      .sort((A, e) => A[1] - e[1])[0])
                      ? void 0
                      : N[0];
                  A && (t = A);
                  break;
                }
                case "initialPlacement":
                  t = s;
              }
            if (n !== t) return { reset: { placement: t } };
          }
          return {};
        },
      }
    );
  };
var QA = [
    "input:not([inert]):not([inert] *)",
    "select:not([inert]):not([inert] *)",
    "textarea:not([inert]):not([inert] *)",
    "a[href]:not([inert]):not([inert] *)",
    "button:not([inert]):not([inert] *)",
    "[tabindex]:not(slot):not([inert]):not([inert] *)",
    "audio[controls]:not([inert]):not([inert] *)",
    "video[controls]:not([inert]):not([inert] *)",
    '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)',
    "details>summary:first-of-type:not([inert]):not([inert] *)",
    "details:not([inert]):not([inert] *)",
  ],
  dA = /* #__PURE__ */ QA.join(","),
  CA = "undefined" == typeof Element,
  UA = CA
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  FA =
    !CA && Element.prototype.getRootNode
      ? function (A) {
          var e;
          return null == A || null === (e = A.getRootNode) || void 0 === e
            ? void 0
            : e.call(A);
        }
      : function (A) {
          return null == A ? void 0 : A.ownerDocument;
        },
  hA = function (A, e) {
    var t;
    void 0 === e && (e = !0);
    var r =
      null == A || null === (t = A.getAttribute) || void 0 === t
        ? void 0
        : t.call(A, "inert");
    return (
      "" === r ||
      "true" === r ||
      (e &&
        A &&
        ("function" == typeof A.closest
          ? A.closest("[inert]")
          : hA(A.parentNode)))
    );
  },
  fA = function (A, e, t) {
    if (hA(A)) return [];
    var r = Array.prototype.slice.apply(A.querySelectorAll(dA));
    return (e && UA.call(A, dA) && r.unshift(A), r.filter(t));
  },
  pA = function (A, e, t) {
    for (var r = [], n = Array.from(A); n.length; ) {
      var o = n.shift();
      if (!hA(o, !1))
        if ("SLOT" === o.tagName) {
          var B = o.assignedElements(),
            s = pA(B.length ? B : o.children, !0, t);
          t.flatten
            ? r.push.apply(r, s)
            : r.push({ scopeParent: o, candidates: s });
        } else {
          UA.call(o, dA) && t.filter(o) && (e || !A.includes(o)) && r.push(o);
          var i =
              o.shadowRoot ||
              ("function" == typeof t.getShadowRoot && t.getShadowRoot(o)),
            a = !hA(i, !1) && (!t.shadowRootFilter || t.shadowRootFilter(o));
          if (i && a) {
            var c = pA(!0 === i ? o.children : i.children, !0, t);
            t.flatten
              ? r.push.apply(r, c)
              : r.push({ scopeParent: o, candidates: c });
          } else n.unshift.apply(n, o.children);
        }
    }
    return r;
  },
  HA = function (A) {
    return !isNaN(parseInt(A.getAttribute("tabindex"), 10));
  },
  yA = function (A) {
    if (!A) throw new Error("No node provided");
    return A.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(A.tagName) ||
        (function (A) {
          var e,
            t =
              null == A || null === (e = A.getAttribute) || void 0 === e
                ? void 0
                : e.call(A, "contenteditable");
          return "" === t || "true" === t;
        })(A)) &&
      !HA(A)
      ? 0
      : A.tabIndex;
  },
  EA = function (A, e) {
    return A.tabIndex === e.tabIndex
      ? A.documentOrder - e.documentOrder
      : A.tabIndex - e.tabIndex;
  },
  mA = function (A) {
    return "INPUT" === A.tagName;
  },
  IA = function (A) {
    var e = A.getBoundingClientRect();
    return 0 === e.width && 0 === e.height;
  },
  bA = function (A, e) {
    return !(
      e.disabled ||
      (function (A) {
        return mA(A) && "hidden" === A.type;
      })(e) ||
      (function (A, e) {
        var t = e.displayCheck,
          r = e.getShadowRoot;
        if ("full-native" === t && "checkVisibility" in A)
          return !A.checkVisibility({
            checkOpacity: !1,
            opacityProperty: !1,
            contentVisibilityAuto: !0,
            visibilityProperty: !0,
            checkVisibilityCSS: !0,
          });
        if ("hidden" === getComputedStyle(A).visibility) return !0;
        var n = UA.call(A, "details>summary:first-of-type");
        if (UA.call(n ? A.parentElement : A, "details:not([open]) *"))
          return !0;
        if (t && "full" !== t && "full-native" !== t && "legacy-full" !== t) {
          if ("non-zero-area" === t) return IA(A);
        } else {
          if ("function" == typeof r) {
            for (var o = A; A; ) {
              var B = A.parentElement,
                s = FA(A);
              if (B && !B.shadowRoot && !0 === r(B)) return IA(A);
              A = A.assignedSlot
                ? A.assignedSlot
                : B || s === A.ownerDocument
                  ? B
                  : s.host;
            }
            A = o;
          }
          if (
            (function (A) {
              var e,
                t,
                r,
                n,
                o = A && FA(A),
                B = null === (e = o) || void 0 === e ? void 0 : e.host,
                s = !1;
              if (o && o !== A)
                for (
                  s = !!(
                    (null !== (t = B) &&
                      void 0 !== t &&
                      null !== (r = t.ownerDocument) &&
                      void 0 !== r &&
                      r.contains(B)) ||
                    (null != A &&
                      null !== (n = A.ownerDocument) &&
                      void 0 !== n &&
                      n.contains(A))
                  );
                  !s && B;
                ) {
                  var i, a, c;
                  s = !(
                    null ===
                      (a = B =
                        null === (i = o = FA(B)) || void 0 === i
                          ? void 0
                          : i.host) ||
                    void 0 === a ||
                    null === (c = a.ownerDocument) ||
                    void 0 === c ||
                    !c.contains(B)
                  );
                }
              return s;
            })(A)
          )
            return !A.getClientRects().length;
          if ("legacy-full" !== t) return !0;
        }
        return !1;
      })(e, A) ||
      (function (A) {
        return (
          "DETAILS" === A.tagName &&
          Array.prototype.slice.apply(A.children).some(function (A) {
            return "SUMMARY" === A.tagName;
          })
        );
      })(e) ||
      (function (A) {
        if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(A.tagName))
          for (var e = A.parentElement; e; ) {
            if ("FIELDSET" === e.tagName && e.disabled) {
              for (var t = 0; t < e.children.length; t++) {
                var r = e.children.item(t);
                if ("LEGEND" === r.tagName)
                  return !!UA.call(e, "fieldset[disabled] *") || !r.contains(A);
              }
              return !0;
            }
            e = e.parentElement;
          }
        return !1;
      })(e)
    );
  },
  vA = function (A, e) {
    return !(
      (function (A) {
        return (
          (function (A) {
            return mA(A) && "radio" === A.type;
          })(A) &&
          !(function (A) {
            if (!A.name) return !0;
            var e,
              t = A.form || FA(A),
              r = function (A) {
                return t.querySelectorAll(
                  'input[type="radio"][name="' + A + '"]',
                );
              };
            if (
              "undefined" != typeof window &&
              void 0 !== window.CSS &&
              "function" == typeof window.CSS.escape
            )
              e = r(window.CSS.escape(A.name));
            else
              try {
                e = r(A.name);
              } catch (A) {
                return (
                  console.error(
                    "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                    A.message,
                  ),
                  !1
                );
              }
            var n = (function (A, e) {
              for (var t = 0; t < A.length; t++)
                if (A[t].checked && A[t].form === e) return A[t];
            })(e, A.form);
            return !n || n === A;
          })(A)
        );
      })(e) ||
      yA(e) < 0 ||
      !bA(A, e)
    );
  },
  KA = function (A) {
    var e = parseInt(A.getAttribute("tabindex"), 10);
    return !!(isNaN(e) || e >= 0);
  },
  LA = function (A) {
    var e = [],
      t = [];
    return (
      A.forEach(function (A, r) {
        var n = !!A.scopeParent,
          o = n ? A.scopeParent : A,
          B = (function (A, e) {
            var t = yA(A);
            return t < 0 && e && !HA(A) ? 0 : t;
          })(o, n),
          s = n ? LA(A.candidates) : o;
        0 === B
          ? n
            ? e.push.apply(e, s)
            : e.push(o)
          : t.push({
              documentOrder: r,
              tabIndex: B,
              item: A,
              isScope: n,
              content: s,
            });
      }),
      t
        .sort(EA)
        .reduce(function (A, e) {
          return (
            e.isScope ? A.push.apply(A, e.content) : A.push(e.content),
            A
          );
        }, [])
        .concat(e)
    );
  },
  DA = function (A, e) {
    if (((e = e || {}), !A)) throw new Error("No node provided");
    return !1 !== UA.call(A, dA) && vA(e, A);
  },
  xA = /* #__PURE__ */ QA.concat("iframe:not([inert]):not([inert] *)").join(
    ",",
  ),
  SA = function (A, e) {
    if (((e = e || {}), !A)) throw new Error("No node provided");
    return !1 !== UA.call(A, xA) && bA(e, A);
  };
function TA(A, e) {
  (null == e || e > A.length) && (e = A.length);
  for (var t = 0, r = Array(e); t < e; t++) r[t] = A[t];
  return r;
}
function MA(A, e) {
  var t =
    ("undefined" != typeof Symbol && A[Symbol.iterator]) || A["@@iterator"];
  if (!t) {
    if (Array.isArray(A) || (t = RA(A)) || e) {
      t && (A = t);
      var r = 0,
        n = function () {};
      return {
        s: n,
        n: function () {
          return r >= A.length ? { done: !0 } : { done: !1, value: A[r++] };
        },
        e: function (A) {
          throw A;
        },
        f: n,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
    );
  }
  var o,
    B = !0,
    s = !1;
  return {
    s: function () {
      t = t.call(A);
    },
    n: function () {
      var A = t.next();
      return ((B = A.done), A);
    },
    e: function (A) {
      ((s = !0), (o = A));
    },
    f: function () {
      try {
        B || null == t.return || t.return();
      } finally {
        if (s) throw o;
      }
    },
  };
}
function OA(A, e, t) {
  return (
    (e = (function (A) {
      var e = (function (A, e) {
        if ("object" != typeof A || !A) return A;
        var t = A[Symbol.toPrimitive];
        if (void 0 !== t) {
          var r = t.call(A, "string");
          if ("object" != typeof r) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(A);
      })(A);
      return "symbol" == typeof e ? e : e + "";
    })(e)) in A
      ? Object.defineProperty(A, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (A[e] = t),
    A
  );
}
function kA(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(A);
    (e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(A, e).enumerable;
      })),
      t.push.apply(t, r));
  }
  return t;
}
function GA(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? kA(Object(t), !0).forEach(function (e) {
          OA(A, e, t[e]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t))
        : kA(Object(t)).forEach(function (e) {
            Object.defineProperty(A, e, Object.getOwnPropertyDescriptor(t, e));
          });
  }
  return A;
}
function VA(A) {
  return (
    (function (A) {
      if (Array.isArray(A)) return TA(A);
    })(A) ||
    (function (A) {
      if (
        ("undefined" != typeof Symbol && null != A[Symbol.iterator]) ||
        null != A["@@iterator"]
      )
        return Array.from(A);
    })(A) ||
    RA(A) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      );
    })()
  );
}
function RA(A, e) {
  if (A) {
    if ("string" == typeof A) return TA(A, e);
    var t = {}.toString.call(A).slice(8, -1);
    return (
      "Object" === t && A.constructor && (t = A.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(A)
        : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? TA(A, e)
          : void 0
    );
  }
}
var NA = {
    getActiveTrap: function (A) {
      return (null == A ? void 0 : A.length) > 0 ? A[A.length - 1] : null;
    },
    activateTrap: function (A, e) {
      e !== NA.getActiveTrap(A) && NA.pauseTrap(A);
      var t = A.indexOf(e);
      (-1 === t || A.splice(t, 1), A.push(e));
    },
    deactivateTrap: function (A, e) {
      var t = A.indexOf(e);
      (-1 !== t && A.splice(t, 1), NA.unpauseTrap(A));
    },
    pauseTrap: function (A) {
      var e = NA.getActiveTrap(A);
      null == e || e._setPausedState(!0);
    },
    unpauseTrap: function (A) {
      var e = NA.getActiveTrap(A);
      e && !e._isManuallyPaused() && e._setPausedState(!1);
    },
  },
  PA = function (A) {
    return (
      "Tab" === (null == A ? void 0 : A.key) ||
      9 === (null == A ? void 0 : A.keyCode)
    );
  },
  XA = function (A) {
    return PA(A) && !A.shiftKey;
  },
  JA = function (A) {
    return PA(A) && A.shiftKey;
  },
  YA = function (A) {
    return setTimeout(A, 0);
  },
  WA = function (A) {
    for (
      var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1;
      r < e;
      r++
    )
      t[r - 1] = arguments[r];
    return "function" == typeof A ? A.apply(void 0, t) : A;
  },
  _A = function (A) {
    return A.target.shadowRoot && "function" == typeof A.composedPath
      ? A.composedPath()[0]
      : A.target;
  },
  ZA = [];
"undefined" != typeof globalThis
  ? globalThis
  : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
      ? global
      : "undefined" != typeof self && self;
var jA = (function (A) {
    var e = { exports: {} };
    return (
      (function (A, e) {
        A.exports = (function () {
          var A = function (e, t) {
            return (
              (A =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (A, e) {
                    A.__proto__ = e;
                  }) ||
                function (A, e) {
                  for (var t in e)
                    Object.prototype.hasOwnProperty.call(e, t) && (A[t] = e[t]);
                }),
              A(e, t)
            );
          };
          function e(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Class extends value " +
                  String(t) +
                  " is not a constructor or null",
              );
            function r() {
              this.constructor = e;
            }
            (A(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((r.prototype = t.prototype), new r())));
          }
          var t = function () {
            return (
              (t =
                Object.assign ||
                function (A) {
                  for (var e, t = 1, r = arguments.length; t < r; t++)
                    for (var n in (e = arguments[t]))
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (A[n] = e[n]);
                  return A;
                }),
              t.apply(this, arguments)
            );
          };
          function r(A, e, t, r) {
            return new (t || (t = Promise))(function (n, o) {
              function B(A) {
                try {
                  i(r.next(A));
                } catch (A) {
                  o(A);
                }
              }
              function s(A) {
                try {
                  i(r.throw(A));
                } catch (A) {
                  o(A);
                }
              }
              function i(A) {
                var e;
                A.done
                  ? n(A.value)
                  : ((e = A.value),
                    e instanceof t
                      ? e
                      : new t(function (A) {
                          A(e);
                        })).then(B, s);
              }
              i((r = r.apply(A, e || [])).next());
            });
          }
          function n(A, e) {
            var t,
              r,
              n,
              o,
              B = {
                label: 0,
                sent: function () {
                  if (1 & n[0]) throw n[1];
                  return n[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (o = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function s(o) {
              return function (s) {
                return (function (o) {
                  if (t) throw new TypeError("Generator is already executing.");
                  for (; B; )
                    try {
                      if (
                        ((t = 1),
                        r &&
                          (n =
                            2 & o[0]
                              ? r.return
                              : o[0]
                                ? r.throw || ((n = r.return) && n.call(r), 0)
                                : r.next) &&
                          !(n = n.call(r, o[1])).done)
                      )
                        return n;
                      switch (((r = 0), n && (o = [2 & o[0], n.value]), o[0])) {
                        case 0:
                        case 1:
                          n = o;
                          break;
                        case 4:
                          return (B.label++, { value: o[1], done: !1 });
                        case 5:
                          (B.label++, (r = o[1]), (o = [0]));
                          continue;
                        case 7:
                          ((o = B.ops.pop()), B.trys.pop());
                          continue;
                        default:
                          if (
                            !(
                              (n =
                                (n = B.trys).length > 0 && n[n.length - 1]) ||
                              (6 !== o[0] && 2 !== o[0])
                            )
                          ) {
                            B = 0;
                            continue;
                          }
                          if (
                            3 === o[0] &&
                            (!n || (o[1] > n[0] && o[1] < n[3]))
                          ) {
                            B.label = o[1];
                            break;
                          }
                          if (6 === o[0] && B.label < n[1]) {
                            ((B.label = n[1]), (n = o));
                            break;
                          }
                          if (n && B.label < n[2]) {
                            ((B.label = n[2]), B.ops.push(o));
                            break;
                          }
                          (n[2] && B.ops.pop(), B.trys.pop());
                          continue;
                      }
                      o = e.call(A, B);
                    } catch (A) {
                      ((o = [6, A]), (r = 0));
                    } finally {
                      t = n = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: !0 };
                })([o, s]);
              };
            }
          }
          function o(A, e, t) {
            if (t || 2 === arguments.length)
              for (var r, n = 0, o = e.length; n < o; n++)
                (!r && n in e) ||
                  (r || (r = Array.prototype.slice.call(e, 0, n)),
                  (r[n] = e[n]));
            return A.concat(r || e);
          }
          for (
            var B = (function () {
                function A(A, e, t, r) {
                  ((this.left = A),
                    (this.top = e),
                    (this.width = t),
                    (this.height = r));
                }
                return (
                  (A.prototype.add = function (e, t, r, n) {
                    return new A(
                      this.left + e,
                      this.top + t,
                      this.width + r,
                      this.height + n,
                    );
                  }),
                  (A.fromClientRect = function (e, t) {
                    return new A(
                      t.left + e.windowBounds.left,
                      t.top + e.windowBounds.top,
                      t.width,
                      t.height,
                    );
                  }),
                  (A.fromDOMRectList = function (e, t) {
                    var r = Array.from(t).find(function (A) {
                      return 0 !== A.width;
                    });
                    return r
                      ? new A(
                          r.left + e.windowBounds.left,
                          r.top + e.windowBounds.top,
                          r.width,
                          r.height,
                        )
                      : A.EMPTY;
                  }),
                  (A.EMPTY = new A(0, 0, 0, 0)),
                  A
                );
              })(),
              s = function (A, e) {
                return B.fromClientRect(A, e.getBoundingClientRect());
              },
              i = function (A) {
                for (var e = [], t = 0, r = A.length; t < r; ) {
                  var n = A.charCodeAt(t++);
                  if (n >= 55296 && n <= 56319 && t < r) {
                    var o = A.charCodeAt(t++);
                    56320 == (64512 & o)
                      ? e.push(((1023 & n) << 10) + (1023 & o) + 65536)
                      : (e.push(n), t--);
                  } else e.push(n);
                }
                return e;
              },
              a = function () {
                for (var A = [], e = 0; e < arguments.length; e++)
                  A[e] = arguments[e];
                if (String.fromCodePoint)
                  return String.fromCodePoint.apply(String, A);
                var t = A.length;
                if (!t) return "";
                for (var r = [], n = -1, o = ""; ++n < t; ) {
                  var B = A[n];
                  (B <= 65535
                    ? r.push(B)
                    : r.push(55296 + ((B -= 65536) >> 10), (B % 1024) + 56320),
                    (n + 1 === t || r.length > 16384) &&
                      ((o += String.fromCharCode.apply(String, r)),
                      (r.length = 0)));
                }
                return o;
              },
              c =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              l = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              u = 0;
            u < c.length;
            u++
          )
            l[c.charCodeAt(u)] = u;
          for (
            var g =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              w = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              Q = 0;
            Q < g.length;
            Q++
          )
            w[g.charCodeAt(Q)] = Q;
          for (
            var d = function (A, e, t) {
                return A.slice
                  ? A.slice(e, t)
                  : new Uint16Array(Array.prototype.slice.call(A, e, t));
              },
              C = (function () {
                function A(A, e, t, r, n, o) {
                  ((this.initialValue = A),
                    (this.errorValue = e),
                    (this.highStart = t),
                    (this.highValueIndex = r),
                    (this.index = n),
                    (this.data = o));
                }
                return (
                  (A.prototype.get = function (A) {
                    var e;
                    if (A >= 0) {
                      if (A < 55296 || (A > 56319 && A <= 65535))
                        return this.data[
                          (e = ((e = this.index[A >> 5]) << 2) + (31 & A))
                        ];
                      if (A <= 65535)
                        return this.data[
                          (e =
                            ((e = this.index[2048 + ((A - 55296) >> 5)]) << 2) +
                            (31 & A))
                        ];
                      if (A < this.highStart)
                        return (
                          (e = this.index[(e = 2080 + (A >> 11))]),
                          this.data[
                            (e =
                              ((e = this.index[(e += (A >> 5) & 63)]) << 2) +
                              (31 & A))
                          ]
                        );
                      if (A <= 1114111) return this.data[this.highValueIndex];
                    }
                    return this.errorValue;
                  }),
                  A
                );
              })(),
              U =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              F = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              h = 0;
            h < U.length;
            h++
          )
            F[U.charCodeAt(h)] = h;
          var f,
            p,
            H,
            y,
            E,
            m,
            I,
            b,
            v = 10,
            K = 13,
            L = 15,
            D = 17,
            x = 18,
            S = 19,
            T = 20,
            M = 21,
            O = 22,
            k = 24,
            G = 25,
            V = 26,
            R = 27,
            N = 28,
            P = 30,
            X = 32,
            J = 33,
            Y = 34,
            W = 35,
            _ = 37,
            Z = 38,
            j = 39,
            q = 40,
            z = 42,
            $ = [9001, 65288],
            AA = "×",
            eA = "÷",
            tA =
              ((y = (function (A) {
                var e,
                  t,
                  r,
                  n,
                  o,
                  B = 0.75 * A.length,
                  s = A.length,
                  i = 0;
                "=" === A[A.length - 1] &&
                  (B--, "=" === A[A.length - 2] && B--);
                var a =
                    "undefined" != typeof ArrayBuffer &&
                    "undefined" != typeof Uint8Array &&
                    void 0 !== Uint8Array.prototype.slice
                      ? new ArrayBuffer(B)
                      : new Array(B),
                  c = Array.isArray(a) ? a : new Uint8Array(a);
                for (e = 0; e < s; e += 4)
                  ((t = w[A.charCodeAt(e)]),
                    (r = w[A.charCodeAt(e + 1)]),
                    (n = w[A.charCodeAt(e + 2)]),
                    (o = w[A.charCodeAt(e + 3)]),
                    (c[i++] = (t << 2) | (r >> 4)),
                    (c[i++] = ((15 & r) << 4) | (n >> 2)),
                    (c[i++] = ((3 & n) << 6) | (63 & o)));
                return a;
              })(
                "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",
              )),
              (E = Array.isArray(y)
                ? (function (A) {
                    for (var e = A.length, t = [], r = 0; r < e; r += 4)
                      t.push(
                        (A[r + 3] << 24) |
                          (A[r + 2] << 16) |
                          (A[r + 1] << 8) |
                          A[r],
                      );
                    return t;
                  })(y)
                : new Uint32Array(y)),
              (m = Array.isArray(y)
                ? (function (A) {
                    for (var e = A.length, t = [], r = 0; r < e; r += 2)
                      t.push((A[r + 1] << 8) | A[r]);
                    return t;
                  })(y)
                : new Uint16Array(y)),
              (I = d(m, 12, E[4] / 2)),
              (b =
                2 === E[5]
                  ? d(m, (24 + E[4]) / 2)
                  : ((f = E),
                    (p = Math.ceil((24 + E[4]) / 4)),
                    f.slice
                      ? f.slice(p, H)
                      : new Uint32Array(Array.prototype.slice.call(f, p, H)))),
              new C(E[0], E[1], E[2], E[3], I, b)),
            rA = [P, 36],
            nA = [1, 2, 3, 5],
            oA = [v, 8],
            BA = [R, V],
            sA = nA.concat(oA),
            iA = [Z, j, q, Y, W],
            aA = [L, K],
            cA = function (A, e, t, r) {
              var n = r[t];
              if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
                for (var o = t; o <= r.length; ) {
                  if ((i = r[++o]) === e) return !0;
                  if (i !== v) break;
                }
              if (n === v)
                for (o = t; o > 0; ) {
                  var B = r[--o];
                  if (Array.isArray(A) ? -1 !== A.indexOf(B) : A === B)
                    for (var s = t; s <= r.length; ) {
                      var i;
                      if ((i = r[++s]) === e) return !0;
                      if (i !== v) break;
                    }
                  if (B !== v) break;
                }
              return !1;
            },
            lA = function (A, e) {
              for (var t = A; t >= 0; ) {
                var r = e[t];
                if (r !== v) return r;
                t--;
              }
              return 0;
            },
            uA = function (A, e, t, r, n) {
              if (0 === t[r]) return AA;
              var o = r - 1;
              if (Array.isArray(n) && !0 === n[o]) return AA;
              var B = o - 1,
                s = o + 1,
                i = e[o],
                a = B >= 0 ? e[B] : 0,
                c = e[s];
              if (2 === i && 3 === c) return AA;
              if (-1 !== nA.indexOf(i)) return "!";
              if (-1 !== nA.indexOf(c)) return AA;
              if (-1 !== oA.indexOf(c)) return AA;
              if (8 === lA(o, e)) return eA;
              if (11 === tA.get(A[o])) return AA;
              if ((i === X || i === J) && 11 === tA.get(A[s])) return AA;
              if (7 === i || 7 === c) return AA;
              if (9 === i) return AA;
              if (-1 === [v, K, L].indexOf(i) && 9 === c) return AA;
              if (-1 !== [D, x, S, k, N].indexOf(c)) return AA;
              if (lA(o, e) === O) return AA;
              if (cA(23, O, o, e)) return AA;
              if (cA([D, x], M, o, e)) return AA;
              if (cA(12, 12, o, e)) return AA;
              if (i === v) return eA;
              if (23 === i || 23 === c) return AA;
              if (16 === c || 16 === i) return eA;
              if (-1 !== [K, L, M].indexOf(c) || 14 === i) return AA;
              if (36 === a && -1 !== aA.indexOf(i)) return AA;
              if (i === N && 36 === c) return AA;
              if (c === T) return AA;
              if (
                (-1 !== rA.indexOf(c) && i === G) ||
                (-1 !== rA.indexOf(i) && c === G)
              )
                return AA;
              if (
                (i === R && -1 !== [_, X, J].indexOf(c)) ||
                (-1 !== [_, X, J].indexOf(i) && c === V)
              )
                return AA;
              if (
                (-1 !== rA.indexOf(i) && -1 !== BA.indexOf(c)) ||
                (-1 !== BA.indexOf(i) && -1 !== rA.indexOf(c))
              )
                return AA;
              if (
                (-1 !== [R, V].indexOf(i) &&
                  (c === G || (-1 !== [O, L].indexOf(c) && e[s + 1] === G))) ||
                (-1 !== [O, L].indexOf(i) && c === G) ||
                (i === G && -1 !== [G, N, k].indexOf(c))
              )
                return AA;
              if (-1 !== [G, N, k, D, x].indexOf(c))
                for (var l = o; l >= 0; ) {
                  if ((u = e[l]) === G) return AA;
                  if (-1 === [N, k].indexOf(u)) break;
                  l--;
                }
              if (-1 !== [R, V].indexOf(c))
                for (l = -1 !== [D, x].indexOf(i) ? B : o; l >= 0; ) {
                  var u;
                  if ((u = e[l]) === G) return AA;
                  if (-1 === [N, k].indexOf(u)) break;
                  l--;
                }
              if (
                (Z === i && -1 !== [Z, j, Y, W].indexOf(c)) ||
                (-1 !== [j, Y].indexOf(i) && -1 !== [j, q].indexOf(c)) ||
                (-1 !== [q, W].indexOf(i) && c === q)
              )
                return AA;
              if (
                (-1 !== iA.indexOf(i) && -1 !== [T, V].indexOf(c)) ||
                (-1 !== iA.indexOf(c) && i === R)
              )
                return AA;
              if (-1 !== rA.indexOf(i) && -1 !== rA.indexOf(c)) return AA;
              if (i === k && -1 !== rA.indexOf(c)) return AA;
              if (
                (-1 !== rA.concat(G).indexOf(i) &&
                  c === O &&
                  -1 === $.indexOf(A[s])) ||
                (-1 !== rA.concat(G).indexOf(c) && i === x)
              )
                return AA;
              if (41 === i && 41 === c) {
                for (var g = t[o], w = 1; g > 0 && 41 === e[--g]; ) w++;
                if (w % 2 != 0) return AA;
              }
              return i === X && c === J ? AA : eA;
            },
            gA = (function () {
              function A(A, e, t, r) {
                ((this.codePoints = A),
                  (this.required = "!" === e),
                  (this.start = t),
                  (this.end = r));
              }
              return (
                (A.prototype.slice = function () {
                  return a.apply(
                    void 0,
                    this.codePoints.slice(this.start, this.end),
                  );
                }),
                A
              );
            })(),
            wA = 45,
            QA = 43,
            dA = -1,
            CA = function (A) {
              return A >= 48 && A <= 57;
            },
            UA = function (A) {
              return CA(A) || (A >= 65 && A <= 70) || (A >= 97 && A <= 102);
            },
            FA = function (A) {
              return 10 === A || 9 === A || 32 === A;
            },
            hA = function (A) {
              return (
                (function (A) {
                  return (
                    (function (A) {
                      return A >= 97 && A <= 122;
                    })(A) ||
                    (function (A) {
                      return A >= 65 && A <= 90;
                    })(A)
                  );
                })(A) ||
                (function (A) {
                  return A >= 128;
                })(A) ||
                95 === A
              );
            },
            fA = function (A) {
              return hA(A) || CA(A) || A === wA;
            },
            pA = function (A) {
              return (
                (A >= 0 && A <= 8) ||
                11 === A ||
                (A >= 14 && A <= 31) ||
                127 === A
              );
            },
            HA = function (A, e) {
              return 92 === A && 10 !== e;
            },
            yA = function (A, e, t) {
              return A === wA
                ? hA(e) || HA(e, t)
                : !!hA(A) || !(92 !== A || !HA(A, e));
            },
            EA = function (A, e, t) {
              return A === QA || A === wA
                ? !!CA(e) || (46 === e && CA(t))
                : CA(46 === A ? e : A);
            },
            mA = function (A) {
              var e = 0,
                t = 1;
              (A[e] !== QA && A[e] !== wA) || (A[e] === wA && (t = -1), e++);
              for (var r = []; CA(A[e]); ) r.push(A[e++]);
              var n = r.length ? parseInt(a.apply(void 0, r), 10) : 0;
              46 === A[e] && e++;
              for (var o = []; CA(A[e]); ) o.push(A[e++]);
              var B = o.length,
                s = B ? parseInt(a.apply(void 0, o), 10) : 0;
              (69 !== A[e] && 101 !== A[e]) || e++;
              var i = 1;
              (A[e] !== QA && A[e] !== wA) || (A[e] === wA && (i = -1), e++);
              for (var c = []; CA(A[e]); ) c.push(A[e++]);
              var l = c.length ? parseInt(a.apply(void 0, c), 10) : 0;
              return t * (n + s * Math.pow(10, -B)) * Math.pow(10, i * l);
            },
            IA = { type: 2 },
            bA = { type: 3 },
            vA = { type: 4 },
            KA = { type: 13 },
            LA = { type: 8 },
            DA = { type: 21 },
            xA = { type: 9 },
            SA = { type: 10 },
            TA = { type: 11 },
            MA = { type: 12 },
            OA = { type: 14 },
            kA = { type: 23 },
            GA = { type: 1 },
            VA = { type: 25 },
            RA = { type: 24 },
            NA = { type: 26 },
            PA = { type: 27 },
            XA = { type: 28 },
            JA = { type: 29 },
            YA = { type: 31 },
            WA = { type: 32 },
            _A = (function () {
              function A() {
                this._value = [];
              }
              return (
                (A.prototype.write = function (A) {
                  this._value = this._value.concat(i(A));
                }),
                (A.prototype.read = function () {
                  for (var A = [], e = this.consumeToken(); e !== WA; )
                    (A.push(e), (e = this.consumeToken()));
                  return A;
                }),
                (A.prototype.consumeToken = function () {
                  var A = this.consumeCodePoint();
                  switch (A) {
                    case 34:
                      return this.consumeStringToken(34);
                    case 35:
                      var e = this.peekCodePoint(0),
                        t = this.peekCodePoint(1),
                        r = this.peekCodePoint(2);
                      if (fA(e) || HA(t, r)) {
                        var n = yA(e, t, r) ? 2 : 1;
                        return { type: 5, value: this.consumeName(), flags: n };
                      }
                      break;
                    case 36:
                      if (61 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), KA);
                      break;
                    case 39:
                      return this.consumeStringToken(39);
                    case 40:
                      return IA;
                    case 41:
                      return bA;
                    case 42:
                      if (61 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), OA);
                      break;
                    case QA:
                      if (EA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                        return (
                          this.reconsumeCodePoint(A),
                          this.consumeNumericToken()
                        );
                      break;
                    case 44:
                      return vA;
                    case wA:
                      var o = A,
                        B = this.peekCodePoint(0),
                        s = this.peekCodePoint(1);
                      if (EA(o, B, s))
                        return (
                          this.reconsumeCodePoint(A),
                          this.consumeNumericToken()
                        );
                      if (yA(o, B, s))
                        return (
                          this.reconsumeCodePoint(A),
                          this.consumeIdentLikeToken()
                        );
                      if (B === wA && 62 === s)
                        return (
                          this.consumeCodePoint(),
                          this.consumeCodePoint(),
                          RA
                        );
                      break;
                    case 46:
                      if (EA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                        return (
                          this.reconsumeCodePoint(A),
                          this.consumeNumericToken()
                        );
                      break;
                    case 47:
                      if (42 === this.peekCodePoint(0))
                        for (this.consumeCodePoint(); ; ) {
                          var i = this.consumeCodePoint();
                          if (42 === i && 47 === (i = this.consumeCodePoint()))
                            return this.consumeToken();
                          if (i === dA) return this.consumeToken();
                        }
                      break;
                    case 58:
                      return NA;
                    case 59:
                      return PA;
                    case 60:
                      if (
                        33 === this.peekCodePoint(0) &&
                        this.peekCodePoint(1) === wA &&
                        this.peekCodePoint(2) === wA
                      )
                        return (
                          this.consumeCodePoint(),
                          this.consumeCodePoint(),
                          VA
                        );
                      break;
                    case 64:
                      var c = this.peekCodePoint(0),
                        l = this.peekCodePoint(1),
                        u = this.peekCodePoint(2);
                      if (yA(c, l, u))
                        return { type: 7, value: this.consumeName() };
                      break;
                    case 91:
                      return XA;
                    case 92:
                      if (HA(A, this.peekCodePoint(0)))
                        return (
                          this.reconsumeCodePoint(A),
                          this.consumeIdentLikeToken()
                        );
                      break;
                    case 93:
                      return JA;
                    case 61:
                      if (61 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), LA);
                      break;
                    case 123:
                      return TA;
                    case 125:
                      return MA;
                    case 117:
                    case 85:
                      var g = this.peekCodePoint(0),
                        w = this.peekCodePoint(1);
                      return (
                        g !== QA ||
                          (!UA(w) && 63 !== w) ||
                          (this.consumeCodePoint(),
                          this.consumeUnicodeRangeToken()),
                        this.reconsumeCodePoint(A),
                        this.consumeIdentLikeToken()
                      );
                    case 124:
                      if (61 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), xA);
                      if (124 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), DA);
                      break;
                    case 126:
                      if (61 === this.peekCodePoint(0))
                        return (this.consumeCodePoint(), SA);
                      break;
                    case dA:
                      return WA;
                  }
                  return FA(A)
                    ? (this.consumeWhiteSpace(), YA)
                    : CA(A)
                      ? (this.reconsumeCodePoint(A), this.consumeNumericToken())
                      : hA(A)
                        ? (this.reconsumeCodePoint(A),
                          this.consumeIdentLikeToken())
                        : { type: 6, value: a(A) };
                }),
                (A.prototype.consumeCodePoint = function () {
                  var A = this._value.shift();
                  return void 0 === A ? -1 : A;
                }),
                (A.prototype.reconsumeCodePoint = function (A) {
                  this._value.unshift(A);
                }),
                (A.prototype.peekCodePoint = function (A) {
                  return A >= this._value.length ? -1 : this._value[A];
                }),
                (A.prototype.consumeUnicodeRangeToken = function () {
                  for (
                    var A = [], e = this.consumeCodePoint();
                    UA(e) && A.length < 6;
                  )
                    (A.push(e), (e = this.consumeCodePoint()));
                  for (var t = !1; 63 === e && A.length < 6; )
                    (A.push(e), (e = this.consumeCodePoint()), (t = !0));
                  if (t)
                    return {
                      type: 30,
                      start: parseInt(
                        a.apply(
                          void 0,
                          A.map(function (A) {
                            return 63 === A ? 48 : A;
                          }),
                        ),
                        16,
                      ),
                      end: parseInt(
                        a.apply(
                          void 0,
                          A.map(function (A) {
                            return 63 === A ? 70 : A;
                          }),
                        ),
                        16,
                      ),
                    };
                  var r = parseInt(a.apply(void 0, A), 16);
                  if (
                    this.peekCodePoint(0) === wA &&
                    UA(this.peekCodePoint(1))
                  ) {
                    (this.consumeCodePoint(), (e = this.consumeCodePoint()));
                    for (var n = []; UA(e) && n.length < 6; )
                      (n.push(e), (e = this.consumeCodePoint()));
                    return {
                      type: 30,
                      start: r,
                      end: parseInt(a.apply(void 0, n), 16),
                    };
                  }
                  return { type: 30, start: r, end: r };
                }),
                (A.prototype.consumeIdentLikeToken = function () {
                  var A = this.consumeName();
                  return "url" === A.toLowerCase() &&
                    40 === this.peekCodePoint(0)
                    ? (this.consumeCodePoint(), this.consumeUrlToken())
                    : 40 === this.peekCodePoint(0)
                      ? (this.consumeCodePoint(), { type: 19, value: A })
                      : { type: 20, value: A };
                }),
                (A.prototype.consumeUrlToken = function () {
                  var A = [];
                  if ((this.consumeWhiteSpace(), this.peekCodePoint(0) === dA))
                    return { type: 22, value: "" };
                  var e = this.peekCodePoint(0);
                  if (39 === e || 34 === e) {
                    var t = this.consumeStringToken(this.consumeCodePoint());
                    return 0 === t.type &&
                      (this.consumeWhiteSpace(),
                      this.peekCodePoint(0) === dA ||
                        41 === this.peekCodePoint(0))
                      ? (this.consumeCodePoint(), { type: 22, value: t.value })
                      : (this.consumeBadUrlRemnants(), kA);
                  }
                  for (;;) {
                    var r = this.consumeCodePoint();
                    if (r === dA || 41 === r)
                      return { type: 22, value: a.apply(void 0, A) };
                    if (FA(r))
                      return (
                        this.consumeWhiteSpace(),
                        this.peekCodePoint(0) === dA ||
                        41 === this.peekCodePoint(0)
                          ? (this.consumeCodePoint(),
                            { type: 22, value: a.apply(void 0, A) })
                          : (this.consumeBadUrlRemnants(), kA)
                      );
                    if (34 === r || 39 === r || 40 === r || pA(r))
                      return (this.consumeBadUrlRemnants(), kA);
                    if (92 === r) {
                      if (!HA(r, this.peekCodePoint(0)))
                        return (this.consumeBadUrlRemnants(), kA);
                      A.push(this.consumeEscapedCodePoint());
                    } else A.push(r);
                  }
                }),
                (A.prototype.consumeWhiteSpace = function () {
                  for (; FA(this.peekCodePoint(0)); ) this.consumeCodePoint();
                }),
                (A.prototype.consumeBadUrlRemnants = function () {
                  for (;;) {
                    var A = this.consumeCodePoint();
                    if (41 === A || A === dA) return;
                    HA(A, this.peekCodePoint(0)) &&
                      this.consumeEscapedCodePoint();
                  }
                }),
                (A.prototype.consumeStringSlice = function (A) {
                  for (var e = ""; A > 0; ) {
                    var t = Math.min(5e4, A);
                    ((e += a.apply(void 0, this._value.splice(0, t))),
                      (A -= t));
                  }
                  return (this._value.shift(), e);
                }),
                (A.prototype.consumeStringToken = function (A) {
                  for (var e = "", t = 0; ; ) {
                    var r = this._value[t];
                    if (r === dA || void 0 === r || r === A)
                      return {
                        type: 0,
                        value: (e += this.consumeStringSlice(t)),
                      };
                    if (10 === r) return (this._value.splice(0, t), GA);
                    if (92 === r) {
                      var n = this._value[t + 1];
                      n !== dA &&
                        void 0 !== n &&
                        (10 === n
                          ? ((e += this.consumeStringSlice(t)),
                            (t = -1),
                            this._value.shift())
                          : HA(r, n) &&
                            ((e += this.consumeStringSlice(t)),
                            (e += a(this.consumeEscapedCodePoint())),
                            (t = -1)));
                    }
                    t++;
                  }
                }),
                (A.prototype.consumeNumber = function () {
                  var A = [],
                    e = 4,
                    t = this.peekCodePoint(0);
                  for (
                    (t !== QA && t !== wA) || A.push(this.consumeCodePoint());
                    CA(this.peekCodePoint(0));
                  )
                    A.push(this.consumeCodePoint());
                  t = this.peekCodePoint(0);
                  var r = this.peekCodePoint(1);
                  if (46 === t && CA(r))
                    for (
                      A.push(this.consumeCodePoint(), this.consumeCodePoint()),
                        e = 8;
                      CA(this.peekCodePoint(0));
                    )
                      A.push(this.consumeCodePoint());
                  ((t = this.peekCodePoint(0)), (r = this.peekCodePoint(1)));
                  var n = this.peekCodePoint(2);
                  if (
                    (69 === t || 101 === t) &&
                    (((r === QA || r === wA) && CA(n)) || CA(r))
                  )
                    for (
                      A.push(this.consumeCodePoint(), this.consumeCodePoint()),
                        e = 8;
                      CA(this.peekCodePoint(0));
                    )
                      A.push(this.consumeCodePoint());
                  return [mA(A), e];
                }),
                (A.prototype.consumeNumericToken = function () {
                  var A = this.consumeNumber(),
                    e = A[0],
                    t = A[1],
                    r = this.peekCodePoint(0),
                    n = this.peekCodePoint(1),
                    o = this.peekCodePoint(2);
                  return yA(r, n, o)
                    ? {
                        type: 15,
                        number: e,
                        flags: t,
                        unit: this.consumeName(),
                      }
                    : 37 === r
                      ? (this.consumeCodePoint(),
                        { type: 16, number: e, flags: t })
                      : { type: 17, number: e, flags: t };
                }),
                (A.prototype.consumeEscapedCodePoint = function () {
                  var A = this.consumeCodePoint();
                  if (UA(A)) {
                    for (
                      var e = a(A);
                      UA(this.peekCodePoint(0)) && e.length < 6;
                    )
                      e += a(this.consumeCodePoint());
                    FA(this.peekCodePoint(0)) && this.consumeCodePoint();
                    var t = parseInt(e, 16);
                    return 0 === t ||
                      (function (A) {
                        return A >= 55296 && A <= 57343;
                      })(t) ||
                      t > 1114111
                      ? 65533
                      : t;
                  }
                  return A === dA ? 65533 : A;
                }),
                (A.prototype.consumeName = function () {
                  for (var A = ""; ; ) {
                    var e = this.consumeCodePoint();
                    if (fA(e)) A += a(e);
                    else {
                      if (!HA(e, this.peekCodePoint(0)))
                        return (this.reconsumeCodePoint(e), A);
                      A += a(this.consumeEscapedCodePoint());
                    }
                  }
                }),
                A
              );
            })(),
            ZA = (function () {
              function A(A) {
                this._tokens = A;
              }
              return (
                (A.create = function (e) {
                  var t = new _A();
                  return (t.write(e), new A(t.read()));
                }),
                (A.parseValue = function (e) {
                  return A.create(e).parseComponentValue();
                }),
                (A.parseValues = function (e) {
                  return A.create(e).parseComponentValues();
                }),
                (A.prototype.parseComponentValue = function () {
                  for (var A = this.consumeToken(); 31 === A.type; )
                    A = this.consumeToken();
                  if (32 === A.type)
                    throw new SyntaxError(
                      "Error parsing CSS component value, unexpected EOF",
                    );
                  this.reconsumeToken(A);
                  var e = this.consumeComponentValue();
                  do {
                    A = this.consumeToken();
                  } while (31 === A.type);
                  if (32 === A.type) return e;
                  throw new SyntaxError(
                    "Error parsing CSS component value, multiple values found when expecting only one",
                  );
                }),
                (A.prototype.parseComponentValues = function () {
                  for (var A = []; ; ) {
                    var e = this.consumeComponentValue();
                    if (32 === e.type) return A;
                    (A.push(e), A.push());
                  }
                }),
                (A.prototype.consumeComponentValue = function () {
                  var A = this.consumeToken();
                  switch (A.type) {
                    case 11:
                    case 28:
                    case 2:
                      return this.consumeSimpleBlock(A.type);
                    case 19:
                      return this.consumeFunction(A);
                  }
                  return A;
                }),
                (A.prototype.consumeSimpleBlock = function (A) {
                  for (
                    var e = { type: A, values: [] }, t = this.consumeToken();
                    ;
                  ) {
                    if (32 === t.type || ne(t, A)) return e;
                    (this.reconsumeToken(t),
                      e.values.push(this.consumeComponentValue()),
                      (t = this.consumeToken()));
                  }
                }),
                (A.prototype.consumeFunction = function (A) {
                  for (var e = { name: A.value, values: [], type: 18 }; ; ) {
                    var t = this.consumeToken();
                    if (32 === t.type || 3 === t.type) return e;
                    (this.reconsumeToken(t),
                      e.values.push(this.consumeComponentValue()));
                  }
                }),
                (A.prototype.consumeToken = function () {
                  var A = this._tokens.shift();
                  return void 0 === A ? WA : A;
                }),
                (A.prototype.reconsumeToken = function (A) {
                  this._tokens.unshift(A);
                }),
                A
              );
            })(),
            jA = function (A) {
              return 15 === A.type;
            },
            qA = function (A) {
              return 17 === A.type;
            },
            zA = function (A) {
              return 20 === A.type;
            },
            $A = function (A) {
              return 0 === A.type;
            },
            Ae = function (A, e) {
              return zA(A) && A.value === e;
            },
            ee = function (A) {
              return 31 !== A.type;
            },
            te = function (A) {
              return 31 !== A.type && 4 !== A.type;
            },
            re = function (A) {
              var e = [],
                t = [];
              return (
                A.forEach(function (A) {
                  if (4 === A.type) {
                    if (0 === t.length)
                      throw new Error(
                        "Error parsing function args, zero tokens for arg",
                      );
                    return (e.push(t), void (t = []));
                  }
                  31 !== A.type && t.push(A);
                }),
                t.length && e.push(t),
                e
              );
            },
            ne = function (A, e) {
              return (
                (11 === e && 12 === A.type) ||
                (28 === e && 29 === A.type) ||
                (2 === e && 3 === A.type)
              );
            },
            oe = function (A) {
              return 17 === A.type || 15 === A.type;
            },
            Be = function (A) {
              return 16 === A.type || oe(A);
            },
            se = function (A) {
              return A.length > 1 ? [A[0], A[1]] : [A[0]];
            },
            ie = { type: 17, number: 0, flags: 4 },
            ae = { type: 16, number: 50, flags: 4 },
            ce = { type: 16, number: 100, flags: 4 },
            le = function (A, e, t) {
              var r = A[0],
                n = A[1];
              return [ue(r, e), ue(void 0 !== n ? n : r, t)];
            },
            ue = function (A, e) {
              if (16 === A.type) return (A.number / 100) * e;
              if (jA(A))
                switch (A.unit) {
                  case "rem":
                  case "em":
                    return 16 * A.number;
                  default:
                    return A.number;
                }
              return A.number;
            },
            ge = "grad",
            we = "turn",
            Qe = function (A, e) {
              if (15 === e.type)
                switch (e.unit) {
                  case "deg":
                    return (Math.PI * e.number) / 180;
                  case ge:
                    return (Math.PI / 200) * e.number;
                  case "rad":
                    return e.number;
                  case we:
                    return 2 * Math.PI * e.number;
                }
              throw new Error("Unsupported angle type");
            },
            de = function (A) {
              return (
                15 === A.type &&
                ("deg" === A.unit ||
                  A.unit === ge ||
                  "rad" === A.unit ||
                  A.unit === we)
              );
            },
            Ce = function (A) {
              switch (
                A.filter(zA)
                  .map(function (A) {
                    return A.value;
                  })
                  .join(" ")
              ) {
                case "to bottom right":
                case "to right bottom":
                case "left top":
                case "top left":
                  return [ie, ie];
                case "to top":
                case "bottom":
                  return Ue(0);
                case "to bottom left":
                case "to left bottom":
                case "right top":
                case "top right":
                  return [ie, ce];
                case "to right":
                case "left":
                  return Ue(90);
                case "to top left":
                case "to left top":
                case "right bottom":
                case "bottom right":
                  return [ce, ce];
                case "to bottom":
                case "top":
                  return Ue(180);
                case "to top right":
                case "to right top":
                case "left bottom":
                case "bottom left":
                  return [ce, ie];
                case "to left":
                case "right":
                  return Ue(270);
              }
              return 0;
            },
            Ue = function (A) {
              return (Math.PI * A) / 180;
            },
            Fe = function (A, e) {
              if (18 === e.type) {
                var t = be[e.name];
                if (void 0 === t)
                  throw new Error(
                    'Attempting to parse an unsupported color function "' +
                      e.name +
                      '"',
                  );
                return t(A, e.values);
              }
              if (5 === e.type) {
                if (3 === e.value.length) {
                  var r = e.value.substring(0, 1),
                    n = e.value.substring(1, 2),
                    o = e.value.substring(2, 3);
                  return pe(
                    parseInt(r + r, 16),
                    parseInt(n + n, 16),
                    parseInt(o + o, 16),
                    1,
                  );
                }
                if (4 === e.value.length) {
                  ((r = e.value.substring(0, 1)),
                    (n = e.value.substring(1, 2)),
                    (o = e.value.substring(2, 3)));
                  var B = e.value.substring(3, 4);
                  return pe(
                    parseInt(r + r, 16),
                    parseInt(n + n, 16),
                    parseInt(o + o, 16),
                    parseInt(B + B, 16) / 255,
                  );
                }
                if (6 === e.value.length)
                  return (
                    (r = e.value.substring(0, 2)),
                    (n = e.value.substring(2, 4)),
                    (o = e.value.substring(4, 6)),
                    pe(parseInt(r, 16), parseInt(n, 16), parseInt(o, 16), 1)
                  );
                if (8 === e.value.length)
                  return (
                    (r = e.value.substring(0, 2)),
                    (n = e.value.substring(2, 4)),
                    (o = e.value.substring(4, 6)),
                    (B = e.value.substring(6, 8)),
                    pe(
                      parseInt(r, 16),
                      parseInt(n, 16),
                      parseInt(o, 16),
                      parseInt(B, 16) / 255,
                    )
                  );
              }
              if (20 === e.type) {
                var s = Ke[e.value.toUpperCase()];
                if (void 0 !== s) return s;
              }
              return Ke.TRANSPARENT;
            },
            he = function (A) {
              return 0 == (255 & A);
            },
            fe = function (A) {
              var e = 255 & A,
                t = 255 & (A >> 8),
                r = 255 & (A >> 16),
                n = 255 & (A >> 24);
              return e < 255
                ? "rgba(" + n + "," + r + "," + t + "," + e / 255 + ")"
                : "rgb(" + n + "," + r + "," + t + ")";
            },
            pe = function (A, e, t, r) {
              return (
                ((A << 24) |
                  (e << 16) |
                  (t << 8) |
                  (Math.round(255 * r) << 0)) >>>
                0
              );
            },
            He = function (A, e) {
              if (17 === A.type) return A.number;
              if (16 === A.type) {
                var t = 3 === e ? 1 : 255;
                return 3 === e
                  ? (A.number / 100) * t
                  : Math.round((A.number / 100) * t);
              }
              return 0;
            },
            ye = function (A, e) {
              var t = e.filter(te);
              if (3 === t.length) {
                var r = t.map(He);
                return pe(r[0], r[1], r[2], 1);
              }
              if (4 === t.length) {
                var n = t.map(He);
                return pe(n[0], n[1], n[2], n[3]);
              }
              return 0;
            };
          function Ee(A, e, t) {
            return (
              t < 0 && (t += 1),
              t >= 1 && (t -= 1),
              t < 1 / 6
                ? (e - A) * t * 6 + A
                : t < 0.5
                  ? e
                  : t < 2 / 3
                    ? 6 * (e - A) * (2 / 3 - t) + A
                    : A
            );
          }
          var me,
            Ie = function (A, e) {
              var t = e.filter(te),
                r = t[0],
                n = t[1],
                o = t[2],
                B = t[3],
                s = (17 === r.type ? Ue(r.number) : Qe(0, r)) / (2 * Math.PI),
                i = Be(n) ? n.number / 100 : 0,
                a = Be(o) ? o.number / 100 : 0,
                c = void 0 !== B && Be(B) ? ue(B, 1) : 1;
              if (0 === i) return pe(255 * a, 255 * a, 255 * a, 1);
              var l = a <= 0.5 ? a * (i + 1) : a + i - a * i,
                u = 2 * a - l,
                g = Ee(u, l, s + 1 / 3),
                w = Ee(u, l, s),
                Q = Ee(u, l, s - 1 / 3);
              return pe(255 * g, 255 * w, 255 * Q, c);
            },
            be = { hsl: Ie, hsla: Ie, rgb: ye, rgba: ye },
            ve = function (A, e) {
              return Fe(A, ZA.create(e).parseComponentValue());
            },
            Ke = {
              ALICEBLUE: 4042850303,
              ANTIQUEWHITE: 4209760255,
              AQUA: 16777215,
              AQUAMARINE: 2147472639,
              AZURE: 4043309055,
              BEIGE: 4126530815,
              BISQUE: 4293182719,
              BLACK: 255,
              BLANCHEDALMOND: 4293643775,
              BLUE: 65535,
              BLUEVIOLET: 2318131967,
              BROWN: 2771004159,
              BURLYWOOD: 3736635391,
              CADETBLUE: 1604231423,
              CHARTREUSE: 2147418367,
              CHOCOLATE: 3530104575,
              CORAL: 4286533887,
              CORNFLOWERBLUE: 1687547391,
              CORNSILK: 4294499583,
              CRIMSON: 3692313855,
              CYAN: 16777215,
              DARKBLUE: 35839,
              DARKCYAN: 9145343,
              DARKGOLDENROD: 3095837695,
              DARKGRAY: 2846468607,
              DARKGREEN: 6553855,
              DARKGREY: 2846468607,
              DARKKHAKI: 3182914559,
              DARKMAGENTA: 2332068863,
              DARKOLIVEGREEN: 1433087999,
              DARKORANGE: 4287365375,
              DARKORCHID: 2570243327,
              DARKRED: 2332033279,
              DARKSALMON: 3918953215,
              DARKSEAGREEN: 2411499519,
              DARKSLATEBLUE: 1211993087,
              DARKSLATEGRAY: 793726975,
              DARKSLATEGREY: 793726975,
              DARKTURQUOISE: 13554175,
              DARKVIOLET: 2483082239,
              DEEPPINK: 4279538687,
              DEEPSKYBLUE: 12582911,
              DIMGRAY: 1768516095,
              DIMGREY: 1768516095,
              DODGERBLUE: 512819199,
              FIREBRICK: 2988581631,
              FLORALWHITE: 4294635775,
              FORESTGREEN: 579543807,
              FUCHSIA: 4278255615,
              GAINSBORO: 3705462015,
              GHOSTWHITE: 4177068031,
              GOLD: 4292280575,
              GOLDENROD: 3668254975,
              GRAY: 2155905279,
              GREEN: 8388863,
              GREENYELLOW: 2919182335,
              GREY: 2155905279,
              HONEYDEW: 4043305215,
              HOTPINK: 4285117695,
              INDIANRED: 3445382399,
              INDIGO: 1258324735,
              IVORY: 4294963455,
              KHAKI: 4041641215,
              LAVENDER: 3873897215,
              LAVENDERBLUSH: 4293981695,
              LAWNGREEN: 2096890111,
              LEMONCHIFFON: 4294626815,
              LIGHTBLUE: 2916673279,
              LIGHTCORAL: 4034953471,
              LIGHTCYAN: 3774873599,
              LIGHTGOLDENRODYELLOW: 4210742015,
              LIGHTGRAY: 3553874943,
              LIGHTGREEN: 2431553791,
              LIGHTGREY: 3553874943,
              LIGHTPINK: 4290167295,
              LIGHTSALMON: 4288707327,
              LIGHTSEAGREEN: 548580095,
              LIGHTSKYBLUE: 2278488831,
              LIGHTSLATEGRAY: 2005441023,
              LIGHTSLATEGREY: 2005441023,
              LIGHTSTEELBLUE: 2965692159,
              LIGHTYELLOW: 4294959359,
              LIME: 16711935,
              LIMEGREEN: 852308735,
              LINEN: 4210091775,
              MAGENTA: 4278255615,
              MAROON: 2147483903,
              MEDIUMAQUAMARINE: 1724754687,
              MEDIUMBLUE: 52735,
              MEDIUMORCHID: 3126187007,
              MEDIUMPURPLE: 2473647103,
              MEDIUMSEAGREEN: 1018393087,
              MEDIUMSLATEBLUE: 2070474495,
              MEDIUMSPRINGGREEN: 16423679,
              MEDIUMTURQUOISE: 1221709055,
              MEDIUMVIOLETRED: 3340076543,
              MIDNIGHTBLUE: 421097727,
              MINTCREAM: 4127193855,
              MISTYROSE: 4293190143,
              MOCCASIN: 4293178879,
              NAVAJOWHITE: 4292783615,
              NAVY: 33023,
              OLDLACE: 4260751103,
              OLIVE: 2155872511,
              OLIVEDRAB: 1804477439,
              ORANGE: 4289003775,
              ORANGERED: 4282712319,
              ORCHID: 3664828159,
              PALEGOLDENROD: 4008225535,
              PALEGREEN: 2566625535,
              PALETURQUOISE: 2951671551,
              PALEVIOLETRED: 3681588223,
              PAPAYAWHIP: 4293907967,
              PEACHPUFF: 4292524543,
              PERU: 3448061951,
              PINK: 4290825215,
              PLUM: 3718307327,
              POWDERBLUE: 2967529215,
              PURPLE: 2147516671,
              REBECCAPURPLE: 1714657791,
              RED: 4278190335,
              ROSYBROWN: 3163525119,
              ROYALBLUE: 1097458175,
              SADDLEBROWN: 2336560127,
              SALMON: 4202722047,
              SANDYBROWN: 4104413439,
              SEAGREEN: 780883967,
              SEASHELL: 4294307583,
              SIENNA: 2689740287,
              SILVER: 3233857791,
              SKYBLUE: 2278484991,
              SLATEBLUE: 1784335871,
              SLATEGRAY: 1887473919,
              SLATEGREY: 1887473919,
              SNOW: 4294638335,
              SPRINGGREEN: 16744447,
              STEELBLUE: 1182971135,
              TAN: 3535047935,
              TEAL: 8421631,
              THISTLE: 3636451583,
              TOMATO: 4284696575,
              TRANSPARENT: 0,
              TURQUOISE: 1088475391,
              VIOLET: 4001558271,
              WHEAT: 4125012991,
              WHITE: 4294967295,
              WHITESMOKE: 4126537215,
              YELLOW: 4294902015,
              YELLOWGREEN: 2597139199,
            },
            Le = {
              name: "background-clip",
              initialValue: "border-box",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return e.map(function (A) {
                  if (zA(A))
                    switch (A.value) {
                      case "padding-box":
                        return 1;
                      case "content-box":
                        return 2;
                    }
                  return 0;
                });
              },
            },
            De = {
              name: "background-color",
              initialValue: "transparent",
              prefix: !1,
              type: 3,
              format: "color",
            },
            xe = function (A, e) {
              var t = Fe(A, e[0]),
                r = e[1];
              return r && Be(r)
                ? { color: t, stop: r }
                : { color: t, stop: null };
            },
            Se = function (A, e) {
              var t = A[0],
                r = A[A.length - 1];
              (null === t.stop && (t.stop = ie),
                null === r.stop && (r.stop = ce));
              for (var n = [], o = 0, B = 0; B < A.length; B++) {
                var s = A[B].stop;
                if (null !== s) {
                  var i = ue(s, e);
                  (n.push(i > o ? i : o), (o = i));
                } else n.push(null);
              }
              var a = null;
              for (B = 0; B < n.length; B++) {
                var c = n[B];
                if (null === c) null === a && (a = B);
                else if (null !== a) {
                  for (
                    var l = B - a, u = (c - n[a - 1]) / (l + 1), g = 1;
                    g <= l;
                    g++
                  )
                    n[a + g - 1] = u * g;
                  a = null;
                }
              }
              return A.map(function (A, t) {
                return {
                  color: A.color,
                  stop: Math.max(Math.min(1, n[t] / e), 0),
                };
              });
            },
            Te = function (A, e) {
              return Math.sqrt(A * A + e * e);
            },
            Me = function (A, e, t, r, n) {
              return [
                [0, 0],
                [0, e],
                [A, 0],
                [A, e],
              ].reduce(
                function (A, e) {
                  var o = Te(t - e[0], r - e[1]);
                  return (n ? o < A.optimumDistance : o > A.optimumDistance)
                    ? { optimumCorner: e, optimumDistance: o }
                    : A;
                },
                {
                  optimumDistance: n ? Infinity : -Infinity,
                  optimumCorner: null,
                },
              ).optimumCorner;
            },
            Oe = function (A, e) {
              var t = Ue(180),
                r = [];
              return (
                re(e).forEach(function (e, n) {
                  if (0 === n) {
                    var o = e[0];
                    if (
                      20 === o.type &&
                      -1 !== ["top", "left", "right", "bottom"].indexOf(o.value)
                    )
                      return void (t = Ce(e));
                    if (de(o)) return void (t = (Qe(0, o) + Ue(270)) % Ue(360));
                  }
                  var B = xe(A, e);
                  r.push(B);
                }),
                { angle: t, stops: r, type: 1 }
              );
            },
            ke = "closest-side",
            Ge = "farthest-side",
            Ve = "closest-corner",
            Re = "farthest-corner",
            Ne = "circle",
            Pe = "ellipse",
            Xe = "cover",
            Je = "contain",
            Ye = function (A, e) {
              var t = 0,
                r = 3,
                n = [],
                o = [];
              return (
                re(e).forEach(function (e, B) {
                  var s = !0;
                  if (
                    (0 === B
                      ? (s = e.reduce(function (A, e) {
                          if (zA(e))
                            switch (e.value) {
                              case "center":
                                return (o.push(ae), !1);
                              case "top":
                              case "left":
                                return (o.push(ie), !1);
                              case "right":
                              case "bottom":
                                return (o.push(ce), !1);
                            }
                          else if (Be(e) || oe(e)) return (o.push(e), !1);
                          return A;
                        }, s))
                      : 1 === B &&
                        (s = e.reduce(function (A, e) {
                          if (zA(e))
                            switch (e.value) {
                              case Ne:
                                return ((t = 0), !1);
                              case Pe:
                                return ((t = 1), !1);
                              case Je:
                              case ke:
                                return ((r = 0), !1);
                              case Ge:
                                return ((r = 1), !1);
                              case Ve:
                                return ((r = 2), !1);
                              case Xe:
                              case Re:
                                return ((r = 3), !1);
                            }
                          else if (oe(e) || Be(e))
                            return (
                              Array.isArray(r) || (r = []),
                              r.push(e),
                              !1
                            );
                          return A;
                        }, s)),
                    s)
                  ) {
                    var i = xe(A, e);
                    n.push(i);
                  }
                }),
                { size: r, shape: t, stops: n, position: o, type: 2 }
              );
            },
            We = function (A, e) {
              if (22 === e.type) {
                var t = { url: e.value, type: 0 };
                return (A.cache.addImage(e.value), t);
              }
              if (18 === e.type) {
                var r = _e[e.name];
                if (void 0 === r)
                  throw new Error(
                    'Attempting to parse an unsupported image function "' +
                      e.name +
                      '"',
                  );
                return r(A, e.values);
              }
              throw new Error("Unsupported image type " + e.type);
            },
            _e = {
              "linear-gradient": function (A, e) {
                var t = Ue(180),
                  r = [];
                return (
                  re(e).forEach(function (e, n) {
                    if (0 === n) {
                      var o = e[0];
                      if (20 === o.type && "to" === o.value)
                        return void (t = Ce(e));
                      if (de(o)) return void (t = Qe(0, o));
                    }
                    var B = xe(A, e);
                    r.push(B);
                  }),
                  { angle: t, stops: r, type: 1 }
                );
              },
              "-moz-linear-gradient": Oe,
              "-ms-linear-gradient": Oe,
              "-o-linear-gradient": Oe,
              "-webkit-linear-gradient": Oe,
              "radial-gradient": function (A, e) {
                var t = 0,
                  r = 3,
                  n = [],
                  o = [];
                return (
                  re(e).forEach(function (e, B) {
                    var s = !0;
                    if (0 === B) {
                      var i = !1;
                      s = e.reduce(function (A, e) {
                        if (i)
                          if (zA(e))
                            switch (e.value) {
                              case "center":
                                return (o.push(ae), A);
                              case "top":
                              case "left":
                                return (o.push(ie), A);
                              case "right":
                              case "bottom":
                                return (o.push(ce), A);
                            }
                          else (Be(e) || oe(e)) && o.push(e);
                        else if (zA(e))
                          switch (e.value) {
                            case Ne:
                              return ((t = 0), !1);
                            case Pe:
                              return ((t = 1), !1);
                            case "at":
                              return ((i = !0), !1);
                            case ke:
                              return ((r = 0), !1);
                            case Xe:
                            case Ge:
                              return ((r = 1), !1);
                            case Je:
                            case Ve:
                              return ((r = 2), !1);
                            case Re:
                              return ((r = 3), !1);
                          }
                        else if (oe(e) || Be(e))
                          return (Array.isArray(r) || (r = []), r.push(e), !1);
                        return A;
                      }, s);
                    }
                    if (s) {
                      var a = xe(A, e);
                      n.push(a);
                    }
                  }),
                  { size: r, shape: t, stops: n, position: o, type: 2 }
                );
              },
              "-moz-radial-gradient": Ye,
              "-ms-radial-gradient": Ye,
              "-o-radial-gradient": Ye,
              "-webkit-radial-gradient": Ye,
              "-webkit-gradient": function (A, e) {
                var t = Ue(180),
                  r = [],
                  n = 1;
                return (
                  re(e).forEach(function (e, t) {
                    var o = e[0];
                    if (0 === t) {
                      if (zA(o) && "linear" === o.value) return void (n = 1);
                      if (zA(o) && "radial" === o.value) return void (n = 2);
                    }
                    if (18 === o.type)
                      if ("from" === o.name) {
                        var B = Fe(A, o.values[0]);
                        r.push({ stop: ie, color: B });
                      } else if ("to" === o.name)
                        ((B = Fe(A, o.values[0])),
                          r.push({ stop: ce, color: B }));
                      else if ("color-stop" === o.name) {
                        var s = o.values.filter(te);
                        if (2 === s.length) {
                          B = Fe(A, s[1]);
                          var i = s[0];
                          qA(i) &&
                            r.push({
                              stop: {
                                type: 16,
                                number: 100 * i.number,
                                flags: i.flags,
                              },
                              color: B,
                            });
                        }
                      }
                  }),
                  1 === n
                    ? { angle: (t + Ue(180)) % Ue(360), stops: r, type: n }
                    : { size: 3, shape: 0, stops: r, position: [], type: n }
                );
              },
            },
            Ze = {
              name: "background-image",
              initialValue: "none",
              type: 1,
              prefix: !1,
              parse: function (A, e) {
                if (0 === e.length) return [];
                var t = e[0];
                return 20 === t.type && "none" === t.value
                  ? []
                  : e
                      .filter(function (A) {
                        return (
                          te(A) &&
                          (function (A) {
                            return !(
                              (20 === A.type && "none" === A.value) ||
                              (18 === A.type && !_e[A.name])
                            );
                          })(A)
                        );
                      })
                      .map(function (e) {
                        return We(A, e);
                      });
              },
            },
            je = {
              name: "background-origin",
              initialValue: "border-box",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return e.map(function (A) {
                  if (zA(A))
                    switch (A.value) {
                      case "padding-box":
                        return 1;
                      case "content-box":
                        return 2;
                    }
                  return 0;
                });
              },
            },
            qe = {
              name: "background-position",
              initialValue: "0% 0%",
              type: 1,
              prefix: !1,
              parse: function (A, e) {
                return re(e)
                  .map(function (A) {
                    return A.filter(Be);
                  })
                  .map(se);
              },
            },
            ze = {
              name: "background-repeat",
              initialValue: "repeat",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return re(e)
                  .map(function (A) {
                    return A.filter(zA)
                      .map(function (A) {
                        return A.value;
                      })
                      .join(" ");
                  })
                  .map($e);
              },
            },
            $e = function (A) {
              switch (A) {
                case "no-repeat":
                  return 1;
                case "repeat-x":
                case "repeat no-repeat":
                  return 2;
                case "repeat-y":
                case "no-repeat repeat":
                  return 3;
                default:
                  return 0;
              }
            };
          !(function (A) {
            ((A.AUTO = "auto"), (A.CONTAIN = "contain"), (A.COVER = "cover"));
          })(me || (me = {}));
          var At,
            et = {
              name: "background-size",
              initialValue: "0",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return re(e).map(function (A) {
                  return A.filter(tt);
                });
              },
            },
            tt = function (A) {
              return zA(A) || Be(A);
            },
            rt = function (A) {
              return {
                name: "border-" + A + "-color",
                initialValue: "transparent",
                prefix: !1,
                type: 3,
                format: "color",
              };
            },
            nt = rt("top"),
            ot = rt("right"),
            Bt = rt("bottom"),
            st = rt("left"),
            it = function (A) {
              return {
                name: "border-radius-" + A,
                initialValue: "0 0",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                  return se(e.filter(Be));
                },
              };
            },
            at = it("top-left"),
            ct = it("top-right"),
            lt = it("bottom-right"),
            ut = it("bottom-left"),
            gt = function (A) {
              return {
                name: "border-" + A + "-style",
                initialValue: "solid",
                prefix: !1,
                type: 2,
                parse: function (A, e) {
                  switch (e) {
                    case "none":
                      return 0;
                    case "dashed":
                      return 2;
                    case "dotted":
                      return 3;
                    case "double":
                      return 4;
                  }
                  return 1;
                },
              };
            },
            wt = gt("top"),
            Qt = gt("right"),
            dt = gt("bottom"),
            Ct = gt("left"),
            Ut = function (A) {
              return {
                name: "border-" + A + "-width",
                initialValue: "0",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                  return jA(e) ? e.number : 0;
                },
              };
            },
            Ft = Ut("top"),
            ht = Ut("right"),
            ft = Ut("bottom"),
            pt = Ut("left"),
            Ht = {
              name: "color",
              initialValue: "transparent",
              prefix: !1,
              type: 3,
              format: "color",
            },
            yt = {
              name: "direction",
              initialValue: "ltr",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                return "rtl" === e ? 1 : 0;
              },
            },
            Et = {
              name: "display",
              initialValue: "inline-block",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return e.filter(zA).reduce(function (A, e) {
                  return A | mt(e.value);
                }, 0);
              },
            },
            mt = function (A) {
              switch (A) {
                case "block":
                case "-webkit-box":
                  return 2;
                case "inline":
                  return 4;
                case "run-in":
                  return 8;
                case "flow":
                  return 16;
                case "flow-root":
                  return 32;
                case "table":
                  return 64;
                case "flex":
                case "-webkit-flex":
                  return 128;
                case "grid":
                case "-ms-grid":
                  return 256;
                case "ruby":
                  return 512;
                case "subgrid":
                  return 1024;
                case "list-item":
                  return 2048;
                case "table-row-group":
                  return 4096;
                case "table-header-group":
                  return 8192;
                case "table-footer-group":
                  return 16384;
                case "table-row":
                  return 32768;
                case "table-cell":
                  return 65536;
                case "table-column-group":
                  return 131072;
                case "table-column":
                  return 262144;
                case "table-caption":
                  return 524288;
                case "ruby-base":
                  return 1048576;
                case "ruby-text":
                  return 2097152;
                case "ruby-base-container":
                  return 4194304;
                case "ruby-text-container":
                  return 8388608;
                case "contents":
                  return 16777216;
                case "inline-block":
                  return 33554432;
                case "inline-list-item":
                  return 67108864;
                case "inline-table":
                  return 134217728;
                case "inline-flex":
                  return 268435456;
                case "inline-grid":
                  return 536870912;
              }
              return 0;
            },
            It = {
              name: "float",
              initialValue: "none",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "left":
                    return 1;
                  case "right":
                    return 2;
                  case "inline-start":
                    return 3;
                  case "inline-end":
                    return 4;
                }
                return 0;
              },
            },
            bt = {
              name: "letter-spacing",
              initialValue: "0",
              prefix: !1,
              type: 0,
              parse: function (A, e) {
                return 20 === e.type && "normal" === e.value
                  ? 0
                  : 17 === e.type || 15 === e.type
                    ? e.number
                    : 0;
              },
            };
          !(function (A) {
            ((A.NORMAL = "normal"), (A.STRICT = "strict"));
          })(At || (At = {}));
          var vt,
            Kt = {
              name: "line-break",
              initialValue: "normal",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                return "strict" === e ? At.STRICT : At.NORMAL;
              },
            },
            Lt = {
              name: "line-height",
              initialValue: "normal",
              prefix: !1,
              type: 4,
            },
            Dt = function (A, e) {
              return zA(A) && "normal" === A.value
                ? 1.2 * e
                : 17 === A.type
                  ? e * A.number
                  : Be(A)
                    ? ue(A, e)
                    : e;
            },
            xt = {
              name: "list-style-image",
              initialValue: "none",
              type: 0,
              prefix: !1,
              parse: function (A, e) {
                return 20 === e.type && "none" === e.value ? null : We(A, e);
              },
            },
            St = {
              name: "list-style-position",
              initialValue: "outside",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                return "inside" === e ? 0 : 1;
              },
            },
            Tt = {
              name: "list-style-type",
              initialValue: "none",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "disc":
                    return 0;
                  case "circle":
                    return 1;
                  case "square":
                    return 2;
                  case "decimal":
                    return 3;
                  case "cjk-decimal":
                    return 4;
                  case "decimal-leading-zero":
                    return 5;
                  case "lower-roman":
                    return 6;
                  case "upper-roman":
                    return 7;
                  case "lower-greek":
                    return 8;
                  case "lower-alpha":
                    return 9;
                  case "upper-alpha":
                    return 10;
                  case "arabic-indic":
                    return 11;
                  case "armenian":
                    return 12;
                  case "bengali":
                    return 13;
                  case "cambodian":
                    return 14;
                  case "cjk-earthly-branch":
                    return 15;
                  case "cjk-heavenly-stem":
                    return 16;
                  case "cjk-ideographic":
                    return 17;
                  case "devanagari":
                    return 18;
                  case "ethiopic-numeric":
                    return 19;
                  case "georgian":
                    return 20;
                  case "gujarati":
                    return 21;
                  case "gurmukhi":
                  case "hebrew":
                    return 22;
                  case "hiragana":
                    return 23;
                  case "hiragana-iroha":
                    return 24;
                  case "japanese-formal":
                    return 25;
                  case "japanese-informal":
                    return 26;
                  case "kannada":
                    return 27;
                  case "katakana":
                    return 28;
                  case "katakana-iroha":
                    return 29;
                  case "khmer":
                    return 30;
                  case "korean-hangul-formal":
                    return 31;
                  case "korean-hanja-formal":
                    return 32;
                  case "korean-hanja-informal":
                    return 33;
                  case "lao":
                    return 34;
                  case "lower-armenian":
                    return 35;
                  case "malayalam":
                    return 36;
                  case "mongolian":
                    return 37;
                  case "myanmar":
                    return 38;
                  case "oriya":
                    return 39;
                  case "persian":
                    return 40;
                  case "simp-chinese-formal":
                    return 41;
                  case "simp-chinese-informal":
                    return 42;
                  case "tamil":
                    return 43;
                  case "telugu":
                    return 44;
                  case "thai":
                    return 45;
                  case "tibetan":
                    return 46;
                  case "trad-chinese-formal":
                    return 47;
                  case "trad-chinese-informal":
                    return 48;
                  case "upper-armenian":
                    return 49;
                  case "disclosure-open":
                    return 50;
                  case "disclosure-closed":
                    return 51;
                  default:
                    return -1;
                }
              },
            },
            Mt = function (A) {
              return {
                name: "margin-" + A,
                initialValue: "0",
                prefix: !1,
                type: 4,
              };
            },
            Ot = Mt("top"),
            kt = Mt("right"),
            Gt = Mt("bottom"),
            Vt = Mt("left"),
            Rt = {
              name: "overflow",
              initialValue: "visible",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return e.filter(zA).map(function (A) {
                  switch (A.value) {
                    case "hidden":
                      return 1;
                    case "scroll":
                      return 2;
                    case "clip":
                      return 3;
                    case "auto":
                      return 4;
                    default:
                      return 0;
                  }
                });
              },
            },
            Nt = {
              name: "overflow-wrap",
              initialValue: "normal",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                return "break-word" === e ? "break-word" : "normal";
              },
            },
            Pt = function (A) {
              return {
                name: "padding-" + A,
                initialValue: "0",
                prefix: !1,
                type: 3,
                format: "length-percentage",
              };
            },
            Xt = Pt("top"),
            Jt = Pt("right"),
            Yt = Pt("bottom"),
            Wt = Pt("left"),
            _t = {
              name: "text-align",
              initialValue: "left",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "right":
                    return 2;
                  case "center":
                  case "justify":
                    return 1;
                  default:
                    return 0;
                }
              },
            },
            Zt = {
              name: "position",
              initialValue: "static",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "relative":
                    return 1;
                  case "absolute":
                    return 2;
                  case "fixed":
                    return 3;
                  case "sticky":
                    return 4;
                }
                return 0;
              },
            },
            jt = {
              name: "text-shadow",
              initialValue: "none",
              type: 1,
              prefix: !1,
              parse: function (A, e) {
                return 1 === e.length && Ae(e[0], "none")
                  ? []
                  : re(e).map(function (e) {
                      for (
                        var t = {
                            color: Ke.TRANSPARENT,
                            offsetX: ie,
                            offsetY: ie,
                            blur: ie,
                          },
                          r = 0,
                          n = 0;
                        n < e.length;
                        n++
                      ) {
                        var o = e[n];
                        oe(o)
                          ? (0 === r
                              ? (t.offsetX = o)
                              : 1 === r
                                ? (t.offsetY = o)
                                : (t.blur = o),
                            r++)
                          : (t.color = Fe(A, o));
                      }
                      return t;
                    });
              },
            },
            qt = {
              name: "text-transform",
              initialValue: "none",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "uppercase":
                    return 2;
                  case "lowercase":
                    return 1;
                  case "capitalize":
                    return 3;
                }
                return 0;
              },
            },
            zt = {
              name: "transform",
              initialValue: "none",
              prefix: !0,
              type: 0,
              parse: function (A, e) {
                if (20 === e.type && "none" === e.value) return null;
                if (18 === e.type) {
                  var t = $t[e.name];
                  if (void 0 === t)
                    throw new Error(
                      'Attempting to parse an unsupported transform function "' +
                        e.name +
                        '"',
                    );
                  return t(e.values);
                }
                return null;
              },
            },
            $t = {
              matrix: function (A) {
                var e = A.filter(function (A) {
                  return 17 === A.type;
                }).map(function (A) {
                  return A.number;
                });
                return 6 === e.length ? e : null;
              },
              matrix3d: function (A) {
                var e = A.filter(function (A) {
                  return 17 === A.type;
                }).map(function (A) {
                  return A.number;
                });
                return 16 === e.length
                  ? [e[0], e[1], e[4], e[5], e[12], e[13]]
                  : null;
              },
            },
            Ar = { type: 16, number: 50, flags: 4 },
            er = [Ar, Ar],
            tr = {
              name: "transform-origin",
              initialValue: "50% 50%",
              prefix: !0,
              type: 1,
              parse: function (A, e) {
                var t = e.filter(Be);
                return 2 !== t.length ? er : [t[0], t[1]];
              },
            },
            rr = {
              name: "visible",
              initialValue: "none",
              prefix: !1,
              type: 2,
              parse: function (A, e) {
                switch (e) {
                  case "hidden":
                    return 1;
                  case "collapse":
                    return 2;
                  default:
                    return 0;
                }
              },
            };
          !(function (A) {
            ((A.NORMAL = "normal"),
              (A.BREAK_ALL = "break-all"),
              (A.KEEP_ALL = "keep-all"));
          })(vt || (vt = {}));
          for (
            var nr = {
                name: "word-break",
                initialValue: "normal",
                prefix: !1,
                type: 2,
                parse: function (A, e) {
                  switch (e) {
                    case "break-all":
                      return vt.BREAK_ALL;
                    case "keep-all":
                      return vt.KEEP_ALL;
                    default:
                      return vt.NORMAL;
                  }
                },
              },
              or = {
                name: "z-index",
                initialValue: "auto",
                prefix: !1,
                type: 0,
                parse: function (A, e) {
                  if (20 === e.type) return { auto: !0, order: 0 };
                  if (qA(e)) return { auto: !1, order: e.number };
                  throw new Error("Invalid z-index number parsed");
                },
              },
              Br = {
                name: "time",
                parse: function (A, e) {
                  if (15 === e.type)
                    switch (e.unit.toLowerCase()) {
                      case "s":
                        return 1e3 * e.number;
                      case "ms":
                        return e.number;
                    }
                  throw new Error("Unsupported time type");
                },
              },
              sr = {
                name: "opacity",
                initialValue: "1",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                  return qA(e) ? e.number : 1;
                },
              },
              ir = {
                name: "text-decoration-color",
                initialValue: "transparent",
                prefix: !1,
                type: 3,
                format: "color",
              },
              ar = {
                name: "text-decoration-line",
                initialValue: "none",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                  return e
                    .filter(zA)
                    .map(function (A) {
                      switch (A.value) {
                        case "underline":
                          return 1;
                        case "overline":
                          return 2;
                        case "line-through":
                          return 3;
                        case "none":
                          return 4;
                      }
                      return 0;
                    })
                    .filter(function (A) {
                      return 0 !== A;
                    });
                },
              },
              cr = {
                name: "font-family",
                initialValue: "",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                  var t = [],
                    r = [];
                  return (
                    e.forEach(function (A) {
                      switch (A.type) {
                        case 20:
                        case 0:
                          t.push(A.value);
                          break;
                        case 17:
                          t.push(A.number.toString());
                          break;
                        case 4:
                          (r.push(t.join(" ")), (t.length = 0));
                      }
                    }),
                    t.length && r.push(t.join(" ")),
                    r.map(function (A) {
                      return -1 === A.indexOf(" ") ? A : "'" + A + "'";
                    })
                  );
                },
              },
              lr = {
                name: "font-size",
                initialValue: "0",
                prefix: !1,
                type: 3,
                format: "length",
              },
              ur = {
                name: "font-weight",
                initialValue: "normal",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                  return qA(e)
                    ? e.number
                    : zA(e) && "bold" === e.value
                      ? 700
                      : 400;
                },
              },
              gr = {
                name: "font-variant",
                initialValue: "none",
                type: 1,
                prefix: !1,
                parse: function (A, e) {
                  return e.filter(zA).map(function (A) {
                    return A.value;
                  });
                },
              },
              wr = {
                name: "font-style",
                initialValue: "normal",
                prefix: !1,
                type: 2,
                parse: function (A, e) {
                  switch (e) {
                    case "oblique":
                      return "oblique";
                    case "italic":
                      return "italic";
                    default:
                      return "normal";
                  }
                },
              },
              Qr = function (A, e) {
                return 0 != (A & e);
              },
              dr = {
                name: "content",
                initialValue: "none",
                type: 1,
                prefix: !1,
                parse: function (A, e) {
                  if (0 === e.length) return [];
                  var t = e[0];
                  return 20 === t.type && "none" === t.value ? [] : e;
                },
              },
              Cr = {
                name: "counter-increment",
                initialValue: "none",
                prefix: !0,
                type: 1,
                parse: function (A, e) {
                  if (0 === e.length) return null;
                  var t = e[0];
                  if (20 === t.type && "none" === t.value) return null;
                  for (var r = [], n = e.filter(ee), o = 0; o < n.length; o++) {
                    var B = n[o],
                      s = n[o + 1];
                    if (20 === B.type) {
                      var i = s && qA(s) ? s.number : 1;
                      r.push({ counter: B.value, increment: i });
                    }
                  }
                  return r;
                },
              },
              Ur = {
                name: "counter-reset",
                initialValue: "none",
                prefix: !0,
                type: 1,
                parse: function (A, e) {
                  if (0 === e.length) return [];
                  for (var t = [], r = e.filter(ee), n = 0; n < r.length; n++) {
                    var o = r[n],
                      B = r[n + 1];
                    if (zA(o) && "none" !== o.value) {
                      var s = B && qA(B) ? B.number : 0;
                      t.push({ counter: o.value, reset: s });
                    }
                  }
                  return t;
                },
              },
              Fr = {
                name: "duration",
                initialValue: "0s",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                  return e.filter(jA).map(function (e) {
                    return Br.parse(A, e);
                  });
                },
              },
              hr = {
                name: "quotes",
                initialValue: "none",
                prefix: !0,
                type: 1,
                parse: function (A, e) {
                  if (0 === e.length) return null;
                  var t = e[0];
                  if (20 === t.type && "none" === t.value) return null;
                  var r = [],
                    n = e.filter($A);
                  if (n.length % 2 != 0) return null;
                  for (var o = 0; o < n.length; o += 2)
                    r.push({ open: n[o].value, close: n[o + 1].value });
                  return r;
                },
              },
              fr = function (A, e, t) {
                if (!A) return "";
                var r = A[Math.min(e, A.length - 1)];
                return r ? (t ? r.open : r.close) : "";
              },
              pr = {
                name: "box-shadow",
                initialValue: "none",
                type: 1,
                prefix: !1,
                parse: function (A, e) {
                  return 1 === e.length && Ae(e[0], "none")
                    ? []
                    : re(e).map(function (e) {
                        for (
                          var t = {
                              color: 255,
                              offsetX: ie,
                              offsetY: ie,
                              blur: ie,
                              spread: ie,
                              inset: !1,
                            },
                            r = 0,
                            n = 0;
                          n < e.length;
                          n++
                        ) {
                          var o = e[n];
                          Ae(o, "inset")
                            ? (t.inset = !0)
                            : oe(o)
                              ? (0 === r
                                  ? (t.offsetX = o)
                                  : 1 === r
                                    ? (t.offsetY = o)
                                    : 2 === r
                                      ? (t.blur = o)
                                      : (t.spread = o),
                                r++)
                              : (t.color = Fe(A, o));
                        }
                        return t;
                      });
                },
              },
              Hr = {
                name: "paint-order",
                initialValue: "normal",
                prefix: !1,
                type: 1,
                parse: function (A, e) {
                  var t = [];
                  return (
                    e.filter(zA).forEach(function (A) {
                      switch (A.value) {
                        case "stroke":
                          t.push(1);
                          break;
                        case "fill":
                          t.push(0);
                          break;
                        case "markers":
                          t.push(2);
                      }
                    }),
                    [0, 1, 2].forEach(function (A) {
                      -1 === t.indexOf(A) && t.push(A);
                    }),
                    t
                  );
                },
              },
              yr = {
                name: "-webkit-text-stroke-color",
                initialValue: "currentcolor",
                prefix: !1,
                type: 3,
                format: "color",
              },
              Er = {
                name: "-webkit-text-stroke-width",
                initialValue: "0",
                type: 0,
                prefix: !1,
                parse: function (A, e) {
                  return jA(e) ? e.number : 0;
                },
              },
              mr = (function () {
                function A(A, e) {
                  var t, r;
                  ((this.animationDuration = vr(A, Fr, e.animationDuration)),
                    (this.backgroundClip = vr(A, Le, e.backgroundClip)),
                    (this.backgroundColor = vr(A, De, e.backgroundColor)),
                    (this.backgroundImage = vr(A, Ze, e.backgroundImage)),
                    (this.backgroundOrigin = vr(A, je, e.backgroundOrigin)),
                    (this.backgroundPosition = vr(A, qe, e.backgroundPosition)),
                    (this.backgroundRepeat = vr(A, ze, e.backgroundRepeat)),
                    (this.backgroundSize = vr(A, et, e.backgroundSize)),
                    (this.borderTopColor = vr(A, nt, e.borderTopColor)),
                    (this.borderRightColor = vr(A, ot, e.borderRightColor)),
                    (this.borderBottomColor = vr(A, Bt, e.borderBottomColor)),
                    (this.borderLeftColor = vr(A, st, e.borderLeftColor)),
                    (this.borderTopLeftRadius = vr(
                      A,
                      at,
                      e.borderTopLeftRadius,
                    )),
                    (this.borderTopRightRadius = vr(
                      A,
                      ct,
                      e.borderTopRightRadius,
                    )),
                    (this.borderBottomRightRadius = vr(
                      A,
                      lt,
                      e.borderBottomRightRadius,
                    )),
                    (this.borderBottomLeftRadius = vr(
                      A,
                      ut,
                      e.borderBottomLeftRadius,
                    )),
                    (this.borderTopStyle = vr(A, wt, e.borderTopStyle)),
                    (this.borderRightStyle = vr(A, Qt, e.borderRightStyle)),
                    (this.borderBottomStyle = vr(A, dt, e.borderBottomStyle)),
                    (this.borderLeftStyle = vr(A, Ct, e.borderLeftStyle)),
                    (this.borderTopWidth = vr(A, Ft, e.borderTopWidth)),
                    (this.borderRightWidth = vr(A, ht, e.borderRightWidth)),
                    (this.borderBottomWidth = vr(A, ft, e.borderBottomWidth)),
                    (this.borderLeftWidth = vr(A, pt, e.borderLeftWidth)),
                    (this.boxShadow = vr(A, pr, e.boxShadow)),
                    (this.color = vr(A, Ht, e.color)),
                    (this.direction = vr(A, yt, e.direction)),
                    (this.display = vr(A, Et, e.display)),
                    (this.float = vr(A, It, e.cssFloat)),
                    (this.fontFamily = vr(A, cr, e.fontFamily)),
                    (this.fontSize = vr(A, lr, e.fontSize)),
                    (this.fontStyle = vr(A, wr, e.fontStyle)),
                    (this.fontVariant = vr(A, gr, e.fontVariant)),
                    (this.fontWeight = vr(A, ur, e.fontWeight)),
                    (this.letterSpacing = vr(A, bt, e.letterSpacing)),
                    (this.lineBreak = vr(A, Kt, e.lineBreak)),
                    (this.lineHeight = vr(A, Lt, e.lineHeight)),
                    (this.listStyleImage = vr(A, xt, e.listStyleImage)),
                    (this.listStylePosition = vr(A, St, e.listStylePosition)),
                    (this.listStyleType = vr(A, Tt, e.listStyleType)),
                    (this.marginTop = vr(A, Ot, e.marginTop)),
                    (this.marginRight = vr(A, kt, e.marginRight)),
                    (this.marginBottom = vr(A, Gt, e.marginBottom)),
                    (this.marginLeft = vr(A, Vt, e.marginLeft)),
                    (this.opacity = vr(A, sr, e.opacity)));
                  var n = vr(A, Rt, e.overflow);
                  ((this.overflowX = n[0]),
                    (this.overflowY = n[n.length > 1 ? 1 : 0]),
                    (this.overflowWrap = vr(A, Nt, e.overflowWrap)),
                    (this.paddingTop = vr(A, Xt, e.paddingTop)),
                    (this.paddingRight = vr(A, Jt, e.paddingRight)),
                    (this.paddingBottom = vr(A, Yt, e.paddingBottom)),
                    (this.paddingLeft = vr(A, Wt, e.paddingLeft)),
                    (this.paintOrder = vr(A, Hr, e.paintOrder)),
                    (this.position = vr(A, Zt, e.position)),
                    (this.textAlign = vr(A, _t, e.textAlign)),
                    (this.textDecorationColor = vr(
                      A,
                      ir,
                      null !== (t = e.textDecorationColor) && void 0 !== t
                        ? t
                        : e.color,
                    )),
                    (this.textDecorationLine = vr(
                      A,
                      ar,
                      null !== (r = e.textDecorationLine) && void 0 !== r
                        ? r
                        : e.textDecoration,
                    )),
                    (this.textShadow = vr(A, jt, e.textShadow)),
                    (this.textTransform = vr(A, qt, e.textTransform)),
                    (this.transform = vr(A, zt, e.transform)),
                    (this.transformOrigin = vr(A, tr, e.transformOrigin)),
                    (this.visibility = vr(A, rr, e.visibility)),
                    (this.webkitTextStrokeColor = vr(
                      A,
                      yr,
                      e.webkitTextStrokeColor,
                    )),
                    (this.webkitTextStrokeWidth = vr(
                      A,
                      Er,
                      e.webkitTextStrokeWidth,
                    )),
                    (this.wordBreak = vr(A, nr, e.wordBreak)),
                    (this.zIndex = vr(A, or, e.zIndex)));
                }
                return (
                  (A.prototype.isVisible = function () {
                    return (
                      this.display > 0 &&
                      this.opacity > 0 &&
                      0 === this.visibility
                    );
                  }),
                  (A.prototype.isTransparent = function () {
                    return he(this.backgroundColor);
                  }),
                  (A.prototype.isTransformed = function () {
                    return null !== this.transform;
                  }),
                  (A.prototype.isPositioned = function () {
                    return 0 !== this.position;
                  }),
                  (A.prototype.isPositionedWithZIndex = function () {
                    return this.isPositioned() && !this.zIndex.auto;
                  }),
                  (A.prototype.isFloating = function () {
                    return 0 !== this.float;
                  }),
                  (A.prototype.isInlineLevel = function () {
                    return (
                      Qr(this.display, 4) ||
                      Qr(this.display, 33554432) ||
                      Qr(this.display, 268435456) ||
                      Qr(this.display, 536870912) ||
                      Qr(this.display, 67108864) ||
                      Qr(this.display, 134217728)
                    );
                  }),
                  A
                );
              })(),
              Ir = function (A, e) {
                ((this.content = vr(A, dr, e.content)),
                  (this.quotes = vr(A, hr, e.quotes)));
              },
              br = function (A, e) {
                ((this.counterIncrement = vr(A, Cr, e.counterIncrement)),
                  (this.counterReset = vr(A, Ur, e.counterReset)));
              },
              vr = function (A, e, t) {
                var r = new _A(),
                  n = null != t ? t.toString() : e.initialValue;
                r.write(n);
                var o = new ZA(r.read());
                switch (e.type) {
                  case 2:
                    var B = o.parseComponentValue();
                    return e.parse(A, zA(B) ? B.value : e.initialValue);
                  case 0:
                    return e.parse(A, o.parseComponentValue());
                  case 1:
                    return e.parse(A, o.parseComponentValues());
                  case 4:
                    return o.parseComponentValue();
                  case 3:
                    switch (e.format) {
                      case "angle":
                        return Qe(0, o.parseComponentValue());
                      case "color":
                        return Fe(A, o.parseComponentValue());
                      case "image":
                        return We(A, o.parseComponentValue());
                      case "length":
                        var s = o.parseComponentValue();
                        return oe(s) ? s : ie;
                      case "length-percentage":
                        var i = o.parseComponentValue();
                        return Be(i) ? i : ie;
                      case "time":
                        return Br.parse(A, o.parseComponentValue());
                    }
                }
              },
              Kr = function (A, e) {
                var t = (function (A) {
                  switch (A.getAttribute("data-html2canvas-debug")) {
                    case "all":
                      return 1;
                    case "clone":
                      return 2;
                    case "parse":
                      return 3;
                    case "render":
                      return 4;
                    default:
                      return 0;
                  }
                })(A);
                return 1 === t || e === t;
              },
              Lr = function (A, e) {
                ((this.context = A),
                  (this.textNodes = []),
                  (this.elements = []),
                  (this.flags = 0),
                  Kr(e, 3),
                  (this.styles = new mr(A, window.getComputedStyle(e, null))),
                  Dn(e) &&
                    (this.styles.animationDuration.some(function (A) {
                      return A > 0;
                    }) && (e.style.animationDuration = "0s"),
                    null !== this.styles.transform &&
                      (e.style.transform = "none")),
                  (this.bounds = s(this.context, e)),
                  Kr(e, 4) && (this.flags |= 16));
              },
              Dr =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              xr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              Sr = 0;
            Sr < Dr.length;
            Sr++
          )
            xr[Dr.charCodeAt(Sr)] = Sr;
          for (
            var Tr = function (A, e, t) {
                return A.slice
                  ? A.slice(e, t)
                  : new Uint16Array(Array.prototype.slice.call(A, e, t));
              },
              Mr = (function () {
                function A(A, e, t, r, n, o) {
                  ((this.initialValue = A),
                    (this.errorValue = e),
                    (this.highStart = t),
                    (this.highValueIndex = r),
                    (this.index = n),
                    (this.data = o));
                }
                return (
                  (A.prototype.get = function (A) {
                    var e;
                    if (A >= 0) {
                      if (A < 55296 || (A > 56319 && A <= 65535))
                        return this.data[
                          (e = ((e = this.index[A >> 5]) << 2) + (31 & A))
                        ];
                      if (A <= 65535)
                        return this.data[
                          (e =
                            ((e = this.index[2048 + ((A - 55296) >> 5)]) << 2) +
                            (31 & A))
                        ];
                      if (A < this.highStart)
                        return (
                          (e = this.index[(e = 2080 + (A >> 11))]),
                          this.data[
                            (e =
                              ((e = this.index[(e += (A >> 5) & 63)]) << 2) +
                              (31 & A))
                          ]
                        );
                      if (A <= 1114111) return this.data[this.highValueIndex];
                    }
                    return this.errorValue;
                  }),
                  A
                );
              })(),
              Or =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              kr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              Gr = 0;
            Gr < Or.length;
            Gr++
          )
            kr[Or.charCodeAt(Gr)] = Gr;
          var Vr,
            Rr = 8,
            Nr = 9,
            Pr = 11,
            Xr = 12,
            Jr = function () {
              for (var A = [], e = 0; e < arguments.length; e++)
                A[e] = arguments[e];
              if (String.fromCodePoint)
                return String.fromCodePoint.apply(String, A);
              var t = A.length;
              if (!t) return "";
              for (var r = [], n = -1, o = ""; ++n < t; ) {
                var B = A[n];
                (B <= 65535
                  ? r.push(B)
                  : r.push(55296 + ((B -= 65536) >> 10), (B % 1024) + 56320),
                  (n + 1 === t || r.length > 16384) &&
                    ((o += String.fromCharCode.apply(String, r)),
                    (r.length = 0)));
              }
              return o;
            },
            Yr = (function (A, e) {
              var t,
                r,
                n,
                o = (function (A) {
                  var e,
                    t,
                    r,
                    n,
                    o,
                    B = 0.75 * A.length,
                    s = A.length,
                    i = 0;
                  "=" === A[A.length - 1] &&
                    (B--, "=" === A[A.length - 2] && B--);
                  var a =
                      "undefined" != typeof ArrayBuffer &&
                      "undefined" != typeof Uint8Array &&
                      void 0 !== Uint8Array.prototype.slice
                        ? new ArrayBuffer(B)
                        : new Array(B),
                    c = Array.isArray(a) ? a : new Uint8Array(a);
                  for (e = 0; e < s; e += 4)
                    ((t = xr[A.charCodeAt(e)]),
                      (r = xr[A.charCodeAt(e + 1)]),
                      (n = xr[A.charCodeAt(e + 2)]),
                      (o = xr[A.charCodeAt(e + 3)]),
                      (c[i++] = (t << 2) | (r >> 4)),
                      (c[i++] = ((15 & r) << 4) | (n >> 2)),
                      (c[i++] = ((3 & n) << 6) | (63 & o)));
                  return a;
                })(
                  "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",
                ),
                B = Array.isArray(o)
                  ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 4)
                        t.push(
                          (A[r + 3] << 24) |
                            (A[r + 2] << 16) |
                            (A[r + 1] << 8) |
                            A[r],
                        );
                      return t;
                    })(o)
                  : new Uint32Array(o),
                s = Array.isArray(o)
                  ? (function (A) {
                      for (var e = A.length, t = [], r = 0; r < e; r += 2)
                        t.push((A[r + 1] << 8) | A[r]);
                      return t;
                    })(o)
                  : new Uint16Array(o),
                i = Tr(s, 12, B[4] / 2),
                a =
                  2 === B[5]
                    ? Tr(s, (24 + B[4]) / 2)
                    : ((t = B),
                      (r = Math.ceil((24 + B[4]) / 4)),
                      t.slice
                        ? t.slice(r, n)
                        : new Uint32Array(Array.prototype.slice.call(t, r, n)));
              return new Mr(B[0], B[1], B[2], B[3], i, a);
            })(),
            Wr = "×",
            _r = function (A) {
              return Yr.get(A);
            },
            Zr = function (A, e, t) {
              var r = t - 2,
                n = e[r],
                o = e[t - 1],
                B = e[t];
              if (2 === o && 3 === B) return Wr;
              if (2 === o || 3 === o || 4 === o) return "÷";
              if (2 === B || 3 === B || 4 === B) return "÷";
              if (o === Rr && -1 !== [Rr, Nr, Pr, Xr].indexOf(B)) return Wr;
              if (!((o !== Pr && o !== Nr) || (B !== Nr && 10 !== B)))
                return Wr;
              if ((o === Xr || 10 === o) && 10 === B) return Wr;
              if (13 === B || 5 === B) return Wr;
              if (7 === B) return Wr;
              if (1 === o) return Wr;
              if (13 === o && 14 === B) {
                for (; 5 === n; ) n = e[--r];
                if (14 === n) return Wr;
              }
              if (15 === o && 15 === B) {
                for (var s = 0; 15 === n; ) (s++, (n = e[--r]));
                if (s % 2 == 0) return Wr;
              }
              return "÷";
            },
            jr = function (A) {
              var e = (function (A) {
                  for (var e = [], t = 0, r = A.length; t < r; ) {
                    var n = A.charCodeAt(t++);
                    if (n >= 55296 && n <= 56319 && t < r) {
                      var o = A.charCodeAt(t++);
                      56320 == (64512 & o)
                        ? e.push(((1023 & n) << 10) + (1023 & o) + 65536)
                        : (e.push(n), t--);
                    } else e.push(n);
                  }
                  return e;
                })(A),
                t = e.length,
                r = 0,
                n = 0,
                o = e.map(_r);
              return {
                next: function () {
                  if (r >= t) return { done: !0, value: null };
                  for (var A = Wr; r < t && (A = Zr(0, o, ++r)) === Wr; );
                  if (A !== Wr || r === t) {
                    var B = Jr.apply(null, e.slice(n, r));
                    return ((n = r), { value: B, done: !1 });
                  }
                  return { done: !0, value: null };
                },
              };
            },
            qr = function (A) {
              return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
            },
            zr = function (A, e, t, r, n) {
              var o = "http://www.w3.org/2000/svg",
                B = document.createElementNS(o, "svg"),
                s = document.createElementNS(o, "foreignObject");
              return (
                B.setAttributeNS(null, "width", A.toString()),
                B.setAttributeNS(null, "height", e.toString()),
                s.setAttributeNS(null, "width", "100%"),
                s.setAttributeNS(null, "height", "100%"),
                s.setAttributeNS(null, "x", t.toString()),
                s.setAttributeNS(null, "y", r.toString()),
                s.setAttributeNS(null, "externalResourcesRequired", "true"),
                B.appendChild(s),
                s.appendChild(n),
                B
              );
            },
            $r = function (A) {
              return new Promise(function (e, t) {
                var r = new Image();
                ((r.onload = function () {
                  return e(r);
                }),
                  (r.onerror = t),
                  (r.src =
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(
                      new XMLSerializer().serializeToString(A),
                    )));
              });
            },
            An = {
              get SUPPORT_RANGE_BOUNDS() {
                var A = (function (A) {
                  if (A.createRange) {
                    var e = A.createRange();
                    if (e.getBoundingClientRect) {
                      var t = A.createElement("boundtest");
                      ((t.style.height = "123px"),
                        (t.style.display = "block"),
                        A.body.appendChild(t),
                        e.selectNode(t));
                      var r = e.getBoundingClientRect(),
                        n = Math.round(r.height);
                      if ((A.body.removeChild(t), 123 === n)) return !0;
                    }
                  }
                  return !1;
                })(document);
                return (
                  Object.defineProperty(An, "SUPPORT_RANGE_BOUNDS", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_WORD_BREAKING() {
                var A =
                  An.SUPPORT_RANGE_BOUNDS &&
                  (function (A) {
                    var e = A.createElement("boundtest");
                    ((e.style.width = "50px"),
                      (e.style.display = "block"),
                      (e.style.fontSize = "12px"),
                      (e.style.letterSpacing = "0px"),
                      (e.style.wordSpacing = "0px"),
                      A.body.appendChild(e));
                    var t = A.createRange();
                    e.innerHTML =
                      "function" == typeof "".repeat
                        ? "&#128104;".repeat(10)
                        : "";
                    var r = e.firstChild,
                      n = i(r.data).map(function (A) {
                        return a(A);
                      }),
                      o = 0,
                      B = {},
                      s = n.every(function (A, e) {
                        (t.setStart(r, o), t.setEnd(r, o + A.length));
                        var n = t.getBoundingClientRect();
                        o += A.length;
                        var s = n.x > B.x || n.y > B.y;
                        return ((B = n), 0 === e || s);
                      });
                    return (A.body.removeChild(e), s);
                  })(document);
                return (
                  Object.defineProperty(An, "SUPPORT_WORD_BREAKING", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_SVG_DRAWING() {
                var A = (function (A) {
                  var e = new Image(),
                    t = A.createElement("canvas"),
                    r = t.getContext("2d");
                  if (!r) return !1;
                  e.src =
                    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                  try {
                    (r.drawImage(e, 0, 0), t.toDataURL());
                  } catch (A) {
                    return !1;
                  }
                  return !0;
                })(document);
                return (
                  Object.defineProperty(An, "SUPPORT_SVG_DRAWING", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_FOREIGNOBJECT_DRAWING() {
                var A =
                  "function" == typeof Array.from &&
                  "function" == typeof window.fetch
                    ? (function (A) {
                        var e = A.createElement("canvas"),
                          t = 100;
                        ((e.width = t), (e.height = t));
                        var r = e.getContext("2d");
                        if (!r) return Promise.reject(!1);
                        ((r.fillStyle = "rgb(0, 255, 0)"),
                          r.fillRect(0, 0, t, t));
                        var n = new Image(),
                          o = e.toDataURL();
                        n.src = o;
                        var B = zr(t, t, 0, 0, n);
                        return (
                          (r.fillStyle = "red"),
                          r.fillRect(0, 0, t, t),
                          $r(B)
                            .then(function (e) {
                              r.drawImage(e, 0, 0);
                              var n = r.getImageData(0, 0, t, t).data;
                              ((r.fillStyle = "red"), r.fillRect(0, 0, t, t));
                              var B = A.createElement("div");
                              return (
                                (B.style.backgroundImage = "url(" + o + ")"),
                                (B.style.height = "100px"),
                                qr(n)
                                  ? $r(zr(t, t, 0, 0, B))
                                  : Promise.reject(!1)
                              );
                            })
                            .then(function (A) {
                              return (
                                r.drawImage(A, 0, 0),
                                qr(r.getImageData(0, 0, t, t).data)
                              );
                            })
                            .catch(function () {
                              return !1;
                            })
                        );
                      })(document)
                    : Promise.resolve(!1);
                return (
                  Object.defineProperty(An, "SUPPORT_FOREIGNOBJECT_DRAWING", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_CORS_IMAGES() {
                var A = void 0 !== new Image().crossOrigin;
                return (
                  Object.defineProperty(An, "SUPPORT_CORS_IMAGES", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_RESPONSE_TYPE() {
                var A = "string" == typeof new XMLHttpRequest().responseType;
                return (
                  Object.defineProperty(An, "SUPPORT_RESPONSE_TYPE", {
                    value: A,
                  }),
                  A
                );
              },
              get SUPPORT_CORS_XHR() {
                var A = "withCredentials" in new XMLHttpRequest();
                return (
                  Object.defineProperty(An, "SUPPORT_CORS_XHR", { value: A }),
                  A
                );
              },
              get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
                var A = !("undefined" == typeof Intl || !Intl.Segmenter);
                return (
                  Object.defineProperty(
                    An,
                    "SUPPORT_NATIVE_TEXT_SEGMENTATION",
                    { value: A },
                  ),
                  A
                );
              },
            },
            en = function (A, e) {
              ((this.text = A), (this.bounds = e));
            },
            tn = function (A, e, t) {
              var r = A.ownerDocument;
              if (!r) throw new Error("Node has no owner document");
              var n = r.createRange();
              return (n.setStart(A, e), n.setEnd(A, e + t), n);
            },
            rn = function (A) {
              if (An.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
                return Array.from(e.segment(A)).map(function (A) {
                  return A.segment;
                });
              }
              return (function (A) {
                for (var e, t = jr(A), r = []; !(e = t.next()).done; )
                  e.value && r.push(e.value.slice());
                return r;
              })(A);
            },
            nn = [32, 160, 4961, 65792, 65793, 4153, 4241],
            on = function (A, e, t) {
              ((this.text = Bn(e.data, t.textTransform)),
                (this.textBounds = (function (A, e, t, r) {
                  var n = (function (A, e) {
                      return 0 !== e.letterSpacing
                        ? rn(A)
                        : (function (A, e) {
                            if (An.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
                              var t = new Intl.Segmenter(void 0, {
                                granularity: "word",
                              });
                              return Array.from(t.segment(A)).map(function (A) {
                                return A.segment;
                              });
                            }
                            return (function (A, e) {
                              for (
                                var t,
                                  r = (function (A, e) {
                                    var t = i(A),
                                      r = (function (A, e) {
                                        e ||
                                          (e = {
                                            lineBreak: "normal",
                                            wordBreak: "normal",
                                          });
                                        var t = (function (A, e) {
                                            void 0 === e && (e = "strict");
                                            var t = [],
                                              r = [],
                                              n = [];
                                            return (
                                              A.forEach(function (A, o) {
                                                var B = tA.get(A);
                                                if (
                                                  (B > 50
                                                    ? (n.push(!0), (B -= 50))
                                                    : n.push(!1),
                                                  -1 !==
                                                    [
                                                      "normal",
                                                      "auto",
                                                      "loose",
                                                    ].indexOf(e) &&
                                                    -1 !==
                                                      [
                                                        8208, 8211, 12316,
                                                        12448,
                                                      ].indexOf(A))
                                                )
                                                  return (
                                                    r.push(o),
                                                    t.push(16)
                                                  );
                                                if (4 === B || 11 === B) {
                                                  if (0 === o)
                                                    return (
                                                      r.push(o),
                                                      t.push(P)
                                                    );
                                                  var s = t[o - 1];
                                                  return -1 === sA.indexOf(s)
                                                    ? (r.push(r[o - 1]),
                                                      t.push(s))
                                                    : (r.push(o), t.push(P));
                                                }
                                                return (
                                                  r.push(o),
                                                  31 === B
                                                    ? t.push(
                                                        "strict" === e ? M : _,
                                                      )
                                                    : B === z || 29 === B
                                                      ? t.push(P)
                                                      : 43 === B
                                                        ? t.push(
                                                            (A >= 131072 &&
                                                              A <= 196605) ||
                                                              (A >= 196608 &&
                                                                A <= 262141)
                                                              ? _
                                                              : P,
                                                          )
                                                        : void t.push(B)
                                                );
                                              }),
                                              [r, t, n]
                                            );
                                          })(A, e.lineBreak),
                                          r = t[0],
                                          n = t[1],
                                          o = t[2];
                                        ("break-all" !== e.wordBreak &&
                                          "break-word" !== e.wordBreak) ||
                                          (n = n.map(function (A) {
                                            return -1 !== [G, P, z].indexOf(A)
                                              ? _
                                              : A;
                                          }));
                                        var B =
                                          "keep-all" === e.wordBreak
                                            ? o.map(function (e, t) {
                                                return (
                                                  e &&
                                                  A[t] >= 19968 &&
                                                  A[t] <= 40959
                                                );
                                              })
                                            : void 0;
                                        return [r, n, B];
                                      })(t, e),
                                      n = r[0],
                                      o = r[1],
                                      B = r[2],
                                      s = t.length,
                                      a = 0,
                                      c = 0;
                                    return {
                                      next: function () {
                                        if (c >= s)
                                          return { done: !0, value: null };
                                        for (
                                          var A = AA;
                                          c < s &&
                                          (A = uA(t, o, n, ++c, B)) === AA;
                                        );
                                        if (A !== AA || c === s) {
                                          var e = new gA(t, A, a, c);
                                          return (
                                            (a = c),
                                            { value: e, done: !1 }
                                          );
                                        }
                                        return { done: !0, value: null };
                                      },
                                    };
                                  })(A, {
                                    lineBreak: e.lineBreak,
                                    wordBreak:
                                      "break-word" === e.overflowWrap
                                        ? "break-word"
                                        : e.wordBreak,
                                  }),
                                  n = [],
                                  o = function () {
                                    if (t.value) {
                                      var A = t.value.slice(),
                                        e = i(A),
                                        r = "";
                                      (e.forEach(function (A) {
                                        -1 === nn.indexOf(A)
                                          ? (r += a(A))
                                          : (r.length && n.push(r),
                                            n.push(a(A)),
                                            (r = ""));
                                      }),
                                        r.length && n.push(r));
                                    }
                                  };
                                !(t = r.next()).done;
                              )
                                o();
                              return n;
                            })(A, e);
                          })(A, e);
                    })(e, t),
                    o = [],
                    c = 0;
                  return (
                    n.forEach(function (e) {
                      if (t.textDecorationLine.length || e.trim().length > 0)
                        if (An.SUPPORT_RANGE_BOUNDS) {
                          var n = tn(r, c, e.length).getClientRects();
                          if (n.length > 1) {
                            var i = rn(e),
                              a = 0;
                            i.forEach(function (e) {
                              (o.push(
                                new en(
                                  e,
                                  B.fromDOMRectList(
                                    A,
                                    tn(r, a + c, e.length).getClientRects(),
                                  ),
                                ),
                              ),
                                (a += e.length));
                            });
                          } else o.push(new en(e, B.fromDOMRectList(A, n)));
                        } else {
                          var l = r.splitText(e.length);
                          (o.push(
                            new en(
                              e,
                              (function (A, e) {
                                var t = e.ownerDocument;
                                if (t) {
                                  var r = t.createElement("html2canvaswrapper");
                                  r.appendChild(e.cloneNode(!0));
                                  var n = e.parentNode;
                                  if (n) {
                                    n.replaceChild(r, e);
                                    var o = s(A, r);
                                    return (
                                      r.firstChild &&
                                        n.replaceChild(r.firstChild, r),
                                      o
                                    );
                                  }
                                }
                                return B.EMPTY;
                              })(A, r),
                            ),
                          ),
                            (r = l));
                        }
                      else
                        An.SUPPORT_RANGE_BOUNDS || (r = r.splitText(e.length));
                      c += e.length;
                    }),
                    o
                  );
                })(A, this.text, t, e)));
            },
            Bn = function (A, e) {
              switch (e) {
                case 1:
                  return A.toLowerCase();
                case 3:
                  return A.replace(sn, an);
                case 2:
                  return A.toUpperCase();
                default:
                  return A;
              }
            },
            sn = /(^|\s|:|-|\(|\))([a-z])/g,
            an = function (A, e, t) {
              return A.length > 0 ? e + t.toUpperCase() : A;
            },
            cn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return (
                  (r.src = t.currentSrc || t.src),
                  (r.intrinsicWidth = t.naturalWidth),
                  (r.intrinsicHeight = t.naturalHeight),
                  r.context.cache.addImage(r.src),
                  r
                );
              }
              return (e(t, A), t);
            })(Lr),
            ln = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return (
                  (r.canvas = t),
                  (r.intrinsicWidth = t.width),
                  (r.intrinsicHeight = t.height),
                  r
                );
              }
              return (e(t, A), t);
            })(Lr),
            un = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this,
                  n = new XMLSerializer(),
                  o = s(e, t);
                return (
                  t.setAttribute("width", o.width + "px"),
                  t.setAttribute("height", o.height + "px"),
                  (r.svg =
                    "data:image/svg+xml," +
                    encodeURIComponent(n.serializeToString(t))),
                  (r.intrinsicWidth = t.width.baseVal.value),
                  (r.intrinsicHeight = t.height.baseVal.value),
                  r.context.cache.addImage(r.svg),
                  r
                );
              }
              return (e(t, A), t);
            })(Lr),
            gn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return ((r.value = t.value), r);
              }
              return (e(t, A), t);
            })(Lr),
            wn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return (
                  (r.start = t.start),
                  (r.reversed =
                    "boolean" == typeof t.reversed && !0 === t.reversed),
                  r
                );
              }
              return (e(t, A), t);
            })(Lr),
            Qn = [{ type: 15, flags: 0, unit: "px", number: 3 }],
            dn = [{ type: 16, flags: 0, number: 50 }],
            Cn = "checkbox",
            Un = "radio",
            Fn = 707406591,
            hn = (function (A) {
              function t(e, t) {
                var r,
                  n,
                  o,
                  s = A.call(this, e, t) || this;
                switch (
                  ((s.type = t.type.toLowerCase()),
                  (s.checked = t.checked),
                  (s.value =
                    0 ===
                    (o =
                      "password" === (n = t).type
                        ? new Array(n.value.length + 1).join("•")
                        : n.value).length
                      ? n.placeholder || ""
                      : o),
                  (s.type !== Cn && s.type !== Un) ||
                    ((s.styles.backgroundColor = 3739148031),
                    (s.styles.borderTopColor =
                      s.styles.borderRightColor =
                      s.styles.borderBottomColor =
                      s.styles.borderLeftColor =
                        2779096575),
                    (s.styles.borderTopWidth =
                      s.styles.borderRightWidth =
                      s.styles.borderBottomWidth =
                      s.styles.borderLeftWidth =
                        1),
                    (s.styles.borderTopStyle =
                      s.styles.borderRightStyle =
                      s.styles.borderBottomStyle =
                      s.styles.borderLeftStyle =
                        1),
                    (s.styles.backgroundClip = [0]),
                    (s.styles.backgroundOrigin = [0]),
                    (s.bounds =
                      (r = s.bounds).width > r.height
                        ? new B(
                            r.left + (r.width - r.height) / 2,
                            r.top,
                            r.height,
                            r.height,
                          )
                        : r.width < r.height
                          ? new B(
                              r.left,
                              r.top + (r.height - r.width) / 2,
                              r.width,
                              r.width,
                            )
                          : r)),
                  s.type)
                ) {
                  case Cn:
                    s.styles.borderTopRightRadius =
                      s.styles.borderTopLeftRadius =
                      s.styles.borderBottomRightRadius =
                      s.styles.borderBottomLeftRadius =
                        Qn;
                    break;
                  case Un:
                    s.styles.borderTopRightRadius =
                      s.styles.borderTopLeftRadius =
                      s.styles.borderBottomRightRadius =
                      s.styles.borderBottomLeftRadius =
                        dn;
                }
                return s;
              }
              return (e(t, A), t);
            })(Lr),
            fn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this,
                  n = t.options[t.selectedIndex || 0];
                return ((r.value = (n && n.text) || ""), r);
              }
              return (e(t, A), t);
            })(Lr),
            pn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return ((r.value = t.value), r);
              }
              return (e(t, A), t);
            })(Lr),
            Hn = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                ((r.src = t.src),
                  (r.width = parseInt(t.width, 10) || 0),
                  (r.height = parseInt(t.height, 10) || 0),
                  (r.backgroundColor = r.styles.backgroundColor));
                try {
                  if (
                    t.contentWindow &&
                    t.contentWindow.document &&
                    t.contentWindow.document.documentElement
                  ) {
                    r.tree = In(e, t.contentWindow.document.documentElement);
                    var n = t.contentWindow.document.documentElement
                        ? ve(
                            e,
                            getComputedStyle(
                              t.contentWindow.document.documentElement,
                            ).backgroundColor,
                          )
                        : Ke.TRANSPARENT,
                      o = t.contentWindow.document.body
                        ? ve(
                            e,
                            getComputedStyle(t.contentWindow.document.body)
                              .backgroundColor,
                          )
                        : Ke.TRANSPARENT;
                    r.backgroundColor = he(n)
                      ? he(o)
                        ? r.styles.backgroundColor
                        : o
                      : n;
                  }
                } catch (A) {}
                return r;
              }
              return (e(t, A), t);
            })(Lr),
            yn = ["OL", "UL", "MENU"],
            En = function (A, e, t, r) {
              for (var n = e.firstChild, o = void 0; n; n = o)
                if (((o = n.nextSibling), Kn(n) && n.data.trim().length > 0))
                  t.textNodes.push(new on(A, n, t.styles));
                else if (Ln(n))
                  if (Yn(n) && n.assignedNodes)
                    n.assignedNodes().forEach(function (e) {
                      return En(A, e, t, r);
                    });
                  else {
                    var B = mn(A, n);
                    B.styles.isVisible() &&
                      (bn(n, B, r)
                        ? (B.flags |= 4)
                        : vn(B.styles) && (B.flags |= 2),
                      -1 !== yn.indexOf(n.tagName) && (B.flags |= 8),
                      t.elements.push(B),
                      n.shadowRoot
                        ? En(A, n.shadowRoot, B, r)
                        : Xn(n) || On(n) || Jn(n) || En(A, n, B, r));
                  }
            },
            mn = function (A, e) {
              return Rn(e)
                ? new cn(A, e)
                : Gn(e)
                  ? new ln(A, e)
                  : On(e)
                    ? new un(A, e)
                    : Sn(e)
                      ? new gn(A, e)
                      : Tn(e)
                        ? new wn(A, e)
                        : Mn(e)
                          ? new hn(A, e)
                          : Jn(e)
                            ? new fn(A, e)
                            : Xn(e)
                              ? new pn(A, e)
                              : Nn(e)
                                ? new Hn(A, e)
                                : new Lr(A, e);
            },
            In = function (A, e) {
              var t = mn(A, e);
              return ((t.flags |= 4), En(A, e, t, t), t);
            },
            bn = function (A, e, t) {
              return (
                e.styles.isPositionedWithZIndex() ||
                e.styles.opacity < 1 ||
                e.styles.isTransformed() ||
                (kn(A) && t.styles.isTransparent())
              );
            },
            vn = function (A) {
              return A.isPositioned() || A.isFloating();
            },
            Kn = function (A) {
              return A.nodeType === Node.TEXT_NODE;
            },
            Ln = function (A) {
              return A.nodeType === Node.ELEMENT_NODE;
            },
            Dn = function (A) {
              return Ln(A) && void 0 !== A.style && !xn(A);
            },
            xn = function (A) {
              return "object" == typeof A.className;
            },
            Sn = function (A) {
              return "LI" === A.tagName;
            },
            Tn = function (A) {
              return "OL" === A.tagName;
            },
            Mn = function (A) {
              return "INPUT" === A.tagName;
            },
            On = function (A) {
              return "svg" === A.tagName;
            },
            kn = function (A) {
              return "BODY" === A.tagName;
            },
            Gn = function (A) {
              return "CANVAS" === A.tagName;
            },
            Vn = function (A) {
              return "VIDEO" === A.tagName;
            },
            Rn = function (A) {
              return "IMG" === A.tagName;
            },
            Nn = function (A) {
              return "IFRAME" === A.tagName;
            },
            Pn = function (A) {
              return "STYLE" === A.tagName;
            },
            Xn = function (A) {
              return "TEXTAREA" === A.tagName;
            },
            Jn = function (A) {
              return "SELECT" === A.tagName;
            },
            Yn = function (A) {
              return "SLOT" === A.tagName;
            },
            Wn = function (A) {
              return A.tagName.indexOf("-") > 0;
            },
            _n = (function () {
              function A() {
                this.counters = {};
              }
              return (
                (A.prototype.getCounterValue = function (A) {
                  var e = this.counters[A];
                  return e && e.length ? e[e.length - 1] : 1;
                }),
                (A.prototype.getCounterValues = function (A) {
                  return this.counters[A] || [];
                }),
                (A.prototype.pop = function (A) {
                  var e = this;
                  A.forEach(function (A) {
                    return e.counters[A].pop();
                  });
                }),
                (A.prototype.parse = function (A) {
                  var e = this,
                    t = A.counterIncrement,
                    r = A.counterReset,
                    n = !0;
                  null !== t &&
                    t.forEach(function (A) {
                      var t = e.counters[A.counter];
                      t &&
                        0 !== A.increment &&
                        ((n = !1),
                        t.length || t.push(1),
                        (t[Math.max(0, t.length - 1)] += A.increment));
                    });
                  var o = [];
                  return (
                    n &&
                      r.forEach(function (A) {
                        var t = e.counters[A.counter];
                        (o.push(A.counter),
                          t || (t = e.counters[A.counter] = []),
                          t.push(A.reset));
                      }),
                    o
                  );
                }),
                A
              );
            })(),
            Zn = {
              integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
              values: [
                "M",
                "CM",
                "D",
                "CD",
                "C",
                "XC",
                "L",
                "XL",
                "X",
                "IX",
                "V",
                "IV",
                "I",
              ],
            },
            jn = {
              integers: [
                9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600,
                500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9,
                8, 7, 6, 5, 4, 3, 2, 1,
              ],
              values: [
                "Ք",
                "Փ",
                "Ւ",
                "Ց",
                "Ր",
                "Տ",
                "Վ",
                "Ս",
                "Ռ",
                "Ջ",
                "Պ",
                "Չ",
                "Ո",
                "Շ",
                "Ն",
                "Յ",
                "Մ",
                "Ճ",
                "Ղ",
                "Ձ",
                "Հ",
                "Կ",
                "Ծ",
                "Խ",
                "Լ",
                "Ի",
                "Ժ",
                "Թ",
                "Ը",
                "Է",
                "Զ",
                "Ե",
                "Դ",
                "Գ",
                "Բ",
                "Ա",
              ],
            },
            qn = {
              integers: [
                1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200,
                100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9,
                8, 7, 6, 5, 4, 3, 2, 1,
              ],
              values: [
                "י׳",
                "ט׳",
                "ח׳",
                "ז׳",
                "ו׳",
                "ה׳",
                "ד׳",
                "ג׳",
                "ב׳",
                "א׳",
                "ת",
                "ש",
                "ר",
                "ק",
                "צ",
                "פ",
                "ע",
                "ס",
                "נ",
                "מ",
                "ל",
                "כ",
                "יט",
                "יח",
                "יז",
                "טז",
                "טו",
                "י",
                "ט",
                "ח",
                "ז",
                "ו",
                "ה",
                "ד",
                "ג",
                "ב",
                "א",
              ],
            },
            zn = {
              integers: [
                1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700,
                600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20,
                10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
              ],
              values: [
                "ჵ",
                "ჰ",
                "ჯ",
                "ჴ",
                "ხ",
                "ჭ",
                "წ",
                "ძ",
                "ც",
                "ჩ",
                "შ",
                "ყ",
                "ღ",
                "ქ",
                "ფ",
                "ჳ",
                "ტ",
                "ს",
                "რ",
                "ჟ",
                "პ",
                "ო",
                "ჲ",
                "ნ",
                "მ",
                "ლ",
                "კ",
                "ი",
                "თ",
                "ჱ",
                "ზ",
                "ვ",
                "ე",
                "დ",
                "გ",
                "ბ",
                "ა",
              ],
            },
            $n = function (A, e, t, r, n, o) {
              return A < e || A > t
                ? io(A, n, o.length > 0)
                : r.integers.reduce(function (e, t, n) {
                    for (; A >= t; ) ((A -= t), (e += r.values[n]));
                    return e;
                  }, "") + o;
            },
            Ao = function (A, e, t, r) {
              var n = "";
              do {
                (t || A--, (n = r(A) + n), (A /= e));
              } while (A * e >= e);
              return n;
            },
            eo = function (A, e, t, r, n) {
              var o = t - e + 1;
              return (
                (A < 0 ? "-" : "") +
                (Ao(Math.abs(A), o, r, function (A) {
                  return a(Math.floor(A % o) + e);
                }) +
                  n)
              );
            },
            to = function (A, e, t) {
              void 0 === t && (t = ". ");
              var r = e.length;
              return (
                Ao(Math.abs(A), r, !1, function (A) {
                  return e[Math.floor(A % r)];
                }) + t
              );
            },
            ro = function (A, e, t, r, n, o) {
              if (A < -9999 || A > 9999) return io(A, 4, n.length > 0);
              var B = Math.abs(A),
                s = n;
              if (0 === B) return e[0] + s;
              for (var i = 0; B > 0 && i <= 4; i++) {
                var a = B % 10;
                (0 === a && Qr(o, 1) && "" !== s
                  ? (s = e[a] + s)
                  : a > 1 ||
                      (1 === a && 0 === i) ||
                      (1 === a && 1 === i && Qr(o, 2)) ||
                      (1 === a && 1 === i && Qr(o, 4) && A > 100) ||
                      (1 === a && i > 1 && Qr(o, 8))
                    ? (s = e[a] + (i > 0 ? t[i - 1] : "") + s)
                    : 1 === a && i > 0 && (s = t[i - 1] + s),
                  (B = Math.floor(B / 10)));
              }
              return (A < 0 ? r : "") + s;
            },
            no = "十百千萬",
            oo = "拾佰仟萬",
            Bo = "マイナス",
            so = "마이너스",
            io = function (A, e, t) {
              var r = t ? ". " : "",
                n = t ? "、" : "",
                o = t ? ", " : "",
                B = t ? " " : "";
              switch (e) {
                case 0:
                  return "•" + B;
                case 1:
                  return "◦" + B;
                case 2:
                  return "◾" + B;
                case 5:
                  var s = eo(A, 48, 57, !0, r);
                  return s.length < 4 ? "0" + s : s;
                case 4:
                  return to(A, "〇一二三四五六七八九", n);
                case 6:
                  return $n(A, 1, 3999, Zn, 3, r).toLowerCase();
                case 7:
                  return $n(A, 1, 3999, Zn, 3, r);
                case 8:
                  return eo(A, 945, 969, !1, r);
                case 9:
                  return eo(A, 97, 122, !1, r);
                case 10:
                  return eo(A, 65, 90, !1, r);
                case 11:
                  return eo(A, 1632, 1641, !0, r);
                case 12:
                case 49:
                  return $n(A, 1, 9999, jn, 3, r);
                case 35:
                  return $n(A, 1, 9999, jn, 3, r).toLowerCase();
                case 13:
                  return eo(A, 2534, 2543, !0, r);
                case 14:
                case 30:
                  return eo(A, 6112, 6121, !0, r);
                case 15:
                  return to(A, "子丑寅卯辰巳午未申酉戌亥", n);
                case 16:
                  return to(A, "甲乙丙丁戊己庚辛壬癸", n);
                case 17:
                case 48:
                  return ro(A, "零一二三四五六七八九", no, "負", n, 14);
                case 47:
                  return ro(A, "零壹貳參肆伍陸柒捌玖", oo, "負", n, 15);
                case 42:
                  return ro(A, "零一二三四五六七八九", no, "负", n, 14);
                case 41:
                  return ro(A, "零壹贰叁肆伍陆柒捌玖", oo, "负", n, 15);
                case 26:
                  return ro(A, "〇一二三四五六七八九", "十百千万", Bo, n, 0);
                case 25:
                  return ro(A, "零壱弐参四伍六七八九", "拾百千万", Bo, n, 7);
                case 31:
                  return ro(A, "영일이삼사오육칠팔구", "십백천만", so, o, 7);
                case 33:
                  return ro(A, "零一二三四五六七八九", "十百千萬", so, o, 0);
                case 32:
                  return ro(A, "零壹貳參四五六七八九", "拾百千", so, o, 7);
                case 18:
                  return eo(A, 2406, 2415, !0, r);
                case 20:
                  return $n(A, 1, 19999, zn, 3, r);
                case 21:
                  return eo(A, 2790, 2799, !0, r);
                case 22:
                  return eo(A, 2662, 2671, !0, r);
                case 22:
                  return $n(A, 1, 10999, qn, 3, r);
                case 23:
                  return to(
                    A,
                    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん",
                  );
                case 24:
                  return to(
                    A,
                    "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす",
                  );
                case 27:
                  return eo(A, 3302, 3311, !0, r);
                case 28:
                  return to(
                    A,
                    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",
                    n,
                  );
                case 29:
                  return to(
                    A,
                    "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",
                    n,
                  );
                case 34:
                  return eo(A, 3792, 3801, !0, r);
                case 37:
                  return eo(A, 6160, 6169, !0, r);
                case 38:
                  return eo(A, 4160, 4169, !0, r);
                case 39:
                  return eo(A, 2918, 2927, !0, r);
                case 40:
                  return eo(A, 1776, 1785, !0, r);
                case 43:
                  return eo(A, 3046, 3055, !0, r);
                case 44:
                  return eo(A, 3174, 3183, !0, r);
                case 45:
                  return eo(A, 3664, 3673, !0, r);
                case 46:
                  return eo(A, 3872, 3881, !0, r);
                default:
                  return eo(A, 48, 57, !0, r);
              }
            },
            ao = "data-html2canvas-ignore",
            co = (function () {
              function A(A, e, t) {
                if (
                  ((this.context = A),
                  (this.options = t),
                  (this.scrolledElements = []),
                  (this.referenceElement = e),
                  (this.counters = new _n()),
                  (this.quoteDepth = 0),
                  !e.ownerDocument)
                )
                  throw new Error(
                    "Cloned element does not have an owner document",
                  );
                this.documentElement = this.cloneNode(
                  e.ownerDocument.documentElement,
                  !1,
                );
              }
              return (
                (A.prototype.toIFrame = function (A, e) {
                  var t = this,
                    o = uo(A, e);
                  if (!o.contentWindow)
                    return Promise.reject("Unable to find iframe window");
                  var B = A.defaultView.pageXOffset,
                    s = A.defaultView.pageYOffset,
                    i = o.contentWindow,
                    a = i.document,
                    c = Qo(o).then(function () {
                      return r(t, void 0, void 0, function () {
                        var A, t;
                        return n(this, function (r) {
                          switch (r.label) {
                            case 0:
                              return (
                                this.scrolledElements.forEach(fo),
                                i &&
                                  (i.scrollTo(e.left, e.top),
                                  !/(iPad|iPhone|iPod)/g.test(
                                    navigator.userAgent,
                                  ) ||
                                    (i.scrollY === e.top &&
                                      i.scrollX === e.left) ||
                                    (this.context.logger.warn(
                                      "Unable to restore scroll position for cloned document",
                                    ),
                                    (this.context.windowBounds =
                                      this.context.windowBounds.add(
                                        i.scrollX - e.left,
                                        i.scrollY - e.top,
                                        0,
                                        0,
                                      )))),
                                (A = this.options.onclone),
                                void 0 === (t = this.clonedReferenceElement)
                                  ? [
                                      2,
                                      Promise.reject(
                                        "Error finding the " +
                                          this.referenceElement.nodeName +
                                          " in the cloned document",
                                      ),
                                    ]
                                  : a.fonts && a.fonts.ready
                                    ? [4, a.fonts.ready]
                                    : [3, 2]
                              );
                            case 1:
                              (r.sent(), (r.label = 2));
                            case 2:
                              return /(AppleWebKit)/g.test(navigator.userAgent)
                                ? [4, wo(a)]
                                : [3, 4];
                            case 3:
                              (r.sent(), (r.label = 4));
                            case 4:
                              return "function" == typeof A
                                ? [
                                    2,
                                    Promise.resolve()
                                      .then(function () {
                                        return A(a, t);
                                      })
                                      .then(function () {
                                        return o;
                                      }),
                                  ]
                                : [2, o];
                          }
                        });
                      });
                    });
                  return (
                    a.open(),
                    a.write(Fo(document.doctype) + "<html></html>"),
                    ho(this.referenceElement.ownerDocument, B, s),
                    a.replaceChild(
                      a.adoptNode(this.documentElement),
                      a.documentElement,
                    ),
                    a.close(),
                    c
                  );
                }),
                (A.prototype.createElementClone = function (A) {
                  if ((Kr(A, 2), Gn(A))) return this.createCanvasClone(A);
                  if (Vn(A)) return this.createVideoClone(A);
                  if (Pn(A)) return this.createStyleClone(A);
                  var e = A.cloneNode(!1);
                  return (
                    Rn(e) &&
                      (Rn(A) &&
                        A.currentSrc &&
                        A.currentSrc !== A.src &&
                        ((e.src = A.currentSrc), (e.srcset = "")),
                      "lazy" === e.loading && (e.loading = "eager")),
                    Wn(e) ? this.createCustomElementClone(e) : e
                  );
                }),
                (A.prototype.createCustomElementClone = function (A) {
                  var e = document.createElement("html2canvascustomelement");
                  return (Uo(A.style, e), e);
                }),
                (A.prototype.createStyleClone = function (A) {
                  try {
                    var e = A.sheet;
                    if (e && e.cssRules) {
                      var t = [].slice.call(e.cssRules, 0).reduce(function (
                          A,
                          e,
                        ) {
                          return e && "string" == typeof e.cssText
                            ? A + e.cssText
                            : A;
                        }, ""),
                        r = A.cloneNode(!1);
                      return ((r.textContent = t), r);
                    }
                  } catch (A) {
                    if (
                      (this.context.logger.error(
                        "Unable to access cssRules property",
                        A,
                      ),
                      "SecurityError" !== A.name)
                    )
                      throw A;
                  }
                  return A.cloneNode(!1);
                }),
                (A.prototype.createCanvasClone = function (A) {
                  var e;
                  if (this.options.inlineImages && A.ownerDocument) {
                    var t = A.ownerDocument.createElement("img");
                    try {
                      return ((t.src = A.toDataURL()), t);
                    } catch (e) {
                      this.context.logger.info(
                        "Unable to inline canvas contents, canvas is tainted",
                        A,
                      );
                    }
                  }
                  var r = A.cloneNode(!1);
                  try {
                    ((r.width = A.width), (r.height = A.height));
                    var n = A.getContext("2d"),
                      o = r.getContext("2d");
                    if (o)
                      if (!this.options.allowTaint && n)
                        o.putImageData(
                          n.getImageData(0, 0, A.width, A.height),
                          0,
                          0,
                        );
                      else {
                        var B =
                          null !== (e = A.getContext("webgl2")) && void 0 !== e
                            ? e
                            : A.getContext("webgl");
                        if (B) {
                          var s = B.getContextAttributes();
                          !1 ===
                            (null == s ? void 0 : s.preserveDrawingBuffer) &&
                            this.context.logger.warn(
                              "Unable to clone WebGL context as it has preserveDrawingBuffer=false",
                              A,
                            );
                        }
                        o.drawImage(A, 0, 0);
                      }
                    return r;
                  } catch (e) {
                    this.context.logger.info(
                      "Unable to clone canvas as it is tainted",
                      A,
                    );
                  }
                  return r;
                }),
                (A.prototype.createVideoClone = function (A) {
                  var e = A.ownerDocument.createElement("canvas");
                  ((e.width = A.offsetWidth), (e.height = A.offsetHeight));
                  var t = e.getContext("2d");
                  try {
                    return (
                      t &&
                        (t.drawImage(A, 0, 0, e.width, e.height),
                        this.options.allowTaint ||
                          t.getImageData(0, 0, e.width, e.height)),
                      e
                    );
                  } catch (e) {
                    this.context.logger.info(
                      "Unable to clone video as it is tainted",
                      A,
                    );
                  }
                  var r = A.ownerDocument.createElement("canvas");
                  return (
                    (r.width = A.offsetWidth),
                    (r.height = A.offsetHeight),
                    r
                  );
                }),
                (A.prototype.appendChildNode = function (A, e, t) {
                  (Ln(e) &&
                    ("SCRIPT" === e.tagName ||
                      e.hasAttribute(ao) ||
                      ("function" == typeof this.options.ignoreElements &&
                        this.options.ignoreElements(e)))) ||
                    (this.options.copyStyles && Ln(e) && Pn(e)) ||
                    A.appendChild(this.cloneNode(e, t));
                }),
                (A.prototype.cloneChildNodes = function (A, e, t) {
                  for (
                    var r = this,
                      n = A.shadowRoot ? A.shadowRoot.firstChild : A.firstChild;
                    n;
                    n = n.nextSibling
                  )
                    if (
                      Ln(n) &&
                      Yn(n) &&
                      "function" == typeof n.assignedNodes
                    ) {
                      var o = n.assignedNodes();
                      o.length &&
                        o.forEach(function (A) {
                          return r.appendChildNode(e, A, t);
                        });
                    } else this.appendChildNode(e, n, t);
                }),
                (A.prototype.cloneNode = function (A, e) {
                  if (Kn(A)) return document.createTextNode(A.data);
                  if (!A.ownerDocument) return A.cloneNode(!1);
                  var t = A.ownerDocument.defaultView;
                  if (t && Ln(A) && (Dn(A) || xn(A))) {
                    var r = this.createElementClone(A);
                    r.style.transitionProperty = "none";
                    var n = t.getComputedStyle(A),
                      o = t.getComputedStyle(A, ":before"),
                      B = t.getComputedStyle(A, ":after");
                    (this.referenceElement === A &&
                      Dn(r) &&
                      (this.clonedReferenceElement = r),
                      kn(r) && Eo(r));
                    var s = this.counters.parse(new br(this.context, n)),
                      i = this.resolvePseudoContent(A, r, o, Vr.BEFORE);
                    (Wn(A) && (e = !0),
                      Vn(A) || this.cloneChildNodes(A, r, e),
                      i && r.insertBefore(i, r.firstChild));
                    var a = this.resolvePseudoContent(A, r, B, Vr.AFTER);
                    return (
                      a && r.appendChild(a),
                      this.counters.pop(s),
                      ((n && (this.options.copyStyles || xn(A)) && !Nn(A)) ||
                        e) &&
                        Uo(n, r),
                      (0 === A.scrollTop && 0 === A.scrollLeft) ||
                        this.scrolledElements.push([
                          r,
                          A.scrollLeft,
                          A.scrollTop,
                        ]),
                      (Xn(A) || Jn(A)) &&
                        (Xn(r) || Jn(r)) &&
                        (r.value = A.value),
                      r
                    );
                  }
                  return A.cloneNode(!1);
                }),
                (A.prototype.resolvePseudoContent = function (A, e, t, r) {
                  var n = this;
                  if (t) {
                    var o = t.content,
                      B = e.ownerDocument;
                    if (
                      B &&
                      o &&
                      "none" !== o &&
                      "-moz-alt-content" !== o &&
                      "none" !== t.display
                    ) {
                      this.counters.parse(new br(this.context, t));
                      var s = new Ir(this.context, t),
                        i = B.createElement("html2canvaspseudoelement");
                      (Uo(t, i),
                        s.content.forEach(function (e) {
                          if (0 === e.type)
                            i.appendChild(B.createTextNode(e.value));
                          else if (22 === e.type) {
                            var t = B.createElement("img");
                            ((t.src = e.value),
                              (t.style.opacity = "1"),
                              i.appendChild(t));
                          } else if (18 === e.type) {
                            if ("attr" === e.name) {
                              var r = e.values.filter(zA);
                              r.length &&
                                i.appendChild(
                                  B.createTextNode(
                                    A.getAttribute(r[0].value) || "",
                                  ),
                                );
                            } else if ("counter" === e.name) {
                              var o = e.values.filter(te),
                                a = o[1];
                              if ((u = o[0]) && zA(u)) {
                                var c = n.counters.getCounterValue(u.value),
                                  l =
                                    a && zA(a)
                                      ? Tt.parse(n.context, a.value)
                                      : 3;
                                i.appendChild(B.createTextNode(io(c, l, !1)));
                              }
                            } else if ("counters" === e.name) {
                              var u,
                                g = e.values.filter(te),
                                w = g[1];
                              if (((a = g[2]), (u = g[0]) && zA(u))) {
                                var Q = n.counters.getCounterValues(u.value),
                                  d =
                                    a && zA(a)
                                      ? Tt.parse(n.context, a.value)
                                      : 3,
                                  C = w && 0 === w.type ? w.value : "",
                                  U = Q.map(function (A) {
                                    return io(A, d, !1);
                                  }).join(C);
                                i.appendChild(B.createTextNode(U));
                              }
                            }
                          } else if (20 === e.type)
                            switch (e.value) {
                              case "open-quote":
                                i.appendChild(
                                  B.createTextNode(
                                    fr(s.quotes, n.quoteDepth++, !0),
                                  ),
                                );
                                break;
                              case "close-quote":
                                i.appendChild(
                                  B.createTextNode(
                                    fr(s.quotes, --n.quoteDepth, !1),
                                  ),
                                );
                                break;
                              default:
                                i.appendChild(B.createTextNode(e.value));
                            }
                        }),
                        (i.className = po + " " + Ho));
                      var a = r === Vr.BEFORE ? " " + po : " " + Ho;
                      return (
                        xn(e)
                          ? (e.className.baseValue += a)
                          : (e.className += a),
                        i
                      );
                    }
                  }
                }),
                (A.destroy = function (A) {
                  return !!A.parentNode && (A.parentNode.removeChild(A), !0);
                }),
                A
              );
            })();
          !(function (A) {
            ((A[(A.BEFORE = 0)] = "BEFORE"), (A[(A.AFTER = 1)] = "AFTER"));
          })(Vr || (Vr = {}));
          var lo,
            uo = function (A, e) {
              var t = A.createElement("iframe");
              return (
                (t.className = "html2canvas-container"),
                (t.style.visibility = "hidden"),
                (t.style.position = "fixed"),
                (t.style.left = "-10000px"),
                (t.style.top = "0px"),
                (t.style.border = "0"),
                (t.width = e.width.toString()),
                (t.height = e.height.toString()),
                (t.scrolling = "no"),
                t.setAttribute(ao, "true"),
                A.body.appendChild(t),
                t
              );
            },
            go = function (A) {
              return new Promise(function (e) {
                A.complete
                  ? e()
                  : A.src
                    ? ((A.onload = e), (A.onerror = e))
                    : e();
              });
            },
            wo = function (A) {
              return Promise.all([].slice.call(A.images, 0).map(go));
            },
            Qo = function (A) {
              return new Promise(function (e, t) {
                var r = A.contentWindow;
                if (!r) return t("No window assigned for iframe");
                var n = r.document;
                r.onload = A.onload = function () {
                  r.onload = A.onload = null;
                  var t = setInterval(function () {
                    n.body.childNodes.length > 0 &&
                      "complete" === n.readyState &&
                      (clearInterval(t), e(A));
                  }, 50);
                };
              });
            },
            Co = ["all", "d", "content"],
            Uo = function (A, e) {
              for (var t = A.length - 1; t >= 0; t--) {
                var r = A.item(t);
                -1 === Co.indexOf(r) &&
                  e.style.setProperty(r, A.getPropertyValue(r));
              }
              return e;
            },
            Fo = function (A) {
              var e = "";
              return (
                A &&
                  ((e += "<!DOCTYPE "),
                  A.name && (e += A.name),
                  A.internalSubset && (e += A.internalSubset),
                  A.publicId && (e += '"' + A.publicId + '"'),
                  A.systemId && (e += '"' + A.systemId + '"'),
                  (e += ">")),
                e
              );
            },
            ho = function (A, e, t) {
              A &&
                A.defaultView &&
                (e !== A.defaultView.pageXOffset ||
                  t !== A.defaultView.pageYOffset) &&
                A.defaultView.scrollTo(e, t);
            },
            fo = function (A) {
              var e = A[0],
                t = A[2];
              ((e.scrollLeft = A[1]), (e.scrollTop = t));
            },
            po = "___html2canvas___pseudoelement_before",
            Ho = "___html2canvas___pseudoelement_after",
            yo =
              '{\n    content: "" !important;\n    display: none !important;\n}',
            Eo = function (A) {
              mo(
                A,
                "." + po + ":before" + yo + "\n         ." + Ho + ":after" + yo,
              );
            },
            mo = function (A, e) {
              var t = A.ownerDocument;
              if (t) {
                var r = t.createElement("style");
                ((r.textContent = e), A.appendChild(r));
              }
            },
            Io = (function () {
              function A() {}
              return (
                (A.getOrigin = function (e) {
                  var t = A._link;
                  return t
                    ? ((t.href = e),
                      (t.href = t.href),
                      t.protocol + t.hostname + t.port)
                    : "about:blank";
                }),
                (A.isSameOrigin = function (e) {
                  return A.getOrigin(e) === A._origin;
                }),
                (A.setContext = function (e) {
                  ((A._link = e.document.createElement("a")),
                    (A._origin = A.getOrigin(e.location.href)));
                }),
                (A._origin = "about:blank"),
                A
              );
            })(),
            bo = (function () {
              function A(A, e) {
                ((this.context = A), (this._options = e), (this._cache = {}));
              }
              return (
                (A.prototype.addImage = function (A) {
                  var e = Promise.resolve();
                  return this.has(A)
                    ? e
                    : To(A) || Do(A)
                      ? ((this._cache[A] = this.loadImage(A)).catch(
                          function () {},
                        ),
                        e)
                      : e;
                }),
                (A.prototype.match = function (A) {
                  return this._cache[A];
                }),
                (A.prototype.loadImage = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e,
                      t,
                      r,
                      o,
                      B = this;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            (e = Io.isSameOrigin(A)),
                            (t =
                              !xo(A) &&
                              !0 === this._options.useCORS &&
                              An.SUPPORT_CORS_IMAGES &&
                              !e),
                            (r =
                              !xo(A) &&
                              !e &&
                              !To(A) &&
                              "string" == typeof this._options.proxy &&
                              An.SUPPORT_CORS_XHR &&
                              !t),
                            e ||
                            !1 !== this._options.allowTaint ||
                            xo(A) ||
                            To(A) ||
                            r ||
                            t
                              ? ((o = A), r ? [4, this.proxy(o)] : [3, 2])
                              : [2]
                          );
                        case 1:
                          ((o = n.sent()), (n.label = 2));
                        case 2:
                          return (
                            this.context.logger.debug(
                              "Added image " + A.substring(0, 256),
                            ),
                            [
                              4,
                              new Promise(function (A, e) {
                                var r = new Image();
                                ((r.onload = function () {
                                  return A(r);
                                }),
                                  (r.onerror = e),
                                  (So(o) || t) && (r.crossOrigin = "anonymous"),
                                  (r.src = o),
                                  !0 === r.complete &&
                                    setTimeout(function () {
                                      return A(r);
                                    }, 500),
                                  B._options.imageTimeout > 0 &&
                                    setTimeout(function () {
                                      return e(
                                        "Timed out (" +
                                          B._options.imageTimeout +
                                          "ms) loading image",
                                      );
                                    }, B._options.imageTimeout));
                              }),
                            ]
                          );
                        case 3:
                          return [2, n.sent()];
                      }
                    });
                  });
                }),
                (A.prototype.has = function (A) {
                  return void 0 !== this._cache[A];
                }),
                (A.prototype.keys = function () {
                  return Promise.resolve(Object.keys(this._cache));
                }),
                (A.prototype.proxy = function (A) {
                  var e = this,
                    t = this._options.proxy;
                  if (!t) throw new Error("No proxy defined");
                  var r = A.substring(0, 256);
                  return new Promise(function (n, o) {
                    var B = An.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                      s = new XMLHttpRequest();
                    ((s.onload = function () {
                      if (200 === s.status)
                        if ("text" === B) n(s.response);
                        else {
                          var A = new FileReader();
                          (A.addEventListener(
                            "load",
                            function () {
                              return n(A.result);
                            },
                            !1,
                          ),
                            A.addEventListener(
                              "error",
                              function (A) {
                                return o(A);
                              },
                              !1,
                            ),
                            A.readAsDataURL(s.response));
                        }
                      else
                        o(
                          "Failed to proxy resource " +
                            r +
                            " with status code " +
                            s.status,
                        );
                    }),
                      (s.onerror = o));
                    var i = t.indexOf("?") > -1 ? "&" : "?";
                    if (
                      (s.open(
                        "GET",
                        "" +
                          t +
                          i +
                          "url=" +
                          encodeURIComponent(A) +
                          "&responseType=" +
                          B,
                      ),
                      "text" !== B &&
                        s instanceof XMLHttpRequest &&
                        (s.responseType = B),
                      e._options.imageTimeout)
                    ) {
                      var a = e._options.imageTimeout;
                      ((s.timeout = a),
                        (s.ontimeout = function () {
                          return o("Timed out (" + a + "ms) proxying " + r);
                        }));
                    }
                    s.send();
                  });
                }),
                A
              );
            })(),
            vo = /^data:image\/svg\+xml/i,
            Ko = /^data:image\/.*;base64,/i,
            Lo = /^data:image\/.*/i,
            Do = function (A) {
              return An.SUPPORT_SVG_DRAWING || !Mo(A);
            },
            xo = function (A) {
              return Lo.test(A);
            },
            So = function (A) {
              return Ko.test(A);
            },
            To = function (A) {
              return "blob" === A.substr(0, 4);
            },
            Mo = function (A) {
              return "svg" === A.substr(-3).toLowerCase() || vo.test(A);
            },
            Oo = (function () {
              function A(A, e) {
                ((this.type = 0), (this.x = A), (this.y = e));
              }
              return (
                (A.prototype.add = function (e, t) {
                  return new A(this.x + e, this.y + t);
                }),
                A
              );
            })(),
            ko = function (A, e, t) {
              return new Oo(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
            },
            Go = (function () {
              function A(A, e, t, r) {
                ((this.type = 1),
                  (this.start = A),
                  (this.startControl = e),
                  (this.endControl = t),
                  (this.end = r));
              }
              return (
                (A.prototype.subdivide = function (e, t) {
                  var r = ko(this.start, this.startControl, e),
                    n = ko(this.startControl, this.endControl, e),
                    o = ko(this.endControl, this.end, e),
                    B = ko(r, n, e),
                    s = ko(n, o, e),
                    i = ko(B, s, e);
                  return t
                    ? new A(this.start, r, B, i)
                    : new A(i, s, o, this.end);
                }),
                (A.prototype.add = function (e, t) {
                  return new A(
                    this.start.add(e, t),
                    this.startControl.add(e, t),
                    this.endControl.add(e, t),
                    this.end.add(e, t),
                  );
                }),
                (A.prototype.reverse = function () {
                  return new A(
                    this.end,
                    this.endControl,
                    this.startControl,
                    this.start,
                  );
                }),
                A
              );
            })(),
            Vo = function (A) {
              return 1 === A.type;
            },
            Ro = function (A) {
              var e = A.styles,
                t = A.bounds,
                r = le(e.borderTopLeftRadius, t.width, t.height),
                n = r[0],
                o = r[1],
                B = le(e.borderTopRightRadius, t.width, t.height),
                s = B[0],
                i = B[1],
                a = le(e.borderBottomRightRadius, t.width, t.height),
                c = a[0],
                l = a[1],
                u = le(e.borderBottomLeftRadius, t.width, t.height),
                g = u[0],
                w = u[1],
                Q = [];
              (Q.push((n + s) / t.width),
                Q.push((g + c) / t.width),
                Q.push((o + w) / t.height),
                Q.push((i + l) / t.height));
              var d = Math.max.apply(Math, Q);
              d > 1 &&
                ((n /= d),
                (o /= d),
                (s /= d),
                (i /= d),
                (c /= d),
                (l /= d),
                (g /= d),
                (w /= d));
              var C = t.width - s,
                U = t.height - l,
                F = t.width - c,
                h = t.height - w,
                f = e.borderTopWidth,
                p = e.borderRightWidth,
                H = e.borderBottomWidth,
                y = e.borderLeftWidth,
                E = ue(e.paddingTop, A.bounds.width),
                m = ue(e.paddingRight, A.bounds.width),
                I = ue(e.paddingBottom, A.bounds.width),
                b = ue(e.paddingLeft, A.bounds.width);
              ((this.topLeftBorderDoubleOuterBox =
                n > 0 || o > 0
                  ? No(
                      t.left + y / 3,
                      t.top + f / 3,
                      n - y / 3,
                      o - f / 3,
                      lo.TOP_LEFT,
                    )
                  : new Oo(t.left + y / 3, t.top + f / 3)),
                (this.topRightBorderDoubleOuterBox =
                  n > 0 || o > 0
                    ? No(
                        t.left + C,
                        t.top + f / 3,
                        s - p / 3,
                        i - f / 3,
                        lo.TOP_RIGHT,
                      )
                    : new Oo(t.left + t.width - p / 3, t.top + f / 3)),
                (this.bottomRightBorderDoubleOuterBox =
                  c > 0 || l > 0
                    ? No(
                        t.left + F,
                        t.top + U,
                        c - p / 3,
                        l - H / 3,
                        lo.BOTTOM_RIGHT,
                      )
                    : new Oo(
                        t.left + t.width - p / 3,
                        t.top + t.height - H / 3,
                      )),
                (this.bottomLeftBorderDoubleOuterBox =
                  g > 0 || w > 0
                    ? No(
                        t.left + y / 3,
                        t.top + h,
                        g - y / 3,
                        w - H / 3,
                        lo.BOTTOM_LEFT,
                      )
                    : new Oo(t.left + y / 3, t.top + t.height - H / 3)),
                (this.topLeftBorderDoubleInnerBox =
                  n > 0 || o > 0
                    ? No(
                        t.left + (2 * y) / 3,
                        t.top + (2 * f) / 3,
                        n - (2 * y) / 3,
                        o - (2 * f) / 3,
                        lo.TOP_LEFT,
                      )
                    : new Oo(t.left + (2 * y) / 3, t.top + (2 * f) / 3)),
                (this.topRightBorderDoubleInnerBox =
                  n > 0 || o > 0
                    ? No(
                        t.left + C,
                        t.top + (2 * f) / 3,
                        s - (2 * p) / 3,
                        i - (2 * f) / 3,
                        lo.TOP_RIGHT,
                      )
                    : new Oo(
                        t.left + t.width - (2 * p) / 3,
                        t.top + (2 * f) / 3,
                      )),
                (this.bottomRightBorderDoubleInnerBox =
                  c > 0 || l > 0
                    ? No(
                        t.left + F,
                        t.top + U,
                        c - (2 * p) / 3,
                        l - (2 * H) / 3,
                        lo.BOTTOM_RIGHT,
                      )
                    : new Oo(
                        t.left + t.width - (2 * p) / 3,
                        t.top + t.height - (2 * H) / 3,
                      )),
                (this.bottomLeftBorderDoubleInnerBox =
                  g > 0 || w > 0
                    ? No(
                        t.left + (2 * y) / 3,
                        t.top + h,
                        g - (2 * y) / 3,
                        w - (2 * H) / 3,
                        lo.BOTTOM_LEFT,
                      )
                    : new Oo(
                        t.left + (2 * y) / 3,
                        t.top + t.height - (2 * H) / 3,
                      )),
                (this.topLeftBorderStroke =
                  n > 0 || o > 0
                    ? No(
                        t.left + y / 2,
                        t.top + f / 2,
                        n - y / 2,
                        o - f / 2,
                        lo.TOP_LEFT,
                      )
                    : new Oo(t.left + y / 2, t.top + f / 2)),
                (this.topRightBorderStroke =
                  n > 0 || o > 0
                    ? No(
                        t.left + C,
                        t.top + f / 2,
                        s - p / 2,
                        i - f / 2,
                        lo.TOP_RIGHT,
                      )
                    : new Oo(t.left + t.width - p / 2, t.top + f / 2)),
                (this.bottomRightBorderStroke =
                  c > 0 || l > 0
                    ? No(
                        t.left + F,
                        t.top + U,
                        c - p / 2,
                        l - H / 2,
                        lo.BOTTOM_RIGHT,
                      )
                    : new Oo(
                        t.left + t.width - p / 2,
                        t.top + t.height - H / 2,
                      )),
                (this.bottomLeftBorderStroke =
                  g > 0 || w > 0
                    ? No(
                        t.left + y / 2,
                        t.top + h,
                        g - y / 2,
                        w - H / 2,
                        lo.BOTTOM_LEFT,
                      )
                    : new Oo(t.left + y / 2, t.top + t.height - H / 2)),
                (this.topLeftBorderBox =
                  n > 0 || o > 0
                    ? No(t.left, t.top, n, o, lo.TOP_LEFT)
                    : new Oo(t.left, t.top)),
                (this.topRightBorderBox =
                  s > 0 || i > 0
                    ? No(t.left + C, t.top, s, i, lo.TOP_RIGHT)
                    : new Oo(t.left + t.width, t.top)),
                (this.bottomRightBorderBox =
                  c > 0 || l > 0
                    ? No(t.left + F, t.top + U, c, l, lo.BOTTOM_RIGHT)
                    : new Oo(t.left + t.width, t.top + t.height)),
                (this.bottomLeftBorderBox =
                  g > 0 || w > 0
                    ? No(t.left, t.top + h, g, w, lo.BOTTOM_LEFT)
                    : new Oo(t.left, t.top + t.height)),
                (this.topLeftPaddingBox =
                  n > 0 || o > 0
                    ? No(
                        t.left + y,
                        t.top + f,
                        Math.max(0, n - y),
                        Math.max(0, o - f),
                        lo.TOP_LEFT,
                      )
                    : new Oo(t.left + y, t.top + f)),
                (this.topRightPaddingBox =
                  s > 0 || i > 0
                    ? No(
                        t.left + Math.min(C, t.width - p),
                        t.top + f,
                        C > t.width + p ? 0 : Math.max(0, s - p),
                        Math.max(0, i - f),
                        lo.TOP_RIGHT,
                      )
                    : new Oo(t.left + t.width - p, t.top + f)),
                (this.bottomRightPaddingBox =
                  c > 0 || l > 0
                    ? No(
                        t.left + Math.min(F, t.width - y),
                        t.top + Math.min(U, t.height - H),
                        Math.max(0, c - p),
                        Math.max(0, l - H),
                        lo.BOTTOM_RIGHT,
                      )
                    : new Oo(t.left + t.width - p, t.top + t.height - H)),
                (this.bottomLeftPaddingBox =
                  g > 0 || w > 0
                    ? No(
                        t.left + y,
                        t.top + Math.min(h, t.height - H),
                        Math.max(0, g - y),
                        Math.max(0, w - H),
                        lo.BOTTOM_LEFT,
                      )
                    : new Oo(t.left + y, t.top + t.height - H)),
                (this.topLeftContentBox =
                  n > 0 || o > 0
                    ? No(
                        t.left + y + b,
                        t.top + f + E,
                        Math.max(0, n - (y + b)),
                        Math.max(0, o - (f + E)),
                        lo.TOP_LEFT,
                      )
                    : new Oo(t.left + y + b, t.top + f + E)),
                (this.topRightContentBox =
                  s > 0 || i > 0
                    ? No(
                        t.left + Math.min(C, t.width + y + b),
                        t.top + f + E,
                        C > t.width + y + b ? 0 : s - y + b,
                        i - (f + E),
                        lo.TOP_RIGHT,
                      )
                    : new Oo(t.left + t.width - (p + m), t.top + f + E)),
                (this.bottomRightContentBox =
                  c > 0 || l > 0
                    ? No(
                        t.left + Math.min(F, t.width - (y + b)),
                        t.top + Math.min(U, t.height + f + E),
                        Math.max(0, c - (p + m)),
                        l - (H + I),
                        lo.BOTTOM_RIGHT,
                      )
                    : new Oo(
                        t.left + t.width - (p + m),
                        t.top + t.height - (H + I),
                      )),
                (this.bottomLeftContentBox =
                  g > 0 || w > 0
                    ? No(
                        t.left + y + b,
                        t.top + h,
                        Math.max(0, g - (y + b)),
                        w - (H + I),
                        lo.BOTTOM_LEFT,
                      )
                    : new Oo(t.left + y + b, t.top + t.height - (H + I))));
            };
          !(function (A) {
            ((A[(A.TOP_LEFT = 0)] = "TOP_LEFT"),
              (A[(A.TOP_RIGHT = 1)] = "TOP_RIGHT"),
              (A[(A.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"),
              (A[(A.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT"));
          })(lo || (lo = {}));
          var No = function (A, e, t, r, n) {
              var o = ((Math.sqrt(2) - 1) / 3) * 4,
                B = t * o,
                s = r * o,
                i = A + t,
                a = e + r;
              switch (n) {
                case lo.TOP_LEFT:
                  return new Go(
                    new Oo(A, a),
                    new Oo(A, a - s),
                    new Oo(i - B, e),
                    new Oo(i, e),
                  );
                case lo.TOP_RIGHT:
                  return new Go(
                    new Oo(A, e),
                    new Oo(A + B, e),
                    new Oo(i, a - s),
                    new Oo(i, a),
                  );
                case lo.BOTTOM_RIGHT:
                  return new Go(
                    new Oo(i, e),
                    new Oo(i, e + s),
                    new Oo(A + B, a),
                    new Oo(A, a),
                  );
                default:
                  return new Go(
                    new Oo(i, a),
                    new Oo(i - B, a),
                    new Oo(A, e + s),
                    new Oo(A, e),
                  );
              }
            },
            Po = function (A) {
              return [
                A.topLeftBorderBox,
                A.topRightBorderBox,
                A.bottomRightBorderBox,
                A.bottomLeftBorderBox,
              ];
            },
            Xo = function (A) {
              return [
                A.topLeftPaddingBox,
                A.topRightPaddingBox,
                A.bottomRightPaddingBox,
                A.bottomLeftPaddingBox,
              ];
            },
            Jo = function (A, e, t) {
              ((this.offsetX = A),
                (this.offsetY = e),
                (this.matrix = t),
                (this.type = 0),
                (this.target = 6));
            },
            Yo = function (A, e) {
              ((this.path = A), (this.target = e), (this.type = 1));
            },
            Wo = function (A) {
              ((this.opacity = A), (this.type = 2), (this.target = 6));
            },
            _o = function (A) {
              return 1 === A.type;
            },
            Zo = function (A, e) {
              return (
                A.length === e.length &&
                A.some(function (A, t) {
                  return A === e[t];
                })
              );
            },
            jo = function (A) {
              ((this.element = A),
                (this.inlineLevel = []),
                (this.nonInlineLevel = []),
                (this.negativeZIndex = []),
                (this.zeroOrAutoZIndexOrTransformedOrOpacity = []),
                (this.positiveZIndex = []),
                (this.nonPositionedFloats = []),
                (this.nonPositionedInlineLevel = []));
            },
            qo = (function () {
              function A(A, e) {
                if (
                  ((this.container = A),
                  (this.parent = e),
                  (this.effects = []),
                  (this.curves = new Ro(this.container)),
                  this.container.styles.opacity < 1 &&
                    this.effects.push(new Wo(this.container.styles.opacity)),
                  null !== this.container.styles.transform &&
                    this.effects.push(
                      new Jo(
                        this.container.bounds.left +
                          this.container.styles.transformOrigin[0].number,
                        this.container.bounds.top +
                          this.container.styles.transformOrigin[1].number,
                        this.container.styles.transform,
                      ),
                    ),
                  0 !== this.container.styles.overflowX)
                ) {
                  var t = Po(this.curves),
                    r = Xo(this.curves);
                  Zo(t, r)
                    ? this.effects.push(new Yo(t, 6))
                    : (this.effects.push(new Yo(t, 2)),
                      this.effects.push(new Yo(r, 4)));
                }
              }
              return (
                (A.prototype.getEffects = function (A) {
                  for (
                    var e =
                        -1 === [2, 3].indexOf(this.container.styles.position),
                      t = this.parent,
                      r = this.effects.slice(0);
                    t;
                  ) {
                    var n = t.effects.filter(function (A) {
                      return !_o(A);
                    });
                    if (e || 0 !== t.container.styles.position || !t.parent) {
                      if (
                        (r.unshift.apply(r, n),
                        (e =
                          -1 === [2, 3].indexOf(t.container.styles.position)),
                        0 !== t.container.styles.overflowX)
                      ) {
                        var o = Po(t.curves),
                          B = Xo(t.curves);
                        Zo(o, B) || r.unshift(new Yo(B, 6));
                      }
                    } else r.unshift.apply(r, n);
                    t = t.parent;
                  }
                  return r.filter(function (e) {
                    return Qr(e.target, A);
                  });
                }),
                A
              );
            })(),
            zo = function (A, e, t, r) {
              A.container.elements.forEach(function (n) {
                var o = Qr(n.flags, 4),
                  B = Qr(n.flags, 2),
                  s = new qo(n, A);
                Qr(n.styles.display, 2048) && r.push(s);
                var i = Qr(n.flags, 8) ? [] : r;
                if (o || B) {
                  var a = o || n.styles.isPositioned() ? t : e,
                    c = new jo(s);
                  if (
                    n.styles.isPositioned() ||
                    n.styles.opacity < 1 ||
                    n.styles.isTransformed()
                  ) {
                    var l = n.styles.zIndex.order;
                    if (l < 0) {
                      var u = 0;
                      (a.negativeZIndex.some(function (A, e) {
                        return l > A.element.container.styles.zIndex.order
                          ? ((u = e), !1)
                          : u > 0;
                      }),
                        a.negativeZIndex.splice(u, 0, c));
                    } else if (l > 0) {
                      var g = 0;
                      (a.positiveZIndex.some(function (A, e) {
                        return l >= A.element.container.styles.zIndex.order
                          ? ((g = e + 1), !1)
                          : g > 0;
                      }),
                        a.positiveZIndex.splice(g, 0, c));
                    } else a.zeroOrAutoZIndexOrTransformedOrOpacity.push(c);
                  } else
                    n.styles.isFloating()
                      ? a.nonPositionedFloats.push(c)
                      : a.nonPositionedInlineLevel.push(c);
                  zo(s, c, o ? c : t, i);
                } else
                  (n.styles.isInlineLevel()
                    ? e.inlineLevel.push(s)
                    : e.nonInlineLevel.push(s),
                    zo(s, e, t, i));
                Qr(n.flags, 8) && $o(n, i);
              });
            },
            $o = function (A, e) {
              for (
                var t = A instanceof wn ? A.start : 1,
                  r = A instanceof wn && A.reversed,
                  n = 0;
                n < e.length;
                n++
              ) {
                var o = e[n];
                (o.container instanceof gn &&
                  "number" == typeof o.container.value &&
                  0 !== o.container.value &&
                  (t = o.container.value),
                  (o.listValue = io(t, o.container.styles.listStyleType, !0)),
                  (t += r ? -1 : 1));
              }
            },
            AB = function (A, e) {
              switch (e) {
                case 0:
                  return tB(
                    A.topLeftBorderBox,
                    A.topLeftPaddingBox,
                    A.topRightBorderBox,
                    A.topRightPaddingBox,
                  );
                case 1:
                  return tB(
                    A.topRightBorderBox,
                    A.topRightPaddingBox,
                    A.bottomRightBorderBox,
                    A.bottomRightPaddingBox,
                  );
                case 2:
                  return tB(
                    A.bottomRightBorderBox,
                    A.bottomRightPaddingBox,
                    A.bottomLeftBorderBox,
                    A.bottomLeftPaddingBox,
                  );
                default:
                  return tB(
                    A.bottomLeftBorderBox,
                    A.bottomLeftPaddingBox,
                    A.topLeftBorderBox,
                    A.topLeftPaddingBox,
                  );
              }
            },
            eB = function (A, e) {
              var t = [];
              return (
                Vo(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A),
                Vo(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e),
                t
              );
            },
            tB = function (A, e, t, r) {
              var n = [];
              return (
                Vo(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A),
                Vo(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t),
                Vo(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r),
                Vo(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e),
                n
              );
            },
            rB = function (A) {
              var e = A.styles;
              return A.bounds.add(
                e.borderLeftWidth,
                e.borderTopWidth,
                -(e.borderRightWidth + e.borderLeftWidth),
                -(e.borderTopWidth + e.borderBottomWidth),
              );
            },
            nB = function (A) {
              var e = A.styles,
                t = A.bounds,
                r = ue(e.paddingLeft, t.width),
                n = ue(e.paddingRight, t.width),
                o = ue(e.paddingTop, t.width),
                B = ue(e.paddingBottom, t.width);
              return t.add(
                r + e.borderLeftWidth,
                o + e.borderTopWidth,
                -(e.borderRightWidth + e.borderLeftWidth + r + n),
                -(e.borderTopWidth + e.borderBottomWidth + o + B),
              );
            },
            oB = function (A, e, t) {
              var r = (function (A, e) {
                  return 0 === A ? e.bounds : 2 === A ? nB(e) : rB(e);
                })(aB(A.styles.backgroundOrigin, e), A),
                n = (function (A, e) {
                  return 0 === A ? e.bounds : 2 === A ? nB(e) : rB(e);
                })(aB(A.styles.backgroundClip, e), A),
                o = iB(aB(A.styles.backgroundSize, e), t, r),
                B = o[0],
                s = o[1],
                i = le(
                  aB(A.styles.backgroundPosition, e),
                  r.width - B,
                  r.height - s,
                );
              return [
                cB(aB(A.styles.backgroundRepeat, e), i, o, r, n),
                Math.round(r.left + i[0]),
                Math.round(r.top + i[1]),
                B,
                s,
              ];
            },
            BB = function (A) {
              return zA(A) && A.value === me.AUTO;
            },
            sB = function (A) {
              return "number" == typeof A;
            },
            iB = function (A, e, t) {
              var r = e[0],
                n = e[1],
                o = e[2],
                B = A[0],
                s = A[1];
              if (!B) return [0, 0];
              if (Be(B) && s && Be(s)) return [ue(B, t.width), ue(s, t.height)];
              var i = sB(o);
              if (zA(B) && (B.value === me.CONTAIN || B.value === me.COVER))
                return sB(o)
                  ? t.width / t.height < o != (B.value === me.COVER)
                    ? [t.width, t.width / o]
                    : [t.height * o, t.height]
                  : [t.width, t.height];
              var a = sB(r),
                c = sB(n),
                l = a || c;
              if (BB(B) && (!s || BB(s)))
                return a && c
                  ? [r, n]
                  : i || l
                    ? l && i
                      ? [a ? r : n * o, c ? n : r / o]
                      : [a ? r : t.width, c ? n : t.height]
                    : [t.width, t.height];
              if (i) {
                var u = 0,
                  g = 0;
                return (
                  Be(B) ? (u = ue(B, t.width)) : Be(s) && (g = ue(s, t.height)),
                  BB(B) ? (u = g * o) : (s && !BB(s)) || (g = u / o),
                  [u, g]
                );
              }
              var w = null,
                Q = null;
              if (
                (Be(B)
                  ? (w = ue(B, t.width))
                  : s && Be(s) && (Q = ue(s, t.height)),
                null === w ||
                  (s && !BB(s)) ||
                  (Q = a && c ? (w / r) * n : t.height),
                null !== Q && BB(B) && (w = a && c ? (Q / n) * r : t.width),
                null !== w && null !== Q)
              )
                return [w, Q];
              throw new Error(
                "Unable to calculate background-size for element",
              );
            },
            aB = function (A, e) {
              var t = A[e];
              return void 0 === t ? A[0] : t;
            },
            cB = function (A, e, t, r, n) {
              var o = e[0],
                B = e[1],
                s = t[0],
                i = t[1];
              switch (A) {
                case 2:
                  return [
                    new Oo(Math.round(r.left), Math.round(r.top + B)),
                    new Oo(Math.round(r.left + r.width), Math.round(r.top + B)),
                    new Oo(
                      Math.round(r.left + r.width),
                      Math.round(i + r.top + B),
                    ),
                    new Oo(Math.round(r.left), Math.round(i + r.top + B)),
                  ];
                case 3:
                  return [
                    new Oo(Math.round(r.left + o), Math.round(r.top)),
                    new Oo(Math.round(r.left + o + s), Math.round(r.top)),
                    new Oo(
                      Math.round(r.left + o + s),
                      Math.round(r.height + r.top),
                    ),
                    new Oo(
                      Math.round(r.left + o),
                      Math.round(r.height + r.top),
                    ),
                  ];
                case 1:
                  return [
                    new Oo(Math.round(r.left + o), Math.round(r.top + B)),
                    new Oo(Math.round(r.left + o + s), Math.round(r.top + B)),
                    new Oo(
                      Math.round(r.left + o + s),
                      Math.round(r.top + B + i),
                    ),
                    new Oo(Math.round(r.left + o), Math.round(r.top + B + i)),
                  ];
                default:
                  return [
                    new Oo(Math.round(n.left), Math.round(n.top)),
                    new Oo(Math.round(n.left + n.width), Math.round(n.top)),
                    new Oo(
                      Math.round(n.left + n.width),
                      Math.round(n.height + n.top),
                    ),
                    new Oo(Math.round(n.left), Math.round(n.height + n.top)),
                  ];
              }
            },
            lB = "Hidden Text",
            uB = (function () {
              function A(A) {
                ((this._data = {}), (this._document = A));
              }
              return (
                (A.prototype.parseMetrics = function (A, e) {
                  var t = this._document.createElement("div"),
                    r = this._document.createElement("img"),
                    n = this._document.createElement("span"),
                    o = this._document.body;
                  ((t.style.visibility = "hidden"),
                    (t.style.fontFamily = A),
                    (t.style.fontSize = e),
                    (t.style.margin = "0"),
                    (t.style.padding = "0"),
                    (t.style.whiteSpace = "nowrap"),
                    o.appendChild(t),
                    (r.src =
                      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
                    (r.width = 1),
                    (r.height = 1),
                    (r.style.margin = "0"),
                    (r.style.padding = "0"),
                    (r.style.verticalAlign = "baseline"),
                    (n.style.fontFamily = A),
                    (n.style.fontSize = e),
                    (n.style.margin = "0"),
                    (n.style.padding = "0"),
                    n.appendChild(this._document.createTextNode(lB)),
                    t.appendChild(n),
                    t.appendChild(r));
                  var B = r.offsetTop - n.offsetTop + 2;
                  (t.removeChild(n),
                    t.appendChild(this._document.createTextNode(lB)),
                    (t.style.lineHeight = "normal"),
                    (r.style.verticalAlign = "super"));
                  var s = r.offsetTop - t.offsetTop + 2;
                  return (o.removeChild(t), { baseline: B, middle: s });
                }),
                (A.prototype.getMetrics = function (A, e) {
                  var t = A + " " + e;
                  return (
                    void 0 === this._data[t] &&
                      (this._data[t] = this.parseMetrics(A, e)),
                    this._data[t]
                  );
                }),
                A
              );
            })(),
            gB = function (A, e) {
              ((this.context = A), (this.options = e));
            },
            wB = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return (
                  (r._activeEffects = []),
                  (r.canvas = t.canvas
                    ? t.canvas
                    : document.createElement("canvas")),
                  (r.ctx = r.canvas.getContext("2d")),
                  t.canvas ||
                    ((r.canvas.width = Math.floor(t.width * t.scale)),
                    (r.canvas.height = Math.floor(t.height * t.scale)),
                    (r.canvas.style.width = t.width + "px"),
                    (r.canvas.style.height = t.height + "px")),
                  (r.fontMetrics = new uB(document)),
                  r.ctx.scale(r.options.scale, r.options.scale),
                  r.ctx.translate(-t.x, -t.y),
                  (r.ctx.textBaseline = "bottom"),
                  (r._activeEffects = []),
                  r.context.logger.debug(
                    "Canvas renderer initialized (" +
                      t.width +
                      "x" +
                      t.height +
                      ") with scale " +
                      t.scale,
                  ),
                  r
                );
              }
              return (
                e(t, A),
                (t.prototype.applyEffects = function (A) {
                  for (var e = this; this._activeEffects.length; )
                    this.popEffect();
                  A.forEach(function (A) {
                    return e.applyEffect(A);
                  });
                }),
                (t.prototype.applyEffect = function (A) {
                  (this.ctx.save(),
                    (function (A) {
                      return 2 === A.type;
                    })(A) && (this.ctx.globalAlpha = A.opacity),
                    (function (A) {
                      return 0 === A.type;
                    })(A) &&
                      (this.ctx.translate(A.offsetX, A.offsetY),
                      this.ctx.transform(
                        A.matrix[0],
                        A.matrix[1],
                        A.matrix[2],
                        A.matrix[3],
                        A.matrix[4],
                        A.matrix[5],
                      ),
                      this.ctx.translate(-A.offsetX, -A.offsetY)),
                    _o(A) && (this.path(A.path), this.ctx.clip()),
                    this._activeEffects.push(A));
                }),
                (t.prototype.popEffect = function () {
                  (this._activeEffects.pop(), this.ctx.restore());
                }),
                (t.prototype.renderStack = function (A) {
                  return r(this, void 0, void 0, function () {
                    return n(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return A.element.container.styles.isVisible()
                            ? [4, this.renderStackContent(A)]
                            : [3, 2];
                        case 1:
                          (e.sent(), (e.label = 2));
                        case 2:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.renderNode = function (A) {
                  return r(this, void 0, void 0, function () {
                    return n(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return (
                            Qr(A.container.flags, 16),
                            A.container.styles.isVisible()
                              ? [4, this.renderNodeBackgroundAndBorders(A)]
                              : [3, 3]
                          );
                        case 1:
                          return (e.sent(), [4, this.renderNodeContent(A)]);
                        case 2:
                          (e.sent(), (e.label = 3));
                        case 3:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.renderTextWithLetterSpacing = function (A, e, t) {
                  var r = this;
                  0 === e
                    ? this.ctx.fillText(A.text, A.bounds.left, A.bounds.top + t)
                    : rn(A.text).reduce(function (e, n) {
                        return (
                          r.ctx.fillText(n, e, A.bounds.top + t),
                          e + r.ctx.measureText(n).width
                        );
                      }, A.bounds.left);
                }),
                (t.prototype.createFontStyle = function (A) {
                  var e = A.fontVariant
                      .filter(function (A) {
                        return "normal" === A || "small-caps" === A;
                      })
                      .join(""),
                    t = FB(A.fontFamily).join(", "),
                    r = jA(A.fontSize)
                      ? "" + A.fontSize.number + A.fontSize.unit
                      : A.fontSize.number + "px";
                  return [[A.fontStyle, e, A.fontWeight, r, t].join(" "), t, r];
                }),
                (t.prototype.renderTextNode = function (A, e) {
                  return r(this, void 0, void 0, function () {
                    var t,
                      r,
                      o,
                      B,
                      s,
                      i,
                      a,
                      c = this;
                    return n(this, function (n) {
                      return (
                        (t = this.createFontStyle(e)),
                        (r = t[1]),
                        (o = t[2]),
                        (this.ctx.font = t[0]),
                        (this.ctx.direction =
                          1 === e.direction ? "rtl" : "ltr"),
                        (this.ctx.textAlign = "left"),
                        (this.ctx.textBaseline = "alphabetic"),
                        (B = this.fontMetrics.getMetrics(r, o)),
                        (s = B.baseline),
                        (i = B.middle),
                        (a = e.paintOrder),
                        A.textBounds.forEach(function (A) {
                          a.forEach(function (t) {
                            switch (t) {
                              case 0:
                                ((c.ctx.fillStyle = fe(e.color)),
                                  c.renderTextWithLetterSpacing(
                                    A,
                                    e.letterSpacing,
                                    s,
                                  ));
                                var r = e.textShadow;
                                (r.length &&
                                  A.text.trim().length &&
                                  (r
                                    .slice(0)
                                    .reverse()
                                    .forEach(function (t) {
                                      ((c.ctx.shadowColor = fe(t.color)),
                                        (c.ctx.shadowOffsetX =
                                          t.offsetX.number * c.options.scale),
                                        (c.ctx.shadowOffsetY =
                                          t.offsetY.number * c.options.scale),
                                        (c.ctx.shadowBlur = t.blur.number),
                                        c.renderTextWithLetterSpacing(
                                          A,
                                          e.letterSpacing,
                                          s,
                                        ));
                                    }),
                                  (c.ctx.shadowColor = ""),
                                  (c.ctx.shadowOffsetX = 0),
                                  (c.ctx.shadowOffsetY = 0),
                                  (c.ctx.shadowBlur = 0)),
                                  e.textDecorationLine.length &&
                                    ((c.ctx.fillStyle = fe(
                                      e.textDecorationColor || e.color,
                                    )),
                                    e.textDecorationLine.forEach(function (e) {
                                      switch (e) {
                                        case 1:
                                          c.ctx.fillRect(
                                            A.bounds.left,
                                            Math.round(A.bounds.top + s),
                                            A.bounds.width,
                                            1,
                                          );
                                          break;
                                        case 2:
                                          c.ctx.fillRect(
                                            A.bounds.left,
                                            Math.round(A.bounds.top),
                                            A.bounds.width,
                                            1,
                                          );
                                          break;
                                        case 3:
                                          c.ctx.fillRect(
                                            A.bounds.left,
                                            Math.ceil(A.bounds.top + i),
                                            A.bounds.width,
                                            1,
                                          );
                                      }
                                    })));
                                break;
                              case 1:
                                (e.webkitTextStrokeWidth &&
                                  A.text.trim().length &&
                                  ((c.ctx.strokeStyle = fe(
                                    e.webkitTextStrokeColor,
                                  )),
                                  (c.ctx.lineWidth = e.webkitTextStrokeWidth),
                                  (c.ctx.lineJoin = window.chrome
                                    ? "miter"
                                    : "round"),
                                  c.ctx.strokeText(
                                    A.text,
                                    A.bounds.left,
                                    A.bounds.top + s,
                                  )),
                                  (c.ctx.strokeStyle = ""),
                                  (c.ctx.lineWidth = 0),
                                  (c.ctx.lineJoin = "miter"));
                            }
                          });
                        }),
                        [2]
                      );
                    });
                  });
                }),
                (t.prototype.renderReplacedElement = function (A, e, t) {
                  if (t && A.intrinsicWidth > 0 && A.intrinsicHeight > 0) {
                    var r = nB(A),
                      n = Xo(e);
                    (this.path(n),
                      this.ctx.save(),
                      this.ctx.clip(),
                      this.ctx.drawImage(
                        t,
                        0,
                        0,
                        A.intrinsicWidth,
                        A.intrinsicHeight,
                        r.left,
                        r.top,
                        r.width,
                        r.height,
                      ),
                      this.ctx.restore());
                  }
                }),
                (t.prototype.renderNodeContent = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e, r, o, s, i, a, c, l, u, g, w, Q, d, C, U, F;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          (this.applyEffects(A.getEffects(4)),
                            (r = A.curves),
                            (o = (e = A.container).styles),
                            (s = 0),
                            (i = e.textNodes),
                            (n.label = 1));
                        case 1:
                          return s < i.length
                            ? [4, this.renderTextNode(i[s], o)]
                            : [3, 4];
                        case 2:
                          (n.sent(), (n.label = 3));
                        case 3:
                          return (s++, [3, 1]);
                        case 4:
                          if (!(e instanceof cn)) return [3, 8];
                          n.label = 5;
                        case 5:
                          return (
                            n.trys.push([5, 7, , 8]),
                            [4, this.context.cache.match(e.src)]
                          );
                        case 6:
                          return (
                            (d = n.sent()),
                            this.renderReplacedElement(e, r, d),
                            [3, 8]
                          );
                        case 7:
                          return (
                            n.sent(),
                            this.context.logger.error(
                              "Error loading image " + e.src,
                            ),
                            [3, 8]
                          );
                        case 8:
                          if (
                            (e instanceof ln &&
                              this.renderReplacedElement(e, r, e.canvas),
                            !(e instanceof un))
                          )
                            return [3, 12];
                          n.label = 9;
                        case 9:
                          return (
                            n.trys.push([9, 11, , 12]),
                            [4, this.context.cache.match(e.svg)]
                          );
                        case 10:
                          return (
                            (d = n.sent()),
                            this.renderReplacedElement(e, r, d),
                            [3, 12]
                          );
                        case 11:
                          return (
                            n.sent(),
                            this.context.logger.error(
                              "Error loading svg " + e.svg.substring(0, 255),
                            ),
                            [3, 12]
                          );
                        case 12:
                          return e instanceof Hn && e.tree
                            ? [
                                4,
                                new t(this.context, {
                                  scale: this.options.scale,
                                  backgroundColor: e.backgroundColor,
                                  x: 0,
                                  y: 0,
                                  width: e.width,
                                  height: e.height,
                                }).render(e.tree),
                              ]
                            : [3, 14];
                        case 13:
                          ((a = n.sent()),
                            e.width &&
                              e.height &&
                              this.ctx.drawImage(
                                a,
                                0,
                                0,
                                e.width,
                                e.height,
                                e.bounds.left,
                                e.bounds.top,
                                e.bounds.width,
                                e.bounds.height,
                              ),
                            (n.label = 14));
                        case 14:
                          if (
                            (e instanceof hn &&
                              ((c = Math.min(e.bounds.width, e.bounds.height)),
                              e.type === Cn
                                ? e.checked &&
                                  (this.ctx.save(),
                                  this.path([
                                    new Oo(
                                      e.bounds.left + 0.39363 * c,
                                      e.bounds.top + 0.79 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.16 * c,
                                      e.bounds.top + 0.5549 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.27347 * c,
                                      e.bounds.top + 0.44071 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.39694 * c,
                                      e.bounds.top + 0.5649 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.72983 * c,
                                      e.bounds.top + 0.23 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.84 * c,
                                      e.bounds.top + 0.34085 * c,
                                    ),
                                    new Oo(
                                      e.bounds.left + 0.39363 * c,
                                      e.bounds.top + 0.79 * c,
                                    ),
                                  ]),
                                  (this.ctx.fillStyle = fe(Fn)),
                                  this.ctx.fill(),
                                  this.ctx.restore())
                                : e.type === Un &&
                                  e.checked &&
                                  (this.ctx.save(),
                                  this.ctx.beginPath(),
                                  this.ctx.arc(
                                    e.bounds.left + c / 2,
                                    e.bounds.top + c / 2,
                                    c / 4,
                                    0,
                                    2 * Math.PI,
                                    !0,
                                  ),
                                  (this.ctx.fillStyle = fe(Fn)),
                                  this.ctx.fill(),
                                  this.ctx.restore())),
                            QB(e) && e.value.length)
                          ) {
                            switch (
                              ((l = this.createFontStyle(o)),
                              (u = this.fontMetrics.getMetrics(
                                (U = l[0]),
                                l[1],
                              ).baseline),
                              (this.ctx.font = U),
                              (this.ctx.fillStyle = fe(o.color)),
                              (this.ctx.textBaseline = "alphabetic"),
                              (this.ctx.textAlign = CB(e.styles.textAlign)),
                              (F = nB(e)),
                              (g = 0),
                              e.styles.textAlign)
                            ) {
                              case 1:
                                g += F.width / 2;
                                break;
                              case 2:
                                g += F.width;
                            }
                            ((w = F.add(g, 0, 0, -F.height / 2 + 1)),
                              this.ctx.save(),
                              this.path([
                                new Oo(F.left, F.top),
                                new Oo(F.left + F.width, F.top),
                                new Oo(F.left + F.width, F.top + F.height),
                                new Oo(F.left, F.top + F.height),
                              ]),
                              this.ctx.clip(),
                              this.renderTextWithLetterSpacing(
                                new en(e.value, w),
                                o.letterSpacing,
                                u,
                              ),
                              this.ctx.restore(),
                              (this.ctx.textBaseline = "alphabetic"),
                              (this.ctx.textAlign = "left"));
                          }
                          if (!Qr(e.styles.display, 2048)) return [3, 20];
                          if (null === e.styles.listStyleImage) return [3, 19];
                          if (0 !== (Q = e.styles.listStyleImage).type)
                            return [3, 18];
                          ((d = void 0), (C = Q.url), (n.label = 15));
                        case 15:
                          return (
                            n.trys.push([15, 17, , 18]),
                            [4, this.context.cache.match(C)]
                          );
                        case 16:
                          return (
                            (d = n.sent()),
                            this.ctx.drawImage(
                              d,
                              e.bounds.left - (d.width + 10),
                              e.bounds.top,
                            ),
                            [3, 18]
                          );
                        case 17:
                          return (
                            n.sent(),
                            this.context.logger.error(
                              "Error loading list-style-image " + C,
                            ),
                            [3, 18]
                          );
                        case 18:
                          return [3, 20];
                        case 19:
                          (A.listValue &&
                            -1 !== e.styles.listStyleType &&
                            ((U = this.createFontStyle(o)[0]),
                            (this.ctx.font = U),
                            (this.ctx.fillStyle = fe(o.color)),
                            (this.ctx.textBaseline = "middle"),
                            (this.ctx.textAlign = "right"),
                            (F = new B(
                              e.bounds.left,
                              e.bounds.top +
                                ue(e.styles.paddingTop, e.bounds.width),
                              e.bounds.width,
                              Dt(o.lineHeight, o.fontSize.number) / 2 + 1,
                            )),
                            this.renderTextWithLetterSpacing(
                              new en(A.listValue, F),
                              o.letterSpacing,
                              Dt(o.lineHeight, o.fontSize.number) / 2 + 2,
                            ),
                            (this.ctx.textBaseline = "bottom"),
                            (this.ctx.textAlign = "left")),
                            (n.label = 20));
                        case 20:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.renderStackContent = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e, t, r, o, B, s, i, a, c, l, u, g, w, Q;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            Qr(A.element.container.flags, 16),
                            [4, this.renderNodeBackgroundAndBorders(A.element)]
                          );
                        case 1:
                          (n.sent(),
                            (e = 0),
                            (t = A.negativeZIndex),
                            (n.label = 2));
                        case 2:
                          return e < t.length
                            ? [4, this.renderStack(t[e])]
                            : [3, 5];
                        case 3:
                          (n.sent(), (n.label = 4));
                        case 4:
                          return (e++, [3, 2]);
                        case 5:
                          return [4, this.renderNodeContent(A.element)];
                        case 6:
                          (n.sent(),
                            (r = 0),
                            (o = A.nonInlineLevel),
                            (n.label = 7));
                        case 7:
                          return r < o.length
                            ? [4, this.renderNode(o[r])]
                            : [3, 10];
                        case 8:
                          (n.sent(), (n.label = 9));
                        case 9:
                          return (r++, [3, 7]);
                        case 10:
                          ((B = 0),
                            (s = A.nonPositionedFloats),
                            (n.label = 11));
                        case 11:
                          return B < s.length
                            ? [4, this.renderStack(s[B])]
                            : [3, 14];
                        case 12:
                          (n.sent(), (n.label = 13));
                        case 13:
                          return (B++, [3, 11]);
                        case 14:
                          ((i = 0),
                            (a = A.nonPositionedInlineLevel),
                            (n.label = 15));
                        case 15:
                          return i < a.length
                            ? [4, this.renderStack(a[i])]
                            : [3, 18];
                        case 16:
                          (n.sent(), (n.label = 17));
                        case 17:
                          return (i++, [3, 15]);
                        case 18:
                          ((c = 0), (l = A.inlineLevel), (n.label = 19));
                        case 19:
                          return c < l.length
                            ? [4, this.renderNode(l[c])]
                            : [3, 22];
                        case 20:
                          (n.sent(), (n.label = 21));
                        case 21:
                          return (c++, [3, 19]);
                        case 22:
                          ((u = 0),
                            (g = A.zeroOrAutoZIndexOrTransformedOrOpacity),
                            (n.label = 23));
                        case 23:
                          return u < g.length
                            ? [4, this.renderStack(g[u])]
                            : [3, 26];
                        case 24:
                          (n.sent(), (n.label = 25));
                        case 25:
                          return (u++, [3, 23]);
                        case 26:
                          ((w = 0), (Q = A.positiveZIndex), (n.label = 27));
                        case 27:
                          return w < Q.length
                            ? [4, this.renderStack(Q[w])]
                            : [3, 30];
                        case 28:
                          (n.sent(), (n.label = 29));
                        case 29:
                          return (w++, [3, 27]);
                        case 30:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.mask = function (A) {
                  (this.ctx.beginPath(),
                    this.ctx.moveTo(0, 0),
                    this.ctx.lineTo(this.canvas.width, 0),
                    this.ctx.lineTo(this.canvas.width, this.canvas.height),
                    this.ctx.lineTo(0, this.canvas.height),
                    this.ctx.lineTo(0, 0),
                    this.formatPath(A.slice(0).reverse()),
                    this.ctx.closePath());
                }),
                (t.prototype.path = function (A) {
                  (this.ctx.beginPath(),
                    this.formatPath(A),
                    this.ctx.closePath());
                }),
                (t.prototype.formatPath = function (A) {
                  var e = this;
                  A.forEach(function (A, t) {
                    var r = Vo(A) ? A.start : A;
                    (0 === t ? e.ctx.moveTo(r.x, r.y) : e.ctx.lineTo(r.x, r.y),
                      Vo(A) &&
                        e.ctx.bezierCurveTo(
                          A.startControl.x,
                          A.startControl.y,
                          A.endControl.x,
                          A.endControl.y,
                          A.end.x,
                          A.end.y,
                        ));
                  });
                }),
                (t.prototype.renderRepeat = function (A, e, t, r) {
                  (this.path(A),
                    (this.ctx.fillStyle = e),
                    this.ctx.translate(t, r),
                    this.ctx.fill(),
                    this.ctx.translate(-t, -r));
                }),
                (t.prototype.resizeImage = function (A, e, t) {
                  var r;
                  if (A.width === e && A.height === t) return A;
                  var n = (
                    null !== (r = this.canvas.ownerDocument) && void 0 !== r
                      ? r
                      : document
                  ).createElement("canvas");
                  return (
                    (n.width = Math.max(1, e)),
                    (n.height = Math.max(1, t)),
                    n
                      .getContext("2d")
                      .drawImage(A, 0, 0, A.width, A.height, 0, 0, e, t),
                    n
                  );
                }),
                (t.prototype.renderBackgroundImage = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e, t, r, o, B;
                    return n(this, function (s) {
                      switch (s.label) {
                        case 0:
                          ((e = A.styles.backgroundImage.length - 1),
                            (t = function (t) {
                              var o,
                                B,
                                s,
                                i,
                                a,
                                c,
                                l,
                                u,
                                g,
                                w,
                                Q,
                                d,
                                C,
                                U,
                                F,
                                h,
                                f,
                                p,
                                H,
                                y,
                                E,
                                m,
                                I,
                                b,
                                v,
                                K,
                                L,
                                D,
                                x,
                                S,
                                T;
                              return n(this, function (n) {
                                switch (n.label) {
                                  case 0:
                                    if (0 !== t.type) return [3, 5];
                                    ((o = void 0), (B = t.url), (n.label = 1));
                                  case 1:
                                    return (
                                      n.trys.push([1, 3, , 4]),
                                      [4, r.context.cache.match(B)]
                                    );
                                  case 2:
                                    return ((o = n.sent()), [3, 4]);
                                  case 3:
                                    return (
                                      n.sent(),
                                      r.context.logger.error(
                                        "Error loading background-image " + B,
                                      ),
                                      [3, 4]
                                    );
                                  case 4:
                                    return (
                                      o &&
                                        ((s = oB(A, e, [
                                          o.width,
                                          o.height,
                                          o.width / o.height,
                                        ])),
                                        (h = s[0]),
                                        (m = s[1]),
                                        (I = s[2]),
                                        (U = r.ctx.createPattern(
                                          r.resizeImage(
                                            o,
                                            (H = s[3]),
                                            (y = s[4]),
                                          ),
                                          "repeat",
                                        )),
                                        r.renderRepeat(h, U, m, I)),
                                      [3, 6]
                                    );
                                  case 5:
                                    (1 === t.type
                                      ? ((i = oB(A, e, [null, null, null])),
                                        (h = i[0]),
                                        (m = i[1]),
                                        (I = i[2]),
                                        (a = (function (A, e, t) {
                                          var r =
                                              "number" == typeof A
                                                ? A
                                                : (function (A, e, t) {
                                                    var r = e / 2,
                                                      n = t / 2,
                                                      o = ue(A[0], e) - r,
                                                      B = n - ue(A[1], t);
                                                    return (
                                                      (Math.atan2(B, o) +
                                                        2 * Math.PI) %
                                                      (2 * Math.PI)
                                                    );
                                                  })(A, e, t),
                                            n =
                                              Math.abs(e * Math.sin(r)) +
                                              Math.abs(t * Math.cos(r)),
                                            o = e / 2,
                                            B = t / 2,
                                            s = n / 2,
                                            i = Math.sin(r - Math.PI / 2) * s,
                                            a = Math.cos(r - Math.PI / 2) * s;
                                          return [
                                            n,
                                            o - a,
                                            o + a,
                                            B - i,
                                            B + i,
                                          ];
                                        })(t.angle, (H = i[3]), (y = i[4]))),
                                        (c = a[0]),
                                        (l = a[1]),
                                        (u = a[2]),
                                        (g = a[3]),
                                        (w = a[4]),
                                        ((Q =
                                          document.createElement(
                                            "canvas",
                                          )).width = H),
                                        (Q.height = y),
                                        (d = Q.getContext("2d")),
                                        (C = d.createLinearGradient(
                                          l,
                                          g,
                                          u,
                                          w,
                                        )),
                                        Se(t.stops, c).forEach(function (A) {
                                          return C.addColorStop(
                                            A.stop,
                                            fe(A.color),
                                          );
                                        }),
                                        (d.fillStyle = C),
                                        d.fillRect(0, 0, H, y),
                                        H > 0 &&
                                          y > 0 &&
                                          ((U = r.ctx.createPattern(
                                            Q,
                                            "repeat",
                                          )),
                                          r.renderRepeat(h, U, m, I)))
                                      : 2 === t.type &&
                                        ((F = oB(A, e, [null, null, null])),
                                        (h = F[0]),
                                        (f = F[1]),
                                        (p = F[2]),
                                        (y = F[4]),
                                        (m = ue(
                                          (E =
                                            0 === t.position.length
                                              ? [ae]
                                              : t.position)[0],
                                          (H = F[3]),
                                        )),
                                        (I = ue(E[E.length - 1], y)),
                                        (b = (function (A, e, t, r, n) {
                                          var o = 0,
                                            B = 0;
                                          switch (A.size) {
                                            case 0:
                                              0 === A.shape
                                                ? (o = B =
                                                    Math.min(
                                                      Math.abs(e),
                                                      Math.abs(e - r),
                                                      Math.abs(t),
                                                      Math.abs(t - n),
                                                    ))
                                                : 1 === A.shape &&
                                                  ((o = Math.min(
                                                    Math.abs(e),
                                                    Math.abs(e - r),
                                                  )),
                                                  (B = Math.min(
                                                    Math.abs(t),
                                                    Math.abs(t - n),
                                                  )));
                                              break;
                                            case 2:
                                              if (0 === A.shape)
                                                o = B = Math.min(
                                                  Te(e, t),
                                                  Te(e, t - n),
                                                  Te(e - r, t),
                                                  Te(e - r, t - n),
                                                );
                                              else if (1 === A.shape) {
                                                var s =
                                                    Math.min(
                                                      Math.abs(t),
                                                      Math.abs(t - n),
                                                    ) /
                                                    Math.min(
                                                      Math.abs(e),
                                                      Math.abs(e - r),
                                                    ),
                                                  i = Me(r, n, e, t, !0);
                                                B =
                                                  s *
                                                  (o = Te(
                                                    i[0] - e,
                                                    (i[1] - t) / s,
                                                  ));
                                              }
                                              break;
                                            case 1:
                                              0 === A.shape
                                                ? (o = B =
                                                    Math.max(
                                                      Math.abs(e),
                                                      Math.abs(e - r),
                                                      Math.abs(t),
                                                      Math.abs(t - n),
                                                    ))
                                                : 1 === A.shape &&
                                                  ((o = Math.max(
                                                    Math.abs(e),
                                                    Math.abs(e - r),
                                                  )),
                                                  (B = Math.max(
                                                    Math.abs(t),
                                                    Math.abs(t - n),
                                                  )));
                                              break;
                                            case 3:
                                              if (0 === A.shape)
                                                o = B = Math.max(
                                                  Te(e, t),
                                                  Te(e, t - n),
                                                  Te(e - r, t),
                                                  Te(e - r, t - n),
                                                );
                                              else if (1 === A.shape) {
                                                s =
                                                  Math.max(
                                                    Math.abs(t),
                                                    Math.abs(t - n),
                                                  ) /
                                                  Math.max(
                                                    Math.abs(e),
                                                    Math.abs(e - r),
                                                  );
                                                var a = Me(r, n, e, t, !1);
                                                B =
                                                  s *
                                                  (o = Te(
                                                    a[0] - e,
                                                    (a[1] - t) / s,
                                                  ));
                                              }
                                          }
                                          return (
                                            Array.isArray(A.size) &&
                                              ((o = ue(A.size[0], r)),
                                              (B =
                                                2 === A.size.length
                                                  ? ue(A.size[1], n)
                                                  : o)),
                                            [o, B]
                                          );
                                        })(t, m, I, H, y)),
                                        (K = b[1]),
                                        (v = b[0]) > 0 &&
                                          K > 0 &&
                                          ((L = r.ctx.createRadialGradient(
                                            f + m,
                                            p + I,
                                            0,
                                            f + m,
                                            p + I,
                                            v,
                                          )),
                                          Se(t.stops, 2 * v).forEach(
                                            function (A) {
                                              return L.addColorStop(
                                                A.stop,
                                                fe(A.color),
                                              );
                                            },
                                          ),
                                          r.path(h),
                                          (r.ctx.fillStyle = L),
                                          v !== K
                                            ? ((D =
                                                A.bounds.left +
                                                0.5 * A.bounds.width),
                                              (x =
                                                A.bounds.top +
                                                0.5 * A.bounds.height),
                                              (T = 1 / (S = K / v)),
                                              r.ctx.save(),
                                              r.ctx.translate(D, x),
                                              r.ctx.transform(1, 0, 0, S, 0, 0),
                                              r.ctx.translate(-D, -x),
                                              r.ctx.fillRect(
                                                f,
                                                T * (p - x) + x,
                                                H,
                                                y * T,
                                              ),
                                              r.ctx.restore())
                                            : r.ctx.fill())),
                                      (n.label = 6));
                                  case 6:
                                    return (e--, [2]);
                                }
                              });
                            }),
                            (r = this),
                            (o = 0),
                            (B = A.styles.backgroundImage.slice(0).reverse()),
                            (s.label = 1));
                        case 1:
                          return o < B.length ? [5, t(B[o])] : [3, 4];
                        case 2:
                          (s.sent(), (s.label = 3));
                        case 3:
                          return (o++, [3, 1]);
                        case 4:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.renderSolidBorder = function (A, e, t) {
                  return r(this, void 0, void 0, function () {
                    return n(this, function (r) {
                      return (
                        this.path(AB(t, e)),
                        (this.ctx.fillStyle = fe(A)),
                        this.ctx.fill(),
                        [2]
                      );
                    });
                  });
                }),
                (t.prototype.renderDoubleBorder = function (A, e, t, o) {
                  return r(this, void 0, void 0, function () {
                    var r, B;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return e < 3
                            ? [4, this.renderSolidBorder(A, t, o)]
                            : [3, 2];
                        case 1:
                          return (n.sent(), [2]);
                        case 2:
                          return (
                            (r = (function (A, e) {
                              switch (e) {
                                case 0:
                                  return tB(
                                    A.topLeftBorderBox,
                                    A.topLeftBorderDoubleOuterBox,
                                    A.topRightBorderBox,
                                    A.topRightBorderDoubleOuterBox,
                                  );
                                case 1:
                                  return tB(
                                    A.topRightBorderBox,
                                    A.topRightBorderDoubleOuterBox,
                                    A.bottomRightBorderBox,
                                    A.bottomRightBorderDoubleOuterBox,
                                  );
                                case 2:
                                  return tB(
                                    A.bottomRightBorderBox,
                                    A.bottomRightBorderDoubleOuterBox,
                                    A.bottomLeftBorderBox,
                                    A.bottomLeftBorderDoubleOuterBox,
                                  );
                                default:
                                  return tB(
                                    A.bottomLeftBorderBox,
                                    A.bottomLeftBorderDoubleOuterBox,
                                    A.topLeftBorderBox,
                                    A.topLeftBorderDoubleOuterBox,
                                  );
                              }
                            })(o, t)),
                            this.path(r),
                            (this.ctx.fillStyle = fe(A)),
                            this.ctx.fill(),
                            (B = (function (A, e) {
                              switch (e) {
                                case 0:
                                  return tB(
                                    A.topLeftBorderDoubleInnerBox,
                                    A.topLeftPaddingBox,
                                    A.topRightBorderDoubleInnerBox,
                                    A.topRightPaddingBox,
                                  );
                                case 1:
                                  return tB(
                                    A.topRightBorderDoubleInnerBox,
                                    A.topRightPaddingBox,
                                    A.bottomRightBorderDoubleInnerBox,
                                    A.bottomRightPaddingBox,
                                  );
                                case 2:
                                  return tB(
                                    A.bottomRightBorderDoubleInnerBox,
                                    A.bottomRightPaddingBox,
                                    A.bottomLeftBorderDoubleInnerBox,
                                    A.bottomLeftPaddingBox,
                                  );
                                default:
                                  return tB(
                                    A.bottomLeftBorderDoubleInnerBox,
                                    A.bottomLeftPaddingBox,
                                    A.topLeftBorderDoubleInnerBox,
                                    A.topLeftPaddingBox,
                                  );
                              }
                            })(o, t)),
                            this.path(B),
                            this.ctx.fill(),
                            [2]
                          );
                      }
                    });
                  });
                }),
                (t.prototype.renderNodeBackgroundAndBorders = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e,
                      t,
                      r,
                      o,
                      B,
                      s,
                      i,
                      a,
                      c = this;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            this.applyEffects(A.getEffects(2)),
                            (t =
                              !he((e = A.container.styles).backgroundColor) ||
                              e.backgroundImage.length),
                            (r = [
                              {
                                style: e.borderTopStyle,
                                color: e.borderTopColor,
                                width: e.borderTopWidth,
                              },
                              {
                                style: e.borderRightStyle,
                                color: e.borderRightColor,
                                width: e.borderRightWidth,
                              },
                              {
                                style: e.borderBottomStyle,
                                color: e.borderBottomColor,
                                width: e.borderBottomWidth,
                              },
                              {
                                style: e.borderLeftStyle,
                                color: e.borderLeftColor,
                                width: e.borderLeftWidth,
                              },
                            ]),
                            (o = dB(aB(e.backgroundClip, 0), A.curves)),
                            t || e.boxShadow.length
                              ? (this.ctx.save(),
                                this.path(o),
                                this.ctx.clip(),
                                he(e.backgroundColor) ||
                                  ((this.ctx.fillStyle = fe(e.backgroundColor)),
                                  this.ctx.fill()),
                                [4, this.renderBackgroundImage(A.container)])
                              : [3, 2]
                          );
                        case 1:
                          (n.sent(),
                            this.ctx.restore(),
                            e.boxShadow
                              .slice(0)
                              .reverse()
                              .forEach(function (e) {
                                c.ctx.save();
                                var t,
                                  r,
                                  n,
                                  o,
                                  B = Po(A.curves),
                                  s = e.inset ? 0 : 1e4,
                                  i =
                                    ((t =
                                      (e.inset ? 1 : -1) * e.spread.number - s),
                                    (r = (e.inset ? 1 : -1) * e.spread.number),
                                    (n = e.spread.number * (e.inset ? -2 : 2)),
                                    (o = e.spread.number * (e.inset ? -2 : 2)),
                                    B.map(function (A, e) {
                                      switch (e) {
                                        case 0:
                                          return A.add(t, r);
                                        case 1:
                                          return A.add(t + n, r);
                                        case 2:
                                          return A.add(t + n, r + o);
                                        case 3:
                                          return A.add(t, r + o);
                                      }
                                      return A;
                                    }));
                                (e.inset
                                  ? (c.path(B), c.ctx.clip(), c.mask(i))
                                  : (c.mask(B), c.ctx.clip(), c.path(i)),
                                  (c.ctx.shadowOffsetX = e.offsetX.number + s),
                                  (c.ctx.shadowOffsetY = e.offsetY.number),
                                  (c.ctx.shadowColor = fe(e.color)),
                                  (c.ctx.shadowBlur = e.blur.number),
                                  (c.ctx.fillStyle = e.inset
                                    ? fe(e.color)
                                    : "rgba(0,0,0,1)"),
                                  c.ctx.fill(),
                                  c.ctx.restore());
                              }),
                            (n.label = 2));
                        case 2:
                          ((B = 0), (s = 0), (i = r), (n.label = 3));
                        case 3:
                          return s < i.length
                            ? 0 !== (a = i[s]).style &&
                              !he(a.color) &&
                              a.width > 0
                              ? 2 !== a.style
                                ? [3, 5]
                                : [
                                    4,
                                    this.renderDashedDottedBorder(
                                      a.color,
                                      a.width,
                                      B,
                                      A.curves,
                                      2,
                                    ),
                                  ]
                              : [3, 11]
                            : [3, 13];
                        case 4:
                          return (n.sent(), [3, 11]);
                        case 5:
                          return 3 !== a.style
                            ? [3, 7]
                            : [
                                4,
                                this.renderDashedDottedBorder(
                                  a.color,
                                  a.width,
                                  B,
                                  A.curves,
                                  3,
                                ),
                              ];
                        case 6:
                          return (n.sent(), [3, 11]);
                        case 7:
                          return 4 !== a.style
                            ? [3, 9]
                            : [
                                4,
                                this.renderDoubleBorder(
                                  a.color,
                                  a.width,
                                  B,
                                  A.curves,
                                ),
                              ];
                        case 8:
                          return (n.sent(), [3, 11]);
                        case 9:
                          return [
                            4,
                            this.renderSolidBorder(a.color, B, A.curves),
                          ];
                        case 10:
                          (n.sent(), (n.label = 11));
                        case 11:
                          (B++, (n.label = 12));
                        case 12:
                          return (s++, [3, 3]);
                        case 13:
                          return [2];
                      }
                    });
                  });
                }),
                (t.prototype.renderDashedDottedBorder = function (
                  A,
                  e,
                  t,
                  o,
                  B,
                ) {
                  return r(this, void 0, void 0, function () {
                    var r, s, i, a, c, l, u, g, w, Q, d, C, U, F, h, f;
                    return n(this, function (n) {
                      return (
                        this.ctx.save(),
                        (r = (function (A, e) {
                          switch (e) {
                            case 0:
                              return eB(
                                A.topLeftBorderStroke,
                                A.topRightBorderStroke,
                              );
                            case 1:
                              return eB(
                                A.topRightBorderStroke,
                                A.bottomRightBorderStroke,
                              );
                            case 2:
                              return eB(
                                A.bottomRightBorderStroke,
                                A.bottomLeftBorderStroke,
                              );
                            default:
                              return eB(
                                A.bottomLeftBorderStroke,
                                A.topLeftBorderStroke,
                              );
                          }
                        })(o, t)),
                        (s = AB(o, t)),
                        2 === B && (this.path(s), this.ctx.clip()),
                        Vo(s[0])
                          ? ((i = s[0].start.x), (a = s[0].start.y))
                          : ((i = s[0].x), (a = s[0].y)),
                        Vo(s[1])
                          ? ((c = s[1].end.x), (l = s[1].end.y))
                          : ((c = s[1].x), (l = s[1].y)),
                        (u =
                          0 === t || 2 === t
                            ? Math.abs(i - c)
                            : Math.abs(a - l)),
                        this.ctx.beginPath(),
                        this.formatPath(3 === B ? r : s.slice(0, 2)),
                        (g = e < 3 ? 3 * e : 2 * e),
                        (w = e < 3 ? 2 * e : e),
                        3 === B && ((g = e), (w = e)),
                        (Q = !0),
                        u <= 2 * g
                          ? (Q = !1)
                          : u <= 2 * g + w
                            ? ((g *= d = u / (2 * g + w)), (w *= d))
                            : ((C = Math.floor((u + w) / (g + w))),
                              (U = (u - C * g) / (C - 1)),
                              (w =
                                (F = (u - (C + 1) * g) / C) <= 0 ||
                                Math.abs(w - U) < Math.abs(w - F)
                                  ? U
                                  : F)),
                        Q &&
                          this.ctx.setLineDash(3 === B ? [0, g + w] : [g, w]),
                        3 === B
                          ? ((this.ctx.lineCap = "round"),
                            (this.ctx.lineWidth = e))
                          : (this.ctx.lineWidth = 2 * e + 1.1),
                        (this.ctx.strokeStyle = fe(A)),
                        this.ctx.stroke(),
                        this.ctx.setLineDash([]),
                        2 === B &&
                          (Vo(s[0]) &&
                            ((h = s[3]),
                            (f = s[0]),
                            this.ctx.beginPath(),
                            this.formatPath([
                              new Oo(h.end.x, h.end.y),
                              new Oo(f.start.x, f.start.y),
                            ]),
                            this.ctx.stroke()),
                          Vo(s[1]) &&
                            ((h = s[1]),
                            (f = s[2]),
                            this.ctx.beginPath(),
                            this.formatPath([
                              new Oo(h.end.x, h.end.y),
                              new Oo(f.start.x, f.start.y),
                            ]),
                            this.ctx.stroke())),
                        this.ctx.restore(),
                        [2]
                      );
                    });
                  });
                }),
                (t.prototype.render = function (A) {
                  return r(this, void 0, void 0, function () {
                    return n(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return (
                            this.options.backgroundColor &&
                              ((this.ctx.fillStyle = fe(
                                this.options.backgroundColor,
                              )),
                              this.ctx.fillRect(
                                this.options.x,
                                this.options.y,
                                this.options.width,
                                this.options.height,
                              )),
                            (t = new qo(A, null)),
                            (r = new jo(t)),
                            zo(t, r, r, (n = [])),
                            $o(t.container, n),
                            [4, this.renderStack(r)]
                          );
                        case 1:
                          return (
                            e.sent(),
                            this.applyEffects([]),
                            [2, this.canvas]
                          );
                      }
                      var t, r, n;
                    });
                  });
                }),
                t
              );
            })(gB),
            QB = function (A) {
              return (
                A instanceof pn ||
                A instanceof fn ||
                (A instanceof hn && A.type !== Un && A.type !== Cn)
              );
            },
            dB = function (A, e) {
              switch (A) {
                case 0:
                  return Po(e);
                case 2:
                  return (function (A) {
                    return [
                      A.topLeftContentBox,
                      A.topRightContentBox,
                      A.bottomRightContentBox,
                      A.bottomLeftContentBox,
                    ];
                  })(e);
                default:
                  return Xo(e);
              }
            },
            CB = function (A) {
              switch (A) {
                case 1:
                  return "center";
                case 2:
                  return "right";
                default:
                  return "left";
              }
            },
            UB = ["-apple-system", "system-ui"],
            FB = function (A) {
              return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
                ? A.filter(function (A) {
                    return -1 === UB.indexOf(A);
                  })
                : A;
            },
            hB = (function (A) {
              function t(e, t) {
                var r = A.call(this, e, t) || this;
                return (
                  (r.canvas = t.canvas
                    ? t.canvas
                    : document.createElement("canvas")),
                  (r.ctx = r.canvas.getContext("2d")),
                  (r.options = t),
                  (r.canvas.width = Math.floor(t.width * t.scale)),
                  (r.canvas.height = Math.floor(t.height * t.scale)),
                  (r.canvas.style.width = t.width + "px"),
                  (r.canvas.style.height = t.height + "px"),
                  r.ctx.scale(r.options.scale, r.options.scale),
                  r.ctx.translate(-t.x, -t.y),
                  r.context.logger.debug(
                    "EXPERIMENTAL ForeignObject renderer initialized (" +
                      t.width +
                      "x" +
                      t.height +
                      " at " +
                      t.x +
                      "," +
                      t.y +
                      ") with scale " +
                      t.scale,
                  ),
                  r
                );
              }
              return (
                e(t, A),
                (t.prototype.render = function (A) {
                  return r(this, void 0, void 0, function () {
                    var e, t;
                    return n(this, function (r) {
                      switch (r.label) {
                        case 0:
                          return (
                            (e = zr(
                              this.options.width * this.options.scale,
                              this.options.height * this.options.scale,
                              this.options.scale,
                              this.options.scale,
                              A,
                            )),
                            [4, fB(e)]
                          );
                        case 1:
                          return (
                            (t = r.sent()),
                            this.options.backgroundColor &&
                              ((this.ctx.fillStyle = fe(
                                this.options.backgroundColor,
                              )),
                              this.ctx.fillRect(
                                0,
                                0,
                                this.options.width * this.options.scale,
                                this.options.height * this.options.scale,
                              )),
                            this.ctx.drawImage(
                              t,
                              -this.options.x * this.options.scale,
                              -this.options.y * this.options.scale,
                            ),
                            [2, this.canvas]
                          );
                      }
                    });
                  });
                }),
                t
              );
            })(gB),
            fB = function (A) {
              return new Promise(function (e, t) {
                var r = new Image();
                ((r.onload = function () {
                  e(r);
                }),
                  (r.onerror = t),
                  (r.src =
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(
                      new XMLSerializer().serializeToString(A),
                    )));
              });
            },
            pB = (function () {
              function A(A) {
                var e = A.enabled;
                ((this.id = A.id),
                  (this.enabled = e),
                  (this.start = Date.now()));
              }
              return (
                (A.prototype.debug = function () {
                  for (var A = [], e = 0; e < arguments.length; e++)
                    A[e] = arguments[e];
                  this.enabled &&
                    ("undefined" != typeof window &&
                    window.console &&
                    "function" == typeof console.debug
                      ? console.debug.apply(
                          console,
                          o([this.id, this.getTime() + "ms"], A),
                        )
                      : this.info.apply(this, A));
                }),
                (A.prototype.getTime = function () {
                  return Date.now() - this.start;
                }),
                (A.prototype.info = function () {
                  for (var A = [], e = 0; e < arguments.length; e++)
                    A[e] = arguments[e];
                  this.enabled &&
                    "undefined" != typeof window &&
                    window.console &&
                    "function" == typeof console.info &&
                    console.info.apply(
                      console,
                      o([this.id, this.getTime() + "ms"], A),
                    );
                }),
                (A.prototype.warn = function () {
                  for (var A = [], e = 0; e < arguments.length; e++)
                    A[e] = arguments[e];
                  this.enabled &&
                    ("undefined" != typeof window &&
                    window.console &&
                    "function" == typeof console.warn
                      ? console.warn.apply(
                          console,
                          o([this.id, this.getTime() + "ms"], A),
                        )
                      : this.info.apply(this, A));
                }),
                (A.prototype.error = function () {
                  for (var A = [], e = 0; e < arguments.length; e++)
                    A[e] = arguments[e];
                  this.enabled &&
                    ("undefined" != typeof window &&
                    window.console &&
                    "function" == typeof console.error
                      ? console.error.apply(
                          console,
                          o([this.id, this.getTime() + "ms"], A),
                        )
                      : this.info.apply(this, A));
                }),
                (A.instances = {}),
                A
              );
            })(),
            HB = (function () {
              function A(e, t) {
                var r;
                ((this.windowBounds = t),
                  (this.instanceName = "#" + A.instanceCount++),
                  (this.logger = new pB({
                    id: this.instanceName,
                    enabled: e.logging,
                  })),
                  (this.cache =
                    null !== (r = e.cache) && void 0 !== r
                      ? r
                      : new bo(this, e)));
              }
              return ((A.instanceCount = 1), A);
            })();
          return (
            "undefined" != typeof window && Io.setContext(window),
            function (A, e) {
              return (
                void 0 === e && (e = {}),
                (function (A, e) {
                  return r(void 0, void 0, void 0, function () {
                    var r,
                      o,
                      i,
                      a,
                      c,
                      l,
                      u,
                      g,
                      w,
                      Q,
                      d,
                      C,
                      U,
                      F,
                      h,
                      f,
                      p,
                      H,
                      y,
                      E,
                      m,
                      I,
                      b,
                      v,
                      K,
                      L,
                      D,
                      x,
                      S,
                      T,
                      M,
                      O,
                      k,
                      G,
                      V,
                      R,
                      N,
                      P;
                    return n(this, function (n) {
                      switch (n.label) {
                        case 0:
                          if (!A || "object" != typeof A)
                            return [
                              2,
                              Promise.reject(
                                "Invalid element provided as first argument",
                              ),
                            ];
                          if (!(r = A.ownerDocument))
                            throw new Error(
                              "Element is not attached to a Document",
                            );
                          if (!(o = r.defaultView))
                            throw new Error(
                              "Document is not attached to a Window",
                            );
                          return (
                            (i = {
                              allowTaint:
                                null !== (I = e.allowTaint) &&
                                void 0 !== I &&
                                I,
                              imageTimeout:
                                null !== (b = e.imageTimeout) && void 0 !== b
                                  ? b
                                  : 15e3,
                              proxy: e.proxy,
                              useCORS:
                                null !== (v = e.useCORS) && void 0 !== v && v,
                            }),
                            (a = t(
                              {
                                logging:
                                  null === (K = e.logging) || void 0 === K || K,
                                cache: e.cache,
                              },
                              i,
                            )),
                            (c = {
                              windowWidth:
                                null !== (L = e.windowWidth) && void 0 !== L
                                  ? L
                                  : o.innerWidth,
                              windowHeight:
                                null !== (D = e.windowHeight) && void 0 !== D
                                  ? D
                                  : o.innerHeight,
                              scrollX:
                                null !== (x = e.scrollX) && void 0 !== x
                                  ? x
                                  : o.pageXOffset,
                              scrollY:
                                null !== (S = e.scrollY) && void 0 !== S
                                  ? S
                                  : o.pageYOffset,
                            }),
                            (l = new B(
                              c.scrollX,
                              c.scrollY,
                              c.windowWidth,
                              c.windowHeight,
                            )),
                            (u = new HB(a, l)),
                            (g =
                              null !== (T = e.foreignObjectRendering) &&
                              void 0 !== T &&
                              T),
                            (w = {
                              allowTaint:
                                null !== (M = e.allowTaint) &&
                                void 0 !== M &&
                                M,
                              onclone: e.onclone,
                              ignoreElements: e.ignoreElements,
                              inlineImages: g,
                              copyStyles: g,
                            }),
                            u.logger.debug(
                              "Starting document clone with size " +
                                l.width +
                                "x" +
                                l.height +
                                " scrolled to " +
                                -l.left +
                                "," +
                                -l.top,
                            ),
                            (Q = new co(u, A, w)),
                            (d = Q.clonedReferenceElement)
                              ? [4, Q.toIFrame(r, l)]
                              : [
                                  2,
                                  Promise.reject(
                                    "Unable to find element in cloned iframe",
                                  ),
                                ]
                          );
                        case 1:
                          return (
                            (C = n.sent()),
                            (U =
                              kn(d) || "HTML" === d.tagName
                                ? (function (A) {
                                    var e = A.body,
                                      t = A.documentElement;
                                    if (!e || !t)
                                      throw new Error(
                                        "Unable to get document size",
                                      );
                                    var r = Math.max(
                                        Math.max(e.scrollWidth, t.scrollWidth),
                                        Math.max(e.offsetWidth, t.offsetWidth),
                                        Math.max(e.clientWidth, t.clientWidth),
                                      ),
                                      n = Math.max(
                                        Math.max(
                                          e.scrollHeight,
                                          t.scrollHeight,
                                        ),
                                        Math.max(
                                          e.offsetHeight,
                                          t.offsetHeight,
                                        ),
                                        Math.max(
                                          e.clientHeight,
                                          t.clientHeight,
                                        ),
                                      );
                                    return new B(0, 0, r, n);
                                  })(d.ownerDocument)
                                : s(u, d)),
                            (F = U.width),
                            (h = U.height),
                            (f = U.left),
                            (p = U.top),
                            (H = (function (A, e, t) {
                              var r = e.ownerDocument,
                                n = r.documentElement
                                  ? ve(
                                      A,
                                      getComputedStyle(r.documentElement)
                                        .backgroundColor,
                                    )
                                  : Ke.TRANSPARENT,
                                o = r.body
                                  ? ve(
                                      A,
                                      getComputedStyle(r.body).backgroundColor,
                                    )
                                  : Ke.TRANSPARENT,
                                B =
                                  "string" == typeof t
                                    ? ve(A, t)
                                    : null === t
                                      ? Ke.TRANSPARENT
                                      : 4294967295;
                              return e === r.documentElement
                                ? he(n)
                                  ? he(o)
                                    ? B
                                    : o
                                  : n
                                : B;
                            })(u, d, e.backgroundColor)),
                            (y = {
                              canvas: e.canvas,
                              backgroundColor: H,
                              scale:
                                null !==
                                  (k =
                                    null !== (O = e.scale) && void 0 !== O
                                      ? O
                                      : o.devicePixelRatio) && void 0 !== k
                                  ? k
                                  : 1,
                              x:
                                (null !== (G = e.x) && void 0 !== G ? G : 0) +
                                f,
                              y:
                                (null !== (V = e.y) && void 0 !== V ? V : 0) +
                                p,
                              width:
                                null !== (R = e.width) && void 0 !== R
                                  ? R
                                  : Math.ceil(F),
                              height:
                                null !== (N = e.height) && void 0 !== N
                                  ? N
                                  : Math.ceil(h),
                            }),
                            g
                              ? (u.logger.debug(
                                  "Document cloned, using foreign object rendering",
                                ),
                                [4, new hB(u, y).render(d)])
                              : [3, 3]
                          );
                        case 2:
                          return ((E = n.sent()), [3, 5]);
                        case 3:
                          return (
                            u.logger.debug(
                              "Document cloned, element located at " +
                                f +
                                "," +
                                p +
                                " with size " +
                                F +
                                "x" +
                                h +
                                " using computed rendering",
                            ),
                            u.logger.debug("Starting DOM parsing"),
                            (m = In(u, d)),
                            H === m.styles.backgroundColor &&
                              (m.styles.backgroundColor = Ke.TRANSPARENT),
                            u.logger.debug(
                              "Starting renderer for element at " +
                                y.x +
                                "," +
                                y.y +
                                " with size " +
                                y.width +
                                "x" +
                                y.height,
                            ),
                            [4, new wB(u, y).render(m)]
                          );
                        case 4:
                          ((E = n.sent()), (n.label = 5));
                        case 5:
                          return (
                            (null === (P = e.removeContainer) ||
                              void 0 === P ||
                              P) &&
                              (co.destroy(C) ||
                                u.logger.error(
                                  "Cannot detach cloned iframe as it is not in the DOM anymore",
                                )),
                            u.logger.debug("Finished rendering"),
                            [2, E]
                          );
                      }
                    });
                  });
                })(A, e)
              );
            }
          );
        })();
      })(e),
      e.exports
    );
  })(),
  qA = null,
  zA = { url: "", user: {}, disableErrorAlert: !1, theme: "auto" };
function $A() {
  var e;
  return A({}, zA, null == (e = window.feedbackfin) ? void 0 : e.config);
}
function Ae() {
  var A = document.createElement("style");
  ((A.id = "feedbackfin__css"),
    (A.innerHTML = void 0),
    document.head.insertBefore(A, document.head.firstChild),
    document
      .querySelectorAll("[data-feedbackfin-button]")
      .forEach(function (A) {
        A.addEventListener("click", re);
      }));
}
window.addEventListener("load", Ae);
var ee = document.createElement("div");
ee.id = "feedbackfin__container";
var te = (function (A, e) {
  var t,
    r = (null == e ? void 0 : e.document) || document,
    n = (null == e ? void 0 : e.trapStack) || ZA,
    o = GA(
      {
        returnFocusOnDeactivate: !0,
        escapeDeactivates: !0,
        delayInitialFocus: !0,
        isolateSubtrees: !1,
        isKeyForward: XA,
        isKeyBackward: JA,
      },
      e,
    ),
    B = {
      containers: [],
      containerGroups: [],
      tabbableGroups: [],
      adjacentElements: new Set(),
      alreadySilent: new Set(),
      nodeFocusedBeforeActivation: null,
      mostRecentlyFocusedNode: null,
      active: !1,
      paused: !1,
      manuallyPaused: !1,
      delayInitialFocusTimer: void 0,
      recentNavEvent: void 0,
    },
    s = function (A, e, t) {
      return A && void 0 !== A[e] ? A[e] : o[t || e];
    },
    i = function (A, e) {
      var t =
        "function" == typeof (null == e ? void 0 : e.composedPath)
          ? e.composedPath()
          : void 0;
      return B.containerGroups.findIndex(function (e) {
        var r = e.container,
          n = e.tabbableNodes;
        return (
          r.contains(A) ||
          (null == t ? void 0 : t.includes(r)) ||
          n.find(function (e) {
            return e === A;
          })
        );
      });
    },
    a = function (A) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        t = e.hasFallback,
        n = void 0 !== t && t,
        B = e.params,
        s = void 0 === B ? [] : B,
        i = o[A];
      if (
        ("function" == typeof i && (i = i.apply(void 0, VA(s))),
        !0 === i && (i = void 0),
        !i)
      ) {
        if (void 0 === i || !1 === i) return i;
        throw new Error(
          "`".concat(
            A,
            "` was specified but was not a node, or did not return a node",
          ),
        );
      }
      var a = i;
      if ("string" == typeof i) {
        try {
          a = r.querySelector(i);
        } catch (e) {
          throw new Error(
            "`"
              .concat(A, '` appears to be an invalid selector; error="')
              .concat(e.message, '"'),
          );
        }
        if (!a && !n)
          throw new Error(
            "`".concat(A, "` as selector refers to no known node"),
          );
      }
      return a;
    },
    c = function () {
      var A = a("initialFocus", { hasFallback: !0 });
      if (!1 === A) return !1;
      if (void 0 === A || (A && !SA(A, o.tabbableOptions)))
        if (i(r.activeElement) >= 0) A = r.activeElement;
        else {
          var e = B.tabbableGroups[0];
          A = (e && e.firstTabbableNode) || a("fallbackFocus");
        }
      else null === A && (A = a("fallbackFocus"));
      if (!A)
        throw new Error(
          "Your focus-trap needs to have at least one focusable element",
        );
      return A;
    },
    l = function () {
      if (
        ((B.containerGroups = B.containers.map(function (A) {
          var e = (function (A, e) {
              var t;
              return (
                (t = (e = e || {}).getShadowRoot
                  ? pA([A], e.includeContainer, {
                      filter: vA.bind(null, e),
                      flatten: !1,
                      getShadowRoot: e.getShadowRoot,
                      shadowRootFilter: KA,
                    })
                  : fA(A, e.includeContainer, vA.bind(null, e))),
                LA(t)
              );
            })(A, o.tabbableOptions),
            t = (function (A, e) {
              return (e = e || {}).getShadowRoot
                ? pA([A], e.includeContainer, {
                    filter: bA.bind(null, e),
                    flatten: !0,
                    getShadowRoot: e.getShadowRoot,
                  })
                : fA(A, e.includeContainer, bA.bind(null, e));
            })(A, o.tabbableOptions),
            r = e.length > 0 ? e[0] : void 0,
            n = e.length > 0 ? e[e.length - 1] : void 0,
            B = t.find(function (A) {
              return DA(A);
            }),
            s = t
              .slice()
              .reverse()
              .find(function (A) {
                return DA(A);
              }),
            i = !!e.find(function (A) {
              return yA(A) > 0;
            });
          return {
            container: A,
            tabbableNodes: e,
            focusableNodes: t,
            posTabIndexesFound: i,
            firstTabbableNode: r,
            lastTabbableNode: n,
            firstDomTabbableNode: B,
            lastDomTabbableNode: s,
            nextTabbableNode: function (A) {
              var r =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1],
                n = e.indexOf(A);
              return n < 0
                ? r
                  ? t.slice(t.indexOf(A) + 1).find(function (A) {
                      return DA(A);
                    })
                  : t
                      .slice(0, t.indexOf(A))
                      .reverse()
                      .find(function (A) {
                        return DA(A);
                      })
                : e[n + (r ? 1 : -1)];
            },
          };
        })),
        (B.tabbableGroups = B.containerGroups.filter(function (A) {
          return A.tabbableNodes.length > 0;
        })),
        B.tabbableGroups.length <= 0 && !a("fallbackFocus"))
      )
        throw new Error(
          "Your focus-trap must have at least one container with at least one tabbable node in it at all times",
        );
      if (
        B.containerGroups.find(function (A) {
          return A.posTabIndexesFound;
        }) &&
        B.containerGroups.length > 1
      )
        throw new Error(
          "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.",
        );
    },
    u = function (A) {
      var e = A.activeElement;
      if (e)
        return e.shadowRoot && null !== e.shadowRoot.activeElement
          ? u(e.shadowRoot)
          : e;
    },
    g = function (A) {
      !1 !== A &&
        A !== u(document) &&
        (A && A.focus
          ? (A.focus({ preventScroll: !!o.preventScroll }),
            (B.mostRecentlyFocusedNode = A),
            (function (A) {
              return (
                A.tagName &&
                "input" === A.tagName.toLowerCase() &&
                "function" == typeof A.select
              );
            })(A) && A.select())
          : g(c()));
    },
    w = function (A) {
      var e = a("setReturnFocus", { params: [A] });
      return e || (!1 !== e && A);
    },
    Q = function (A) {
      var e = A.target,
        t = A.event,
        r = A.isBackward,
        n = void 0 !== r && r;
      ((e = e || _A(t)), l());
      var s = null;
      if (B.tabbableGroups.length > 0) {
        var c = i(e, t),
          u = c >= 0 ? B.containerGroups[c] : void 0;
        if (c < 0)
          s = n
            ? B.tabbableGroups[B.tabbableGroups.length - 1].lastTabbableNode
            : B.tabbableGroups[0].firstTabbableNode;
        else if (n) {
          var g = B.tabbableGroups.findIndex(function (A) {
            return e === A.firstTabbableNode;
          });
          if (
            (g < 0 &&
              (u.container === e ||
                (SA(e, o.tabbableOptions) &&
                  !DA(e, o.tabbableOptions) &&
                  !u.nextTabbableNode(e, !1))) &&
              (g = c),
            g >= 0)
          ) {
            var w =
              B.tabbableGroups[0 === g ? B.tabbableGroups.length - 1 : g - 1];
            s = yA(e) >= 0 ? w.lastTabbableNode : w.lastDomTabbableNode;
          } else PA(t) || (s = u.nextTabbableNode(e, !1));
        } else {
          var Q = B.tabbableGroups.findIndex(function (A) {
            return e === A.lastTabbableNode;
          });
          if (
            (Q < 0 &&
              (u.container === e ||
                (SA(e, o.tabbableOptions) &&
                  !DA(e, o.tabbableOptions) &&
                  !u.nextTabbableNode(e))) &&
              (Q = c),
            Q >= 0)
          ) {
            var d =
              B.tabbableGroups[Q === B.tabbableGroups.length - 1 ? 0 : Q + 1];
            s = yA(e) >= 0 ? d.firstTabbableNode : d.firstDomTabbableNode;
          } else PA(t) || (s = u.nextTabbableNode(e));
        }
      } else s = a("fallbackFocus");
      return s;
    },
    d = function (A) {
      var e = _A(A);
      i(e, A) >= 0 ||
        (WA(o.clickOutsideDeactivates, A)
          ? t.deactivate({ returnFocus: o.returnFocusOnDeactivate })
          : WA(o.allowOutsideClick, A) || A.preventDefault());
    },
    C = function (A) {
      var e = _A(A),
        t = i(e, A) >= 0;
      if (t || e instanceof Document) t && (B.mostRecentlyFocusedNode = e);
      else {
        var r;
        A.stopImmediatePropagation();
        var n = !0;
        if (B.mostRecentlyFocusedNode)
          if (yA(B.mostRecentlyFocusedNode) > 0) {
            var s = i(B.mostRecentlyFocusedNode),
              a = B.containerGroups[s].tabbableNodes;
            if (a.length > 0) {
              var l = a.findIndex(function (A) {
                return A === B.mostRecentlyFocusedNode;
              });
              l >= 0 &&
                (o.isKeyForward(B.recentNavEvent)
                  ? l + 1 < a.length && ((r = a[l + 1]), (n = !1))
                  : l - 1 >= 0 && ((r = a[l - 1]), (n = !1)));
            }
          } else
            B.containerGroups.some(function (A) {
              return A.tabbableNodes.some(function (A) {
                return yA(A) > 0;
              });
            }) || (n = !1);
        else n = !1;
        (n &&
          (r = Q({
            target: B.mostRecentlyFocusedNode,
            isBackward: o.isKeyBackward(B.recentNavEvent),
          })),
          g(r || B.mostRecentlyFocusedNode || c()));
      }
      B.recentNavEvent = void 0;
    },
    U = function (A) {
      (o.isKeyForward(A) || o.isKeyBackward(A)) &&
        (function (A) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          B.recentNavEvent = A;
          var t = Q({ event: A, isBackward: e });
          t && (PA(A) && A.preventDefault(), g(t));
        })(A, o.isKeyBackward(A));
    },
    F = function (A) {
      var e;
      ("Escape" !== (null == (e = A) ? void 0 : e.key) &&
        "Esc" !== (null == e ? void 0 : e.key) &&
        27 !== (null == e ? void 0 : e.keyCode)) ||
        !1 === WA(o.escapeDeactivates, A) ||
        (A.preventDefault(), t.deactivate());
    },
    h = function (A) {
      var e = _A(A);
      i(e, A) >= 0 ||
        WA(o.clickOutsideDeactivates, A) ||
        WA(o.allowOutsideClick, A) ||
        (A.preventDefault(), A.stopImmediatePropagation());
    },
    f = function () {
      if (B.active)
        return (
          NA.activateTrap(n, t),
          (B.delayInitialFocusTimer = o.delayInitialFocus
            ? YA(function () {
                g(c());
              })
            : g(c())),
          r.addEventListener("focusin", C, !0),
          r.addEventListener("mousedown", d, { capture: !0, passive: !1 }),
          r.addEventListener("touchstart", d, { capture: !0, passive: !1 }),
          r.addEventListener("click", h, { capture: !0, passive: !1 }),
          r.addEventListener("keydown", U, { capture: !0, passive: !1 }),
          r.addEventListener("keydown", F),
          t
        );
    },
    p = function () {
      if (B.active)
        return (
          r.removeEventListener("focusin", C, !0),
          r.removeEventListener("mousedown", d, !0),
          r.removeEventListener("touchstart", d, !0),
          r.removeEventListener("click", h, !0),
          r.removeEventListener("keydown", U, !0),
          r.removeEventListener("keydown", F),
          t
        );
    },
    H =
      "undefined" != typeof window && "MutationObserver" in window
        ? new MutationObserver(function (A) {
            A.some(function (A) {
              return Array.from(A.removedNodes).some(function (A) {
                return A === B.mostRecentlyFocusedNode;
              });
            }) && g(c());
          })
        : void 0,
    y = function () {
      H &&
        (H.disconnect(),
        B.active &&
          !B.paused &&
          B.containers.map(function (A) {
            H.observe(A, { subtree: !0, childList: !0 });
          }));
    };
  return (
    (t = {
      get active() {
        return B.active;
      },
      get paused() {
        return B.paused;
      },
      activate: function (A) {
        if (B.active) return this;
        var e,
          i = s(A, "onActivate"),
          a = s(A, "onPostActivate"),
          c = s(A, "checkCanFocusTrap"),
          g = NA.getActiveTrap(n),
          w = !1;
        g &&
          !g.paused &&
          (null === (e = g._setSubtreeIsolation) ||
            void 0 === e ||
            e.call(g, !1),
          (w = !0));
        try {
          (c || l(),
            (B.active = !0),
            (B.paused = !1),
            (B.nodeFocusedBeforeActivation = u(r)),
            null == i || i());
          var Q = function () {
            (c && l(),
              f(),
              y(),
              o.isolateSubtrees && t._setSubtreeIsolation(!0),
              null == a || a());
          };
          if (c) return (c(B.containers.concat()).then(Q, Q), this);
          Q();
        } catch (A) {
          var d;
          throw (
            g === NA.getActiveTrap(n) &&
              w &&
              (null === (d = g._setSubtreeIsolation) ||
                void 0 === d ||
                d.call(g, !0)),
            A
          );
        }
        return this;
      },
      deactivate: function (A) {
        if (!B.active) return this;
        var e = GA(
          {
            onDeactivate: o.onDeactivate,
            onPostDeactivate: o.onPostDeactivate,
            checkCanReturnFocus: o.checkCanReturnFocus,
          },
          A,
        );
        (clearTimeout(B.delayInitialFocusTimer),
          (B.delayInitialFocusTimer = void 0),
          B.paused || t._setSubtreeIsolation(!1),
          B.alreadySilent.clear(),
          p(),
          (B.active = !1),
          (B.paused = !1),
          y(),
          NA.deactivateTrap(n, t));
        var r = s(e, "onDeactivate"),
          i = s(e, "onPostDeactivate"),
          a = s(e, "checkCanReturnFocus"),
          c = s(e, "returnFocus", "returnFocusOnDeactivate");
        null == r || r();
        var l = function () {
          YA(function () {
            (c && g(w(B.nodeFocusedBeforeActivation)), null == i || i());
          });
        };
        return c && a
          ? (a(w(B.nodeFocusedBeforeActivation)).then(l, l), this)
          : (l(), this);
      },
      pause: function (A) {
        return B.active
          ? ((B.manuallyPaused = !0), this._setPausedState(!0, A))
          : this;
      },
      unpause: function (A) {
        return B.active
          ? ((B.manuallyPaused = !1),
            n[n.length - 1] !== this ? this : this._setPausedState(!1, A))
          : this;
      },
      updateContainerElements: function (A) {
        var e = [].concat(A).filter(Boolean);
        return (
          (B.containers = e.map(function (A) {
            return "string" == typeof A ? r.querySelector(A) : A;
          })),
          o.isolateSubtrees &&
            (function (A) {
              (B.active && !B.paused && t._setSubtreeIsolation(!1),
                B.adjacentElements.clear(),
                B.alreadySilent.clear());
              var e,
                r = new Set(),
                n = new Set(),
                o = MA(A);
              try {
                for (o.s(); !(e = o.n()).done; ) {
                  var s = e.value;
                  r.add(s);
                  for (
                    var i =
                        "undefined" != typeof ShadowRoot &&
                        s.getRootNode() instanceof ShadowRoot,
                      a = s;
                    a;
                  ) {
                    r.add(a);
                    var c = a.parentElement,
                      l = [];
                    c
                      ? (l = c.children)
                      : !c &&
                        i &&
                        ((l = a.getRootNode().children),
                        (c = a.getRootNode().host),
                        (i =
                          "undefined" != typeof ShadowRoot &&
                          c.getRootNode() instanceof ShadowRoot));
                    var u,
                      g = MA(l);
                    try {
                      for (g.s(); !(u = g.n()).done; ) n.add(u.value);
                    } catch (A) {
                      g.e(A);
                    } finally {
                      g.f();
                    }
                    a = c;
                  }
                }
              } catch (A) {
                o.e(A);
              } finally {
                o.f();
              }
              (r.forEach(function (A) {
                n.delete(A);
              }),
                (B.adjacentElements = n));
            })(B.containers),
          B.active &&
            (l(), o.isolateSubtrees && !B.paused && t._setSubtreeIsolation(!0)),
          y(),
          this
        );
      },
    }),
    Object.defineProperties(t, {
      _isManuallyPaused: {
        value: function () {
          return B.manuallyPaused;
        },
      },
      _setPausedState: {
        value: function (A, e) {
          if (B.paused === A) return this;
          if (((B.paused = A), A)) {
            var r = s(e, "onPause"),
              n = s(e, "onPostPause");
            (null == r || r(),
              p(),
              y(),
              t._setSubtreeIsolation(!1),
              null == n || n());
          } else {
            var o = s(e, "onUnpause"),
              i = s(e, "onPostUnpause");
            (null == o || o(),
              t._setSubtreeIsolation(!0),
              l(),
              f(),
              y(),
              null == i || i());
          }
          return this;
        },
      },
      _setSubtreeIsolation: {
        value: function (A) {
          o.isolateSubtrees &&
            B.adjacentElements.forEach(function (e) {
              var t;
              A
                ? "aria-hidden" === o.isolateSubtrees
                  ? (("true" !== e.ariaHidden &&
                      "true" !==
                        (null === (t = e.getAttribute("aria-hidden")) ||
                        void 0 === t
                          ? void 0
                          : t.toLowerCase())) ||
                      B.alreadySilent.add(e),
                    e.setAttribute("aria-hidden", "true"))
                  : ((e.inert || e.hasAttribute("inert")) &&
                      B.alreadySilent.add(e),
                    e.setAttribute("inert", !0))
                : B.alreadySilent.has(e) ||
                  e.removeAttribute(
                    "aria-hidden" === o.isolateSubtrees
                      ? "aria-hidden"
                      : "inert",
                  );
            });
        },
      },
    }),
    t.updateContainerElements(A),
    t
  );
})(ee, { initialFocus: "#feedbackfin__radio--issue", allowOutsideClick: !0 });
function re(A) {
  var e,
    t = $A();
  (document.body.appendChild(ee),
    (ee.innerHTML =
      '<button id="feedbackfin__close" class="feedbackfin__icon-button" type="reset" aria-label="Close"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><form id="feedbackfin__form"><h1 id="feedbackfin__title">Send feedback</h1><div id="feedbackfin__radio-group" role="radiogroup" aria-label="Feedback type"><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--issue" name="feedbackType" value="issue" required><label for="feedbackfin__radio--issue" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x2757;</span>Issue</label><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--idea" name="feedbackType" value="idea" required><label for="feedbackfin__radio--idea" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x1F4A1;</span>Idea</label><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--other" name="feedbackType" value="other" required><label for="feedbackfin__radio--other" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x1F4AD;</span>Other</label></div><div id="feedbackfin__step2"><textarea id="feedbackfin__message" name="message" type="text" placeholder="I think…" required rows="2" aria-label="Message"></textarea><div id="feedbackfin__actions"><div id="feedbackfin__screenshot-preview"><button id="feedbackfin__screenshot-link" type="button" aria-label="View screenshot"><img id="feedbackfin__screenshot-img" alt="Screenshot preview"></button><button id="feedbackfin__screenshot-remove" type="button" aria-label="Remove screenshot"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><button id="feedbackfin__screenshot-btn" class="feedbackfin__icon-button" type="button" aria-label="Capture screenshot"><svg width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg><span id="feedbackfin__screenshot-badge">+</span></button><button id="feedbackfin__submit" class="feedbackfin__button" type="submit">Send feedback</button></div></div></form><div id="feedbackfin__success"><svg viewBox="0 0 18 18" width="3em" height="3em" role="presentation"><polyline stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2.705 8.29 7 12.585 15.295 4.29" fill="none" id="feedbackfin__check"/></svg>Thanks for your feedback!</div>'),
    (ee.style.display = "block"),
    (ee.style.opacity = "1"),
    "light" === t.theme || "dark" === t.theme
      ? ee.setAttribute("data-theme", t.theme)
      : ee.removeAttribute("data-theme"),
    ((A, e, t) => {
      const r = new Map(),
        n = { platform: gA, ...t },
        o = { ...n.platform, _c: r };
      return (async (A, e, t) => {
        const {
            placement: r = "bottom",
            strategy: n = "absolute",
            middleware: o = [],
            platform: B,
          } = t,
          s = o.filter(Boolean),
          i = await (null == B.isRTL ? void 0 : B.isRTL(e));
        let a = await B.getElementRects({
            reference: A,
            floating: e,
            strategy: n,
          }),
          { x: c, y: l } = H(a, r, i),
          u = r,
          g = {},
          w = 0;
        for (let t = 0; t < s.length; t++) {
          const { name: o, fn: Q } = s[t],
            {
              x: d,
              y: C,
              data: U,
              reset: F,
            } = await Q({
              x: c,
              y: l,
              initialPlacement: r,
              placement: u,
              strategy: n,
              middlewareData: g,
              rects: a,
              platform: B,
              elements: { reference: A, floating: e },
            });
          ((c = null != d ? d : c),
            (l = null != C ? C : l),
            (g = { ...g, [o]: { ...g[o], ...U } }),
            F &&
              w <= 50 &&
              (w++,
              "object" == typeof F &&
                (F.placement && (u = F.placement),
                F.rects &&
                  (a =
                    !0 === F.rects
                      ? await B.getElementRects({
                          reference: A,
                          floating: e,
                          strategy: n,
                        })
                      : F.rects),
                ({ x: c, y: l } = H(a, u, i))),
              (t = -1)));
        }
        return { x: c, y: l, placement: u, strategy: n, middlewareData: g };
      })(A, e, { ...n, platform: o });
    })((null == A ? void 0 : A.target) || document.body, ee, {
      placement: "bottom",
      middleware: [
        wA(),
        ((e = { crossAxis: !0, padding: 8 }),
        void 0 === e && (e = {}),
        {
          name: "shift",
          options: e,
          async fn(A) {
            const { x: t, y: r, placement: n } = A,
              {
                mainAxis: o = !0,
                crossAxis: B = !1,
                limiter: c = {
                  fn: (A) => {
                    let { x: e, y: t } = A;
                    return { x: e, y: t };
                  },
                },
                ...u
              } = i(e, A),
              g = { x: t, y: r },
              Q = await y(A, u),
              d = w(a(n)),
              C = l(d);
            let U = g[C],
              F = g[d];
            (o &&
              (U = s(
                U + Q["y" === C ? "top" : "left"],
                U,
                U - Q["y" === C ? "bottom" : "right"],
              )),
              B &&
                (F = s(
                  F + Q["y" === d ? "top" : "left"],
                  F,
                  F - Q["y" === d ? "bottom" : "right"],
                )));
            const h = c.fn({ ...A, [C]: U, [d]: F });
            return {
              ...h,
              data: { x: h.x - t, y: h.y - r, enabled: { [C]: o, [d]: B } },
            };
          },
        }),
      ],
      strategy: "fixed",
    }).then(function (A) {
      Object.assign(ee.style, { left: A.x + "px", top: A.y + "px" });
    }),
    te.activate(),
    document.getElementById("feedbackfin__close").addEventListener("click", oe),
    Array.from(ee.getElementsByClassName("feedbackfin__radio")).forEach(
      function (A) {
        A.addEventListener("change", Be);
      },
    ),
    document.getElementById("feedbackfin__form").addEventListener("submit", ce),
    document
      .getElementById("feedbackfin__screenshot-btn")
      .addEventListener("click", se),
    document
      .getElementById("feedbackfin__screenshot-remove")
      .addEventListener("click", ie),
    document
      .getElementById("feedbackfin__screenshot-link")
      .addEventListener("click", ae),
    document.addEventListener("click", ne));
}
function ne(A) {
  ee.hasAttribute("data-success") && !ee.contains(A.target) && oe();
}
function oe() {
  (te.deactivate(),
    document.removeEventListener("click", ne),
    (ee.innerHTML = ""),
    ee.remove(),
    ee.removeAttribute("data-feedback-type"),
    ee.removeAttribute("data-success"),
    ee.removeAttribute("data-has-screenshot"),
    (qA = null));
}
function Be(A) {
  var e,
    t = A.target.value;
  ee.setAttribute("data-feedback-type", t);
  var r = "I think…";
  ("issue" === t
    ? (r = "I'm having an issue with…")
    : "idea" === t && (r = "I'd like to see…"),
    null == (e = document.getElementById("feedbackfin__message")) ||
      e.setAttribute("placeholder", r));
}
function se() {
  var A = document.getElementById("feedbackfin__screenshot-btn");
  (A.setAttribute("disabled", ""),
    jA(document.body, {
      logging: !1,
      useCORS: !0,
      allowTaint: !0,
      onclone: function (A) {
        var e = A.getElementById("feedbackfin__container");
        e && (e.style.display = "none");
      },
    })
      .then(function (A) {
        ((qA = A.toDataURL("image/png")),
          (document.getElementById("feedbackfin__screenshot-img").src = qA),
          ee.setAttribute("data-has-screenshot", ""));
      })
      .catch(function (A) {
        console.error("Feedback Fin: Failed to capture screenshot", A);
      })
      .then(function () {
        A.removeAttribute("disabled");
      }));
}
function ie() {
  ((qA = null),
    ee.removeAttribute("data-has-screenshot"),
    (document.getElementById("feedbackfin__screenshot-img").src = ""));
}
function ae() {
  if (qA) {
    var A = window.open("");
    A &&
      A.document.write(
        '<html><head><title>Screenshot</title></head><body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;"><img src="' +
          qA +
          '" style="max-width:100%;max-height:100vh;"/></body></html>',
      );
  }
}
function ce(e) {
  e.preventDefault();
  var t = e.target,
    r = $A();
  if (!r.url)
    return (
      console.error("Feedback Fin: No URL provided"),
      void (
        r.disableErrorAlert || alert("Could not send feedback: No URL provided")
      )
    );
  var n = document.getElementById("feedbackfin__submit");
  (n.setAttribute("disabled", ""), (n.innerHTML = "Sending…"));
  var o = new Headers();
  o.append("Content-Type", "application/json");
  var B = A({}, r.user, {
    feedbackType: t.elements.feedbackType.value,
    message: t.elements.message.value,
    timestamp: Date.now(),
  });
  return (
    qA && (B.screenshot = qA),
    fetch(r.url, { method: "POST", headers: o, body: JSON.stringify(B) })
      .then(function () {
        (ee.setAttribute("data-success", ""),
          setTimeout(function () {
            ((ee.style.opacity = "0"), setTimeout(oe, 500));
          }, 2e3));
      })
      .catch(function (A) {
        (console.error("Feedback Fin:", A),
          r.disableErrorAlert ||
            alert("Could not send feedback: " + A.message));
      }),
    !1
  );
}
var le = {
  init: Ae,
  open: re,
  changeType: Be,
  close: oe,
  submit: ce,
  captureScreenshot: se,
  removeScreenshot: ie,
  viewScreenshot: ae,
  config: zA,
};
((window.feedbackfin = le), (module.exports = le));
//# sourceMappingURL=index.cjs.map
