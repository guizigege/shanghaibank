import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import ManagerCoverInfo from '@/components/detail-manager/manager-cover-info/manager-cover-info';
import CareerHighlights from '@/components/detail-manager/career-highlights/career-highlights';
import PersonalView from '@/components/detail-manager/personal-view/personal-view';
import ManagerLife from '@/components/detail-manager/manager-life/manager-life';
import RecommendedProducts from '@/components/detail-manager/recommended-products/recommended-products';
import AuditAction from '@/components/audit-action/audit-action';
import storage from '@/utils/storage';
import service from '@/api/service/admin';
import FocusMsg from '@/components/focus-msg/focus-msg';
import client from '@/api/service/client';
import { formatDate, getImageUrl } from '@/utils';

@Component({
  components: {
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
  manager: any = {};
  isLoad: boolean = false;
  hasRecommend: boolean = false;
  commentCount: number = 0;
  focusCount: number = 0;
  fensCount: number = 0;
  focusState: number = 0;

  async onShow() {
    await this.init();
    await this.getCount();
    wx.setNavigationBarTitle({ title: this.manager.name });
    this.hasRecommend = !!this.manager.productInfo.productId;
    this.isLoad = true;
  }

  async init() {
    let manager = storage.get('manageDetail');
    manager = JSON.parse(manager);
    await service.getOfficeManageDetail({ userId: manager.userId }).then(res => {
      res.ex = JSON.parse(res.extendInfo);
      res.name = res.userName;
      res.signature = res.ex.userInfo.signature;
      res.tags = res.ex.userInfo.tags;
      res.frontCoverUrl = res.ex.userInfo.frontCoverUrl;
      res.bigFrontCoverUrl = res.bigFrontCoverUrl ? res.ex.userInfo.bigFrontCoverUrl : res.frontCoverUrl;
      res.mobilePhone = res.mobile;
      res.avatarUrl = res.icon;
      res.realIcon = getImageUrl(res.icon);
      res.productInfo.beginTime = formatDate(res.productInfo.beginTime);
      res.productInfo.endTime = formatDate(res.productInfo.endTime);
      res.focusState = res.friendingState;
      this.manager = res;
    });
  }

  async getCount() {
    const ret = await client.getInfoCount(this.manager.userId);
    this.commentCount = ret.commentCount;
    this.focusCount = ret.focusCount;
    this.fensCount = ret.fensCount;
  }

  async focusEvent(e) {
    if (e) {
      await this.getCount();
    }
  }

  jumpComment() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_COMMON_COMMENTS}?userId=${this.manager.userId}`
    });
  }

  jumpFans() {
    wx.navigateTo({
      url: `${AppUrls.COMMON_FANS_LIST}?userId=${this.manager.userId}`
    });
  }

  jumpFocus() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_COMMON_FOCUS_LIST}?userId=${this.manager.userId}`
    });
  }

  sendMsg() {
    storage.set('msgDetail', this.manager);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_MSG_DETAIL
    });
  }

  // onHide() {
  //   this.manager = {};
  //   this.isLoad = false;
  //   this.hasRecommend = false;
  //   storage.remove('manageDetail');
  // }

  onUnload() {
    this.manager = {};
    this.isLoad = false;
    this.hasRecommend = false;
    storage.remove('manageDetail');
  }
}

export default Index;
