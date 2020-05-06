function e(e, t, a) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: a,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = a),
    e
  );
}

var t = getApp(),
  a = require("../../utils/util.js"),
  r = require("../../utils/datamgr.js"),
  i = require("../../utils/calc"),
  n = "",
  c = [],
  s = (function () {
    for (var e = [], t = 0; t < 2; t++)
      e.push(
        (function (e) {
          for (var t = [], a = 10 * e; a < 10 * e + 10; a++) {
            var i = r.outcomesort[a];
            i && t.push(i);
          }
          return t;
        })(t)
      );
    return e;
  })(),
  u = (function () {
    for (var e = [], t = 0; t < 1; t++)
      e.push(
        (function (e) {
          for (var t = [], a = 10 * e; a < 10 * e + 10; a++) {
            var i = r.incomesort[a];
            i && t.push(i);
          }
          return t;
        })(t)
      );
    return e;
  })(),
  o = function () {
    var e = c.length > 0 ? new Date(+c[0], c[1] - 1, c[2]) : new Date();
    return {
      year: e.getFullYear(),
      month: e.getMonth() + 1,
      day: e.getDate(),
      time: e.getTime(),
      week: e.getDay(),
    };
  };

Page({
  swipercurrent: 0,
  data: {
    outcomesort: s,
    incomesort: u,
    date: "今天",
    complete: "完成",
    circular: !0,
    indicatorDots: !1,
    indicatorcolor: "#000",
    vertical: !1,
    autoplay: !1,
    duration: 100,
    curSelect: 0,
    swiperindex: 0,
    curSelectSwiper: 0,
    curSelectWays: 0,
    selectdata: s[0][0],
    sortViewHeight: 500,
  },
  onLoad: function (e) {
    if (
      (this.setData({
        maxDate: a.formatDate(),
      }),
      e.index)
    ) {
      (this.index = e.index), (this.isEdit = !0);
      var t = r.getTallyByIndex(Number(e.index)),
        o = new Date();
      t.year == o.getFullYear() &&
      t.month == o.getMonth() + 1 &&
      t.day == o.getDate()
        ? ((c = []),
          this.setData({
            date: "今天",
          }))
        : ((c = [t.year, t.month, t.day]),
          this.setData({
            date: a.formatDate(!1, t.year, t.month, t.day),
          })),
        i.setInit(t.num),
        (n = t.remark);
      var d = Math.floor(t.sortindex / 10),
        l = t.sortindex % 10,
        h = 0 == t.comeType ? s : u;
      this.setData({
        curSelect: t.comeType,
        curSelectWays: l,
        curSelectSwiper: d,
        swiperindex: d,
        calc: i.getVars(),
        selectdata: h[d][l],
        initTitleValue: t.remark,
      });
    } else i.setInit(0);
  },
  selectTap: function (e) {
    var t = this;
    if (e.currentTarget.id != t.data.curSelect) {
      var a = 0 == e.currentTarget.id ? s : u;
      t.setData({
        curSelect: e.currentTarget.id,
        swiperindex: 0,
        curSelectWays: 0,
        curSelectSwiper: 0,
        selectdata: a[0][0],
      });
    }
  },
  selectWaysTap: function (e) {
    var t = this;
    if (
      e.currentTarget.id != t.data.curSelectWays ||
      t.data.curSelectSwiper != t.data.swiperindex
    ) {
      var a = 0 == t.data.curSelect ? s : u;
      t.setData({
        curSelectWays: e.currentTarget.id,
        curSelectSwiper: t.data.swiperindex,
        selectdata: a[t.data.swiperindex][e.currentTarget.id],
      });
    }
  },
  bingswipercurrent: function (e) {
    this.setData({
      swiperindex: e.detail.current,
    });
  },
  btnClicked: function (e) {
    var a = this,
      c = e.target.dataset.op;
    if ("完成" == c) {
      if (0 == i.getVars().displayNum)
        return void wx.showToast({
          title: "金额数不能为0",
          icon: "none",
        });
      var s = o();
      return (
        (s.remark = n),
        (s.sortindex = 10 * a.data.swiperindex + Number(a.data.curSelectWays)),
        (s.comeType = a.data.curSelect),
        (s.num = Number(i.getVars().displayNum)),
        this.isEdit
          ? (r.editTallyByIndex(this.index, s),
            t.sendEvent("change"),
            void wx.reLaunch({
              url: "/pages/tally/tally",
            }))
          : (r.setTally(s),
            t.sendEvent("change"),
            void wx.navigateBack({
              delta: 1,
            }))
      );
    }
    i.addOp(c),
      this.setData({
        calc: i.getVars(),
      });
  },
  btnTouchStart: function (t) {
    var a = e({}, t.target.dataset.op, "active");
    this.setData({
      tapped: a,
    });
  },
  btnTouchEnd: function (e) {
    e.target.dataset.op;
    var t = {};
    this.setData({
      tapped: t,
    });
  },
  onDateChange: function (e) {
    var t = e.detail.value.split("-"),
      a = new Date();
    +t[0] == a.getFullYear() &&
    +t[1] == a.getMonth() + 1 &&
    +t[2] == a.getDate()
      ? ((c = []),
        this.setData({
          date: "今天",
        }))
      : ((c = t),
        this.setData({
          date: e.detail.value,
        }));
  },
  setRemark: function (e) {
    n = e.detail.value;
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    (this.index = !1), (this.isEdit = !1), (n = "");
  },
  onUnload: function () {
    (this.index = !1), (this.isEdit = !1), (n = "");
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
