import { Vue, Component, Prop } from 'vue-property-decorator';
import { $Toast } from 'static/iview/base';
import { getImageUrl } from '@/utils';
import {AppUrls} from "@/utils/consts";

@Component
class ManagerCoverInfo extends Vue {
  @Prop() manager: any;

  bigFrontCoverUrl = '';

  onLoad() {
    this.init();
  }

  onShow() {
    this.init();
  }

  init() {
    if ('bigFrontCoverUrl' in this.manager.ex.userInfo) {
      this.bigFrontCoverUrl = getImageUrl(this.manager.ex.userInfo.bigFrontCoverUrl);
    } else {
      this.bigFrontCoverUrl = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
    }
    // console.log('manager-cover-info', this.manager);
  }

  onCallPhone() {
    if (this.manager.mobilePhone) {
      wx.makePhoneCall({
        phoneNumber: this.manager.mobilePhone
      });
    } else {
      $Toast({
        content: '该经理没有设置手机号'
      });
    }
  }

  onAddWechat() {
    if (this.manager.wechat) {
      wx.setClipboardData({
        data: this.manager.wechat,
        success() {
          wx.hideToast();
          $Toast({
            content: '微信号已复制'
          });
        }
      });
    } else {
      $Toast({
        content: '该经理没有设置微信号'
      });
    }
  }

  onGoFind() {
    if (this.manager.location) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_NAVIGATE}?location=${this.manager.location}`
      });
    } else {
      $Toast({
        content: '该经理未设置坐标',
        type: 'warning'
      });
    }
  }
}

export default ManagerCoverInfo;
