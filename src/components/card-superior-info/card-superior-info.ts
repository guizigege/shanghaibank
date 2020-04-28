import { Component, Prop, Emit } from 'vue-property-decorator';
import { Product, emptyProduct } from '@/models/product';
import { AuditData } from '@/models/bank';
import { AuditType, ProductAuditState } from '@/models/enums';
import {
  formatDate,
  truncateString,
  getImageUrl,
  timeAgo
} from '@/utils';
import { AppUrls, IconRedPacket } from '@/utils/consts';
import EnumValues from '@/utils/enum-values';
import auth from '@/api/auth';
import Contacts from '../contacts/contacts';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';
import WxRouter from '@/mixin/wxRouter';

@Component({
  components: { Contacts }
})
class CardSuperiorInfo extends mixins(CalcDistanceMixin, WxRouter) {
  AppUrls = AppUrls;

  iconRedPacket = IconRedPacket;

  @Prop({ default: emptyProduct }) superior: Product;
  distance: string = '';

  get beginTime() {
    return this.superior.beginTime ? formatDate(+this.superior.beginTime) : '';
  }

  get endTime() {
    return this.superior.endTime ? formatDate(+this.superior.endTime) : '';
  }

  get productStatus() {
    return EnumValues.getNameFromValue(ProductAuditState, this.superior.status);
  }

  get isOffice() {
    return auth.isOffice;
  }

  get isAdminApp() {
    return auth.isAdminApp;
  }

  get content() {
    return truncateString(this.superior.content);
  }

  get productLinkUrl() {
    return getImageUrl(`${this.superior.linkUrl}`);
  }

  get timeAgo() {
    return timeAgo(this.superior.updateTime);
  }

  async onLoad() {
    await this.init();
  }

  async onShow() {
    await this.init();
  }

  async init() {
    this.calcDistance(this.superior.location).then(res => {
      if (res) {
        this.distance = res;
      }
    });
  }

  @Emit('click')
  navToAuditDetail(): AuditData {
    return { type: AuditType.Superior, info: this.superior };
  }

  onClick() {
    if (auth.isAdminApp) {
      this.navToAuditDetail();
    } else {
      this.navigateTo(`${AppUrls.CLIENT_COMMON_PRODUCT_DETAIL}?productId=${this.superior.productId}`);
    }
  }
}

export default CardSuperiorInfo;
