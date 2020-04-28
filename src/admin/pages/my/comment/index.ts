import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { getImageUrl, handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import auth from '@/api/auth';
import AdminCommentList from '@/components/admin-comment-list/admin-comment-list';

@Component({
  components: {
    Empty,
    AdminCommentList
  }
})
class Index extends Vue {
  list: any = [];
  subAmount: number = 0;
  isEmpty: boolean = true;
  isBranch: boolean = false;
  officeRange: any = [];
  productRange: any = [];
  currentOffice: any = {};
  currentProduct: any = {};
  officeIndex: number = 0;
  productIndex: number = 0;
  count: number = 0;
  loginInfo: any = storage.get('loginInfo');
  userId: string = '';
  needAudit: boolean = false;
  get loading() {
    return store.state.loading;
  }
  async onLoad(options) {
    wx.setNavigationBarTitle({ title: '评论' });
    this.isBranch = auth.isBranch;
    if (options.userId) {
      this.userId = options.userId;
    } else {
      this.loginInfo = storage.get('loginInfo');
      this.userId = this.loginInfo.userId;
    }
    await this.init();
  }

  onUnload() {
    this.clean();
    store.commit('clean');
  }

  async pickOffice(e) {
    this.officeIndex = e ? Number(e.mp.detail.value) : 0;
    this.currentOffice = this.officeRange[this.officeIndex];
    this.userId = this.currentOffice.userId;
    await this.getProduct();
    if (this.productRange.length === 0) {
      this.currentProduct = { title: '该网点暂无产品' };
      return;
    }
    store.commit('clearList');
    this.list = [];
    await this.getList();
    this.productIndex = 0;
  }

  async pickProduct(e) {
    this.productIndex = e ? Number(e.mp.detail.value) : 0;
    this.currentProduct = this.productRange[this.productIndex];
    store.commit('clearList');
    this.list = [];
    await this.getList();
  }

  async init() {
    if (this.isBranch) {
      await this.getOffice();
    }

    if (this.isBranch && this.officeRange.length === 0) {
      this.currentOffice = { office: '未查询到网点' };
      return;
    }
    await this.getProduct();

    if (this.productRange.length === 0) {
      this.currentProduct = { title: '该网点暂无产品' };
      return;
    }

    await this.getList();
  }

  async getOffice() {
    await store.dispatch('getOfficeRange').catch(handleError);
    this.officeRange = store.state.officeRange;
    this.currentOffice = this.officeRange[0];
    this.userId = this.currentOffice.userId;
  }

  async getProduct() {
    await store.dispatch('getProductRange', { userId: this.userId }).catch(handleError);
    this.productRange = store.state.productRange;
    this.currentProduct = this.productRange[0];
  }

  async getList() {
    await store.dispatch('getComment', { productId: this.currentProduct.productId }).catch(handleError);
    this.list = store.state.list.map(c => {
      c.releaseTime = timeAgo(c.createTime);
      c.realIcon = getImageUrl(c.icon);
      c.hasReply = c.replyCount > 0;
      c.needAudit = false;
      return c;
    });
    this.subAmount = store.state.subAmount;
    this.count = store.state.amount;
    this.isEmpty = this.list.length === 0;
  }

  clean() {
    this.list = [];
    this.subAmount = 0;
    this.isEmpty = true;
    this.currentOffice = {};
    this.currentProduct = {};
    this.officeIndex = 0;
    this.productIndex = 0;
    this.count = 0;
    this.userId = '';
  }

  async lower() {
    if (this.subAmount > 0) {
      const lastChild = this.list[this.list.length - 1];
      let data: any = { productId: this.currentProduct.productId };
      data.createTime = lastChild.createTime;
      await store.dispatch('getComment', data).catch(handleError);
      this.list = store.state.list.map(c => {
        c.releaseTime = timeAgo(c.createTime);
        c.realIcon = getImageUrl(c.icon);
        return c;
      });
      this.subAmount = store.state.subAmount;
      this.isEmpty = this.list.length === 0;
    }
  }

  onLookDetail() {
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_COMMENTS_DETAIL
    });
  }
}

export default Index;
