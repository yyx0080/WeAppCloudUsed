// pages/ADDCaculate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num1: 0,
    num2: 0,
    result: 0,
  },

  // 用户输入第一个数字
  inputNum1: function (e) {
    this.setData({
      num1: parseFloat(e.detail.value) || 0, // 转为数字，如果无法转换，则默认为 0
    });
  },

  // 用户输入第二个数字
  inputNum2: function (e) {
    this.setData({
      num2: parseFloat(e.detail.value) || 0,
    });
  },

  // 调用云函数计算和
  calculateSum: function () {
    const sum = this.data.num1 + this.data.num2;
    this.setData({
      result:sum,
    });
    console.log('Res:', this.data.result); 
    wx.cloud.callFunction({
      name: 'GetAddRes',
      data: {
        num1: this.data.num1,
        num2: this.data.num2,
      },
      success: res => {
        console.log('Cloud Function Response:', res.result);   
      },
      fail: err => {
        console.error(err);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      envId: options.envId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})