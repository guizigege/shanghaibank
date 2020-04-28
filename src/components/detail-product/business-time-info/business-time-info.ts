import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { emptyProductDetail, ProductDetail } from '@/models/product';
import { formatDate, isValidJSON } from '@/utils/index';

@Component
class BusinessTimeInfo extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  beginTime = '';

  endTime = '';

  weekday = '';

  holiday = '';

  onLoad() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    this.productChanged();
  }

  onUnload() {
    this.beginTime = '';
    this.endTime = '';
    this.weekday = '';
    this.holiday = '';
  }

  mounted() {
    // vue hook
  }

  private productChanged() {
    if (this.detail && this.detail.product) {
      const product = this.detail.product;

      if (product.bankInfo && isValidJSON(product.bankInfo)) {
        const bankInfo = JSON.parse(product.bankInfo);
        this.weekday = bankInfo.weekday;
        this.holiday = bankInfo.holiday;
      }

      this.beginTime = formatDate(+product.beginTime);
      this.endTime = formatDate(+product.endTime);
    }
  }
}

export default BusinessTimeInfo;
