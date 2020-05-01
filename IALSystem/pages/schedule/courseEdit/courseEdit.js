var scheduleData = require('../../../data/scheduleData.js');
var course1 = scheduleData.courses;
var classTime1 = scheduleData.classTimes;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: [],
    weekArr: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
      ["到1", "到2", "到3", "到4", "到5", "到6", "到7", "到8", "到9", "到10", "到11", "到12", "到13", "到14", "到15", "到16", "到17", "到18", "到19", "到20", "到21", "到22", "到23", "到24", "到25"]
    ],
    classTimeArr: [
      ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
      ["到1", "到2", "到3", "到4", "到5", "到6", "到7", "到8", "到9", "到10", "到11", "到12", "到13", "到14", "到15"]
    ],
    weekIndex: [],
    classTimeIndex: []
  },
  weekChange: function (e) {
    var week = e.detail.value;
    var course1 = this.data.course;
    course1.startWeek = week[0] + 1;
    course1.endWeek = week[1] + 1;
    this.setData({
      weekIndex: week,
      course: course1
    })
  },
  classTimeChange: function (e) {
    var course1 = this.data.course;
    var index = e.currentTarget.dataset.index
    var classTimeIndex1 = this.data.classTimeIndex;
    classTimeIndex1[index] = e.detail.value
    course1.section[index].weekTime = classTimeIndex1[index][0] + 1;
    course1.section[index].startLesson = classTimeIndex1[index][1] + 1;
    course1.section[index].endLesson = classTimeIndex1[index][2] + 1;
    this.setData({
      classTimeIndex: classTimeIndex1,
      course: course1
    })
  },
  nameChange:function(e){
    var course1 = this.data.course;
    course1.name = e.detail.value
    this.setData({
      course:course1
    })
  },
  teacherChange:function(e){
    var course1 = this.data.course;
    course1.teacher = e.detail.value
    this.setData({
      course:course1
    })
  },
  locationChange:function(e){
    var course1 = this.data.course;
    var index = e.currentTarget.dataset.index;
    course1.section[index].location = e.detail.value
    this.setData({
      course:course1
    })
    console.log(this.data.course)
  },
  addSection:function(e){
    var course1 = this.data.course;
    course1.section.push({location:"",weekTime:"",startLesson:"",endLesson:""});
    this.setData({
      course:course1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.index;
    var thisCourse = course1[key];
    var weekIndex1 = [thisCourse.startWeek - 1, thisCourse.endWeek - 1];
    var classTimeIndex1 = [];
    for (var i = 0; i < thisCourse.section.length; i++) {
      classTimeIndex1[i] = [thisCourse.section[i].weekTime - 1, thisCourse.section[i].startLesson - 1, thisCourse.section[i].endLesson - 1];
    }
    this.setData({
      course: thisCourse,
      weekIndex: weekIndex1,
      classTimeIndex: classTimeIndex1
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