Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '添加信差',
    })
      
  },
//   保存图片
  saveImaer:function(res){
      wx.downloadFile({
          url: 'http://i1.umei.cc/uploads/tu/201705/9999/rncc8f17c53d.jpg',
          success: function (res) {
              if (res.statusCode == 200) {
                  wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success(res) {
                          wx.showToast({
                              title: '保存成功'
                          })
                      },
                      fail(res) {
                          wx.showToast({
                              title: '保存失败',
                          })
                      }
                  })
              }
          }
      })

  },
//   跳转
gopage:function(){
    
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