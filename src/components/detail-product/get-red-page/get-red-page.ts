import { Vue, Component, Prop } from 'vue-property-decorator';
import { emptyProductDetail, ProductDetail } from '@/models/product';
import { getImageUrl } from '@/utils';
import Empty from '@/components/empty/empty';
import storage from '@/utils/storage';
import { AppUrls } from '@/utils/consts';
import auth from '@/api/auth';

@Component({
  components: { Empty }
})
class GetRedPage extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  hasRedLog: boolean = false;

  logList: any = [];

  onLoad() {
    this.init();
  }

  onShow() {
    this.init();
  }

  init() {
    if (this.detail.red.length > 0) {
      this.detail.red.forEach(c => {
        if (c.log.length > 0) {
          this.hasRedLog = true;
          c.log.forEach(l => {
            l.realIcon = getImageUrl(l.icon);
          });
          this.logList.push(c.log);
        }
      });
    }
  }

  // 查看更多
  onLookMore(index, i) {
    storage.set('redDetail', {
      bank: this.detail.product.office,
      red: this.detail.red[index],
      log: this.logList[index]
    });
    if (auth.isClientApp) {
      wx.navigateTo({
        url: AppUrls.CLIENT_COMMON_RED_RECEIVE_CARD
      });
    }
    if (auth.isAdminApp) {
      wx.navigateTo({
        url: AppUrls.ADMIN_COMMON_RED_RECEIVE_LOG
      });
    }
  }
}

export default GetRedPage;
