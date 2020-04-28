import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyOrderItem, OrderItem } from '@/models/product';
import { $Toast } from '../../../static/iview/base';

@Component
class OrderDetailBank extends Vue {
  @Prop({ default: emptyOrderItem }) info: OrderItem;

  onLoad() {
    // vue hook
  }

  onAddWechat() {
    if (this.info.wxNumber) {
      wx.setClipboardData({
        data: this.info.wxNumber,
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
    if (this.info.mobile) {
      wx.makePhoneCall({
        phoneNumber: this.info.mobile
      });
    } else {
      $Toast({
        content: '暂未提供电话号码',
        type: 'warning'
      });
    }
  }
}

export default OrderDetailBank;
