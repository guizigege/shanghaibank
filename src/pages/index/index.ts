import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { AppType } from '@/models/enums';
import { handleError } from '@/utils';
import service from '@/api/service/client';
import storage from '@/utils/storage';
import auth from '@/api/auth';

const debug = require('@/utils/debug')('log:Index');

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  onLoad() {
    debug('onLoad');

    this.init().catch(handleError);
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  private async init() {
    const loginInfo = await auth.login(AppType.Client);
    storage.set('loginInfo', loginInfo);

    const authSetting = auth.getAuthSetting();
    if (!authSetting['scope.userInfo']) {
      wx.redirectTo({ url: AppUrls.CLIENT_SIGN_UP });
    } else {
      wx.switchTab({ url: AppUrls.CLIENT_HOME });
    }
  }
}

export default Index;
