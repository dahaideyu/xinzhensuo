// pages/pt_applayforreturn.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        selectData:['韵达','圆通','邮政','中通','顺丰','德邦'],
        index:0
    },
    selectTap(){
        this.setData({
            show:!this.data.show
        })
    },
    optionTap(e){
        let Index = e.currentTarget.dataset.index;
        this.setData({
            index:Index,
            show:!this.data.show
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '申请退货',
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