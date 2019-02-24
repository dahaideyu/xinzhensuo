const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
      selectData: ['快递（免邮）', '自提'],//下拉列表的数据
      index: 0,//选择的下拉列表下标
      pid:'',
      pdetail:{},
      address:[],
      addAddressArea:false,
      AddressMobile:'',
      AddressMessage:'',
      AddressUserName:'',
      transprice:0
  },
  //点击下拉框
    selectTap() {
        this.setData({
            show: !this.data.show
        });
    },
    // 点击下拉表
    optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index: Index,
            show: !this.data.show
        });
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '购买商品',
    })
    this.pid=options.pid;
    this.getgood();
    this.getAddress();
  },
  AddAddress:function(){
    this.setData({
        addAddressArea: true 
    });
    
  },
  hideModal:function(){
    this.setData({
        addAddressArea: false 
    });
  },
  onCancel:function(){
    this.setData({
        addAddressArea: false 
    });
  },
  getgood:function(){ 
      var that=this;
    var data={
      "goodsId": this.pid
    }
    wx.request({
      url: app.globalData.BaseUrl + 'level4/detail',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("success:")
        console.log(res); 
        if (res.data.code == "200") {
            res.data.data.goodsprice= res.data.data.goodsprice/100.0;
          that.setData({
            pdetail: res.data.data
           
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
    //获取地址的输入值
 AddressInput: function (e) {
        this.setData({
            AddressMessage: e.detail.value
        })
      },
        //获取手机号的输入值
 AddressMobileInput: function (e) {
    this.setData({
        AddressMobile: e.detail.value
    })
  },
  //收货姓名
  AddressNameInput: function (e) {
    this.setData({
        AddressUserName: e.detail.value
    })
  },
  addAddressFun:function(){
      let that=this;
  var data=  {
        "mobile": app.globalData.mobile,
        "receiveAddress": this.AddressMessage,
        "receiveMobile":this.AddressMobile,
        "receiveName":this.AddressUserName
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
  creatOrder:function(){
      let that=this;
      var data={
        "agentMobile": "",
        "goodsId": pdetail.goodsId,
        "logisticsType": 0,
        "mobile": app.globalData.mobile,
        "receiveAddress": this.AddressMessage,
        "receiveMobile": this.AddressMobile,
        "receiveName": this.AddressUserName
      }
    wx.request({
        url: app.globalData.BaseUrl + 'order/create',
        method: 'Post',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("success:")
          console.log(res); 
          if (res.data.code == "200") {
            wx.showToast({
                title: '创建订单成功'  ,
                icon: 'success',
                duration: 1000
              });
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
   * 获取配送地址
   */
  getAddress:function(){ 
    var that=this;
  var data={
    "mobile": app.globalData.mobile,
    "page": 1
  }
  wx.request({
    url: app.globalData.BaseUrl + 'address/list',
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