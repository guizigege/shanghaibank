import { Vue, Component } from 'vue-property-decorator';
import CardWalletInfo from '@/components/detail-red-packet/card-wallet-info/card-wallet-info';
import Empty from '@/components/empty/empty'
import store from '../store';
const debug = require('@/utils/debug')('log:wallet');
@Component({
  components: {
    CardWalletInfo,
    Empty
  }
})
class Wallet extends Vue {
  current: string  = 'all';
  get walletList() {
    return store.state.walletList;
  }
  get loading() {
    return store.state.loading;
  }
  show() {
    debug('show');
  }
  mounted() {
    debug('mount');
    wx.setNavigationBarTitle({
      title: '钱包明细'
    });
  }
  onLoad() {
    store.dispatch('withdrawList').catch(err => console.log(err));
  }
  onTabChange(e) {
    this.current = e.mp.detail.key;
    if(this.current==='withdraw'){
      store.commit('walletList', []);
      wx.showToast({title:'功能研发中...',icon:'loading'});
    } else {
      store.dispatch('withdrawList').catch(err => console.log(err));
    }

  }
}
export default Wallet;
