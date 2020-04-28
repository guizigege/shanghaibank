import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardManagerInfo from '@/components/card-manager-info/card-manager-info';
import Empty from '@/components/empty/empty';
import store from './store';
import storage from '@/utils/storage';
import auth from '@/api/auth';

@Component({
  components: {
    CardManagerInfo,
    Empty
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  get manages() {
    return store.state.manages;
  }

  currentManager(index) {
    if (auth.isClientApp) {
      wx.navigateTo({
        url: `${AppUrls.CLIENT_MANAGERS_INFO}?userId=${this.manages[index]['userId']}`
      });
    }
    if (auth.isAdminApp) {
      wx.navigateTo({
        url: `${AppUrls.ADMIN_MY_OFFICE_MANAGE_DETAIL}?userId=${this.manages[index]['userId']}`
      });
    }
  }

  onShow() {
    // 小程序 hook
    // debug('onShow');
  }

  async onLoad() {
    wx.setNavigationBarTitle({ title: '客户经理' });
    const d = storage.get('bankDetail');
    if (d) {
      await store.dispatch('getOfficeManageList', { head: d.head, branch: d.branch, office: d.office });
    }
    // console.log(d);
  }
}

export default Index;
