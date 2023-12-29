Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
  },

  uploadImg() {
    const db = wx.cloud.database();
    wx.showLoading({
      title: '上传中，别急....',
    });
    //取得当前时间戳，这一点很关键，是实现唯一性
    const timestamp = new Date().getTime();
    // 将时间戳转换为日期字符串，用作文件名
    // 将时间戳转换为日期字符串，用作文件名
    const date = new Date(timestamp).toLocaleString('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '-'); // 将 / 替换为 -
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `yyxCloudSaveImage-${date}.png`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res);
          console.log('fileid = ',res.fileID);
          //这里需要将图片的id上传到数据库。
          db.collection('images').add({
            data: {
              fileID: res.fileID, // 上传图片返回的 fileID
              //userId: 'userOpenID', // 用户的标识，可以是用户的 OpenID
              uploadTime: new Date(), // 上传时间
              // 其他字段...
            },
            success: res => {
              console.log('上传成功', res);
            },
            fail: err => {
              console.error('上传失败', err);
            }
          });
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    });
  }

});
