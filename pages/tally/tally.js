var t = (function (t) {
    return t && t.__esModule
      ? t
      : {
          default: t,
        };
  })(require("../../utils/touch.js")),
  a = getApp(),
  e = require("../../utils/util.js"),
  n = require("../../utils/datamgr.js");

Page({
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    tallylist: [],
    outcomesort: n.outcomesort,
    incomesort: n.incomesort,
    touchIndexData: [],
    outcometotal: 0,
    incometotal: 0,
  },
  onLoad: function (n) {
    a.addEventListener("change", this.uiDataChange),
      this.setData({
        maxDate: e.formatDate(!0),
      });
    var o = wx.createAnimation({
      duration: 800,
      timingFunction: "ease",
    });
    this.animation = o;
    var i = !0;
    setInterval(
      function () {
        i
          ? (this.animation.scale(0.95).step(),
            this.animation.rotateZ(20).step(),
            (i = !i))
          : (this.animation.scale(1).step(),
            this.animation.rotateZ(-20).step(),
            (i = !i)),
          this.setData({
            animationData: o.export(),
          });
      }.bind(this),
      500
    ),
      (this.touch = new t.default()),
      this.update();
  },
  uiDataChange: function () {
    this.update();
  },
  update: function (t, a) {
    if (!t || !a) {
      var o = new Date();
      (t = o.getFullYear()), (a = o.getMonth() + 1);
    }
    for (
      var i = n.getComeByMonth(t, a),
        u = i.length,
        s = [],
        c = {
          title: "",
          outcome: 0,
          income: 0,
          data: [],
        },
        h = this.data.touchIndexData,
        l = 0,
        d = 0,
        r = 0;
      r < u;
      r++
    ) {
      var m = i[r],
        f = i[r + 1],
        D = parseFloat(m.num);
      0 == m.comeType
        ? ((c.outcome = c.outcome + D), (l += D))
        : ((c.income = c.income + D), (d += D)),
        (m.touchindex = r),
        h.push(!1),
        c.data.push(m),
        ((f && m.day != f.day) || r == u - 1) &&
          ((c.title = m.month + "月" + m.day + "日" + e.getWeekStr(m.week)),
          s.push(c),
          (c = {
            title: "",
            outcome: 0,
            income: 0,
            data: [],
          }));
    }
    this.setData({
      year: t,
      month: a,
      tallylist: s,
      touchIndexData: h,
      outcometotal: l,
      incometotal: d,
    });
  },
  onDateChange: function (t) {
    var a = this,
      e = t.detail.value.split("-");
    a.update(e[0], e[1]);
  },
  touchstart: function (t) {
    var a = this.touch._touchstart(t, this.data.touchIndexData);
    this.setData({
      touchIndexData: a,
    });
  },
  touchmove: function (t) {
    var a = this.touch._touchmove(t, this.data.touchIndexData);
    a &&
      this.setData({
        touchIndexData: a,
      });
  },
  del: function (t) {
    wx.showModal({
      title: "提示",
      content: "确认删除这条记账？",
      success: function (e) {
        e.confirm
          ? (n.deleteTallyByIndex(t.currentTarget.dataset.index),
            a.sendEvent("change"))
          : e.cancel;
      },
    });
  },
  showDetail: function (t) {
    wx.navigateTo({
      url: "../detailtally/detailtally?index=" + t.currentTarget.dataset.index,
    });
  },
  addtally: function () {
    wx.navigateTo({
      url: "../addtally/addtally",
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {
    a.removeEventListener("change", this.uiDataChange);
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
