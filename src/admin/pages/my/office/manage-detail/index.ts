import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import ManagerCoverInfo from '@/components/detail-manager/manager-cover-info/manager-cover-info';
import CareerHighlights from '@/components/detail-manager/career-highlights/career-highlights';
import PersonalView from '@/components/detail-manager/personal-view/personal-view';
import ManagerLife from '@/components/detail-manager/manager-life/manager-life';
import RecommendedProducts from '@/components/detail-manager/recommended-products/recommended-products';
import AuditAction from '@/components/audit-action/audit-action';
import service from '@/api/service/admin';
import { formatDate, getImageUrl } from '@/utils';
import client from '@/api/service/client';
import auth from '@/api/auth';

@Component({
  components: {
    ManagerCoverInfo,
    CareerHighlights,
    PersonalView,
    ManagerLife,
    AuditAction,
    RecommendedProducts
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  manager: any = {};
  isLoad: boolean = false;
  hasRecommend: boolean = false;
  disable: boolean = false;
  commentCount: number = 0;
  focusCount: number = 0;
  fensCount: number = 0;
  canOp: boolean = false;

  async onLoad(options) {
    if (options.userId) {
      await this.init(options.userId);
      await this.getCount();
      wx.setNavigationBarTitle({ title: this.manager.name });
      this.hasRecommend = !!this.manager.productInfo.productId;
      this.isLoad = true;
    }
    // 能否操作禁用
    if (options.canOp) {
      this.canOp = !!options.canOp;
    }
  }

  async init(userId) {
    await service.getOfficeManageDetail({ userId: userId }).then(res => {
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
      this.manager = res;
      this.disable = res.ex.userInfo.disable;
    });
  }

  async disableEvent(e) {
    service.saveInfo({ userId: this.manager.userId, disable: e.mp.detail.value })
      .then(async () => {
        this.disable = e.mp.detail.value;
      });
  }

  async getCount() {
    const ret = await client.getInfoCount(this.manager.userId);
    this.commentCount = ret.commentCount;
    this.focusCount = ret.focusCount;
    this.fensCount = ret.fensCount;
  }

  jumpComment() {
    wx.navigateTo({
      url: `${AppUrls.ADMIN_MY_COMMENTS}?userId=${this.manager.userId}`
    });
  }

  jumpFans() {
    wx.navigateTo({
      url: `${AppUrls.ADMIN_MY_FANS}?userId=${this.manager.userId}`
    });
  }

  jumpFocus() {
    wx.navigateTo({
      url: `${AppUrls.ADMIN_MY_ATTENTION}?userId=${this.manager.userId}`
    });
  }

  // onHide() {
  //   this.manager = {};
  //   this.isLoad = false;
  //   this.disable = false;
  //   this.hasRecommend = false;
  // }

  onUnload() {
    this.manager = {};
    this.isLoad = false;
    this.disable = false;
    this.hasRecommend = false;
  }
}

export default Index;
