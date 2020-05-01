var formatTime = require('../../data/formatTime.js');
var formatDate = formatTime.formatData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:[
      {
        type:0,
        summary:"做PPT",
        remarks:"今天要完成",
        time:{
          startTime:"2020-05-01",
          endTime:"2020-05-05"
        }
      },
      { 
        type:1,
        summary:"背单词",
        remarks:"坚持",
        time:{
          repetitionType:0
        }
      },
      {
        type:1,
        summary:"运动",
        remarks:"每周末去打球",
        time:{
          repetitionType:1,
          repetitionTime:[6,7]
        }
      },
      {
        type:1,
        summary:"旅游",
        remarks:"每月1号 30号出去玩",
        time:{
          repetitionType:2,
          repetitionTime:[1,30]
        }
      }
    ],
    today:""
  },
  addPlan:function(e){
    wx.navigateTo({
      url: 'planEdit/planEdit',
    })
  },
  bindDateChange:function(e){
    this.setData({
      today:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        today:formatDate
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