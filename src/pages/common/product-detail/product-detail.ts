import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { emptyProductDetail } from '@/models/product';
import { handleError } from '@/utils';
import DetailProduct from '@/components/detail-product/detail-product';
import service from '@/api/service/client';

const debug = require('@/utils/debug')('log:Index');

@Component({
  components: {
    DetailProduct
  }
})
class ProductDetail extends Vue {
  AppUrls = AppUrls;

  item = emptyProductDetail;

  isLoaded = false;

  productId = '';

  async onLoad(options) {
    if (options && options.productId) {
      wx.showNavigationBarLoading();
      this.productId = options.productId;
      await this.init(options.productId).catch(handleError);
      if (this.item.product.productType === 1) {
        wx.setNavigationBarTitle({ title: '优品详情' });
      } else if (this.item.product.productType === 2) {
        wx.setNavigationBarTitle({ title: '活动详情' });
      }
    }
  }

  onUnload() {
    this.item = emptyProductDetail;
    this.isLoaded = false;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  onShareAppMessage() {
    return {
      title: this.item.product.title,
      desc: this.item.product.content,
      path: `${AppUrls.CLIENT_COMMON_PRODUCT_DETAIL}?productId=${
        this.item.product.productId
        }`
    };
  }

  async onReload() {
    // console.log('on reload :', this.productId);
    if (this.productId) {
      this.isLoaded = false;
      this.init(this.productId);
    }
  }

  async init(productId) {
    this.item = await service.getProductDetail(productId);
    this.isLoaded = true;
    wx.hideNavigationBarLoading();
  }
}

export default ProductDetail;
