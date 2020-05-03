var formatTime = require("../../data/formatTime.js");
var today = formatTime.formatData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    task: [{
        summary: "写报告",
        details: "写报告写报告写报告写报告写报告写报告写报告写报告写报告写报告写报告",
        deadline: "2020-05-05",
        importanceLevel: 5,
        completed: false,
        color: "red"
      },
      {
        summary: "复习高数",
        details: "复习高数复习高数复习高数复习高数复习高数复习高数",
        deadline: "2020-05-01",
        importanceLevel: 4,
        completed: false,
        color: "yellow"
      },
      {
        summary: "学习小程序",
        details: "学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序",
        deadline: "2020-05-16",
        importanceLevel: 3,
        completed: false,
        color: "green"
      }
    ]
  },
  addTask: function () {
    wx.navigateTo({
      url: 'taskEdit/taskEdit'
    })
  },
  toDetails: function (e) {
    var key = e.currentTarget.dataset.index
    wx.navigateTo({
      url: 'taskEdit/taskEdit?taskIndex=' + key
    })
  },
  clearTask: function () {
    wx.showModal({
      title: "提示",
      content: "您确定要删除所有已完成的任务吗？",
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: "删除成功",
            duration: 1000
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid1 = wx.getStorageSync('openid'); //获取openid
    this.setData({
      openid: openid1
    })
    wx.request({
      url: '39.102.49.243/load/task',  //服务器地址
      method:"GET",  //请求方法 GET：请求数据， POST：发送数据给服务器并让服务器处理
      header: {
        'content-type': 'application/json'  //小程序将以json形式读取文件
      },
      dataType:JSON,  //返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
      data:{
        openid:wx.getStorageSync('openid')  //发送给服务器的请求参数
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    // var day = today.split("-");
    // var todayYear = day[0];
    // var todayMonth = day[1];
    // var todayDate = day[2];
    // //获取任务以上色
    // var task1 = this.data.task;
    // for(var i = 0; i<task1.length;i++){
    //   var deadline1 = task1[i].deadline.split("-");
    //   var deadlineYear = deadline1[0];
    //   var deadlineMonth = deadline1[1];
    //   var deadlineDate = deadline1[2];
    //   if(todayYear == deadlineYear && todayMonth == deadlineMonth && deadlineDate-todayDate<3){
    //     task1[i].color = "red"
    //   }
    //   else if(task1[i].importanceLevel>7)task1[i].color = "red";
    //   else if(task1[i].importanceLevel>3)task1[i].color = "yellow"
    //   else task1[i].color = "green"
    // }
    // //根据紧急程度对任务进行排序
    // var by = function (prop) {
    //   return function (obj1, obj2) {
    //     var val1 = obj1[prop];
    //     var val2 = obj2[prop];
    //     if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
    //       val1 = Number(val1);
    //       val2 = Number(val2);
    //     }
    //     if (val1 < val2) {
    //       return 1;
    //     } else if (val1 > val2) {
    //       return -1;
    //     } else {
    //       return 0;
    //     }
    //   }
    // }
    // task1.sort(by("importanceLevel"));
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