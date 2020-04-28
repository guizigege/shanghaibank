import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { handleError } from '@/utils';
import service from '@/api/service/client';
import storage from '@/utils/storage';

const debug = require('@/utils/debug')('log:Index');

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  canIUse = wx.canIUse('button.open-type.getUserInfo');

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

  async onGetUserInfo(e) {
    const loginInfo = storage.get('loginInfo');
    if (!!loginInfo && !!loginInfo.userName && !!loginInfo.icon) {
      // 不再更新已有客户信息
      wx.switchTab({ url: AppUrls.CLIENT_HOME });
      return;
    }

    const userInfo = e.mp.detail.userInfo;

    if (userInfo) {
      try {
        const { nickName, gender, avatarUrl } = userInfo;
        await service.saveUserInfo({ nickName, gender, avatarUrl });

        storage.set('loginInfo', {
          ...loginInfo,
          userName: nickName,
          icon: avatarUrl,
          gender
        });

        wx.switchTab({ url: AppUrls.CLIENT_HOME });
      } catch (err) {
        handleError(err);
      }
    }
  }
}

export default Index;
