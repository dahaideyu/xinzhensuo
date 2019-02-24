const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinics: [],
    hots: [],
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '附近诊所',
    });
    qqmapsdk = new QQMapWX({
      key: 'M6RBZ-YVPWO-UKGW5-SH5ZP-GTDH5-W3FSC' //这里自己的key秘钥进行填充
    });

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
    let vm = this;
    vm.getUserLocation();
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
 * 页面相关事件处理函数--个人信息页面跳转
 */
  UserBaseMessage: function () {

    var moblie = wx.getStorageSync('mobile')
    //如果有手机号
    if (!!moblie) {
      // wx.setStorageSync() 
      wx.navigateTo({
        url: '../pt_my/pt_my'
      })
    } else {//如果没有手机号
      wx.navigateTo({
        url: '../pt_my/pt_my'
      })
    }

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

  },
  navigateToClinic: function () {
    wx.navigateTo({
      url: '../pt_cliniclist/pt_cliniclist'
    })
  },
  navigateToProducts: function () {
    wx.navigateTo({
      url: '../pt_listofcommodities/pt_listofcommodities'
    })
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {

    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("getlocationwgs84");
        console.log(JSON.stringify(res));
        var latitude = res.latitude
        var longitude = res.longitude;
        vm.setData({
          latitude: latitude,
          longitude: longitude
        });
        vm.getnearbyclinics(latitude, longitude)
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
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
  pdetail:function(e){
    let vm=this;
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../pt_productdetail/pt_productdetail?pid='+pid
    })
  },
  getnearbyclinics: function (latitude, longitude) {
    var that = this;
    var data = {
      "lat": latitude,
      "lng": longitude,
      "mobile": app.globalData.mobile
    }
    wx.request({
      url: app.globalData.BaseUrl + 'level4/home',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("success:")
        console.log(res); 
        if (res.data.code == "200") {
          if(!!res.data.data.hot&&res.data.data.hot.length>0){
            var hotlist=res.data.data.hot;
            for(var i=0;i<hotlist.length;i++){
              hotlist[i].price=  (hotlist[i].price/100.0).toFixed(2);
            }
          }
          
          that.setData({
            clinics: res.data.data.clinic,
            hots: res.data.data.hot
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
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }

})