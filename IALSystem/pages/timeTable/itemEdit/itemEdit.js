var formatTime = require("../../../data/formatTime.js");
var today1 = formatTime.formatDate
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: [{
        type: 0, //0-课程 1-计划
        name: "java", //课程-课程名  计划-计划概述
        remark: "江安一教A", //课程-上课地点  计划-备注
        startTime: "08:15",
        endTime: "11:50",
        repetitionType: 0, //计划重复类型 0-不重复 1-每天重复 2-每周重复 课程时为0
        date: "", //计划且不重复时才有，其他为空字符串
        startWeek: 1, //课程才有，其他为0
        endWeek: 13, //同上
        weekTime: 2, //周几上课 同上
        repetitionTime: [false, false, false, false, false, false, false] //数组中true为重复时间,不是为计划每周重复时为[false,false,false,false,false,false,false]
      },
      {
        type: 1,
        name: "写高数",
        remark: "今天写好",
        startTime: "13:50",
        endTime: "15:30",
        repetitionType: 0,
        date: "2020-05-05",
        startWeek: 0,
        endWeek: 0,
        weekTime: 0,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "数字逻辑",
        remark: "江安综合楼C202",
        startTime: "13:50",
        endTime: "16:25",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 16,
        weekTime: 3,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "军事理论",
        remark: "江安综合楼B206",
        startTime: "19:20",
        endTime: "21:00",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 9,
        weekTime: 1,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "大学英语",
        remark: "江安二级楼C",
        startTime: "10:15",
        endTime: "11:55",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 17,
        weekTime: 4,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "形式与政策",
        remark: "江安综合楼C205",
        startTime: "13:50",
        endTime: "16:25",
        repetitionType: 0,
        date: "",
        startWeek: 11,
        endWeek: 17,
        weekTime: 5,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "概率统计",
        remark: "江安综合楼C203",
        startTime: "16:45",
        endTime: "18:25",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 17,
        weekTime: 3,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "概率统计",
        remark: "江安综合楼C203",
        startTime: "16:45",
        endTime: "18:25",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 17,
        weekTime: 1,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "大学体育",
        remark: "江安二号体育场",
        startTime: "13:50",
        endTime: "15:30",
        repetitionType: 0,
        date: "",
        startWeek: 1,
        endWeek: 17,
        weekTime: 4,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 0,
        name: "计算机辅助三维设计",
        remark: "江安一教B505",
        startTime: "19:20",
        endTime: "21:55",
        repetitionType: 0,
        date: "",
        startWeek: 2,
        endWeek: 13,
        weekTime: 4,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 1,
        name: "写代码",
        remark: "每天坚持！！",
        startTime: "",
        endTime: "",
        repetitionType: 1,
        date: "",
        startWeek: 0,
        endWeek: 0,
        weekTime: 0,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 1,
        name: "背英语单词",
        remark: "每天坚持！",
        startTime: "",
        endTime: "",
        repetitionType: 1,
        date: "",
        startWeek: 0,
        endWeek: 0,
        weekTime: 0,
        repetitionTime: [false, false, false, false, false, false, false]
      },
      {
        type: 1,
        name: "运动",
        remark: "周末去打球",
        startTime: "18:00",
        endTime: "19:00",
        repetitionType: 2,
        date: "",
        startWeek: 0,
        endWeek: 0,
        weekTime: 0,
        repetitionTime: [true, false, false, false, false, false, true]
      },
    ],
    today: today1,
    courseWeekArr: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
      ["到1", "到2", "到3", "到4", "到5", "到6", "到7", "到8", "到9", "到10", "到11", "到12", "到13", "到14", "到15", "到16", "到17", "到18", "到19", "到20", "到21", "到22", "到23", "到24", "到25"]
    ],
    displayWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    week: [0, 1, 2, 3, 4, 5, 6, 7],
    isSaved: false,
    type: 0,
    name: ["java", "写高数"],
    remark: ["江安一教A", "今天写好"],
    startTime: ["08:15", "19:00"],
    endTime: ["11:50", "21:00"],
    repetitionType: 0,
    date: today1,
    startWeek: 1,
    endWeek: 13,
    weekTime: 2,
    repetitionTime: [false, false, false, false, false, true, true]
  },
  toCourse: function (e) {
    this.setData({
      type: 0,
      isSaved:false
    })
  },
  toPlan: function (e) {
    this.setData({
      type: 1,
      isSaved:false
    })
  },
  name: function (e) {
    var name1 = this.data.name;
    name1[this.data.type] = e.detail.value;
    this.setData({
      name: name1,
      isSaved:false
    })
  },
  remark: function (e) {
    var remark1 = this.data.remark;
    remark1[this.data.type] = e.detail.value
    this.setData({
      remark: remark1,
      isSaved:false
    })
  },
  startTime: function (e) {
    var startTime1 = this.data.startTime;
    startTime1[this.data.type] = e.detail.value
    this.setData({
      startTime: startTime1,
      isSaved:false
    })
  },
  endTime: function (e) {
    var endTime1 = this.data.endTime;
    endTime1[this.data.type] = e.detail.value
    this.setData({
      endTime: endTime1,
      isSaved:false
    })
  },
  courseWeek: function (e) {
    var courseWeek = e.detail.value;
    this.setData({
      startWeek: courseWeek[0] + 1,
      endWeek: courseWeek[1] + 1,
      isSaved:false
    })
  },
  dateChange: function (e) {
    this.setData({
      date: e.detail.value,
      isSaved:false
    })
  },
  chooseRepetitionType: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ["不重复", "每天重复", "按周重复"],
      success: function (res) {
        that.setData({
          repetitionType: res.tapIndex,
          isSaved:false
        })
      },
      fail: function (err) {
        console.log(res.errMsg)
      }
    })
  },
  repetitionTime: function (e) {
    var repetitionTime1 = [false, false, false, false, false, false, false];
    var weekArr = e.detail.value;
    for (var i = 0; i < weekArr.length; i++) {
      repetitionTime1[weekArr[i]] = true;
    }
    this.setData({
      repetitionTime: repetitionTime1,
      isSaved:false
    })
    console.log(this.data.repetitionTime)
  },
  save: function (e) {
    var item1 = this.data.item;
    var index = this.data.item.length;
    var type1 = this.data.type;
    var repetitionType1 = this.data.repetitionType;
    if (type1 == 0) repetitionType1 = 0;
    var date1 = this.data.date;
    if (type1 == 0 || repetitionType1 != 0) date1 = "";
    var startWeek1 = this.data.startWeek;
    var endWeek1 = this.data.endWeek;
    var weekTime1 = this.data.weekTime;
    if (type1 == 1) {
      startWeek1 = 0;
      endWeek1 = 0;
      weekTime1 = 0;
    }
    var repetitionTime1 = this.data.repetitionTime;
    if (type1 == 0 || repetitionType1 != 2) repetitionTime1 = [false, false, false, false, false, false, false]
    var thisItem = {
      type: type1,
      name: this.data.name[type1],
      remark: this.data.remark[type1],
      startTime: this.data.startTime[type1],
      endTime: this.data.endTime[type1],
      repetitionType: repetitionType1,
      date: date1,
      startWeek: startWeek1,
      endWeek: endWeek1,
      weekTime: weekTime1,
      repetitionTime: repetitionTime1
    }
    item1[index] = thisItem;
    this.setData({
      isSaved: true,
      item: item1
    })
    wx.showToast({
      title: '保存成功',
    })
    console.log(this.data.item);
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