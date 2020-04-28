import { AuditData } from '@/models/bank';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AuditType } from '@/models/enums';
import { AppUrls } from '@/utils/consts';
import { $Toast } from 'static/iview/base';
import { getImageUrl } from '@/utils';

@Component
class CardManagerInfo extends Vue {
  AppUrls = AppUrls;

  @Prop() manager: any;

  manageImg = '';

  companyLogo = '';

  onLoad() {
    // console.log('card manager', this.manager);
    this.manageImg = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
  }

  onShow() {
    // console.log('card manager', this.manager);
    this.manageImg = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
  }

  onHide() {
    // console.log('card manager info hide');
    // this.manager = null;
  }

  onCallPhone() {
    if (this.manager.mobile) {
      wx.makePhoneCall({
        phoneNumber: this.manager.mobile
      });
    } else {
      $Toast({
        content: '暂未提供电话号码'
      });
    }
  }

  onAddWechat() {
    if (this.manager.wxNumber) {
      wx.setClipboardData({
        data: this.manager.wxNumber,
        success() {
          wx.hideToast();
          $Toast({
            content: '微信号已复制'
          });
        }
      });
    } else {
      $Toast({
        content: '暂未提供微信号码'
      });
    }
  }

  onGoBank() {
    if (this.manager.location) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_NAVIGATE}?location=${this.manager.location}`
      });
    } else {
      $Toast({
        content: '暂未提供坐标',
        type: 'warning'
      });
    }
  }

  @Emit('click')
  navToAuditDetail(): AuditData {
    // console.log('card info', { type: AuditType.Manager, info: this.manager });
    return { type: AuditType.Manager, info: this.manager };
  }

  onClick() {
    this.navToAuditDetail();
  }
}

export default CardManagerInfo;
