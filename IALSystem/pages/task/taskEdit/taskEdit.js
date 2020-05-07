var formatTime = require("../../../data/formatTime.js");
var today = formatTime.formatDate;
var index = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    task: [],
    summary: "",
    details: "",
    deadline: today,
    importanceLevel: 0,
    completed: false,
    saved: false
  },

  //改变任务概述
  inputSummary: function (e) {
    this.setData({
      summary: e.detail.value,
      saved: false
    })
  },
  //改变任务详情
  inputDetails: function (e) {
    this.setData({
      details: e.detail.value,
      saved: false
    })
  },
  //改变截止日期
  bindDateChange: function (e) {
    this.setData({
      deadline: e.detail.value,
      saved: false
    })
  },
  importanceLevelChange: function (e) {
    this.setData({
      importanceLevel: e.detail.value,
      saved: false
    })
  },
  //保存
  tapSave: function (e) {
    var that = this
    if (this.data.summary == "") {
      wx.showToast({
        title: '概述不可为空',
        image: '../../../images/icons/jinggao.png'
      })
    } else {
      wx.showToast({
        title: '保存成功'
      })
      var task1 = that.data.task;
      if (index != task1.length) {
        task1[index].summary = that.data.summary;
        task1[index].details = that.data.details;
        task1[index].deadline = that.data.deadline;
        task1[index].importanceLevel = that.data.importanceLevel;
        task1[index].completed = that.data.completed;
      } else {
        task1.push({
          summary: that.data.summary,
          details: that.data.details,
          deadline: that.data.deadline,
          importanceLevel: that.data.importanceLevel,
          completed: that.data.completed
        })
      }
      that.setData({
        task: task1,
        saved: true
      })
      wx.setStorageSync('task', that.data.task)
    }
  },
  //删除
  tapDelet: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除该任务吗？',
      success(res) {
        if (res.confirm) {
          var task1 = that.data.task;
          task1.splice(index, 1);
          that.setData({
            task: task1
          })
          wx.setStorageSync('task', that.data.task)
          console.log(that.data.task)
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //完成任务
  tapComplete: function (e) {
    var that = this
    wx.showModal({
      title: "提示",
      content: "您确定完成该任务吗？",
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '完成任务成功',
          })
          that.setData({
            completed: true
          })
        } else console.log("用户点击取消")
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
    index = -1;
    var that = this;
    if (options.taskIndex != null) {
      index = options.taskIndex;
      var datas = this.data.task[options.taskIndex]
      that.setData({
        summary: datas.summary,
        details: datas.details,
        deadline: datas.deadline,
        difficultyLevel: datas.difficultyLevel,
        importanceLevel: datas.importanceLevel,
        completed: datas.completed
      })
    }
    if (index == -1) index = this.data.task.length;
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
    console.log("onHide")
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