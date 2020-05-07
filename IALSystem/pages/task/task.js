var formatTime = require("../../data/formatTime.js");
var today = formatTime.formatData;
var prom = require("../../data/prom.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: []
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
    this.setData({
      task: wx.getStorageSync('task')
    })
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
    var that = this
    // 彻底完成编辑，发送网络请求
    var s = JSON.stringify(wx.getStorageSync('task'))
    prom.wxPromisify(wx.request)({
      url: "http://39.102.49.243:8080/IALS/load/task", //服务器地址
      method: "POST", //请求方法 GET：请求数据， POST：发送数据给服务器并让服务器处理
      header: {
        "content-type": 'application/x-www-form-urlencoded;charset=utf-8', //小程序将以json形式读取文件
        "Accept": "application/json, text/javascript, */*;q=0.01"
      },
      scriptCharset: "utf-8",
      dataType: JSON, //返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
      data: {
        openid: wx.getStorageSync('openid'),
        task: s
      }
    }).then(function () {
      wx.request({
        url: "http://39.102.49.243:8080/IALS/load/task", //服务器地址
        method: "GET", //请求方法 GET：请求数据， POST：发送数据给服务器并让服务器处理
        header: {
          "content-type": 'application/x-www-form-urlencoded;charset=utf-8', //小程序将以json形式读取文件
          "Accept": "application/json, text/javascript, */*;q=0.01"
        },
        scriptCharset: "utf-8",
        dataType: JSON, //返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
        data: {
          openid: wx.getStorageSync('openid')
        },
        success: function (res) {
          console.log("获取任务数据成功")
          var task = JSON.parse(res.data)
          wx.setStorageSync('task', task)
          that.setData({
            task:wx.getStorageSync('task')
          })
        },
        fail: function (err) {
          console.log("获取任务数据失败")
          console.log(err)
        }
      })
    })
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