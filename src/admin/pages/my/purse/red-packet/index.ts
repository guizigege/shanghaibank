import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardRedPacketInfo from '@/components/detail-red-packet/card-red-packet-info/card-red-packet-info';
import store from '../store';
import Empty from '@/components/empty/empty'
const debug = require('@/utils/debug')('log:Admin/My');

@Component({
  components: {
    CardRedPacketInfo,
    Empty
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  get redList() {
    return store.state.redList;
  }
  get loading() {
    return store.state.loading;
  }
  toDetail(packetId) {
    wx.navigateTo({
      url: `${AppUrls.ADMIN_MY_PURSE_RED_PACKET_DETAIL}?packetId=${packetId}`
    });
  }
  onShow() {
    // 小程序 hook
    store.dispatch('redList').catch((err) => console.log(err));
    debug('onShow');
  }

  async mounted() {
    // vue hook
    wx.setNavigationBarTitle({
      title: '红包发放'
    });
    debug('mounted');
  }
}

export default Index;
