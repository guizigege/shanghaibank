import { Component, Prop } from 'vue-property-decorator';
import { ProductDetail, emptyProductDetail } from '@/models/product';
import { EnumValues } from '@/utils/enum-values';
import { ProductAuditState } from '@/models/enums';
import { handleError } from '@/utils';
import auth from '@/api/auth';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';

@Component
class CardCheckStatus extends mixins(CalcDistanceMixin) {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  distance: string = '';
  giftName: string = '';
  productAuditState = ProductAuditState;

  get isAdminApp() {
    return auth.isAdminApp;
  }

  get statusName() {
    return EnumValues.getNameFromValue(
      ProductAuditState,
      this.detail.product.status
    );
  }

  onLoad() {
    this.init().catch(handleError);
  }

  onUnload() {
    this.distance = '';
    this.giftName = '';
  }

  async init() {
    if (this.detail.product.location) {
      this.calcDistance(this.detail.product.location).then(res => {
        if (res) {
          this.distance = res;
        }
      });
    }
    try {
      const giftInfo = JSON.parse(this.detail.product.giftInfo);
      this.giftName = giftInfo[0].name;
    } catch (e) {
      this.giftName = '';
    }
  }
}

export default CardCheckStatus;
