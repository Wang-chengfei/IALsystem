
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary:"",
    details:"",
    deadline:"",
    importanceLevel:0,
    save:"../../../images/icons/save.png",
    delet:"../../../images/icons/clear.png",
  },
  bindDateChange:function(e){
    this.setData({
      deadline:e.detail.value
    })
  },
  tapSave:function(e){
    var that = this;
    if(this.data.save=="../../../images/icons/save.png"){
      that.setData({
        save:"../../../images/icons/_save.png"
      })
    }
    wx.showToast({
      title: '保存成功',
      duration:1000
    })
  },
  tapDelet:function(e){
    wx.showModal({
      title: '提示',
      content: '您确定要删除该任务吗？',
      success (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '删除成功',
            duration:1000
          })
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
    var that = this;
    if(options.taskData != null){
    var datas = JSON.parse(options.taskData)
    console.log(datas.summary)
    that.setData({
    summary:datas.summary,
    details:datas.details,
    deadline:datas.deadline,
    difficultyLevel:datas.difficultyLevel,
    importanceLevel:datas.importanceLevel,
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