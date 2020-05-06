function n() {
  return wx.getStorageSync("tallydata") || [];
}

function t(t) {
  for (var o = n(), e = -1, i = !1, c = 0, a = o.length; c < a; c++)
    if (((e += 1), o[c].time < t.time)) {
      i = !0;
      break;
    }
  -1 == e ? o.unshift(t) : i ? o.splice(e, 0, t) : o.push(t),
    wx.setStorageSync("tallydata", o);
}

function o(t, o) {
  for (
    var e = new Date(t, o - 1, 1).valueOf(),
      i = new Date(t, o, 1).valueOf(),
      c = !1,
      a = [],
      r = n(),
      u = 0,
      x = r.length;
    u < x;
    u++
  ) {
    var m = r[u];
    if (m.time >= e && m.time < i) (c = !0), (m.index = u), a.push(m);
    else if (c) break;
  }
  return a;
}

function e(n, t, e) {
  for (var i, c = [], a = o(n, t), r = 0; (i = a[r++]); )
    i.comeType == e && c.push(i);
  return c;
}

function i(n) {
  var t = Array.isArray(n) ? [] : {};
  if (n && "object" === (void 0 === n ? "undefined" : c(n))) {
    var o;
    for (o in n)
      n.hasOwnProperty(o) &&
        (n[o] && "object" === c(n[o]) ? (t[o] = i(n[o])) : (t[o] = n[o]));
  }
  return t;
}

var c =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (n) {
          return typeof n;
        }
      : function (n) {
          return n &&
            "function" == typeof Symbol &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? "symbol"
            : typeof n;
        },
  a = {
    0: {
      icon: "icon-canyin",
      text: "餐饮",
    },
    1: {
      icon: "icon-jiaotong",
      text: "交通",
    },
    2: {
      icon: "icon-juzhu",
      text: "居住",
    },
    3: {
      icon: "icon-yiliao",
      text: "医疗",
    },
    4: {
      icon: "icon-jiaoyu",
      text: "教育",
    },
    5: {
      icon: "icon-yule",
      text: "娱乐",
    },
    6: {
      icon: "icon-jiaoji",
      text: "交际",
    },
    7: {
      icon: "icon-gouwu",
      text: "购物",
    },
    8: {
      icon: "icon-tongxun",
      text: "通讯",
    },
    9: {
      icon: "icon-lvxing",
      text: "旅行",
    },
    10: {
      icon: "icon-zhangbei",
      text: "长辈",
    },
    11: {
      icon: "icon-haizi",
      text: "孩子",
    },
    12: {
      icon: "icon-jianshen",
      text: "健身",
    },
    13: {
      icon: "icon-chongwu",
      text: "宠物",
    },
    14: {
      icon: "icon-weixiu",
      text: "维修",
    },
    15: {
      icon: "icon-qiche",
      text: "汽车",
    },
    16: {
      icon: "icon-juanzeng",
      text: "捐赠",
    },
    17: {
      icon: "icon-bangong",
      text: "办公",
    },
    18: {
      icon: "icon-renqing",
      text: "人情",
    },
    19: {
      icon: "icon-qita",
      text: "其他",
    },
  },
  r = {
    0: {
      icon: "icon-gongzi",
      text: "工资",
    },
    1: {
      icon: "icon-baoxiao",
      text: "报销",
    },
    2: {
      icon: "icon-jiangjin",
      text: "奖金",
    },
    3: {
      icon: "icon-licai",
      text: "理财",
    },
    4: {
      icon: "icon-jiekuan",
      text: "借款",
    },
    5: {
      icon: "icon-hongbao",
      text: "收红包",
    },
    6: {
      icon: "icon-touzi",
      text: "投资",
    },
    7: {
      icon: "icon-shenghuofei",
      text: "生活费",
    },
    8: {
      icon: "icon-jianzhi",
      text: "兼职",
    },
    9: {
      icon: "icon-qita",
      text: "其他",
    },
  };

module.exports = {
  outcomesort: a,
  incomesort: r,
  getTallyByIndex: function (t) {
    return n()[t];
  },
  setTally: t,
  getComeByMonth: o,
  deleteTallyByIndex: function (t) {
    var o = n();
    o.splice(t, 1), wx.setStorageSync("tallydata", o);
  },
  mergeYearCome: function (t, o) {
    for (
      var e = new Date(t, 0, 1).getTime(),
        c = new Date(Number(t) + 1, 0, 1).getTime(),
        a = [],
        r = [],
        u = !1,
        x = 0,
        m = 0,
        l = 0,
        y = n(),
        f = y.length;
      x < f;
      x++
    ) {
      var s = y[x];
      if (!(s.time < e || s.time >= c || s.comeType != o)) {
        var h = y[x + 1];
        u ? (u.num = u.num + s.num) : (u = i(s)),
          h && s.month != h.month && (a.push(u), (u = !1));
        var g = !1;
        for (m = 0; m < r.length; m++) {
          var p = r[m];
          p.sortindex == s.sortindex && ((g = !0), (r[m].num = p.num + s.num));
        }
        g || r.push(s), (l += s.num);
      }
    }
    return (
      u && a.push(u),
      (r = r.sort(function (n, t) {
        return t.num - n.num;
      })),
      {
        chartData: a,
        rankData: r,
        total: l,
      }
    );
  },
  mergeMonthCome: function (n, t, o) {
    for (
      var c = e(n, t, o),
        a = [],
        r = [],
        u = !1,
        x = 0,
        m = 0,
        l = 0,
        y = c.length;
      x < y;
      x++
    ) {
      var f = c[x],
        s = c[x + 1];
      u ? (u.num = u.num + f.num) : (u = i(f)),
        s && f.day != s.day && (a.push(u), (u = !1));
      var h = !1;
      for (m = 0; m < r.length; m++) {
        var g = r[m];
        g.sortindex == f.sortindex && ((h = !0), (r[m].num = g.num + f.num));
      }
      h || r.push(f), (l += f.num);
    }
    return (
      u && a.push(u),
      (r = r.sort(function (n, t) {
        return t.num - n.num;
      })),
      {
        chartData: a,
        rankData: r,
        total: l,
      }
    );
  },
  editTallyByIndex: function (o, e) {
    var i = n();
    i.splice(o, 1), wx.setStorageSync("tallydata", i), t(e);
  },
};
