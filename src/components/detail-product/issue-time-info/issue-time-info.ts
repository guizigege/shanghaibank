import { Product, emptyProductDetail } from '@/models/product';
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { formatTime } from '@/utils';

@Component
class IssueTimeInfo extends Vue {
  @Prop({ default: emptyProductDetail.product }) product;

  beginTime = '';

  endTime = '';

  onLoad() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    this.productChanged();
  }

  onUnload() {
    this.beginTime = '';
    this.endTime = '';
  }

  mounted() {
    // vue hook
  }

  onClick() {
    // this.$emit('click', this.bank);
  }

  private productChanged() {
    if (this.product) {
      this.beginTime = this.product.beginTime
        ? formatTime(+this.product.beginTime)
        : '';
    }
  }
}

export default IssueTimeInfo;
