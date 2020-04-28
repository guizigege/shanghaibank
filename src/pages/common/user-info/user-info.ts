import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import service from '@/api/service/client';
import admin from '@/api/service/admin';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import FocusMsg from '@/components/focus-msg/focus-msg';
import Empty from '@/components/empty/empty';
import CardBankBranch from '@/components/card-bank-branch/card-bank-branch';
import CardManagerIntro from '@/components/card-manager-intro/card-manager-intro';
import CardFansInfo from '@/components/card-fans-info/card-fans-info';
import { AppType, Roles } from '@/models/enums';
import storage from '@/utils/storage';
import { getImageUrl } from '@/utils';

@Component({
  components: {
    CardPromotionInfo,
    CardSuperiorInfo,
    FocusMsg,
    Empty,
    CardBankBranch,
    CardManagerIntro,
    CardFansInfo
  }
})
class Index extends Vue {
  isLoad = false;
  tabTitle = 'collect'; // 默认收藏列表
  current = this.tabTitle;
  collect = [];
  fans = [];
  focus = [];
  list = [];
  userId: string = '';
  info: any = {};
  length = 6;
  roles = Roles;
  appType = AppType;
  needFocus: boolean = false;
  subAmount = {
    collect: 0,
    fans: 0,
    focus: 0
  };

  get isEmpty() {
    return (
      (this.current === 'collect' && this.collect.length === 0) ||
      (this.current === 'focus' && this.focus.length === 0) ||
      (this.current === 'fans' && this.fans.length === 0)
    );
  }

  async onLoad(options) {
    if (options) {
      this.userId = options.userId;
    }
  }

  onUnload() {
    this.collect = [];
    this.fans = [];
    this.focus = [];
    this.list = [];
    this.current = this.tabTitle;
    this.isLoad = false;
    this.userId = '';
    this.info = {};
    this.subAmount = {
      collect: 0,
      fans: 0,
      focus: 0
    };
  }

  onHide() {
    this.collect = [];
    this.fans = [];
    this.focus = [];
    this.list = [];
    this.subAmount = {
      collect: 0,
      fans: 0,
      focus: 0
    };
    this.isLoad = false;
  }

  async onShow() {
    await this.init();
  }

  sendMsg() {
    storage.set('msgDetail', this.info);
    wx.navigateTo({
      url: AppUrls.CLIENT_MY_MSG_DETAIL
    });
  }

  async onTabChange(e) {
    if (e.mp.detail.key !== this.current) {
      this.current = e.mp.detail.key;
      await this.getList('tab');
    }
  }

  async init() {
    const res = await service.getClientInfo({ userId: this.userId });
    res.focusState = res.friendingState;
    res.realIcon = getImageUrl(res.icon);
    this.info = res;
    await this.getList();
    this.isLoad = true;
  }

  async getList(method?, data?) {
    const r = await this.req(data);
    if (method === 'tab') {
      this[this.current] = [];
      this.list = [];
    }
    this[this.current] = [...this[this.current], ...r.rows];
    if (this.current !== 'collect') {
      this.list = this[this.current];
    }
    this.subAmount[this.current] = r.subAmount;
  }

  req(data?) {
    let req = { userId: this.userId, length: this.length };
    if (data) {
      Object.assign(req, data);
    }
    if (this.current === 'collect') {
      return service.getCollectList(req);
    }
    if (this.current === 'focus') {
      return admin.attentionList(req);
    }
    if (this.current === 'fans') {
      return admin.fanList(req);
    }
  }

  async onReachBottom() {
    if (this.subAmount[this.current][this.current] > 0) {
      const last = this[this.current][this[this.current].length - 1];
      await this.getList({ createTime: last.createTime });
    }
  }
}

export default Index;
