var app = getApp();
Page({
    data: {
        winHeight: "",
        currentTab: 0,
        scrollLeft: 0, 
        goods:[],
        cards:[],
        expertList: [{ 
            img: "avatar.png",
            name: "欢顔",
            tag: "知名情感博主",
            answer: 134,
            listen: 2234
        }]
    },
    Collection:function(e){
        let vm=this;
        var cvalue = e.currentTarget.dataset.cvalue;
        var goodid=e.currentTarget.dataset.goodid;
        var data={
            "goodsId": goodid,
            "mobile": app.globalData.mobile
          }
          var path='level4/gcollection';
          if(!!cvalue){
            path="level4/dgcollection";
          }
        wx.request({
            url: app.globalData.BaseUrl + path,
            method: 'Post',
            data: data,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("goodlist  success:")
              console.log(res); 
              if (res.data.code == "200") {
                vm.goodLoad();
    vm.cardsLoad();
              } else {
                wx.showToast({
                  title: '失败' + res.data.message,
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
          });
  
    },
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        }
    },
    checkCor: function () {
        if (this.data.currentTab > 2) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    pdetail:function(e){
        let vm=this;
        var pid = e.currentTarget.dataset.pid;
        wx.navigateTo({
          url: '../pt_productdetail/pt_productdetail?pid='+pid
        })
      },
      cardsLoad:function(){
        var that = this;
        var data = { 
            "mobile": app.globalData.mobile,
            "page":1
          }
          wx.request({
            url: app.globalData.BaseUrl + 'level4/clist',
            method: 'Post',
            data: data,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("cardlist  success:")
              console.log(res); 
              if (res.data.code == "200") {
                that.setData({
                    cards: res.data.data
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
          });
    },
    goodLoad:function(){
        var that = this;
        var data = { 
            "mobile": app.globalData.mobile,
            "page":1
          }
          wx.request({
            url: app.globalData.BaseUrl + 'level4/glist',
            method: 'Post',
            data: data,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("goodlist  success:")
              console.log(res); 
              if (res.data.code == "200") {
                that.setData({
                    goods: res.data.data
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
          });
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 180;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
   this.goodLoad();
   this.cardsLoad();
    },
    footerTap: app.footerTap
})