//index.js
//获取应用实例
const app = getApp()
// const citys=[
//   {
//     "province": "河南省",
//     "citys": [
//       "郑州"
//     ]
//   },
//   {
//     "province": "山东省",
//     "citys": []
//   },
//   {
//     "province": "湖北省",
//     "citys": []
//   }
// ]



Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tiuoWay: '城市选择',
    select: false,
    select: [0, 0],

    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    areaInfo: '',
    citys: [],
    province: '',
    city: '',
    display: "none",
    currentID: '',
    mobile: '',
    code: '',
    idcard: '',
    fullname: ''
  },
  //获取用户输入的手机号码
  fullnameInput: function(e) {
    this.setData({
      fullname: e.detail.value
    })
  },
  //获取用户输入的手机号码
  idcardInput: function(e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  //获取用户输入的手机号码
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //获取验证码的输入值
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  onShow: () => {

  },
  getSelecedData() {
    console.table(getSelectedAreaData());
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindChange: function(e) {
    if (!e.detail.value || e.detail.value.length < 2) return;
    var region = this.data.region;
    var pro_index = e.detail.value[0];
    var city_index = e.detail.value[1];
    this.setData({
      province: region[0][pro_index],
      city: region[1][city_index]
    })
    this.notify();
  },
  bindColumnChange: function(e) {
    if (e.detail.column === 0) {
      var region = this.data.region;
      var province = region[0][e.detail.value];
      this.setData({
        region: [region[0], raw[province]]
      });
    }
  },

  onLoad: function(options) {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: '身份认证',
    })

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    that.animation = animation;

    this.setAllArea();
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //设置默认地址信息
  setAllArea: function() {
    // var id = address.provinces[0].id
    var that = this;
    var data = {

    }
    wx.request({
      url: app.globalData.BaseUrl + 'level1/city',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("success:")
        console.log(res);
        if (res.data.code == "200") {
          // wx.showToast({
          //     title: '创建订单成功'  ,
          //     icon: 'success',
          //     duration: 1000
          //   });
          that.setData({
            provinces: res.data.data,
            citys: res.data.data[0].citys,
            //areas: address.areas[address.citys[id][0].id],
          })
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

  // 点击所在地区弹出选择框
  selectDistrict: function(e) { 
    var that = this
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    // 执行显示动画
    that.startAddressAnimation(true)
  },

  // 执行动画
  startAddressAnimation: function(isShow) {
    var that = this
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      that.animation.translateY(0 + 'vh').step();
      //显示遮罩层
      that.setData({
        display: "block"
      })

    } else {
      that.animation.translateY(40 + 'vh').step();
      //隐藏遮罩层
      that.setData({
        display: "none"
      })
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function(e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function(e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.citys[value[1]];
    // var id = that.data.areas[value[2]].id;
    that.setData({
      areaInfo: areaInfo,
      // currentID:id,
    })
  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function(e) {
    this.startAddressAnimation(true)
  },
  // 处理省市县联动逻辑
  cityChange: function(e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      //var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: provinces[provinceNum].citys,
        // areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      // var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        // areas: address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  applyCityAgent: function() {
    var that = this;
    var data = {
      "agentCity": this.data.areaInfo,
      "fullName": this.data.fullname,
      "idCardNo": this.data.idcard,
      "mobile": this.data.mobile,
      "smsCode": this.data.code
    }
    wx.request({
      url: app.globalData.BaseUrl + 'level1/auth',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("success:")
        console.log(res);
        if (res.data.code == "200") { 
          // wx.showToast({
          //     title: '创建订单成功'  ,
          //     icon: 'success',
          //     duration: 1000
          //   });
          that.setData({
            provinces: res.data.data,
            citys: res.data.data[0].citys,
            //areas: address.areas[address.citys[id][0].id],
          })
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

  SendCode: function() {
    var that = this;
    if (!!this.data.mobile) {
      let str = /^1\d{10}$/
      var data = {
        "mobile": this.data.mobile
      };
      console.log(str.test(this.data.mobile));
      if (str.test(this.data.mobile)) {
        wx.request({
          url: app.globalData.BaseUrl + 'common/sms',
          method: 'Post',
          data: data,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log("success:")
            console.log(res);
            if (res.data.code == "200") {
              wx.showToast({
                title: '发送成功',
                icon: 'success',
                duration: 2000
              });
              // that.hideModal();
            }
          },
          fail: function(error) {
            console.log("fail log:");
            console.log(error);
            //   wx.hideLoading();
            reject(false)
          },
          complete: function() {
            //  wx.hideLoading();
          }
        })

        //this.hideModal();

      } else {

        wx.showToast({

          title: '手机号不正确',
          icon: 'fail',
          duration: 2000

        })
      }
    }
  }

})