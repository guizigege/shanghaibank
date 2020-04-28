import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import Empty from '@/components/empty/empty';
import store from '../store';

const debug = require('@/utils/debug')('log:Home/PromotionList');

@Component({
  components: {
    CardPromotionInfo,
    Empty
  }
})
class PromotionList extends Vue {
  AppUrls = AppUrls;

  get promotion() {
    return store.state.list.promotion;
  }
  get loading() {
    return store.state.loading;
  }
  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }
}

export default PromotionList;
