const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUpdate:false,
    moblie:'',
    receiveMan:'',
    area:'',
    addressdetail:'',
    disbtName:''
  },
  //获取用户输入的手机号码
  moblieInput: function (e) {
    this.setData({
      moblie: e.detail.value
    })
  },
  receiveManInput: function (e) {
    this.setData({
      receiveMan: e.detail.value
    })
  },
  addressdetailInput: function (e) {
    this.setData({
      addressdetail: e.detail.value
    })
  },
  saveaddress:function(){
    let that=this;
    var data=  {
          "mobile": app.globalData.mobile,
          "receiveAddress": this.data.addressdetail,
          "receiveMobile":this.data.moblie,
          "receiveName":this.data.receiveMan
        }
        wx.request({
          url: app.globalData.BaseUrl + 'address/add',
          method: 'Post',
          data: data,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("success:")
            console.log(res); 
            if (res.data.code == "200") {
              that.setData({
                  address: res.data.data
               
              }) 
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var addressid=  options.addressid; 
   let that=this;
    var data= {
          "addressId":addressid,
          "mobile": app.globalData.mobile
        }
        wx.request({
          url: app.globalData.BaseUrl + 'address/detail',
          method: 'Post',
          data: data,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("success:")
            console.log(res); 
            if (res.data.code == "200") {
              that.setData({ 
                  addressdetail:res.data.data.receiveAddress,
                  moblie:res.data.data.receiveMobile,
                  receiveMan:res.data.data.receiveName
              }) 
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