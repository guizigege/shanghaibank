import { ServiceBaseURL } from '@/utils/consts';

/**
 * 微信 API
 */
class WxRequestApi {
  /**
   * 检查微信会话是否过期
   */
  checkSession() {
    return new Promise(function() {
      wx.checkSession({
        success: function() {
          return true;
        },
        fail: function() {
          return false;
        }
      });
    });
  }

  /**
   * 调用微信登录
   */
  login() {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res.errMsg);
          }
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  }

  /**
   * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
   */
  getSetting() {
    return new Promise(function(resolve, reject) {
      wx.getSetting({
        success: function(res) {
          const authSetting = res.authSetting;
          resolve(authSetting);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return new Promise(function(resolve, reject) {
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          if (res['errMsg'] === 'getUserInfo:ok') {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  }

  /**
   * 上传
   * @param filePath
   */
  uploadFile(filePath: string) {
    return new Promise(function(resolve, reject) {
      wx.uploadFile({
        url: `${ServiceBaseURL}/api/attachment/upload/index`,
        filePath,
        name: 'file_data',
        success: res => resolve(res.data),
        fail: err => reject(err)
      });
    });
  }

  /**
   * 下载
   * @param fileId 文件 id
   */
  downloadFile(fileId: string) {
    return new Promise(function(resolve, reject) {
      wx.downloadFile({
        url: `${ServiceBaseURL}/attachment/${fileId}`,
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          } else {
            reject(new Error('获取文件失败'));
          }
        },
        fail: err => reject(err)
      });
    });
  }
}

export default new WxRequestApi();
