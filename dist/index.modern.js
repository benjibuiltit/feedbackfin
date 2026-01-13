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
  i = { start: "end", end: "start" };
function s(A, r, n) {
  return t(A, e(r, n));
}
function B(A, e) {
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
function Q(A) {
  return g.has(a(A)) ? "y" : "x";
}
function w(A) {
  return l(Q(A));
}
function d(A) {
  return A.replace(/start|end/g, (A) => i[A]);
}
const C = ["left", "right"],
  F = ["right", "left"],
  U = ["top", "bottom"],
  f = ["bottom", "top"];
function h(A) {
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
function b(A, e, t) {
  let { reference: r, floating: n } = A;
  const o = Q(e),
    i = w(e),
    s = u(i),
    B = a(e),
    l = "y" === o,
    g = r.x + r.width / 2 - n.width / 2,
    d = r.y + r.height / 2 - n.height / 2,
    C = r[s] / 2 - n[s] / 2;
  let F;
  switch (B) {
    case "top":
      F = { x: g, y: r.y - n.height };
      break;
    case "bottom":
      F = { x: g, y: r.y + r.height };
      break;
    case "right":
      F = { x: r.x + r.width, y: d };
      break;
    case "left":
      F = { x: r.x - n.width, y: d };
      break;
    default:
      F = { x: r.x, y: r.y };
  }
  switch (c(e)) {
    case "start":
      F[i] -= C * (t && l ? -1 : 1);
      break;
    case "end":
      F[i] += C * (t && l ? -1 : 1);
  }
  return F;
}
async function m(A, e) {
  var t;
  void 0 === e && (e = {});
  const { x: r, y: n, platform: o, rects: i, elements: s, strategy: a } = A,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: l = "viewport",
      elementContext: u = "floating",
      altBoundary: g = !1,
      padding: Q = 0,
    } = B(e, A),
    w = (function (A) {
      return "number" != typeof A
        ? (function (A) {
            return { top: 0, right: 0, bottom: 0, left: 0, ...A };
          })(A)
        : { top: A, right: A, bottom: A, left: A };
    })(Q),
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
    F =
      "floating" === u
        ? { x: r, y: n, width: i.floating.width, height: i.floating.height }
        : i.reference,
    U = await (null == o.getOffsetParent
      ? void 0
      : o.getOffsetParent(s.floating)),
    f = ((await (null == o.isElement ? void 0 : o.isElement(U))) &&
      (await (null == o.getScale ? void 0 : o.getScale(U)))) || { x: 1, y: 1 },
    h = p(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: F,
            offsetParent: U,
            strategy: a,
          })
        : F,
    );
  return {
    top: (C.top - h.top + w.top) / f.y,
    bottom: (h.bottom - C.bottom + w.bottom) / f.y,
    left: (C.left - h.left + w.left) / f.x,
    right: (h.right - C.right + w.right) / f.x,
  };
}
function I() {
  return "undefined" != typeof window;
}
function H(A) {
  return v(A) ? (A.nodeName || "").toLowerCase() : "#document";
}
function y(A) {
  var e;
  return (
    (null == A || null == (e = A.ownerDocument) ? void 0 : e.defaultView) ||
    window
  );
}
function E(A) {
  var e;
  return null == (e = (v(A) ? A.ownerDocument : A.document) || window.document)
    ? void 0
    : e.documentElement;
}
function v(A) {
  return !!I() && (A instanceof Node || A instanceof y(A).Node);
}
function L(A) {
  return !!I() && (A instanceof Element || A instanceof y(A).Element);
}
function x(A) {
  return !!I() && (A instanceof HTMLElement || A instanceof y(A).HTMLElement);
}
function G(A) {
  return (
    !(!I() || "undefined" == typeof ShadowRoot) &&
    (A instanceof ShadowRoot || A instanceof y(A).ShadowRoot)
  );
}
const D = /*#__PURE__*/ new Set(["inline", "contents"]);
function K(A) {
  const { overflow: e, overflowX: t, overflowY: r, display: n } = O(A);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + t) && !D.has(n);
}
const Z = /*#__PURE__*/ new Set(["table", "td", "th"]);
function k(A) {
  return Z.has(H(A));
}
const N = [":popover-open", ":modal"];
function W(A) {
  return N.some((e) => {
    try {
      return A.matches(e);
    } catch (A) {
      return !1;
    }
  });
}
const V = ["transform", "translate", "scale", "rotate", "perspective"],
  R = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  S = ["paint", "layout", "strict", "content"];
