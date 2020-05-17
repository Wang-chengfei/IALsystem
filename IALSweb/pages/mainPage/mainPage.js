
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayTask: true,
    displayEnWords: true,
    hasTask: true,
    task: [],
    EnWords: []
  },

  toTask: function () {
    wx.navigateTo({
      url: '../task/task',
    })
  },
  toTimeTable: function () {
    wx.navigateTo({
      url: '../timeTable/timeTable',
    })
  },
  toEnWordDetail: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../EnWord/EnWord?index=' + index,
    })
  },
  toChickenSoup: function (e) {
    wx.navigateTo({
      url: '../chickenSoup/chickenSoup',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('numOfWeek')) {
      wx.setStorageSync('numOfWeek', 1)
    }
    if (!wx.getStorageSync('displayTask')) {
      wx.setStorageSync('displayTask', true)
    }
    if (!wx.getStorageSync('displayEnWords')) {
      wx.setStorageSync('displayEnWords', true)
    }
    if (!wx.getStorageSync('EnglishLevel')) {
      wx.setStorageSync('EnglishLevel', "cet4")
    }
    if (!wx.getStorageSync('number_Enword')) {
      wx.setStorageSync('number_Enword', 5)
    }
    wx.login({
      success: function (res) {
        var appid = "wxbc05f859ff1233f3";
        var secret = "b4cfead7b3fd7b3859795636397fde85";
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&grant_type=authorization_code&js_code=" + code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("开启小程序获取用户openid成功")
            wx.setStorageSync('openid', res.data.openid);
            wx.setStorageSync('session_key', res.data.session_key)
            var myOpenid = wx.getStorageSync('openid')
            // 获取用户任务数据
            wx.request({
              url: "http://muzi.fun:8080/IALS/load/task", //服务器地址
              method: "GET", //请求方法 GET：请求数据， POST：发送数据给服务器并让服务器处理
              header: {
                "content-type": 'application/x-www-form-urlencoded;charset=utf-8', //小程序将以json形式读取文件
                "Accept": "application/json, text/javascript, */*;q=0.01"
              },
              scriptCharset: "utf-8",
              dataType: JSON, //返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
              data: {
                openid: myOpenid
              },
              success: function (res) {
                console.log("开启小程序获取任务数据成功")
                // task = task.replace(/\ufeff/g, "");
                var task = JSON.parse(res.data)
                wx.setStorageSync('task', task)
                that.setData({
                  task: wx.getStorageSync('task')
                })
                that.onShow()
              },
              fail: function (err) {
                console.log("开启小程序获取任务数据失败")
                console.log(err)
              }
            })
            //获取用户事项数据
            wx.request({
              url: "http://muzi.fun:8080/IALS/load/item", //服务器地址
              method: "GET",
              header: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
                "Accept": "application/json, text/javascript, */*;q=0.01"
              },
              scriptCharset: "utf-8",
              data: {
                openid: myOpenid
              },
              success: function (res) {
                console.log("开启小程序获取事项数据成功")
                if (res.data == "mission failed:Can not find the item information of this openid!") {
                  console.log(res.data)
                  wx.setStorageSync('item', [])
                } else {
                  var item = res.data
                  wx.setStorageSync('item', item)
                }
              },
              fail: function (err) {
                console.log("开启小程序获取事项数据失败")
                console.log(err)
              }
            })
            // 获取今日单词
            wx.request({
              url: "http://muzi.fun:8080/IALS/get/enword", //服务器地址
              method: "GET",
              header: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
                "Accept": "application/json, text/javascript, */*;q=0.01"
              },
              scriptCharset: "utf-8",
              data: {
                openid: myOpenid
              },
              success: function (res) {
                console.log("开启小程序获取英语单词数据成功")
                var EnWords = res.data
                var realEnWords = []
                for (var i = 0; i < EnWords.length; i++) {
                  realEnWords[i] = JSON.parse(EnWords[i])
                }
                wx.setStorageSync('EnWords', realEnWords)
                that.setData({
                  EnWords: realEnWords
                })
              },
              fail: function (err) {
                console.log("开启小程序获取英语单词数据失败")
                console.log(err)
              }
            })
            //获取加油站信息
            wx.request({
              url: "http://muzi.fun:8080/IALS/get/dailypage", //服务器地址
              method: "GET",
              header: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
                "Accept": "application/json, text/javascript, */*;q=0.01"
              },
              scriptCharset: "utf-8",
              data: {
                openid: myOpenid
              },
              success: function (res) {
                console.log("开启小程序获取加油站数据成功")
                var chickenSoup = [];
                for (var i = 0; i < res.data.length; i++) {
                  chickenSoup[i] = JSON.parse(res.data[i])
                }
                wx.setStorageSync('chickenSoup', chickenSoup)
              },
              fail: function (err) {
                console.log("开启小程序获取加油站数据失败")
                console.log(err)
              }
            })
          },
          fail: function (err) {
            console.log("开启小程序获取用户openid失败")
            console.log(err)
          }
        })
      }
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
    var hasTask1 = false
    var task1 = wx.getStorageSync('task')
    for (var i = 0; i < task1.length; i++) {
      if (task1[i].completed == false) {
        hasTask1 = true
        break
      }
    }
    this.setData({
      hasTask: hasTask1,
      task: wx.getStorageSync('task'),
      EnWords: wx.getStorageSync('EnWords'),
      displayTask: wx.getStorageSync('displayTask'),
      displayEnWords: wx.getStorageSync('displayEnWords')
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