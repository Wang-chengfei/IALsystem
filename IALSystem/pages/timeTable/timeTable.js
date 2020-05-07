var formatTime = require("../../data/formatTime.js");
var weekTime = formatTime.weekTime;
var date1 = formatTime.formatDate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numOfWeek: 0,
    weekTime: weekTime,
    formatter: 0,
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
    weekDayItem: [
      [],
      [],
      [],
      [],
      [],
      [],
      [] //从周日算起
    ],
    weekCourse: [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    displayWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  },
  // 页面跳转
  toTheDay: function (e) {
    var day = e.currentTarget.dataset.index;
    this.setData({
      formatter: day
    })
  },
  toAll: function (e) {
    this.setData({
      formatter: 7
    })
  },
  //添加事项
  addItem: function (e) {
    wx.navigateTo({
      url: 'itemEdit/itemEdit',
    })
  },
  //删除事项
  clearItem: function (e) {
    wx.showModal({
      title: "提示",
      content: "您确定要删除所有时间已过的事项吗？",
      // cancelColor: '#fd2a1a',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log("用户点击取消")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      formatter: weekTime
    })
    var numOfWeek = wx.getStorageSync('numOfWeek');
    var weekDayItem1 = this.data.weekDayItem
    var item1 = this.data.item;
    var weekCourse1 = this.data.weekCourse
    //将所有事项分配到对应周几上
    for (var i = 0; i < item1.length; i++) {
      //判断课程
      if (item1[i].type == 0 && item1[i].startWeek <= numOfWeek && item1[i].endWeek >= numOfWeek) {
        weekDayItem1[item1[i].weekTime].push(item1[i])
      } else if (item1[i].type == 1) {
        if (item1[i].repetitionType == 0) { //不重复事项类型判断
          if (weekTime == 0) {
            for (var j = 0; j < 7; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 1) {
            for (var j = -1; j < 6; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 1].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 2) {
            for (var j = -2; j < 5; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 2].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 3) {
            for (var j = -3; j < 4; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 3].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 4) {
            for (var j = -4; j < 3; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 4].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 5) {
            for (var j = -5; j < 2; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 5].push(item1[i]);
                break;
              }
            }
          } else if (weekTime == 6) {
            for (var j = -6; j < 1; j++) {
              var day2 = new Date();
              day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
              var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
              if (s2 == item1[i].date) {
                weekDayItem1[j + 6].push(item1[i]);
                break;
              }
            }
          }
        } else if (item1[i].repetitionType == 1) { //每天重复
          for (var j = 0; j < 7; j++) {
            weekDayItem1[j].push(item1[i])
          }
        } else if (item1[i].repetitionType == 2) //按周重复
          for (var j = 0; j < 7; j++) {
            if (item1[i].repetitionTime[j] == true) weekDayItem1[j].push(item1[i])
          }
      }
    }
    //对每天的事项按startTime进行排序(选择排序法)
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < weekDayItem1[i].length - 1; j++) {
        var minIndex = j;
        for (var k = j + 1; k < weekDayItem1[i].length; k++) {
          var tense = 0;
          if (weekDayItem1[i][k].startTime == "") tense = 1441;
          else {
            var itemData = weekDayItem1[i][k].startTime.split(":");
            var hour = Number(itemData[0]);
            var minute = Number(itemData[1]);
            tense = hour * 60 + minute;
          }
          var tense1 = 0;
          if (weekDayItem1[i][minIndex].startTime == "") tense1 = 1441;
          else {
            var itemData1 = weekDayItem1[i][minIndex].startTime.split(":");
            var hour1 = Number(itemData1[0]);
            var minute1 = Number(itemData1[1]);
            tense1 = hour1 * 60 + minute1;
          }
          if (tense < tense1) minIndex = k;
        }
        var temp = weekDayItem1[i][j];
        weekDayItem1[i][j] = weekDayItem1[i][minIndex];
        weekDayItem1[i][minIndex] = temp;
      }
    }
    //将所有课程分配到对应周几上（包括非本周课程）
    for (var i = 0; i < item1.length; i++) {
      if (item1[i].type == 0) weekCourse1[item1[i].weekTime].push(item1[i])
    }
    //对课程按starTime排序（选择排序法）
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < weekCourse1[i].length - 1; j++) {
        var minIndex = j;
        for (var k = j + 1; k < weekCourse1[i].length; k++) {
          var tense = 0;
          if (weekCourse1[i][k].startTime == "") tense = 1441;
          else {
            var itemData = weekCourse1[i][k].startTime.split(":");
            var hour = Number(itemData[0]);
            var minute = Number(itemData[1]);
            tense = hour * 60 + minute;
          }
          var tense1 = 0;
          if (weekCourse1[i][minIndex].startTime == "") tense1 = 1441;
          else {
            var itemData1 = weekCourse1[i][minIndex].startTime.split(":");
            var hour1 = Number(itemData1[0]);
            var minute1 = Number(itemData1[1]);
            tense1 = hour1 * 60 + minute1;
          }
          if (tense < tense1) minIndex = k;
        }
        var temp = weekCourse1[i][j];
        weekCourse1[i][j] = weekCourse1[i][minIndex];
        weekCourse1[i][minIndex] = temp;
      }
    }
    this.setData({
      weekDayItem: weekDayItem1,
      weekCourse: weekCourse1,
      numOfWeek: numOfWeek
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