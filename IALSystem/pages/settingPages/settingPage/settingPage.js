const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingList:[
      {
        "url":"/pages/settingPages/settingEnglishWords/settingEnglishWords",
        "value":"设置每日词汇",
        "footer":"",
      },
      {
        "url":"/pages/settingPages/settingChickenSoup/settingChickenSoup",
        "value":"设置每日鸡汤",
        "footer":"",
      },
      {
        "url":"/pages/settingPages/settingMotto/settingMotto",
        "value":"设置励志语",
        "footer":"",
      },
      {
        "url":"/pages/settingPages/settingPlan/settingPlan",
        "value":"设置计划",
        "footer":"",
      },
      {
        "url":"/pages/settingPages/settingTask/settingTask",
        "value":"设置任务",
        "footer":"",
      },
      {
        "url":"/pages/settingPages/aboutUs/aboutUs",
        "value":"关于我们",
        "footer":"",
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  toJurisdiction:function(e){
    wx.openSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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