
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:[
      {
        summary:"写报告",
        details:"写报告写报告写报告写报告写报告写报告写报告写报告写报告写报告写报告",
        deadline:"2020-05-05",
        importanceLevel:3,
        completed:false,
        iconColor:"yellow"
      },
      {
        summary:"复习高数",
        details:"复习高数复习高数复习高数复习高数复习高数复习高数",
        deadline:"2020-05-01",
        importanceLevel:3,
        completed:false,
        iconColor:"red"
      },
      {
        summary:"学习小程序",
        details:"学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序学习小程序",
        deadline:"2020-05-16",
        importanceLevel:3,
        completed:false,
        iconColor:"green"  
      }
    ]
  },
  addTask:function(){
    wx.navigateTo({
      url: 'taskEdit/taskEdit'
    })
  },
  toDetails:function(e){
    var key = e.currentTarget.dataset.index
    wx.navigateTo({
      url: 'taskEdit/taskEdit?taskData='+ JSON.stringify(this.data.task[key])
    })
  },
  clearTask:function(){
    wx.showModal({
      title:"提示",
      content:"您确定要删除所有已完成的任务吗？",
      success(res){
        if (res.confirm) {
          wx.showToast({
            title: "删除成功",
            duration:1000
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