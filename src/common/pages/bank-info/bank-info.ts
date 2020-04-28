import { Component } from 'vue-property-decorator';
import { IconExport, AppUrls } from '@/utils/consts';
import { ProductType } from '@/models/enums';
import { emptyProduct } from '@/models/product';
import service from '@/api/service/client';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import FocusMsg from '@/components/focus-msg/focus-msg';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import auth from '@/api/auth';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';

@Component({
  components: {
    CardPromotionInfo,
    CardSuperiorInfo,
    FocusMsg,
    Empty
  }
})
class Index extends mixins(CalcDistanceMixin) {
  isLoaded = false;

  superiorTab = 'superior';

  current = this.superiorTab;

  iconExport = IconExport;

  superior = [];

  promotion = [];

  distance = '';

  list = [];

  bank: any = {};
  commentCount: number = 0;
  managerCount: number = 0;
  fensCount: number = 0;
  focusState: number = 0;
  userId: string = '';

  isClientApp: boolean = false;

  get isEmpty() {
    return (
      (this.current === this.superiorTab && this.superior.length === 0) ||
      (this.current !== this.superiorTab && this.promotion.length === 0)
    );
  }

  async onLoad(options) {
    wx.showNavigationBarLoading();
    this.isClientApp = auth.isClientApp;
    if (options.userId) {
      this.userId = options.userId;
      await this.getBankInfo();
    } else {
      const d = storage.get('bankDetail');
      if (d) {
        this.bank = d;
        this.userId = d.userId;
        // console.log('storage', this.bank);
      }
    }
    wx.setNavigationBarTitle({ title: this.bank.office });
    await this.init(this.bank.office);
  }

  onUnload() {
    this.superior = [];
    this.promotion = [];
    this.list = [];
    this.current = this.superiorTab;
    this.isLoaded = false;
    storage.remove('bankDetail');
  }

  async onShow() {
    await this.getCount();
    this.isLoaded = true;
    wx.hideNavigationBarLoading();
  }

  async getBankInfo() {
    const res = await service.getBankInfo({ userId: this.userId });
    // console.log('getInfo', res);
    this.bank = res;
    storage.set('bankDetail', res);
  }

  onShareAppMessage() {
    return {
      title: this.bank.location.name,
      desc: this.bank.location.address,
      path: `${AppUrls.COMMON_BANK_INFO}?office=${this.bank.office}&location=${this.bank.location}`
    };
  }

  jumpManage() {
    wx.navigateTo({
      url: `${AppUrls.COMMON_MANAGERS_LIST}?userId=${this.userId}`
    });
  }

  jumpComment() {
    if (auth.isClientApp) {
      wx.navigateTo({
        url: `${AppUrls.CLIENT_COMMON_COMMENTS}?userId=${this.userId}`
      });
    }
    if (auth.isAdminApp) {
      wx.navigateTo({
        url: `${AppUrls.ADMIN_MY_COMMENTS}?userId=${this.userId}`
      });
    }
  }

  jumpFans() {
    wx.navigateTo({
      url: `${AppUrls.COMMON_FANS_LIST}?userId=${this.userId}`
    });
  }

  async focusEvent(e) {
    if (e) {
      await this.getCount();
    }
  }

  sendMsg() {
    storage.set('msgDetail', this.bank);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_MSG_DETAIL
    });
  }

  // 分享
  onShare() {
    wx.showShareMenu();
  }

  onTabChange(e) {
    this.current = e.mp.detail.key;
    this.list = this[this.current];
  }

  async init(office) {
    this.calculateDistance();
    const list = await service.officeProducts(office);
    this.superior = this.getProduct(list, ProductType.优品) as any;
    this.promotion = this.getProduct(list, ProductType.活动) as any;
    this.list = this[this.current];
  }

  async getCount() {
    const ret = await service.getInfoCount(this.userId);
    this.commentCount = ret.commentCount;
    this.managerCount = ret.managerCount;
    this.fensCount = ret.fensCount;
    this.focusState = ret.friendingState;
    this.bank.focusState = ret.friendingState;
  }

  calculateDistance() {
    if (this.bank.location) {
      this.calcDistance(this.bank.location).then(res => {
        if (res) {
          this.distance = res;
        }
      });
    }
  }

  private getProduct(list = [], type: ProductType) {
    return list
      .filter(x => x['productType'] === type)
      .map(item => {
        return { ...emptyProduct, ...(item as any), distance: this.distance };
      });
  }
}

export default Index;
