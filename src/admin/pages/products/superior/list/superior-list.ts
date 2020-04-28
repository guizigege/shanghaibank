import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { ProductType, ProductAuditState } from '@/models/enums';
import store from '../../store';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import { handleError } from '@/utils';
import Empty from '@/components/empty/empty'
const debug = require('@/utils/debug')('log:Admin/Products/Superior/list');

@Component({
  components: {
    CardSuperiorInfo,
    Empty
  }
})
class SuperiorList extends Vue {
  AppUrls = AppUrls;
  get loading() {
    return store.state.loading;
  }
  get superior() {
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
        let url = AppUrls.ADMIN_PRODUCTS_SUPERIOR_DETAIL;
        if (item.info.status === ProductAuditState.草稿) {
          store.commit('initEditItem', store.state.detail.product);
          url = AppUrls.ADMIN_PRODUCTS_SUPERIOR_FORM;
        }
        wx.navigateTo({ url });
      })
      .catch(handleError);
  }
}

export default SuperiorList;
