var formatTime = require("../../../data/formatTime.js");
var today1 = formatTime.formatDate
var index = -1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newItem: true,
    item: [],
    today: today1,
    courseWeekArr: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
      ["到1", "到2", "到3", "到4", "到5", "到6", "到7", "到8", "到9", "到10", "到11", "到12", "到13", "到14", "到15", "到16", "到17", "到18", "到19", "到20", "到21", "到22", "到23", "到24", "到25"]
    ],
    displayWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    week: [0, 1, 2, 3, 4, 5, 6, 7],
    isSaved: false,
    type: 0,
    name: ["", ""],
    remark: ["", ""],
    startTime: ["", ""],
    endTime: ["", ""],
    repetitionType: 0,
    date: today1,
    startWeek: 0,
    endWeek: 0,
    weekTime: -1,
    repetitionTime: [false, false, false, false, false, false, false]
  },

  toCourse: function (e) {
    this.setData({
      type: 0,
      isSaved: false
    })
  },
  toPlan: function (e) {
    this.setData({
      type: 1,
      isSaved: false
    })
  },
  name: function (e) {
    var name1 = this.data.name;
    name1[this.data.type] = e.detail.value;
    this.setData({
      name: name1,
      isSaved: false
    })
  },
  remark: function (e) {
    var remark1 = this.data.remark;
    remark1[this.data.type] = e.detail.value
    this.setData({
      remark: remark1,
      isSaved: false
    })
  },
  startTime: function (e) {
    var startTime1 = this.data.startTime;
    startTime1[this.data.type] = e.detail.value
    this.setData({
      startTime: startTime1,
      isSaved: false
    })
  },
  endTime: function (e) {
    var endTime1 = this.data.endTime;
    endTime1[this.data.type] = e.detail.value
    this.setData({
      endTime: endTime1,
      isSaved: false
    })
  },
  weekTime: function (e) {
    this.setData({
      weekTime: e.detail.value
    })
  },
  courseWeek: function (e) {
    console.log(e)
    var courseWeek = e.detail.value;
    this.setData({
      startWeek: courseWeek[0] + 1,
      endWeek: courseWeek[1] + 1,
      isSaved: false
    })
  },
  dateChange: function (e) {
    this.setData({
      date: e.detail.value,
      isSaved: false
    })
  },
  chooseRepetitionType: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ["不重复", "每天重复", "按周重复"],
      success: function (res) {
        that.setData({
          repetitionType: res.tapIndex,
          isSaved: false
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  repetitionTime: function (e) {
    var repetitionTime1 = [false, false, false, false, false, false, false];
    var weekArr = e.detail.value;
    for (var i = 0; i < weekArr.length; i++) {
      repetitionTime1[weekArr[i]] = true;
    }
    this.setData({
      repetitionTime: repetitionTime1,
      isSaved: false
    })
    console.log(this.data.repetitionTime)
  },
  // 保存事项
  save: function (e) {
    var that = this
    var type1 = this.data.type
    //检测用户是否输入正确
    if (this.data.name[type1] == "") {
      wx.showToast({
        title: '课名不可为空',
        image: '../../../images/icons/jinggao.png'
      })
    } else if (this.data.startTime == "" && this.endTime != "") {
      wx.showToast({
        title: '时间错误',
        image: '../../../images/icons/jinggao.png'
      })
    } else if (type1 == 0 && this.data.weekTime == -1) {
      wx.showToast({
        title: '周几不可为空',
        image: '../../../images/icons/jinggao.png'
      })
    } else if (type1 == 0 && this.data.startWeek == 0) {
      wx.showToast({
        title: '上课周不可为空',
        image: '../../../images/icons/jinggao.png'
      })
    } else if(type1 ==0 && this.data.startWeek>this.data.endWeek){
      wx.showToast({
        title: '上课周输入错误',
        image: '../../../images/icons/jinggao.png'
      })
    }
    //若正确，执行保存操作
    else {
      var item1 = that.data.item;
      var type1 = that.data.type;
      var repetitionType1 = that.data.repetitionType;
      if (type1 == 0) repetitionType1 = 0;
      var date1 = that.data.date;
      if (type1 == 0 || repetitionType1 != 0) {
        date1 = "";
      }
      var startWeek1 = that.data.startWeek;
      var endWeek1 = that.data.endWeek;
      var weekTime1 = that.data.weekTime;
      if (type1 == 1) {
        startWeek1 = 0;
        endWeek1 = 0;
        weekTime1 = -1;
      }
      var repetitionTime1 = that.data.repetitionTime;
      if (type1 == 0 || repetitionType1 != 2) repetitionTime1 = [false, false, false, false, false, false, false]
      var thisItem = {
        type: type1,
        name: that.data.name[type1],
        remark: that.data.remark[type1],
        startTime: that.data.startTime[type1],
        endTime: that.data.endTime[type1],
        repetitionType: repetitionType1,
        date: date1,
        startWeek: startWeek1,
        endWeek: endWeek1,
        weekTime: weekTime1,
        repetitionTime: repetitionTime1
      }
      console.log(thisItem)
      if (index != -1) {
        item1[index] = thisItem;
      } else {
        var item2 = wx.getStorageSync('item')
        item2.push(thisItem)
        item1 = item2
      }
      that.setData({
        isSaved: true,
        item: item1
      })
      wx.setStorageSync('item', item1)
      if (that.data.newItem == false) {
        wx.showToast({
          title: '保存成功',
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
  //删除事项
  delet: function (e) {
    var that = this
    var item1 = wx.getStorageSync('item')
    wx.showModal({
      title: '提示',
      content: '您确定要删除改事项吗？',
      success(res) {
        if (res.confirm) {
          item1.splice(index, 1)
          wx.setStorageSync('item', item1)
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //比较两个对象是否相等
  compare: function (x, y) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
      var p;
      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }
      // Compare primitives and functions.     
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
        return true;
      }
      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if ((typeof x === 'function' && typeof y === 'function') ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
      }
      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }
      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
      }
      if (x.constructor !== y.constructor) {
        return false;
      }
      if (x.prototype !== y.prototype) {
        return false;
      }
      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false;
      }
      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }
      }
      for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }
        switch (typeof (x[p])) {
          case 'object':
          case 'function':
            leftChain.push(x);
            rightChain.push(y);
            if (!compare2Objects(x[p], y[p])) {
              return false;
            }
            leftChain.pop();
            rightChain.pop();
            break;

          default:
            if (x[p] !== y[p]) {
              return false;
            }
            break;
        }
      }
      return true;
    }
    if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
    }
    for (i = 1, l = arguments.length; i < l; i++) {
      leftChain = []; //Todo: this can be cached
      rightChain = [];
      if (!compare2Objects(arguments[0], arguments[i])) {
        return false;
      }
    }
    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.date)
    var that = this
    if (options.thisItem != null) {
      wx.setNavigationBarTitle({
        title: '编辑事项',
      })
      var thisItem = JSON.parse(options.thisItem)
      var item = wx.getStorageSync('item')
      that.setData({
        item: wx.getStorageSync('item')
      })
      for (var i = 0; i < item.length; i++) {
        if (that.compare(thisItem, item[i])) {
          index = i
          console.log(index)
          break
        }
      }
      var name1 = ["", ""]
      var remark1 = ["", ""]
      var startTime1 = ["", ""]
      var endTime1 = ["", ""]
      name1[thisItem.type] = thisItem.name
      remark1[thisItem.type] = thisItem.remark
      startTime1[thisItem.type] = thisItem.startTime
      endTime1[thisItem.type] = thisItem.endTime
      that.setData({
        newItem: false,
        type: thisItem.type,
        name: name1,
        remark: remark1,
        startTime: startTime1,
        endTime: endTime1,
        repetitionType: thisItem.repetitionType,
        date: thisItem.date,
        startWeek: thisItem.startWeek,
        endWeek: thisItem.endWeek,
        weekTime: thisItem.weekTime,
        repetitionTime: thisItem.repetitionTime
      })
    } else {
      index = -1
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
    var that = this
    if(that.data.date==""){
      that.setData({
        date: today1
      })
    }
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