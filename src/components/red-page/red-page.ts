import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { emptyProductDetail, ProductDetail } from '@/models/product';
import { $Toast } from '../../../static/iview/base';
import { IconBankLogo } from '@/utils/consts';
import service from '@/api/service/client';
import auth from '@/api/auth';

@Component
class RedPage extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  @Prop({ default: 0 }) packetId: number;

  showRed: boolean = false;
  showResult: boolean = false;
  iconBankLogo = IconBankLogo;

  amount: number = 0;

  onLoad() {
    // this.showRedM(e);
  }

  onShow() {
    // this.showRedM(e);
  }

  @Watch('packetId')
  showRedM(value) {
    console.log('watch', value);
    if (auth.isClientApp) {
      this.showRed = true;
    }
  }

  hideRed() {
    this.showRed = false;
  }

  async openRed() {
    console.log('open', this.packetId);
    const req = { productId: this.detail.product.productId, packetId: this.packetId };
    try {
      const res = await service.userGetRed(req);
      this.showResult = true;
      this.amount = res;
    } catch (e) {
      $Toast({
        content: '领取失败'
      });
    }
  }

  okEvent() {
    this.showResult = false;
    this.hideRed();
    this.$emit('getRedSuccess');
  }
}

// @ts-ignore
export default RedPage;
