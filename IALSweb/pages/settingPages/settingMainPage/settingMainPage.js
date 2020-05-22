Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayTask: true,
    displayEnWords: true,
    EnglishLevel: "cet4",
    number_Enword: 5,
    numberArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    levelArr: ["cet4", "cet6", "kaoyan"]
  },
  //改变任务是否显示
  changeTask: function (e) {
    this.setData({
      displayTask: e.detail.value
    })
    wx.setStorageSync('displayTask', e.detail.value)
  },
  //改变英语单词是否显示
  changeEnWords: function (e) {
    this.setData({
      displayEnWords: e.detail.value
    })
    wx.setStorageSync('displayEnWords', e.detail.value)
  },
  //选择英语单词等级
  EnglishLevel: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['四级词汇', '六级词汇', '考研词汇'],
      success(res) {
        that.setData({
          EnglishLevel: that.data.levelArr[res.tapIndex]
        })
        wx.setStorageSync('EnglishLevel', that.data.EnglishLevel)
        wx.request({
          url: "https://muzi.fun:8443/IALS/update/user",
          method: "POST",
          header: {
            "content-type": 'application/x-www-form-urlencoded;charset=utf-8',
            "Accept": "application/json, text/javascript, */*;q=0.01"
          },
          scriptCharset: "utf-8",
          dataType: JSON,
          data: {
            openid: wx.getStorageSync('openid'),
            column: "EnglishLevel",
            data: wx.getStorageSync('EnglishLevel')
          },
          success: function (res) {
            console.log("更改用户英语单词等级信息成功")
            wx.request({
              url: "https://muzi.fun:8443/IALS/get/enword", //服务器地址
              method: "GET",
              header: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
                "Accept": "application/json, text/javascript, */*;q=0.01"
              },
              scriptCharset: "utf-8",
              data: {
                openid: wx.getStorageSync('openid')
              },
              success: function (res) {
                console.log("更新英语单词数据成功")
                var EnWords = res.data
                var realEnWords = []
                for (var i = 0; i < EnWords.length; i++) {
                  realEnWords[i] = JSON.parse(EnWords[i])
                }
                wx.setStorageSync('EnWords', realEnWords)
                console.log(wx.getStorageSync('EnWords'))
              },
              fail: function (err) {
                console.log("更改用户英语单词等级信息成功")
                console.log(err)
              }
            })
          },
          fail: function (err) {
            console.log("更改用户英语单词信息失败")
            console.log(err)
          }
        })
      },
      fail(err) {
        console.log(err.errMsg)
      }
    })

  },
  //选择英语单词数量
  number_Enword: function (e) {
    this.setData({
      number_Enword: Number(e.detail.value) + 1
    })
    wx.setStorageSync('number_Enword', this.data.number_Enword)
    wx.request({
      url: "https://muzi.fun:8443/IALS/update/user",
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded;charset=utf-8',
        "Accept": "application/json, text/javascript, */*;q=0.01"
      },
      scriptCharset: "utf-8",
      dataType: JSON,
      data: {
        openid: wx.getStorageSync('openid'),
        column: "number_Enword",
        data: wx.getStorageSync('number_Enword')
      },
      success: function (res) {
        console.log("更改用户英语单词数量信息成功")
        wx.request({
          url: "https://muzi.fun:8443/IALS/get/enword", //服务器地址
          method: "GET",
          header: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
            "Accept": "application/json, text/javascript, */*;q=0.01"
          },
          scriptCharset: "utf-8",
          data: {
            openid: wx.getStorageSync('openid')
          },
          success: function (res) {
            console.log("更新英语单词数量数据成功")
            var EnWords = res.data
            var realEnWords = []
            for (var i = 0; i < EnWords.length; i++) {
              realEnWords[i] = JSON.parse(EnWords[i])
            }
            wx.setStorageSync('EnWords', realEnWords)
            console.log(wx.getStorageSync('EnWords'))
          },
          fail: function (err) {
            console.log("开启小程序获取英语单词数量数据失败")
            console.log(err)
          }
        })
      },
      fail: function (err) {
        console.log("更改用户英语单词数量信息失败")
        console.log(err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      displayTask: wx.getStorageSync('displayTask'),
      displayEnWords: wx.getStorageSync('displayEnWords'),
      EnglishLevel: wx.getStorageSync('EnglishLevel'),
      number_Enword: wx.getStorageSync('number_Enword')
    })
    wx.request({
      url: "https://muzi.fun:8443/IALS/get/user",
      method: "GET",
      header: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
        "Accept": "application/json, text/javascript, */*;q=0.01"
      },
      scriptCharset: "utf-8",
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync('EnglishLevel', res.data.EnglishLevel)
        wx.setStorageSync('number_Enword', res.data.number_Enword)
        that.setData({
          EnglishLevel: wx.getStorageSync('EnglishLevel'),
          number_Enword: wx.getStorageSync('number_Enword')
        })
      },
      fail: function (err) {
        console.log("初始化用户英语单词信息失败")
        console.log(err)
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