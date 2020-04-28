import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import BusinessInfo from './business-info/business-info';
import CardCheckStatus from './card-check-status/card-check-status';
import CardBankMsg from './card-bank-msg/card-bank-msg';
import CardCodeInfo from './card-code-info/card-code-info';
import BusinessTimeInfo from './business-time-info/business-time-info';
import SuperiorImg from './superior-img/superior-img';
import BottomTabs from './bottom-tabs/bottom-tabs';
import SuperiorDescribe from './superior-describe/superior-describe';
import CardCommentInfo from './card-comment-info/card-comment-info';
import GroupBuyInfo from './group-buy-info/group-buy-info';
import GroupBuyModal from './group-buy-modal/group-buy-modal';
import GetRedPage from './get-red-page/get-red-page';
import RedPage from '@/components/red-page/red-page';
import IssueTimeInfo from './issue-time-info/issue-time-info';
import { ProductAuditState } from '@/models/enums';
import { Gift, ProductDetail, emptyProductDetail } from '@/models/product';
import { isValidJSON } from '@/utils';
import auth from '@/api/auth';
import { $Toast } from '../../../static/iview/base';

const debug = require('@/utils/debug')('log:Index');

@Component({
  components: {
    SuperiorImg,
    CardCheckStatus,
    SuperiorDescribe,
    CardBankMsg,
    BusinessInfo,
    CardCodeInfo,
    BusinessTimeInfo,
    BottomTabs,
    CardCommentInfo,
    GroupBuyInfo,
    GroupBuyModal,
    GetRedPage,
    IssueTimeInfo,
    RedPage
  }
})
class DetailProduct extends Vue {
  AppUrls = AppUrls;

  @Prop({ default: emptyProductDetail }) detail: ProductDetail;
  @Prop({ default: false }) isLoaded: boolean;

  gifts = Array<Gift>();

  isPublish = false;

  hasGift: boolean = false;

  packetId: number = 0;

  toOrder: boolean = false;

  buyType: number = 0;

  buyGroupId: number = 0;
  buyGroupIndex: number = 0;

  get product() {
    return this.detail.product;
  }

  set product(val) {
    this.detail.product = val;
  }

  get isClientApp() {
    return auth.isClientApp;
  }

  // 是否存在拼团 true-没有 false-有
  get isGroup() {
    return this.detail.group.rows.length === 0;
  }

  openRedPage(i) {
    this.packetId = i;
  }

  onLoad() {
    // console.log(this.detail);
    this.init();
  }

  onUnload() {
    //
    this.reset();
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
    this.init();
  }

  onHide() {
    //
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  onEdit() {
    this.$emit('edit');
  }

  onUnShelve() {
    $Toast({
      content: '功能开发中...',
      type: 'warning'
    });
  }

  onGetRedSuccess() {
    this.$emit('reload');
  }

  private init() {
    wx.setNavigationBarTitle({ title: '详情' });
    if (this.detail.product.status === ProductAuditState.草稿) {
      wx.setNavigationBarTitle({ title: '预览详情' });
    }
    this.isPublish = this.detail.product.status === ProductAuditState.通过;
    this.productChanged();
    this.giftInfoChanged();
  }

  private reset() {
    this.isPublish = false;
    this.product = emptyProductDetail.product;
    // this.gifts = [];
    this.toOrder = false;
  }

  private productChanged() {
    this.product = this.detail.product;
  }

  private giftInfoChanged() {
    if (
      this.detail.product &&
      this.detail.product.giftInfo &&
      isValidJSON(this.detail.product.giftInfo)
    ) {
      this.gifts = JSON.parse(this.detail.product.giftInfo);
    } else {
      this.gifts = new Array<Gift>();
    }
    this.hasGift = this.gifts.some(c => {
      return !!c.name && !!c.desc && !!c.imageUrl;
    });

    // console.log('giftInfo', this.gifts, this.hasGift, this.detail);
  }

  openBuyModal(e) {
    if (Array.isArray(e)) {
      this.toOrder = !!e[0];
      this.buyType = e[0];
      this.buyGroupId = e[1];
      this.buyGroupIndex = e[2];
    } else {
      this.toOrder = !!e;
      this.buyType = e;
    }
  }

  closeToOrder() {
    this.toOrder = false;
  }

  joinSuccess(res) {
    this.detail.group.rows[this.buyGroupIndex].total = res.total;
    this.detail.group.rows[this.buyGroupIndex].status = res.status;
    this.detail.groupState = 1;
  }

  groupSuccess() {
    this.detail.groupState = 1;
  }

  orderSuccess() {
    this.detail.orderState = 1;
  }

  // 更多评论
  onComment() {
    if (auth.isClientApp) {
      wx.navigateTo({
        url: `${AppUrls.CLIENT_COMMON_USER_COMMENT_DETAIL}?productId=${
          this.detail.product.productId
          }`
      });
    }
    if (auth.isAdminApp) {
      wx.navigateTo({
        url: `${AppUrls.ADMIN_COMMON_USER_COMMENT_DETAIL}?productId=${
          this.detail.product.productId
          }`
      });
    }
  }

  // 进入网点详情
  jumpBank(e) {
    wx.navigateTo({
      url: `${AppUrls.COMMON_BANK_INFO}?userId=${e}`
    });
  }
}

// @ts-ignore
export default DetailProduct;
