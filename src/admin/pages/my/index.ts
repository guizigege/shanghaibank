import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import auth from '@/api/auth';
import MyOffice from './office';
import MyManager from './manager';
import MyBranch from './branch';
import service from '@/api/service/client';
import storage from '@/utils/storage';

@Component({
  components: {
    MyBranch,
    MyManager,
    MyOffice
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  isBranch: boolean = false;
  isOffice: boolean = false;
  isManager: boolean = false;

  count: {
    collectCount?: number,
    focusCount?: number,
    fensCount?: number,
    bannerHomeCount?: number,
    bannerLocationCount?: number,
    commentCount?: number
  } = {
    collectCount: 0,
    focusCount: 0,
    fensCount: 0,
    bannerHomeCount: 0,
    bannerLocationCount: 0,
    commentCount: 0
  };

  get loginInfo() {
    return storage.get('loginInfo');
  }

  async onShow() {
    const res = await service.getInfoCount(this.loginInfo.userId);
    Object.assign(this.count, res);
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '我的' });
    this.isBranch = auth.isBranch;
    this.isOffice = auth.isOffice;
    this.isManager = auth.isManager;
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading'
    });
  }

  mounted() {
    wx.hideToast();
  }
}

export default Index;
