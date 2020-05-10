var prom = require("../../data/prom.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: [],
    EnWords: [],
    chickenSoup: [{
        content: "有目标的人生才有方向，有规划的人生才更精彩。"
      },
      {
        content: "当走过了曾经隐忍的年月再回首时，我才发现，曾经觉得难以启齿的往事，都不过是沧海一粟，生命给予我的，不是那些艰难，而是成长，是学会举重若轻，是将曾经无法释怀的那些过往，统统放下。"
      },
      {
        content: "所谓的人间烟火，就是这样—个可以时而温暖时而冷漠的词语，所谓的人间，就是这样时而光明时而黑暗的时刻。"
      }
    ]
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
      url: '../EnWord/EnWord?index='+index,
    })
  },
  toChickenSoupDetail: function (e) {
    var key = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../chickenSoup/chickenSoup?chickenSoupData=' + this.data.chickenSoup[key].content,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(wx.getStorageSync('numOfWeek')==null){
      wx.setStorageSync('numOfWeek', 1)
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
              url: "http://39.102.49.243:8080/IALS/load/task", //服务器地址
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
                console.log("开启小程序试获取任务数据成功")
                // task = task.replace(/\ufeff/g, "");
                var task = JSON.parse(res.data)
                wx.setStorageSync('task', task)
                that.setData({
                  task: wx.getStorageSync('task')
                })
              },
              fail: function (err) {
                console.log("开启小程序试获取任务数据失败")
                console.log(err)
              }
            })
            //获取用户事项数据
            wx.request({
              url: "http://39.102.49.243:8080/IALS/load/item", //服务器地址
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
                console.log("开启小程序试获取事项数据成功")
                if (res.data == "mission failed:Can not find the item information of this openid!") {
                  console.log(res.data)
                  wx.setStorageSync('item', [])
                } else {
                  var item = res.data
                  wx.setStorageSync('item', item)
                }
              },
              fail: function (err) {
                console.log("开启小程序试获取事项数据失败")
                console.log(err)
              }
            })
            // 获取今日单词
            wx.request({
              url: "http://39.102.49.243:8080/IALS/get/enword", //服务器地址
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
                console.log("开启小程序试获取英语单词数据成功")
                var EnWords = res.data
                var realEnWords = []
                for(var i = 0;i<EnWords.length;i++){
                  realEnWords[i]=JSON.parse(EnWords[i])
                }
                wx.setStorageSync('EnWords', realEnWords)
                that.setData({
                  EnWords:realEnWords
                })
              },
              fail: function (err) {
                console.log("开启小程序试获取英语单词数据失败")
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
    this.setData({
      task: wx.getStorageSync('task'),
      EnWords: wx.getStorageSync('EnWords')
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