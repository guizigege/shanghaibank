import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import auth from '@/api/auth';
import { AppType, SignUpAuditState } from '@/models/enums';
import storage from '@/utils/storage';
import { handleError } from '@/utils';

const debug = require('@/utils/debug')('log:Admin/Index');

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  onLoad() {
    debug('onLoad');

    this.init().catch(handleError);
  }

  onUnload() {
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

  private async init() {
    const loginInfo = await auth.login(AppType.Admin);
    storage.set('loginInfo', loginInfo);

    switch (loginInfo.submitStatus) {
      case SignUpAuditState.审核中: {
        wx.navigateTo({
          url: AppUrls.AUDIT_RESULT
        });
        break;
      }
      case SignUpAuditState.驳回: {
        wx.redirectTo({
          url: `${
            AppUrls.AUDIT_RESULT
          }?type=reject&rejectReason=${loginInfo.opDesc || ''}`
        });
        break;
      }
      case SignUpAuditState.审核通过: {
        wx.switchTab({
          url: AppUrls.ADMIN_HOME
          // url: AppUrls.ADMIN_PRODUCTS
        });
        break;
      }
      default: {
        // 未提交资料
        wx.redirectTo({
          url: AppUrls.SIGN_UP
        });
        break;
      }
    }
  }
}

export default Index;
