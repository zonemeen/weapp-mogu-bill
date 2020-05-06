function n() {
  (s = _.INIT), (o = 0), (I = "0"), (f = ""), (U = "");
}

function e(n) {
  return "0" == n;
}

function t(n) {
  return n >= "0" && n <= "9";
}

function O(n) {
  return "+" == n || "-" == n || "x" == n || "/" == n || "%" == n;
}

function T(n) {
  return "." == n;
}

function r(n) {
  return "=" == n;
}

function D(n) {
  return "c" == n;
}

function N(n) {
  return "d" == n;
}

function u(n) {
  return "/" == n ? "÷" : "x" == n ? "×" : n;
}

function c(n, e) {
  return n.length < 15 && (n += e), n;
}

function S(n) {
  var e = "" + n;
  return e.length > 15 && (e = e.substr(0, 15)), e;
}

function a() {
  return s == _.SECOND_DOT || s == _.SECOND_UNDOT
    ? void (f.length > 0
        ? (f = f.substr(0, f.length - 1))
        : "" == f && U.length > 0 && (U = ""))
    : (I.length > 0 && "0" != I && (I = I.substr(0, I.length - 1)),
      void ("" == I && (I = "0")));
}

function i() {
  var e = parseFloat(I),
    t = parseFloat(f);
  switch (U) {
    case "+":
      o = e + t;
      break;

    case "-":
      o = e - t;
      break;

    case "x":
      o = e * t;
      break;

    case "/":
      0 == t ? (n(), (o = "NaN")) : (o = e / t);
      break;

    case "%":
      0 == t ? (n(), (o = "NaN")) : (o = e % t);
  }
  o = S(o);
}

var _ = {
    INIT: 0,
    RESULT: 1,
    FIRST_UNDOT: 2,
    FIRST_DOT: 3,
    SECOND_UNDOT: 4,
    SECOND_DOT: 5,
  },
  s = _.INIT,
  o = 0,
  I = "0",
  f = "",
  U = "",
  E = "完成",
  F = I;

n(),
  (module.exports = {
    reset: n,
    addOp: function (S) {
      switch (s) {
        case _.RESULT:
        case _.INIT:
          t(S) && !e(S)
            ? ((s = _.FIRST_UNDOT), (I = S))
            : T(S)
            ? ((s = _.FIRST_DOT), (I = "0."))
            : O(S) && ((s = _.SECOND_UNDOT), (I = "0"), (f = ""), (U = S));
          break;

        case _.FIRST_UNDOT:
          t(S)
            ? (I = e(I) ? S : c(I, S))
            : T(S)
            ? ((s = _.FIRST_DOT), (I = "" == I ? "0" : c(I, ".")))
            : N(S)
            ? a()
            : O(S) && ((s = _.SECOND_UNDOT), (U = S), (f = ""));
          break;

        case _.FIRST_DOT:
          t(S)
            ? (I = c(I, S))
            : N(S)
            ? (a(), I.indexOf(".") < 0 && (s = _.FIRST_UNDOT))
            : O(S) && ((s = _.SECOND_UNDOT), (U = S), (f = ""));
          break;

        case _.SECOND_UNDOT:
          t(S)
            ? (f = e(f) ? S : c(f, S))
            : T(S)
            ? ((s = _.SECOND_DOT), (f = "" == f ? "0" : c(f, ".")))
            : N(S)
            ? (a(),
              "" == f &&
                "" == U &&
                (s = I.indexOf(".") < 0 ? _.FIRST_UNDOT : _.FIRST_DOT))
            : O(S)
            ? ("" != f && (i(), (s = _.SECOND_UNDOT), (I = o), (f = "")),
              (U = S))
            : r(S) &&
              ("" != f && (i(), (s = _.SECOND_UNDOT), (I = o), (f = "")),
              (U = ""));
          break;

        case _.SECOND_DOT:
          t(S)
            ? (f = c(f, S))
            : N(S)
            ? (a(),
              f.indexOf(".") < 0 && (s = _.SECOND_UNDOT),
              "" == f &&
                "" == U &&
                (s = I.indexOf(".") < 0 ? _.FIRST_UNDOT : _.FIRST_DOT))
            : O(S)
            ? ("" != f && (i(), (s = _.SECOND_UNDOT), (I = o), (f = "")),
              (U = S))
            : r(S) &&
              ("" != f && (i(), (s = _.SECOND_UNDOT), (I = o), (f = "")),
              (U = ""));
      }
      (F = "" + I + u(U) + f),
        D(S) && (n(), (F = I)),
        (E = "" != f || ("" != U && "=" != U) ? "=" : "完成");
    },
    setInit: function (n) {
      (U = ""),
        (f = ""),
        (o = 0),
        (n = String(n)).indexOf(".") < 0
          ? ((s = _.FIRST_UNDOT), (I = n), (F = n))
          : ((s = _.FIRST_DOT), (I = n), (F = n));
    },
    getVars: function () {
      return {
        displayNum: F,
        complete: E,
      };
    },
  });
