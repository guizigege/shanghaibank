import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyProductDetail } from '@/models/product';
import { strSeparator } from '@/utils/consts';
import { getImageUrl } from '@/utils';

@Component
class SuperiorDescribe extends Vue {
  @Prop({ default: emptyProductDetail.product }) product;

  urls: Array<string> = [];

  onLoad() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    this.productChanged();
  }

  onUnload() {
    this.urls = [];
  }

  mounted() {
    // vue hook
  }

  onClick() {
    // this.$emit('click', this.bank);
  }

  onPreview(e, type) {
    wx.previewImage({
      current: e,
      urls: this.urls
    });
  }

  private productChanged() {
    if (this.product.otherUrl) {
      const index = this.product.otherUrl.indexOf(strSeparator);
      const list = ~index
        ? this.product.otherUrl.split(strSeparator)
        : [].concat(this.product.otherUrl);

      this.urls = list.map(item => getImageUrl(`${item}`));
    }
  }
}

export default SuperiorDescribe;
