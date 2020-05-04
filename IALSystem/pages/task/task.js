var formatTime = require("../../data/formatTime.js");
var today = formatTime.formatData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    task:[]
  },
  addTask: function () {
    wx.navigateTo({
      url: 'taskEdit/taskEdit'
    })
  },
  toDetails: function (e) {
    var key = e.currentTarget.dataset.index
    wx.navigateTo({
      url: 'taskEdit/taskEdit?taskIndex=' + key
    })
  },
  clearTask: function () {
    wx.showModal({
      title: "提示",
      content: "您确定要删除所有已完成的任务吗？",
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: "删除成功",
            duration: 1000
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var task1 = wx.getStorageSync('task');
    var openid1 = wx.getStorageSync('openid');
    this.setData({
      openid: openid1,
      task:task1
    })
    console.log(this.data.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})