var formatTime = require("../../data/formatTime.js");
var weekTime = formatTime.weekTime;
var date1 = formatTime.formatDate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasPlan: false,
    hasCourse: false,
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
    displayWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    displayDate: [],
    chooseWeek: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周", "第8周", "第9周", "第10周", "第11周", "第12周", "第13周", "第14周", "第15周", "第16周", "第17周", "第18周", "第19周", "第20周", "第21周", "第22周", "第23周", "第24周", "第25周"]
  },
  //改变当前周
  changeNumOfWeek: function (e) {
    this.setData({
      numOfWeek: Number(e.detail.value) + 1
    })
    wx.setStorageSync('numOfWeek', this.data.numOfWeek)
    this.onShow()
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
    var that = this
    wx.showModal({
      title: "提示",
      content: "您确定要删除所有时间已过的事项吗？",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          var flag = false
          var item = wx.getStorageSync('item')
          for (var i = 0; i < item.length; i++) {
            if (item[i].type == 1 && item[i].repetitionType == 0) {
              var now = date1.split("-");
              var thisItem = item[i].date;
              if ((thisItem[0] < now[0]) || (thisItem[0] == now[0] && thisItem[1] < now[1]) || (thisItem[0] == now[0] && thisItem[1] == now[1]) && thisItem[2] < now[2]) {
                item.splice(i, 1)
                i--
                flag = true
              }
            }
          }
          if (flag) {
            wx.setStorageSync('item', item)
            wx.showToast({
              title: '删除成功',
            })
            that.onShow();
          } else {
            wx.showToast({
              title: '无已过时事项',
              image: '/images/icons/jinggao.png'
            })
          }
        } else {
          console.log("用户点击取消")
        }
      },
      fail: function (res) {
        console.log("更新失败")
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
          for (var j = 0 - weekTime; j < 7 - weekTime; j++) {
            var day2 = new Date();
            day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
            var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
            if (s2 == item1[i].date) {
              weekDayItem1[j + weekTime].push(item1[i]);
              break;
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
    //判断有无计划和课程
    var hasPlan1 = false
    var hasCourse1 = false
    for (var i = 0; i < this.data.item.length; i++) {
      if (this.data.item[i].type == 1) {
        hasPlan1 = true
      }
      if (this.data.item[i].type == 0) {
        hasCourse1 = true
      }
    }
    this.setData({
      hasPlan: hasPlan1,
      hasCourse: hasCourse1
    })
    //获取本周所有天的日期
    var weekDate = []
    for (var j = 0 - weekTime; j < 7 - weekTime; j++) {
      var day2 = new Date();
      day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000 * j);
      var s2 = day2.getFullYear() + "-" + ((day2.getMonth() + 1) >= 10 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1)) + "-" + (day2.getDate() >= 10 ? day2.getDate() : '0' + day2.getDate());
      weekDate[j + weekTime] = s2;
    }
    var weekDate1 = []
    for (var i = 0; i < 7; i++) {
      var arr = weekDate[i].split("-")
      weekDate1[i] = arr[1] + "-" + arr[2]
    }
    this.setData({
      displayDate: weekDate1
    })
    //发起网络请求，上传事项数据
    var s = JSON.stringify(wx.getStorageSync('item'))
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
        item: s
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