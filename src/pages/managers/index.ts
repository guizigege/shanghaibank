import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import SelectBank from '@/components/select/select';
import LocationMap from '@/components/location-map/location-map';
import ManagerOneself from './manager-oneself/manager-oneself';
import ManagerCompany from './manager-company/manager-company';
import store from './store';
import { handleError } from '@/utils';
const debug = require('@/utils/debug')('log:Managers');

@Component({
  components: {
    LocationMap,
    ManagerOneself,
    ManagerCompany,
    SelectBank
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  current = 'personal';

  get currentBank() {
    return store.state.currentBank;
  }
  get rangeBankList() {
    return store.state.list.bank;
  }
  private get currentBusinessType() {
    return this.current === 'personal' ? [1] : [2];
  }
  onLoad() {
    //
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading',
    })
  }
  onShow() {
    // 小程序 hook
    debug('onShow');
  }
  onTabChange(e) {
    this.current = e.mp.detail.key;
    store.commit('currentTab',this.currentBusinessType);
    store
      .dispatch('getManagerListData', {
        ...store.state.bank,
        businessType: this.currentBusinessType
      })
      .catch(handleError);

  }
  chooseBank(bank) {
    store.commit('currentBank', {
      ...bank,
      businessType: this.currentBusinessType,
      distance: bank.distance || 0
    });
    store.dispatch('getManagerListData', store.state.bank).catch(handleError);
  }
  mounted() {
    // vue hook
    debug('mounted');
    wx.hideToast();
  }

  onLocationChanged(location) {
    store.dispatch('getRangeBankListData', location).catch(handleError);
  }
  async onLoadCurrentLocation(e) {
    let location = { la: e.location.lat, lo: e.location.lng };
    await store.dispatch('getRangeBankListData', location).catch(handleError);
  }
}

export default Index;
