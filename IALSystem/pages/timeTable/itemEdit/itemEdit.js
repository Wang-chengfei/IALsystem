var formatTime = require("../../../data/formatTime.js");
var today1 = formatTime.formatDate
Page({
  /**
   * 页面的初始数据
   */
  data: {
    today: today1,
    courseWeekArr: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
      ["到1", "到2", "到3", "到4", "到5", "到6", "到7", "到8", "到9", "到10", "到11", "到12", "到13", "到14", "到15", "到16", "到17", "到18", "到19", "到20", "到21", "到22", "到23", "到24", "到25"]
    ],
    displayWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    week: [0, 1, 2, 3, 4, 5, 6, 7],
    type: 0,
    name: "java",
    remark: "江安一教A",
    startTime: "08:15",
    endTime: "11:50",
    repetitionType: 0,
    date: today1,
    startWeek: 1,
    endWeek: 13,
    weekTime: 2,
    repetitionTime: [false, false, false, false, false, true, true]
  },
  toCourse: function (e) {
    this.setData({
      type: 0
    })
  },
  toPlan: function (e) {
    this.setData({
      type: 1
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  startTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  endTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  courseWeek: function (e) {
    var courseWeek = e.detail.value
    this.setData({
      startWeek: courseWeek[0],
      endWeek: courseWeek[1]
    })
    console.log(e.detail.value)
  },
  dateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  repetitionTime: function (e) {
    var repetitionTime1 = [false, false, false, false, false, false, false];
    var weekArr = e.detail.value;
    for (var i = 0; i < weekArr.length; i++) {
      repetitionTime1[weekArr[i]] = true;
    }
    this.setData({
      repetitionTime: repetitionTime1
    })
    console.log(this.data.repetitionTime)
  },
  chooseRepetitionType: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ["不重复", "每天重复", "按周重复"],
      success: function (res) {
        that.setData({
          repetitionType: res.tapIndex
        })
      },
      fail: function (err) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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