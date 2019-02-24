// pages/clinic_revenue.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parterinfo: {}
  },
  ToIndex: function () {
    wx.navigateTo({
      url: '../pt_user/pt_user'
    })
  },
  ToMy: function () {
    wx.navigateTo({
      url: '../pt_my/pt_my'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: ' ',
    });
    this.GetUserInfo();
  },
  Tocliniclist:function(){
    wx.navigateTo({
      url: '../clinic_list/clinic_list'
    })
  },
  Toprofit:function(){
    wx.navigateTo({
      url: '../profit/profit'
    })
  },
  /**
   * 获取用户
   */
  GetUserInfo: function () {
    let that = this;
    var data = {
      "mobile": app.globalData.mobile
    }
    wx.request({
      url: app.globalData.BaseUrl + 'level1/infomation',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("clinicsuccess:")
        console.log(res);
        if (res.data.code == "200") { 
          that.setData({
            parterinfo: res.data.data
          })
          // wx.showToast({
          //     title: '创建订单成功'  ,
          //     icon: 'success',
          //     duration: 1000
          //   });
        } else {
          wx.showToast({
            title: '获取失败' + res.data.message,
            icon: 'success',
            duration: 2000
          });
        }
      },
      fail: function (error) {
        console.log("fail log:");
        console.log(error);
        //   wx.hideLoading();
        // reject(false)
      },
      complete: function () {
        //  wx.hideLoading();
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