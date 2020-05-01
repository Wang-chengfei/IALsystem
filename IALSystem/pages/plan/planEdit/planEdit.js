Page({

  /**
   * 页面的初始数据
   */
  data: {
    save:"../../../images/icons/save.png",
    delet:"../../../images/icons/clear.png",
    type:1,  //0-短期计划 1-长期计划
    summary:"旅游",
    remarks:"每月1号 30号出去玩",
    time:{
      startTime:"2020-05-01",
      endTime:"2020-05-25",
      repetitionType:0,     //0-每天  1-按周  2-按月
      repetitionTime:[1,30] //重复时间
    }
  },
  typeChange:function(e) {
    this.setData({
      type:e.detail.value
    })
  },
  longType:function(e){
    var that = this;
    var thisTime = this.data.time;
    wx.showActionSheet({
      itemList: [
        "每天",
        "按周选择",
        "按月选择"
      ],
      success:function(res){
        thisTime.repetitionType = res.tapIndex;
        console.log(res.tapIndex);
        that.setData({
          time:thisTime
        })
      }
    })
  },
  startTimeChange:function(e){
    this.setData({
      startTime:e.detail.value
    })
  },
  endTimeChange:function(e){
    this.setData({
      endTime:e.detail.value
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