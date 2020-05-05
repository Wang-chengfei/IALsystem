App({
  onLaunch: function () {
    wx.setStorageSync('numOfWeek', 11)
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
            wx.setStorageSync('openid', res.data.openid); //获取用户openid
            wx.setStorageSync('session_key', res.data.session_key)
          },
          fail: function (res) {
            console.log("获取code失败")
          }
        })
      }
    })

    var openid1 = wx.getStorageSync('openid'); //用户的openid
    wx.request({
      url: "http://39.102.49.243:8080/IALS/load/task", //服务器地址
      method: "GET", //请求方法 GET：请求数据， POST：发送数据给服务器并让服务器处理
      header: {
        'content-type': 'application/json' //小程序将以json形式读取文件
      },
      dataType: JSON, //返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
      data: {
        openid: "temptry-05-03" //发送给服务器的请求参数
      },
      success: function (res) {
        console.log("成功")
        var task = res.data.slice(5);
        // task = task.replace(/\ufeff/g, "");
        task = JSON.parse(task)
        wx.setStorageSync('task', task)
      },
      fail: function (res) {
        console.log("失败")
        console.log(res)
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})