function X(A) {
  const e = M(),
    t = L(A) ? O(A) : A;
  return (
    V.some((A) => !!t[A] && "none" !== t[A]) ||
    (!!t.containerType && "normal" !== t.containerType) ||
    (!e && !!t.backdropFilter && "none" !== t.backdropFilter) ||
    (!e && !!t.filter && "none" !== t.filter) ||
    R.some((A) => (t.willChange || "").includes(A)) ||
    S.some((A) => (t.contain || "").includes(A))
  );
}
function M() {
  return (
    !("undefined" == typeof CSS || !CSS.supports) &&
    CSS.supports("-webkit-backdrop-filter", "none")
  );
}
const Y = /*#__PURE__*/ new Set(["html", "body", "#document"]);
function T(A) {
  return Y.has(H(A));
}
function O(A) {
  return y(A).getComputedStyle(A);
}
function J(A) {
  return L(A)
    ? { scrollLeft: A.scrollLeft, scrollTop: A.scrollTop }
    : { scrollLeft: A.scrollX, scrollTop: A.scrollY };
}
function P(A) {
  if ("html" === H(A)) return A;
  const e = A.assignedSlot || A.parentNode || (G(A) && A.host) || E(A);
  return G(e) ? e.host : e;
}
function _(A) {
  const e = P(A);
  return T(e)
    ? A.ownerDocument
      ? A.ownerDocument.body
      : A.body
    : x(e) && K(e)
      ? e
      : _(e);
}
function j(A, e, t) {
  var r;
  (void 0 === e && (e = []), void 0 === t && (t = !0));
  const n = _(A),
    o = n === (null == (r = A.ownerDocument) ? void 0 : r.body),
    i = y(n);
  if (o) {
    const A = z(i);
    return e.concat(
      i,
      i.visualViewport || [],
      K(n) ? n : [],
      A && t ? j(A) : [],
    );
  }
  return e.concat(n, j(n, [], t));
}
function z(A) {
  return A.parent && Object.getPrototypeOf(A.parent) ? A.frameElement : null;
}
function q(A) {
  const e = O(A);
  let t = parseFloat(e.width) || 0,
    n = parseFloat(e.height) || 0;
  const o = x(A),
    i = o ? A.offsetWidth : t,
    s = o ? A.offsetHeight : n,
    B = r(t) !== i || r(n) !== s;
  return (B && ((t = i), (n = s)), { width: t, height: n, $: B });
}
function $(A) {
  return L(A) ? A : A.contextElement;
}
function AA(A) {
  const e = $(A);
  if (!x(e)) return n(1);
  const t = e.getBoundingClientRect(),
    { width: o, height: i, $: s } = q(e);
  let B = (s ? r(t.width) : t.width) / o,
    a = (s ? r(t.height) : t.height) / i;
  return (
    (B && Number.isFinite(B)) || (B = 1),
    (a && Number.isFinite(a)) || (a = 1),
    { x: B, y: a }
  );
}
const eA = /*#__PURE__*/ n(0);
function tA(A) {
  const e = y(A);
  return M() && e.visualViewport
    ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
    : eA;
}
function rA(A, e, t, r) {
  (void 0 === e && (e = !1), void 0 === t && (t = !1));
  const o = A.getBoundingClientRect(),
    i = $(A);
  let s = n(1);
  e && (r ? L(r) && (s = AA(r)) : (s = AA(A)));
  const B = (function (A, e, t) {
    return (void 0 === e && (e = !1), !(!t || (e && t !== y(A))) && e);
  })(i, t, r)
    ? tA(i)
    : n(0);
  let a = (o.left + B.x) / s.x,
    c = (o.top + B.y) / s.y,
    l = o.width / s.x,
    u = o.height / s.y;
  if (i) {
    const A = y(i),
      e = r && L(r) ? y(r) : r;
    let t = A,
      n = z(t);
    for (; n && r && e !== t; ) {
      const A = AA(n),
        e = n.getBoundingClientRect(),
        r = O(n),
        o = e.left + (n.clientLeft + parseFloat(r.paddingLeft)) * A.x,
        i = e.top + (n.clientTop + parseFloat(r.paddingTop)) * A.y;
      ((a *= A.x),
        (c *= A.y),
        (l *= A.x),
        (u *= A.y),
        (a += o),
        (c += i),
        (t = y(n)),
        (n = z(t)));
    }
  }
  return p({ width: l, height: u, x: a, y: c });
}
function nA(A, e) {
  const t = J(A).scrollLeft;
  return e ? e.left + t : rA(E(A)).left + t;
}
function oA(A, e) {
  const t = A.getBoundingClientRect();
  return { x: t.left + e.scrollLeft - nA(A, t), y: t.top + e.scrollTop };
}
const iA = /*#__PURE__*/ new Set(["absolute", "fixed"]);
function sA(A, e, r) {
  let o;
  if ("viewport" === e)
    o = (function (A, e) {
      const t = y(A),
        r = E(A),
        n = t.visualViewport;
      let o = r.clientWidth,
        i = r.clientHeight,
        s = 0,
        B = 0;
      if (n) {
        ((o = n.width), (i = n.height));
        const A = M();
        (!A || (A && "fixed" === e)) && ((s = n.offsetLeft), (B = n.offsetTop));
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
          i = Math.abs(r.clientWidth - e.clientWidth - n);
        i <= 25 && (o -= i);
      } else a <= 25 && (o += a);
      return { width: o, height: i, x: s, y: B };
    })(A, r);
  else if ("document" === e)
    o = (function (A) {
      const e = E(A),
        r = J(A),
        n = A.ownerDocument.body,
        o = t(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
        i = t(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
      let s = -r.scrollLeft + nA(A);
      const B = -r.scrollTop;
      return (
        "rtl" === O(n).direction && (s += t(e.clientWidth, n.clientWidth) - o),
        { width: o, height: i, x: s, y: B }
      );
    })(E(A));
  else if (L(e))
    o = (function (A, e) {
      const t = rA(A, !0, "fixed" === e),
        r = t.top + A.clientTop,
        o = t.left + A.clientLeft,
        i = x(A) ? AA(A) : n(1);
      return {
        width: A.clientWidth * i.x,
        height: A.clientHeight * i.y,
        x: o * i.x,
        y: r * i.y,
      };
    })(e, r);
  else {
    const t = tA(A);
    o = { x: e.x - t.x, y: e.y - t.y, width: e.width, height: e.height };
  }
  return p(o);
}
function BA(A, e) {
  const t = P(A);
  return !(t === e || !L(t) || T(t)) && ("fixed" === O(t).position || BA(t, e));
}
function aA(A, e, t) {
  const r = x(e),
    o = E(e),
    i = "fixed" === t,
    s = rA(A, !0, i, e);
  let B = { scrollLeft: 0, scrollTop: 0 };
  const a = n(0);
  function c() {
    a.x = nA(o);
  }
  if (r || (!r && !i))
    if ((("body" !== H(e) || K(o)) && (B = J(e)), r)) {
      const A = rA(e, !0, i, e);
      ((a.x = A.x + e.clientLeft), (a.y = A.y + e.clientTop));
    } else o && c();
  i && !r && o && c();
  const l = !o || r || i ? n(0) : oA(o, B);
  return {
    x: s.left + B.scrollLeft - a.x - l.x,
    y: s.top + B.scrollTop - a.y - l.y,
    width: s.width,
    height: s.height,
  };
}
function cA(A) {
  return "static" === O(A).position;
}
function lA(A, e) {
  if (!x(A) || "fixed" === O(A).position) return null;
  if (e) return e(A);
  let t = A.offsetParent;
  return (E(A) === t && (t = t.ownerDocument.body), t);
}
function uA(A, e) {
  const t = y(A);
  if (W(A)) return t;
  if (!x(A)) {
    let e = P(A);
    for (; e && !T(e); ) {
      if (L(e) && !cA(e)) return e;
      e = P(e);
    }
    return t;
  }
  let r = lA(A, e);
  for (; r && k(r) && cA(r); ) r = lA(r, e);
  return r && T(r) && cA(r) && !X(r)
    ? t
    : r ||
        (function (A) {
          let e = P(A);
          for (; x(e) && !T(e); ) {
            if (X(e)) return e;
            if (W(e)) return null;
            e = P(e);
          }
          return null;
        })(A) ||
        t;
}
const gA = {
    convertOffsetParentRelativeRectToViewportRelativeRect: function (A) {
      let { elements: e, rect: t, offsetParent: r, strategy: o } = A;
      const i = "fixed" === o,
        s = E(r),
        B = !!e && W(e.floating);
      if (r === s || (B && i)) return t;
      let a = { scrollLeft: 0, scrollTop: 0 },
        c = n(1);
      const l = n(0),
        u = x(r);
      if (
        (u || (!u && !i)) &&
        (("body" !== H(r) || K(s)) && (a = J(r)), x(r))
      ) {
        const A = rA(r);
        ((c = AA(r)), (l.x = A.x + r.clientLeft), (l.y = A.y + r.clientTop));
      }
      const g = !s || u || i ? n(0) : oA(s, a);
      return {
        width: t.width * c.x,
        height: t.height * c.y,
        x: t.x * c.x - a.scrollLeft * c.x + l.x + g.x,
        y: t.y * c.y - a.scrollTop * c.y + l.y + g.y,
      };
    },
    getDocumentElement: E,
    getClippingRect: function (A) {
      let { element: r, boundary: n, rootBoundary: o, strategy: i } = A;
      const s =
          "clippingAncestors" === n
            ? W(r)
              ? []
              : (function (A, e) {
                  const t = e.get(A);
                  if (t) return t;
                  let r = j(A, [], !1).filter((A) => L(A) && "body" !== H(A)),
                    n = null;
                  const o = "fixed" === O(A).position;
                  let i = o ? P(A) : A;
                  for (; L(i) && !T(i); ) {
                    const e = O(i),
                      t = X(i);
                    (t || "fixed" !== e.position || (n = null),
                      (
                        o
                          ? !t && !n
                          : (!t &&
                              "static" === e.position &&
                              n &&
                              iA.has(n.position)) ||
                            (K(i) && !t && BA(A, i))
                      )
                        ? (r = r.filter((A) => A !== i))
                        : (n = e),
                      (i = P(i)));
                  }
                  return (e.set(A, r), r);
                })(r, this._c)
            : [].concat(n),
        B = [...s, o],
        a = B.reduce(
          (A, n) => {
            const o = sA(r, n, i);
            return (
              (A.top = t(o.top, A.top)),
              (A.right = e(o.right, A.right)),
              (A.bottom = e(o.bottom, A.bottom)),
              (A.left = t(o.left, A.left)),
              A
            );
          },
          sA(r, B[0], i),
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
      const { width: e, height: t } = q(A);
      return { width: e, height: t };
    },
    getScale: AA,
    isElement: L,
    isRTL: function (A) {
      return "rtl" === O(A).direction;
    },
  },
  QA = function (A) {
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
              rects: i,
              initialPlacement: s,
              platform: l,
              elements: g,
            } = e,
            {
              mainAxis: p = !0,
              crossAxis: b = !0,
              fallbackPlacements: I,
              fallbackStrategy: H = "bestFit",
              fallbackAxisSideDirection: y = "none",
              flipAlignment: E = !0,
              ...v
            } = B(A, e);
          if (null != (t = o.arrow) && t.alignmentOffset) return {};
          const L = a(n),
            x = Q(s),
            G = a(s) === s,
            D = await (null == l.isRTL ? void 0 : l.isRTL(g.floating)),
            K =
              I ||
              (G || !E
                ? [h(s)]
                : (function (A) {
                    const e = h(A);
                    return [d(A), e, d(e)];
                  })(s)),
            Z = "none" !== y;
          !I &&
            Z &&
            K.push(
              ...(function (A, e, t, r) {
                const n = c(A);
                let o = (function (A, e, t) {
                  switch (A) {
                    case "top":
                    case "bottom":
                      return t ? (e ? F : C) : e ? C : F;
                    case "left":
                    case "right":
                      return e ? U : f;
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
              })(s, E, y, D),
            );
          const k = [s, ...K],
            N = await m(e, v),
            W = [];
          let V = (null == (r = o.flip) ? void 0 : r.overflows) || [];
          if ((p && W.push(N[L]), b)) {
            const A = (function (A, e, t) {
              void 0 === t && (t = !1);
              const r = c(A),
                n = w(A),
                o = u(n);
              let i =
                "x" === n
                  ? r === (t ? "end" : "start")
                    ? "right"
                    : "left"
                  : "start" === r
                    ? "bottom"
                    : "top";
              return (e.reference[o] > e.floating[o] && (i = h(i)), [i, h(i)]);
            })(n, i, D);
            W.push(N[A[0]], N[A[1]]);
          }
          if (
            ((V = [...V, { placement: n, overflows: W }]),
            !W.every((A) => A <= 0))
          ) {
            var R, S;
            const A = ((null == (R = o.flip) ? void 0 : R.index) || 0) + 1,
              e = k[A];
            if (
              e &&
              ("alignment" !== b ||
                x === Q(e) ||
                V.every((A) => Q(A.placement) !== x || A.overflows[0] > 0))
            )
              return {
                data: { index: A, overflows: V },
                reset: { placement: e },
              };
            let t =
              null ==
              (S = V.filter((A) => A.overflows[0] <= 0).sort(
                (A, e) => A.overflows[1] - e.overflows[1],
              )[0])
                ? void 0
                : S.placement;
            if (!t)
              switch (H) {
                case "bestFit": {
                  var X;
                  const A =
                    null ==
                    (X = V.filter((A) => {
                      if (Z) {
                        const e = Q(A.placement);
                        return e === x || "y" === e;
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
                      : X[0];
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
var wA = [
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
  dA = /* #__PURE__ */ wA.join(","),
  CA = "undefined" == typeof Element,
  FA = CA
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  UA =
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
  fA = function (A, e) {
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
          : fA(A.parentNode)))
    );
  },
  hA = function (A, e, t) {
    if (fA(A)) return [];
    var r = Array.prototype.slice.apply(A.querySelectorAll(dA));
    return (e && FA.call(A, dA) && r.unshift(A), r.filter(t));
  },
  pA = function (A, e, t) {
    for (var r = [], n = Array.from(A); n.length; ) {
      var o = n.shift();
      if (!fA(o, !1))
        if ("SLOT" === o.tagName) {
          var i = o.assignedElements(),
            s = pA(i.length ? i : o.children, !0, t);
          t.flatten
            ? r.push.apply(r, s)
            : r.push({ scopeParent: o, candidates: s });
        } else {
          FA.call(o, dA) && t.filter(o) && (e || !A.includes(o)) && r.push(o);
          var B =
              o.shadowRoot ||
              ("function" == typeof t.getShadowRoot && t.getShadowRoot(o)),
            a = !fA(B, !1) && (!t.shadowRootFilter || t.shadowRootFilter(o));
          if (B && a) {
            var c = pA(!0 === B ? o.children : B.children, !0, t);
            t.flatten
              ? r.push.apply(r, c)
              : r.push({ scopeParent: o, candidates: c });
          } else n.unshift.apply(n, o.children);
        }
    }
    return r;
  },
  bA = function (A) {
    return !isNaN(parseInt(A.getAttribute("tabindex"), 10));
  },
  mA = function (A) {
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
      !bA(A)
      ? 0
      : A.tabIndex;
  },
  IA = function (A, e) {
    return A.tabIndex === e.tabIndex
      ? A.documentOrder - e.documentOrder
      : A.tabIndex - e.tabIndex;
  },
  HA = function (A) {
    return "INPUT" === A.tagName;
  },
  yA = function (A) {
    var e = A.getBoundingClientRect();
    return 0 === e.width && 0 === e.height;
  },
  EA = function (A, e) {
    return !(
      e.disabled ||
      (function (A) {
        return HA(A) && "hidden" === A.type;
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
        var n = FA.call(A, "details>summary:first-of-type");
        if (FA.call(n ? A.parentElement : A, "details:not([open]) *"))
          return !0;
        if (t && "full" !== t && "full-native" !== t && "legacy-full" !== t) {
          if ("non-zero-area" === t) return yA(A);
        } else {
          if ("function" == typeof r) {
            for (var o = A; A; ) {
              var i = A.parentElement,
                s = UA(A);
              if (i && !i.shadowRoot && !0 === r(i)) return yA(A);
              A = A.assignedSlot
                ? A.assignedSlot
                : i || s === A.ownerDocument
                  ? i
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
                o = A && UA(A),
                i = null === (e = o) || void 0 === e ? void 0 : e.host,
                s = !1;
              if (o && o !== A)
                for (
                  s = !!(
                    (null !== (t = i) &&
                      void 0 !== t &&
                      null !== (r = t.ownerDocument) &&
                      void 0 !== r &&
                      r.contains(i)) ||
                    (null != A &&
                      null !== (n = A.ownerDocument) &&
                      void 0 !== n &&
                      n.contains(A))
                  );
                  !s && i;
                ) {
                  var B, a, c;
                  s = !(
                    null ===
                      (a = i =
                        null === (B = o = UA(i)) || void 0 === B
                          ? void 0
                          : B.host) ||
                    void 0 === a ||
                    null === (c = a.ownerDocument) ||
                    void 0 === c ||
                    !c.contains(i)
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
                  return !!FA.call(e, "fieldset[disabled] *") || !r.contains(A);
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
            return HA(A) && "radio" === A.type;
          })(A) &&
          !(function (A) {
            if (!A.name) return !0;
            var e,
              t = A.form || UA(A),
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
      mA(e) < 0 ||
      !EA(A, e)
    );
  },
  LA = function (A) {
    var e = parseInt(A.getAttribute("tabindex"), 10);
    return !!(isNaN(e) || e >= 0);
  },
  xA = function (A) {
    var e = [],
      t = [];
    return (
      A.forEach(function (A, r) {
        var n = !!A.scopeParent,
          o = n ? A.scopeParent : A,
          i = (function (A, e) {
            var t = mA(A);
            return t < 0 && e && !bA(A) ? 0 : t;
          })(o, n),
          s = n ? xA(A.candidates) : o;
        0 === i
          ? n
            ? e.push.apply(e, s)
            : e.push(o)
          : t.push({
              documentOrder: r,
              tabIndex: i,
              item: A,
              isScope: n,
              content: s,
            });
      }),
      t
        .sort(IA)
        .reduce(function (A, e) {
          return (
            e.isScope ? A.push.apply(A, e.content) : A.push(e.content),
            A
          );
        }, [])
        .concat(e)
    );
  },
  GA = function (A, e) {
    if (((e = e || {}), !A)) throw new Error("No node provided");
    return !1 !== FA.call(A, dA) && vA(e, A);
  },
  DA = /* #__PURE__ */ wA
    .concat("iframe:not([inert]):not([inert] *)")
    .join(","),
  KA = function (A, e) {
    if (((e = e || {}), !A)) throw new Error("No node provided");
    return !1 !== FA.call(A, DA) && EA(e, A);
  };
function ZA(A, e) {
  (null == e || e > A.length) && (e = A.length);
  for (var t = 0, r = Array(e); t < e; t++) r[t] = A[t];
  return r;
}
function kA(A, e) {
  var t =
    ("undefined" != typeof Symbol && A[Symbol.iterator]) || A["@@iterator"];
  if (!t) {
    if (Array.isArray(A) || (t = SA(A)) || e) {
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
    i = !0,
    s = !1;
  return {
    s: function () {
      t = t.call(A);
    },
    n: function () {
      var A = t.next();
      return ((i = A.done), A);
    },
    e: function (A) {
      ((s = !0), (o = A));
    },
    f: function () {
      try {
        i || null == t.return || t.return();
      } finally {
        if (s) throw o;
      }
    },
  };
}
function NA(A, e, t) {
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
function WA(A, e) {
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
function VA(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? WA(Object(t), !0).forEach(function (e) {
          NA(A, e, t[e]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t))
        : WA(Object(t)).forEach(function (e) {
            Object.defineProperty(A, e, Object.getOwnPropertyDescriptor(t, e));
          });
  }
  return A;
}
function RA(A) {
  return (
    (function (A) {
      if (Array.isArray(A)) return ZA(A);
    })(A) ||
    (function (A) {
      if (
        ("undefined" != typeof Symbol && null != A[Symbol.iterator]) ||
        null != A["@@iterator"]
      )
        return Array.from(A);
    })(A) ||
    SA(A) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      );
    })()
  );
}
function SA(A, e) {
  if (A) {
    if ("string" == typeof A) return ZA(A, e);
    var t = {}.toString.call(A).slice(8, -1);
    return (
      "Object" === t && A.constructor && (t = A.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(A)
        : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? ZA(A, e)
          : void 0
    );
  }
}
var XA = {
    getActiveTrap: function (A) {
      return (null == A ? void 0 : A.length) > 0 ? A[A.length - 1] : null;
    },
    activateTrap: function (A, e) {
      e !== XA.getActiveTrap(A) && XA.pauseTrap(A);
      var t = A.indexOf(e);
      (-1 === t || A.splice(t, 1), A.push(e));
    },
    deactivateTrap: function (A, e) {
      var t = A.indexOf(e);
      (-1 !== t && A.splice(t, 1), XA.unpauseTrap(A));
    },
    pauseTrap: function (A) {
      var e = XA.getActiveTrap(A);
      null == e || e._setPausedState(!0);
    },
    unpauseTrap: function (A) {
      var e = XA.getActiveTrap(A);
      e && !e._isManuallyPaused() && e._setPausedState(!1);
    },
  },
  MA = function (A) {
    return (
      "Tab" === (null == A ? void 0 : A.key) ||
      9 === (null == A ? void 0 : A.keyCode)
    );
  },
  YA = function (A) {
    return MA(A) && !A.shiftKey;
  },
  TA = function (A) {
    return MA(A) && A.shiftKey;
  },
  OA = function (A) {
    return setTimeout(A, 0);
  },
  JA = function (A) {
    for (
      var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1;
      r < e;
      r++
    )
      t[r - 1] = arguments[r];
    return "function" == typeof A ? A.apply(void 0, t) : A;
  },
  PA = function (A) {
    return A.target.shadowRoot && "function" == typeof A.composedPath
      ? A.composedPath()[0]
      : A.target;
  },
  _A = [];
"undefined" != typeof globalThis
  ? globalThis
  : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
      ? global
      : "undefined" != typeof self && self;
var jA,
  zA,
  qA =
    ((jA = function (A, e) {
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
                    Object.prototype.hasOwnProperty.call(e, n) && (A[n] = e[n]);
                return A;
              }),
            t.apply(this, arguments)
          );
        };
        function r(A, e, t, r) {
          return new (t || (t = Promise))(function (n, o) {
            function i(A) {
              try {
                B(r.next(A));
              } catch (A) {
                o(A);
              }
            }
            function s(A) {
              try {
                B(r.throw(A));
              } catch (A) {
                o(A);
              }
            }
            function B(A) {
              var e;
              A.done
                ? n(A.value)
                : ((e = A.value),
                  e instanceof t
                    ? e
                    : new t(function (A) {
                        A(e);
                      })).then(i, s);
            }
            B((r = r.apply(A, e || [])).next());
          });
        }
        function n(A, e) {
          var t,
            r,
            n,
            o,
            i = {
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
                for (; i; )
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
                        return (i.label++, { value: o[1], done: !1 });
                      case 5:
                        (i.label++, (r = o[1]), (o = [0]));
                        continue;
                      case 7:
                        ((o = i.ops.pop()), i.trys.pop());
                        continue;
                      default:
                        if (
                          !(
                            (n = (n = i.trys).length > 0 && n[n.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          i = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!n || (o[1] > n[0] && o[1] < n[3]))
                        ) {
                          i.label = o[1];
                          break;
                        }
                        if (6 === o[0] && i.label < n[1]) {
                          ((i.label = n[1]), (n = o));
                          break;
                        }
                        if (n && i.label < n[2]) {
                          ((i.label = n[2]), i.ops.push(o));
                          break;
                        }
                        (n[2] && i.ops.pop(), i.trys.pop());
                        continue;
                    }
                    o = e.call(A, i);
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
                (r || (r = Array.prototype.slice.call(e, 0, n)), (r[n] = e[n]));
          return A.concat(r || e);
        }
        for (
          var i = (function () {
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
              return i.fromClientRect(A, e.getBoundingClientRect());
            },
            B = function (A) {
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
                var i = A[n];
                (i <= 65535
                  ? r.push(i)
                  : r.push(55296 + ((i -= 65536) >> 10), (i % 1024) + 56320),
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
            Q = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            w = 0;
          w < g.length;
          w++
        )
          Q[g.charCodeAt(w)] = w;
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
            F =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            U = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            f = 0;
          f < F.length;
          f++
        )
          U[F.charCodeAt(f)] = f;
        var h,
          p,
          b,
          m,
          I,
          H,
          y,
          E,
          v = 10,
          L = 13,
          x = 15,
          G = 17,
          D = 18,
          K = 19,
          Z = 20,
          k = 21,
          N = 22,
          W = 24,
          V = 25,
          R = 26,
          S = 27,
          X = 28,
          M = 30,
          Y = 32,
          T = 33,
          O = 34,
          J = 35,
          P = 37,
          _ = 38,
          j = 39,
          z = 40,
          q = 42,
          $ = [9001, 65288],
          AA = "×",
          eA = "÷",
          tA =
            ((m = (function (A) {
              var e,
                t,
                r,
                n,
                o,
                i = 0.75 * A.length,
                s = A.length,
                B = 0;
              "=" === A[A.length - 1] && (i--, "=" === A[A.length - 2] && i--);
              var a =
                  "undefined" != typeof ArrayBuffer &&
                  "undefined" != typeof Uint8Array &&
                  void 0 !== Uint8Array.prototype.slice
                    ? new ArrayBuffer(i)
                    : new Array(i),
                c = Array.isArray(a) ? a : new Uint8Array(a);
              for (e = 0; e < s; e += 4)
                ((t = Q[A.charCodeAt(e)]),
                  (r = Q[A.charCodeAt(e + 1)]),
                  (n = Q[A.charCodeAt(e + 2)]),
                  (o = Q[A.charCodeAt(e + 3)]),
                  (c[B++] = (t << 2) | (r >> 4)),
                  (c[B++] = ((15 & r) << 4) | (n >> 2)),
                  (c[B++] = ((3 & n) << 6) | (63 & o)));
              return a;
            })(
              "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",
            )),
            (I = Array.isArray(m)
              ? (function (A) {
                  for (var e = A.length, t = [], r = 0; r < e; r += 4)
                    t.push(
                      (A[r + 3] << 24) |
                        (A[r + 2] << 16) |
                        (A[r + 1] << 8) |
                        A[r],
                    );
                  return t;
                })(m)
              : new Uint32Array(m)),
            (H = Array.isArray(m)
              ? (function (A) {
                  for (var e = A.length, t = [], r = 0; r < e; r += 2)
                    t.push((A[r + 1] << 8) | A[r]);
                  return t;
                })(m)
              : new Uint16Array(m)),
            (y = d(H, 12, I[4] / 2)),
            (E =
              2 === I[5]
                ? d(H, (24 + I[4]) / 2)
                : ((h = I),
                  (p = Math.ceil((24 + I[4]) / 4)),
                  h.slice
                    ? h.slice(p, b)
                    : new Uint32Array(Array.prototype.slice.call(h, p, b)))),
            new C(I[0], I[1], I[2], I[3], y, E)),
          rA = [M, 36],
          nA = [1, 2, 3, 5],
          oA = [v, 8],
          iA = [S, R],
          sA = nA.concat(oA),
          BA = [_, j, z, O, J],
          aA = [x, L],
          cA = function (A, e, t, r) {
            var n = r[t];
            if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
              for (var o = t; o <= r.length; ) {
                if ((B = r[++o]) === e) return !0;
                if (B !== v) break;
              }
            if (n === v)
              for (o = t; o > 0; ) {
                var i = r[--o];
                if (Array.isArray(A) ? -1 !== A.indexOf(i) : A === i)
                  for (var s = t; s <= r.length; ) {
                    var B;
                    if ((B = r[++s]) === e) return !0;
                    if (B !== v) break;
                  }
                if (i !== v) break;
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
            var i = o - 1,
              s = o + 1,
              B = e[o],
              a = i >= 0 ? e[i] : 0,
              c = e[s];
            if (2 === B && 3 === c) return AA;
            if (-1 !== nA.indexOf(B)) return "!";
            if (-1 !== nA.indexOf(c)) return AA;
            if (-1 !== oA.indexOf(c)) return AA;
            if (8 === lA(o, e)) return eA;
            if (11 === tA.get(A[o])) return AA;
            if ((B === Y || B === T) && 11 === tA.get(A[s])) return AA;
            if (7 === B || 7 === c) return AA;
            if (9 === B) return AA;
            if (-1 === [v, L, x].indexOf(B) && 9 === c) return AA;
            if (-1 !== [G, D, K, W, X].indexOf(c)) return AA;
            if (lA(o, e) === N) return AA;
            if (cA(23, N, o, e)) return AA;
            if (cA([G, D], k, o, e)) return AA;
            if (cA(12, 12, o, e)) return AA;
            if (B === v) return eA;
            if (23 === B || 23 === c) return AA;
            if (16 === c || 16 === B) return eA;
            if (-1 !== [L, x, k].indexOf(c) || 14 === B) return AA;
            if (36 === a && -1 !== aA.indexOf(B)) return AA;
            if (B === X && 36 === c) return AA;
            if (c === Z) return AA;
            if (
              (-1 !== rA.indexOf(c) && B === V) ||
              (-1 !== rA.indexOf(B) && c === V)
            )
              return AA;
            if (
              (B === S && -1 !== [P, Y, T].indexOf(c)) ||
              (-1 !== [P, Y, T].indexOf(B) && c === R)
            )
              return AA;
            if (
              (-1 !== rA.indexOf(B) && -1 !== iA.indexOf(c)) ||
              (-1 !== iA.indexOf(B) && -1 !== rA.indexOf(c))
            )
              return AA;
            if (
              (-1 !== [S, R].indexOf(B) &&
                (c === V || (-1 !== [N, x].indexOf(c) && e[s + 1] === V))) ||
              (-1 !== [N, x].indexOf(B) && c === V) ||
              (B === V && -1 !== [V, X, W].indexOf(c))
            )
              return AA;
            if (-1 !== [V, X, W, G, D].indexOf(c))
              for (var l = o; l >= 0; ) {
                if ((u = e[l]) === V) return AA;
                if (-1 === [X, W].indexOf(u)) break;
                l--;
              }
            if (-1 !== [S, R].indexOf(c))
              for (l = -1 !== [G, D].indexOf(B) ? i : o; l >= 0; ) {
                var u;
                if ((u = e[l]) === V) return AA;
                if (-1 === [X, W].indexOf(u)) break;
                l--;
              }
            if (
              (_ === B && -1 !== [_, j, O, J].indexOf(c)) ||
              (-1 !== [j, O].indexOf(B) && -1 !== [j, z].indexOf(c)) ||
              (-1 !== [z, J].indexOf(B) && c === z)
            )
              return AA;
            if (
              (-1 !== BA.indexOf(B) && -1 !== [Z, R].indexOf(c)) ||
              (-1 !== BA.indexOf(c) && B === S)
            )
              return AA;
            if (-1 !== rA.indexOf(B) && -1 !== rA.indexOf(c)) return AA;
            if (B === W && -1 !== rA.indexOf(c)) return AA;
            if (
              (-1 !== rA.concat(V).indexOf(B) &&
                c === N &&
                -1 === $.indexOf(A[s])) ||
              (-1 !== rA.concat(V).indexOf(c) && B === D)
            )
              return AA;
            if (41 === B && 41 === c) {
              for (var g = t[o], Q = 1; g > 0 && 41 === e[--g]; ) Q++;
              if (Q % 2 != 0) return AA;
            }
            return B === Y && c === T ? AA : eA;
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
          QA = 45,
          wA = 43,
          dA = -1,
          CA = function (A) {
            return A >= 48 && A <= 57;
          },
          FA = function (A) {
            return CA(A) || (A >= 65 && A <= 70) || (A >= 97 && A <= 102);
          },
          UA = function (A) {
            return 10 === A || 9 === A || 32 === A;
          },
          fA = function (A) {
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
          hA = function (A) {
            return fA(A) || CA(A) || A === QA;
          },
          pA = function (A) {
            return (
              (A >= 0 && A <= 8) ||
              11 === A ||
              (A >= 14 && A <= 31) ||
              127 === A
            );
          },
          bA = function (A, e) {
            return 92 === A && 10 !== e;
          },
          mA = function (A, e, t) {
            return A === QA
              ? fA(e) || bA(e, t)
              : !!fA(A) || !(92 !== A || !bA(A, e));
          },
          IA = function (A, e, t) {
            return A === wA || A === QA
              ? !!CA(e) || (46 === e && CA(t))
              : CA(46 === A ? e : A);
          },
          HA = function (A) {
            var e = 0,
              t = 1;
            (A[e] !== wA && A[e] !== QA) || (A[e] === QA && (t = -1), e++);
            for (var r = []; CA(A[e]); ) r.push(A[e++]);
            var n = r.length ? parseInt(a.apply(void 0, r), 10) : 0;
            46 === A[e] && e++;
            for (var o = []; CA(A[e]); ) o.push(A[e++]);
            var i = o.length,
              s = i ? parseInt(a.apply(void 0, o), 10) : 0;
            (69 !== A[e] && 101 !== A[e]) || e++;
            var B = 1;
            (A[e] !== wA && A[e] !== QA) || (A[e] === QA && (B = -1), e++);
            for (var c = []; CA(A[e]); ) c.push(A[e++]);
            var l = c.length ? parseInt(a.apply(void 0, c), 10) : 0;
            return t * (n + s * Math.pow(10, -i)) * Math.pow(10, B * l);
          },
          yA = { type: 2 },
          EA = { type: 3 },
          vA = { type: 4 },
          LA = { type: 13 },
          xA = { type: 8 },
          GA = { type: 21 },
          DA = { type: 9 },
          KA = { type: 10 },
          ZA = { type: 11 },
          kA = { type: 12 },
          NA = { type: 14 },
          WA = { type: 23 },
          VA = { type: 1 },
          RA = { type: 25 },
          SA = { type: 24 },
          XA = { type: 26 },
          MA = { type: 27 },
          YA = { type: 28 },
          TA = { type: 29 },
          OA = { type: 31 },
          JA = { type: 32 },
          PA = (function () {
            function A() {
              this._value = [];
            }
            return (
              (A.prototype.write = function (A) {
                this._value = this._value.concat(B(A));
              }),
              (A.prototype.read = function () {
                for (var A = [], e = this.consumeToken(); e !== JA; )
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
                    if (hA(e) || bA(t, r)) {
                      var n = mA(e, t, r) ? 2 : 1;
                      return { type: 5, value: this.consumeName(), flags: n };
                    }
                    break;
                  case 36:
                    if (61 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), LA);
                    break;
                  case 39:
                    return this.consumeStringToken(39);
                  case 40:
                    return yA;
                  case 41:
                    return EA;
                  case 42:
                    if (61 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), NA);
                    break;
                  case wA:
                    if (IA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                      return (
                        this.reconsumeCodePoint(A),
                        this.consumeNumericToken()
                      );
                    break;
                  case 44:
                    return vA;
                  case QA:
                    var o = A,
                      i = this.peekCodePoint(0),
                      s = this.peekCodePoint(1);
                    if (IA(o, i, s))
                      return (
                        this.reconsumeCodePoint(A),
                        this.consumeNumericToken()
                      );
                    if (mA(o, i, s))
                      return (
                        this.reconsumeCodePoint(A),
                        this.consumeIdentLikeToken()
                      );
                    if (i === QA && 62 === s)
                      return (
                        this.consumeCodePoint(),
                        this.consumeCodePoint(),
                        SA
                      );
                    break;
                  case 46:
                    if (IA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                      return (
                        this.reconsumeCodePoint(A),
                        this.consumeNumericToken()
                      );
                    break;
                  case 47:
                    if (42 === this.peekCodePoint(0))
                      for (this.consumeCodePoint(); ; ) {
                        var B = this.consumeCodePoint();
                        if (42 === B && 47 === (B = this.consumeCodePoint()))
                          return this.consumeToken();
                        if (B === dA) return this.consumeToken();
                      }
                    break;
                  case 58:
                    return XA;
                  case 59:
                    return MA;
                  case 60:
                    if (
                      33 === this.peekCodePoint(0) &&
                      this.peekCodePoint(1) === QA &&
                      this.peekCodePoint(2) === QA
                    )
                      return (
                        this.consumeCodePoint(),
                        this.consumeCodePoint(),
                        RA
                      );
                    break;
                  case 64:
                    var c = this.peekCodePoint(0),
                      l = this.peekCodePoint(1),
                      u = this.peekCodePoint(2);
                    if (mA(c, l, u))
                      return { type: 7, value: this.consumeName() };
                    break;
                  case 91:
                    return YA;
                  case 92:
                    if (bA(A, this.peekCodePoint(0)))
                      return (
                        this.reconsumeCodePoint(A),
                        this.consumeIdentLikeToken()
                      );
                    break;
                  case 93:
                    return TA;
                  case 61:
                    if (61 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), xA);
                    break;
                  case 123:
                    return ZA;
                  case 125:
                    return kA;
                  case 117:
                  case 85:
                    var g = this.peekCodePoint(0),
                      Q = this.peekCodePoint(1);
                    return (
                      g !== wA ||
                        (!FA(Q) && 63 !== Q) ||
                        (this.consumeCodePoint(),
                        this.consumeUnicodeRangeToken()),
                      this.reconsumeCodePoint(A),
                      this.consumeIdentLikeToken()
                    );
                  case 124:
                    if (61 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), DA);
                    if (124 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), GA);
                    break;
                  case 126:
                    if (61 === this.peekCodePoint(0))
                      return (this.consumeCodePoint(), KA);
                    break;
                  case dA:
                    return JA;
                }
                return UA(A)
                  ? (this.consumeWhiteSpace(), OA)
                  : CA(A)
                    ? (this.reconsumeCodePoint(A), this.consumeNumericToken())
                    : fA(A)
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
                  FA(e) && A.length < 6;
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
                if (this.peekCodePoint(0) === QA && FA(this.peekCodePoint(1))) {
                  (this.consumeCodePoint(), (e = this.consumeCodePoint()));
                  for (var n = []; FA(e) && n.length < 6; )
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
                return "url" === A.toLowerCase() && 40 === this.peekCodePoint(0)
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
                    : (this.consumeBadUrlRemnants(), WA);
                }
                for (;;) {
                  var r = this.consumeCodePoint();
                  if (r === dA || 41 === r)
                    return { type: 22, value: a.apply(void 0, A) };
                  if (UA(r))
                    return (
                      this.consumeWhiteSpace(),
                      this.peekCodePoint(0) === dA ||
                      41 === this.peekCodePoint(0)
                        ? (this.consumeCodePoint(),
                          { type: 22, value: a.apply(void 0, A) })
                        : (this.consumeBadUrlRemnants(), WA)
                    );
                  if (34 === r || 39 === r || 40 === r || pA(r))
                    return (this.consumeBadUrlRemnants(), WA);
                  if (92 === r) {
                    if (!bA(r, this.peekCodePoint(0)))
                      return (this.consumeBadUrlRemnants(), WA);
                    A.push(this.consumeEscapedCodePoint());
                  } else A.push(r);
                }
              }),
              (A.prototype.consumeWhiteSpace = function () {
                for (; UA(this.peekCodePoint(0)); ) this.consumeCodePoint();
              }),
              (A.prototype.consumeBadUrlRemnants = function () {
                for (;;) {
                  var A = this.consumeCodePoint();
                  if (41 === A || A === dA) return;
                  bA(A, this.peekCodePoint(0)) &&
                    this.consumeEscapedCodePoint();
                }
              }),
              (A.prototype.consumeStringSlice = function (A) {
                for (var e = ""; A > 0; ) {
                  var t = Math.min(5e4, A);
                  ((e += a.apply(void 0, this._value.splice(0, t))), (A -= t));
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
                  if (10 === r) return (this._value.splice(0, t), VA);
                  if (92 === r) {
                    var n = this._value[t + 1];
                    n !== dA &&
                      void 0 !== n &&
                      (10 === n
                        ? ((e += this.consumeStringSlice(t)),
                          (t = -1),
                          this._value.shift())
                        : bA(r, n) &&
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
                  (t !== wA && t !== QA) || A.push(this.consumeCodePoint());
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
                  (((r === wA || r === QA) && CA(n)) || CA(r))
                )
                  for (
                    A.push(this.consumeCodePoint(), this.consumeCodePoint()),
                      e = 8;
                    CA(this.peekCodePoint(0));
                  )
                    A.push(this.consumeCodePoint());
                return [HA(A), e];
              }),
              (A.prototype.consumeNumericToken = function () {
                var A = this.consumeNumber(),
                  e = A[0],
                  t = A[1],
                  r = this.peekCodePoint(0),
                  n = this.peekCodePoint(1),
                  o = this.peekCodePoint(2);
                return mA(r, n, o)
                  ? { type: 15, number: e, flags: t, unit: this.consumeName() }
                  : 37 === r
                    ? (this.consumeCodePoint(),
                      { type: 16, number: e, flags: t })
                    : { type: 17, number: e, flags: t };
              }),
              (A.prototype.consumeEscapedCodePoint = function () {
                var A = this.consumeCodePoint();
                if (FA(A)) {
                  for (
                    var e = a(A);
                    FA(this.peekCodePoint(0)) && e.length < 6;
                  )
                    e += a(this.consumeCodePoint());
                  UA(this.peekCodePoint(0)) && this.consumeCodePoint();
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
                  if (hA(e)) A += a(e);
                  else {
                    if (!bA(e, this.peekCodePoint(0)))
                      return (this.reconsumeCodePoint(e), A);
                    A += a(this.consumeEscapedCodePoint());
                  }
                }
              }),
              A
            );
          })(),
          _A = (function () {
            function A(A) {
              this._tokens = A;
            }
            return (
              (A.create = function (e) {
                var t = new PA();
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
                return void 0 === A ? JA : A;
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
          zA = function (A) {
            return 17 === A.type;
          },
          qA = function (A) {
            return 20 === A.type;
          },
          $A = function (A) {
            return 0 === A.type;
          },
          Ae = function (A, e) {
            return qA(A) && A.value === e;
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
          ie = function (A) {
            return 16 === A.type || oe(A);
          },
          se = function (A) {
            return A.length > 1 ? [A[0], A[1]] : [A[0]];
          },
          Be = { type: 17, number: 0, flags: 4 },
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
          Qe = "turn",
          we = function (A, e) {
            if (15 === e.type)
              switch (e.unit) {
                case "deg":
                  return (Math.PI * e.number) / 180;
                case ge:
                  return (Math.PI / 200) * e.number;
                case "rad":
                  return e.number;
                case Qe:
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
                A.unit === Qe)
            );
          },
          Ce = function (A) {
            switch (
              A.filter(qA)
                .map(function (A) {
                  return A.value;
                })
                .join(" ")
            ) {
              case "to bottom right":
              case "to right bottom":
              case "left top":
              case "top left":
                return [Be, Be];
              case "to top":
              case "bottom":
                return Fe(0);
              case "to bottom left":
              case "to left bottom":
              case "right top":
              case "top right":
                return [Be, ce];
              case "to right":
              case "left":
                return Fe(90);
              case "to top left":
              case "to left top":
              case "right bottom":
              case "bottom right":
                return [ce, ce];
              case "to bottom":
              case "top":
                return Fe(180);
              case "to top right":
              case "to right top":
              case "left bottom":
              case "bottom left":
                return [ce, Be];
              case "to left":
              case "right":
                return Fe(270);
            }
            return 0;
          },
          Fe = function (A) {
            return (Math.PI * A) / 180;
          },
          Ue = function (A, e) {
            if (18 === e.type) {
              var t = Ee[e.name];
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
                var i = e.value.substring(3, 4);
                return pe(
                  parseInt(r + r, 16),
                  parseInt(n + n, 16),
                  parseInt(o + o, 16),
                  parseInt(i + i, 16) / 255,
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
                  (i = e.value.substring(6, 8)),
                  pe(
                    parseInt(r, 16),
                    parseInt(n, 16),
                    parseInt(o, 16),
                    parseInt(i, 16) / 255,
                  )
                );
            }
            if (20 === e.type) {
              var s = Le[e.value.toUpperCase()];
              if (void 0 !== s) return s;
            }
            return Le.TRANSPARENT;
          },
          fe = function (A) {
            return 0 == (255 & A);
          },
          he = function (A) {
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
          be = function (A, e) {
            if (17 === A.type) return A.number;
            if (16 === A.type) {
              var t = 3 === e ? 1 : 255;
              return 3 === e
                ? (A.number / 100) * t
                : Math.round((A.number / 100) * t);
            }
            return 0;
          },
          me = function (A, e) {
            var t = e.filter(te);
            if (3 === t.length) {
              var r = t.map(be);
              return pe(r[0], r[1], r[2], 1);
            }
            if (4 === t.length) {
              var n = t.map(be);
              return pe(n[0], n[1], n[2], n[3]);
            }
            return 0;
          };
        function Ie(A, e, t) {
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
        var He,
          ye = function (A, e) {
            var t = e.filter(te),
              r = t[0],
              n = t[1],
              o = t[2],
              i = t[3],
              s = (17 === r.type ? Fe(r.number) : we(0, r)) / (2 * Math.PI),
              B = ie(n) ? n.number / 100 : 0,
              a = ie(o) ? o.number / 100 : 0,
              c = void 0 !== i && ie(i) ? ue(i, 1) : 1;
            if (0 === B) return pe(255 * a, 255 * a, 255 * a, 1);
            var l = a <= 0.5 ? a * (B + 1) : a + B - a * B,
              u = 2 * a - l,
              g = Ie(u, l, s + 1 / 3),
              Q = Ie(u, l, s),
              w = Ie(u, l, s - 1 / 3);
            return pe(255 * g, 255 * Q, 255 * w, c);
          },
          Ee = { hsl: ye, hsla: ye, rgb: me, rgba: me },
          ve = function (A, e) {
            return Ue(A, _A.create(e).parseComponentValue());
          },
          Le = {
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
          xe = {
            name: "background-clip",
            initialValue: "border-box",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
              return e.map(function (A) {
                if (qA(A))
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
          Ge = {
            name: "background-color",
            initialValue: "transparent",
            prefix: !1,
            type: 3,
            format: "color",
          },
          De = function (A, e) {
            var t = Ue(A, e[0]),
              r = e[1];
            return r && ie(r)
              ? { color: t, stop: r }
              : { color: t, stop: null };
          },
          Ke = function (A, e) {
            var t = A[0],
              r = A[A.length - 1];
            (null === t.stop && (t.stop = Be),
              null === r.stop && (r.stop = ce));
            for (var n = [], o = 0, i = 0; i < A.length; i++) {
              var s = A[i].stop;
              if (null !== s) {
                var B = ue(s, e);
                (n.push(B > o ? B : o), (o = B));
              } else n.push(null);
            }
            var a = null;
            for (i = 0; i < n.length; i++) {
              var c = n[i];
              if (null === c) null === a && (a = i);
              else if (null !== a) {
                for (
                  var l = i - a, u = (c - n[a - 1]) / (l + 1), g = 1;
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
          Ze = function (A, e) {
            return Math.sqrt(A * A + e * e);
          },
          ke = function (A, e, t, r, n) {
            return [
              [0, 0],
              [0, e],
              [A, 0],
              [A, e],
            ].reduce(
              function (A, e) {
                var o = Ze(t - e[0], r - e[1]);
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
          Ne = function (A, e) {
            var t = Fe(180),
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
                  if (de(o)) return void (t = (we(0, o) + Fe(270)) % Fe(360));
                }
                var i = De(A, e);
                r.push(i);
              }),
              { angle: t, stops: r, type: 1 }
            );
          },
          We = "closest-side",
          Ve = "farthest-side",
          Re = "closest-corner",
          Se = "farthest-corner",
          Xe = "circle",
          Me = "ellipse",
          Ye = "cover",
          Te = "contain",
          Oe = function (A, e) {
            var t = 0,
              r = 3,
              n = [],
              o = [];
            return (
              re(e).forEach(function (e, i) {
                var s = !0;
                if (
                  (0 === i
                    ? (s = e.reduce(function (A, e) {
                        if (qA(e))
                          switch (e.value) {
                            case "center":
                              return (o.push(ae), !1);
                            case "top":
                            case "left":
                              return (o.push(Be), !1);
                            case "right":
                            case "bottom":
                              return (o.push(ce), !1);
                          }
                        else if (ie(e) || oe(e)) return (o.push(e), !1);
                        return A;
                      }, s))
                    : 1 === i &&
                      (s = e.reduce(function (A, e) {
                        if (qA(e))
                          switch (e.value) {
                            case Xe:
                              return ((t = 0), !1);
                            case Me:
                              return ((t = 1), !1);
                            case Te:
                            case We:
                              return ((r = 0), !1);
                            case Ve:
                              return ((r = 1), !1);
                            case Re:
                              return ((r = 2), !1);
                            case Ye:
                            case Se:
                              return ((r = 3), !1);
                          }
                        else if (oe(e) || ie(e))
                          return (Array.isArray(r) || (r = []), r.push(e), !1);
                        return A;
                      }, s)),
                  s)
                ) {
                  var B = De(A, e);
                  n.push(B);
                }
              }),
              { size: r, shape: t, stops: n, position: o, type: 2 }
            );
          },
          Je = function (A, e) {
            if (22 === e.type) {
              var t = { url: e.value, type: 0 };
              return (A.cache.addImage(e.value), t);
            }
            if (18 === e.type) {
              var r = Pe[e.name];
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
          Pe = {
            "linear-gradient": function (A, e) {
              var t = Fe(180),
                r = [];
              return (
                re(e).forEach(function (e, n) {
                  if (0 === n) {
                    var o = e[0];
                    if (20 === o.type && "to" === o.value)
                      return void (t = Ce(e));
                    if (de(o)) return void (t = we(0, o));
                  }
                  var i = De(A, e);
                  r.push(i);
                }),
                { angle: t, stops: r, type: 1 }
              );
            },
            "-moz-linear-gradient": Ne,
            "-ms-linear-gradient": Ne,
            "-o-linear-gradient": Ne,
            "-webkit-linear-gradient": Ne,
            "radial-gradient": function (A, e) {
              var t = 0,
                r = 3,
                n = [],
                o = [];
              return (
                re(e).forEach(function (e, i) {
                  var s = !0;
                  if (0 === i) {
                    var B = !1;
                    s = e.reduce(function (A, e) {
                      if (B)
                        if (qA(e))
                          switch (e.value) {
                            case "center":
                              return (o.push(ae), A);
                            case "top":
                            case "left":
                              return (o.push(Be), A);
                            case "right":
                            case "bottom":
                              return (o.push(ce), A);
                          }
                        else (ie(e) || oe(e)) && o.push(e);
                      else if (qA(e))
                        switch (e.value) {
                          case Xe:
                            return ((t = 0), !1);
                          case Me:
                            return ((t = 1), !1);
                          case "at":
                            return ((B = !0), !1);
                          case We:
                            return ((r = 0), !1);
                          case Ye:
                          case Ve:
                            return ((r = 1), !1);
                          case Te:
                          case Re:
                            return ((r = 2), !1);
                          case Se:
                            return ((r = 3), !1);
                        }
                      else if (oe(e) || ie(e))
                        return (Array.isArray(r) || (r = []), r.push(e), !1);
                      return A;
                    }, s);
                  }
                  if (s) {
                    var a = De(A, e);
                    n.push(a);
                  }
                }),
                { size: r, shape: t, stops: n, position: o, type: 2 }
              );
            },
            "-moz-radial-gradient": Oe,
            "-ms-radial-gradient": Oe,
            "-o-radial-gradient": Oe,
            "-webkit-radial-gradient": Oe,
            "-webkit-gradient": function (A, e) {
              var t = Fe(180),
                r = [],
                n = 1;
              return (
                re(e).forEach(function (e, t) {
                  var o = e[0];
                  if (0 === t) {
                    if (qA(o) && "linear" === o.value) return void (n = 1);
                    if (qA(o) && "radial" === o.value) return void (n = 2);
                  }
                  if (18 === o.type)
                    if ("from" === o.name) {
                      var i = Ue(A, o.values[0]);
                      r.push({ stop: Be, color: i });
                    } else if ("to" === o.name)
                      ((i = Ue(A, o.values[0])),
                        r.push({ stop: ce, color: i }));
                    else if ("color-stop" === o.name) {
                      var s = o.values.filter(te);
                      if (2 === s.length) {
                        i = Ue(A, s[1]);
                        var B = s[0];
                        zA(B) &&
                          r.push({
                            stop: {
                              type: 16,
                              number: 100 * B.number,
                              flags: B.flags,
                            },
                            color: i,
                          });
                      }
                    }
                }),
                1 === n
                  ? { angle: (t + Fe(180)) % Fe(360), stops: r, type: n }
                  : { size: 3, shape: 0, stops: r, position: [], type: n }
              );
            },
          },
          _e = {
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
                            (18 === A.type && !Pe[A.name])
                          );
                        })(A)
                      );
                    })
                    .map(function (e) {
                      return Je(A, e);
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
                if (qA(A))
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
          ze = {
            name: "background-position",
            initialValue: "0% 0%",
            type: 1,
            prefix: !1,
            parse: function (A, e) {
              return re(e)
                .map(function (A) {
                  return A.filter(ie);
                })
                .map(se);
            },
          },
          qe = {
            name: "background-repeat",
            initialValue: "repeat",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
              return re(e)
                .map(function (A) {
                  return A.filter(qA)
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
        })(He || (He = {}));
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
            return qA(A) || ie(A);
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
          it = rt("bottom"),
          st = rt("left"),
          Bt = function (A) {
            return {
              name: "border-radius-" + A,
              initialValue: "0 0",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return se(e.filter(ie));
              },
            };
          },
          at = Bt("top-left"),
          ct = Bt("top-right"),
          lt = Bt("bottom-right"),
          ut = Bt("bottom-left"),
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
          Qt = gt("top"),
          wt = gt("right"),
          dt = gt("bottom"),
          Ct = gt("left"),
          Ft = function (A) {
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
          Ut = Ft("top"),
          ft = Ft("right"),
          ht = Ft("bottom"),
          pt = Ft("left"),
          bt = {
            name: "color",
            initialValue: "transparent",
            prefix: !1,
            type: 3,
            format: "color",
          },
          mt = {
            name: "direction",
            initialValue: "ltr",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
              return "rtl" === e ? 1 : 0;
            },
          },
          It = {
            name: "display",
            initialValue: "inline-block",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
              return e.filter(qA).reduce(function (A, e) {
                return A | Ht(e.value);
              }, 0);
            },
          },
          Ht = function (A) {
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
          yt = {
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
          Et = {
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
          Lt = {
            name: "line-break",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
              return "strict" === e ? At.STRICT : At.NORMAL;
            },
          },
          xt = {
            name: "line-height",
            initialValue: "normal",
            prefix: !1,
            type: 4,
          },
          Gt = function (A, e) {
            return qA(A) && "normal" === A.value
              ? 1.2 * e
              : 17 === A.type
                ? e * A.number
                : ie(A)
                  ? ue(A, e)
                  : e;
          },
          Dt = {
            name: "list-style-image",
            initialValue: "none",
            type: 0,
            prefix: !1,
            parse: function (A, e) {
              return 20 === e.type && "none" === e.value ? null : Je(A, e);
            },
          },
          Kt = {
            name: "list-style-position",
            initialValue: "outside",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
              return "inside" === e ? 0 : 1;
            },
          },
          Zt = {
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
          kt = function (A) {
            return {
              name: "margin-" + A,
              initialValue: "0",
              prefix: !1,
              type: 4,
            };
          },
          Nt = kt("top"),
          Wt = kt("right"),
          Vt = kt("bottom"),
          Rt = kt("left"),
          St = {
            name: "overflow",
            initialValue: "visible",
            prefix: !1,
            type: 1,
            parse: function (A, e) {
              return e.filter(qA).map(function (A) {
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
          Xt = {
            name: "overflow-wrap",
            initialValue: "normal",
            prefix: !1,
            type: 2,
            parse: function (A, e) {
              return "break-word" === e ? "break-word" : "normal";
            },
          },
          Mt = function (A) {
            return {
              name: "padding-" + A,
              initialValue: "0",
              prefix: !1,
              type: 3,
              format: "length-percentage",
            };
          },
          Yt = Mt("top"),
          Tt = Mt("right"),
          Ot = Mt("bottom"),
          Jt = Mt("left"),
          Pt = {
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
          _t = {
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
                          color: Le.TRANSPARENT,
                          offsetX: Be,
                          offsetY: Be,
                          blur: Be,
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
                        : (t.color = Ue(A, o));
                    }
                    return t;
                  });
            },
          },
          zt = {
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
          qt = {
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
              var t = e.filter(ie);
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
                if (zA(e)) return { auto: !1, order: e.number };
                throw new Error("Invalid z-index number parsed");
              },
            },
            ir = {
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
                return zA(e) ? e.number : 1;
              },
            },
            Br = {
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
                  .filter(qA)
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
                return zA(e)
                  ? e.number
                  : qA(e) && "bold" === e.value
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
                return e.filter(qA).map(function (A) {
                  return A.value;
                });
              },
            },
            Qr = {
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
            wr = function (A, e) {
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
                  var i = n[o],
                    s = n[o + 1];
                  if (20 === i.type) {
                    var B = s && zA(s) ? s.number : 1;
                    r.push({ counter: i.value, increment: B });
                  }
                }
                return r;
              },
            },
            Fr = {
              name: "counter-reset",
              initialValue: "none",
              prefix: !0,
              type: 1,
              parse: function (A, e) {
                if (0 === e.length) return [];
                for (var t = [], r = e.filter(ee), n = 0; n < r.length; n++) {
                  var o = r[n],
                    i = r[n + 1];
                  if (qA(o) && "none" !== o.value) {
                    var s = i && zA(i) ? i.number : 0;
                    t.push({ counter: o.value, reset: s });
                  }
                }
                return t;
              },
            },
            Ur = {
              name: "duration",
              initialValue: "0s",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                return e.filter(jA).map(function (e) {
                  return ir.parse(A, e);
                });
              },
            },
            fr = {
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
            hr = function (A, e, t) {
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
                            offsetX: Be,
                            offsetY: Be,
                            blur: Be,
                            spread: Be,
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
                            : (t.color = Ue(A, o));
                      }
                      return t;
                    });
              },
            },
            br = {
              name: "paint-order",
              initialValue: "normal",
              prefix: !1,
              type: 1,
              parse: function (A, e) {
                var t = [];
                return (
                  e.filter(qA).forEach(function (A) {
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
            mr = {
              name: "-webkit-text-stroke-color",
              initialValue: "currentcolor",
              prefix: !1,
              type: 3,
              format: "color",
            },
            Ir = {
              name: "-webkit-text-stroke-width",
              initialValue: "0",
              type: 0,
              prefix: !1,
              parse: function (A, e) {
                return jA(e) ? e.number : 0;
              },
            },
            Hr = (function () {
              function A(A, e) {
                var t, r;
                ((this.animationDuration = vr(A, Ur, e.animationDuration)),
                  (this.backgroundClip = vr(A, xe, e.backgroundClip)),
                  (this.backgroundColor = vr(A, Ge, e.backgroundColor)),
                  (this.backgroundImage = vr(A, _e, e.backgroundImage)),
                  (this.backgroundOrigin = vr(A, je, e.backgroundOrigin)),
                  (this.backgroundPosition = vr(A, ze, e.backgroundPosition)),
                  (this.backgroundRepeat = vr(A, qe, e.backgroundRepeat)),
                  (this.backgroundSize = vr(A, et, e.backgroundSize)),
                  (this.borderTopColor = vr(A, nt, e.borderTopColor)),
                  (this.borderRightColor = vr(A, ot, e.borderRightColor)),
                  (this.borderBottomColor = vr(A, it, e.borderBottomColor)),
                  (this.borderLeftColor = vr(A, st, e.borderLeftColor)),
                  (this.borderTopLeftRadius = vr(A, at, e.borderTopLeftRadius)),
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
                  (this.borderTopStyle = vr(A, Qt, e.borderTopStyle)),
                  (this.borderRightStyle = vr(A, wt, e.borderRightStyle)),
                  (this.borderBottomStyle = vr(A, dt, e.borderBottomStyle)),
                  (this.borderLeftStyle = vr(A, Ct, e.borderLeftStyle)),
                  (this.borderTopWidth = vr(A, Ut, e.borderTopWidth)),
                  (this.borderRightWidth = vr(A, ft, e.borderRightWidth)),
                  (this.borderBottomWidth = vr(A, ht, e.borderBottomWidth)),
                  (this.borderLeftWidth = vr(A, pt, e.borderLeftWidth)),
                  (this.boxShadow = vr(A, pr, e.boxShadow)),
                  (this.color = vr(A, bt, e.color)),
                  (this.direction = vr(A, mt, e.direction)),
                  (this.display = vr(A, It, e.display)),
                  (this.float = vr(A, yt, e.cssFloat)),
                  (this.fontFamily = vr(A, cr, e.fontFamily)),
                  (this.fontSize = vr(A, lr, e.fontSize)),
                  (this.fontStyle = vr(A, Qr, e.fontStyle)),
                  (this.fontVariant = vr(A, gr, e.fontVariant)),
                  (this.fontWeight = vr(A, ur, e.fontWeight)),
                  (this.letterSpacing = vr(A, Et, e.letterSpacing)),
                  (this.lineBreak = vr(A, Lt, e.lineBreak)),
                  (this.lineHeight = vr(A, xt, e.lineHeight)),
                  (this.listStyleImage = vr(A, Dt, e.listStyleImage)),
                  (this.listStylePosition = vr(A, Kt, e.listStylePosition)),
                  (this.listStyleType = vr(A, Zt, e.listStyleType)),
                  (this.marginTop = vr(A, Nt, e.marginTop)),
                  (this.marginRight = vr(A, Wt, e.marginRight)),
                  (this.marginBottom = vr(A, Vt, e.marginBottom)),
                  (this.marginLeft = vr(A, Rt, e.marginLeft)),
                  (this.opacity = vr(A, sr, e.opacity)));
                var n = vr(A, St, e.overflow);
                ((this.overflowX = n[0]),
                  (this.overflowY = n[n.length > 1 ? 1 : 0]),
                  (this.overflowWrap = vr(A, Xt, e.overflowWrap)),
                  (this.paddingTop = vr(A, Yt, e.paddingTop)),
                  (this.paddingRight = vr(A, Tt, e.paddingRight)),
                  (this.paddingBottom = vr(A, Ot, e.paddingBottom)),
                  (this.paddingLeft = vr(A, Jt, e.paddingLeft)),
                  (this.paintOrder = vr(A, br, e.paintOrder)),
                  (this.position = vr(A, _t, e.position)),
                  (this.textAlign = vr(A, Pt, e.textAlign)),
                  (this.textDecorationColor = vr(
                    A,
                    Br,
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
                  (this.textTransform = vr(A, zt, e.textTransform)),
                  (this.transform = vr(A, qt, e.transform)),
                  (this.transformOrigin = vr(A, tr, e.transformOrigin)),
                  (this.visibility = vr(A, rr, e.visibility)),
                  (this.webkitTextStrokeColor = vr(
                    A,
                    mr,
                    e.webkitTextStrokeColor,
                  )),
                  (this.webkitTextStrokeWidth = vr(
                    A,
                    Ir,
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
                  return fe(this.backgroundColor);
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
                    wr(this.display, 4) ||
                    wr(this.display, 33554432) ||
                    wr(this.display, 268435456) ||
                    wr(this.display, 536870912) ||
                    wr(this.display, 67108864) ||
                    wr(this.display, 134217728)
                  );
                }),
                A
              );
            })(),
            yr = function (A, e) {
              ((this.content = vr(A, dr, e.content)),
                (this.quotes = vr(A, fr, e.quotes)));
            },
            Er = function (A, e) {
              ((this.counterIncrement = vr(A, Cr, e.counterIncrement)),
                (this.counterReset = vr(A, Fr, e.counterReset)));
            },
            vr = function (A, e, t) {
              var r = new PA(),
                n = null != t ? t.toString() : e.initialValue;
              r.write(n);
              var o = new _A(r.read());
              switch (e.type) {
                case 2:
                  var i = o.parseComponentValue();
                  return e.parse(A, qA(i) ? i.value : e.initialValue);
                case 0:
                  return e.parse(A, o.parseComponentValue());
                case 1:
                  return e.parse(A, o.parseComponentValues());
                case 4:
                  return o.parseComponentValue();
                case 3:
                  switch (e.format) {
                    case "angle":
                      return we(0, o.parseComponentValue());
                    case "color":
                      return Ue(A, o.parseComponentValue());
                    case "image":
                      return Je(A, o.parseComponentValue());
                    case "length":
                      var s = o.parseComponentValue();
                      return oe(s) ? s : Be;
                    case "length-percentage":
                      var B = o.parseComponentValue();
                      return ie(B) ? B : Be;
                    case "time":
                      return ir.parse(A, o.parseComponentValue());
                  }
              }
            },
            Lr = function (A, e) {
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
            xr = function (A, e) {
              ((this.context = A),
                (this.textNodes = []),
                (this.elements = []),
                (this.flags = 0),
                Lr(e, 3),
                (this.styles = new Hr(A, window.getComputedStyle(e, null))),
                Gn(e) &&
                  (this.styles.animationDuration.some(function (A) {
                    return A > 0;
                  }) && (e.style.animationDuration = "0s"),
                  null !== this.styles.transform &&
                    (e.style.transform = "none")),
                (this.bounds = s(this.context, e)),
                Lr(e, 4) && (this.flags |= 16));
            },
            Gr =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            Dr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            Kr = 0;
          Kr < Gr.length;
          Kr++
        )
          Dr[Gr.charCodeAt(Kr)] = Kr;
        for (
          var Zr = function (A, e, t) {
              return A.slice
                ? A.slice(e, t)
                : new Uint16Array(Array.prototype.slice.call(A, e, t));
            },
            kr = (function () {
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
            Nr =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            Wr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            Vr = 0;
          Vr < Nr.length;
          Vr++
        )
          Wr[Nr.charCodeAt(Vr)] = Vr;
        var Rr,
          Sr = 8,
          Xr = 9,
          Mr = 11,
          Yr = 12,
          Tr = function () {
            for (var A = [], e = 0; e < arguments.length; e++)
              A[e] = arguments[e];
            if (String.fromCodePoint)
              return String.fromCodePoint.apply(String, A);
            var t = A.length;
            if (!t) return "";
            for (var r = [], n = -1, o = ""; ++n < t; ) {
              var i = A[n];
              (i <= 65535
                ? r.push(i)
                : r.push(55296 + ((i -= 65536) >> 10), (i % 1024) + 56320),
                (n + 1 === t || r.length > 16384) &&
                  ((o += String.fromCharCode.apply(String, r)),
                  (r.length = 0)));
            }
            return o;
          },
          Or = (function (A, e) {
            var t,
              r,
              n,
              o = (function (A) {
                var e,
                  t,
                  r,
                  n,
                  o,
                  i = 0.75 * A.length,
                  s = A.length,
                  B = 0;
                "=" === A[A.length - 1] &&
                  (i--, "=" === A[A.length - 2] && i--);
                var a =
                    "undefined" != typeof ArrayBuffer &&
                    "undefined" != typeof Uint8Array &&
                    void 0 !== Uint8Array.prototype.slice
                      ? new ArrayBuffer(i)
                      : new Array(i),
                  c = Array.isArray(a) ? a : new Uint8Array(a);
                for (e = 0; e < s; e += 4)
                  ((t = Dr[A.charCodeAt(e)]),
                    (r = Dr[A.charCodeAt(e + 1)]),
                    (n = Dr[A.charCodeAt(e + 2)]),
                    (o = Dr[A.charCodeAt(e + 3)]),
                    (c[B++] = (t << 2) | (r >> 4)),
                    (c[B++] = ((15 & r) << 4) | (n >> 2)),
                    (c[B++] = ((3 & n) << 6) | (63 & o)));
                return a;
              })(
                "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",
              ),
              i = Array.isArray(o)
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
              B = Zr(s, 12, i[4] / 2),
              a =
                2 === i[5]
                  ? Zr(s, (24 + i[4]) / 2)
                  : ((t = i),
                    (r = Math.ceil((24 + i[4]) / 4)),
                    t.slice
                      ? t.slice(r, n)
                      : new Uint32Array(Array.prototype.slice.call(t, r, n)));
            return new kr(i[0], i[1], i[2], i[3], B, a);
          })(),
          Jr = "×",
          Pr = function (A) {
            return Or.get(A);
          },
          _r = function (A, e, t) {
            var r = t - 2,
              n = e[r],
              o = e[t - 1],
              i = e[t];
            if (2 === o && 3 === i) return Jr;
            if (2 === o || 3 === o || 4 === o) return "÷";
            if (2 === i || 3 === i || 4 === i) return "÷";
            if (o === Sr && -1 !== [Sr, Xr, Mr, Yr].indexOf(i)) return Jr;
            if (!((o !== Mr && o !== Xr) || (i !== Xr && 10 !== i))) return Jr;
            if ((o === Yr || 10 === o) && 10 === i) return Jr;
            if (13 === i || 5 === i) return Jr;
            if (7 === i) return Jr;
            if (1 === o) return Jr;
            if (13 === o && 14 === i) {
              for (; 5 === n; ) n = e[--r];
              if (14 === n) return Jr;
            }
            if (15 === o && 15 === i) {
              for (var s = 0; 15 === n; ) (s++, (n = e[--r]));
              if (s % 2 == 0) return Jr;
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
              o = e.map(Pr);
            return {
              next: function () {
                if (r >= t) return { done: !0, value: null };
                for (var A = Jr; r < t && (A = _r(0, o, ++r)) === Jr; );
                if (A !== Jr || r === t) {
                  var i = Tr.apply(null, e.slice(n, r));
                  return ((n = r), { value: i, done: !1 });
                }
                return { done: !0, value: null };
              },
            };
          },
          zr = function (A) {
            return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
          },
          qr = function (A, e, t, r, n) {
            var o = "http://www.w3.org/2000/svg",
              i = document.createElementNS(o, "svg"),
              s = document.createElementNS(o, "foreignObject");
            return (
              i.setAttributeNS(null, "width", A.toString()),
              i.setAttributeNS(null, "height", e.toString()),
              s.setAttributeNS(null, "width", "100%"),
              s.setAttributeNS(null, "height", "100%"),
              s.setAttributeNS(null, "x", t.toString()),
              s.setAttributeNS(null, "y", r.toString()),
              s.setAttributeNS(null, "externalResourcesRequired", "true"),
              i.appendChild(s),
              s.appendChild(n),
              i
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
                Object.defineProperty(An, "SUPPORT_RANGE_BOUNDS", { value: A }),
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
                    n = B(r.data).map(function (A) {
                      return a(A);
                    }),
                    o = 0,
                    i = {},
                    s = n.every(function (A, e) {
                      (t.setStart(r, o), t.setEnd(r, o + A.length));
                      var n = t.getBoundingClientRect();
                      o += A.length;
                      var s = n.x > i.x || n.y > i.y;
                      return ((i = n), 0 === e || s);
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
                Object.defineProperty(An, "SUPPORT_SVG_DRAWING", { value: A }),
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
                      var i = qr(t, t, 0, 0, n);
                      return (
                        (r.fillStyle = "red"),
                        r.fillRect(0, 0, t, t),
                        $r(i)
                          .then(function (e) {
                            r.drawImage(e, 0, 0);
                            var n = r.getImageData(0, 0, t, t).data;
                            ((r.fillStyle = "red"), r.fillRect(0, 0, t, t));
                            var i = A.createElement("div");
                            return (
                              (i.style.backgroundImage = "url(" + o + ")"),
                              (i.style.height = "100px"),
                              zr(n) ? $r(qr(t, t, 0, 0, i)) : Promise.reject(!1)
                            );
                          })
                          .then(function (A) {
                            return (
                              r.drawImage(A, 0, 0),
                              zr(r.getImageData(0, 0, t, t).data)
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
                Object.defineProperty(An, "SUPPORT_CORS_IMAGES", { value: A }),
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
                Object.defineProperty(An, "SUPPORT_NATIVE_TEXT_SEGMENTATION", {
                  value: A,
                }),
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
            ((this.text = sn(e.data, t.textTransform)),
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
                                  var t = B(A),
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
                                              var i = tA.get(A);
                                              if (
                                                (i > 50
                                                  ? (n.push(!0), (i -= 50))
                                                  : n.push(!1),
                                                -1 !==
                                                  [
                                                    "normal",
                                                    "auto",
                                                    "loose",
                                                  ].indexOf(e) &&
                                                  -1 !==
                                                    [
                                                      8208, 8211, 12316, 12448,
                                                    ].indexOf(A))
                                              )
                                                return (r.push(o), t.push(16));
                                              if (4 === i || 11 === i) {
                                                if (0 === o)
                                                  return (r.push(o), t.push(M));
                                                var s = t[o - 1];
                                                return -1 === sA.indexOf(s)
                                                  ? (r.push(r[o - 1]),
                                                    t.push(s))
                                                  : (r.push(o), t.push(M));
                                              }
                                              return (
                                                r.push(o),
                                                31 === i
                                                  ? t.push(
                                                      "strict" === e ? k : P,
                                                    )
                                                  : i === q || 29 === i
                                                    ? t.push(M)
                                                    : 43 === i
                                                      ? t.push(
                                                          (A >= 131072 &&
                                                            A <= 196605) ||
                                                            (A >= 196608 &&
                                                              A <= 262141)
                                                            ? P
                                                            : M,
                                                        )
                                                      : void t.push(i)
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
                                          return -1 !== [V, M, q].indexOf(A)
                                            ? P
                                            : A;
                                        }));
                                      var i =
                                        "keep-all" === e.wordBreak
                                          ? o.map(function (e, t) {
                                              return (
                                                e &&
                                                A[t] >= 19968 &&
                                                A[t] <= 40959
                                              );
                                            })
                                          : void 0;
                                      return [r, n, i];
                                    })(t, e),
                                    n = r[0],
                                    o = r[1],
                                    i = r[2],
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
                                        (A = uA(t, o, n, ++c, i)) === AA;
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
                                      e = B(A),
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
                          var B = rn(e),
                            a = 0;
                          B.forEach(function (e) {
                            (o.push(
                              new en(
                                e,
                                i.fromDOMRectList(
                                  A,
                                  tn(r, a + c, e.length).getClientRects(),
                                ),
                              ),
                            ),
                              (a += e.length));
                          });
                        } else o.push(new en(e, i.fromDOMRectList(A, n)));
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
                              return i.EMPTY;
                            })(A, r),
                          ),
                        ),
                          (r = l));
                      }
                    else An.SUPPORT_RANGE_BOUNDS || (r = r.splitText(e.length));
                    c += e.length;
                  }),
                  o
                );
              })(A, this.text, t, e)));
          },
          sn = function (A, e) {
            switch (e) {
              case 1:
                return A.toLowerCase();
              case 3:
                return A.replace(Bn, an);
              case 2:
                return A.toUpperCase();
              default:
                return A;
            }
          },
          Bn = /(^|\s|:|-|\(|\))([a-z])/g,
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
          })(xr),
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
          })(xr),
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
          })(xr),
          gn = (function (A) {
            function t(e, t) {
              var r = A.call(this, e, t) || this;
              return ((r.value = t.value), r);
            }
            return (e(t, A), t);
          })(xr),
          Qn = (function (A) {
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
          })(xr),
          wn = [{ type: 15, flags: 0, unit: "px", number: 3 }],
          dn = [{ type: 16, flags: 0, number: 50 }],
          Cn = "checkbox",
          Fn = "radio",
          Un = 707406591,
          fn = (function (A) {
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
                (s.type !== Cn && s.type !== Fn) ||
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
                      ? new i(
                          r.left + (r.width - r.height) / 2,
                          r.top,
                          r.height,
                          r.height,
                        )
                      : r.width < r.height
                        ? new i(
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
                      wn;
                  break;
                case Fn:
                  s.styles.borderTopRightRadius =
                    s.styles.borderTopLeftRadius =
                    s.styles.borderBottomRightRadius =
                    s.styles.borderBottomLeftRadius =
                      dn;
              }
              return s;
            }
            return (e(t, A), t);
          })(xr),
          hn = (function (A) {
            function t(e, t) {
              var r = A.call(this, e, t) || this,
                n = t.options[t.selectedIndex || 0];
              return ((r.value = (n && n.text) || ""), r);
            }
            return (e(t, A), t);
          })(xr),
          pn = (function (A) {
            function t(e, t) {
              var r = A.call(this, e, t) || this;
              return ((r.value = t.value), r);
            }
            return (e(t, A), t);
          })(xr),
          bn = (function (A) {
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
                  r.tree = yn(e, t.contentWindow.document.documentElement);
                  var n = t.contentWindow.document.documentElement
                      ? ve(
                          e,
                          getComputedStyle(
                            t.contentWindow.document.documentElement,
                          ).backgroundColor,
                        )
                      : Le.TRANSPARENT,
                    o = t.contentWindow.document.body
                      ? ve(
                          e,
                          getComputedStyle(t.contentWindow.document.body)
                            .backgroundColor,
                        )
                      : Le.TRANSPARENT;
                  r.backgroundColor = fe(n)
                    ? fe(o)
                      ? r.styles.backgroundColor
                      : o
                    : n;
                }
              } catch (A) {}
              return r;
            }
            return (e(t, A), t);
          })(xr),
          mn = ["OL", "UL", "MENU"],
          In = function (A, e, t, r) {
            for (var n = e.firstChild, o = void 0; n; n = o)
              if (((o = n.nextSibling), Ln(n) && n.data.trim().length > 0))
                t.textNodes.push(new on(A, n, t.styles));
              else if (xn(n))
                if (On(n) && n.assignedNodes)
                  n.assignedNodes().forEach(function (e) {
                    return In(A, e, t, r);
                  });
                else {
                  var i = Hn(A, n);
                  i.styles.isVisible() &&
                    (En(n, i, r)
                      ? (i.flags |= 4)
                      : vn(i.styles) && (i.flags |= 2),
                    -1 !== mn.indexOf(n.tagName) && (i.flags |= 8),
                    t.elements.push(i),
                    n.shadowRoot
                      ? In(A, n.shadowRoot, i, r)
                      : Yn(n) || Nn(n) || Tn(n) || In(A, n, i, r));
                }
          },
          Hn = function (A, e) {
            return Sn(e)
              ? new cn(A, e)
              : Vn(e)
                ? new ln(A, e)
                : Nn(e)
                  ? new un(A, e)
                  : Kn(e)
                    ? new gn(A, e)
                    : Zn(e)
                      ? new Qn(A, e)
                      : kn(e)
                        ? new fn(A, e)
                        : Tn(e)
                          ? new hn(A, e)
                          : Yn(e)
                            ? new pn(A, e)
                            : Xn(e)
                              ? new bn(A, e)
                              : new xr(A, e);
          },
          yn = function (A, e) {
            var t = Hn(A, e);
            return ((t.flags |= 4), In(A, e, t, t), t);
          },
          En = function (A, e, t) {
            return (
              e.styles.isPositionedWithZIndex() ||
              e.styles.opacity < 1 ||
              e.styles.isTransformed() ||
              (Wn(A) && t.styles.isTransparent())
            );
          },
          vn = function (A) {
            return A.isPositioned() || A.isFloating();
          },
          Ln = function (A) {
            return A.nodeType === Node.TEXT_NODE;
          },
          xn = function (A) {
            return A.nodeType === Node.ELEMENT_NODE;
          },
          Gn = function (A) {
            return xn(A) && void 0 !== A.style && !Dn(A);
          },
          Dn = function (A) {
            return "object" == typeof A.className;
          },
          Kn = function (A) {
            return "LI" === A.tagName;
          },
          Zn = function (A) {
            return "OL" === A.tagName;
          },
          kn = function (A) {
            return "INPUT" === A.tagName;
          },
          Nn = function (A) {
            return "svg" === A.tagName;
          },
          Wn = function (A) {
            return "BODY" === A.tagName;
          },
          Vn = function (A) {
            return "CANVAS" === A.tagName;
          },
          Rn = function (A) {
            return "VIDEO" === A.tagName;
          },
          Sn = function (A) {
            return "IMG" === A.tagName;
          },
          Xn = function (A) {
            return "IFRAME" === A.tagName;
          },
          Mn = function (A) {
            return "STYLE" === A.tagName;
          },
          Yn = function (A) {
            return "TEXTAREA" === A.tagName;
          },
          Tn = function (A) {
            return "SELECT" === A.tagName;
          },
          On = function (A) {
            return "SLOT" === A.tagName;
          },
          Jn = function (A) {
            return A.tagName.indexOf("-") > 0;
          },
          Pn = (function () {
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
          _n = {
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
              500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8,
              7, 6, 5, 4, 3, 2, 1,
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
          zn = {
            integers: [
              1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200,
              100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8,
              7, 6, 5, 4, 3, 2, 1,
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
          qn = {
            integers: [
              1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700,
              600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
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
              ? Bo(A, n, o.length > 0)
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
            if (A < -9999 || A > 9999) return Bo(A, 4, n.length > 0);
            var i = Math.abs(A),
              s = n;
            if (0 === i) return e[0] + s;
            for (var B = 0; i > 0 && B <= 4; B++) {
              var a = i % 10;
              (0 === a && wr(o, 1) && "" !== s
                ? (s = e[a] + s)
                : a > 1 ||
                    (1 === a && 0 === B) ||
                    (1 === a && 1 === B && wr(o, 2)) ||
                    (1 === a && 1 === B && wr(o, 4) && A > 100) ||
                    (1 === a && B > 1 && wr(o, 8))
                  ? (s = e[a] + (B > 0 ? t[B - 1] : "") + s)
                  : 1 === a && B > 0 && (s = t[B - 1] + s),
                (i = Math.floor(i / 10)));
            }
            return (A < 0 ? r : "") + s;
          },
          no = "十百千萬",
          oo = "拾佰仟萬",
          io = "マイナス",
          so = "마이너스",
          Bo = function (A, e, t) {
            var r = t ? ". " : "",
              n = t ? "、" : "",
              o = t ? ", " : "",
              i = t ? " " : "";
            switch (e) {
              case 0:
                return "•" + i;
              case 1:
                return "◦" + i;
              case 2:
                return "◾" + i;
              case 5:
                var s = eo(A, 48, 57, !0, r);
                return s.length < 4 ? "0" + s : s;
              case 4:
                return to(A, "〇一二三四五六七八九", n);
              case 6:
                return $n(A, 1, 3999, _n, 3, r).toLowerCase();
              case 7:
                return $n(A, 1, 3999, _n, 3, r);
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
                return ro(A, "〇一二三四五六七八九", "十百千万", io, n, 0);
              case 25:
                return ro(A, "零壱弐参四伍六七八九", "拾百千万", io, n, 7);
              case 31:
                return ro(A, "영일이삼사오육칠팔구", "십백천만", so, o, 7);
              case 33:
                return ro(A, "零一二三四五六七八九", "十百千萬", so, o, 0);
              case 32:
                return ro(A, "零壹貳參四五六七八九", "拾百千", so, o, 7);
              case 18:
                return eo(A, 2406, 2415, !0, r);
              case 20:
                return $n(A, 1, 19999, qn, 3, r);
              case 21:
                return eo(A, 2790, 2799, !0, r);
              case 22:
                return eo(A, 2662, 2671, !0, r);
              case 22:
                return $n(A, 1, 10999, zn, 3, r);
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
                (this.counters = new Pn()),
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
                var i = A.defaultView.pageXOffset,
                  s = A.defaultView.pageYOffset,
                  B = o.contentWindow,
                  a = B.document,
                  c = wo(o).then(function () {
                    return r(t, void 0, void 0, function () {
                      var A, t;
                      return n(this, function (r) {
                        switch (r.label) {
                          case 0:
                            return (
                              this.scrolledElements.forEach(ho),
                              B &&
                                (B.scrollTo(e.left, e.top),
                                !/(iPad|iPhone|iPod)/g.test(
                                  navigator.userAgent,
                                ) ||
                                  (B.scrollY === e.top &&
                                    B.scrollX === e.left) ||
                                  (this.context.logger.warn(
                                    "Unable to restore scroll position for cloned document",
                                  ),
                                  (this.context.windowBounds =
                                    this.context.windowBounds.add(
                                      B.scrollX - e.left,
                                      B.scrollY - e.top,
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
                              ? [4, Qo(a)]
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
                  a.write(Uo(document.doctype) + "<html></html>"),
                  fo(this.referenceElement.ownerDocument, i, s),
                  a.replaceChild(
                    a.adoptNode(this.documentElement),
                    a.documentElement,
                  ),
                  a.close(),
                  c
                );
              }),
              (A.prototype.createElementClone = function (A) {
                if ((Lr(A, 2), Vn(A))) return this.createCanvasClone(A);
                if (Rn(A)) return this.createVideoClone(A);
                if (Mn(A)) return this.createStyleClone(A);
                var e = A.cloneNode(!1);
                return (
                  Sn(e) &&
                    (Sn(A) &&
                      A.currentSrc &&
                      A.currentSrc !== A.src &&
                      ((e.src = A.currentSrc), (e.srcset = "")),
                    "lazy" === e.loading && (e.loading = "eager")),
                  Jn(e) ? this.createCustomElementClone(e) : e
                );
              }),
              (A.prototype.createCustomElementClone = function (A) {
                var e = document.createElement("html2canvascustomelement");
                return (Fo(A.style, e), e);
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
                      var i =
                        null !== (e = A.getContext("webgl2")) && void 0 !== e
                          ? e
                          : A.getContext("webgl");
                      if (i) {
                        var s = i.getContextAttributes();
                        !1 === (null == s ? void 0 : s.preserveDrawingBuffer) &&
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
                (xn(e) &&
                  ("SCRIPT" === e.tagName ||
                    e.hasAttribute(ao) ||
                    ("function" == typeof this.options.ignoreElements &&
                      this.options.ignoreElements(e)))) ||
                  (this.options.copyStyles && xn(e) && Mn(e)) ||
                  A.appendChild(this.cloneNode(e, t));
              }),
              (A.prototype.cloneChildNodes = function (A, e, t) {
                for (
                  var r = this,
                    n = A.shadowRoot ? A.shadowRoot.firstChild : A.firstChild;
                  n;
                  n = n.nextSibling
                )
                  if (xn(n) && On(n) && "function" == typeof n.assignedNodes) {
                    var o = n.assignedNodes();
                    o.length &&
                      o.forEach(function (A) {
                        return r.appendChildNode(e, A, t);
                      });
                  } else this.appendChildNode(e, n, t);
              }),
              (A.prototype.cloneNode = function (A, e) {
                if (Ln(A)) return document.createTextNode(A.data);
                if (!A.ownerDocument) return A.cloneNode(!1);
                var t = A.ownerDocument.defaultView;
                if (t && xn(A) && (Gn(A) || Dn(A))) {
                  var r = this.createElementClone(A);
                  r.style.transitionProperty = "none";
                  var n = t.getComputedStyle(A),
                    o = t.getComputedStyle(A, ":before"),
                    i = t.getComputedStyle(A, ":after");
                  (this.referenceElement === A &&
                    Gn(r) &&
                    (this.clonedReferenceElement = r),
                    Wn(r) && Io(r));
                  var s = this.counters.parse(new Er(this.context, n)),
                    B = this.resolvePseudoContent(A, r, o, Rr.BEFORE);
                  (Jn(A) && (e = !0),
                    Rn(A) || this.cloneChildNodes(A, r, e),
                    B && r.insertBefore(B, r.firstChild));
                  var a = this.resolvePseudoContent(A, r, i, Rr.AFTER);
                  return (
                    a && r.appendChild(a),
                    this.counters.pop(s),
                    ((n && (this.options.copyStyles || Dn(A)) && !Xn(A)) ||
                      e) &&
                      Fo(n, r),
                    (0 === A.scrollTop && 0 === A.scrollLeft) ||
                      this.scrolledElements.push([
                        r,
                        A.scrollLeft,
                        A.scrollTop,
                      ]),
                    (Yn(A) || Tn(A)) && (Yn(r) || Tn(r)) && (r.value = A.value),
                    r
                  );
                }
                return A.cloneNode(!1);
              }),
              (A.prototype.resolvePseudoContent = function (A, e, t, r) {
                var n = this;
                if (t) {
                  var o = t.content,
                    i = e.ownerDocument;
                  if (
                    i &&
                    o &&
                    "none" !== o &&
                    "-moz-alt-content" !== o &&
                    "none" !== t.display
                  ) {
                    this.counters.parse(new Er(this.context, t));
                    var s = new yr(this.context, t),
                      B = i.createElement("html2canvaspseudoelement");
                    (Fo(t, B),
                      s.content.forEach(function (e) {
                        if (0 === e.type)
                          B.appendChild(i.createTextNode(e.value));
                        else if (22 === e.type) {
                          var t = i.createElement("img");
                          ((t.src = e.value),
                            (t.style.opacity = "1"),
                            B.appendChild(t));
                        } else if (18 === e.type) {
                          if ("attr" === e.name) {
                            var r = e.values.filter(qA);
                            r.length &&
                              B.appendChild(
                                i.createTextNode(
                                  A.getAttribute(r[0].value) || "",
                                ),
                              );
                          } else if ("counter" === e.name) {
                            var o = e.values.filter(te),
                              a = o[1];
                            if ((u = o[0]) && qA(u)) {
                              var c = n.counters.getCounterValue(u.value),
                                l =
                                  a && qA(a) ? Zt.parse(n.context, a.value) : 3;
                              B.appendChild(i.createTextNode(Bo(c, l, !1)));
                            }
                          } else if ("counters" === e.name) {
                            var u,
                              g = e.values.filter(te),
                              Q = g[1];
                            if (((a = g[2]), (u = g[0]) && qA(u))) {
                              var w = n.counters.getCounterValues(u.value),
                                d =
                                  a && qA(a) ? Zt.parse(n.context, a.value) : 3,
                                C = Q && 0 === Q.type ? Q.value : "",
                                F = w
                                  .map(function (A) {
                                    return Bo(A, d, !1);
                                  })
                                  .join(C);
                              B.appendChild(i.createTextNode(F));
                            }
                          }
                        } else if (20 === e.type)
                          switch (e.value) {
                            case "open-quote":
                              B.appendChild(
                                i.createTextNode(
                                  hr(s.quotes, n.quoteDepth++, !0),
                                ),
                              );
                              break;
                            case "close-quote":
                              B.appendChild(
                                i.createTextNode(
                                  hr(s.quotes, --n.quoteDepth, !1),
                                ),
                              );
                              break;
                            default:
                              B.appendChild(i.createTextNode(e.value));
                          }
                      }),
                      (B.className = po + " " + bo));
                    var a = r === Rr.BEFORE ? " " + po : " " + bo;
                    return (
                      Dn(e) ? (e.className.baseValue += a) : (e.className += a),
                      B
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
        })(Rr || (Rr = {}));
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
          Qo = function (A) {
            return Promise.all([].slice.call(A.images, 0).map(go));
          },
          wo = function (A) {
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
          Fo = function (A, e) {
            for (var t = A.length - 1; t >= 0; t--) {
              var r = A.item(t);
              -1 === Co.indexOf(r) &&
                e.style.setProperty(r, A.getPropertyValue(r));
            }
            return e;
          },
          Uo = function (A) {
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
          fo = function (A, e, t) {
            A &&
              A.defaultView &&
              (e !== A.defaultView.pageXOffset ||
                t !== A.defaultView.pageYOffset) &&
              A.defaultView.scrollTo(e, t);
          },
          ho = function (A) {
            var e = A[0],
              t = A[2];
            ((e.scrollLeft = A[1]), (e.scrollTop = t));
          },
          po = "___html2canvas___pseudoelement_before",
          bo = "___html2canvas___pseudoelement_after",
          mo =
            '{\n    content: "" !important;\n    display: none !important;\n}',
          Io = function (A) {
            Ho(
              A,
              "." + po + ":before" + mo + "\n         ." + bo + ":after" + mo,
            );
          },
          Ho = function (A, e) {
            var t = A.ownerDocument;
            if (t) {
              var r = t.createElement("style");
              ((r.textContent = e), A.appendChild(r));
            }
          },
          yo = (function () {
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
          Eo = (function () {
            function A(A, e) {
              ((this.context = A), (this._options = e), (this._cache = {}));
            }
            return (
              (A.prototype.addImage = function (A) {
                var e = Promise.resolve();
                return this.has(A)
                  ? e
                  : Zo(A) || Go(A)
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
                    i = this;
                  return n(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          (e = yo.isSameOrigin(A)),
                          (t =
                            !Do(A) &&
                            !0 === this._options.useCORS &&
                            An.SUPPORT_CORS_IMAGES &&
                            !e),
                          (r =
                            !Do(A) &&
                            !e &&
                            !Zo(A) &&
                            "string" == typeof this._options.proxy &&
                            An.SUPPORT_CORS_XHR &&
                            !t),
                          e ||
                          !1 !== this._options.allowTaint ||
                          Do(A) ||
                          Zo(A) ||
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
                                (Ko(o) || t) && (r.crossOrigin = "anonymous"),
                                (r.src = o),
                                !0 === r.complete &&
                                  setTimeout(function () {
                                    return A(r);
                                  }, 500),
                                i._options.imageTimeout > 0 &&
                                  setTimeout(function () {
                                    return e(
                                      "Timed out (" +
                                        i._options.imageTimeout +
                                        "ms) loading image",
                                    );
                                  }, i._options.imageTimeout));
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
                  var i = An.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                    s = new XMLHttpRequest();
                  ((s.onload = function () {
                    if (200 === s.status)
                      if ("text" === i) n(s.response);
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
                  var B = t.indexOf("?") > -1 ? "&" : "?";
                  if (
                    (s.open(
                      "GET",
                      "" +
                        t +
                        B +
                        "url=" +
                        encodeURIComponent(A) +
                        "&responseType=" +
                        i,
                    ),
                    "text" !== i &&
                      s instanceof XMLHttpRequest &&
                      (s.responseType = i),
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
          Lo = /^data:image\/.*;base64,/i,
          xo = /^data:image\/.*/i,
          Go = function (A) {
            return An.SUPPORT_SVG_DRAWING || !ko(A);
          },
          Do = function (A) {
            return xo.test(A);
          },
          Ko = function (A) {
            return Lo.test(A);
          },
          Zo = function (A) {
            return "blob" === A.substr(0, 4);
          },
          ko = function (A) {
            return "svg" === A.substr(-3).toLowerCase() || vo.test(A);
          },
          No = (function () {
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
          Wo = function (A, e, t) {
            return new No(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
          },
          Vo = (function () {
            function A(A, e, t, r) {
              ((this.type = 1),
                (this.start = A),
                (this.startControl = e),
                (this.endControl = t),
                (this.end = r));
            }
            return (
              (A.prototype.subdivide = function (e, t) {
                var r = Wo(this.start, this.startControl, e),
                  n = Wo(this.startControl, this.endControl, e),
                  o = Wo(this.endControl, this.end, e),
                  i = Wo(r, n, e),
                  s = Wo(n, o, e),
                  B = Wo(i, s, e);
                return t
                  ? new A(this.start, r, i, B)
                  : new A(B, s, o, this.end);
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
          Ro = function (A) {
            return 1 === A.type;
          },
          So = function (A) {
            var e = A.styles,
              t = A.bounds,
              r = le(e.borderTopLeftRadius, t.width, t.height),
              n = r[0],
              o = r[1],
              i = le(e.borderTopRightRadius, t.width, t.height),
              s = i[0],
              B = i[1],
              a = le(e.borderBottomRightRadius, t.width, t.height),
              c = a[0],
              l = a[1],
              u = le(e.borderBottomLeftRadius, t.width, t.height),
              g = u[0],
              Q = u[1],
              w = [];
            (w.push((n + s) / t.width),
              w.push((g + c) / t.width),
              w.push((o + Q) / t.height),
              w.push((B + l) / t.height));
            var d = Math.max.apply(Math, w);
            d > 1 &&
              ((n /= d),
              (o /= d),
              (s /= d),
              (B /= d),
              (c /= d),
              (l /= d),
              (g /= d),
              (Q /= d));
            var C = t.width - s,
              F = t.height - l,
              U = t.width - c,
              f = t.height - Q,
              h = e.borderTopWidth,
              p = e.borderRightWidth,
              b = e.borderBottomWidth,
              m = e.borderLeftWidth,
              I = ue(e.paddingTop, A.bounds.width),
              H = ue(e.paddingRight, A.bounds.width),
              y = ue(e.paddingBottom, A.bounds.width),
              E = ue(e.paddingLeft, A.bounds.width);
            ((this.topLeftBorderDoubleOuterBox =
              n > 0 || o > 0
                ? Xo(
                    t.left + m / 3,
                    t.top + h / 3,
                    n - m / 3,
                    o - h / 3,
                    lo.TOP_LEFT,
                  )
                : new No(t.left + m / 3, t.top + h / 3)),
              (this.topRightBorderDoubleOuterBox =
                n > 0 || o > 0
                  ? Xo(
                      t.left + C,
                      t.top + h / 3,
                      s - p / 3,
                      B - h / 3,
                      lo.TOP_RIGHT,
                    )
                  : new No(t.left + t.width - p / 3, t.top + h / 3)),
              (this.bottomRightBorderDoubleOuterBox =
                c > 0 || l > 0
                  ? Xo(
                      t.left + U,
                      t.top + F,
                      c - p / 3,
                      l - b / 3,
                      lo.BOTTOM_RIGHT,
                    )
                  : new No(t.left + t.width - p / 3, t.top + t.height - b / 3)),
              (this.bottomLeftBorderDoubleOuterBox =
                g > 0 || Q > 0
                  ? Xo(
                      t.left + m / 3,
                      t.top + f,
                      g - m / 3,
                      Q - b / 3,
                      lo.BOTTOM_LEFT,
                    )
                  : new No(t.left + m / 3, t.top + t.height - b / 3)),
              (this.topLeftBorderDoubleInnerBox =
                n > 0 || o > 0
                  ? Xo(
                      t.left + (2 * m) / 3,
                      t.top + (2 * h) / 3,
                      n - (2 * m) / 3,
                      o - (2 * h) / 3,
                      lo.TOP_LEFT,
                    )
                  : new No(t.left + (2 * m) / 3, t.top + (2 * h) / 3)),
              (this.topRightBorderDoubleInnerBox =
                n > 0 || o > 0
                  ? Xo(
                      t.left + C,
                      t.top + (2 * h) / 3,
                      s - (2 * p) / 3,
                      B - (2 * h) / 3,
                      lo.TOP_RIGHT,
                    )
                  : new No(
                      t.left + t.width - (2 * p) / 3,
                      t.top + (2 * h) / 3,
                    )),
              (this.bottomRightBorderDoubleInnerBox =
                c > 0 || l > 0
                  ? Xo(
                      t.left + U,
                      t.top + F,
                      c - (2 * p) / 3,
                      l - (2 * b) / 3,
                      lo.BOTTOM_RIGHT,
                    )
                  : new No(
                      t.left + t.width - (2 * p) / 3,
                      t.top + t.height - (2 * b) / 3,
                    )),
              (this.bottomLeftBorderDoubleInnerBox =
                g > 0 || Q > 0
                  ? Xo(
                      t.left + (2 * m) / 3,
                      t.top + f,
                      g - (2 * m) / 3,
                      Q - (2 * b) / 3,
                      lo.BOTTOM_LEFT,
                    )
                  : new No(
                      t.left + (2 * m) / 3,
                      t.top + t.height - (2 * b) / 3,
                    )),
              (this.topLeftBorderStroke =
                n > 0 || o > 0
                  ? Xo(
                      t.left + m / 2,
                      t.top + h / 2,
                      n - m / 2,
                      o - h / 2,
                      lo.TOP_LEFT,
                    )
                  : new No(t.left + m / 2, t.top + h / 2)),
              (this.topRightBorderStroke =
                n > 0 || o > 0
                  ? Xo(
                      t.left + C,
                      t.top + h / 2,
                      s - p / 2,
                      B - h / 2,
                      lo.TOP_RIGHT,
                    )
                  : new No(t.left + t.width - p / 2, t.top + h / 2)),
              (this.bottomRightBorderStroke =
                c > 0 || l > 0
                  ? Xo(
                      t.left + U,
                      t.top + F,
                      c - p / 2,
                      l - b / 2,
                      lo.BOTTOM_RIGHT,
                    )
                  : new No(t.left + t.width - p / 2, t.top + t.height - b / 2)),
              (this.bottomLeftBorderStroke =
                g > 0 || Q > 0
                  ? Xo(
                      t.left + m / 2,
                      t.top + f,
                      g - m / 2,
                      Q - b / 2,
                      lo.BOTTOM_LEFT,
                    )
                  : new No(t.left + m / 2, t.top + t.height - b / 2)),
              (this.topLeftBorderBox =
                n > 0 || o > 0
                  ? Xo(t.left, t.top, n, o, lo.TOP_LEFT)
                  : new No(t.left, t.top)),
              (this.topRightBorderBox =
                s > 0 || B > 0
                  ? Xo(t.left + C, t.top, s, B, lo.TOP_RIGHT)
                  : new No(t.left + t.width, t.top)),
              (this.bottomRightBorderBox =
                c > 0 || l > 0
                  ? Xo(t.left + U, t.top + F, c, l, lo.BOTTOM_RIGHT)
                  : new No(t.left + t.width, t.top + t.height)),
              (this.bottomLeftBorderBox =
                g > 0 || Q > 0
                  ? Xo(t.left, t.top + f, g, Q, lo.BOTTOM_LEFT)
                  : new No(t.left, t.top + t.height)),
              (this.topLeftPaddingBox =
                n > 0 || o > 0
                  ? Xo(
                      t.left + m,
                      t.top + h,
                      Math.max(0, n - m),
                      Math.max(0, o - h),
                      lo.TOP_LEFT,
                    )
                  : new No(t.left + m, t.top + h)),
              (this.topRightPaddingBox =
                s > 0 || B > 0
                  ? Xo(
                      t.left + Math.min(C, t.width - p),
                      t.top + h,
                      C > t.width + p ? 0 : Math.max(0, s - p),
                      Math.max(0, B - h),
                      lo.TOP_RIGHT,
                    )
                  : new No(t.left + t.width - p, t.top + h)),
              (this.bottomRightPaddingBox =
                c > 0 || l > 0
                  ? Xo(
                      t.left + Math.min(U, t.width - m),
                      t.top + Math.min(F, t.height - b),
                      Math.max(0, c - p),
                      Math.max(0, l - b),
                      lo.BOTTOM_RIGHT,
                    )
                  : new No(t.left + t.width - p, t.top + t.height - b)),
              (this.bottomLeftPaddingBox =
                g > 0 || Q > 0
                  ? Xo(
                      t.left + m,
                      t.top + Math.min(f, t.height - b),
                      Math.max(0, g - m),
                      Math.max(0, Q - b),
                      lo.BOTTOM_LEFT,
                    )
                  : new No(t.left + m, t.top + t.height - b)),
              (this.topLeftContentBox =
                n > 0 || o > 0
                  ? Xo(
                      t.left + m + E,
                      t.top + h + I,
                      Math.max(0, n - (m + E)),
                      Math.max(0, o - (h + I)),
                      lo.TOP_LEFT,
                    )
                  : new No(t.left + m + E, t.top + h + I)),
              (this.topRightContentBox =
                s > 0 || B > 0
                  ? Xo(
                      t.left + Math.min(C, t.width + m + E),
                      t.top + h + I,
                      C > t.width + m + E ? 0 : s - m + E,
                      B - (h + I),
                      lo.TOP_RIGHT,
                    )
                  : new No(t.left + t.width - (p + H), t.top + h + I)),
              (this.bottomRightContentBox =
                c > 0 || l > 0
                  ? Xo(
                      t.left + Math.min(U, t.width - (m + E)),
                      t.top + Math.min(F, t.height + h + I),
                      Math.max(0, c - (p + H)),
                      l - (b + y),
                      lo.BOTTOM_RIGHT,
                    )
                  : new No(
                      t.left + t.width - (p + H),
                      t.top + t.height - (b + y),
                    )),
              (this.bottomLeftContentBox =
                g > 0 || Q > 0
                  ? Xo(
                      t.left + m + E,
                      t.top + f,
                      Math.max(0, g - (m + E)),
                      Q - (b + y),
                      lo.BOTTOM_LEFT,
                    )
                  : new No(t.left + m + E, t.top + t.height - (b + y))));
          };
        !(function (A) {
          ((A[(A.TOP_LEFT = 0)] = "TOP_LEFT"),
            (A[(A.TOP_RIGHT = 1)] = "TOP_RIGHT"),
            (A[(A.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"),
            (A[(A.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT"));
        })(lo || (lo = {}));
        var Xo = function (A, e, t, r, n) {
            var o = ((Math.sqrt(2) - 1) / 3) * 4,
              i = t * o,
              s = r * o,
              B = A + t,
              a = e + r;
            switch (n) {
              case lo.TOP_LEFT:
                return new Vo(
                  new No(A, a),
                  new No(A, a - s),
                  new No(B - i, e),
                  new No(B, e),
                );
              case lo.TOP_RIGHT:
                return new Vo(
                  new No(A, e),
                  new No(A + i, e),
                  new No(B, a - s),
                  new No(B, a),
                );
              case lo.BOTTOM_RIGHT:
                return new Vo(
                  new No(B, e),
                  new No(B, e + s),
                  new No(A + i, a),
                  new No(A, a),
                );
              default:
                return new Vo(
                  new No(B, a),
                  new No(B - i, a),
                  new No(A, e + s),
                  new No(A, e),
                );
            }
          },
          Mo = function (A) {
            return [
              A.topLeftBorderBox,
              A.topRightBorderBox,
              A.bottomRightBorderBox,
              A.bottomLeftBorderBox,
            ];
          },
          Yo = function (A) {
            return [
              A.topLeftPaddingBox,
              A.topRightPaddingBox,
              A.bottomRightPaddingBox,
              A.bottomLeftPaddingBox,
            ];
          },
          To = function (A, e, t) {
            ((this.offsetX = A),
              (this.offsetY = e),
              (this.matrix = t),
              (this.type = 0),
              (this.target = 6));
          },
          Oo = function (A, e) {
            ((this.path = A), (this.target = e), (this.type = 1));
          },
          Jo = function (A) {
            ((this.opacity = A), (this.type = 2), (this.target = 6));
          },
          Po = function (A) {
            return 1 === A.type;
          },
          _o = function (A, e) {
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
          zo = (function () {
            function A(A, e) {
              if (
                ((this.container = A),
                (this.parent = e),
                (this.effects = []),
                (this.curves = new So(this.container)),
                this.container.styles.opacity < 1 &&
                  this.effects.push(new Jo(this.container.styles.opacity)),
                null !== this.container.styles.transform &&
                  this.effects.push(
                    new To(
                      this.container.bounds.left +
                        this.container.styles.transformOrigin[0].number,
                      this.container.bounds.top +
                        this.container.styles.transformOrigin[1].number,
                      this.container.styles.transform,
                    ),
                  ),
                0 !== this.container.styles.overflowX)
              ) {
                var t = Mo(this.curves),
                  r = Yo(this.curves);
                _o(t, r)
                  ? this.effects.push(new Oo(t, 6))
                  : (this.effects.push(new Oo(t, 2)),
                    this.effects.push(new Oo(r, 4)));
              }
            }
            return (
              (A.prototype.getEffects = function (A) {
                for (
                  var e = -1 === [2, 3].indexOf(this.container.styles.position),
                    t = this.parent,
                    r = this.effects.slice(0);
                  t;
                ) {
                  var n = t.effects.filter(function (A) {
                    return !Po(A);
                  });
                  if (e || 0 !== t.container.styles.position || !t.parent) {
                    if (
                      (r.unshift.apply(r, n),
                      (e = -1 === [2, 3].indexOf(t.container.styles.position)),
                      0 !== t.container.styles.overflowX)
                    ) {
                      var o = Mo(t.curves),
                        i = Yo(t.curves);
                      _o(o, i) || r.unshift(new Oo(i, 6));
                    }
                  } else r.unshift.apply(r, n);
                  t = t.parent;
                }
                return r.filter(function (e) {
                  return wr(e.target, A);
                });
              }),
              A
            );
          })(),
          qo = function (A, e, t, r) {
            A.container.elements.forEach(function (n) {
              var o = wr(n.flags, 4),
                i = wr(n.flags, 2),
                s = new zo(n, A);
              wr(n.styles.display, 2048) && r.push(s);
              var B = wr(n.flags, 8) ? [] : r;
              if (o || i) {
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
                qo(s, c, o ? c : t, B);
              } else
                (n.styles.isInlineLevel()
                  ? e.inlineLevel.push(s)
                  : e.nonInlineLevel.push(s),
                  qo(s, e, t, B));
              wr(n.flags, 8) && $o(n, B);
            });
          },
          $o = function (A, e) {
            for (
              var t = A instanceof Qn ? A.start : 1,
                r = A instanceof Qn && A.reversed,
                n = 0;
              n < e.length;
              n++
            ) {
              var o = e[n];
              (o.container instanceof gn &&
                "number" == typeof o.container.value &&
                0 !== o.container.value &&
                (t = o.container.value),
                (o.listValue = Bo(t, o.container.styles.listStyleType, !0)),
                (t += r ? -1 : 1));
            }
          },
          Ai = function (A, e) {
            switch (e) {
              case 0:
                return ti(
                  A.topLeftBorderBox,
                  A.topLeftPaddingBox,
                  A.topRightBorderBox,
                  A.topRightPaddingBox,
                );
              case 1:
                return ti(
                  A.topRightBorderBox,
                  A.topRightPaddingBox,
                  A.bottomRightBorderBox,
                  A.bottomRightPaddingBox,
                );
              case 2:
                return ti(
                  A.bottomRightBorderBox,
                  A.bottomRightPaddingBox,
                  A.bottomLeftBorderBox,
                  A.bottomLeftPaddingBox,
                );
              default:
                return ti(
                  A.bottomLeftBorderBox,
                  A.bottomLeftPaddingBox,
                  A.topLeftBorderBox,
                  A.topLeftPaddingBox,
                );
            }
          },
          ei = function (A, e) {
            var t = [];
            return (
              Ro(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A),
              Ro(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e),
              t
            );
          },
          ti = function (A, e, t, r) {
            var n = [];
            return (
              Ro(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A),
              Ro(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t),
              Ro(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r),
              Ro(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e),
              n
            );
          },
          ri = function (A) {
            var e = A.styles;
            return A.bounds.add(
              e.borderLeftWidth,
              e.borderTopWidth,
              -(e.borderRightWidth + e.borderLeftWidth),
              -(e.borderTopWidth + e.borderBottomWidth),
            );
          },
          ni = function (A) {
            var e = A.styles,
              t = A.bounds,
              r = ue(e.paddingLeft, t.width),
              n = ue(e.paddingRight, t.width),
              o = ue(e.paddingTop, t.width),
              i = ue(e.paddingBottom, t.width);
            return t.add(
              r + e.borderLeftWidth,
              o + e.borderTopWidth,
              -(e.borderRightWidth + e.borderLeftWidth + r + n),
              -(e.borderTopWidth + e.borderBottomWidth + o + i),
            );
          },
          oi = function (A, e, t) {
            var r = (function (A, e) {
                return 0 === A ? e.bounds : 2 === A ? ni(e) : ri(e);
              })(ai(A.styles.backgroundOrigin, e), A),
              n = (function (A, e) {
                return 0 === A ? e.bounds : 2 === A ? ni(e) : ri(e);
              })(ai(A.styles.backgroundClip, e), A),
              o = Bi(ai(A.styles.backgroundSize, e), t, r),
              i = o[0],
              s = o[1],
              B = le(
                ai(A.styles.backgroundPosition, e),
                r.width - i,
                r.height - s,
              );
            return [
              ci(ai(A.styles.backgroundRepeat, e), B, o, r, n),
              Math.round(r.left + B[0]),
              Math.round(r.top + B[1]),
              i,
              s,
            ];
          },
          ii = function (A) {
            return qA(A) && A.value === He.AUTO;
          },
          si = function (A) {
            return "number" == typeof A;
          },
          Bi = function (A, e, t) {
            var r = e[0],
              n = e[1],
              o = e[2],
              i = A[0],
              s = A[1];
            if (!i) return [0, 0];
            if (ie(i) && s && ie(s)) return [ue(i, t.width), ue(s, t.height)];
            var B = si(o);
            if (qA(i) && (i.value === He.CONTAIN || i.value === He.COVER))
              return si(o)
                ? t.width / t.height < o != (i.value === He.COVER)
                  ? [t.width, t.width / o]
                  : [t.height * o, t.height]
                : [t.width, t.height];
            var a = si(r),
              c = si(n),
              l = a || c;
            if (ii(i) && (!s || ii(s)))
              return a && c
                ? [r, n]
                : B || l
                  ? l && B
                    ? [a ? r : n * o, c ? n : r / o]
                    : [a ? r : t.width, c ? n : t.height]
                  : [t.width, t.height];
            if (B) {
              var u = 0,
                g = 0;
              return (
                ie(i) ? (u = ue(i, t.width)) : ie(s) && (g = ue(s, t.height)),
                ii(i) ? (u = g * o) : (s && !ii(s)) || (g = u / o),
                [u, g]
              );
            }
            var Q = null,
              w = null;
            if (
              (ie(i)
                ? (Q = ue(i, t.width))
                : s && ie(s) && (w = ue(s, t.height)),
              null === Q ||
                (s && !ii(s)) ||
                (w = a && c ? (Q / r) * n : t.height),
              null !== w && ii(i) && (Q = a && c ? (w / n) * r : t.width),
              null !== Q && null !== w)
            )
              return [Q, w];
            throw new Error("Unable to calculate background-size for element");
          },
          ai = function (A, e) {
            var t = A[e];
            return void 0 === t ? A[0] : t;
          },
          ci = function (A, e, t, r, n) {
            var o = e[0],
              i = e[1],
              s = t[0],
              B = t[1];
            switch (A) {
              case 2:
                return [
                  new No(Math.round(r.left), Math.round(r.top + i)),
                  new No(Math.round(r.left + r.width), Math.round(r.top + i)),
                  new No(
                    Math.round(r.left + r.width),
                    Math.round(B + r.top + i),
                  ),
                  new No(Math.round(r.left), Math.round(B + r.top + i)),
                ];
              case 3:
                return [
                  new No(Math.round(r.left + o), Math.round(r.top)),
                  new No(Math.round(r.left + o + s), Math.round(r.top)),
                  new No(
                    Math.round(r.left + o + s),
                    Math.round(r.height + r.top),
                  ),
                  new No(Math.round(r.left + o), Math.round(r.height + r.top)),
                ];
              case 1:
                return [
                  new No(Math.round(r.left + o), Math.round(r.top + i)),
                  new No(Math.round(r.left + o + s), Math.round(r.top + i)),
                  new No(Math.round(r.left + o + s), Math.round(r.top + i + B)),
                  new No(Math.round(r.left + o), Math.round(r.top + i + B)),
                ];
              default:
                return [
                  new No(Math.round(n.left), Math.round(n.top)),
                  new No(Math.round(n.left + n.width), Math.round(n.top)),
                  new No(
                    Math.round(n.left + n.width),
                    Math.round(n.height + n.top),
                  ),
                  new No(Math.round(n.left), Math.round(n.height + n.top)),
                ];
            }
          },
          li = "Hidden Text",
          ui = (function () {
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
                  n.appendChild(this._document.createTextNode(li)),
                  t.appendChild(n),
                  t.appendChild(r));
                var i = r.offsetTop - n.offsetTop + 2;
                (t.removeChild(n),
                  t.appendChild(this._document.createTextNode(li)),
                  (t.style.lineHeight = "normal"),
                  (r.style.verticalAlign = "super"));
                var s = r.offsetTop - t.offsetTop + 2;
                return (o.removeChild(t), { baseline: i, middle: s });
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
          gi = function (A, e) {
            ((this.context = A), (this.options = e));
          },
          Qi = (function (A) {
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
                (r.fontMetrics = new ui(document)),
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
                  Po(A) && (this.path(A.path), this.ctx.clip()),
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
                          wr(A.container.flags, 16),
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
                  t = Ui(A.fontFamily).join(", "),
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
                    i,
                    s,
                    B,
                    a,
                    c = this;
                  return n(this, function (n) {
                    return (
                      (t = this.createFontStyle(e)),
                      (r = t[1]),
                      (o = t[2]),
                      (this.ctx.font = t[0]),
                      (this.ctx.direction = 1 === e.direction ? "rtl" : "ltr"),
                      (this.ctx.textAlign = "left"),
                      (this.ctx.textBaseline = "alphabetic"),
                      (i = this.fontMetrics.getMetrics(r, o)),
                      (s = i.baseline),
                      (B = i.middle),
                      (a = e.paintOrder),
                      A.textBounds.forEach(function (A) {
                        a.forEach(function (t) {
                          switch (t) {
                            case 0:
                              ((c.ctx.fillStyle = he(e.color)),
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
                                    ((c.ctx.shadowColor = he(t.color)),
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
                                  ((c.ctx.fillStyle = he(
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
                                          Math.ceil(A.bounds.top + B),
                                          A.bounds.width,
                                          1,
                                        );
                                    }
                                  })));
                              break;
                            case 1:
                              (e.webkitTextStrokeWidth &&
                                A.text.trim().length &&
                                ((c.ctx.strokeStyle = he(
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
                  var r = ni(A),
                    n = Yo(e);
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
                  var e, r, o, s, B, a, c, l, u, g, Q, w, d, C, F, U;
                  return n(this, function (n) {
                    switch (n.label) {
                      case 0:
                        (this.applyEffects(A.getEffects(4)),
                          (r = A.curves),
                          (o = (e = A.container).styles),
                          (s = 0),
                          (B = e.textNodes),
                          (n.label = 1));
                      case 1:
                        return s < B.length
                          ? [4, this.renderTextNode(B[s], o)]
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
                        return e instanceof bn && e.tree
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
                          (e instanceof fn &&
                            ((c = Math.min(e.bounds.width, e.bounds.height)),
                            e.type === Cn
                              ? e.checked &&
                                (this.ctx.save(),
                                this.path([
                                  new No(
                                    e.bounds.left + 0.39363 * c,
                                    e.bounds.top + 0.79 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.16 * c,
                                    e.bounds.top + 0.5549 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.27347 * c,
                                    e.bounds.top + 0.44071 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.39694 * c,
                                    e.bounds.top + 0.5649 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.72983 * c,
                                    e.bounds.top + 0.23 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.84 * c,
                                    e.bounds.top + 0.34085 * c,
                                  ),
                                  new No(
                                    e.bounds.left + 0.39363 * c,
                                    e.bounds.top + 0.79 * c,
                                  ),
                                ]),
                                (this.ctx.fillStyle = he(Un)),
                                this.ctx.fill(),
                                this.ctx.restore())
                              : e.type === Fn &&
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
                                (this.ctx.fillStyle = he(Un)),
                                this.ctx.fill(),
                                this.ctx.restore())),
                          wi(e) && e.value.length)
                        ) {
                          switch (
                            ((l = this.createFontStyle(o)),
                            (u = this.fontMetrics.getMetrics(
                              (F = l[0]),
                              l[1],
                            ).baseline),
                            (this.ctx.font = F),
                            (this.ctx.fillStyle = he(o.color)),
                            (this.ctx.textBaseline = "alphabetic"),
                            (this.ctx.textAlign = Ci(e.styles.textAlign)),
                            (U = ni(e)),
                            (g = 0),
                            e.styles.textAlign)
                          ) {
                            case 1:
                              g += U.width / 2;
                              break;
                            case 2:
                              g += U.width;
                          }
                          ((Q = U.add(g, 0, 0, -U.height / 2 + 1)),
                            this.ctx.save(),
                            this.path([
                              new No(U.left, U.top),
                              new No(U.left + U.width, U.top),
                              new No(U.left + U.width, U.top + U.height),
                              new No(U.left, U.top + U.height),
                            ]),
                            this.ctx.clip(),
                            this.renderTextWithLetterSpacing(
                              new en(e.value, Q),
                              o.letterSpacing,
                              u,
                            ),
                            this.ctx.restore(),
                            (this.ctx.textBaseline = "alphabetic"),
                            (this.ctx.textAlign = "left"));
                        }
                        if (!wr(e.styles.display, 2048)) return [3, 20];
                        if (null === e.styles.listStyleImage) return [3, 19];
                        if (0 !== (w = e.styles.listStyleImage).type)
                          return [3, 18];
                        ((d = void 0), (C = w.url), (n.label = 15));
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
                          ((F = this.createFontStyle(o)[0]),
                          (this.ctx.font = F),
                          (this.ctx.fillStyle = he(o.color)),
                          (this.ctx.textBaseline = "middle"),
                          (this.ctx.textAlign = "right"),
                          (U = new i(
                            e.bounds.left,
                            e.bounds.top +
                              ue(e.styles.paddingTop, e.bounds.width),
                            e.bounds.width,
                            Gt(o.lineHeight, o.fontSize.number) / 2 + 1,
                          )),
                          this.renderTextWithLetterSpacing(
                            new en(A.listValue, U),
                            o.letterSpacing,
                            Gt(o.lineHeight, o.fontSize.number) / 2 + 2,
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
                  var e, t, r, o, i, s, B, a, c, l, u, g, Q, w;
                  return n(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          wr(A.element.container.flags, 16),
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
                        ((i = 0), (s = A.nonPositionedFloats), (n.label = 11));
                      case 11:
                        return i < s.length
                          ? [4, this.renderStack(s[i])]
                          : [3, 14];
                      case 12:
                        (n.sent(), (n.label = 13));
                      case 13:
                        return (i++, [3, 11]);
                      case 14:
                        ((B = 0),
                          (a = A.nonPositionedInlineLevel),
                          (n.label = 15));
                      case 15:
                        return B < a.length
                          ? [4, this.renderStack(a[B])]
                          : [3, 18];
                      case 16:
                        (n.sent(), (n.label = 17));
                      case 17:
                        return (B++, [3, 15]);
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
                        ((Q = 0), (w = A.positiveZIndex), (n.label = 27));
                      case 27:
                        return Q < w.length
                          ? [4, this.renderStack(w[Q])]
                          : [3, 30];
                      case 28:
                        (n.sent(), (n.label = 29));
                      case 29:
                        return (Q++, [3, 27]);
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
                  var r = Ro(A) ? A.start : A;
                  (0 === t ? e.ctx.moveTo(r.x, r.y) : e.ctx.lineTo(r.x, r.y),
                    Ro(A) &&
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
                  var e, t, r, o, i;
                  return n(this, function (s) {
                    switch (s.label) {
                      case 0:
                        ((e = A.styles.backgroundImage.length - 1),
                          (t = function (t) {
                            var o,
                              i,
                              s,
                              B,
                              a,
                              c,
                              l,
                              u,
                              g,
                              Q,
                              w,
                              d,
                              C,
                              F,
                              U,
                              f,
                              h,
                              p,
                              b,
                              m,
                              I,
                              H,
                              y,
                              E,
                              v,
                              L,
                              x,
                              G,
                              D,
                              K,
                              Z;
                            return n(this, function (n) {
                              switch (n.label) {
                                case 0:
                                  if (0 !== t.type) return [3, 5];
                                  ((o = void 0), (i = t.url), (n.label = 1));
                                case 1:
                                  return (
                                    n.trys.push([1, 3, , 4]),
                                    [4, r.context.cache.match(i)]
                                  );
                                case 2:
                                  return ((o = n.sent()), [3, 4]);
                                case 3:
                                  return (
                                    n.sent(),
                                    r.context.logger.error(
                                      "Error loading background-image " + i,
                                    ),
                                    [3, 4]
                                  );
                                case 4:
                                  return (
                                    o &&
                                      ((s = oi(A, e, [
                                        o.width,
                                        o.height,
                                        o.width / o.height,
                                      ])),
                                      (f = s[0]),
                                      (H = s[1]),
                                      (y = s[2]),
                                      (F = r.ctx.createPattern(
                                        r.resizeImage(
                                          o,
                                          (b = s[3]),
                                          (m = s[4]),
                                        ),
                                        "repeat",
                                      )),
                                      r.renderRepeat(f, F, H, y)),
                                    [3, 6]
                                  );
                                case 5:
                                  (1 === t.type
                                    ? ((B = oi(A, e, [null, null, null])),
                                      (f = B[0]),
                                      (H = B[1]),
                                      (y = B[2]),
                                      (a = (function (A, e, t) {
                                        var r =
                                            "number" == typeof A
                                              ? A
                                              : (function (A, e, t) {
                                                  var r = e / 2,
                                                    n = t / 2,
                                                    o = ue(A[0], e) - r,
                                                    i = n - ue(A[1], t);
                                                  return (
                                                    (Math.atan2(i, o) +
                                                      2 * Math.PI) %
                                                    (2 * Math.PI)
                                                  );
                                                })(A, e, t),
                                          n =
                                            Math.abs(e * Math.sin(r)) +
                                            Math.abs(t * Math.cos(r)),
                                          o = e / 2,
                                          i = t / 2,
                                          s = n / 2,
                                          B = Math.sin(r - Math.PI / 2) * s,
                                          a = Math.cos(r - Math.PI / 2) * s;
                                        return [n, o - a, o + a, i - B, i + B];
                                      })(t.angle, (b = B[3]), (m = B[4]))),
                                      (c = a[0]),
                                      (l = a[1]),
                                      (u = a[2]),
                                      (g = a[3]),
                                      (Q = a[4]),
                                      ((w =
                                        document.createElement(
                                          "canvas",
                                        )).width = b),
                                      (w.height = m),
                                      (d = w.getContext("2d")),
                                      (C = d.createLinearGradient(l, g, u, Q)),
                                      Ke(t.stops, c).forEach(function (A) {
                                        return C.addColorStop(
                                          A.stop,
                                          he(A.color),
                                        );
                                      }),
                                      (d.fillStyle = C),
                                      d.fillRect(0, 0, b, m),
                                      b > 0 &&
                                        m > 0 &&
                                        ((F = r.ctx.createPattern(w, "repeat")),
                                        r.renderRepeat(f, F, H, y)))
                                    : 2 === t.type &&
                                      ((U = oi(A, e, [null, null, null])),
                                      (f = U[0]),
                                      (h = U[1]),
                                      (p = U[2]),
                                      (m = U[4]),
                                      (H = ue(
                                        (I =
                                          0 === t.position.length
                                            ? [ae]
                                            : t.position)[0],
                                        (b = U[3]),
                                      )),
                                      (y = ue(I[I.length - 1], m)),
                                      (E = (function (A, e, t, r, n) {
                                        var o = 0,
                                          i = 0;
                                        switch (A.size) {
                                          case 0:
                                            0 === A.shape
                                              ? (o = i =
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
                                                (i = Math.min(
                                                  Math.abs(t),
                                                  Math.abs(t - n),
                                                )));
                                            break;
                                          case 2:
                                            if (0 === A.shape)
                                              o = i = Math.min(
                                                Ze(e, t),
                                                Ze(e, t - n),
                                                Ze(e - r, t),
                                                Ze(e - r, t - n),
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
                                                B = ke(r, n, e, t, !0);
                                              i =
                                                s *
                                                (o = Ze(
                                                  B[0] - e,
                                                  (B[1] - t) / s,
                                                ));
                                            }
                                            break;
                                          case 1:
                                            0 === A.shape
                                              ? (o = i =
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
                                                (i = Math.max(
                                                  Math.abs(t),
                                                  Math.abs(t - n),
                                                )));
                                            break;
                                          case 3:
                                            if (0 === A.shape)
                                              o = i = Math.max(
                                                Ze(e, t),
                                                Ze(e, t - n),
                                                Ze(e - r, t),
                                                Ze(e - r, t - n),
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
                                              var a = ke(r, n, e, t, !1);
                                              i =
                                                s *
                                                (o = Ze(
                                                  a[0] - e,
                                                  (a[1] - t) / s,
                                                ));
                                            }
                                        }
                                        return (
                                          Array.isArray(A.size) &&
                                            ((o = ue(A.size[0], r)),
                                            (i =
                                              2 === A.size.length
                                                ? ue(A.size[1], n)
                                                : o)),
                                          [o, i]
                                        );
                                      })(t, H, y, b, m)),
                                      (L = E[1]),
                                      (v = E[0]) > 0 &&
                                        L > 0 &&
                                        ((x = r.ctx.createRadialGradient(
                                          h + H,
                                          p + y,
                                          0,
                                          h + H,
                                          p + y,
                                          v,
                                        )),
                                        Ke(t.stops, 2 * v).forEach(
                                          function (A) {
                                            return x.addColorStop(
                                              A.stop,
                                              he(A.color),
                                            );
                                          },
                                        ),
                                        r.path(f),
                                        (r.ctx.fillStyle = x),
                                        v !== L
                                          ? ((G =
                                              A.bounds.left +
                                              0.5 * A.bounds.width),
                                            (D =
                                              A.bounds.top +
                                              0.5 * A.bounds.height),
                                            (Z = 1 / (K = L / v)),
                                            r.ctx.save(),
                                            r.ctx.translate(G, D),
                                            r.ctx.transform(1, 0, 0, K, 0, 0),
                                            r.ctx.translate(-G, -D),
                                            r.ctx.fillRect(
                                              h,
                                              Z * (p - D) + D,
                                              b,
                                              m * Z,
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
                          (i = A.styles.backgroundImage.slice(0).reverse()),
                          (s.label = 1));
                      case 1:
                        return o < i.length ? [5, t(i[o])] : [3, 4];
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
                      this.path(Ai(t, e)),
                      (this.ctx.fillStyle = he(A)),
                      this.ctx.fill(),
                      [2]
                    );
                  });
                });
              }),
              (t.prototype.renderDoubleBorder = function (A, e, t, o) {
                return r(this, void 0, void 0, function () {
                  var r, i;
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
                                return ti(
                                  A.topLeftBorderBox,
                                  A.topLeftBorderDoubleOuterBox,
                                  A.topRightBorderBox,
                                  A.topRightBorderDoubleOuterBox,
                                );
                              case 1:
                                return ti(
                                  A.topRightBorderBox,
                                  A.topRightBorderDoubleOuterBox,
                                  A.bottomRightBorderBox,
                                  A.bottomRightBorderDoubleOuterBox,
                                );
                              case 2:
                                return ti(
                                  A.bottomRightBorderBox,
                                  A.bottomRightBorderDoubleOuterBox,
                                  A.bottomLeftBorderBox,
                                  A.bottomLeftBorderDoubleOuterBox,
                                );
                              default:
                                return ti(
                                  A.bottomLeftBorderBox,
                                  A.bottomLeftBorderDoubleOuterBox,
                                  A.topLeftBorderBox,
                                  A.topLeftBorderDoubleOuterBox,
                                );
                            }
                          })(o, t)),
                          this.path(r),
                          (this.ctx.fillStyle = he(A)),
                          this.ctx.fill(),
                          (i = (function (A, e) {
                            switch (e) {
                              case 0:
                                return ti(
                                  A.topLeftBorderDoubleInnerBox,
                                  A.topLeftPaddingBox,
                                  A.topRightBorderDoubleInnerBox,
                                  A.topRightPaddingBox,
                                );
                              case 1:
                                return ti(
                                  A.topRightBorderDoubleInnerBox,
                                  A.topRightPaddingBox,
                                  A.bottomRightBorderDoubleInnerBox,
                                  A.bottomRightPaddingBox,
                                );
                              case 2:
                                return ti(
                                  A.bottomRightBorderDoubleInnerBox,
                                  A.bottomRightPaddingBox,
                                  A.bottomLeftBorderDoubleInnerBox,
                                  A.bottomLeftPaddingBox,
                                );
                              default:
                                return ti(
                                  A.bottomLeftBorderDoubleInnerBox,
                                  A.bottomLeftPaddingBox,
                                  A.topLeftBorderDoubleInnerBox,
                                  A.topLeftPaddingBox,
                                );
                            }
                          })(o, t)),
                          this.path(i),
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
                    i,
                    s,
                    B,
                    a,
                    c = this;
                  return n(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          this.applyEffects(A.getEffects(2)),
                          (t =
                            !fe((e = A.container.styles).backgroundColor) ||
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
                          (o = di(ai(e.backgroundClip, 0), A.curves)),
                          t || e.boxShadow.length
                            ? (this.ctx.save(),
                              this.path(o),
                              this.ctx.clip(),
                              fe(e.backgroundColor) ||
                                ((this.ctx.fillStyle = he(e.backgroundColor)),
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
                                i = Mo(A.curves),
                                s = e.inset ? 0 : 1e4,
                                B =
                                  ((t =
                                    (e.inset ? 1 : -1) * e.spread.number - s),
                                  (r = (e.inset ? 1 : -1) * e.spread.number),
                                  (n = e.spread.number * (e.inset ? -2 : 2)),
                                  (o = e.spread.number * (e.inset ? -2 : 2)),
                                  i.map(function (A, e) {
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
                                ? (c.path(i), c.ctx.clip(), c.mask(B))
                                : (c.mask(i), c.ctx.clip(), c.path(B)),
                                (c.ctx.shadowOffsetX = e.offsetX.number + s),
                                (c.ctx.shadowOffsetY = e.offsetY.number),
                                (c.ctx.shadowColor = he(e.color)),
                                (c.ctx.shadowBlur = e.blur.number),
                                (c.ctx.fillStyle = e.inset
                                  ? he(e.color)
                                  : "rgba(0,0,0,1)"),
                                c.ctx.fill(),
                                c.ctx.restore());
                            }),
                          (n.label = 2));
                      case 2:
                        ((i = 0), (s = 0), (B = r), (n.label = 3));
                      case 3:
                        return s < B.length
                          ? 0 !== (a = B[s]).style &&
                            !fe(a.color) &&
                            a.width > 0
                            ? 2 !== a.style
                              ? [3, 5]
                              : [
                                  4,
                                  this.renderDashedDottedBorder(
                                    a.color,
                                    a.width,
                                    i,
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
                                i,
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
                                i,
                                A.curves,
                              ),
                            ];
                      case 8:
                        return (n.sent(), [3, 11]);
                      case 9:
                        return [
                          4,
                          this.renderSolidBorder(a.color, i, A.curves),
                        ];
                      case 10:
                        (n.sent(), (n.label = 11));
                      case 11:
                        (i++, (n.label = 12));
                      case 12:
                        return (s++, [3, 3]);
                      case 13:
                        return [2];
                    }
                  });
                });
              }),
              (t.prototype.renderDashedDottedBorder = function (A, e, t, o, i) {
                return r(this, void 0, void 0, function () {
                  var r, s, B, a, c, l, u, g, Q, w, d, C, F, U, f, h;
                  return n(this, function (n) {
                    return (
                      this.ctx.save(),
                      (r = (function (A, e) {
                        switch (e) {
                          case 0:
                            return ei(
                              A.topLeftBorderStroke,
                              A.topRightBorderStroke,
                            );
                          case 1:
                            return ei(
                              A.topRightBorderStroke,
                              A.bottomRightBorderStroke,
                            );
                          case 2:
                            return ei(
                              A.bottomRightBorderStroke,
                              A.bottomLeftBorderStroke,
                            );
                          default:
                            return ei(
                              A.bottomLeftBorderStroke,
                              A.topLeftBorderStroke,
                            );
                        }
                      })(o, t)),
                      (s = Ai(o, t)),
                      2 === i && (this.path(s), this.ctx.clip()),
                      Ro(s[0])
                        ? ((B = s[0].start.x), (a = s[0].start.y))
                        : ((B = s[0].x), (a = s[0].y)),
                      Ro(s[1])
                        ? ((c = s[1].end.x), (l = s[1].end.y))
                        : ((c = s[1].x), (l = s[1].y)),
                      (u =
                        0 === t || 2 === t ? Math.abs(B - c) : Math.abs(a - l)),
                      this.ctx.beginPath(),
                      this.formatPath(3 === i ? r : s.slice(0, 2)),
                      (g = e < 3 ? 3 * e : 2 * e),
                      (Q = e < 3 ? 2 * e : e),
                      3 === i && ((g = e), (Q = e)),
                      (w = !0),
                      u <= 2 * g
                        ? (w = !1)
                        : u <= 2 * g + Q
                          ? ((g *= d = u / (2 * g + Q)), (Q *= d))
                          : ((C = Math.floor((u + Q) / (g + Q))),
                            (F = (u - C * g) / (C - 1)),
                            (Q =
                              (U = (u - (C + 1) * g) / C) <= 0 ||
                              Math.abs(Q - F) < Math.abs(Q - U)
                                ? F
                                : U)),
                      w && this.ctx.setLineDash(3 === i ? [0, g + Q] : [g, Q]),
                      3 === i
                        ? ((this.ctx.lineCap = "round"),
                          (this.ctx.lineWidth = e))
                        : (this.ctx.lineWidth = 2 * e + 1.1),
                      (this.ctx.strokeStyle = he(A)),
                      this.ctx.stroke(),
                      this.ctx.setLineDash([]),
                      2 === i &&
                        (Ro(s[0]) &&
                          ((f = s[3]),
                          (h = s[0]),
                          this.ctx.beginPath(),
                          this.formatPath([
                            new No(f.end.x, f.end.y),
                            new No(h.start.x, h.start.y),
                          ]),
                          this.ctx.stroke()),
                        Ro(s[1]) &&
                          ((f = s[1]),
                          (h = s[2]),
                          this.ctx.beginPath(),
                          this.formatPath([
                            new No(f.end.x, f.end.y),
                            new No(h.start.x, h.start.y),
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
                            ((this.ctx.fillStyle = he(
                              this.options.backgroundColor,
                            )),
                            this.ctx.fillRect(
                              this.options.x,
                              this.options.y,
                              this.options.width,
                              this.options.height,
                            )),
                          (t = new zo(A, null)),
                          (r = new jo(t)),
                          qo(t, r, r, (n = [])),
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
          })(gi),
          wi = function (A) {
            return (
              A instanceof pn ||
              A instanceof hn ||
              (A instanceof fn && A.type !== Fn && A.type !== Cn)
            );
          },
          di = function (A, e) {
            switch (A) {
              case 0:
                return Mo(e);
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
                return Yo(e);
            }
          },
          Ci = function (A) {
            switch (A) {
              case 1:
                return "center";
              case 2:
                return "right";
              default:
                return "left";
            }
          },
          Fi = ["-apple-system", "system-ui"],
          Ui = function (A) {
            return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
              ? A.filter(function (A) {
                  return -1 === Fi.indexOf(A);
                })
              : A;
          },
          fi = (function (A) {
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
                          (e = qr(
                            this.options.width * this.options.scale,
                            this.options.height * this.options.scale,
                            this.options.scale,
                            this.options.scale,
                            A,
                          )),
                          [4, hi(e)]
                        );
                      case 1:
                        return (
                          (t = r.sent()),
                          this.options.backgroundColor &&
                            ((this.ctx.fillStyle = he(
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
          })(gi),
          hi = function (A) {
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
          pi = (function () {
            function A(A) {
              var e = A.enabled;
              ((this.id = A.id), (this.enabled = e), (this.start = Date.now()));
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
          bi = (function () {
            function A(e, t) {
              var r;
              ((this.windowBounds = t),
                (this.instanceName = "#" + A.instanceCount++),
                (this.logger = new pi({
                  id: this.instanceName,
                  enabled: e.logging,
                })),
                (this.cache =
                  null !== (r = e.cache) && void 0 !== r
                    ? r
                    : new Eo(this, e)));
            }
            return ((A.instanceCount = 1), A);
          })();
        return (
          "undefined" != typeof window && yo.setContext(window),
          function (A, e) {
            return (
              void 0 === e && (e = {}),
              (function (A, e) {
                return r(void 0, void 0, void 0, function () {
                  var r,
                    o,
                    B,
                    a,
                    c,
                    l,
                    u,
                    g,
                    Q,
                    w,
                    d,
                    C,
                    F,
                    U,
                    f,
                    h,
                    p,
                    b,
                    m,
                    I,
                    H,
                    y,
                    E,
                    v,
                    L,
                    x,
                    G,
                    D,
                    K,
                    Z,
                    k,
                    N,
                    W,
                    V,
                    R,
                    S,
                    X,
                    M;
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
                          (B = {
                            allowTaint:
                              null !== (y = e.allowTaint) && void 0 !== y && y,
                            imageTimeout:
                              null !== (E = e.imageTimeout) && void 0 !== E
                                ? E
                                : 15e3,
                            proxy: e.proxy,
                            useCORS:
                              null !== (v = e.useCORS) && void 0 !== v && v,
                          }),
                          (a = t(
                            {
                              logging:
                                null === (L = e.logging) || void 0 === L || L,
                              cache: e.cache,
                            },
                            B,
                          )),
                          (c = {
                            windowWidth:
                              null !== (x = e.windowWidth) && void 0 !== x
                                ? x
                                : o.innerWidth,
                            windowHeight:
                              null !== (G = e.windowHeight) && void 0 !== G
                                ? G
                                : o.innerHeight,
                            scrollX:
                              null !== (D = e.scrollX) && void 0 !== D
                                ? D
                                : o.pageXOffset,
                            scrollY:
                              null !== (K = e.scrollY) && void 0 !== K
                                ? K
                                : o.pageYOffset,
                          }),
                          (l = new i(
                            c.scrollX,
                            c.scrollY,
                            c.windowWidth,
                            c.windowHeight,
                          )),
                          (u = new bi(a, l)),
                          (g =
                            null !== (Z = e.foreignObjectRendering) &&
                            void 0 !== Z &&
                            Z),
                          (Q = {
                            allowTaint:
                              null !== (k = e.allowTaint) && void 0 !== k && k,
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
                          (w = new co(u, A, Q)),
                          (d = w.clonedReferenceElement)
                            ? [4, w.toIFrame(r, l)]
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
                          (F =
                            Wn(d) || "HTML" === d.tagName
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
                                      Math.max(e.scrollHeight, t.scrollHeight),
                                      Math.max(e.offsetHeight, t.offsetHeight),
                                      Math.max(e.clientHeight, t.clientHeight),
                                    );
                                  return new i(0, 0, r, n);
                                })(d.ownerDocument)
                              : s(u, d)),
                          (U = F.width),
                          (f = F.height),
                          (h = F.left),
                          (p = F.top),
                          (b = (function (A, e, t) {
                            var r = e.ownerDocument,
                              n = r.documentElement
                                ? ve(
                                    A,
                                    getComputedStyle(r.documentElement)
                                      .backgroundColor,
                                  )
                                : Le.TRANSPARENT,
                              o = r.body
                                ? ve(
                                    A,
                                    getComputedStyle(r.body).backgroundColor,
                                  )
                                : Le.TRANSPARENT,
                              i =
                                "string" == typeof t
                                  ? ve(A, t)
                                  : null === t
                                    ? Le.TRANSPARENT
                                    : 4294967295;
                            return e === r.documentElement
                              ? fe(n)
                                ? fe(o)
                                  ? i
                                  : o
                                : n
                              : i;
                          })(u, d, e.backgroundColor)),
                          (m = {
                            canvas: e.canvas,
                            backgroundColor: b,
                            scale:
                              null !==
                                (W =
                                  null !== (N = e.scale) && void 0 !== N
                                    ? N
                                    : o.devicePixelRatio) && void 0 !== W
                                ? W
                                : 1,
                            x: (null !== (V = e.x) && void 0 !== V ? V : 0) + h,
                            y: (null !== (R = e.y) && void 0 !== R ? R : 0) + p,
                            width:
                              null !== (S = e.width) && void 0 !== S
                                ? S
                                : Math.ceil(U),
                            height:
                              null !== (X = e.height) && void 0 !== X
                                ? X
                                : Math.ceil(f),
                          }),
                          g
                            ? (u.logger.debug(
                                "Document cloned, using foreign object rendering",
                              ),
                              [4, new fi(u, m).render(d)])
                            : [3, 3]
                        );
                      case 2:
                        return ((I = n.sent()), [3, 5]);
                      case 3:
                        return (
                          u.logger.debug(
                            "Document cloned, element located at " +
                              h +
                              "," +
                              p +
                              " with size " +
                              U +
                              "x" +
                              f +
                              " using computed rendering",
                          ),
                          u.logger.debug("Starting DOM parsing"),
                          (H = yn(u, d)),
                          b === H.styles.backgroundColor &&
                            (H.styles.backgroundColor = Le.TRANSPARENT),
                          u.logger.debug(
                            "Starting renderer for element at " +
                              m.x +
                              "," +
                              m.y +
                              " with size " +
                              m.width +
                              "x" +
                              m.height,
                          ),
                          [4, new Qi(u, m).render(H)]
                        );
                      case 4:
                        ((I = n.sent()), (n.label = 5));
                      case 5:
                        return (
                          (null === (M = e.removeContainer) ||
                            void 0 === M ||
                            M) &&
                            (co.destroy(C) ||
                              u.logger.error(
                                "Cannot detach cloned iframe as it is not in the DOM anymore",
                              )),
                          u.logger.debug("Finished rendering"),
                          [2, I]
                        );
                    }
                  });
                });
              })(A, e)
            );
          }
        );
      })();
    }),
    jA((zA = { exports: {} })),
    zA.exports);
let $A = null;
const Ae = { url: "", user: {}, disableErrorAlert: !1, theme: "auto" };
function ee() {
  var e;
  return A({}, Ae, null == (e = window.feedbackfin) ? void 0 : e.config);
}
function te() {
  const A = document.createElement("style");
  ((A.id = "feedbackfin__css"),
    (A.innerHTML =
      ':root{--feedbackfin-bg-color:#fff;--feedbackfin-text-color:240,100%,10%;--feedbackfin-shadow:rgba(7,0,20,.06) 0px 0px 0px 1px,rgba(7,0,20,.1) 0px 10px 15px -3px,rgba(7,0,20,.05) 0px 4px 6px,rgba(7,0,20,.05) 0px 30px 40px;--feedbackfin-border-radius:1rem;--feedbackfin-title-weight:600;--feedbackfin-button-weight:500;--feedbackfin-button-opacity:0.04;--feedbackfin-button-opacity-hover:0.08;--feedbackfin-button-opacity-active:0.12;--feedbackfin-button-transition:background-color 0.2s ease-in-out,opacity 0.2s ease-in-out,transform 0.2s ease-in-out;--feedbackfin-icon-button-opacity:0.38;--feedbackfin-primary-color:#6a35ff;--feedbackfin-primary-color-text:#fff;--feedbackfin-outline-opacity:0.12;--feedbackfin-focus-color:var(--feedbackfin-primary-color);--feedbackfin-focus-shadow:0 0 0 2px var(--feedbackfin-bg-color),0 0 0 4px var(--feedbackfin-focus-color)}@media (prefers-color-scheme:dark){:root{--feedbackfin-bg-color:#2d2d30;--feedbackfin-text-color:240,10%,90%;--feedbackfin-shadow:rgba(0,0,5,.24) 0px 0px 0px 1px,rgba(0,0,5,.4) 0px 10px 15px -3px,rgba(0,0,5,.2) 0px 4px 6px,rgba(0,0,5,.2) 0px 30px 40px;--feedbackfin-button-opacity:0.08;--feedbackfin-button-opacity-hover:0.12;--feedbackfin-button-opacity-active:0.16;--feedbackfin-icon-button-opacity:0.5;--feedbackfin-outline-opacity:0.2;--feedbackfin-focus-shadow:0 0 0 2px var(--feedbackfin-bg-color),0 0 0 4px var(--feedbackfin-focus-color)}}[data-theme*=dark]{--feedbackfin-bg-color:#2d2d30;--feedbackfin-text-color:240,10%,90%;--feedbackfin-shadow:rgba(0,0,5,.24) 0px 0px 0px 1px,rgba(0,0,5,.4) 0px 10px 15px -3px,rgba(0,0,5,.2) 0px 4px 6px,rgba(0,0,5,.2) 0px 30px 40px;--feedbackfin-button-opacity:0.08;--feedbackfin-button-opacity-hover:0.12;--feedbackfin-button-opacity-active:0.16;--feedbackfin-icon-button-opacity:0.5;--feedbackfin-outline-opacity:0.2;--feedbackfin-focus-shadow:0 0 0 2px var(--feedbackfin-bg-color),0 0 0 4px var(--feedbackfin-focus-color)}#feedbackfin__container[data-theme=light]{--feedbackfin-bg-color:#fff;--feedbackfin-text-color:240,100%,10%;--feedbackfin-shadow:rgba(7,0,20,.06) 0px 0px 0px 1px,rgba(7,0,20,.1) 0px 10px 15px -3px,rgba(7,0,20,.05) 0px 4px 6px,rgba(7,0,20,.05) 0px 30px 40px;--feedbackfin-button-opacity:0.04;--feedbackfin-button-opacity-hover:0.08;--feedbackfin-button-opacity-active:0.12;--feedbackfin-icon-button-opacity:0.38;--feedbackfin-outline-opacity:0.12;--feedbackfin-focus-shadow:0 0 0 2px var(--feedbackfin-bg-color),0 0 0 4px var(--feedbackfin-focus-color)}#feedbackfin__container{background-color:var(--feedbackfin-bg-color);border-radius:var(--feedbackfin-border-radius);box-shadow:var(--feedbackfin-shadow);box-sizing:border-box;color:hsl(var(--feedbackfin-text-color));font-family:inherit;font-size:1rem;height:auto;min-height:15rem;padding:.75rem 1rem;position:fixed;transition:opacity .5s ease;width:19rem;z-index:9999}#feedbackfin__container *{box-sizing:border-box}#feedbackfin__container :focus{outline:none}#feedbackfin__container :focus-visible{box-shadow:var(--feedbackfin-focus-shadow);outline:none}.feedbackfin__button{align-items:center;background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity));border:none;border-radius:calc(var(--feedbackfin-border-radius)/2);color:inherit;cursor:pointer;display:flex;font:inherit;font-weight:var(--feedbackfin-button-weight);justify-content:center;line-height:2rem;min-height:2rem;overflow:hidden;padding:0;transition:var(--feedbackfin-button-transition)}.feedbackfin__button:focus-visible,.feedbackfin__button:hover{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-hover))}.feedbackfin__button:active{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-active));transform:scale(.97);transition-duration:0s}.feedbackfin__icon-button{align-items:center;background:none;border:none;border-radius:50%;color:inherit;cursor:pointer;display:flex;font-size:1.25rem;height:2.5rem;justify-content:center;opacity:var(--feedbackfin-icon-button-opacity);overflow:hidden;padding:0;transition:var(--feedbackfin-button-transition);width:2.5rem}.feedbackfin__icon-button:focus-visible,.feedbackfin__icon-button:hover{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-hover));opacity:1}.feedbackfin__icon-button:active{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-active));opacity:1;transform:scale(.9);transition-duration:0s}#feedbackfin__close{position:absolute;right:.25rem;top:.25rem;z-index:1}#feedbackfin__form{position:relative;width:100%}#feedbackfin__title{color:hsl(var(--feedbackfin-text-color));font-size:1.25rem;font-weight:var(--feedbackfin-title-weight);line-height:normal;margin:0 0 .75rem;text-align:center}#feedbackfin__radio-group{display:flex;gap:.5rem}.feedbackfin__radio{opacity:0;position:fixed;width:0}.feedbackfin__radio-label{flex-direction:column;gap:.5rem .25rem;height:7.5rem;line-height:1;margin:1rem 0;width:100%}.feedbackfin__radio:focus+.feedbackfin__radio-label{box-shadow:var(--feedbackfin-focus-shadow)}.feedbackfin__radio-icon{font-size:3rem;margin-bottom:.5rem}#feedbackfin__container[data-feedback-type] .feedbackfin__radio-label{border:2px solid transparent;flex-direction:row;height:2rem;margin:0 0 .5rem}#feedbackfin__container[data-feedback-type] .feedbackfin__radio:checked+.feedbackfin__radio-label{border-color:hsla(var(--feedbackfin-text-color),.5)}#feedbackfin__container[data-feedback-type] .feedbackfin__radio:checked:focus+.feedbackfin__radio-label{border-color:transparent}#feedbackfin__container[data-feedback-type] .feedbackfin__radio-icon{font-size:inherit;margin:0}#feedbackfin__step2{display:none;flex-direction:column;gap:.5rem}#feedbackfin__container[data-feedback-type] #feedbackfin__step2{display:flex}#feedbackfin__reset{left:.25rem;position:absolute;top:-2.25rem}#feedbackfin__message{background:none;border:2px solid hsla(var(--feedbackfin-text-color),var(--feedbackfin-outline-opacity));border-radius:calc(var(--feedbackfin-border-radius)/2);color:inherit;font:inherit;min-height:5rem;padding:.5rem;resize:none}#feedbackfin__message:focus{border-color:var(--feedbackfin-focus-color);box-shadow:none}#feedbackfin__submit{background-color:var(--feedbackfin-primary-color);color:var(--feedbackfin-primary-color-text);position:relative}#feedbackfin__submit:active,#feedbackfin__submit:focus-visible,#feedbackfin__submit:hover{background-color:var(--feedbackfin-primary-color)}#feedbackfin__submit:before{background-color:var(--feedbackfin-primary-color-text);border-radius:inherit;bottom:0;content:"";display:block;left:0;opacity:0;position:absolute;right:0;top:0;transition:var(--feedbackfin-button-transition)}#feedbackfin__submit:focus-visible:before,#feedbackfin__submit:hover:before{opacity:var(--feedbackfin-button-opacity-hover)}#feedbackfin__submit:active:before{opacity:var(--feedbackfin-button-opacity-active)}#feedbackfin__submit[disabled]{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-hover));color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-icon-button-opacity));cursor:default}#feedbackfin__submit[disabled]:before{content:none}#feedbackfin__actions{align-items:center;display:flex;gap:.5rem}#feedbackfin__actions #feedbackfin__submit{flex:1}#feedbackfin__screenshot-btn{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity));border-radius:calc(var(--feedbackfin-border-radius)/2);flex-shrink:0;height:2rem;opacity:1;overflow:visible;position:relative;width:2.5rem}#feedbackfin__screenshot-btn:focus-visible,#feedbackfin__screenshot-btn:hover{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-hover))}#feedbackfin__screenshot-btn:active{background-color:hsla(var(--feedbackfin-text-color),var(--feedbackfin-button-opacity-active));transform:scale(.95)}#feedbackfin__screenshot-badge{align-items:center;background-color:var(--feedbackfin-primary-color);border-radius:50%;color:var(--feedbackfin-primary-color-text);display:flex;font-size:.75rem;font-weight:600;height:1rem;justify-content:center;line-height:1;position:absolute;right:-.35rem;top:-.35rem;width:1rem}#feedbackfin__container[data-has-screenshot] #feedbackfin__screenshot-btn{display:none}#feedbackfin__screenshot-preview{display:none;flex-shrink:0;height:2rem;position:relative;width:2.5rem}#feedbackfin__container[data-has-screenshot] #feedbackfin__screenshot-preview{display:block}#feedbackfin__screenshot-link{background:none;border:none;border-radius:calc(var(--feedbackfin-border-radius)/2);cursor:pointer;display:block;height:100%;overflow:hidden;padding:0;width:100%}#feedbackfin__screenshot-img{display:block;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:top left;object-position:top left;width:100%}#feedbackfin__screenshot-remove{align-items:center;background-color:#e53935;border:none;border-radius:50%;color:#fff;cursor:pointer;display:flex;height:1rem;justify-content:center;padding:0;position:absolute;right:-.35rem;top:-.35rem;transition:background-color .15s ease,transform .15s ease;width:1rem}#feedbackfin__screenshot-remove:hover{background-color:#c62828;transform:scale(1.1)}#feedbackfin__screenshot-remove:focus-visible{box-shadow:0 0 0 2px var(--feedbackfin-bg-color),0 0 0 4px #e53935}#feedbackfin__success{align-items:center;display:none;flex-direction:column;font-size:1.25rem;font-weight:var(--feedbackfin-title-weight);height:100%;justify-content:center;text-align:center}#feedbackfin__check{stroke:var(--feedbackfin-primary-color);stroke-dasharray:18;animation:feedbackfin__draw-check .3s ease-out .1s both}@keyframes feedbackfin__draw-check{0%{stroke-dashoffset:18}to{stroke-dashoffset:0}}#feedbackfin__container[data-success] #feedbackfin__form{display:none}#feedbackfin__container[data-success] #feedbackfin__success{display:flex}#feedbackfin__branding{bottom:.5rem;font-size:.6875em;left:0;position:absolute;right:0;text-align:center}#feedbackfin__branding a{border-radius:calc(var(--feedbackfin-border-radius)/4);color:inherit;opacity:var(--feedbackfin-icon-button-opacity);text-decoration:none;transition:var(--feedbackfin-button-transition)}#feedbackfin__branding a:focus-visible,#feedbackfin__branding a:hover{opacity:calc(var(--feedbackfin-icon-button-opacity)*2)}#feedbackfin__branding a:active{opacity:calc(var(--feedbackfin-icon-button-opacity)*.75);transition-duration:0s}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQ0UsMkJBQTRCLENBQzVCLHFDQUF3QyxDQUN4QyxvSkFHb0MsQ0FDcEMsZ0NBQWlDLENBRWpDLDhCQUErQixDQUMvQiwrQkFBZ0MsQ0FFaEMsaUNBQWtDLENBQ2xDLHVDQUF3QyxDQUN4Qyx3Q0FBeUMsQ0FDekMscUhBRTRCLENBQzVCLHNDQUF1QyxDQUV2QyxtQ0FBb0MsQ0FDcEMscUNBQXNDLENBRXRDLGtDQUFtQyxDQUNuQywwREFBMkQsQ0FDM0QseUdBR0YsQ0FFQSxtQ0FDRSxNQUNFLDhCQUErQixDQUMvQixvQ0FBdUMsQ0FDdkMsOElBR2tDLENBRWxDLGlDQUFrQyxDQUNsQyx1Q0FBd0MsQ0FDeEMsd0NBQXlDLENBQ3pDLHFDQUFzQyxDQUV0QyxpQ0FBa0MsQ0FDbEMseUdBR0YsQ0FDRixDQUNBLG1CQUNFLDhCQUErQixDQUMvQixvQ0FBdUMsQ0FDdkMsOElBRWtFLENBRWxFLGlDQUFrQyxDQUNsQyx1Q0FBd0MsQ0FDeEMsd0NBQXlDLENBQ3pDLHFDQUFzQyxDQUV0QyxpQ0FBa0MsQ0FDbEMseUdBR0YsQ0FDQSwwQ0FDRSwyQkFBNEIsQ0FDNUIscUNBQXdDLENBQ3hDLG9KQUdvQyxDQUVwQyxpQ0FBa0MsQ0FDbEMsdUNBQXdDLENBQ3hDLHdDQUF5QyxDQUN6QyxzQ0FBdUMsQ0FFdkMsa0NBQW1DLENBQ25DLHlHQUdGLENBRUEsd0JBU0UsNENBQTZDLENBRTdDLDhDQUErQyxDQUQvQyxvQ0FBcUMsQ0FIckMscUJBQXNCLENBVXRCLHdDQUF5QyxDQUZ6QyxtQkFBb0IsQ0FDcEIsY0FBZSxDQVZmLFdBQVksQ0FEWixnQkFBaUIsQ0FRakIsbUJBQXFCLENBWnJCLGNBQWUsQ0FrQmYsMkJBQTZCLENBZjdCLFdBQVksQ0FGWixZQWtCRixDQUVBLDBCQUNFLHFCQUNGLENBQ0EsK0JBQ0UsWUFDRixDQUNBLHVDQUVFLDBDQUEyQyxDQUQzQyxZQUVGLENBRUEscUJBWUUsa0JBQW1CLENBWG5CLHNGQUdDLENBQ0QsV0FBWSxDQUNaLHNEQUF5RCxDQVd6RCxhQUFjLENBVGQsY0FBZSxDQUVmLFlBQWEsQ0FLYixZQUFhLENBQ2IsNENBQTZDLENBTDdDLHNCQUF1QixDQVF2QixnQkFBaUIsQ0FEakIsZUFBZ0IsQ0FMaEIsZUFBZ0IsQ0FOaEIsU0FBVSxDQWNWLCtDQUNGLENBQ0EsOERBRUUsNEZBSUYsQ0FDQSw0QkFDRSw2RkFHQyxDQUNELG9CQUFzQixDQUN0QixzQkFDRixDQUVBLDBCQVlFLGtCQUFtQixDQVJuQixlQUFnQixDQUNoQixXQUFZLENBQ1osaUJBQWtCLENBVWxCLGFBQWMsQ0FSZCxjQUFlLENBRWYsWUFBYSxDQUtiLGlCQUFrQixDQWJsQixhQUFjLENBU2Qsc0JBQXVCLENBTXZCLDhDQUErQyxDQUovQyxlQUFnQixDQU5oQixTQUFVLENBWVYsK0NBQWdELENBbEJoRCxZQW1CRixDQUNBLHdFQUVFLDRGQUdDLENBQ0QsU0FDRixDQUNBLGlDQUNFLDZGQUdDLENBR0QsU0FBVSxDQUZWLG1CQUFxQixDQUNyQixzQkFFRixDQUVBLG9CQUNFLGlCQUFrQixDQUVsQixZQUFjLENBRGQsVUFBWSxDQUVaLFNBQ0YsQ0FFQSxtQkFDRSxpQkFBa0IsQ0FDbEIsVUFDRixDQUVBLG9CQU9FLHdDQUF5QyxDQUp6QyxpQkFBa0IsQ0FDbEIsMkNBQTRDLENBRTVDLGtCQUFtQixDQUxuQixpQkFBbUIsQ0FJbkIsaUJBR0YsQ0FFQSwwQkFDRSxZQUFhLENBQ2IsU0FDRixDQUNBLG9CQUlFLFNBQVUsQ0FGVixjQUFlLENBRGYsT0FJRixDQUNBLDBCQU1FLHFCQUFzQixDQUN0QixnQkFBbUIsQ0FMbkIsYUFBYyxDQUdkLGFBQWMsQ0FGZCxhQUFjLENBRmQsVUFPRixDQUNBLG9EQUNFLDBDQUNGLENBQ0EseUJBRUUsY0FBZSxDQURmLG1CQUVGLENBQ0Esc0VBSUUsNEJBQTZCLENBRDdCLGtCQUFtQixDQUZuQixXQUFZLENBQ1osZ0JBR0YsQ0FDQSxrR0FHRSxtREFDRixDQUNBLHdHQUdFLHdCQUNGLENBQ0EscUVBQ0UsaUJBQWtCLENBQ2xCLFFBQ0YsQ0FFQSxvQkFDRSxZQUFhLENBQ2IscUJBQXNCLENBQ3RCLFNBQ0YsQ0FDQSxnRUFDRSxZQUNGLENBRUEsb0JBR0UsV0FBYSxDQUZiLGlCQUFrQixDQUNsQixZQUVGLENBRUEsc0JBT0UsZUFBZ0IsQ0FGaEIsdUZBQ3lFLENBRnpFLHNEQUF5RCxDQU16RCxhQUFjLENBRGQsWUFBYSxDQVJiLGVBQWdCLENBVWhCLGFBQWUsQ0FUZixXQVVGLENBQ0EsNEJBQ0UsMkNBQTRDLENBQzVDLGVBQ0YsQ0FFQSxxQkFHRSxpREFBa0QsQ0FDbEQsMkNBQTRDLENBSDVDLGlCQUlGLENBQ0EsMEZBR0UsaURBQ0YsQ0FDQSw0QkFTRSxzREFBdUQsQ0FDdkQscUJBQXNCLENBSnRCLFFBQVMsQ0FMVCxVQUFXLENBQ1gsYUFBYyxDQUtkLE1BQU8sQ0FJUCxTQUFVLENBUlYsaUJBQWtCLENBRWxCLE9BQVEsQ0FEUixLQUFNLENBU04sK0NBQ0YsQ0FDQSw0RUFFRSwrQ0FDRixDQUNBLG1DQUNFLGdEQUNGLENBRUEsK0JBQ0UsNEZBR0MsQ0FDRCxnRkFHQyxDQUNELGNBQ0YsQ0FDQSxzQ0FDRSxZQUNGLENBRUEsc0JBR0Usa0JBQW1CLENBRm5CLFlBQWEsQ0FDYixTQUVGLENBRUEsMkNBQ0UsTUFDRixDQUVBLDZCQUtFLHNGQUdDLENBSkQsc0RBQXlELENBTXpELGFBQWMsQ0FQZCxXQUFZLENBTVosU0FBVSxDQUVWLGdCQUFpQixDQVZqQixpQkFBa0IsQ0FDbEIsWUFVRixDQUNBLDhFQUVFLDRGQUlGLENBQ0Esb0NBQ0UsNkZBR0MsQ0FDRCxvQkFDRixDQUVBLCtCQVFFLGtCQUFtQixDQUduQixpREFBa0QsQ0FFbEQsaUJBQWtCLENBRGxCLDJDQUE0QyxDQUw1QyxZQUFhLENBT2IsZ0JBQWtCLENBQ2xCLGVBQWdCLENBVmhCLFdBQVksQ0FJWixzQkFBdUIsQ0FPdkIsYUFBYyxDQWZkLGlCQUFrQixDQUVsQixhQUFlLENBRGYsV0FBYSxDQUViLFVBYUYsQ0FFQSwwRUFDRSxZQUNGLENBRUEsaUNBQ0UsWUFBYSxDQUliLGFBQWMsQ0FEZCxXQUFZLENBRlosaUJBQWtCLENBQ2xCLFlBR0YsQ0FFQSw4RUFDRSxhQUNGLENBRUEsOEJBU0UsZUFBZ0IsQ0FKaEIsV0FBWSxDQUNaLHNEQUF5RCxDQUV6RCxjQUFlLENBUGYsYUFBYyxDQUVkLFdBQVksQ0FJWixlQUFnQixDQUhoQixTQUFVLENBRlYsVUFRRixDQUVBLDZCQUNFLGFBQWMsQ0FFZCxXQUFZLENBQ1osbUJBQWlCLENBQWpCLGdCQUFpQixDQUNqQiwyQkFBeUIsQ0FBekIsd0JBQXlCLENBSHpCLFVBSUYsQ0FFQSxnQ0FTRSxrQkFBbUIsQ0FHbkIsd0JBQXlCLENBQ3pCLFdBQVksQ0FDWixpQkFBa0IsQ0FDbEIsVUFBVyxDQUNYLGNBQWUsQ0FSZixZQUFhLENBSGIsV0FBWSxDQUtaLHNCQUF1QixDQUp2QixTQUFVLENBTFYsaUJBQWtCLENBRWxCLGFBQWUsQ0FEZixXQUFhLENBZWIseURBRXNCLENBZnRCLFVBZ0JGLENBQ0Esc0NBQ0Usd0JBQXlCLENBQ3pCLG9CQUNGLENBQ0EsOENBQ0Usa0VBR0YsQ0FFQSxzQkFNRSxrQkFBbUIsQ0FMbkIsWUFBYSxDQUdiLHFCQUFzQixDQUl0QixpQkFBa0IsQ0FDbEIsMkNBQTRDLENBUDVDLFdBQVksQ0FHWixzQkFBdUIsQ0FLdkIsaUJBQ0YsQ0FFQSxvQkFDRSx1Q0FBd0MsQ0FDeEMsbUJBQW9CLENBRXBCLHVEQUNGLENBQ0EsbUNBQ0UsR0FDRSxvQkFDRixDQUNBLEdBQ0UsbUJBQ0YsQ0FDRixDQUVBLHlEQUNFLFlBQ0YsQ0FDQSw0REFDRSxZQUNGLENBRUEsdUJBSUUsWUFBYyxDQUVkLGlCQUFtQixDQUpuQixNQUFPLENBRFAsaUJBQWtCLENBRWxCLE9BQVEsQ0FJUixpQkFDRixDQUNBLHlCQUNFLHNEQUF5RCxDQUd6RCxhQUFjLENBRWQsOENBQStDLENBSC9DLG9CQUFxQixDQUlyQiwrQ0FDRixDQUNBLHNFQUVFLHNEQUNGLENBQ0EsZ0NBQ0Usd0RBQTRELENBQzVELHNCQUNGIiwiZmlsZSI6ImZvcm0uY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOnJvb3Qge1xuICAtLWZlZWRiYWNrZmluLWJnLWNvbG9yOiAjZmZmO1xuICAtLWZlZWRiYWNrZmluLXRleHQtY29sb3I6IDI0MCwgMTAwJSwgMTAlO1xuICAtLWZlZWRiYWNrZmluLXNoYWRvdzpcbiAgICByZ2JhKDcsIDAsIDIwLCAwLjA2KSAwcHggMHB4IDBweCAxcHgsXG4gICAgcmdiYSg3LCAwLCAyMCwgMC4xKSAwcHggMTBweCAxNXB4IC0zcHgsIHJnYmEoNywgMCwgMjAsIDAuMDUpIDBweCA0cHggNnB4LFxuICAgIHJnYmEoNywgMCwgMjAsIDAuMDUpIDBweCAzMHB4IDQwcHg7XG4gIC0tZmVlZGJhY2tmaW4tYm9yZGVyLXJhZGl1czogMXJlbTtcblxuICAtLWZlZWRiYWNrZmluLXRpdGxlLXdlaWdodDogNjAwO1xuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi13ZWlnaHQ6IDUwMDtcblxuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5OiAwLjA0O1xuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWhvdmVyOiAwLjA4O1xuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZTogMC4xMjtcbiAgLS1mZWVkYmFja2Zpbi1idXR0b24tdHJhbnNpdGlvbjpcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZS1pbi1vdXQsIG9wYWNpdHkgMC4ycyBlYXNlLWluLW91dCxcbiAgICB0cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcbiAgLS1mZWVkYmFja2Zpbi1pY29uLWJ1dHRvbi1vcGFjaXR5OiAwLjM4O1xuXG4gIC0tZmVlZGJhY2tmaW4tcHJpbWFyeS1jb2xvcjogIzZhMzVmZjtcbiAgLS1mZWVkYmFja2Zpbi1wcmltYXJ5LWNvbG9yLXRleHQ6ICNmZmY7XG5cbiAgLS1mZWVkYmFja2Zpbi1vdXRsaW5lLW9wYWNpdHk6IDAuMTI7XG4gIC0tZmVlZGJhY2tmaW4tZm9jdXMtY29sb3I6IHZhcigtLWZlZWRiYWNrZmluLXByaW1hcnktY29sb3IpO1xuICAtLWZlZWRiYWNrZmluLWZvY3VzLXNoYWRvdzpcbiAgICAwIDAgMCAycHggdmFyKC0tZmVlZGJhY2tmaW4tYmctY29sb3IpLFxuICAgIDAgMCAwIDRweCB2YXIoLS1mZWVkYmFja2Zpbi1mb2N1cy1jb2xvcik7XG59XG5cbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgOnJvb3Qge1xuICAgIC0tZmVlZGJhY2tmaW4tYmctY29sb3I6ICMyZDJkMzA7XG4gICAgLS1mZWVkYmFja2Zpbi10ZXh0LWNvbG9yOiAyNDAsIDEwJSwgOTAlO1xuICAgIC0tZmVlZGJhY2tmaW4tc2hhZG93OlxuICAgICAgcmdiYSgwLCAwLCA1LCAwLjI0KSAwcHggMHB4IDBweCAxcHgsXG4gICAgICByZ2JhKDAsIDAsIDUsIDAuNCkgMHB4IDEwcHggMTVweCAtM3B4LCByZ2JhKDAsIDAsIDUsIDAuMikgMHB4IDRweCA2cHgsXG4gICAgICByZ2JhKDAsIDAsIDUsIDAuMikgMHB4IDMwcHggNDBweDtcblxuICAgIC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHk6IDAuMDg7XG4gICAgLS1mZWVkYmFja2Zpbi1idXR0b24tb3BhY2l0eS1ob3ZlcjogMC4xMjtcbiAgICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZTogMC4xNjtcbiAgICAtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHk6IDAuNTtcblxuICAgIC0tZmVlZGJhY2tmaW4tb3V0bGluZS1vcGFjaXR5OiAwLjI7XG4gICAgLS1mZWVkYmFja2Zpbi1mb2N1cy1zaGFkb3c6XG4gICAgICAwIDAgMCAycHggdmFyKC0tZmVlZGJhY2tmaW4tYmctY29sb3IpLFxuICAgICAgMCAwIDAgNHB4IHZhcigtLWZlZWRiYWNrZmluLWZvY3VzLWNvbG9yKTtcbiAgfVxufVxuW2RhdGEtdGhlbWUqPVwiZGFya1wiXSB7XG4gIC0tZmVlZGJhY2tmaW4tYmctY29sb3I6ICMyZDJkMzA7XG4gIC0tZmVlZGJhY2tmaW4tdGV4dC1jb2xvcjogMjQwLCAxMCUsIDkwJTtcbiAgLS1mZWVkYmFja2Zpbi1zaGFkb3c6XG4gICAgcmdiYSgwLCAwLCA1LCAwLjI0KSAwcHggMHB4IDBweCAxcHgsIHJnYmEoMCwgMCwgNSwgMC40KSAwcHggMTBweCAxNXB4IC0zcHgsXG4gICAgcmdiYSgwLCAwLCA1LCAwLjIpIDBweCA0cHggNnB4LCByZ2JhKDAsIDAsIDUsIDAuMikgMHB4IDMwcHggNDBweDtcblxuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5OiAwLjA4O1xuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWhvdmVyOiAwLjEyO1xuICAtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZTogMC4xNjtcbiAgLS1mZWVkYmFja2Zpbi1pY29uLWJ1dHRvbi1vcGFjaXR5OiAwLjU7XG5cbiAgLS1mZWVkYmFja2Zpbi1vdXRsaW5lLW9wYWNpdHk6IDAuMjtcbiAgLS1mZWVkYmFja2Zpbi1mb2N1cy1zaGFkb3c6XG4gICAgMCAwIDAgMnB4IHZhcigtLWZlZWRiYWNrZmluLWJnLWNvbG9yKSxcbiAgICAwIDAgMCA0cHggdmFyKC0tZmVlZGJhY2tmaW4tZm9jdXMtY29sb3IpO1xufVxuI2ZlZWRiYWNrZmluX19jb250YWluZXJbZGF0YS10aGVtZT1cImxpZ2h0XCJdIHtcbiAgLS1mZWVkYmFja2Zpbi1iZy1jb2xvcjogI2ZmZjtcbiAgLS1mZWVkYmFja2Zpbi10ZXh0LWNvbG9yOiAyNDAsIDEwMCUsIDEwJTtcbiAgLS1mZWVkYmFja2Zpbi1zaGFkb3c6XG4gICAgcmdiYSg3LCAwLCAyMCwgMC4wNikgMHB4IDBweCAwcHggMXB4LFxuICAgIHJnYmEoNywgMCwgMjAsIDAuMSkgMHB4IDEwcHggMTVweCAtM3B4LCByZ2JhKDcsIDAsIDIwLCAwLjA1KSAwcHggNHB4IDZweCxcbiAgICByZ2JhKDcsIDAsIDIwLCAwLjA1KSAwcHggMzBweCA0MHB4O1xuXG4gIC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHk6IDAuMDQ7XG4gIC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHktaG92ZXI6IDAuMDg7XG4gIC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHktYWN0aXZlOiAwLjEyO1xuICAtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHk6IDAuMzg7XG5cbiAgLS1mZWVkYmFja2Zpbi1vdXRsaW5lLW9wYWNpdHk6IDAuMTI7XG4gIC0tZmVlZGJhY2tmaW4tZm9jdXMtc2hhZG93OlxuICAgIDAgMCAwIDJweCB2YXIoLS1mZWVkYmFja2Zpbi1iZy1jb2xvciksXG4gICAgMCAwIDAgNHB4IHZhcigtLWZlZWRiYWNrZmluLWZvY3VzLWNvbG9yKTtcbn1cblxuI2ZlZWRiYWNrZmluX19jb250YWluZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDk5OTk7XG5cbiAgd2lkdGg6IDE5cmVtO1xuICBtaW4taGVpZ2h0OiAxNXJlbTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZlZWRiYWNrZmluLWJnLWNvbG9yKTtcbiAgYm94LXNoYWRvdzogdmFyKC0tZmVlZGJhY2tmaW4tc2hhZG93KTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tZmVlZGJhY2tmaW4tYm9yZGVyLXJhZGl1cyk7XG5cbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xuXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IDFyZW07XG4gIGNvbG9yOiBoc2wodmFyKC0tZmVlZGJhY2tmaW4tdGV4dC1jb2xvcikpO1xuXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xufVxuXG4jZmVlZGJhY2tmaW5fX2NvbnRhaW5lciAqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbiNmZWVkYmFja2Zpbl9fY29udGFpbmVyICo6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuI2ZlZWRiYWNrZmluX19jb250YWluZXIgKjpmb2N1cy12aXNpYmxlIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm94LXNoYWRvdzogdmFyKC0tZmVlZGJhY2tmaW4tZm9jdXMtc2hhZG93KTtcbn1cblxuLmZlZWRiYWNrZmluX19idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5KVxuICApO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IGNhbGModmFyKC0tZmVlZGJhY2tmaW4tYm9yZGVyLXJhZGl1cykgLyAyKTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1mZWVkYmFja2Zpbi1idXR0b24td2VpZ2h0KTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xuXG4gIHRyYW5zaXRpb246IHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi10cmFuc2l0aW9uKTtcbn1cbi5mZWVkYmFja2Zpbl9fYnV0dG9uOmhvdmVyLFxuLmZlZWRiYWNrZmluX19idXR0b246Zm9jdXMtdmlzaWJsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGhzbGEoXG4gICAgdmFyKC0tZmVlZGJhY2tmaW4tdGV4dC1jb2xvciksXG4gICAgdmFyKC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHktaG92ZXIpXG4gICk7XG59XG4uZmVlZGJhY2tmaW5fX2J1dHRvbjphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZSlcbiAgKTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XG59XG5cbi5mZWVkYmFja2Zpbl9faWNvbi1idXR0b24ge1xuICB3aWR0aDogMi41cmVtO1xuICBoZWlnaHQ6IDIuNXJlbTtcblxuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIG9wYWNpdHk6IHZhcigtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHkpO1xuXG4gIHRyYW5zaXRpb246IHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi10cmFuc2l0aW9uKTtcbn1cbi5mZWVkYmFja2Zpbl9faWNvbi1idXR0b246aG92ZXIsXG4uZmVlZGJhY2tmaW5fX2ljb24tYnV0dG9uOmZvY3VzLXZpc2libGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWhvdmVyKVxuICApO1xuICBvcGFjaXR5OiAxO1xufVxuLmZlZWRiYWNrZmluX19pY29uLWJ1dHRvbjphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZSlcbiAgKTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcztcbiAgb3BhY2l0eTogMTtcbn1cblxuI2ZlZWRiYWNrZmluX19jbG9zZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjI1cmVtO1xuICByaWdodDogMC4yNXJlbTtcbiAgei1pbmRleDogMTtcbn1cblxuI2ZlZWRiYWNrZmluX19mb3JtIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuI2ZlZWRiYWNrZmluX190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDAuNzVyZW07XG5cbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogdmFyKC0tZmVlZGJhY2tmaW4tdGl0bGUtd2VpZ2h0KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBjb2xvcjogaHNsKHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpKTtcbn1cblxuI2ZlZWRiYWNrZmluX19yYWRpby1ncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xufVxuLmZlZWRiYWNrZmluX19yYWRpbyB7XG4gIHdpZHRoOiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG5cbiAgb3BhY2l0eTogMDtcbn1cbi5mZWVkYmFja2Zpbl9fcmFkaW8tbGFiZWwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA3LjVyZW07XG4gIG1hcmdpbjogMXJlbSAwO1xuXG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDAuNXJlbSAwLjI1cmVtO1xufVxuLmZlZWRiYWNrZmluX19yYWRpbzpmb2N1cyArIC5mZWVkYmFja2Zpbl9fcmFkaW8tbGFiZWwge1xuICBib3gtc2hhZG93OiB2YXIoLS1mZWVkYmFja2Zpbi1mb2N1cy1zaGFkb3cpO1xufVxuLmZlZWRiYWNrZmluX19yYWRpby1pY29uIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBmb250LXNpemU6IDNyZW07XG59XG4jZmVlZGJhY2tmaW5fX2NvbnRhaW5lcltkYXRhLWZlZWRiYWNrLXR5cGVdIC5mZWVkYmFja2Zpbl9fcmFkaW8tbGFiZWwge1xuICBoZWlnaHQ6IDJyZW07XG4gIG1hcmdpbjogMCAwIDAuNXJlbTtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG59XG4jZmVlZGJhY2tmaW5fX2NvbnRhaW5lcltkYXRhLWZlZWRiYWNrLXR5cGVdXG4gIC5mZWVkYmFja2Zpbl9fcmFkaW86Y2hlY2tlZFxuICArIC5mZWVkYmFja2Zpbl9fcmFkaW8tbGFiZWwge1xuICBib3JkZXItY29sb3I6IGhzbGEodmFyKC0tZmVlZGJhY2tmaW4tdGV4dC1jb2xvciksIDAuNSk7XG59XG4jZmVlZGJhY2tmaW5fX2NvbnRhaW5lcltkYXRhLWZlZWRiYWNrLXR5cGVdXG4gIC5mZWVkYmFja2Zpbl9fcmFkaW86Y2hlY2tlZDpmb2N1c1xuICArIC5mZWVkYmFja2Zpbl9fcmFkaW8tbGFiZWwge1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuI2ZlZWRiYWNrZmluX19jb250YWluZXJbZGF0YS1mZWVkYmFjay10eXBlXSAuZmVlZGJhY2tmaW5fX3JhZGlvLWljb24ge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIG1hcmdpbjogMDtcbn1cblxuI2ZlZWRiYWNrZmluX19zdGVwMiB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMC41cmVtO1xufVxuI2ZlZWRiYWNrZmluX19jb250YWluZXJbZGF0YS1mZWVkYmFjay10eXBlXSAjZmVlZGJhY2tmaW5fX3N0ZXAyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuI2ZlZWRiYWNrZmluX19yZXNldCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMi4yNXJlbTtcbiAgbGVmdDogMC4yNXJlbTtcbn1cblxuI2ZlZWRiYWNrZmluX19tZXNzYWdlIHtcbiAgbWluLWhlaWdodDogNXJlbTtcbiAgcmVzaXplOiBub25lO1xuXG4gIGJvcmRlci1yYWRpdXM6IGNhbGModmFyKC0tZmVlZGJhY2tmaW4tYm9yZGVyLXJhZGl1cykgLyAyKTtcbiAgYm9yZGVyOiAycHggc29saWRcbiAgICBoc2xhKHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLCB2YXIoLS1mZWVkYmFja2Zpbi1vdXRsaW5lLW9wYWNpdHkpKTtcbiAgYmFja2dyb3VuZDogbm9uZTtcblxuICBmb250OiBpbmhlcml0O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuI2ZlZWRiYWNrZmluX19tZXNzYWdlOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1mZWVkYmFja2Zpbi1mb2N1cy1jb2xvcik7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbiNmZWVkYmFja2Zpbl9fc3VibWl0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZlZWRiYWNrZmluLXByaW1hcnktY29sb3IpO1xuICBjb2xvcjogdmFyKC0tZmVlZGJhY2tmaW4tcHJpbWFyeS1jb2xvci10ZXh0KTtcbn1cbiNmZWVkYmFja2Zpbl9fc3VibWl0OmhvdmVyLFxuI2ZlZWRiYWNrZmluX19zdWJtaXQ6Zm9jdXMtdmlzaWJsZSxcbiNmZWVkYmFja2Zpbl9fc3VibWl0OmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZlZWRiYWNrZmluLXByaW1hcnktY29sb3IpO1xufVxuI2ZlZWRiYWNrZmluX19zdWJtaXQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mZWVkYmFja2Zpbi1wcmltYXJ5LWNvbG9yLXRleHQpO1xuICBib3JkZXItcmFkaXVzOiBpbmhlcml0O1xuICBvcGFjaXR5OiAwO1xuXG4gIHRyYW5zaXRpb246IHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi10cmFuc2l0aW9uKTtcbn1cbiNmZWVkYmFja2Zpbl9fc3VibWl0OmhvdmVyOjpiZWZvcmUsXG4jZmVlZGJhY2tmaW5fX3N1Ym1pdDpmb2N1cy12aXNpYmxlOjpiZWZvcmUge1xuICBvcGFjaXR5OiB2YXIoLS1mZWVkYmFja2Zpbi1idXR0b24tb3BhY2l0eS1ob3Zlcik7XG59XG4jZmVlZGJhY2tmaW5fX3N1Ym1pdDphY3RpdmU6OmJlZm9yZSB7XG4gIG9wYWNpdHk6IHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5LWFjdGl2ZSk7XG59XG5cbiNmZWVkYmFja2Zpbl9fc3VibWl0W2Rpc2FibGVkXSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGhzbGEoXG4gICAgdmFyKC0tZmVlZGJhY2tmaW4tdGV4dC1jb2xvciksXG4gICAgdmFyKC0tZmVlZGJhY2tmaW4tYnV0dG9uLW9wYWNpdHktaG92ZXIpXG4gICk7XG4gIGNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHkpXG4gICk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cbiNmZWVkYmFja2Zpbl9fc3VibWl0W2Rpc2FibGVkXTo6YmVmb3JlIHtcbiAgY29udGVudDogbm9uZTtcbn1cblxuI2ZlZWRiYWNrZmluX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjVyZW07XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNmZWVkYmFja2Zpbl9fYWN0aW9ucyAjZmVlZGJhY2tmaW5fX3N1Ym1pdCB7XG4gIGZsZXg6IDE7XG59XG5cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1idG4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAyLjVyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogY2FsYyh2YXIoLS1mZWVkYmFja2Zpbi1ib3JkZXItcmFkaXVzKSAvIDIpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKFxuICAgIHZhcigtLWZlZWRiYWNrZmluLXRleHQtY29sb3IpLFxuICAgIHZhcigtLWZlZWRiYWNrZmluLWJ1dHRvbi1vcGFjaXR5KVxuICApO1xuICBvcGFjaXR5OiAxO1xuICBmbGV4LXNocmluazogMDtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4jZmVlZGJhY2tmaW5fX3NjcmVlbnNob3QtYnRuOmhvdmVyLFxuI2ZlZWRiYWNrZmluX19zY3JlZW5zaG90LWJ0bjpmb2N1cy12aXNpYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsYShcbiAgICB2YXIoLS1mZWVkYmFja2Zpbi10ZXh0LWNvbG9yKSxcbiAgICB2YXIoLS1mZWVkYmFja2Zpbi1idXR0b24tb3BhY2l0eS1ob3ZlcilcbiAgKTtcbn1cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1idG46YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsYShcbiAgICB2YXIoLS1mZWVkYmFja2Zpbi10ZXh0LWNvbG9yKSxcbiAgICB2YXIoLS1mZWVkYmFja2Zpbi1idXR0b24tb3BhY2l0eS1hY3RpdmUpXG4gICk7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG59XG5cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1iYWRnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMC4zNXJlbTtcbiAgcmlnaHQ6IC0wLjM1cmVtO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZlZWRiYWNrZmluLXByaW1hcnktY29sb3IpO1xuICBjb2xvcjogdmFyKC0tZmVlZGJhY2tmaW4tcHJpbWFyeS1jb2xvci10ZXh0KTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4jZmVlZGJhY2tmaW5fX2NvbnRhaW5lcltkYXRhLWhhcy1zY3JlZW5zaG90XSAjZmVlZGJhY2tmaW5fX3NjcmVlbnNob3QtYnRuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuI2ZlZWRiYWNrZmluX19zY3JlZW5zaG90LXByZXZpZXcge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAyLjVyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbiNmZWVkYmFja2Zpbl9fY29udGFpbmVyW2RhdGEtaGFzLXNjcmVlbnNob3RdICNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1wcmV2aWV3IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1saW5rIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogY2FsYyh2YXIoLS1mZWVkYmFja2Zpbi1ib3JkZXItcmFkaXVzKSAvIDIpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIG9iamVjdC1wb3NpdGlvbjogdG9wIGxlZnQ7XG59XG5cbiNmZWVkYmFja2Zpbl9fc2NyZWVuc2hvdC1yZW1vdmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTAuMzVyZW07XG4gIHJpZ2h0OiAtMC4zNXJlbTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgcGFkZGluZzogMDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTUzOTM1O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgY29sb3I6ICNmZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjpcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UsXG4gICAgdHJhbnNmb3JtIDAuMTVzIGVhc2U7XG59XG4jZmVlZGJhY2tmaW5fX3NjcmVlbnNob3QtcmVtb3ZlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M2MjgyODtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xufVxuI2ZlZWRiYWNrZmluX19zY3JlZW5zaG90LXJlbW92ZTpmb2N1cy12aXNpYmxlIHtcbiAgYm94LXNoYWRvdzpcbiAgICAwIDAgMCAycHggdmFyKC0tZmVlZGJhY2tmaW4tYmctY29sb3IpLFxuICAgIDAgMCAwIDRweCAjZTUzOTM1O1xufVxuXG4jZmVlZGJhY2tmaW5fX3N1Y2Nlc3Mge1xuICBkaXNwbGF5OiBub25lO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogdmFyKC0tZmVlZGJhY2tmaW4tdGl0bGUtd2VpZ2h0KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4jZmVlZGJhY2tmaW5fX2NoZWNrIHtcbiAgc3Ryb2tlOiB2YXIoLS1mZWVkYmFja2Zpbi1wcmltYXJ5LWNvbG9yKTtcbiAgc3Ryb2tlLWRhc2hhcnJheTogMTg7XG5cbiAgYW5pbWF0aW9uOiBmZWVkYmFja2Zpbl9fZHJhdy1jaGVjayAwLjNzIGVhc2Utb3V0IDAuMXMgYm90aDtcbn1cbkBrZXlmcmFtZXMgZmVlZGJhY2tmaW5fX2RyYXctY2hlY2sge1xuICBmcm9tIHtcbiAgICBzdHJva2UtZGFzaG9mZnNldDogMTg7XG4gIH1cbiAgdG8ge1xuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAwO1xuICB9XG59XG5cbiNmZWVkYmFja2Zpbl9fY29udGFpbmVyW2RhdGEtc3VjY2Vzc10gI2ZlZWRiYWNrZmluX19mb3JtIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiNmZWVkYmFja2Zpbl9fY29udGFpbmVyW2RhdGEtc3VjY2Vzc10gI2ZlZWRiYWNrZmluX19zdWNjZXNzIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuI2ZlZWRiYWNrZmluX19icmFuZGluZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMC41cmVtO1xuXG4gIGZvbnQtc2l6ZTogMC42ODc1ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbiNmZWVkYmFja2Zpbl9fYnJhbmRpbmcgYSB7XG4gIGJvcmRlci1yYWRpdXM6IGNhbGModmFyKC0tZmVlZGJhY2tmaW4tYm9yZGVyLXJhZGl1cykgLyA0KTtcblxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuXG4gIG9wYWNpdHk6IHZhcigtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHkpO1xuICB0cmFuc2l0aW9uOiB2YXIoLS1mZWVkYmFja2Zpbi1idXR0b24tdHJhbnNpdGlvbik7XG59XG4jZmVlZGJhY2tmaW5fX2JyYW5kaW5nIGE6aG92ZXIsXG4jZmVlZGJhY2tmaW5fX2JyYW5kaW5nIGE6Zm9jdXMtdmlzaWJsZSB7XG4gIG9wYWNpdHk6IGNhbGModmFyKC0tZmVlZGJhY2tmaW4taWNvbi1idXR0b24tb3BhY2l0eSkgKiAyKTtcbn1cbiNmZWVkYmFja2Zpbl9fYnJhbmRpbmcgYTphY3RpdmUge1xuICBvcGFjaXR5OiBjYWxjKHZhcigtLWZlZWRiYWNrZmluLWljb24tYnV0dG9uLW9wYWNpdHkpICogMC43NSk7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDBzO1xufVxuIl19 */'),
    document.head.insertBefore(A, document.head.firstChild),
    document.querySelectorAll("[data-feedbackfin-button]").forEach((A) => {
      A.addEventListener("click", oe);
    }));
}
window.addEventListener("load", te);
const re = document.createElement("div");
re.id = "feedbackfin__container";
const ne = (function (A, e) {
  var t,
    r = (null == e ? void 0 : e.document) || document,
    n = (null == e ? void 0 : e.trapStack) || _A,
    o = VA(
      {
        returnFocusOnDeactivate: !0,
        escapeDeactivates: !0,
        delayInitialFocus: !0,
        isolateSubtrees: !1,
        isKeyForward: YA,
        isKeyBackward: TA,
      },
      e,
    ),
    i = {
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
    B = function (A, e) {
      var t =
        "function" == typeof (null == e ? void 0 : e.composedPath)
          ? e.composedPath()
          : void 0;
      return i.containerGroups.findIndex(function (e) {
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
        i = e.params,
        s = void 0 === i ? [] : i,
        B = o[A];
      if (
        ("function" == typeof B && (B = B.apply(void 0, RA(s))),
        !0 === B && (B = void 0),
        !B)
      ) {
        if (void 0 === B || !1 === B) return B;
        throw new Error(
          "`".concat(
            A,
            "` was specified but was not a node, or did not return a node",
          ),
        );
      }
      var a = B;
      if ("string" == typeof B) {
        try {
          a = r.querySelector(B);
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
      if (void 0 === A || (A && !KA(A, o.tabbableOptions)))
        if (B(r.activeElement) >= 0) A = r.activeElement;
        else {
          var e = i.tabbableGroups[0];
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
        ((i.containerGroups = i.containers.map(function (A) {
          var e = (function (A, e) {
              var t;
              return (
                (t = (e = e || {}).getShadowRoot
                  ? pA([A], e.includeContainer, {
                      filter: vA.bind(null, e),
                      flatten: !1,
                      getShadowRoot: e.getShadowRoot,
                      shadowRootFilter: LA,
                    })
                  : hA(A, e.includeContainer, vA.bind(null, e))),
                xA(t)
              );
            })(A, o.tabbableOptions),
            t = (function (A, e) {
              return (e = e || {}).getShadowRoot
                ? pA([A], e.includeContainer, {
                    filter: EA.bind(null, e),
                    flatten: !0,
                    getShadowRoot: e.getShadowRoot,
                  })
                : hA(A, e.includeContainer, EA.bind(null, e));
            })(A, o.tabbableOptions),
            r = e.length > 0 ? e[0] : void 0,
            n = e.length > 0 ? e[e.length - 1] : void 0,
            i = t.find(function (A) {
              return GA(A);
            }),
            s = t
              .slice()
              .reverse()
              .find(function (A) {
                return GA(A);
              }),
            B = !!e.find(function (A) {
              return mA(A) > 0;
            });
          return {
            container: A,
            tabbableNodes: e,
            focusableNodes: t,
            posTabIndexesFound: B,
            firstTabbableNode: r,
            lastTabbableNode: n,
            firstDomTabbableNode: i,
            lastDomTabbableNode: s,
            nextTabbableNode: function (A) {
              var r =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1],
                n = e.indexOf(A);
              return n < 0
                ? r
                  ? t.slice(t.indexOf(A) + 1).find(function (A) {
                      return GA(A);
                    })
                  : t
                      .slice(0, t.indexOf(A))
                      .reverse()
                      .find(function (A) {
                        return GA(A);
                      })
                : e[n + (r ? 1 : -1)];
            },
          };
        })),
        (i.tabbableGroups = i.containerGroups.filter(function (A) {
          return A.tabbableNodes.length > 0;
        })),
        i.tabbableGroups.length <= 0 && !a("fallbackFocus"))
      )
        throw new Error(
          "Your focus-trap must have at least one container with at least one tabbable node in it at all times",
        );
      if (
        i.containerGroups.find(function (A) {
          return A.posTabIndexesFound;
        }) &&
        i.containerGroups.length > 1
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
            (i.mostRecentlyFocusedNode = A),
            (function (A) {
              return (
                A.tagName &&
                "input" === A.tagName.toLowerCase() &&
                "function" == typeof A.select
              );
            })(A) && A.select())
          : g(c()));
    },
    Q = function (A) {
      var e = a("setReturnFocus", { params: [A] });
      return e || (!1 !== e && A);
    },
    w = function (A) {
      var e = A.target,
        t = A.event,
        r = A.isBackward,
        n = void 0 !== r && r;
      ((e = e || PA(t)), l());
      var s = null;
      if (i.tabbableGroups.length > 0) {
        var c = B(e, t),
          u = c >= 0 ? i.containerGroups[c] : void 0;
        if (c < 0)
          s = n
            ? i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode
            : i.tabbableGroups[0].firstTabbableNode;
        else if (n) {
          var g = i.tabbableGroups.findIndex(function (A) {
            return e === A.firstTabbableNode;
          });
          if (
            (g < 0 &&
              (u.container === e ||
                (KA(e, o.tabbableOptions) &&
                  !GA(e, o.tabbableOptions) &&
                  !u.nextTabbableNode(e, !1))) &&
              (g = c),
            g >= 0)
          ) {
            var Q =
              i.tabbableGroups[0 === g ? i.tabbableGroups.length - 1 : g - 1];
            s = mA(e) >= 0 ? Q.lastTabbableNode : Q.lastDomTabbableNode;
          } else MA(t) || (s = u.nextTabbableNode(e, !1));
        } else {
          var w = i.tabbableGroups.findIndex(function (A) {
            return e === A.lastTabbableNode;
          });
          if (
            (w < 0 &&
              (u.container === e ||
                (KA(e, o.tabbableOptions) &&
                  !GA(e, o.tabbableOptions) &&
                  !u.nextTabbableNode(e))) &&
              (w = c),
            w >= 0)
          ) {
            var d =
              i.tabbableGroups[w === i.tabbableGroups.length - 1 ? 0 : w + 1];
            s = mA(e) >= 0 ? d.firstTabbableNode : d.firstDomTabbableNode;
          } else MA(t) || (s = u.nextTabbableNode(e));
        }
      } else s = a("fallbackFocus");
      return s;
    },
    d = function (A) {
      var e = PA(A);
      B(e, A) >= 0 ||
        (JA(o.clickOutsideDeactivates, A)
          ? t.deactivate({ returnFocus: o.returnFocusOnDeactivate })
          : JA(o.allowOutsideClick, A) || A.preventDefault());
    },
    C = function (A) {
      var e = PA(A),
        t = B(e, A) >= 0;
      if (t || e instanceof Document) t && (i.mostRecentlyFocusedNode = e);
      else {
        var r;
        A.stopImmediatePropagation();
        var n = !0;
        if (i.mostRecentlyFocusedNode)
          if (mA(i.mostRecentlyFocusedNode) > 0) {
            var s = B(i.mostRecentlyFocusedNode),
              a = i.containerGroups[s].tabbableNodes;
            if (a.length > 0) {
              var l = a.findIndex(function (A) {
                return A === i.mostRecentlyFocusedNode;
              });
              l >= 0 &&
                (o.isKeyForward(i.recentNavEvent)
                  ? l + 1 < a.length && ((r = a[l + 1]), (n = !1))
                  : l - 1 >= 0 && ((r = a[l - 1]), (n = !1)));
            }
          } else
            i.containerGroups.some(function (A) {
              return A.tabbableNodes.some(function (A) {
                return mA(A) > 0;
              });
            }) || (n = !1);
        else n = !1;
        (n &&
          (r = w({
            target: i.mostRecentlyFocusedNode,
            isBackward: o.isKeyBackward(i.recentNavEvent),
          })),
          g(r || i.mostRecentlyFocusedNode || c()));
      }
      i.recentNavEvent = void 0;
    },
    F = function (A) {
      (o.isKeyForward(A) || o.isKeyBackward(A)) &&
        (function (A) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          i.recentNavEvent = A;
          var t = w({ event: A, isBackward: e });
          t && (MA(A) && A.preventDefault(), g(t));
        })(A, o.isKeyBackward(A));
    },
    U = function (A) {
      var e;
      ("Escape" !== (null == (e = A) ? void 0 : e.key) &&
        "Esc" !== (null == e ? void 0 : e.key) &&
        27 !== (null == e ? void 0 : e.keyCode)) ||
        !1 === JA(o.escapeDeactivates, A) ||
        (A.preventDefault(), t.deactivate());
    },
    f = function (A) {
      var e = PA(A);
      B(e, A) >= 0 ||
        JA(o.clickOutsideDeactivates, A) ||
        JA(o.allowOutsideClick, A) ||
        (A.preventDefault(), A.stopImmediatePropagation());
    },
    h = function () {
      if (i.active)
        return (
          XA.activateTrap(n, t),
          (i.delayInitialFocusTimer = o.delayInitialFocus
            ? OA(function () {
                g(c());
              })
            : g(c())),
          r.addEventListener("focusin", C, !0),
          r.addEventListener("mousedown", d, { capture: !0, passive: !1 }),
          r.addEventListener("touchstart", d, { capture: !0, passive: !1 }),
          r.addEventListener("click", f, { capture: !0, passive: !1 }),
          r.addEventListener("keydown", F, { capture: !0, passive: !1 }),
          r.addEventListener("keydown", U),
          t
        );
    },
    p = function () {
      if (i.active)
        return (
          r.removeEventListener("focusin", C, !0),
          r.removeEventListener("mousedown", d, !0),
          r.removeEventListener("touchstart", d, !0),
          r.removeEventListener("click", f, !0),
          r.removeEventListener("keydown", F, !0),
          r.removeEventListener("keydown", U),
          t
        );
    },
    b =
      "undefined" != typeof window && "MutationObserver" in window
        ? new MutationObserver(function (A) {
            A.some(function (A) {
              return Array.from(A.removedNodes).some(function (A) {
                return A === i.mostRecentlyFocusedNode;
              });
            }) && g(c());
          })
        : void 0,
    m = function () {
      b &&
        (b.disconnect(),
        i.active &&
          !i.paused &&
          i.containers.map(function (A) {
            b.observe(A, { subtree: !0, childList: !0 });
          }));
    };
  return (
    (t = {
      get active() {
        return i.active;
      },
      get paused() {
        return i.paused;
      },
      activate: function (A) {
        if (i.active) return this;
        var e,
          B = s(A, "onActivate"),
          a = s(A, "onPostActivate"),
          c = s(A, "checkCanFocusTrap"),
          g = XA.getActiveTrap(n),
          Q = !1;
        g &&
          !g.paused &&
          (null === (e = g._setSubtreeIsolation) ||
            void 0 === e ||
            e.call(g, !1),
          (Q = !0));
        try {
          (c || l(),
            (i.active = !0),
            (i.paused = !1),
            (i.nodeFocusedBeforeActivation = u(r)),
            null == B || B());
          var w = function () {
            (c && l(),
              h(),
              m(),
              o.isolateSubtrees && t._setSubtreeIsolation(!0),
              null == a || a());
          };
          if (c) return (c(i.containers.concat()).then(w, w), this);
          w();
        } catch (A) {
          var d;
          throw (
            g === XA.getActiveTrap(n) &&
              Q &&
              (null === (d = g._setSubtreeIsolation) ||
                void 0 === d ||
                d.call(g, !0)),
            A
          );
        }
        return this;
      },
      deactivate: function (A) {
        if (!i.active) return this;
        var e = VA(
          {
            onDeactivate: o.onDeactivate,
            onPostDeactivate: o.onPostDeactivate,
            checkCanReturnFocus: o.checkCanReturnFocus,
          },
          A,
        );
        (clearTimeout(i.delayInitialFocusTimer),
          (i.delayInitialFocusTimer = void 0),
          i.paused || t._setSubtreeIsolation(!1),
          i.alreadySilent.clear(),
          p(),
          (i.active = !1),
          (i.paused = !1),
          m(),
          XA.deactivateTrap(n, t));
        var r = s(e, "onDeactivate"),
          B = s(e, "onPostDeactivate"),
          a = s(e, "checkCanReturnFocus"),
          c = s(e, "returnFocus", "returnFocusOnDeactivate");
        null == r || r();
        var l = function () {
          OA(function () {
            (c && g(Q(i.nodeFocusedBeforeActivation)), null == B || B());
          });
        };
        return c && a
          ? (a(Q(i.nodeFocusedBeforeActivation)).then(l, l), this)
          : (l(), this);
      },
      pause: function (A) {
        return i.active
          ? ((i.manuallyPaused = !0), this._setPausedState(!0, A))
          : this;
      },
      unpause: function (A) {
        return i.active
          ? ((i.manuallyPaused = !1),
            n[n.length - 1] !== this ? this : this._setPausedState(!1, A))
          : this;
      },
      updateContainerElements: function (A) {
        var e = [].concat(A).filter(Boolean);
        return (
          (i.containers = e.map(function (A) {
            return "string" == typeof A ? r.querySelector(A) : A;
          })),
          o.isolateSubtrees &&
            (function (A) {
              (i.active && !i.paused && t._setSubtreeIsolation(!1),
                i.adjacentElements.clear(),
                i.alreadySilent.clear());
              var e,
                r = new Set(),
                n = new Set(),
                o = kA(A);
              try {
                for (o.s(); !(e = o.n()).done; ) {
                  var s = e.value;
                  r.add(s);
                  for (
                    var B =
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
                        B &&
                        ((l = a.getRootNode().children),
                        (c = a.getRootNode().host),
                        (B =
                          "undefined" != typeof ShadowRoot &&
                          c.getRootNode() instanceof ShadowRoot));
                    var u,
                      g = kA(l);
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
                (i.adjacentElements = n));
            })(i.containers),
          i.active &&
            (l(), o.isolateSubtrees && !i.paused && t._setSubtreeIsolation(!0)),
          m(),
          this
        );
      },
    }),
    Object.defineProperties(t, {
      _isManuallyPaused: {
        value: function () {
          return i.manuallyPaused;
        },
      },
      _setPausedState: {
        value: function (A, e) {
          if (i.paused === A) return this;
          if (((i.paused = A), A)) {
            var r = s(e, "onPause"),
              n = s(e, "onPostPause");
            (null == r || r(),
              p(),
              m(),
              t._setSubtreeIsolation(!1),
              null == n || n());
          } else {
            var o = s(e, "onUnpause"),
              B = s(e, "onPostUnpause");
            (null == o || o(),
              t._setSubtreeIsolation(!0),
              l(),
              h(),
              m(),
              null == B || B());
          }
          return this;
        },
      },
      _setSubtreeIsolation: {
        value: function (A) {
          o.isolateSubtrees &&
            i.adjacentElements.forEach(function (e) {
              var t;
              A
                ? "aria-hidden" === o.isolateSubtrees
                  ? (("true" !== e.ariaHidden &&
                      "true" !==
                        (null === (t = e.getAttribute("aria-hidden")) ||
                        void 0 === t
                          ? void 0
                          : t.toLowerCase())) ||
                      i.alreadySilent.add(e),
                    e.setAttribute("aria-hidden", "true"))
                  : ((e.inert || e.hasAttribute("inert")) &&
                      i.alreadySilent.add(e),
                    e.setAttribute("inert", !0))
                : i.alreadySilent.has(e) ||
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
})(re, { initialFocus: "#feedbackfin__radio--issue", allowOutsideClick: !0 });
function oe(A) {
  const e = ee();
  var t;
  (document.body.appendChild(re),
    (re.innerHTML =
      '<button id="feedbackfin__close" class="feedbackfin__icon-button" type="reset" aria-label="Close"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><form id="feedbackfin__form"><h1 id="feedbackfin__title">Send feedback</h1><div id="feedbackfin__radio-group" role="radiogroup" aria-label="Feedback type"><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--issue" name="feedbackType" value="issue" required><label for="feedbackfin__radio--issue" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x2757;</span>Issue</label><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--idea" name="feedbackType" value="idea" required><label for="feedbackfin__radio--idea" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x1F4A1;</span>Idea</label><input class="feedbackfin__radio" type="radio" id="feedbackfin__radio--other" name="feedbackType" value="other" required><label for="feedbackfin__radio--other" class="feedbackfin__button feedbackfin__radio-label"><span class="feedbackfin__radio-icon">&#x1F4AD;</span>Other</label></div><div id="feedbackfin__step2"><textarea id="feedbackfin__message" name="message" type="text" placeholder="I think…" required rows="2" aria-label="Message"></textarea><div id="feedbackfin__actions"><div id="feedbackfin__screenshot-preview"><button id="feedbackfin__screenshot-link" type="button" aria-label="View screenshot"><img id="feedbackfin__screenshot-img" alt="Screenshot preview"></button><button id="feedbackfin__screenshot-remove" type="button" aria-label="Remove screenshot"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><button id="feedbackfin__screenshot-btn" class="feedbackfin__icon-button" type="button" aria-label="Capture screenshot"><svg width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg><span id="feedbackfin__screenshot-badge">+</span></button><button id="feedbackfin__submit" class="feedbackfin__button" type="submit">Send feedback</button></div></div></form><div id="feedbackfin__success"><svg viewBox="0 0 18 18" width="3em" height="3em" role="presentation"><polyline stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2.705 8.29 7 12.585 15.295 4.29" fill="none" id="feedbackfin__check"/></svg>Thanks for your feedback!</div>'),
    (re.style.display = "block"),
    (re.style.opacity = "1"),
    "light" === e.theme || "dark" === e.theme
      ? re.setAttribute("data-theme", e.theme)
      : re.removeAttribute("data-theme"),
    ((A, e, t) => {
      const r = new Map(),
        n = { platform: gA, ...t },
        o = { ...n.platform, _c: r };
      return (async (A, e, t) => {
        const {
            placement: r = "bottom",
            strategy: n = "absolute",
            middleware: o = [],
            platform: i,
          } = t,
          s = o.filter(Boolean),
          B = await (null == i.isRTL ? void 0 : i.isRTL(e));
        let a = await i.getElementRects({
            reference: A,
            floating: e,
            strategy: n,
          }),
          { x: c, y: l } = b(a, r, B),
          u = r,
          g = {},
          Q = 0;
        for (let t = 0; t < s.length; t++) {
          const { name: o, fn: w } = s[t],
            {
              x: d,
              y: C,
              data: F,
              reset: U,
            } = await w({
              x: c,
              y: l,
              initialPlacement: r,
              placement: u,
              strategy: n,
              middlewareData: g,
              rects: a,
              platform: i,
              elements: { reference: A, floating: e },
            });
          ((c = null != d ? d : c),
            (l = null != C ? C : l),
            (g = { ...g, [o]: { ...g[o], ...F } }),
            U &&
              Q <= 50 &&
              (Q++,
              "object" == typeof U &&
                (U.placement && (u = U.placement),
                U.rects &&
                  (a =
                    !0 === U.rects
                      ? await i.getElementRects({
                          reference: A,
                          floating: e,
                          strategy: n,
                        })
                      : U.rects),
                ({ x: c, y: l } = b(a, u, B))),
              (t = -1)));
        }
        return { x: c, y: l, placement: u, strategy: n, middlewareData: g };
      })(A, e, { ...n, platform: o });
    })((null == A ? void 0 : A.target) || document.body, re, {
      placement: "bottom",
      middleware: [
        QA(),
        ((t = { crossAxis: !0, padding: 8 }),
        void 0 === t && (t = {}),
        {
          name: "shift",
          options: t,
          async fn(A) {
            const { x: e, y: r, placement: n } = A,
              {
                mainAxis: o = !0,
                crossAxis: i = !1,
                limiter: c = {
                  fn: (A) => {
                    let { x: e, y: t } = A;
                    return { x: e, y: t };
                  },
                },
                ...u
              } = B(t, A),
              g = { x: e, y: r },
              w = await m(A, u),
              d = Q(a(n)),
              C = l(d);
            let F = g[C],
              U = g[d];
            (o &&
              (F = s(
                F + w["y" === C ? "top" : "left"],
                F,
                F - w["y" === C ? "bottom" : "right"],
              )),
              i &&
                (U = s(
                  U + w["y" === d ? "top" : "left"],
                  U,
                  U - w["y" === d ? "bottom" : "right"],
                )));
            const f = c.fn({ ...A, [C]: F, [d]: U });
            return {
              ...f,
              data: { x: f.x - e, y: f.y - r, enabled: { [C]: o, [d]: i } },
            };
          },
        }),
      ],
      strategy: "fixed",
    }).then(({ x: A, y: e }) => {
      Object.assign(re.style, { left: `${A}px`, top: `${e}px` });
    }),
    ne.activate(),
    document.getElementById("feedbackfin__close").addEventListener("click", se),
    Array.from(re.getElementsByClassName("feedbackfin__radio")).forEach((A) => {
      A.addEventListener("change", Be);
    }),
    document.getElementById("feedbackfin__form").addEventListener("submit", ue),
    document
      .getElementById("feedbackfin__screenshot-btn")
      .addEventListener("click", ae),
    document
      .getElementById("feedbackfin__screenshot-remove")
      .addEventListener("click", ce),
    document
      .getElementById("feedbackfin__screenshot-link")
      .addEventListener("click", le),
    document.addEventListener("click", ie));
}
function ie(A) {
  re.hasAttribute("data-success") && !re.contains(A.target) && se();
}
function se() {
  (ne.deactivate(),
    document.removeEventListener("click", ie),
    (re.innerHTML = ""),
    re.remove(),
    re.removeAttribute("data-feedback-type"),
    re.removeAttribute("data-success"),
    re.removeAttribute("data-has-screenshot"),
    ($A = null));
}
function Be(A) {
  var e;
  const t = A.target.value;
  re.setAttribute("data-feedback-type", t);
  let r = "I think…";
  ("issue" === t
    ? (r = "I'm having an issue with…")
    : "idea" === t && (r = "I'd like to see…"),
    null == (e = document.getElementById("feedbackfin__message")) ||
      e.setAttribute("placeholder", r));
}
function ae() {
  const A = document.getElementById("feedbackfin__screenshot-btn");
  (A.setAttribute("disabled", ""),
    qA(document.body, {
      logging: !1,
      useCORS: !0,
      allowTaint: !0,
      onclone: (A) => {
        const e = A.getElementById("feedbackfin__container");
        e && (e.style.display = "none");
      },
    })
      .then((A) => {
        (($A = A.toDataURL("image/png")),
          (document.getElementById("feedbackfin__screenshot-img").src = $A),
          re.setAttribute("data-has-screenshot", ""));
      })
      .catch((A) => {
        console.error("Feedback Fin: Failed to capture screenshot", A);
      })
      .then(() => {
        A.removeAttribute("disabled");
      }));
}
function ce() {
  (($A = null),
    re.removeAttribute("data-has-screenshot"),
    (document.getElementById("feedbackfin__screenshot-img").src = ""));
}
function le() {
  if (!$A) return;
  const A = window.open("");
  A &&
    A.document.write(
      `<html><head><title>Screenshot</title></head><body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;"><img src="${$A}" style="max-width:100%;max-height:100vh;"/></body></html>`,
    );
}
function ue(e) {
  e.preventDefault();
  const t = e.target,
    r = ee();
  if (!r.url)
    return (
      console.error("Feedback Fin: No URL provided"),
      void (
        r.disableErrorAlert || alert("Could not send feedback: No URL provided")
      )
    );
  const n = document.getElementById("feedbackfin__submit");
  (n.setAttribute("disabled", ""), (n.innerHTML = "Sending…"));
  const o = new Headers();
  o.append("Content-Type", "application/json");
  const i = A({}, r.user, {
    feedbackType: t.elements.feedbackType.value,
    message: t.elements.message.value,
    timestamp: Date.now(),
  });
  return (
    $A && (i.screenshot = $A),
    fetch(r.url, { method: "POST", headers: o, body: JSON.stringify(i) })
      .then(() => {
        (re.setAttribute("data-success", ""),
          setTimeout(() => {
            ((re.style.opacity = "0"), setTimeout(se, 500));
          }, 2e3));
      })
      .catch((A) => {
        (console.error("Feedback Fin:", A),
          r.disableErrorAlert ||
            alert(`Could not send feedback: ${A.message}`));
      }),
    !1
  );
}
const ge = {
  init: te,
  open: oe,
  changeType: Be,
  close: se,
  submit: ue,
  captureScreenshot: ae,
  removeScreenshot: ce,
  viewScreenshot: le,
  config: Ae,
};
window.feedbackfin = ge;
export { ge as default };
//# sourceMappingURL=index.modern.js.map
