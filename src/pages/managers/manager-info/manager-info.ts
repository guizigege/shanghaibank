import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import ManagerPhoto from '@/components/detail-manager/manager-photo/manager-photo';
import ManagerCoverInfo from '@/components/detail-manager/manager-cover-info/manager-cover-info';
import CareerHighlights from '@/components/detail-manager/career-highlights/career-highlights';
import PersonalView from '@/components/detail-manager/personal-view/personal-view';
import ManagerLife from '@/components/detail-manager/manager-life/manager-life';
import RecommendedProducts from '@/components/detail-manager/recommended-products/recommended-products';
import FocusMsg from '@/components/focus-msg/focus-msg';
import AuditAction from '@/components/audit-action/audit-action';
import store from '../store';
import { handleError } from '@/utils';
import storage from '@/utils/storage';

@Component({
  components: {
    ManagerPhoto,
    ManagerCoverInfo,
    CareerHighlights,
    PersonalView,
    ManagerLife,
    AuditAction,
    RecommendedProducts,
    FocusMsg
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  managerInfo: any = {};
  isLoad: boolean = false;

  async onLoad(options) {
    if (options.userId) {
      store.dispatch('getManagerInfoData', options.userId).then(() => {
        this.managerInfo = store.state.managerInfo;
        // console.log('managerInfo', this.managerInfo);
        wx.setNavigationBarTitle({ title: this.managerInfo.userName });
        this.isLoad = true;
      }).catch(handleError);
    }
  }

  onShow() {
    // 小程序 hook
    // debug('onShow');
  }

  sendMsg() {
    storage.set('msgDetail', this.managerInfo);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_MSG_DETAIL
    });
  }

  onUnload() {
    this.managerInfo = {};
    this.isLoad = false;
  }
}

export default Index;
