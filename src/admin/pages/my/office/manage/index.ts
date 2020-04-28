import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import cardManagerInfo from '@/components/card-manager-info/card-manager-info';
import store from './store';
import Empty from '@/components/empty/empty';
@Component({
  components: {
    cardManagerInfo,
    Empty
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  current: number = 0;
  business: any[] = [];
  manages: any[] = [];
  isLoad: boolean = false;
  get loading() {
    return store.state.loading;
  }
  async onLoad() {
    wx.setNavigationBarTitle({ title: '客户经理' });
    await store.dispatch('initBusinessTypes');
    this.business = store.state.business;
    this.current = store.state.business[0].businessType;
    this.manages = store.state.manages;
    this.isLoad = true;
  }

  async onTabChange(e) {
    this.manages = [];
    this.current = e.mp.detail.key;
    await store.dispatch('getOfficeManageList', [this.current]);
    this.manages = store.state.manages;
  }

  navTo(i) {
    wx.navigateTo({
      url: `${AppUrls.ADMIN_MY_OFFICE_MANAGE_DETAIL}?userId=${this.manages[i]['userId']}&canOp=1`
    });
  }

  onUnload() {
    this.business = [];
    this.manages = [];
    this.isLoad = false;
  }
}

export default Index;
