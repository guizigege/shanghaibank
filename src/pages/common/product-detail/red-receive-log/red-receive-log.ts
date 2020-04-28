import { Vue, Component } from 'vue-property-decorator';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import CardRedReceive from '@/components/card-red-receive/card-red-receive';
import { AppUrls, IconBankLogo } from '@/utils/consts';

@Component({
  components: {
    Empty,
    CardRedReceive
  }
})
class RedReceiveLog extends Vue {
  detail: any = {};
  isLoad: boolean = false;
  iconBankLogo = IconBankLogo;
  loginInfo: any = storage.get('loginInfo');

  async onLoad() {
    wx.setNavigationBarTitle({ title: '红包' });
    this.detail = storage.get('redDetail');
    // console.log(this.detail);
  }

  onUnload() {
    this.isLoad = false;
    this.loginInfo = {};
    storage.remove('redDetail');
  }

  jumpUser(e) {
    if (e.userId !== this.loginInfo.userId) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_USER_INFO}?userId=${e.userId}`
      });
    }
  }
}

export default RedReceiveLog;
