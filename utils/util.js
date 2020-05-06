var t = function (t) {
  return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
  formatDate: function (n, o, e, r) {
    if (o || e || r)
      return n ? [o, e].map(t).join("-") : [o, e, r].map(t).join("-");
    var u = new Date(),
      i = u.getFullYear(),
      a = u.getMonth() + 1,
      c = u.getDate();
    return n ? [i, a].map(t).join("-") : [i, a, c].map(t).join("-");
  },
  px2rpx: function (t, n) {
    return (750 * t) / n;
  },
  rpx2px: function (t, n) {
    return (t / 750) * n;
  },
  showTip: function (t, n, o, e) {
    e || (e = 500),
      wx.showToast({
        title: t,
        icon: n,
        duration: e,
        success: o,
      });
  },
  showModal: function (t, n, o, e) {
    wx.showModal({
      title: t,
      content: n,
      showCancel: e || !1,
      success: o,
    });
  },
  isFunction: function (t) {
    return "function" == typeof t;
  },
  formatNumber: t,
  getWeekStr: function (t) {
    var n = "";
    return (
      0 == t
        ? (n = "星期日")
        : 1 == t
        ? (n = "星期一")
        : 2 == t
        ? (n = "星期二")
        : 3 == t
        ? (n = "星期三")
        : 4 == t
        ? (n = "星期四")
        : 5 == t
        ? (n = "星期五")
        : 6 == t && (n = "星期六"),
      n
    );
  },
};
