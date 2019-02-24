
//获取应用实例
const app = getApp();
console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myPoints: '',
    MessagesCount: '',
    moblie: '',
    code: '',
    isCityParter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log("huoqu");
      console.log(wx.canIUse('button.open-type.getUserInfo'));
      //更新数据
      that.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    })
    if (!!app.globalData.mobile) {
      this.getroleInfo();
    }
  },
  getroleInfo: function () {
    let that = this;
    var data = {
      "mobile": app.globalData.mobile
    };
    wx.request({
      url: app.globalData.BaseUrl + 'miniuser/role',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("success:")
        console.log(res);
        if (res.data.code == "200") {
          if (res.data.data == 1) {
            that.setData({
              isCityParter: true
            })
          }

          // this.data.MessagesCount=res.data.data;
          // wx.showToast({
          //   title: '提交成功',
          //   icon: 'success',
          //   duration: 2000
          // });
        } else {
          // wx.showToast({
          //   title: '登录失败'+res.data.message,
          //   icon: 'success',
          //   duration: 2000
          // });
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
  ToCityParter: function () {
    wx.navigateTo({
      url: '../clinic_revenue/clinic_revenue'
    })
  },
  ToIndex: function () {
    wx.navigateTo({
      url: '../pt_user/pt_user'
    })
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

  },
  //获取用户输入的手机号码
  moblieInput: function (e) {
    this.setData({
      moblie: e.detail.value
    })
  },
  //获取验证码的输入值
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {

    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  GetMessageCount: function () {
    var that = this;
    var data = {
      // "lastDate": "2019-02-07 23:56:30",
      "level": 0,
      "mobile": app.globalData.mobile
    };
    wx.request({
      url: app.globalData.BaseUrl + 'message/count',
      method: 'Post',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("success:")
        console.log(res);
        if (res.data.code == "200") {
          if (res.data.data > 0) {
            that.setData({
              MessagesCount: res.data.data
            })
          }

          // this.data.MessagesCount=res.data.data;
          // wx.showToast({
          //   title: '提交成功',
          //   icon: 'success',
          //   duration: 2000
          // });
        } else {
          // wx.showToast({
          //   title: '登录失败'+res.data.message,
          //   icon: 'success',
          //   duration: 2000
          // });
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
  onConfirm: function () {
    var that = this;
    if (!!this.data.moblie && !!this.data.code) {
      var data = {
        "fullName": "string"
        , "mobile": this.data.moblie
        , "smsCode": this.data.code
      };
      wx.request({
        url: app.globalData.BaseUrl + 'level4/login',
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
              moblie: that.data.moblie
            })
            that.GetMessageCount();
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });
            that.hideModal();
          } else {
            wx.showToast({
              title: res.data.message,
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
    } else {
      wx.showToast({

        title: '手机号或者密码不正确',
        icon: 'fail',
        duration: 2000

      })
    }

  },
  /**
   * 对话框确认按钮点击事件
   */
  onCode: function () {
    var that = this;
    if (!!this.data.moblie) {
      let str = /^1\d{10}$/
      var data = { "mobile": this.data.moblie };
      console.log(str.test(this.data.moblie));
      if (str.test(this.data.moblie)) {
        wx.request({
          url: app.globalData.BaseUrl + 'common/sms',
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
                title: '发送成功',
                icon: 'success',
                duration: 2000
              });
              // that.hideModal();
            }
          },
          fail: function (error) {
            console.log("fail log:");
            console.log(error);
            //   wx.hideLoading();
            reject(false)
          },
          complete: function () {
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

  },
  getUserInfo: function (e) {
    console.log("mypages:e")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navaddressManage: function () {
    wx.navigateTo({
      url: '../pt_address/pt_address'
    })
  }

})