// pages/downloadCloudImage/index.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [], // 存放云存储中的图片列表
  },

  // 获取云存储中的图片列表
  getImageList: function () {
    db.collection('images').get({
      success: res => {
        const fileList = res.data.map(item => item.fileID);
        
        // 调用 wx.cloud.getTempFileURL 获取临时链接
        wx.cloud.getTempFileURL({
          fileList: fileList,
          success: res => {
            console.log('获取图片列表成功：', res.fileList);
            this.setData({
              imageList: res.fileList,
            });
          },
          fail: err => {
            console.error('获取图片列表失败：', err);
          }
        });
      },
      fail: err => {
        console.error('查询数据库失败：', err);
      }
    });
  },

  // 预览图片
  previewImage: function (e) {
    const currentUrl = e.currentTarget.dataset.url;
    console.log('previewImage function called with URL:', currentUrl);
    wx.previewImage({
      current: currentUrl,
      urls: this.data.imageList.map(item => item.tempFileURL),
    });
  },

  // 下载图片
  downloadImage: function (e) {
    const fileID = e.currentTarget.dataset.fileid;
    wx.downloadFile({
      url: fileID,
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '下载成功',
              icon: 'success',
            });
          },
          fail: () => {
            wx.showToast({
              title: '下载失败',
              icon: 'none',
            });
          }
        });
      },
      fail: err => {
        console.error('下载图片失败：', err);
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
    this.getImageList();
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