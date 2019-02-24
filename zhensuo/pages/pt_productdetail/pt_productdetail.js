const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    pdetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    var vm = this;
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    this.pid = options.pid;
    var data = {
      "goodsId": this.pid
    }
    wx.request({
      url: app.globalData.BaseUrl + 'level4/detail',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("success:")
        console.log(res);
        if (res.data.code == "200") {
          vm.setData({
            pdetail: res.data.data

          })
          // this.data.MessagesCount=res.data.data;
          // wx.showToast({
          //   title: '提交成功',
          //   icon: 'success',
          //   duration: 2000
          // });
        } else {
          wx.showToast({
            title: '获取失败' + res.data.message,
            icon: 'success',
            duration: 2000
          });
        }
      },
      fail: function(error) {
        console.log("fail log:");
        console.log(error);
        //   wx.hideLoading();
        // reject(false)
      },
      complete: function() {
        //  wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 跳转购买页
   */
  buyorder: function(e) {
    let vm = this;
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../pt_shopping/pt_shopping?pid=' + pid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})