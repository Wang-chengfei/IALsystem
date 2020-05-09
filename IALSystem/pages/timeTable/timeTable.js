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
    formatter: weekTime,
    item: [],
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
  toDetail: function (e) {
    var thisItem = e.currentTarget.dataset.thisitem
    wx.navigateTo({
      url: 'itemEdit/itemEdit?thisItem=' + JSON.stringify(thisItem),
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
    var item1 = wx.getStorageSync('item')
    var numOfWeek = wx.getStorageSync('numOfWeek')
    var weekDayItem1 = [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
    var weekCourse1 = [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
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
      numOfWeek: numOfWeek,
      item: item1
    })
    //发起网络请求，上传事项数据
    console.log(JSON.stringify(wx.getStorageSync('item')))
    wx.request({
      url: "http://39.102.49.243:8080/IALS/load/item", //服务器地址
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded;charset=utf-8',
        "accept": "application/json, text/javascript, */*;q=0.01"
      },
      scriptCharset: "utf-8",
      dataType: JSON,
      data: {
        openid: wx.getStorageSync('openid'),
        item: JSON.stringify(wx.getStorageSync('item'))
      },
      success: function (res) {
        console.log("更新事项数据成功")
      },
      fail: function (err) {
        console.log("更新事项数据失败")
        console.log(err)
      }
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