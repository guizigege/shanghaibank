import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import GroupBuyModal from '../group-buy-modal/group-buy-modal';
import { emptyProductDetail, GroupListItem, ProductDetail } from '@/models/product';
import { getImageUrl, timeDuration } from '@/utils';
import auth from '@/api/auth';

@Component({
  components: {
    GroupBuyModal
  }
})
class GroupBuyInfo extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;
  list: Array<GroupListItem> = new Array<GroupListItem>();
  AppUrls = AppUrls;
  show = false;
  time: any = {};
  tmpTime1: string = '1';
  tmpTime2: string = '2';
  isClientApp: boolean = false;

  onLoad() {
    this.isClientApp = auth.isClientApp;
    this.list = this.detail.group.rows.map((c, i) => {
      // 头像链接
      c.realIcon = getImageUrl(c.icon);
      // 参与了此拼团，是团长
      if (c.groupId === this.detail.group.groupId && this.detail.group.isGroupLeader === 1) {
        c.isCaptain = true;
      }
      // 参与了此拼团，不是团长
      if (c.groupId === this.detail.group.groupId && this.detail.group.isGroupLeader === 0) {
        c.isJoin = true;
      }
      // 倒计时
      c.timeBack = setInterval(() => {
        const now = new Date().getTime();
        if (c.createTime + this.detail.group.groupTime - now <= 0) {
          clearInterval(c.timeBack);
          // c.isExp = true;
          this.$set(c, 'isExp', true);
          this.$set(c, 'time', ` 00:00:00`);
        } else {
          const d = timeDuration(c.createTime + this.detail.group.groupTime);
          // c.time = `${d.hour}:${d.minute}:${d.second}`;
          if (d.day > 0) {
            this.$set(c, 'time', ` ${d.day}:${d.hour}:${d.minute}:${d.second}`);
          } else {
            this.$set(c, 'time', ` ${d.hour}:${d.minute}:${d.second}`);
          }
        }
      }, 1000);
      return c;
    });
  }

  // 查看更多拼团
  onLookMore() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_COMMON_GROUP_BUY_DETAIL}?productId=${this.detail.product.productId}`
    });
  }

  onUnload() {
    this.list.forEach(c => {
      clearInterval(c.timeBack);
    });
  }

  // 参团
  @Emit('toOrder')
  async onGoGroupBuy(i) {
    return [2, this.detail.group.rows[i].groupId, i];
  }
}

export default GroupBuyInfo;
