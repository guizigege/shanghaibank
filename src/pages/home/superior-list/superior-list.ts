import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import Empty from '@/components/empty/empty';
import store from '../store';

const debug = require('@/utils/debug')('log:Home/SuperiorList');

@Component({
  components: {
    CardSuperiorInfo,
    Empty
  }
})
class SuperiorList extends Vue {
  AppUrls = AppUrls;

  get superior() {
    return store.state.list.superior;
  }
  get loading() {
    return store.state.loading;
  }
  onLoad() {
    //
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

export default SuperiorList;
