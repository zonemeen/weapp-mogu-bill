require("utils/util.js");

App({
  onLaunch: function () {
    wx.cloud.init({
      env: "test-juvis",
      traceUser: true,
    });
    this.getSystemInfo();
  },
  getSystemInfo: function () {
    var t = this;
    wx.getSystemInfo({
      success: function (e) {
        t.globalData.systemInfo = e;
      },
    });
  },
  addEventListener: function (t, e) {
    var n = this.globalData.evtListenerMap[t];
    n || ((n = []), (this.globalData.evtListenerMap[t] = n));
    var a = !1;
    for (var s in n) n[s] && n[s][0] == e && (a = !0);
    if (!a) {
      var i = [e];
      n.push(i);
    }
  },
  sendEvent: function (t, e) {
    var n = this.globalData.evtListenerMap[t];
    if (n) {
      var a = [];
      for (var s in n) a.push(n[s]);
      for (var s in a) a[s][0] && a[s][0](e);
    }
  },
  removeEventListener: function (t, e) {
    var n = this.globalData.evtListenerMap[t];
    if ((console.log("evtListenerList", n), n))
      for (var a in n) n[a][0] == e && n[a].pop();
  },
  globalData: {
    systemInfo: {},
    userInfo: {},
    evtListenerMap: {},
  },
});
