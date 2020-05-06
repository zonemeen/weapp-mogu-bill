function t(t, a, e) {
  return (
    a in t
      ? Object.defineProperty(t, a, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[a] = e),
    t
  );
}

var a = getApp(),
  e = require("../../utils/util.js"),
  n = require("../../utils/wxcharts.js"),
  i = require("../../utils/datamgr.js"),
  r = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  o = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  s = function (t, a) {
    if (a > 12 || a < 1) return -1;
    var e = a - 1;
    return 1 == e
      ? (t % 4 == 0 && t % 100 != 0) || t % 400 == 0
        ? 29
        : 28
      : o[e];
  },
  l = null,
  c = {
    total: "总支出：",
    rank: "支出排行榜",
  },
  d = {
    total: "总收入：",
    rank: "收入排行榜",
  };

Page({
  data: {
    outcomesort: i.outcomesort,
    incomesort: i.incomesort,
    ranknull: !0,
    rankData: [],
    curSelect: 0,
    selectDate: 0,
    pickerfields: "month",
    year: "",
    month: "",
  },
  onLoad: function (t) {
    var n = this;
    a.addEventListener("change", n.uiDataChange),
      this.setData({
        maxDate: e.formatDate(!0),
      }),
      (this.canvasWidth = e.rpx2px(720, a.globalData.systemInfo.windowWidth)),
      (this.canvasHeight = e.rpx2px(300, a.globalData.systemInfo.windowWidth));
    var i = wx.createAnimation({
      duration: 800,
      timingFunction: "ease",
    });
    this.animation = i;
    var r = !0;
    setInterval(
      function () {
        r
          ? (this.animation.scale(0.95).step(),
            this.animation.rotateZ(20).step(),
            (r = !r))
          : (this.animation.scale(1).step(),
            this.animation.rotateZ(-20).step(),
            (r = !r)),
          this.setData({
            animationData: i.export(),
          });
      }.bind(this),
      500
    ),
      n.setDate(),
      n.update();
  },
  uiDataChange: function () {
    var t = this;
    t.setDate(), (t.needUpdate = !0);
  },
  setDate: function (t, a) {
    var e = this;
    if (!t && !a) {
      var n = new Date();
      (t = n.getFullYear()), (a = n.getMonth() + 1);
    }
    var i, r;
    0 == e.data.selectDate
      ? ((i = "month"), (r = t + "年" + a + "月"))
      : ((i = "year"), (r = t + "年")),
      e.setData({
        pickerfields: i,
        date: r,
        year: t,
        month: a,
      });
  },
  update: function () {
    var t = this,
      a = 0 == t.data.curSelect ? c : d;
    if (0 == t.data.selectDate) {
      var e = i.mergeMonthCome(t.data.year, t.data.month, t.data.curSelect),
        n = s(t.data.year, t.data.month),
        o = (g = e.chartData).length,
        l = void 0,
        u = void 0,
        h = [],
        f = [],
        m = !1;
      for (l = 1; l <= n; l++) {
        for (u = o - 1; u >= 0; u--) {
          var D = g[u];
          if (D.day == l) {
            h.push(D.num), (m = !0);
            break;
          }
        }
        0 == m && h.push(0), (m = !1), f.push(l);
      }
      t.initChart(h, f),
        t.setData({
          rankData: e.rankData,
          totalNum: e.total,
          totalText: a.total + e.total,
          averageText: "平均值：" + Math.floor(e.total / n),
          rankText: a.rank,
          ranknull: 0 == e.rankData.length,
        });
    } else {
      var g = (e = i.mergeYearCome(t.data.year, t.data.curSelect)).chartData,
        n = r.length,
        p = g.length,
        v = void 0,
        y = void 0,
        k = [],
        x = !1;
      for (v = 1; v <= n; v++) {
        for (y = p - 1; y >= 0; y--) {
          var b = g[y];
          if (b.month == v) {
            k.push(b.num), (x = !0);
            break;
          }
        }
        0 == x && k.push(0), (x = !1);
      }
      t.initChart(k, r),
        t.setData({
          rankData: e.rankData,
          totalNum: e.total,
          totalText: a.total + e.total,
          averageText: "平均值：" + Math.floor(e.total / n),
          rankText: a.rank,
          ranknull: 0 == e.rankData.length,
        });
    }
  },
  initChart: function (a, e) {
    var i = this,
      r = 0 == i.data.curSelect ? "支出" : "收入";
    l = new n(
      t({
        canvasId: "line-canvas",
        type: "line",
        categories: e,
        categoryNames: "fdfd",
        animation: !0,
        background: "#f5f5f5",
        series: [
          {
            seryname: i.data.selectDate,
            name: r,
            data: a,
            format: function (t, a) {
              return isNaN(t) ? 0 : t;
            },
            color: "#343233",
            dataPointShape: "circle",
            dataPointFillColor: "#3eb575",
            emptyPointFillColor: "#ffffff",
          },
        ],
        xAxis: {
          disableGrid: !0,
          gridColor: "#c3c3c3",
          fontColor: "#6c6c6c",
          type: "calibration",
        },
        yAxis: {
          disabled: !0,
          max: i.canvasHeight,
          min: 0,
        },
        width: i.canvasWidth,
        height: i.canvasHeight,
        dataLabel: !1,
        dataPointShape: !0,
        legend: !1,
      })
    );
  },
  touchHandler: function (t) {
    l.showToolTip(t, {
      format: function (t, a) {
        return a + (0 == t.seryname ? "日" : "月") + t.name + ":" + t.data;
      },
    });
  },
  selectTap: function (t) {
    var a = this;
    t.currentTarget.id != a.data.curSelect &&
      (a.setData({
        curSelect: t.currentTarget.id,
      }),
      a.update());
  },
  selectDate: function (t) {
    var a = this;
    t.currentTarget.id != a.data.selectDate &&
      (a.setData({
        selectDate: t.currentTarget.id,
      }),
      a.setDate(),
      a.update());
  },
  onDateChange: function (t) {
    var a = this,
      e = String(t.detail.value).split("-"),
      n = e[0],
      i = e[1] || !1;
    (1 == a.data.selectDate && n && n == a.data.year) ||
      (0 == a.data.selectDate && n == a.data.year && i == a.data.month) ||
      (a.setDate(n, i), a.update());
  },
  addtally: function () {
    wx.navigateTo({
      url: "../addtally/addtally",
    });
  },
  onReady: function () {},
  onShow: function () {
    this.needUpdate && ((this.needUpdate = !1), this.update());
  },
  onHide: function () {},
  onUnload: function () {
    a.removeEventListener("change", this.uiDataChange);
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
