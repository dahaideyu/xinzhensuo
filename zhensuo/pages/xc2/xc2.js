var app = getApp()

Page({

    data: {

        hiddenmodalput: true,


    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '基本资料',
        })
    },

    modalinput: function () {

        this.setData({

            hiddenmodalput: !this.data.hiddenmodalput

        })

    },

    //取消按钮

    cancel: function () {

        this.setData({

            hiddenmodalput: true

        });

    },

    //确认

    confirm: function () {

        this.setData({

            hiddenmodalput: true

        })

    }
})