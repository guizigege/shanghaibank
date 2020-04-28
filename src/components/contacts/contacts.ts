import { Vue, Component, Prop } from 'vue-property-decorator';
import { IconWeChat, IconPhone, IconLocal, AppUrls } from '@/utils/consts';
import { $Toast } from '../../../static/iview/base';

@Component
class Contacts extends Vue {
  @Prop({ default: '' }) wxNumber: string;

  @Prop({ default: '' }) mobile: string;

  @Prop({ default: {} }) location; // {latitude: string, longitude: string};

  IconWeChat = IconWeChat;

  iconPhone = IconPhone;

  iconLocal = IconLocal;

  onAddWechat() {
    if (this.wxNumber) {
      wx.setClipboardData({
        data: this.wxNumber,
        success() {
          wx.hideToast();
          $Toast({
            content: '微信号已复制'
          });
        }
      });
    } else {
      $Toast({
        content: '暂未提供微信号码',
        type: 'warning'
      });
    }
  }

  onCallPhone() {
    if (this.mobile) {
      wx.makePhoneCall({
        phoneNumber: this.mobile
      });
    } else {
      $Toast({
        content: '暂未提供电话号码',
        type: 'warning'
      });
    }
  }

  onGoBank() {
    if (this.location) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_NAVIGATE}?location=${this.location}`
      });
    } else {
      $Toast({
        content: '暂未提供坐标',
        type: 'warning'
      });
    }
  }
}

export default Contacts;
