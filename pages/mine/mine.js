getApp(), require("../../utils/util.js");

Page({
  data: {
    icon: "/static/images/defaulticon.png",
  },
  previewImage: function () {
    wx.previewImage({
      urls: ["https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/zanshan.jpg"],
    });
  },
  onLoad: function (n) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
