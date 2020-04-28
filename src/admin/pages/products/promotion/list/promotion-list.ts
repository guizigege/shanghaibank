import { ProductType, ProductAuditState } from '@/models/enums';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from '../../store';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import Empty from '@/components/empty/empty'
const debug = require('@/utils/debug')('log:Admin/Products/Promotion/list');

@Component({
  components: {
    CardPromotionInfo,
    Empty
  }
})
class PromotionList extends Vue {
  AppUrls = AppUrls;
  get loading() {
    return store.state.loading;
  }
  get promotion() {
    return store.state.list;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  async mounted() {
    // vue hook
    debug('mounted');
  }

  onSelected(item) {
    store
      .dispatch('initDetail', item)
      .then(() => {
        let url = AppUrls.ADMIN_PRODUCTS_PROMOTION_DETAIL;
        if (item.info.status === ProductAuditState.草稿) {
          store.commit('initEditItem', store.state.detail.product);
          url = AppUrls.ADMIN_PRODUCTS_PROMOTION_FORM;
        }
        wx.navigateTo({ url });
      })
      .catch(err => console.log(err));
  }
}

export default PromotionList;
