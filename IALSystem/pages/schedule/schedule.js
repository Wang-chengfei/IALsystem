var scheduleData = require('../../data/scheduleData.js');
var formatTime = require('../../data/formatTime.js')
var month1 = formatTime.month;
var weekTime1 = formatTime.weekTime;
var course1 = scheduleData.courses;
var classTime1 = scheduleData.classTimes;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: course1,
    classTime:classTime1,
    todayCourse: [],
    code: [],
    month:month1,
    weekTime:weekTime1,
    numOfWeek:10,
    weekDisplay:["周一","周二","周三","周四","周五","周六","周日"],
    lessonDisplay:["1","2","3","4","5","6","7","8","9","10","11","12"]
  },
  addCourse:function(e){
    wx.navigateTo({
      url: '../schedule/courseEdit/courseEdit',
    })
  },
  editCourse:function(e){
    wx.navigateTo({
      url: '../schedule/courseEdit/courseEdit?index='+e.currentTarget.dataset.index,
    })
  },
  editClassTime:function(e){
    wx.navigateTo({
      url: '../schedule/classTimeEdit/classTimeEdit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取所有课程特定的code，以便上色
    var arr = [];
    for (var i = 0; i < this.data.course.length; i++) {
      arr[i] = 0;
      var s = this.data.course[i].name;
      for (var j = 0; j < s.length; j++) {
        arr[i] += s[j].charCodeAt();
      }
    }
    // 获得今日课程
    var todayCourse2 = [];
    var todayCourse1 = this.data.course;
    for (var i = 0; i < todayCourse1.length; i++) {
      var todaySection = todayCourse1[i].section;
      for (var j = 0; j < todaySection.length; j++) {
        if (todaySection[j].weekTime == weekTime1)
          todayCourse2.push({
            name: todayCourse1[i].name,
            location: todaySection[j].location,
            startLesson: todaySection[j].startLesson,
            endLesson: todaySection[j].endLesson
          })
      }
    }
    // 对今日课程排序
    var by = function (prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
    todayCourse2.sort(by("startLesson"))
    this.setData({
      code: arr,
      todayCourse: todayCourse2
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