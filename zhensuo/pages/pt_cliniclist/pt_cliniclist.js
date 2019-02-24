const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '诊所列表',
    })
    let vm = this;
var data= 
  {
    "mobile": app.globalData.mobile,
    "page": 1
  }
 
    wx.request({
      url: app.globalData.BaseUrl + 'level4/clinic',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("success:")
        console.log(res); 
        if (res.data.code == "200") {
          vm.setData({
            clinics: res.data.data
           
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
  cdetail:function(e){
    let vm=this;
    var clinicId = e.currentTarget.dataset.clinicid;
    wx.navigateTo({
      url: '../pt_clinicdetails/pt_clinicdetails?clinicId='+clinicId
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