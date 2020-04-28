import { Component, Prop, Emit } from 'vue-property-decorator';
import { AuditData } from '@/models/bank';
import { AuditType, ProductAuditState } from '@/models/enums';
import { AppUrls, IconRedPacket } from '@/utils/consts';
import { Product, emptyProduct } from '@/models/product';
import {
  formatTime,
  timeAgo,
  truncateString,
  getImageUrl
} from '@/utils';
import Contacts from '../contacts/contacts';
import auth from '@/api/auth';
import { EnumValues } from '@/utils/enum-values';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';

@Component({
  components: { Contacts }
})
class CardPromotionInfo extends mixins(CalcDistanceMixin) {
  @Prop({ default: emptyProduct }) promotion: Product;
  AppUrls = AppUrls;

  iconRedPacket = IconRedPacket;

  distance: string = '';

  get isAdminApp() {
    return auth.isAdminApp;
  }

  get beginTime() {
    return this.promotion.beginTime
      ? formatTime(+this.promotion.beginTime)
      : '';
  }

  get content() {
    return truncateString(this.promotion.content, 40);
  }

  get productLinkUrl() {
    return getImageUrl(`${this.promotion.linkUrl}`);
  }

  get timeAgo() {
    return timeAgo(this.promotion.updateTime);
  }

  get status() {
    return EnumValues.getNameFromValue(ProductAuditState, this.promotion.status);
  }

  get isOffice() {
    return auth.isOffice;
  }

  async onLoad() {
    await this.init();
  }

  async onShow() {
    await this.init();
  }

  async init() {
    this.calcDistance(this.promotion.location).then(res => {
      if (res) {
        this.distance = res;
      }
    });
  }

  @Emit('click')
  navToAuditDetail(): AuditData {
    return { type: AuditType.Promotion, info: this.promotion };
  }

  onClick() {
    if (auth.isAdminApp) {
      this.navToAuditDetail();
    } else {
      wx.navigateTo({
        url: `${AppUrls.CLIENT_COMMON_PRODUCT_DETAIL}?productId=${
          this.promotion.productId
          }`
      });
    }
  }
}

export default CardPromotionInfo;
