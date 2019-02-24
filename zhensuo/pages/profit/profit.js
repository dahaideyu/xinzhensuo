const app = getApp();
// pages/ profit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        profits: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '收益',
        });
        this.getprofit();
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

    },
    getprofit: function () {
        var that = this;
        var data = {
            // "lastDate": "2019-02-07 23:56:30",
            "page": 1,
            "mobile": app.globalData.mobile
        };
        wx.request({
            url: app.globalData.BaseUrl + 'level1/money',
            method: 'Post',
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log("success:")
                console.log(res);
                if (res.data.code == "200") {
                    debugger;
                    if (!!res.data.data && res.data.data.length > 0) {
                        var list = res.data.data;
                        for (var i = 0; i < list.length; i++) {
                            // if (list[i].createTime && list[i].createTime.length > 10) {
                            //     list[i].date = list[i].createTime.substr(0, 10);
                            //     list[i].time = list[i].createTime.substr(11, 5);

                            // }
                            list[i].persent= list[i].persent*100; 
                        }
                        that.setData({
                            profits: list
                        })
                    }

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
})