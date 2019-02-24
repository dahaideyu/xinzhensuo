var address = []//地区数据
var testdata= [
  {
    "province": "河南省",
    "citys": [
      "郑州1",
      "郑州2"

    ]
  },
  {
    "province": "山东省",
    "citys": [
      "Jinan1",
      "Jinan2",
    ]
  },
  {
    "province": "湖北省",
    "citys": [
      "wuhan",
      "huangg"
    ]
  }
]
Page({
  
  data: {
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    display: "none",
    currentID: '',
  },
 /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: ' ',
      });
      var that = this;
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    that.animation = animation;

      this.setAllArea();
  },
 //获取地址库
//  getAllArea:function(){
//   var that= this;
//   wx.request({
//     url: app.globalData.url +'/api/Home/GetAllArea',
//     header: {
//       'content-type': 'application/json',
//     },
//     success: function (res) {
//       var result = res.data;
//       if (result.IsError == false) {
//         wx.setStorage({
//           key: 'AllArea',
//           data: result.Result,
//         });
//         address = result.Result;
//         that.setAllArea();
//       }
//       else {
//         wx.showToast({
//           title: code.Msg,
//           icon: 'success',
//           duration: 2000
//         })
//       }
//     },
//     fail: function (res) {
//       wx.showToast({
//         title: "网络错误",
//         icon: 'success',
//         duration: 2000
//       })
//     },
//   });
// },

//设置默认地址信息
setAllArea:function(){
 // var id = address.provinces[0].id
  this.setData({
    provinces: testdata,
    citys: testdata[0].citys,
    //areas: address.areas[address.citys[id][0].id],
  })
},

// 点击所在地区弹出选择框
selectDistrict: function (e) { 
  var that = this
  // 如果已经显示，不在执行显示动画
  if (that.data.addressMenuIsShow) {
    return
  }
  // 执行显示动画
  that.startAddressAnimation(true)
},

// 执行动画
startAddressAnimation: function (isShow) {
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
cityCancel: function (e) {
  this.startAddressAnimation(false)
},
// 点击地区选择确定按钮
citySure: function (e) {
  var that = this
  var city = that.data.city
  var value = that.data.value
  that.startAddressAnimation(false)
  // 将选择的城市信息显示到输入框
  var areaInfo = that.data.provinces[value[0]].province + ',' + that.data.citys[value[1]];
 // var id = that.data.areas[value[2]].id;
  that.setData({
    areaInfo: areaInfo,
   // currentID:id,
  })
},
// 点击蒙版时取消组件的显示
hideCitySelected: function (e) {
  this.startAddressAnimation(true)
},
// 处理省市县联动逻辑
cityChange: function (e) {
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
 
})
