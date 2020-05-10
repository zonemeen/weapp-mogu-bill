var e = require("../../utils/util.js"),
  t = require("../../utils/datamgr.js"),
  n = getApp();

Page({
  data: {
    outcomesort: t.outcomesort,
    incomesort: t.incomesort,
    detail: {},
  },
  onLoad: function (n) {
    if (n.index) {
      this.index = n.index;
      var i = t.getTallyByIndex(Number(n.index)),
        a =
          i.year + "年" + i.month + "月" + i.day + "日 " + e.getWeekStr(i.week),
        o =
          0 == i.comeType
            ? t.outcomesort[i.sortindex]
            : t.incomesort[i.sortindex];
      this.setData({
        detail: i,
        date: a,
        sortIndex: o,
      });
    }
  },
  tapEdit: function (e) {
    var t = this.index;
    wx.navigateTo({
      url: "/pages/addtally/addtally?index=" + t,
    });
  },
  tapDel: function (e) {
    var i = this.index;
    wx.showModal({
      title: "提示",
      content: "确认删除这条记账？",
      success: function (e) {
        if (e.confirm) {
          t.deleteTallyByIndex(i),
            n.sendEvent("change"),
            wx.navigateBack({
              delta: 1,
            });
        } else if (e.cancel) {
          console.log("取消");
        }
      },
    });
  },
  onHide: function () {},
  onUnload: function () {
    this.index = !1;
  },
});
