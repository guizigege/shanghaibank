import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import service from '@/api/service/client';
import storage from '@/utils/storage';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import { ProductType } from '@/models/enums';
import Empty from '@/components/empty/empty'
@Component({
  components: {
    CardSuperiorInfo,
    CardPromotionInfo,
    Empty
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  ProductType = ProductType;
  collectList: any = [];
  subAmount: number = 0;
  userId: string = '';
  loading: boolean = true;
  onShow() {
    this.getList();
  }

  getList(data?) {
    this.loading = true;
    let req = { userId: this.userId, length: 5 };
    if (data) {
      Object.assign(req, data);
    }
    service.getCollectList(req).then((res) => {
      this.collectList = [...this.collectList, ...res.rows];
      this.subAmount = res.subAmount;
      this.loading = false;
    });
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '我的收藏' });
    let loginInfo = storage.get('loginInfo');
    this.userId = loginInfo.userId;
  }

  onReachBottom() {
    if (this.subAmount > 0) {
      const last = this.collectList[this.collectList.length - 1];
      this.getList({ createTime: last.createTime });
    }
  }

  onHide() {
    this.subAmount = 0;
    this.collectList = [];
  }

  onUnload() {
    this.userId = '';
    this.subAmount = 0;
    this.collectList = [];
  }
}

export default Index;
