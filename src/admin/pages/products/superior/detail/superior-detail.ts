import { Vue, Component, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { AppUrls } from '@/utils/consts.ts';
import { ProductType } from '@/models/enums';
import DetailProduct from '@/components/detail-product/detail-product';
import ProductsDetailMixin from '../../products-detail-mixins';

const debug = require('@/utils/debug')('log:Admin/Products/Superior/Detail');

@Component({
  components: {
    DetailProduct
  }
})
class SuperiorDetail extends mixins(ProductsDetailMixin) {
  AppUrls = AppUrls;

  productType: ProductType = ProductType.优品;

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  async mounted() {
    // vue hook
    debug('mounted', this.$store);
  }
}

export default SuperiorDetail;
