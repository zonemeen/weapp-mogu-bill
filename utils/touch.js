function e(e, n) {
  if (!(e instanceof n))
    throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
  value: !0,
});

var n,
  t,
  r = (function () {
    function e(e, n) {
      for (var t = 0; t < n.length; t++) {
        var r = n[t];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    return function (n, t, r) {
      return t && e(n.prototype, t), r && e(n, r), n;
    };
  })(),
  a = (function () {
    function a() {
      e(this, a);
    }
    return (
      r(a, [
        {
          key: "_touchstart",
          value: function (e, r) {
            for (var a = r.length, u = 0; u < a; u++) r[u] && (r[u] = !1);
            return (
              (n = e.changedTouches[0].clientX),
              (t = e.changedTouches[0].clientY),
              r
            );
          },
        },
        {
          key: "_touchmove",
          value: function (e, r) {
            var a = e.currentTarget.dataset.index,
              u = e.changedTouches[0].clientX,
              c = e.changedTouches[0].clientY,
              o = this._angle(
                {
                  X: n,
                  Y: t,
                },
                {
                  X: u,
                  Y: c,
                }
              );
            if (!(Math.abs(o) > 30)) {
              for (var i = r.length, l = 0; l < i; l++) {
                r[l];
                l == a && (r[l] = !(u > n));
              }
              return r;
            }
          },
        },
        {
          key: "_angle",
          value: function (e, n) {
            var t = n.X - e.X,
              r = n.Y - e.Y;
            return (360 * Math.atan(r / t)) / (2 * Math.PI);
          },
        },
      ]),
      a
    );
  })();

exports.default = a;
